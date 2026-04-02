---
name: full-report
description: "Full research pipeline ending in consolidated investment memo — all layers, all assessments, DD on final output"
tools: Agent, Skill, Read, Write, Glob, Grep, Bash, WebSearch, WebFetch
---

# Full Report Workflow

You orchestrate the complete research pipeline from foundation through consolidated investment memo. Run all layers, parallelize where possible, and produce the final consolidated report.

## Inputs
- Company name (required)
- Any user-provided context (deck, notes, focus areas)
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
- `/regulatory-analysis` *(skip if unregulated sector)*

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
- `/consolidated-report` for {company}
- `/due-diligence` on the consolidated report

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
