# VC Deep Research System

## What This Is
A modular skill-based system for venture capital due diligence research. Each skill is an independent, self-contained research task that produces one artifact. The main agent decides which skills to run based on what the user needs and what already exists.

## Core Principles
- **Skills are independent**: Each skill is a complete task — persona, process, and quality standards inline. No skill calls another skill. All research output belongs to skills.
- **Agents are workflows, not owners**: Agents can be created to bundle skills into reusable workflows (e.g., "full company analysis" = company-profile + company-analysis + industry-analysis + competitor-research + assess-bear + assess-general). But agents don't produce their own artifacts — they orchestrate skills, and all output is still skill-owned.
- **One skill = one artifact**: Every skill writes one output file to `output/{skill}/`.
- **Inputs at runtime**: Skills receive their inputs when invoked. Some skills read other artifacts as context; others work from web research alone. Inputs are flexible — not all need to be defined upfront.
- **Write to disk, read from disk**: All inter-skill data goes through files, never conversation context.
- **Deal-breakers over scores**: No 0-100 confidence scores. Use deal_breakers / key_assumptions / unknowns_inventory framework. Qualitative ratings (Exceptional / Strong / Solid / Developing / Limited) where needed.

## Directory Layout
```
docs/              — Place user-provided materials here (decks, notes, data)
.claude/
  skills/          — Skill definitions (one SKILL.md per skill, output template embedded, optional assets/ subfolder)
  scripts/         — External model script (call-external.mjs)
  agents/          — Agent definitions (tester, future workflow agents)
```

## Skills

### Layer 1 — Foundation
| Skill | What It Does |
|-------|-------------|
| `company-profile` | Company facts — team, product, traction, business model, funding history |
| `product-teardown` | Product and technology analysis — architecture, technical depth, defensibility, developer experience, roadmap signals |
| `financial-analysis` | Unit economics, burn rate, cap table, comparables, revenue quality |

### Layer 1.5 — Company Deep Analysis
| Skill | What It Does |
|-------|-------------|
| `company-analysis` | Vision, strategy, positioning logic, technology depth, current vs. future product |

### Layer 2 — External Analysis
| Skill | What It Does |
|-------|-------------|
| `industry-analysis` | Value chain decomposition, company positioning, layer-specific market sizing, dynamics, timing |
| `ecosystem-analysis` | Supply chain, customers, partnerships, dependencies, geopolitical risks |
| `competitor-research` | Competitors at correct value chain layer, comparison, moat assessment |
| `regulatory-analysis` | Regulations, compliance burden, regulatory risks/tailwinds, competitive implications |

### Layer 2P — People Analysis
| Skill | What It Does |
|-------|-------------|
| `graham-duncan-eval` | Talent evaluation using Graham Duncan's framework (6 dimensions, qualitative ratings) |
| `founder-market-fit` | Founder-market fit — domain expertise, network, timing, motivation, complementarity |

### Layer 3 — Assessment
| Skill | What It Does |
|-------|-------------|
| `assess-bear` | Strongest evidence-based case against the investment |
| `assess-ic` | IC partner perspective — returns math, fund fit, hard questions |
| `assess-first-principles` | Stress-tests claims — minimum viable version, kill-the-company, historical analogs, path to $1B+ |
| `assess-general` | Deal-breakers, key assumptions, unknowns, section health |

### Layer 4 — Synthesis
| Skill | What It Does |
|-------|-------------|
| `consolidated-report` | Investment memo merging all available artifacts |
| `pre-meeting-read` | Quick research brief for meeting prep — company snapshot, financials, catalysts, risks, questions to ask |
| `investment-memo` | Transform an investment memo into presentation slides |

### Due Diligence
| Skill | What It Does |
|-------|-------------|
| `due-diligence` | Verification and correction pass on any artifact — verifies claims via independent research, checks logical soundness, reads the original skill's SKILL.md, and writes a corrected new version if issues found. Marks corrections with `[DD-corrected]`. |

Due diligence doesn't produce its own artifact type. It reads an existing artifact, verifies it, and if corrections are needed, writes a new version of that same artifact (e.g., `company-profile-acme-ai-v2.md` with `refined_from: v1`).

## Research Layers

Skills form a dependency chain. Later layers read earlier artifacts accumulated on disk.

| Layer | Purpose | Skills | Reads From |
|-------|---------|--------|------------|
| 1. Foundation | Company facts | company-profile, product-teardown, financial-analysis | Web research + user docs |
| 1.5. Deep Analysis | Company strategy & depth | company-analysis | Layer 1 + web |
| 2. External Analysis | Industry, ecosystem, competitors, regulatory | industry-analysis → ecosystem-analysis → competitor-research → regulatory-analysis | Layers 1 + 1.5 + prior Layer 2 siblings |
| 2P. People | Talent & founder-market fit | graham-duncan-eval, founder-market-fit | Layers 1 + 1.5 |
| 3. Assessment | Judgment & stress-testing | assess-bear, assess-ic, assess-first-principles, assess-general | All prior layers |
| 4. Synthesis | Final outputs | consolidated-report, pre-meeting-read, investment-memo | Everything |

### Layer 2 sequencing
Layer 2 skills run in order. Each reads all prior Layer 2 artifacts plus Layers 1/1.5:
```
industry-analysis → ecosystem-analysis → competitor-research → regulatory-analysis
```
This ensures competitor-research has the value chain context from industry-analysis and the supply chain context from ecosystem-analysis. Context accumulates on disk — no information is lost between skills.

### Guidelines
- **Run due diligence after completing each skill** — don't batch DD to the end.
- Layers are a recommended order, not enforced. The user can skip or reorder.
- Layer 2 skills can run standalone but results will be richer with prior context.
- `regulatory-analysis` can be skipped entirely for unregulated sectors.
- To deep-dive a specific competitor, run the full pipeline on that competitor as a separate entity.

## Research Quality Standards

Principles that apply to ALL research skills:

- **Triangulation**: Every material claim needs 2-3 independent sources of different types (filing, report, news). Flag single-source claims explicitly.
- **Source typing**: Label sources as primary (filings, patents, direct data) or secondary (news, analyst reports). Prefer primary.
- **Explicit unknowns**: Every artifact must include a "What I Could Not Verify" section. Absence of evidence ≠ evidence of absence.
- **Depth test**: Research is deep enough when you can articulate the strongest counterargument, name the 2-3 assumptions the thesis hinges on, and new sources return diminishing information.
- **No confident fabrication**: If a specific number, date, or fact can't be sourced, say so. Never invent plausible-sounding data.
- **Bear case quality = research quality**: The strength of the bear case is the best proxy for research depth. Weak bear case = shallow research.
- **Recency awareness**: Flag data >12 months old. Prefer recent sources. Note when training data may be stale.
- **First-principles over consensus**: Market sizing should be bottom-up (unit × price × customers), not just restating analyst TAM figures.
- **Value chain before comparison**: Decompose the industry into layers/segments before identifying competitors or sizing markets. Distinguish a company's current product layer from their stated vision — both are valid but determine different competitive sets.
- **Search result skepticism**: Heavily-funded companies dominate search rankings. Smaller, layer-specific competitors are often invisible in generic searches. Use layer-specific terminology, not umbrella terms.
- **Self-sufficiency**: Every skill handles missing inputs gracefully. If expected input isn't available, the skill conducts its own lighter research rather than failing or producing gaps. Skills are always runnable standalone.
- **Research goes wide, synthesis focuses**: Research skills cover all relevant items found. Synthesis/consolidation skills touch on all but focus narrative on the crucial ones.

## External Models

Gemini and Groq are available for independent verification or a second opinion.

```bash
node .claude/scripts/call-external.mjs <gemini|groq> <input-path> <output-path>
```

Requires `GOOGLE_API_KEY` / `GROQ_API_KEY` in `.env`. Graceful skip if not set.

The agent runs the script on an artifact, saves the output as a working file, then passes it as additional context when invoking a skill. The skill cites it as `[Gemini]` or `[Groq]` and lists it in `inputs:`.

## Example Run

A typical research flow — the user and agent decide together what to run, in what order, and can adjust mid-process:

```
User: "Research Acme AI for me"

Layer 1:
Agent: Runs company-profile → company-profile-acme-ai-v1.md
Agent: Runs due-diligence on company-profile → passes, no corrections needed
Agent: Runs product-teardown → product-teardown-acme-ai-v1.md
Agent: Runs financial-analysis → financial-analysis-acme-ai-v1.md

Layer 1.5:
Agent: Runs company-analysis → company-analysis-acme-ai-v1.md

Layer 2 (sequential):
Agent: Runs industry-analysis → industry-analysis-acme-ai-v1.md
Agent: Runs ecosystem-analysis → ecosystem-analysis-acme-ai-v1.md
Agent: Runs competitor-research → competitor-research-acme-ai-v1.md
Agent: Runs due-diligence on competitor-research → finds 2 wrong-layer competitors
       → writes competitor-research-acme-ai-v2.md (corrected)

User: "The financials look shaky — can you verify those claims?"

Agent: Runs due-diligence on financial-analysis-acme-ai-v1.md
       → finds 3 contradicted claims, 2 unverified
       → writes financial-analysis-acme-ai-v2.md (corrected, with [DD-corrected] markers)

User: "Now run the bear case and IC review"

Agent: Runs assess-bear → assess-bear-acme-ai-v1.md
Agent: Runs assess-ic → assess-ic-acme-ai-v1.md

User: "Consolidate everything"

Agent: Runs assess-general (reads all research + assessment artifacts)
       → assess-general-acme-ai-v1.md
Agent: Runs consolidated-report (reads everything including assessment)
       → consolidated-report-acme-ai-v1.md
```

Key points: the user can inject DD or external models at any point, skip skills that aren't needed, run things in any order, and the agent adapts. There is no fixed pipeline — just skills and the user's judgment.

## Output Convention

### Structure
Each skill writes to its own subfolder: `output/{skill}/{skill}-{slug}-v{round}.md`

```
output/
  company-profile/company-profile-acme-ai-v1.md
  company-analysis/company-analysis-acme-ai-v1.md
  industry-analysis/industry-analysis-acme-ai-v1.md
  ecosystem-analysis/ecosystem-analysis-acme-ai-v1.md
  competitor-research/competitor-research-acme-ai-v1.md
  competitor-research/competitor-research-acme-ai-v2.md   # DD-corrected
  financial-analysis/financial-analysis-acme-ai-v1.md
  assess-bear/assess-bear-acme-ai-v1.md
  assess-general/assess-general-acme-ai-v1.md
  consolidated-report/consolidated-report-acme-ai-v1.md
```

### File Naming
Format: `{skill}-{slug}-v{round}.md`

### Frontmatter
Every versioned artifact has this frontmatter. `inputs:` uses filename only (globally unique via skill+slug+round).

```yaml
---
entity: "{name}"
skill: "{skill-name}"
type: "{artifact type}"
round: {N}
date: "{timestamp}"
model: "{model}"
description: "{human-readable}"
inputs:
  - company-profile-acme-ai-v1.md
refined_from: v{N-1}              # only if refining
---
```

### Versioning
Before writing, check `glob output/{skill}/{skill}-{slug}-v*.md`. Prior versions stay in place — versions coexist.

## Conventions
- **Slugs**: lowercase, hyphenated (e.g., `acme-ai`)
- **Word cap**: ~3000 for industry-analysis/competitor-research/product-teardown/consolidated-report, ~2500 for company-analysis/ecosystem-analysis/assess-first-principles, ~2000 for company-profile/regulatory-analysis/assessment/people analysis, ~1500 for pre-meeting-read
- **Timestamps**: ISO 8601 with SGT: `YYYY-MM-DDTHH:MM:SS+08:00`
- **Context management**: Pass file paths to skills, not file contents. Skills read files themselves.
