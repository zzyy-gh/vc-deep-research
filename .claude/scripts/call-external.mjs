#!/usr/bin/env node
/**
 * External Model Critique Wrapper
 * Usage: node .claude/scripts/call-external.mjs <model> <research-path> <output-path>
 *
 * Models: gemini, groq
 * Exit 0 on success, exit 1 on skip (with stderr message).
 */

import "dotenv/config";
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";

const TIMEOUT_MS = 90_000;
const MAX_INPUT_CHARS = 48_000;

const MODELS = {
  gemini: {
    env: "GOOGLE_API_KEY",
    model: "gemini-2.0-flash",
    prompt: `You are an independent AI analyst providing a cross-check on venture capital research. Give your honest, independent perspective. Review the research and provide:
1. Independent assessment of the opportunity based on facts presented
2. Cross-check the top 3 claims (market sizing, competitive landscape, risk factors)
3. What's missing from the analysis
4. Contrarian view
5. Bottom line in 3 sentences
Keep your response under 1500 words.`,
  },
  groq: {
    env: "GROQ_API_KEY",
    model: "llama-3.3-70b-versatile",
    prompt: `You are an independent AI analyst specializing in pattern recognition and historical analogues for venture capital research. Review the research and provide:
1. Historical analogues — 3-5 similar companies/situations, what happened, implications
2. Pattern match — does this pattern-match to winners or losers?
3. Comparable metrics — how do the numbers compare to similar companies at same stage?
4. Timing analysis — too early, too late, or well-timed?
5. The historical lesson — one paragraph on the most important lesson from history
Keep your response under 1500 words. Be specific — name real companies and real outcomes.`,
  },
};

async function callGemini(apiKey, config, research) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: config.model });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: `${config.prompt}\n\n---\n\nPlease critique the following research:\n\n${research}` },
        ],
      },
    ],
    generationConfig: { maxOutputTokens: 4096, temperature: 0.3 },
  });

  return result.response.text();
}

async function callGroq(apiKey, config, research) {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const response = await client.chat.completions.create({
    model: config.model,
    messages: [
      { role: "system", content: config.prompt },
      { role: "user", content: `Please critique the following research:\n\n${research}` },
    ],
    max_tokens: 4096,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content;
}

const CALLERS = { gemini: callGemini, groq: callGroq };

async function main() {
  const [modelName, researchPath, outputPath] = process.argv.slice(2);

  if (!modelName || !researchPath || !outputPath) {
    console.error("Usage: node .claude/scripts/call-external.mjs <gemini|groq> <research-path> <output-path>");
    process.exit(1);
  }

  const config = MODELS[modelName];
  if (!config) {
    console.error(`Unknown model: ${modelName}. Available: ${Object.keys(MODELS).join(", ")}`);
    process.exit(1);
  }

  const apiKey = process.env[config.env];
  if (!apiKey) {
    console.error(`${config.env} not set — skipping ${modelName} critique`);
    process.exit(1);
  }

  let research;
  try {
    research = await readFile(researchPath, "utf-8");
  } catch (err) {
    console.error(`Failed to read input file: ${err.message}`);
    process.exit(1);
  }

  if (research.length > MAX_INPUT_CHARS) {
    research = research.slice(0, MAX_INPUT_CHARS) + "\n\n[... truncated for length]";
  }

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const content = await Promise.race([
        CALLERS[modelName](apiKey, config, research),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), TIMEOUT_MS)
        ),
      ]);

      if (!content) {
        console.error(`${modelName} returned empty response`);
        process.exit(1);
      }

      await mkdir(dirname(outputPath), { recursive: true });

      const output = `---
skill: ${modelName}-review
type: critique
date: "${new Date().toISOString().split("T")[0]}"
model: ${config.model}
description: "${modelName} independent critique"
inputs:
  - ${researchPath.split("/").pop()}
---

${content}`;

      await writeFile(outputPath, output, "utf-8");
      console.log(`${modelName} critique written to ${outputPath}`);
      process.exit(0);
    } catch (err) {
      if (err.message === "Timeout") {
        console.error(`${modelName} request timed out after ${TIMEOUT_MS / 1000}s`);
        process.exit(1);
      }
      if (attempts < maxAttempts && (err.status === 429 || err.status >= 500)) {
        console.error(`${modelName} error (${err.status}), retrying...`);
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      console.error(`${modelName} critique failed: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
