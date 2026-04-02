# Pre-Meeting Read — HTML Style Guide

Reference: `assets/example-output.html`

## Layout
- Max-width 800px, centered (`margin: 0 auto`)
- Padding: 32px horizontal, 24px vertical
- A4 print-ready (`@page { margin: 2cm; size: A4 }`)

## Typography
- Font stack: `"Segoe UI", Helvetica, Arial, sans-serif`
- Body: 14px, line-height 1.55, color `#1a1a1a`
- Print: body 9.5pt, h1 20pt, h2 12pt

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#1a3a5c` | h1, h2, h3 text; `<th>` background; bold text in lists (`li strong`) |
| Body | `#1a1a1a` | Body text, `<strong>` |
| Muted | `#555` | `<em>` (subtitles, context lines) |
| Citation | `#888` | `<sup>` numbers |
| Row alt | `#f6f8fa` | Even table rows (`tr:nth-child(even)`) |
| White | `#fff` | `<th>` text |

## Headings
- **h1**: 28px, navy, letter-spacing -0.5px, margin-bottom 4px
- **h2**: 15px, navy, uppercase, letter-spacing 0.5px, 2.5px solid navy bottom border, margin-top 24px
- **h3**: 14px, navy, margin-top 14px

## Tables
- Full width, collapsed borders
- Font-size: 13px
- Header: navy background, white text, 600 weight, 7px 10px padding
- Cells: 6px 10px padding, 1px solid `#d0d0d0` border
- First column: 600 weight, nowrap
- Alternating rows: `#f6f8fa`

## Lists
- Padding-left: 18px
- Item spacing: 4px margin
- Bold labels in list items (`li strong`): navy color

## Citations
- `<sup>`: 10px, color `#888`
- Each number wrapped in `<a>` linking to the reference URL
- Link style: `color:inherit; text-decoration:none` (invisible link, clickable)
- Compound citations (e.g. `1,3`): each number linked individually

## Paragraphs & Spacing
- Paragraphs: 8px vertical margin
- `<em>`: 13px, `#555` (used for subtitle lines under h1)
