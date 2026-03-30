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

## Guidelines
- **Scannable** — executive can get the picture in 2 minutes
- **Decision-focused** — everything serves the invest/pass decision
- **Honest** — don't paper over gaps or disagreements
- **Graceful with missing data** — if some skills weren't run, note it and work with what's available
- **~3000 word cap**

## Process
1. Glob and read all available artifacts at current round
2. For each section, source from the relevant artifact — pull decision-moving insights, don't rehash everything
3. Write using the template below

## Template

```markdown
# {Company Name} — Consolidated Investment Memo

## TL;DR
3-4 sentences. What this company does, why it's interesting (or not), and the key tension in the investment decision.

## Company Snapshot

| Dimension | Detail |
|-----------|--------|
| Stage | {seed/A/B/...} |
| Sector | {sector} |
| Founded | {year} |
| HQ | {location} |
| Funding | {total raised, last round} |
| Team | {key founders, notable hires} |
| Key Metric | {north star metric + value} |

## Investment Thesis

**Bull Case**
- {bullet 1}
- {bullet 2}
- {bullet 3}

**Bear Case**
- {bullet 1}
- {bullet 2}
- {bullet 3}

## Key Findings
*(Sourced from company-deep-dive artifact)*

Synthesize the most important findings from core research. Focus on what matters for the investment decision — market position, traction, differentiation, team quality. Not a summary of everything, but the findings that move the needle.

## Financial Picture
*(Sourced from financial-analysis artifact)*

Unit economics, burn rate, revenue trajectory, capital efficiency. If pre-revenue, focus on burn and runway. Include key financial metrics in a compact table if data is available.

## Product & Technology
*(Sourced from product-teardown artifact)*

Product-market fit signals, technical moat (or lack thereof), platform risk, defensibility. What's the product insight and is it durable?

## People Assessment
*(Sourced from graham-duncan-eval and founder-market-fit artifacts, if available)*

Founder talent assessment, founder-market fit, team complementarity, key gaps.

## Risk Assessment
*(Sourced from assess-general artifact)*

### Deal Breakers
List any identified deal breakers. If none, state "None identified."

### Key Assumptions
Top 3-5 assumptions the thesis depends on. For each: what it is, current validation status, how to test it.

### Unknowns Inventory
Critical unknowns that remain. Categorize as critical / important / nice-to-know.

## Section Health

| Section | Health | Notes |
|---------|--------|-------|
| Team | {green/yellow/red} | {one-line rationale} |
| Product | {green/yellow/red} | {one-line rationale} |
| Market | {green/yellow/red} | {one-line rationale} |
| Traction | {green/yellow/red} | {one-line rationale} |
| Financials | {green/yellow/red} | {one-line rationale} |
| Competition | {green/yellow/red} | {one-line rationale} |
| Risks | {green/yellow/red} | {one-line rationale} |

## Critique Summary

### Bear Case (assess-bear)
- {top risk 1}
- {top risk 2}
- {top risk 3}

### IC Review (assess-ic)
- {key consideration 1}
- {key consideration 2}
- {recommendation: pass / dig deeper / proceed}

### External Reviews
*(Include Gemini/Groq highlights if available)*

## Recommended Next Steps
Prioritized list of actions to derisk the investment or reach conviction.

## Source Versions
List all artifacts used to build this report, with their round and date.

## Evolution Notes
*(Round 2+ only — omit for round 1)*

What changed since the previous round: new information discovered, assumptions validated or invalidated, risks that materialized or were mitigated.
```
