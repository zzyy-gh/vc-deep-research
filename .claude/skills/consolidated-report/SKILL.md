---
name: consolidated-report
description: "Merge all artifacts into a single investment memo — TL;DR, thesis, findings, risks, next steps"
model: sonnet
forked: true
---

# Consolidated Report

Produce the final investment memo for IC. Synthesize all available research, people analysis, assessments, and due-diligence into one decision document.

Tell the story of this opportunity with substance behind it — what the company does, why the market matters, what the research found, what's interesting, what's risky, what to do next. Pull decision-relevant findings across artifacts. Don't summarize each skill — synthesize into a coherent picture. Include the details that back the narrative.

## Inputs
- All available artifacts at current round

Glob `output/**/*-{slug}-v{round}.md` to discover everything. Work with whatever exists — not all skills may have been run.

If glob returns nothing, write a stub artifact noting no inputs were available and halt. Don't fabricate.

## Output
Write to: `output/consolidated-report/consolidated-report-{slug}-v{round}.md`

Frontmatter:
```yaml
---
entity: "{name}"
skill: consolidated-report
type: consolidated-report
round: {round}
date: "{timestamp}"
model: sonnet
description: "Consolidated investment memo"
inputs:
  # list ALL artifacts actually read
---
```

## Principles
- Follow Research Standards in CLAUDE.md — citations, data integrity, situational awareness
- **Lead with the answer** — reader knows the verdict within 30 seconds
- **TL;DR is sacred** — short, accurate, honest. Convey core meaning + most insightful finding. No hype, no hedging, no filler. If research inconclusive, say so.
- **Substance over summary** — actual findings, numbers, evidence — not just conclusions
- **Surface what's interesting** — unexpected findings, non-obvious insights, surprising data points. Only if real. Don't manufacture intrigue.
- **Narrative thread** — sections build on each other, not isolated summaries
- **Honest** — don't paper over gaps or disagreements. Don't overpromise. If evidence is thin, say so.
- **Graceful with missing data** — work with what's available without calling attention to every gap
- **Form follows evidence** — let what's present shape the body. Don't force a fixed template when artifacts don't support it.
- **~4000 word cap**

## Required Anchors
Every memo includes these three, regardless of what artifacts are present:

1. **TL;DR** — compact fact table (company, stage/sector, funding, team, key metric, verdict) + 2-3 sentences capturing what they do, the single most important insight, and the honest verdict. Verdicts: strong conviction / conditional interest / pass with optionality / clear pass.
2. **Investment Case** — why this could work, why this could fail, where IC lands. Even if assessments are thin, frame the case from whatever evidence exists.
3. **What's Next** — priority actions to de-risk or reach conviction (calls, founder questions, areas to investigate). Pull from assess-next if present; otherwise infer.

## Body
Beyond the anchors, body sections emerge from artifacts present. Common areas — company & product, market, competition, financials, team, ecosystem, regulatory, interesting findings, fundamentals (deal-breakers/key assumptions/critical unknowns) — but only include what artifacts support. Order to serve the narrative (verdict → case → evidence → fundamentals → next).

**Section Health**: if `assess-first-principles` artifact exists, pull its section health table verbatim. If not, omit — don't regenerate.

**Evolution Notes** (round 2+ only): what changed since previous round — new information, validated/invalidated assumptions, materialized/mitigated risks.

## Process
1. Glob and read all available artifacts at current round
2. Identify the most decision-relevant findings across all research
3. Identify what's genuinely interesting or surprising
4. Draft TL;DR + Investment Case + What's Next anchors
5. Add body sections shaped by available artifacts
6. Write — include real detail, not just top-level takes
