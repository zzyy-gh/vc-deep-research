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
  - `meta.yaml` — Entity metadata, pipeline state, round tracking
  - `sources.yaml` — External sources used across all artifacts
  - `changelog.md` — Append-only history narrative
  - `output/` — All generated artifacts (pipeline, critique, custom, consolidated)
  - `user-insights/` — User-supplied context
- `research/markets/{slug}/` — Market research
- `research/theses/{slug}/` — Investment theses
- `research/due-diligence/{slug}/` — DD deep dives
- `research/{slug}/` — Cross-entity synthesis (e.g., `research/acme-vs-beta/`)
- `templates/` — Output templates for each research type
- `scripts/` — External model integration scripts

## Research Pipeline Phases
1. **Screen** (haiku, ~60s): One-page overview. User decides if worth pursuing.
2. **Deep Dive** (opus/sonnet, parallel): User-directed dimensions — core research, financials, product, first-principles.
3. **Critique** (sonnet, parallel): 3 Claude critics (analytical, bear, IC) + optional GPT-4/Gemini/Groq.
4. **Assessment** (sonnet): Deal-breakers, key assumptions register, unknowns inventory, discrepancies.
5. **Consolidated Report**: Generated after assessment — pulls from all artifacts in `output/`.
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

## Output Convention

All generated artifacts live in `{entity}/output/` with descriptive versioned filenames. This convention is the single source of truth — all skills, agents, and custom prompts follow it.

### File Naming

Format: `{source}-{description}-v{round}.md`

| Component | Values | Notes |
|-----------|--------|-------|
| `source` | Agent name: `screener`, `researcher`, `financial-analyst`, `product-analyst`, `first-principles`, `critic-analytical`, `critic-bear`, `critic-ic`, `critic-groq`, `critic-gpt4`, `critic-gemini`, `assessor`, `orchestrator`, `synthesizer` | Matches `.claude/agents/` directory names. `orchestrator` = skill-generated. External critics use `critic-{model}`. |
| `description` | Short kebab-case content descriptor | Describes *what*, not *type*. Determined contextually by the invoking skill. |
| `v{round}` | `v1`, `v2`, `v3`... | Matches `current_round` from meta.yaml. Always prefixed with `v`. |

### Frontmatter Schema

All artifacts use this standardized frontmatter:

```yaml
---
entity: "{name}"
type: "{artifact type}"          # screen, company-research, financial-analysis, product-analysis,
                                  # first-principles, critique-analytical, critique-bear, critique-ic,
                                  # assessment, consolidated-report, custom-research, custom-report
source: "{agent} ({model})"      # e.g., "researcher (opus)", "critic-bear (sonnet)", "orchestrator"
round: {N}
date: "{timestamp}"
description: "{human-readable, matches filename description}"
refined_from: v{N-1}             # only present if refining a prior version
inputs:                           # files this artifact read/was based on (paths relative to output/)
  - screener-company-overview-v1.md
  - user-insights/20260317-founder-call.md
---
```

The `source:` field replaces all per-agent fields (`researcher:`, `analyst:`, `critic:`, `screener:`, `assessor:`).

### Version Detection & Self-Archiving

Before writing any artifact, the skill MUST:
1. Glob `output/{source}-{description}-v*.md` to check for existing versions
2. If prior versions exist, write the new version as `v{current_round}` — prior versions stay in place
3. Latest version = highest `vN` number
4. No copy/move/delete step. Versions coexist (self-archiving).

This logic applies to ALL skills (`/research`, `/critique`, `/synthesize`, etc.) and any direct agent invocations.

## Conventions
- **Slugs**: lowercase, hyphenated (e.g., `acme-ai`, `enterprise-saas-market`)
- **meta.yaml**: Every research entity has one. Tracks status, tags, pipeline state.
- **Status progression**: screened → researched → critiqued → assessed → refined
- **User insights**: Stored in `{slug}/user-insights/` with YAML frontmatter. Agents must check these before writing sections.
- **Changelog**: Each research entity has `changelog.md` — cumulative log of what changed per iteration.
- **Word cap**: ~3000 words per research document to prevent context overflow.
- **Source tracking**: `sources.yaml` per entity tracks all sources used.
- **Rounds**: `current_round` in meta.yaml (starts at 1). Increments on refinement.
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
