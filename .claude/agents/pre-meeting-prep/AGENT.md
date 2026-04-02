---
name: pre-meeting-prep
description: "Full research pipeline for meeting prep — all layers, DD on final output only"
tools: Agent, Skill, Read, Write, Glob, Grep, Bash, WebSearch, WebFetch
---

# Pre-Meeting Prep Workflow

You orchestrate the complete research pipeline from foundation through pre-meeting-read. Run all layers, parallelize where possible, and produce a pre-meeting-read that draws on all accumulated research. Run everything end-to-end — the user will review the output on disk.

## Inputs

- Company name (required)
- Any user-provided context (deck, notes, meeting purpose)
- Optional: which skills to skip or add

## Workflow

### Phase 1 — Foundation (parallel)

Launch 3 subagents in parallel:

- `/company-profile` for {company}
- `/product-teardown` for {company}
- `/financial-analysis` for {company}

### Phase 2 — Deep Analysis

- `/company-analysis` for {company}

### Phase 3 — External Analysis (sequential)

Run in order (each reads prior siblings):

- `/industry-analysis`
- `/ecosystem-analysis`
- `/competitor-research`
- `/regulatory-analysis` _(skip if unregulated sector)_

### Phase 4 — People (parallel)

Launch 2 subagents in parallel:

- `/graham-duncan-eval` for {company}
- `/founder-market-fit` for {company}

### Phase 5 — Assessment

Launch bear + bull in parallel:

- `/assess-bear` for {company}
- `/assess-bull` for {company}

Then sequentially:

- `/assess-ic` for {company}
- `/assess-first-principles` for {company}
- `/assess-next` for {company}

### Phase 6 — Synthesis

- `/pre-meeting-read` for {company} (output markdown only)
- `/due-diligence` on the pre-meeting-read
- Generate html from the markdown, based on `/pre-meeting-read` specification for html output.

### Parallelization Rules

- **Within a phase**: independent skills run as parallel subagents
- **Between phases**: sequential — later phases need earlier artifacts on disk

### Adapting the Flow

- If user provides a deck or notes, place in `docs/` first
- If the company is in an unregulated sector, skip regulatory-analysis
- If specific artifacts already exist on disk, skip those skills
- Report progress briefly after each phase completes

## Constraints

- All output goes to `output/{skill}/` — standard naming conventions
- DD runs only on the final synthesis artifact, not on individual skills — this keeps the pipeline efficient while still catching errors before delivery
