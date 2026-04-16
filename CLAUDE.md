# VC Deep Research System

## What This Is

A modular, agent-assisted system for VC due diligence research — designed so agents automate the research flow while users see everything and intervene when needed. Every artifact lands on disk in plain markdown, with explicit assumptions, verified facts, and honest gaps. Errors surface early, not buried in a final report. Where agents can't do the job alone (e.g., polished slide decks), the system assists as far as it can and makes clear where human finishing is needed.

## Architecture

**Skills** are the building blocks — each is a self-contained research task with its own persona, process, and quality standards. Each artifact belongs to one skill, but a skill can produce multiple artifacts (e.g., markdown + HTML rendering, slide spec + advisory). No skill calls another skill.

**Agents** orchestrate skills into workflows (e.g., "full-report" runs company-profile → company-analysis → industry-analysis → … → consolidated-report). Agents don't produce their own artifacts — all output is skill-owned.

**Disk is the interface.** All data flows through files, never conversation context. Skills receive inputs as file paths and read them directly. Inputs are flexible — some skills read prior artifacts, others work from web research alone.

```
docs/              — User-provided materials (decks, notes, data)
.claude/
  skills/          — Skill definitions (one SKILL.md per skill, output template embedded, optional assets/ subfolder)
  scripts/         — External model scripts (call-external.mjs, run-skill-external.mjs)
  agents/          — Agent definitions (tester, pre-meeting-prep, full-report)
output/            — Skill artifacts ({skill}/{skill}-{slug}-v{round}.md)
compare/           — External model outputs (comparison only, never read by skills)
```

## Skills

| Layer | Skill                     | What It Does                                                                                                                                                                                               |
| ----- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `company-profile`         | Company facts — team, product, traction, business model, funding history                                                                                                                                   |
| 1     | `product-teardown`        | Product and technology analysis — architecture, technical depth, defensibility, developer experience, roadmap signals                                                                                      |
| 1     | `financial-analysis`      | Unit economics, burn rate, cap table, comparables, revenue quality                                                                                                                                         |
| 2     | `company-analysis`        | Vision, strategy, positioning logic, technology depth, current vs. future product                                                                                                                          |
| 3a    | `industry-analysis`       | Value chain decomposition, company positioning, layer-specific market sizing, dynamics, timing                                                                                                             |
| 3b    | `ecosystem-analysis`      | Supply chain, customers, partnerships, dependencies, geopolitical risks                                                                                                                                    |
| 3c    | `competitor-research`     | Competitors at correct value chain layer, comparison, moat assessment                                                                                                                                      |
| 3d    | `regulatory-analysis`     | Regulations, compliance burden, regulatory risks/tailwinds, competitive implications                                                                                                                       |
| 4     | `graham-duncan-eval`      | Talent evaluation using Graham Duncan's framework (6 dimensions, qualitative ratings)                                                                                                                      |
| 4     | `founder-market-fit`      | Founder-market fit — domain expertise, network, timing, motivation, complementarity                                                                                                                        |
| 5     | `recent-signals`          | Narrative deltas — what shifted in the last ~90 days, where concern is spiking, where excitement is building. Stage-adaptive sources (earnings calls, hiring, founder posts, etc.). Runs first in L5 so bear/bull can leverage it |
| 5a    | `assess-bear`             | Worst case — failure modes, competitive threats, market/financial/timing risks                                                                                                                             |
| 5a    | `assess-bull`             | Best case — upside scenarios, moat strength, tailwinds, why this could be a fund-returner                                                                                                                  |
| 5b    | `assess-ic`               | IC partner perspective — weighs bear vs. bull, returns math, fund fit, hard questions                                                                                                                      |
| 5c    | `assess-first-principles` | Foundational distillation — strips away narrative, stress-tests from fundamentals, deal-breakers/assumptions/unknowns, section health                                                                      |
| 5d    | `assess-next`             | Actionable next steps — diligence calls, founder questions, areas to investigate, connections to build, creative angles                                                                                    |
| 6     | `consolidated-report`     | Investment memo merging all available artifacts                                                                                                                                                            |
| 6     | `pre-meeting-read`        | Quick research brief for meeting prep — company snapshot, financials, catalysts, risks, questions to ask                                                                                                   |
| 6     | `investment-memo`         | Transform an investment memo into presentation slides                                                                                                                                                      |
| —     | `due-diligence`           | Verification and correction pass on any artifact — verifies claims, checks logical soundness, notes coverage gaps. Corrections → new version; additions only → in-place update. `dd: true` in frontmatter. |

## Agents

Two research agents share the same pipeline — they differ only in the final output.

**IMPORTANT — agent vs. skill routing:** When the user asks for "pre-meeting prep" or "full report" (or similar), run the **full pipeline** defined in the corresponding agent file (`.claude/agents/{agent}/AGENT.md`). Read the AGENT.md, then execute each phase by invoking skills via the Skill tool in the prescribed order, parallelizing where the workflow allows. Do NOT just invoke the final skill (`/pre-meeting-read` or `/consolidated-report`) alone — that skips all upstream research.

Only run a single skill directly when the user explicitly names that specific skill (e.g., "run company-profile for X").

```
Run the pre-meeting-prep agent for [Company Name].
```

```
Run the full-report agent for [Company Name].
```

**Pipeline:** L1 parallel (company-profile, product-teardown, financial-analysis) → L2 company-analysis → L3 sequential (industry → ecosystem → competitor → regulatory) → L4 parallel (graham-duncan-eval, founder-market-fit) → L5 (recent-signals → bear + bull parallel → IC → first-principles → next) → final output: **pre-meeting-read** or **consolidated-report** → DD on final output only

**tester** — workspace quality checks (read-only). Modes: `docs`, `scripts`, `full`, `optimize`, `integration`.

```
Run the tester agent in [mode] mode.
```

## Research Standards

Rules that govern how skills produce research. Apply to all skills.

### Process

- **Layer sequence matters.** Each layer builds on prior layers — skipping weakens downstream analysis. Reuse existing artifacts rather than re-running.
- **Same layer = parallel.** Sub-layers (a→b→c→d) run sequentially; each reads prior siblings' output.
- **Due-diligence runs on the final synthesis artifact** (consolidated-report or pre-meeting-read), not after every individual skill. Corrections produce a new version; additions update in-place.
- **Skip gracefully.** If a skill finds insufficient information, produce a shorter artifact noting what couldn't be found. The gap itself is signal for downstream skills.
- **Self-sufficiency.** If expected input isn't available, the skill conducts its own lighter research rather than failing. Skills are always runnable standalone.
- **Research covers, synthesis focuses.** Research skills cover all relevant items found. Synthesis skills touch on all but focus narrative on the crucial ones.
- **Deal-breakers over scores.** No 0-100 confidence scores. Use deal_breakers / key_assumptions / unknowns_inventory. Qualitative ratings (Exceptional / Strong / Solid / Developing / Limited) where needed.

### Data Integrity

- **Search, don't recall.** Every factual claim must come from a fetched source — never model weights. Model knowledge has a cutoff; live search is required even for things you "know." Reasoning and analysis on top of fetched facts is fine at any layer.
- Corroborate every material claim with 2-3 independent sources of different types (e.g., filing + report + news). Flag single-source claims.
- Prefer primary sources (filings, patents, direct data) over secondary (news, analyst reports).
- If a number, date, or fact can't be sourced, say so — never invent plausible-sounding data.
- Flag data older than 12 months and note when training data may be stale.
- Search results skew toward heavily-funded companies; use layer-specific terminology to surface smaller competitors.

### Citations & Verification

**Superscript citations:** Attach `<sup>N</sup>` to every factual claim, linking it to the references list. Multiple claims can share a citation.

**Confidence flags:** Mark issues with sourced claims inline — `[single-source]`, `[unverified]`, `[source: company PR]`, `[stale: 2024]`, `[estimated]`. These flag problems with information that *is* present.

**Verification gaps:** Note what you looked for but *couldn't find* — data you expected to exist, claims you wanted to confirm but had no sources for, areas where research came up empty. Weave these into the relevant section where the gap matters, not in a separate section at the end. This is a research discipline like situational awareness.

**References:** Every artifact ends with a numbered references list:

```
## References
1. [Source title](URL)
2. [Source title](URL)
```

### Situational Awareness

Every analysis starts by identifying the assumptions and current conditions it depends on — and considers how those assumptions might change. This isn't a template section; it's a research discipline woven into the output naturally. Different analyses have different situational needs: an industry analysis might need to understand recent market shifts; a bear case might need to understand the current funding environment.

## External Models

External models can critique artifacts or run full skills independently, for comparison with Claude's output. All external model outputs go to `compare/` and are **never read by skills** in the research chain. They exist for human/agent comparison only.

Requires `GOOGLE_API_KEY` / `GROQ_API_KEY` in `.env`. Graceful skip if not set.

### Critique Mode

Independent critique of an existing artifact:

```bash
node .claude/scripts/call-external.mjs <gemini|groq> <input-path> <output-path>
```

Recommended output path: `compare/critique-{model}/critique-{slug}-v{round}.md`

### Skill Execution Mode

Run a full skill through an external model API. The model receives SKILL.md as its prompt and input files as context. No web research — best suited for assessment, synthesis, and due-diligence skills that work from existing artifacts.

```bash
node .claude/scripts/run-skill-external.mjs <gemini|groq> <skill> <slug> [input-file...]
```

If no input files are specified, the script auto-discovers artifacts in `output/` for the given slug plus any files in `docs/`.

Output: `compare/{skill}-{model}/{skill}-{slug}-v{round}.md`

### Claude Code Backend Mode

When Claude Code is connected to a non-Claude backend, skills run normally through the Skill tool. To keep outputs separate for comparison, move the output after completion:

```bash
mv output/{skill}/{skill}-{slug}-v{round}.md compare/{skill}-{backend}/
```

## Output Conventions

Each skill writes to `output/{skill}/{skill}-{slug}-v{round}.md`. Slugs are lowercase, hyphenated (e.g., `acme-ai`). Timestamps use ISO 8601 with SGT: `YYYY-MM-DDTHH:MM:SS+08:00`.

Before writing, check `glob output/{skill}/{skill}-{slug}-v*.md` — prior versions stay in place, versions coexist.

### Frontmatter

Every markdown artifact carries this frontmatter. `inputs:` uses filename only (globally unique via skill+slug+round).

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
