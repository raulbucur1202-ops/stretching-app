CLAUDE_UPLOAD_INSTRUCTIONS.md

Zweck
- Dieses Dokument erklärt Schritt-für-Schritt, wie du das Repository in Claude Design hochlädst / importierst, welche Dateien Claude für die Design‑Generierung braucht und welche Assets besonders wichtig sind.

Wichtige Dateien im Repo
- src/tokens.json -> zentrale Design Tokens (FARBEN, TYPO, SPACING, RADII, SHADOWS)
- src/tokens.ts -> TypeScript Token-Export (für Developer)
- FIGMA_STYLEGUIDE.md -> textuelle Anleitung zum Anlegen der Styles in Figma
- assets/flow.svg -> Signature Flow-SVG für Hintergrundakzente
- src/components/* -> wiederverwendbare Komponenten (Beispiele im Code)
- src/screens/* -> alle Screens als React-Native-Implementierung

Empfohlener Upload-Prozess (Claude Design)
1) Zip das Repo oder gib die GitHub-URL in Claude Design an (branch feature/premium-ui).
2) Claude liest src/tokens.json automatisch (oder lade tokens.json hoch).
3) Importiere FIGMA_STYLEGUIDE.md in Claude als Referenz – Claude kann daraus Color/Text styles erzeugen.
4) Lade assets/flow.svg hoch als Background Asset.
5) Erzeuge Components in Claude anhand von src/components (Card, Button, StatPill, ProgressRing). Nutze die Tokens aus tokens.json.

Spezielle Hinweise für Claude
- Stelle sicher, dass Claude das tokens.json verwendet, nicht nur visuell kopiert: die HEX-Werte und Größen sind verbindlich.
- Bitte Claude, Component Variants für Buttons (default/disabled/ghost), Card sizes (small/medium/hero) und ProgressRing states zu erzeugen.

Output-Expectations
- Vollständige Figma-File (Seiten: Tokens, Components, Screens)
- Exportierbare Assets (SVGs in 2x/3x), PNG Vorschauen
- Optional: Frontend-ready CSS/JSON Export (Claude kann tokens.json in andere Formate umwandeln)

Support
- Wenn Claude nach weiteren Infos fragt, verweise auf README.md und src/tokens.json im Repo.

