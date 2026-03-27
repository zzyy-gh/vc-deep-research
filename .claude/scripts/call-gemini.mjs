#!/usr/bin/env node
/**
 * Gemini Critique Wrapper
 * Usage: node scripts/call-gemini.mjs <research-path> <output-path> <prompt-template-path>
 *
 * Reads research content, sends to Gemini with critique prompt, writes output.
 * Exit 0 on success, exit 1 on skip (with stderr message).
 */

import "dotenv/config";
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TIMEOUT_MS = 90_000;
const MAX_INPUT_CHARS = 48_000; // ~12k tokens

async function main() {
  const [researchPath, outputPath, promptPath] = process.argv.slice(2);

  if (!researchPath || !outputPath || !promptPath) {
    console.error("Usage: node scripts/call-gemini.mjs <research-path> <output-path> <prompt-template-path>");
    process.exit(1);
  }

  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY not set — skipping Gemini critique");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${prompt}\n\n---\n\nPlease critique the following research:\n\n${research}` },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 4096,
          temperature: 0.3,
        },
      });

      clearTimeout(timeout);

      const content = result.response.text();
      if (!content) {
        console.error("Gemini returned empty response");
        process.exit(1);
      }

      // Ensure output directory exists
      await mkdir(dirname(outputPath), { recursive: true });

      // Extract input filename for frontmatter
      const output = `---
skill: gemini-review
type: critique
date: "${new Date().toISOString().split("T")[0]}"
model: gemini-2.0-flash
description: "Gemini independent critique"
inputs:
  - ${researchPath.split("/").pop()}
---

${content}`;

      await writeFile(outputPath, output, "utf-8");
      console.log(`Gemini critique written to ${outputPath}`);
      process.exit(0);
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("Gemini request timed out");
        process.exit(1);
      }
      if (attempts < maxAttempts && (err.status === 429 || err.status >= 500)) {
        console.error(`Gemini error (${err.status}), retrying...`);
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      console.error(`Gemini critique failed: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
