Figma-Styleguide (Text) — Stretching App (premium)

Ziel
- Fertiges, klares Style‑Sheet, das direkt in Figma als Basis angelegt werden kann.
- Enthält Farbpalette (HEX), Typografie, Spacing, Radii, Schatten & Komponenten-Token.

1) Farben (als Fills)
- Background / Page: #F4F3EE
- Surface / Card: #FFFFFF
- Surface Muted: #F8F7F5
- Mint Block: #DCEDE6
- Mint Soft: #E4F2ED
- Border: rgba(31,41,51,0.06)
- Text Primary: #1F2933
- Text Secondary: #56606A
- Text Muted: #8A97A2
- Accent Primary: #15897C
- Accent Primary Dark: #0F6E56
- Warm Accent Soft (Amber Block): #FBEFD9
- Warm Accent Text: #8A5A12
- Button Primary BG: #1F2933
- Button Primary Text: #FFFFFF

2) Typografie (Styles)
- Font: Plus Jakarta Sans (use Variable if available)
- H1: 34 / lineHeight 40 / weight 700
- H2: 28 / lineHeight 36 / weight 700
- H3: 22 / lineHeight 28 / weight 700
- Subtitle: 18 / lineHeight 24 / weight 600
- Body: 16 / lineHeight 22 / weight 400
- Body Small: 14 / lineHeight 20 / weight 400
- Caption: 12 / lineHeight 16 / weight 400
- Button: 16 / lineHeight 20 / weight 700

3) Spacing / Grid
- XS 4, SM 8, MD 12, LG 16, XL 24, XXL 32, XXXL 40
- Content padding: 16, Screen padding: 20
- Use 8pt based grid for vertical rhythm; allow 4pt micro spacing where needed

4) Radius / Shapes
- XS 8, SM 12, MD 20, LG 28 (main squircle), Pill 9999
- Hero/large cards: 28
- Medium cards / small panels: 20
- Buttons: 28 (pill)

5) Shadow (as effects)
- Level1: Color #1F2933 @ 6% opacity, Y 4, Blur 10 (Elevation 2)
- Level2: Color #1F2933 @ 8% opacity, Y 8, Blur 18 (Elevation 4)
- Level3: Color #1F2933 @10% opacity, Y 12, Blur 28 (Elevation 8)

6) Components (Figma frames & tokens)
- Card (Hero)
  - Size: flexible; padding 24; radius 28; fill white; shadow level2
  - Children: left image/GIF area, right title/subtitle, CTA button
  - Background flow SVG: AccentPrimary @ 6% opacity, positioned bottom-right

- Stat Pill
  - H 40, padding X 14, radius 20, fill surfaceMint
  - Text: value (16 Bold), label (12 Regular)

- Primary Button
  - H 56, radius 28, fill btnPrimaryBg, text white 16 bold

- Filter Chip
  - H 32, padding X 12, radius 16; selected: fill surfaceMint / accentPrimary text

- Progress Ring
  - create circle component: track color surfaceMuted, progress accentPrimary, stroke 12
  - text inside: h3/bold

- Exercise Row
  - H 72, radius 20, padding 12, left thumbnail 60x48 radius 12, right text column with title + meta

7) Signature Motif
- Flow Curve: single SVG path (assets/flow.svg). Use as subtle background accent on hero cards & onboarding screens (opacity 6%).

8) Export Checklist for Figma
- Create color styles for all color tokens
- Create text styles for all typography tokens
- Create effect styles for shadows
- Create components: Card/Hero, StatPill, PrimaryButton, Chip, ProgressRing, ExerciseRow
- Import flow.svg into Assets and place into hero components with 6% opacity

9) Notes for Claude / Designer
- Attach this repo URL: https://github.com/raulbucur1202-ops/stretching-app (branch feature/premium-ui)
- In Claude Design import tokens.json (src/tokens.json) and FIGMA text when creating styles
- Use Plus Jakarta Sans via Google Fonts (or use a close system font if not available)

10) Quick copy/paste snippets (CSS-like) for reference
- .btn-primary { background: #1F2933; color: #fff; height:56px; border-radius:28px; font-size:16px; font-weight:700 }
- .card { background: #fff; border-radius:28px; padding:24px; box-shadow: 0 8px 18px rgba(31,41,51,0.08) }

