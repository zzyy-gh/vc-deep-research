# PPTX Rendering Style

Style configuration for `render-pptx.py`. All values derived from the eBots reference deck. Update this file when a firm template (.potx) becomes available.

## Slide Dimensions

```yaml
width: 13.3in    # 12192000 EMU
height: 7.5in    # 6858000 EMU (widescreen 16:9)
```

## Color Palette

```yaml
colors:
  background: "#FFFFFF"
  text_primary: "theme"         # Use slide master theme color (dark gray/black)
  text_secondary: "#393335"     # Dark brown-gray, used for callout box text
  accent_teal: "#00A0AC"        # People names, team section highlights
  accent_yellow: "#FFFF00"      # Emphasis on dark backgrounds
  link_blue: "#0563C1"          # Hyperlinks in source citations
  black: "#000000"              # Sidebar labels (Agenda, Background)
  section_tag_bg: "theme"       # Rounded rectangle fill — uses theme accent
  section_tag_text: "theme"     # Tag text color — uses theme
```

## Typography

```yaml
fonts:
  # Font family inherits from slide master theme (typically Calibri or similar)
  # Specify only when overriding theme defaults

  title_slide:
    heading: { size: 24pt, bold: false }
    date: { size: 18pt, bold: false }

  divider:
    heading: { size: 32pt, bold: true }

  content_slide:
    title: { size: 18-22pt, bold: false }     # Sentence-form takeaway
    body: { size: 14pt, bold: false }
    body_bold_lead: { size: 14pt, bold: true } # First phrase of bold-lead bullets
    subheader: { size: 16pt, bold: true }      # SUPPLY-SIDE, DEMAND-SIDE, HIGHLIGHTS
    callout_box: { size: 12pt, bold: true, color: "#393335" }  # Highlight rounded rects
    source: { size: 8-10pt, bold: false }      # Bottom source/note line
    footnote: { size: 7-8pt, bold: false }     # Methodology footnotes

  table:
    header: { size: 12pt, bold: true }
    cell: { size: 12pt, bold: false }

  team:
    name: { size: 14pt, bold: true, color: "#00A0AC" }  # Person name + title
    credentials: { size: 11pt, bold: false }

  section_tag:
    text: { size: 12pt, bold: true }
```

## Layout Patterns

### title
- Heading centered vertically (upper third)
- Date below heading
- Optional company image (right side or background)
- Slide number: hidden

### divider
- Section name centered, large bold text
- Minimal — no other elements except slide number
- Same visual treatment as "Front Cover" layout

### content
- **Title area**: top of slide, full width, 1-2 lines max
- **Body area**: below title, respects margins
- **Section tag**: bottom-right corner, rounded rectangle pill
- **Source/note line**: bottom of slide, left-aligned, small text
- **Slide number**: bottom area

### table
- Same as content but body area dominated by a table
- Table should use full available width
- Alternating row shading optional

### appendix-header
- Same as divider layout

## Content Pattern Layouts

### two-column
- Two equal-width columns below the title
- Each column has a **subheader** (e.g., "SUPPLY-SIDE", "DEMAND-SIDE") in 20pt bold
- Followed by bold-lead bullet content in 14pt

### highlights
- "HIGHLIGHTS" subheader in 16pt bold, dark color
- 3-4 rounded rectangle callout boxes, each containing one bold statement
- Callout box style: light fill, dark text (#393335), 12pt bold
- Boxes stacked vertically or in a grid

### testimonials
- Two side-by-side blocks (or stacked if single testimonial)
- Each block: rounded rectangle containing bold-lead evidence bullets
- Below each block: attribution line — name in bold + title/company
- Optional: small headshot/logo image placeholder

### sidebar
- Main content (table or chart) takes ~65% width on left
- Sidebar callout box takes ~30% width on right
- Sidebar: rounded rectangle with pricing/model details, bold text

### timeline
- Horizontal or vertical timeline with year markers
- Each marker: year label (18pt bold) + description text (12pt)
- Visual connectors between milestones

### matrix
- 2x2 grid with labeled axes
- Quadrant labels or competitor placements
- Company highlighted in winning quadrant (distinct color or border)
- Axis labels at edges

## Section Tag Vocabulary

Tags that appear as bottom-right pill badges. Use these consistently:

```yaml
tags:
  - "Executive Summary"
  - "Market"
  - "Company"
  - "Competitive Analysis"
  - "Customer"
  - "Timeline & Future Plan"
  - "Team"
  - "Financial Projection"
  - "Valuation"
  - "Return"
  - "Cap Table"
  - "Key Terms"
  - "Investment Criteria"
```

## Element Spacing

```yaml
margins:
  left: 0.47in     # ~432847 EMU
  right: 0.47in
  top: 0.3in
  bottom: 0.5in    # Room for source line + section tag

title_area:
  top: 0.3in
  height: 1.2in    # 2 lines max at 18-22pt

body_area:
  top: 1.6in       # Below title
  bottom: 0.8in    # Above source line

source_line:
  bottom: 0.15in
  left: 0.47in

section_tag:
  bottom: 0.15in
  right: 0.47in
  padding: 4pt
  corner_radius: 8pt
```

## Slide Number
- Present on all slides except title slide (S1)
- Bottom area, small text
- Sequential numbering starting from 2

## Notes

- This style is derived from the eBots reference deck (March 2025)
- When a firm .potx template becomes available, update colors and fonts to match
- The renderer should fall back to these defaults for any properties not in the template
- think-cell charts are used in the reference deck but are not reproducible via python-pptx; use matplotlib or native python-pptx charts as alternatives
