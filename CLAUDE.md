# VC Deep Research System

## What This Is
A staged research pipeline for venture capital due diligence. Users input a company/market/thesis, and the system runs: quick screen → directed deep dive → multi-model critique → assessment → refinement.

## Core Principles
- **Staged workflow**: Don't burn compute on companies the user would screen out in 2 minutes
- **Write to disk, read from disk**: Never pass large content through conversation context. All inter-phase data goes through files.
- **User decides at every gate**: 4 decision points (after screen, after research, after assessment, after refinement)
- **Deal-breakers over scores**: No 0-100 confidence scores. Use deal_breakers / key_assumptions / unknowns_inventory framework.
- **Filesystem as index**: Research lives in `research/companies/{slug}/`. Git tracks history. No YAML index files.
- **Graceful degradation**: External model critics (GPT-4, Gemini, Groq) are optional enrichment. System works fine without them.

## Directory Layout
- `research/companies/{slug}/` — Per-company research artifacts
  - `history/` — Flat archive of prior round artifacts (e.g., `round-1-research.md`)
  - `report.md` — Consolidated investment memo (regenerated each round, not archived)
- `research/markets/{slug}/` — Market research
- `research/theses/{slug}/` — Investment theses
- `research/due-diligence/{slug}/` — DD deep dives
- `research/syntheses/{slug}/` — Cross-entity synthesis
- `templates/` — Output templates for each research type
- `scripts/` — External model integration scripts

## Research Pipeline Phases
1. **Screen** (haiku, ~60s): One-page overview. User decides if worth pursuing.
2. **Deep Dive** (opus/sonnet, parallel): User-directed dimensions — core research, financials, product, first-principles.
3. **Critique** (sonnet, parallel): 3 Claude critics (analytical, bear, IC) + optional GPT-4/Gemini/Groq.
4. **Assessment** (sonnet): Deal-breakers, key assumptions register, unknowns inventory, discrepancies.
5. **Consolidated Report**: `report.md` generated after assessment — pulls from all artifacts.
6. **Refinement** (opus): Incorporate critique + assessment + user direction into updated research.

## Skills (User-Facing Commands)
- `/research` — Main entry point. Wizard → screen → dive → critique → assess → refine.
- `/critique` — Standalone critique on existing research.
- `/synthesize` — Cross-company/market synthesis and comparison.
- `/share-insight` — User feeds in articles, data, opinions for a company.
- `/status` — Deal pipeline dashboard with traffic-light assessments.

## Agent Routing
| Agent | Model | What It Does |
|-------|-------|-------------|
| screener | haiku | Quick 1-page company overview for go/no-go |
| researcher | opus | Comprehensive company/market research + refinement |
| financial-analyst | opus | Unit economics, burn, cap table, comps, revenue quality |
| product-analyst | sonnet | Product teardown, tech moat, PMF signals |
| first-principles | opus | Constraint-based reasoning, kill-the-company, historical analogs |
| critic-analytical | sonnet | Factual gaps, unsupported claims, logical rigor |
| critic-bear | sonnet | Strongest case against the investment |
| critic-ic | sonnet | IC partner perspective — returns, fund fit |
| assessor | sonnet | Deal-breakers, key assumptions, unknowns inventory |
| synthesizer | opus | Cross-research patterns, comparisons, thesis construction |

## Conventions
- **Slugs**: lowercase, hyphenated (e.g., `acme-ai`, `enterprise-saas-market`)
- **meta.yaml**: Every research entity has one. Tracks status, tags, pipeline state.
- **Status progression**: screened → researched → critiqued → assessed → refined
- **User insights**: Stored in `{slug}/user-insights/` with YAML frontmatter. Agents must check these before writing sections.
- **Changelog**: Each research entity has `changelog.md` — cumulative log of what changed per iteration.
- **Frontmatter round**: All artifact frontmatter must include `round: {N}` so each file self-documents which round produced it. Agents receive the round number from the orchestrator.
- **Refined artifacts**: When an agent refines a prior round's artifact, it sets `refined_from: round-{N-1}` in frontmatter to trace lineage.
- **Word cap**: ~3000 words per research document to prevent context overflow.
- **Source tracking**: `sources.yaml` per entity tracks all sources used.
- **Rounds**: `current_round` in meta.yaml (starts at 1). Increments on refinement.
- **Archive protocol**: Before overwriting any artifact in round 2+, copy it to `history/round-{N}-{filename}`. Orchestrator handles this — agents never touch `history/`.
- **Consolidated report**: `report.md` generated after each assessment. Derived document — not archived.
- **changelog.md**: Sole history narrative. Append-only.
- **Timestamps**: All `date:` frontmatter fields and meta.yaml timestamps (`started_at`, `last_updated`, `created`, `updated`) use ISO 8601 with SGT: `YYYY-MM-DDTHH:MM:SS+08:00`. The placeholder `{timestamp}` in agent/skill templates means current SGT datetime. Exceptions: `accessed:` in sources.yaml and changelog headers use date-only `YYYY-MM-DD`. Insight filenames use compact date `YYYYMMDD` (e.g., `20260317-founder-call.md`).

## Pipeline State & Resume
When `/research` starts, check `meta.yaml` for `pipeline_state`. If partial completion exists, offer to resume from the next phase. The `pipeline_state` field tracks:
- `current_phase`: which phase is active
- `completed_phases`: list of finished phases
- `user_directions`: what the user asked to focus on
- `current_round`: which research round (starts at 1, increments on refinement)
- `started_at` / `last_updated`: SGT timestamps (e.g., `2026-03-17T14:30:00+08:00`)

## Context Window Management
- Pass file paths to agents, not file contents
- Agents read files themselves using Read tool
- Refinement agent gets research + assessment summary (not all raw critiques)
- If user-insights/ exceeds ~8k tokens, summarize before feeding to agents
