#!/usr/bin/env node
/**
 * External Model Skill Execution
 * Usage: node .claude/scripts/run-skill-external.mjs <model> <skill> <slug> [input-file...]
 *
 * Runs a full skill through an external model API.
 * The model receives SKILL.md as its system prompt and input files as context.
 * Output goes to compare/{skill}-{model}/{skill}-{slug}-v{round}.md
 *
 * Models: gemini, groq
 * Exit 0 on success, exit 1 on skip/error (with stderr message).
 */

import "dotenv/config";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import { dirname, basename, join } from "path";

const TIMEOUT_MS = 120_000;
const MAX_INPUT_CHARS = 48_000;

const MODELS = {
  gemini: {
    env: "GOOGLE_API_KEY",
    model: "gemini-2.0-flash",
  },
  groq: {
    env: "GROQ_API_KEY",
    model: "llama-3.3-70b-versatile",
  },
};

const CONTEXT_PREAMBLE = `You do not have web access or tool access. Work only from the context provided below. Produce your output as a single markdown document following the template in your instructions.

Do not reference tools like WebSearch, WebFetch, Glob, or Read — you cannot use them. If your instructions mention using these tools, skip those steps and work from the provided context instead.

---

`;

async function callGemini(apiKey, modelId, systemPrompt, userMessage) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    generationConfig: { maxOutputTokens: 8192, temperature: 0.3 },
  });

  return result.response.text();
}

async function callGroq(apiKey, modelId, systemPrompt, userMessage) {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const response = await client.chat.completions.create({
    model: modelId,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 8192,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content;
}

const CALLERS = { gemini: callGemini, groq: callGroq };

/**
 * Discover the next round number by checking existing files in the output directory.
 */
async function nextRound(outputDir, skill, slug) {
  try {
    const files = await readdir(outputDir);
    const pattern = new RegExp(`^${skill}-${slug}-v(\\d+)\\.md$`);
    let max = 0;
    for (const f of files) {
      const m = f.match(pattern);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
    return max + 1;
  } catch {
    return 1;
  }
}

// Auto-discover input files for a given slug.
// Searches output/ for matching artifacts and docs/ for user materials.
async function autoDiscover(slug) {
  const files = [];

  // Find all artifacts for this slug in output/
  try {
    const outputEntries = await readdir("output", { recursive: true });
    const slugPattern = new RegExp(`-${slug}-v\\d+\\.md$`);
    for (const entry of outputEntries) {
      if (slugPattern.test(entry)) {
        files.push(join("output", entry));
      }
    }
  } catch {
    // output/ may not exist
  }

  // Find all docs
  try {
    const docEntries = await readdir("docs");
    for (const entry of docEntries) {
      files.push(join("docs", entry));
    }
  } catch {
    // docs/ may not exist
  }

  return files;
}

/**
 * Post-process model output to fix the model: field in frontmatter.
 */
function fixModelField(content, actualModel) {
  // Match YAML frontmatter model field and replace with actual model
  return content.replace(
    /^(---[\s\S]*?model:\s*)"?[^"\n]+"?/m,
    `$1"${actualModel}"`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const [modelName, skill, slug, ...inputFiles] = args;

  if (!modelName || !skill || !slug) {
    console.error(
      "Usage: node .claude/scripts/run-skill-external.mjs <gemini|groq> <skill> <slug> [input-file...]"
    );
    process.exit(1);
  }

  const config = MODELS[modelName];
  if (!config) {
    console.error(
      `Unknown model: ${modelName}. Available: ${Object.keys(MODELS).join(", ")}`
    );
    process.exit(1);
  }

  const apiKey = process.env[config.env];
  if (!apiKey) {
    console.error(`${config.env} not set — skipping ${modelName} skill execution`);
    process.exit(1);
  }

  // Read SKILL.md
  const skillPath = join(".claude", "skills", skill, "SKILL.md");
  let skillContent;
  try {
    skillContent = await readFile(skillPath, "utf-8");
  } catch {
    console.error(`Skill not found: ${skillPath}`);
    process.exit(1);
  }

  // Gather input context
  const filesToRead = inputFiles.length > 0 ? inputFiles : await autoDiscover(slug);

  let context = "";
  for (const f of filesToRead) {
    try {
      const content = await readFile(f, "utf-8");
      context += `\n\n--- FILE: ${basename(f)} ---\n\n${content}`;
    } catch (err) {
      console.error(`Warning: could not read ${f}: ${err.message}`);
    }
  }

  if (context.length > MAX_INPUT_CHARS) {
    context = context.slice(0, MAX_INPUT_CHARS) + "\n\n[... truncated for length]";
  }

  const userMessage = CONTEXT_PREAMBLE + (context || "(No input files provided. Produce your best output based on the skill instructions alone.)");

  // Determine output path
  const outputDir = join("compare", `${skill}-${modelName}`);
  const round = await nextRound(outputDir, skill, slug);
  const outputPath = join(outputDir, `${skill}-${slug}-v${round}.md`);

  // Call external model
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const content = await Promise.race([
        CALLERS[modelName](apiKey, config.model, skillContent, userMessage),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), TIMEOUT_MS)
        ),
      ]);

      if (!content) {
        console.error(`${modelName} returned empty response`);
        process.exit(1);
      }

      // Post-process: fix model field in frontmatter
      const fixedContent = fixModelField(content, config.model);

      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, fixedContent, "utf-8");

      console.log(`${modelName} skill output written to ${outputPath}`);
      console.log(`  Skill: ${skill}`);
      console.log(`  Model: ${config.model}`);
      console.log(`  Round: ${round}`);
      console.log(`  Input files: ${filesToRead.length}`);
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
      console.error(`${modelName} skill execution failed: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
