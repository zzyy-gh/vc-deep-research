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
2. Use Glob to find `research/companies/{slug}/research.md` (or markets/, theses/, etc.)
3. If not found: "I don't have research on {entity}. Run `/research {entity}` first?"
4. If found: Read `meta.yaml` to understand current status

### Step 2: Identify Research Files
Glob for all research files in the entity's directory:
- `research.md`, `financial.md`, `product.md`, `first-principles.md`
- Skip: `screen.md`, `meta.yaml`, `changelog.md`, existing critiques

### Step 3: Run Critics in Parallel

**Archive existing critiques** (if any): Before running new critics, check if `critiques/` already has files. If so, read `current_round` from `meta.yaml` (default 1 if missing), then copy each existing critique to `history/round-{N}-{critic}.md` (e.g., `history/round-1-analytical.md`). Create `history/` with `mkdir -p` if needed.

Launch **3 Claude critic agents in parallel**:

1. **critic-analytical** agent:
   - Research file paths: [list of research files found]
   - Template: `templates/critique-analytical.md`
   - Output: `research/companies/{slug}/critiques/analytical.md`

2. **critic-bear** agent:
   - Research file paths: [list of research files found]
   - Template: `templates/critique-bear.md`
   - Output: `research/companies/{slug}/critiques/bear.md`

3. **critic-ic** agent:
   - Research file paths: [list of research files found]
   - Template: `templates/critique-ic.md`
   - Output: `research/companies/{slug}/critiques/ic.md`

### Step 4: Optional External Critics (Parallel)

Check for external model availability:
- If `scripts/call-gpt4.mjs` exists AND `OPENAI_API_KEY` env var is set:
  ```bash
  node scripts/call-gpt4.mjs "research/companies/{slug}/research.md" "research/companies/{slug}/critiques/gpt4.md" "templates/critique-gpt4-prompt.md"
  ```
- If `scripts/call-gemini.mjs` exists AND `GOOGLE_API_KEY` env var is set:
  ```bash
  node scripts/call-gemini.mjs "research/companies/{slug}/research.md" "research/companies/{slug}/critiques/gemini.md" "templates/critique-gemini-prompt.md"
  ```
- If `scripts/call-groq.mjs` exists AND `GROQ_API_KEY` env var is set:
  ```bash
  node scripts/call-groq.mjs "research/companies/{slug}/research.md" "research/companies/{slug}/critiques/groq.md" "templates/critique-groq-prompt.md"
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
- Create `critiques/` directory if it doesn't exist
- Don't dump full critique text — summarize key points
- If research is minimal (only screen.md), warn the user: "Only a quick screen exists. Run a full deep dive first for meaningful critique."
