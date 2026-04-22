---
name: research
description: "Full research pipeline — all layers, all assessments, DD on final output"
tools: Skill, Read, Write, Glob, Grep, Bash, WebSearch, WebFetch
---

# Research Pipeline

Run the complete research pipeline for a company. All skills run sequentially. The user specifies the final output — typically `pre-meeting-read` or `consolidated-report`.

## Inputs

- Company name (required)
- Final output skill (required)
- Any user-provided context (deck, notes, meeting purpose)
- Optional: which skills to skip or add

## Infrastructure

### Research State

Each pipeline maintains `output/.research/{slug}/state.md` — a lightweight map of everything produced so far. Two tables:

```markdown
# Research State — {Entity}

## Artifacts

| Skill | Covers | Path |
| ----- | ------ | ---- |

## Cached Pages

| #   | Covers | Source | Path |
| --- | ------ | ------ | ---- |
```

- **Artifacts "Covers"**: what the skill's output covers (its analysis, not just facts).
- **Cached Pages "Covers"**: comprehensive whole-page summary — what the page contains, not biased toward any one skill's task. Serves all downstream skills.
- If `state.md` already exists from a prior run, reuse it — cached pages remain valid.

### Web Cache

```bash
node .claude/scripts/cache-page.mjs {slug} {url}
```

Fetches the URL, converts to clean markdown, writes to `output/.research/{slug}/pages/NNN.md`. Returns JSON to stdout with page number, path, title, and description. Cached pages carry YAML frontmatter (url, title, fetched timestamp, author, published date) followed by full page content.

**Fallback:** If the script errors (JS-heavy site, paywall, non-HTML), use WebFetch with a broad prompt, write the result to `pages/NNN.md` via Write tool, and append to `state.md` manually.

### Output Conventions

Each skill writes to `output/{skill}/{skill}-{slug}-v{round}.md`. Slugs are lowercase, hyphenated (e.g., `acme-ai`). Timestamps use ISO 8601 with SGT: `YYYY-MM-DDTHH:MM:SS+08:00`. Before writing, `glob output/{skill}/{skill}-{slug}-v*.md` — prior versions stay in place, versions coexist.

### Frontmatter

Every artifact carries:

```yaml
---
entity: "{name}"
skill: "{skill-name}"
type: "{artifact type}"
round: { N }
date: "{timestamp}"
model: "{model}"
description: "{human-readable}"
inputs:
  - company-profile-acme-ai-v1.md
refined_from: v{N-1} # only if refining
---
```

## Workflow

### Phase 0 — Initialize

- `mkdir -p output/.research/{slug}/pages`
- Write empty `state.md` if it doesn't exist; reuse if it does
- Place any user-provided deck or notes in `docs/`

### Phase 1 — Foundation

- `company-profile`
- `product-teardown`
- `financial-analysis`

### Phase 2 — Deep Analysis

- `company-analysis`

### Phase 3 — External Analysis

Each reads prior artifacts and siblings:

- `industry-analysis`
- `ecosystem-analysis`
- `competitor-research`
- `regulatory-analysis` _(skip if unregulated sector)_

### Phase 4 — People

- `graham-duncan-eval`
- `founder-market-fit` _(reads the talent eval)_

### Phase 5 — Assessment

`recent-signals` runs first — downstream assessments read it:

- `recent-signals`
- `assess-bear`
- `assess-bull`
- `assess-ic`
- `assess-first-principles`
- `assess-next`

### Phase 6 — Synthesis

- Run the user-specified final output skill
- `due-diligence` on the final artifact
- If `pre-meeting-read`: generate HTML from the markdown per the skill's HTML spec

### Adapting

- Skip skills whose artifacts already exist on disk
- If the user specifies only a final output skill, run only the layers that skill depends on
