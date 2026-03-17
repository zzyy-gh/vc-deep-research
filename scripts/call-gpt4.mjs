#!/usr/bin/env node
/**
 * GPT-4 Critique Wrapper
 * Usage: node scripts/call-gpt4.mjs <research-path> <output-path> <prompt-template-path>
 *
 * Reads research content, sends to GPT-4 with critique prompt, writes output.
 * Exit 0 on success, exit 1 on skip (with stderr message).
 */

import "dotenv/config";
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import OpenAI from "openai";

const TIMEOUT_MS = 90_000;
const MAX_INPUT_CHARS = 48_000; // ~12k tokens

async function main() {
  const [researchPath, outputPath, promptPath] = process.argv.slice(2);

  if (!researchPath || !outputPath || !promptPath) {
    console.error("Usage: node scripts/call-gpt4.mjs <research-path> <output-path> <prompt-template-path>");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not set — skipping GPT-4 critique");
    process.exit(1);
  }

  const client = new OpenAI();

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
          model: "gpt-4o",
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
        console.error("GPT-4 returned empty response");
        process.exit(1);
      }

      // Ensure output directory exists
      await mkdir(dirname(outputPath), { recursive: true });

      const output = `---
type: critique-gpt4
date: "${new Date().toISOString().split("T")[0]}"
model: gpt-4o
---

${content}`;

      await writeFile(outputPath, output, "utf-8");
      console.log(`GPT-4 critique written to ${outputPath}`);
      process.exit(0);
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        console.error("GPT-4 request timed out");
        process.exit(1);
      }
      if (attempts < maxAttempts && (err.status === 429 || err.status >= 500)) {
        console.error(`GPT-4 error (${err.status}), retrying...`);
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      console.error(`GPT-4 critique failed: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
