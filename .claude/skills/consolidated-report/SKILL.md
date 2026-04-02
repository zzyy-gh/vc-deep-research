---
name: consolidated-report
description: "Merge all artifacts into a single investment memo — TL;DR, thesis, findings, risks, next steps"
model: sonnet
forked: true
---

# Consolidated Report

You are producing the final investment memo that synthesizes all research, critiques, and assessment into one decision document. This is what gets shared with the investment committee.

Your job is to tell the story of this investment opportunity with real substance behind it — what the company does, why the market matters, what the research found, what's interesting, what's risky, and what to do next. Pull decision-relevant findings from across all artifacts. Don't just summarize each skill — synthesize into a coherent picture. But DO include the important details that back up the narrative.

## Inputs
- All available artifacts at current round — research, people analysis, assessments, due-diligence

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
- Follow Research Standards in CLAUDE.md — citations, data integrity, situational awareness
- **Lead with the answer** — the reader should know the verdict within 30 seconds
- **TL;DR is sacred** — short, accurate, completely honest. Convey the core meaning and the most insightful finding from the research. No hype, no hedging, no filler. Don't be interesting for the sake of it — be interesting because the research found something worth saying. If the research is inconclusive, say that.
- **Substance over summary** — include the actual findings, numbers, and evidence, not just conclusions
- **Surface what's interesting** — unexpected findings, non-obvious insights, surprising data points belong here. But only if they're real — don't manufacture intrigue.
- **Narrative thread** — sections should build on each other, not feel like isolated summaries
- **Honest** — don't paper over gaps or disagreements. Don't overpromise. If the evidence is thin, say so.
- **Graceful with missing data** — if some skills weren't run, work with what's available without calling attention to every gap
- **~4000 word cap**

## Process
1. Glob and read all available artifacts at current round
2. Identify the most decision-relevant findings across all research
3. Identify anything genuinely interesting or surprising
4. Write using the template below — include real detail, not just top-level takes

## Template

```markdown
# {Company Name} — Investment Memo

## TL;DR

| | |
|---|---|
| **Company** | {what they do, in one line} |
| **Stage / Sector** | {stage} · {sector} |
| **Founded / HQ** | {year} · {location} |
| **Funding** | {total raised, last round, key investors} |
| **Team** | {key founders} |
| **Key Metric** | {north star metric + value} |
| **Verdict** | {IC recommendation — strong conviction / conditional interest / pass with optionality / clear pass} |

{2-3 sentences max. What this company does, the single most important insight from the research, and the honest verdict. No filler. If the most important insight is a risk, lead with that. If it's an opportunity, lead with that. Don't try to be balanced — be accurate.}

## The Investment Case

### Why This Could Work
{Draw from bull case, company analysis, industry analysis, product teardown. Not just bullets — explain the logic of why this wins. What's the insight that makes this non-obvious? What evidence supports the upside?}

### Why This Could Fail
{Draw from bear case, competitive research, financial analysis. What are the real failure modes with evidence, not just theoretical risks?}

### Where IC Lands
{Draw from IC review. How do the hard questions resolve? What's the returns math? Does it fit the fund? What's the recommendation and why?}

## Company & Product
*(Sourced from company-profile, company-analysis, product-teardown)*

What the company actually builds, how it works, the product insight, technology depth, defensibility. Include: business model, go-to-market, current traction with specific numbers. Where is the product today vs. the vision? What's the strategic positioning logic?

{Include key traction/metrics in a compact table if data is available.}

## Market & Industry
*(Sourced from industry-analysis)*

Value chain decomposition — which layer the company occupies, where value accrues. Layer-specific market sizing (TAM/SAM/SOM with the build-up logic, not just numbers). Key dynamics: growth drivers, headwinds, timing. Why now?

## Competitive Landscape
*(Sourced from competitor-research)*

Key direct competitors at the same value chain layer — who they are, how they compare, what differentiates the target. Adjacent-layer threats. Moat assessment: what's the defensibility today and how durable is it? Include the comparison matrix if it adds clarity.

## Financial Picture
*(Sourced from financial-analysis)*

Unit economics, burn rate, revenue trajectory, capital efficiency. Key financial metrics in a compact table. If pre-revenue, focus on burn, runway, and path to revenue. Revenue quality, customer concentration, and any red flags.

## Team
*(Sourced from graham-duncan-eval, founder-market-fit)*

Founder talent assessment — not just bios but evidence-based evaluation. Founder-market fit: why this team for this market? Key strengths, gaps, and team complementarity. If people analysis wasn't run, cover what's known from company-profile.

## Ecosystem & Dependencies
*(Sourced from ecosystem-analysis, regulatory-analysis — skip if not assessed)*

Key dependencies: suppliers, platforms, customers, partnerships. Concentration risks. Regulatory environment if relevant — compliance burden, tailwinds/headwinds, competitive implications. Geographic and geopolitical exposure.

## What's Interesting
{The most surprising, non-obvious, or noteworthy findings from across all research. Things the reader wouldn't expect. Could be: an unexpected competitive dynamic, a counter-intuitive market insight, a team signal, an ecosystem dependency nobody talks about, a regulatory angle that changes the picture, a data point that reframes the opportunity.}

## The Fundamentals
*(Sourced from assess-first-principles)*

### Deal Breakers
{Any hard-stop flags. If none: "None identified."}

### Key Assumptions
| # | Assumption | Status | Evidence |
|---|-----------|--------|----------|
| 1 | {assumption} | Validated / Partially Validated / Unvalidated / Contradicted | {evidence} |

### Critical Unknowns
{Things that could change the decision if we knew them. Include important unknowns too if space allows.}

### Cross-Artifact Contradictions
{If first-principles found conflicting claims across research, surface them here.}

## Section Health

| Section | Health | Note |
|---------|--------|------|
| Team | 🟢 / 🟡 / 🔴 | {one-line} |
| Product | 🟢 / 🟡 / 🔴 | |
| Market | 🟢 / 🟡 / 🔴 | |
| Traction | 🟢 / 🟡 / 🔴 | |
| Financials | 🟢 / 🟡 / 🔴 | |
| Competition | 🟢 / 🟡 / 🔴 | |
| Ecosystem | 🟢 / 🟡 / 🔴 | {N/A if not assessed} |
| Regulatory | 🟢 / 🟡 / 🔴 | {N/A if not assessed} |

## What's Next
*(Sourced from assess-next if available, otherwise from IC review)*

Priority actions to de-risk the investment or reach conviction. Include: diligence calls to make, questions for founders, areas to investigate, connections to build.

## Evolution Notes
*(Round 2+ only — omit for round 1)*

{What changed since previous round: new information, validated/invalidated assumptions, materialized/mitigated risks.}
```
