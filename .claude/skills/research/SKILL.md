---
name: research
description: "Main research entry point — runs the staged pipeline: screen → deep dive → critique → assessment → refinement"
---

# /research Skill

You are orchestrating the VC deep research pipeline. This is the main entry point for all research.

## Archive Protocol
When overwriting artifacts in round 2+:
1. Read `current_round` (N) from meta.yaml (default 1 if missing)
2. Run: `mkdir -p history && cp {file} history/round-{N}-{basename}` (e.g., `cp research.md history/round-1-research.md`)
3. Archive only: `research.md`, `financial.md`, `product.md`, `first-principles.md`, `assessment.md`, `sources.yaml`, `critiques/*.md`
4. Do NOT archive: `meta.yaml`, `changelog.md`, `screen.md`, `report.md`, `user-insights/`
5. Only archive files that are actually being overwritten — don't snapshot untouched files

## When Invoked

The user will say something like:
- `/research Acme AI` — research a specific company
- `/research enterprise AI market` — research a market
- `/research` — open-ended, ask what to research

## Step 1: Parse Intent & Check Prior Research

1. **Extract the entity**: company name, market, thesis topic
2. **Determine type**: company (default), market, thesis, due-diligence
3. **Generate slug**: lowercase, hyphenated (e.g., "Acme AI" → "acme-ai")
4. **Check for prior research**: Use Glob to search `research/companies/{slug}/meta.yaml`, `research/markets/{slug}/meta.yaml`, etc.
5. **If prior exists**: Read `meta.yaml`. Check `pipeline_state`.
   - If incomplete: "I found prior research on {name} (round {current_round}) that stopped at {phase}. Want to resume from {next_phase}?"
   - If complete: "I have existing research on {name} (round {current_round}, status: {status}). Want to refine it, re-critique, or start fresh?"
6. **If no prior**: Proceed to screen.

## Step 2: Gather Context (Brief Wizard)

Ask the user concisely (one message, not a long questionnaire):
- What stage is this company? (if not obvious)
- Any specific areas to focus on?
- Any insights to share upfront? (they can use `/share-insight` later too)

If the user already provided context (e.g., "research Acme AI, Series A, focus on competitive landscape"), skip redundant questions.

## Step 3: Quick Screen (Phase 1)

1. Create the research directory: `research/companies/{slug}/`
2. Write initial `meta.yaml`:
```yaml
id: {slug}
name: "{entity name}"
type: company
stage: "{stage if known}"
sector: "{sector if known}"
tags: []
status: screening
pipeline_state:
  current_round: 1
  current_phase: screen
  completed_phases: []
  user_directions: "{any directions}"
  started_at: "{timestamp}"
  last_updated: "{timestamp}"
created: "{timestamp}"
updated: "{timestamp}"
```
3. Launch the **screener** agent (haiku model) with:
   - Entity name and any context
   - Template: `templates/screen.md`
   - Output: `research/companies/{slug}/screen.md`
4. Wait for completion, then **present the screen to the user**.
5. Ask: "Here's the quick screen. Worth a deep dive? If so, any areas to focus on?"

**User decision point**: They may say "pass" (stop), "yes" (proceed), or "yes, focus on X" (directed dive).

## Step 4: Directed Deep Dive (Phase 2)

Based on user direction, launch relevant agents **in parallel**:

- **Always**: researcher agent → `research.md`
- **Default or if requested**: financial-analyst → `financial.md`
- **Default or if requested**: product-analyst → `product.md`
- **If requested**: first-principles → `first-principles.md`

Each agent receives:
- Entity name, stage, sector
- Their specific template path
- Output path
- User directions
- Path to `user-insights/` directory
- `round: {current_round}` (from meta.yaml, for frontmatter — all agents must include `round:` in output frontmatter)

Update `meta.yaml`: status=researched, completed_phases includes "research".

Present a **summary** of findings to the user (read key points from each output file, don't dump everything). Offer: "Want to share any additional insights before I run the critique?"

## Step 5: Multi-Model Critique (Phase 3)

**Archive existing critiques**: If `critiques/` has existing files, follow Archive Protocol for each before overwriting.

Launch **3 required critics in parallel** as subagents, passing `round: {current_round}` (for frontmatter):
- critic-analytical → `critiques/analytical.md`
- critic-bear → `critiques/bear.md`
- critic-ic → `critiques/ic.md`

Each critic receives paths to the research files (not the content).

**Optional external critics** (launch in parallel with Claude critics):
- Check if `scripts/call-gpt4.mjs` exists and OPENAI_API_KEY is set → run via Bash
- Check if `scripts/call-gemini.mjs` exists and GOOGLE_API_KEY is set → run via Bash
- If they fail, note in assessment. Don't block.

Update `meta.yaml`: status=critiqued.

## Step 6: Assessment (Phase 4)

**Archive existing assessment**: If `assessment.md` exists, follow Archive Protocol before overwriting.

Launch the **assessor** agent with:
- Paths to research files and critique files
- Assessment template path
- Output: `research/companies/{slug}/assessment.md`

The assessor reads research + critique **summaries** and produces:
- Deal-breakers (binary flags)
- Key assumptions (3-5, each with validation status)
- Unknowns inventory (critical / important / nice-to-know)
- Information asymmetry
- Research gaps with suggested sources
- Discrepancies with severity
- Section health: traffic light (green/yellow/red)

Update `meta.yaml`: status=assessed.

## Step 6b: Consolidated Report

After assessment completes:
1. Read key findings from: `research.md`, `financial.md`, `product.md`, `assessment.md`, `critiques/`
2. Follow `templates/consolidated-report.md` structure
3. Write to `report.md` in the entity directory
4. Present summary to user

Present the **assessment summary** to the user. Ask: "Want to refine the research based on these findings? Or dig deeper into specific areas?"

## Step 7: Refinement (Phase 5, if requested)

1. Read the user's refinement direction
2. Read `current_round` (N) from meta.yaml (default 1 if missing)
3. Follow Archive Protocol for `research.md` (and `financial.md`, `product.md`, `first-principles.md` if re-running those)
4. Archive `sources.yaml`
5. Increment `current_round` to N+1 in meta.yaml
6. Launch the **researcher** agent with:
   - Prior research path: `history/round-{N}-research.md`
   - Assessment summary (not full critiques)
   - User's refinement direction
   - `round: {N+1}`
   - Output: same `research.md` (overwrite)
7. Append to `changelog.md`:
```markdown
## Round {N+1} — {date}
**Triggered by**: {user direction or assessment findings}
**Changes**: {summary of what was updated}
**Key findings**: {new information discovered}
```
8. Update `meta.yaml`: status=refined.

Present updated research summary. Offer: "Iterate again, re-run critique + assessment + report (Steps 5 → 6 → 6b)? Run `/synthesize` to compare with other companies?"

## Error Handling
- If any agent fails, log the error, update meta.yaml with the failure, and continue with available results
- If web search returns no results, note the gap and suggest alternative research approaches
- If user-insights/ doesn't exist, skip that step silently

## Important Rules
- NEVER dump full research documents into the conversation. Present summaries and let the user read files if they want detail.
- ALWAYS write to disk before presenting to user.
- ALWAYS update meta.yaml at each phase transition.
- Pass FILE PATHS to agents, not file contents.
