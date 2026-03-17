---
name: critique
description: "Run multi-model critique on existing research — analytical, bear case, and IC perspectives"
---

# /critique Skill

Run a critique cycle on existing research. This is a standalone entry point for users who want to critique research without going through the full pipeline.

## When Invoked

The user will say something like:
- `/critique acme-ai` — critique existing research for a company
- `/critique` — ask what to critique

## Process

### Step 1: Find the Research
1. Parse the entity name/slug from the user's input
2. Use Glob to find `research/companies/{slug}/output/researcher-*-v*.md` (or markets/, theses/, etc.)
3. If not found: "I don't have research on {entity}. Run `/research {entity}` first?"
4. If found: Read `meta.yaml` to understand current status and round number

### Step 2: Identify Research Files
Glob for the latest-version research artifacts in the entity's `output/` directory:
- `researcher-*-v*.md`, `financial-analyst-*-v*.md`, `product-analyst-*-v*.md`, `first-principles-*-v*.md`
- Skip: screener files, existing critiques, assessments

### Step 3: Run Critics in Parallel

Follow CLAUDE.md Output Convention for all paths and frontmatter. Read `current_round` from meta.yaml.

Launch **3 Claude critic agents in parallel**:

1. **critic-analytical** agent:
   - Research file paths: [list of latest-version research files found in output/]
   - Template: `templates/critique-analytical.md`
   - Output: `research/companies/{slug}/output/critic-analytical-factual-gaps-v{round}.md`

2. **critic-bear** agent:
   - Research file paths: [list of latest-version research files found in output/]
   - Template: `templates/critique-bear.md`
   - Output: `research/companies/{slug}/output/critic-bear-bear-case-v{round}.md`

3. **critic-ic** agent:
   - Research file paths: [list of latest-version research files found in output/]
   - Template: `templates/critique-ic.md`
   - Output: `research/companies/{slug}/output/critic-ic-ic-review-v{round}.md`

### Step 4: Optional External Critics (Parallel)

Check for external model availability. Output paths follow CLAUDE.md Output Convention:
- If `scripts/call-gpt4.mjs` exists AND `OPENAI_API_KEY` env var is set:
  Locate the latest researcher artifact following CLAUDE.md Output Convention (glob `output/researcher-*-v{round}.md`) and pass its path to the script:
  ```bash
  node scripts/call-gpt4.mjs "{researcher_artifact_path}" "research/companies/{slug}/output/critic-gpt4-external-critique-v{round}.md" "templates/critique-gpt4-prompt.md"
  ```
- If `scripts/call-gemini.mjs` exists AND `GOOGLE_API_KEY` env var is set:
  Locate the latest researcher artifact as above and pass its path:
  ```bash
  node scripts/call-gemini.mjs "{researcher_artifact_path}" "research/companies/{slug}/output/critic-gemini-external-critique-v{round}.md" "templates/critique-gemini-prompt.md"
  ```
- If `scripts/call-groq.mjs` exists AND `GROQ_API_KEY` env var is set:
  Locate the latest researcher artifact as above and pass its path:
  ```bash
  node scripts/call-groq.mjs "{researcher_artifact_path}" "research/companies/{slug}/output/critic-groq-external-critique-v{round}.md" "templates/critique-groq-prompt.md"
  ```

If external critics fail: note the failure, continue with Claude critics.

### Step 5: Update Status
Update `meta.yaml`: status=critiqued, completed_phases includes "critique".

### Step 6: Present Results
Read the key findings from each critique file. Present a **summary** to the user:
- Top 3 analytical concerns
- Top 3 bear case risks
- IC recommendation
- (If available) External model highlights

Ask: "Want to run the assessment now? Or address specific concerns first?"

## Important
- Don't dump full critique text — summarize key points
- If research is minimal (only a screener file in output/), warn the user: "Only a quick screen exists. Run a full deep dive first for meaningful critique."
