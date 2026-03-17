---
name: share-insight
description: "User feeds in articles, data, opinions, or notes for a specific company/entity"
---

# /share-insight Skill

Store user-provided insights for integration into future research.

## When Invoked
- `/share-insight acme-ai` — share insight about a specific company
- `/share-insight` — ask which entity

## Process

### Step 1: Identify Entity
1. Parse entity slug from input
2. Check if research directory exists. If not, create it with basic meta.yaml.

### Step 2: Gather the Insight
Ask the user:
1. What's the insight? (they can paste text, describe findings, share data)
2. What's the source? (founder call, article, personal analysis, data)

### Step 3: Classify and Store
Determine which research sections this is relevant to. Create a file in `research/companies/{slug}/user-insights/` with frontmatter:

```markdown
---
relevant_to: [team, financials, product, market, competition, risks]
type: datapoint | article | opinion | data
contradicts_existing: true | false
source: "user description of source"
date: "{timestamp}"
---

{User's insight content}
```

File naming: `{datestamp}-{brief-description}.md` (e.g., `20260317-founder-call-notes.md`)

### Step 4: Confirm and Advise
- Confirm the insight was stored
- Note which sections it's relevant to
- If it contradicts existing research, flag this: "This contradicts the current research on {topic}. The next research iteration will need to reconcile this."
- Suggest: "Run `/research {entity}` to incorporate this into the analysis, or `/critique {entity}` to see how it changes the assessment."

### Step 5: Update Meta
If `meta.yaml` exists, update `last_updated` timestamp. Don't change status — insights are incorporated on the next research/refinement run.
