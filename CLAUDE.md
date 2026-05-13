# VC Deep Research System

## What This Is

A modular, agent-assisted system for VC due diligence research — designed so agents automate the research flow while users see everything and intervene when needed. Every artifact lands on disk in plain markdown, with explicit assumptions, verified facts, and honest gaps. Errors surface early, not buried in a final report. Where agents can't do the job alone (e.g., polished slide decks), the system assists as far as it can and makes clear where human finishing is needed.

## Architecture

**Skills** are the building blocks — each is a self-contained research task with its own persona, process, and quality standards. Each artifact belongs to one skill, but a skill can produce multiple artifacts (e.g., markdown + HTML rendering, slide spec + advisory). No skill calls another skill.

**Agents** orchestrate skills into workflows (e.g., the research agent runs company-profile → company-analysis → … → consolidated-report). All output is skill-owned, except infrastructure writes (cache pages, state.md). An agent file is a spec for the main orchestrator to read and internalize before running — not a black box to delegate to. Understand its parts — individually and the interaction between them — before orchestrating; for large workflows this upfront investment is worth the cost. When orchestrating subagents, **batch** by shared context and model affinity; **split and parallelize** where independent, content-heavy, or context grows too large. Heavy content stays in the subagent; instantiate with only the prompt and necessary harnesses — no files attached — letting the subagent fetch what it needs. Respect the protocol, while balancing improving the sequence and resolving issues where you can.

**Disk is the interface.** All data flows through files, never conversation context. Skills receive inputs as file paths and read them directly. Inputs are flexible — some skills read prior artifacts, others work from web research alone.

```
docs/              — User-provided materials (decks, notes, data)
.claude/
  skills/          — Skill definitions (one SKILL.md per skill, output template embedded, optional assets/ subfolder)
  scripts/         — Helper scripts (cache-page.mjs, call-external.mjs, run-skill-external.mjs)
  agents/          — Agent definitions (research, tester)
output/
  {skill}/         — Skill artifacts ({skill}-{slug}-v{round}.md)
  .research/{slug}/ — Research cache (state.md + pages/)
    state.md       — Lightweight map of artifacts & cached pages
    pages/         — Full cached web pages as markdown
compare/           — External model outputs (comparison only, never read by skills)
```

## Skills

| Layer | Skill                     | What It Does                                                                                                                                                                                               |
| ----- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1a    | `company-profile`         | Company facts — team, product, traction, business model, funding history                                                                                                                                   |
| 1b    | `product-teardown`        | Product and technology analysis — architecture, technical depth, defensibility, developer experience, roadmap signals                                                                                      |
| 1c    | `financial-analysis`      | Unit economics, burn rate, cap table, comparables, revenue quality                                                                                                                                         |
| 2     | `company-analysis`        | Vision, strategy, positioning logic, technology depth, current vs. future product                                                                                                                          |
| 3a    | `industry-analysis`       | Value chain decomposition, company positioning, layer-specific market sizing, dynamics, timing                                                                                                             |
| 3b    | `ecosystem-analysis`      | Supply chain, customers, partnerships, dependencies, geopolitical risks                                                                                                                                    |
| 3c    | `competitor-research`     | Competitors at correct value chain layer, comparison, moat assessment                                                                                                                                      |
| 3d    | `regulatory-analysis`     | Regulations, compliance burden, regulatory risks/tailwinds, competitive implications                                                                                                                       |
| 3e    | `technology-primer`       | Field-level primer — how a technology/domain works, stack, value chain, key terms, players, maturity, recent shifts. Runs standalone (no company) or as part of the pipeline.                              |
| 4a    | `graham-duncan-eval`      | Talent evaluation using Graham Duncan's framework (6 dimensions, qualitative ratings)                                                                                                                      |
| 4b    | `founder-market-fit`      | Founder-market fit — domain expertise, network, timing, motivation, complementarity                                                                                                                        |
| 5a    | `recent-signals`          | Narrative deltas — what shifted in the last ~90 days, where concern is spiking, where excitement is building. Runs first in L5 so downstream assessments can leverage it.                                  |
| 5b    | `assess-bear`             | Worst case — failure modes, competitive threats, market/financial/timing risks                                                                                                                             |
| 5c    | `assess-bull`             | Best case — upside scenarios, moat strength, tailwinds, why this could be a fund-returner                                                                                                                  |
| 5d    | `assess-ic`               | IC partner perspective — weighs bear vs. bull, returns math, fund fit, hard questions                                                                                                                      |
| 5e    | `assess-first-principles` | Foundational distillation — strips away narrative, stress-tests from fundamentals, deal-breakers/assumptions/unknowns, section health                                                                      |
| 5f    | `assess-next`             | Actionable next steps — diligence calls, founder questions, areas to investigate, connections to build, creative angles                                                                                    |
| 6     | `consolidated-report`     | Investment memo merging all available artifacts                                                                                                                                                            |
| 6     | `pre-meeting-read`        | Quick research brief for meeting prep — company snapshot, financials, catalysts, risks, questions to ask                                                                                                   |
| 6     | `investment-memo`         | Transform an investment memo into presentation slides                                                                                                                                                      |
| —     | `due-diligence`           | Verification and correction pass on any artifact — verifies claims, checks logical soundness, notes coverage gaps. Corrections → new version; additions only → in-place update. `dd: true` in frontmatter. |

## Agents

**research** — full research pipeline. The user specifies the company and final output skill (e.g., pre-meeting-read or consolidated-report). Only run a single skill directly when the user explicitly names it.

**tester** — workspace quality checks (read-only). Modes: `docs`, `scripts`, `full`, `optimize`, `integration`.

## Per-Skill Protocol

For long-running stateful workflows — any pipeline that maintains `state.md` as a memory layer — every skill run, direct or delegated, follows this sequence:

1. Read `state.md` — know what artifacts and cached pages exist
2. Check whether existing cached pages already cover what the skill needs before loading anything full
3. If more info needed: WebSearch → `cache-page.mjs` for uncached URLs → read the cached `.md` files
4. For each newly cached page: append a row to state.md Cached Pages with a whole-page summary
5. Run the skill's analysis per its SKILL.md spec
6. Write the artifact to `output/{skill}/`
7. Append a row to state.md Artifacts summarizing what the artifact covers

Short-lived ad-hoc skill runs outside a stateful pipeline don't use this protocol.

## Research Standards

Guidelines that govern how skills produce research. Apply to all skills.

### Process

- **Layer sequence matters.** Each layer builds on prior layers — skipping weakens downstream analysis. Reuse existing artifacts rather than re-running.
- **Due-diligence runs on the final synthesis artifact** (consolidated-report or pre-meeting-read), not after every individual skill. Corrections produce a new version; additions update in-place.
- **Skip gracefully.** If a skill finds insufficient information, produce a shorter artifact noting what couldn't be found. The gap itself is signal for downstream skills.
- **Self-sufficiency.** If expected input isn't available, the skill conducts its own lighter research rather than failing. Skills are always runnable standalone.
- **Research covers, synthesis focuses.** Research skills cover all relevant items found. Synthesis skills touch on all but focus narrative on the crucial ones.
- **Deal-breakers over scores.** No 0-100 confidence scores. Use deal_breakers / key_assumptions / unknowns_inventory. Qualitative ratings (Exceptional / Strong / Solid / Developing / Limited) where needed.

### Data Integrity

- **Recall guides search; sourced data goes in artifacts.** Model knowledge is useful for knowing what to search for, but published facts must come from a source with a URL — the concern is freshness and citability. Reasoning and analysis on top of fetched facts is fine at any layer.
- Corroborate every material claim with 2-3 independent sources of different types (e.g., filing + report + news). Flag single-source claims.
- Prefer primary sources (filings, patents, direct data) over secondary (news, analyst reports).
- If a number, date, or fact can't be sourced, say so — never invent plausible-sounding data.
- Flag data older than 12 months and note when training data may be stale.
- Search results skew toward heavily-funded companies; use layer-specific terminology to surface smaller competitors.

### Citations & Verification

**Superscript citations:** Attach `<sup>N</sup>` to every factual claim, linking it to the references list. Multiple claims can share a citation.

**Confidence flags:** Mark issues with sourced claims inline — `[single-source]`, `[unverified]`, `[source: company PR]`, `[stale: 2024]`, `[estimated]`. These flag problems with information that _is_ present.

**Verification gaps:** Note what you looked for but _couldn't find_ — data you expected to exist, claims you wanted to confirm but had no sources for, areas where research came up empty. Weave these into the relevant section where the gap matters, not in a separate section at the end. This is a research discipline like situational awareness.

**References:** Every artifact ends with a numbered references list. References cite external facts only — each entry must have a real URL. Never cite other pipeline artifacts as sources; analysis borrowed from earlier skills needs no citation. If a factual claim originates in an earlier artifact, trace it back to the original external URL.

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
