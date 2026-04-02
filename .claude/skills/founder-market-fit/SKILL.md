---
name: founder-market-fit
description: "Assess how well the founding team fits the specific market they're pursuing"
model: opus
forked: true
---

# Founder-Market Fit

You are evaluating whether this specific founding team is uniquely positioned to win in this specific market. Not just "are they smart?" but "why them, why this, why now?"

## Inputs
- Entity name and context
- Company facts and team details. Company deep analysis, industry/market context helpful if available.
- Any user-provided observations about founders

## Output
Write to: `output/founder-market-fit/founder-market-fit-{slug}-v{round}.md`

Frontmatter:
```yaml
---
entity: "{name}"
skill: founder-market-fit
type: people-analysis
round: {round}
date: "{timestamp}"
model: opus
description: "Founder-market fit assessment"
inputs:
  - company-profile-{slug}-v{round}.md
  # list all artifacts actually read
---
```

## Guidelines
- Follow Research Standards in CLAUDE.md — citations, data integrity, situational awareness
- **Specific to THIS market** — generic "they're experienced" isn't enough
- **Comparative** — who else could do this? Why is this team better?
- **Honest about gaps** — if fit is weak, say so clearly
- **~2000 word cap**

## Process
1. Read company facts and any available deep analysis for team and strategic context
2. Read user insights if available
3. Research founders' backgrounds in relation to the target market:
   - Prior roles in the same industry/space
   - Customer relationships and network
   - Technical expertise relevant to the problem
   - Public statements about motivation and vision
4. Assess each dimension in the template
5. Write using the template below

## Template

```markdown
# Founder-Market Fit — {entity}

## Fit Summary
{2-3 sentences: how well does this team fit this market? Why them, why this, why now?}

## Dimension Assessment

| Dimension | Rating | Key Evidence |
|-----------|--------|-------------|
| Domain Expertise | Exceptional / Strong / Solid / Developing / Limited | {1-line summary} |
| Network & Distribution | Exceptional / Strong / Solid / Developing / Limited | {1-line summary} |
| Timing Insight | Exceptional / Strong / Solid / Developing / Limited | {1-line summary} |
| Motivation & Commitment | Exceptional / Strong / Solid / Developing / Limited | {1-line summary} |
| Team Complementarity | Exceptional / Strong / Solid / Developing / Limited | {1-line summary} |

## Domain Expertise
Have they worked in this space? How deep? Do they understand the customer's pain from experience? Have they built similar products before?

## Network & Distribution
Do they have relationships with target customers? Can they recruit domain experts? Do they have investor relationships in this space?

## Timing Insight
What do they understand about timing that others don't? Why is this solvable now but wasn't before? Are they ahead of the market or behind?

## Motivation & Commitment
Is this a passion project or an opportunistic pivot? How long have they been thinking about this problem? What have they given up to pursue this?

## Team Complementarity
Do skills cover the key functions needed (technical, GTM, domain)? Are there critical gaps? How long have founders worked together?

## Unfair Advantages
What can this team do that no other team can? Proprietary data, relationships, technology, or insights? Is the advantage durable or temporary?

## Comparative Assessment
Who else could do this? Why is this team better or worse positioned?

## Founder-Market Fit Verdict
{1-2 paragraphs: overall fit assessment and what it means for the investment}
```
