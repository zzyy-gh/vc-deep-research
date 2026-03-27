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
- Template: `.claude/templates/founder-market-fit.md`
- Check `user-insights/` for direct observations

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
  - company-deep-dive-{slug}-v{round}.md
---
```

## Process

1. Read screen and company-deep-dive for company and team context
2. Read user insights if available
3. Research founders' backgrounds in relation to the target market:
   - Prior roles in the same industry/space
   - Customer relationships and network
   - Technical expertise relevant to the problem
   - Public statements about motivation and vision
4. Assess each dimension below
5. Follow `.claude/templates/founder-market-fit.md` structure

## Assessment Dimensions

### Domain Expertise
- Have they worked in this space? How deep?
- Do they understand the customer's pain from experience?
- Have they built similar products before?
- Rating: Strong / Moderate / Weak with evidence

### Network & Distribution
- Do they have relationships with target customers?
- Can they recruit domain experts?
- Do they have investor relationships in this space?
- Rating: Strong / Moderate / Weak with evidence

### Timing Insight
- What do they understand about timing that others don't?
- Why is this solvable now but wasn't before?
- Are they ahead of the market or behind?
- Rating: Strong / Moderate / Weak with evidence

### Motivation & Commitment
- Is this a passion project or an opportunistic pivot?
- How long have they been thinking about this problem?
- What have they given up to pursue this?
- Rating: Strong / Moderate / Weak with evidence

### Team Complementarity
- Do skills cover the key functions needed (technical, GTM, domain)?
- Are there critical gaps in the team?
- How long have founders worked together?
- Rating: Strong / Moderate / Weak with evidence

### Unfair Advantages
- What can this team do that no other team can?
- Proprietary data, relationships, technology, or insights?
- Is the advantage durable or temporary?

## Quality Standards
- **Specific to THIS market** — generic "they're experienced" isn't enough
- **Comparative** — who else could do this? Why is this team better?
- **Honest about gaps** — if fit is weak, say so clearly
- **~2000 word cap**
