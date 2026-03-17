#!/usr/bin/env node
/**
 * Groq Critique Wrapper
 * Usage: node scripts/call-groq.mjs <research-path> <output-path> <prompt-template-path>
 *
 * Reads research content, sends to Groq (Llama) with critique prompt, writes output.
 * Uses OpenAI-compatible API.
 * Exit 0 on success, exit 1 on skip (with stderr message).
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import OpenAI from "openai";

const TIMEOUT_MS = 90_000;
const MAX_INPUT_CHARS = 48_000; // ~12k tokens
const MODEL = "llama-3.3-70b-versatile";

async function main() {
  const [researchPath, outputPath, promptPath] = process.argv.slice(2);

  if (!researchPath || !outputPath || !promptPath) {
    console.error("Usage: node scripts/call-groq.mjs <research-path> <output-path> <prompt-template-path>");
    process.exit(1);
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY not set — skipping Groq critique");
    process.exit(1);
  }

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  let research, prompt;
  try {
    research = await readFile(researchPath, "utf-8");
    prompt = await readFile(promptPath, "utf-8");
  } catch (err) {
    console.error(`Failed to read input files: ${err.message}`);
    process.exit(1);
  }

  // Truncate research if too long
  if (research.length > MAX_INPUT_CHARS) {
    research = research.slice(0, MAX_INPUT_CHARS) + "\n\n[... truncated for length]";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await client.chat.completions.create(
        {
          model: MODEL,
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Please critique the following research:\n\n${research}` },
          ],
          max_tokens: 4096,
          temperature: 0.3,
        },
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      const content = response.choices[0]?.message?.content;
      if (!content) {
        console.error("Groq returned empty response");
        process.exit(1);
      }

      // Ensure output directory exists
      await mkdir(dirname(outputPath), { recursive: true });

      const output = `---
type: critique-groq
date: "${new Date().toISOString().split("T")[0]}"
model: ${MODEL}
---

${content}`;

      await writeFile(outputPath, output, "utf-8");
      console.log(`Groq critique written to ${outputPath}`);
      process.exit(0);
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        console.error("Groq request timed out");
        process.exit(1);
      }
      if (attempts < maxAttempts && (err.status === 429 || err.status >= 500)) {
        console.error(`Groq error (${err.status}), retrying...`);
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      console.error(`Groq critique failed: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
