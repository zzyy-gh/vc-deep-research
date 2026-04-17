---
name: research
description: "Full research pipeline — all layers, all assessments, DD on final output"
tools: Agent, Skill, Read, Write, Glob, Grep, Bash, WebSearch, WebFetch
---

# Research Pipeline

Run the complete research pipeline for a company. All skills run sequentially, each in its own subagent. The user specifies the final output — typically `pre-meeting-read` or `consolidated-report`.

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

## Dispatching Skill Subagents

Every skill runs in its own subagent. Spawn one at a time — sequential. The orchestrator reads `state.md` before each dispatch to know what exists, then writes a contextual prompt for that skill.

### Required in every skill subagent prompt

Include all of these — a subagent that doesn't receive them will silently fall back to wrong behavior:

1. **Entity name and slug**
2. **Skill name** to run
3. **Prior artifacts** available — filenames from the state.md Artifacts table
4. **Cached pages** available — page numbers, summaries, and paths from the state.md Cached Pages table
5. **Fetch rule** — run `node .claude/scripts/cache-page.mjs {slug} {url}` for every URL before reading content. Only use WebFetch if the script errors; if so, write the result to `pages/NNN.md` manually.
6. **State update rule** — append a Cached Pages row for each newly cached page; append an Artifacts row after writing the skill output. Both updates happen before the subagent exits.
7. **Citation rule** — every factual claim gets a `<sup>N</sup>` superscript; artifact ends with a numbered references list with real URLs; never cite other pipeline artifacts as sources.

### Per-skill research flow

Each subagent follows this sequence:

1. Read `state.md` — know what artifacts and cached pages exist
2. Determine what the skill needs — check if existing cached pages already cover it
3. If more info needed: WebSearch to find URLs → `cache-page.mjs` for uncached URLs → read the cached `.md` files
4. For each newly cached page: append a row to state.md Cached Pages with a whole-page summary
5. Run the skill's analysis using the SKILL.md spec
6. Write the artifact to `output/{skill}/`
7. Append a row to state.md Artifacts summarizing what the artifact covers

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
