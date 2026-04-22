#!/usr/bin/env node
/**
 * Web Page Cache Script
 * Usage: node .claude/scripts/cache-page.mjs <slug> <url>
 *
 * Fetches a URL, converts HTML to clean markdown, writes to research cache.
 * Returns JSON to stdout: { page, path, title, description }
 * On error: { error: "..." }
 */

import { writeFile, mkdir, readdir } from "fs/promises";
import { join } from "path";
import { JSDOM } from "jsdom";
import { Readability, isProbablyReaderable } from "@mozilla/readability";
import TurndownService from "turndown";

const TIMEOUT_MS = 30_000;
const MAX_CONTENT_CHARS = 100_000;
const READABILITY_MIN_LENGTH = 500;
const USER_AGENT = "Mozilla/5.0 (compatible; research-cache/1.0)";

function out(obj) {
  console.log(JSON.stringify(obj));
}

function fail(msg) {
  out({ error: msg });
  process.exit(0); // exit 0 so agent handles gracefully
}

// Strip residual noise that survives Readability or fallback stripping.
// These patterns are site-agnostic: empty-text links, social-share clusters,
// Wikipedia edit anchors, jump-to-content anchors, trailing link dumps.
function postprocessMarkdown(md) {
  // Empty-text markdown links: [](url) — covers social-share icon clusters,
  // bare image placeholders, and other chrome that renders as a naked link.
  md = md.replace(/\[\]\([^)]*\)/g, "");

  // Wikipedia section-edit anchors: \[[edit](...action=edit...)\]
  md = md.replace(/\\?\[\[edit\]\([^)]*action=edit[^)]*\)\\?\]/gi, "");

  // Jump-to-content / skip-navigation anchors
  md = md.replace(/\[Jump to [^\]]+\]\(#[^)]+\)/gi, "");
  md = md.replace(/\[Skip (?:to|Navigation)[^\]]*\]\(#[^)]+\)/gi, "");

  // Collapse whitespace runs introduced by removals
  md = md.replace(/^[ \t]+$/gm, "");
  md = md.replace(/\n{3,}/g, "\n\n");

  // Drop a trailing section that is mostly links (related-articles carousels,
  // "Also from this source", "More Releases", category footers).
  md = stripTrailingLinkDump(md);

  return md.trim();
}

function stripTrailingLinkDump(md) {
  const headings = [...md.matchAll(/^##\s+.+$/gm)];
  if (headings.length === 0) return md;

  const last = headings[headings.length - 1];
  const block = md.slice(last.index);
  const lines = block.split("\n").slice(1).filter((l) => l.trim().length > 0);
  if (lines.length < 3) return md;

  const linkLike = lines.filter((l) => {
    // A line "is link-like" if removing markdown links leaves nothing
    // substantive (empty, bullet marker, date fragment).
    const stripped = l.replace(/\[[^\]]*\]\([^)]*\)/g, "").trim();
    if (stripped === "" || stripped === "*" || stripped === "-") return true;
    if (/^[A-Z][a-z]+ \d{1,2},? \d{4}$/.test(stripped)) return true; // "April 16, 2026"
    if (stripped.length < 20 && !/[.!?]/.test(stripped)) return true;
    return false;
  }).length;

  if (linkLike / lines.length > 0.6) {
    return md.slice(0, last.index);
  }
  return md;
}

async function main() {
  const [slug, url] = process.argv.slice(2);

  if (!slug || !url) {
    console.error("Usage: node .claude/scripts/cache-page.mjs <slug> <url>");
    process.exit(1);
  }

  // --- Fetch ---
  let response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    clearTimeout(timeout);
  } catch (err) {
    if (err.name === "AbortError") fail(`timeout after ${TIMEOUT_MS / 1000}s`);
    fail(`fetch failed: ${err.message}`);
    return;
  }

  if (!response.ok) {
    fail(`HTTP ${response.status} ${response.statusText}`);
    return;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") && !contentType.includes("text/xml") && !contentType.includes("application/xhtml")) {
    fail(`non-HTML content type: ${contentType}`);
    return;
  }

  const html = await response.text();
  const finalUrl = response.url; // after redirects

  // --- Parse metadata ---
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector("title")?.textContent?.trim() || "";
  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ||
    doc.querySelector('meta[property="og:description"]')?.getAttribute("content")?.trim() ||
    "";
  const author =
    doc.querySelector('meta[name="author"]')?.getAttribute("content")?.trim() ||
    doc.querySelector('meta[property="article:author"]')?.getAttribute("content")?.trim() ||
    "";
  const published =
    doc.querySelector('meta[property="article:published_time"]')?.getAttribute("content")?.trim() ||
    doc.querySelector('meta[name="date"]')?.getAttribute("content")?.trim() ||
    doc.querySelector("time[datetime]")?.getAttribute("datetime")?.trim() ||
    "";

  // --- Article extraction (Readability first, fallback to selector strip) ---
  // Readability mutates the document, so parse a fresh DOM for it.
  let sourceHtml = null;
  try {
    const readDom = new JSDOM(html, { url: finalUrl });
    const readDoc = readDom.window.document;
    if (isProbablyReaderable(readDoc)) {
      const article = new Readability(readDoc).parse();
      if (article?.content && (article.textContent?.length ?? 0) >= READABILITY_MIN_LENGTH) {
        sourceHtml = article.content;
      }
    }
  } catch {
    // fall through to fallback path
  }

  if (!sourceHtml) {
    // Fallback: whole doc minus structural chrome
    for (const sel of ["script", "style", "nav", "footer", "header", "aside", "iframe", "noscript"]) {
      doc.querySelectorAll(sel).forEach((el) => el.remove());
    }
    sourceHtml = doc.body?.innerHTML || "";
  }

  // --- Convert ---
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  // Skip images to keep output text-focused
  turndown.addRule("images", { filter: "img", replacement: () => "" });

  let markdown = turndown.turndown(sourceHtml);
  markdown = postprocessMarkdown(markdown);

  if (!markdown || markdown.trim().length < 50) {
    fail("page content too short after conversion (likely JS-rendered)");
    return;
  }

  const truncated = markdown.length > MAX_CONTENT_CHARS;
  if (truncated) {
    markdown = markdown.slice(0, MAX_CONTENT_CHARS) + "\n\n[truncated]";
  }

  // --- Write page file ---
  const pagesDir = join("output", ".research", slug, "pages");
  await mkdir(pagesDir, { recursive: true });

  let nextNum = 1;
  try {
    const files = await readdir(pagesDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));
    nextNum = mdFiles.length + 1;
  } catch {
    // directory just created, start at 1
  }

  const pageNum = String(nextNum).padStart(3, "0");
  const pagePath = join(pagesDir, `${pageNum}.md`);

  // Build frontmatter
  const meta = [`url: "${finalUrl}"`, `title: "${title.replace(/"/g, '\\"')}"`];
  meta.push(`fetched: "${new Date().toISOString()}"`);
  if (author) meta.push(`author: "${author.replace(/"/g, '\\"')}"`);
  if (published) meta.push(`published: "${published}"`);
  if (truncated) meta.push(`truncated: true`);

  const content = `---\n${meta.join("\n")}\n---\n\n${markdown}`;
  await writeFile(pagePath, content, "utf-8");

  // --- Return metadata ---
  out({
    page: nextNum,
    path: `pages/${pageNum}.md`,
    title,
    description: description.slice(0, 300),
  });
}

main();
