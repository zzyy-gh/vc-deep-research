# VC Deep Research System

## What This Is
A modular skill-based system for venture capital due diligence research. Each skill is an independent, self-contained research task that produces one artifact. The main agent decides which skills to run based on what the user needs and what already exists.

## Core Principles
- **Skills are independent**: Each skill is a complete task — persona, process, and quality standards inline. No skill calls another skill. All research output belongs to skills.
- **Agents are workflows, not owners**: Agents can be created to bundle skills into reusable workflows (e.g., "full company analysis" = company-deep-dive + financial-analysis + product-teardown + assess-bear + assess-general). But agents don't produce their own artifacts — they orchestrate skills, and all output is still skill-owned.
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

### Research
| Skill | What It Does |
|-------|-------------|
| `company-deep-dive` | Comprehensive company research — team, product, market, competition, traction, risks, thesis |
| `financial-analysis` | Unit economics, burn rate, cap table, comparables, revenue quality |
| `product-teardown` | Product architecture, moat, PMF signals, competitive comparison |

### People
| Skill | What It Does |
|-------|-------------|
| `graham-duncan-eval` | Talent evaluation using Graham Duncan's framework (6 dimensions, qualitative ratings) |
| `founder-market-fit` | Founder-market fit — domain expertise, network, timing, motivation, complementarity |

### Assessment
| Skill | What It Does |
|-------|-------------|
| `assess-bear` | Strongest evidence-based case against the investment |
| `assess-ic` | IC partner perspective — returns math, fund fit, hard questions |
| `assess-first-principles` | Stress-tests claims — minimum viable version, kill-the-company, historical analogs, path to $1B+ |
| `assess-general` | Deal-breakers, key assumptions, unknowns, section health |

### Synthesis
| Skill | What It Does |
|-------|-------------|
| `consolidated-report` | Investment memo merging all available artifacts |

### Meeting Prep
| Skill | What It Does |
|-------|-------------|
| `pre-meeting-read` | Quick research brief for meeting prep — company snapshot, financials, catalysts, risks, questions to ask |

### Due Diligence
| Skill | What It Does |
|-------|-------------|
| `due-diligence` | Verification and correction pass on any artifact — verifies claims via independent research, checks logical soundness, reads the original skill's SKILL.md, and writes a corrected new version if issues found. Marks corrections with `[DD-corrected]`. |

Due diligence doesn't produce its own artifact type. It reads an existing artifact, verifies it, and if corrections are needed, writes a new version of that same artifact (e.g., `company-deep-dive-acme-ai-v2.md` with `refined_from: v1`).

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

Agent: Runs company-deep-dive → produces company-deep-dive-acme-ai-v1.md
Agent: Runs financial-analysis → produces financial-analysis-acme-ai-v1.md
Agent: Runs product-teardown → produces product-teardown-acme-ai-v1.md
Agent: Presents summaries to user.

User: "The financials look shaky — can you verify those claims?"

Agent: Runs due-diligence on financial-analysis-acme-ai-v1.md
       → finds 3 contradicted claims, 2 unverified
       → writes financial-analysis-acme-ai-v2.md (corrected, with [DD-corrected] markers)

User: "Get a second opinion from Gemini on the company research"

Agent: Runs call-external.mjs gemini on company-deep-dive-acme-ai-v1.md
       → saves Gemini output as working file
Agent: Runs assess-first-principles with company-deep-dive + Gemini output as inputs
       → produces assess-first-principles-acme-ai-v1.md (cites [Gemini] where relevant)

User: "Now run the bear case and IC review"

Agent: Runs assess-bear → assess-bear-acme-ai-v1.md
Agent: Runs assess-ic → assess-ic-acme-ai-v1.md

User: "Let's also look at the founders"

Agent: Runs graham-duncan-eval → graham-duncan-eval-acme-ai-v1.md
Agent: Runs founder-market-fit → founder-market-fit-acme-ai-v1.md

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
  company-deep-dive/company-deep-dive-acme-ai-v1.md
  company-deep-dive/company-deep-dive-acme-ai-v2.md   # DD-corrected
  financial-analysis/financial-analysis-acme-ai-v1.md
  financial-analysis/financial-analysis-acme-ai-v2.md   # DD-corrected
  assess-first-principles/assess-first-principles-acme-ai-v1.md
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
  - company-deep-dive-acme-ai-v1.md
refined_from: v{N-1}              # only if refining
---
```

### Versioning
Before writing, check `glob output/{skill}/{skill}-{slug}-v*.md`. Prior versions stay in place — versions coexist.

## Conventions
- **Slugs**: lowercase, hyphenated (e.g., `acme-ai`)
- **Word cap**: ~3000 for research/synthesis, ~2500 for assess-first-principles, ~2000 for assessment/people analysis, ~1500 for pre-meeting-read
- **Timestamps**: ISO 8601 with SGT: `YYYY-MM-DDTHH:MM:SS+08:00`
- **Context management**: Pass file paths to skills, not file contents. Skills read files themselves.
