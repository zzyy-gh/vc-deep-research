---
name: synthesize
description: "Cross-company/market synthesis — compare companies, build landscapes, construct theses"
---

# /synthesize Skill

Synthesize insights across multiple researched entities.

**Convention**: All output paths, filenames, versioning, and frontmatter follow CLAUDE.md Output Convention.

## When Invoked
- `/synthesize acme-ai, beta-corp` — compare two companies
- `/synthesize ai-devtools landscape` — market landscape
- `/synthesize` — ask what to synthesize

## Process

### Step 1: Identify Entities
1. Parse entity names/slugs from user input
2. Use Glob to find their research directories
3. If any entity not found: "I don't have research on {entity}. Run `/research {entity}` first."
4. If only one entity: "Synthesis needs 2+ entities. Want to research another company to compare?"

### Step 2: Determine Synthesis Type
Based on user input or ask:
- **comparison**: Direct side-by-side (default for 2-3 entities)
- **landscape**: Market overview (default for 4+ entities or if "landscape"/"market" in request)
- **thesis**: Investment thesis (if "thesis" in request)
- **pattern**: Cross-cutting insights (if "pattern" in request)

### Step 3: Launch Synthesizer
Launch the **synthesizer** agent with:
- Entity research directory paths (point to `output/` for each entity)
- Synthesis type
- Output: `research/{slug}/output/synthesizer-{description}-v1.md` (slug is generated from the synthesis topic, e.g. `acme-vs-beta`)
- User directions

### Step 4: Present Results
Read the synthesis output. Present key findings:
- For comparison: Who wins on what dimension?
- For landscape: Key market map and white spaces
- For thesis: Core thesis and confidence
- For pattern: Top 3 patterns identified

Create `research/{slug}/meta.yaml` with status tracking.
