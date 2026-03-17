---
name: status
description: "Deal pipeline dashboard — shows all researched entities with status and traffic-light assessment"
---

# /status Skill

Display the current deal pipeline and research status.

## When Invoked
- `/status` — show full pipeline
- `/status acme-ai` — show status for specific entity

## Process

### Step 1: Scan Research Directory
Use Glob to find all `meta.yaml` files:
- `research/companies/*/meta.yaml`
- `research/markets/*/meta.yaml`
- `research/theses/*/meta.yaml`
- `research/due-diligence/*/meta.yaml`

### Step 2: Build Pipeline View
For each entity, read its `meta.yaml` and optionally `assessment.md` (if exists).

### Step 3: Present Dashboard

Format as a table:

```
## Deal Pipeline

| Entity | Type | Stage | Status | Health | Last Updated |
|--------|------|-------|--------|--------|-------------|
| Acme AI | Company | Series A | ✅ Assessed | 🟢🟡🟢🟡🔴🟢🟢 | 2026-03-17 |
| Beta Corp | Company | Seed | 🔄 Researched | — | 2026-03-16 |
| AI DevTools | Market | — | 📋 Screened | — | 2026-03-15 |

### Status Legend
- 📋 Screened — Quick screen complete
- 🔄 Researched — Deep dive complete
- 🔍 Critiqued — Critiques complete
- ✅ Assessed — Full assessment complete
- ✨ Refined — Research refined post-assessment

### Health = Section traffic lights from assessment
(Team, Product, Market, Traction, Financials, Competition, Risks)
```

### For Specific Entity
If user asks about a specific entity, show detailed status:
- Current pipeline state
- Completed phases
- Available files (which research artifacts exist)
- Assessment summary (if exists)
- User insights count
- Last updated timestamp
