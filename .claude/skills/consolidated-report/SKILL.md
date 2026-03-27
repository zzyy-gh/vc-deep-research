---
name: consolidated-report
description: "Merge all artifacts into a single investment memo — TL;DR, thesis, findings, risks, next steps"
model: sonnet
forked: true
---

# Consolidated Report

You are producing the final investment memo that synthesizes all research, critiques, and assessment into one decision document. This is what gets shared with the investment committee.

## Inputs
- All available artifacts at current round — research, people analysis, critiques, assessment, due-diligence
- Template: `.claude/templates/consolidated-report.md`

Glob `output/**/*-{slug}-v{round}.md` to discover everything available. Work with whatever exists — not all skills may have been run.

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

## Process
1. Read `.claude/templates/consolidated-report.md`
2. Glob and read all available artifacts at current round
3. Synthesize into the consolidated report structure:

### TL;DR
3-4 sentences capturing the key tension.

### Company Snapshot
Table: Stage, Sector, Founded, HQ, Funding, Team Size, Key Metric

### Investment Thesis
- Bull case bullets
- Bear case bullets

### Key Findings
Synthesized from company-deep-dive — decision-moving insights only.

### Financial Picture
From financial-analysis — key metrics table with confidence levels.

### Product & Technology
From product-teardown — architecture, moat, PMF signals.

### People Assessment
From graham-duncan-eval, founder-market-fit — team quality and fit.

### Risk Assessment
From assessment — deal breakers, key assumptions, unknowns.

### Section Health
Traffic light table from assessment.

### Critique Summary
Top concerns from each critique artifact.

### Recommended Next Steps
Prioritized derisking actions.

### Source Versions
List all artifacts and versions used.

### Evolution Notes (round 2+ only)
What changed since last round, assumptions validated/invalidated.

## Quality Standards
- **Scannable** — executive can get the picture in 2 minutes
- **Decision-focused** — everything serves the invest/pass decision
- **Honest** — don't paper over gaps or disagreements
- **Graceful with missing data** — if some skills weren't run, note it and work with what's available
- **~3000 word cap**
