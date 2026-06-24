Kurzbeschreibung

Dieses Branch enthält ein Expo + TypeScript Starter‑Projekt mit einem modernen Premium‑Design für eine Stretching/Mobility App. Es ist als Design‑Demo gedacht: Tokens, Komponenten und Beispiel‑Screens sind implementiert.

Schnellstart

1) Repo klonen (oder diesen Branch auschecken):
   git clone https://github.com/raulbucur1202-ops/stretching-app.git
   cd stretching-app
   git checkout feature/premium-ui

2) Installieren
   npm install

3) Starten
   npx expo start

Wichtige Hinweise
- Platzhalter-GIFs werden remote geladen. Ersetze die URLs in src/mock/data.ts falls du eigene Assets hast.
- Payment/Backend: Nur UI implementiert.

Struktur
- src/tokens.ts – alle Design‑Tokens
- src/components – wiederverwendbare Komponenten
- src/screens – alle Screens (Onboarding, Home, Library, Routine Detail, Player, Progress, Paywall, Profile)
- src/navigation – Navigation

Wenn du möchtest, erstelle ich auf Wunsch die vollständige CI/Readme und exportiere die tokens.ts als JSON.
