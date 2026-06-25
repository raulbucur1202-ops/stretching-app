# MOVA

Mobility- & Stretching-App (Expo / React Native, TypeScript).
Kurze, geführte Routinen mit Timer, 7-Tage-Programm, Fortschritt/Streak,
Premium/Paywall – im neuen Premium-Design (Tokens, Komponenten, Plus Jakarta Sans).

## Lokal testen

Voraussetzungen: Node.js (LTS) und die App **Expo Go** auf dem Handy.

```bash
npm install
npx expo start
```

- QR-Code mit der **Kamera** (iOS) bzw. in **Expo Go** (Android) scannen.
- Bei WLAN-/Notch-Problemen: `npx expo start --tunnel` (Tunnel-Modus).

## Projektstruktur (Kurzüberblick)

- `screens/` – alle Screens (Home, Library, RoutineDetail, Player, Progress, Paywall, Profile, ProgramDetail)
- `components/` – wiederverwendbare UI (Card, PrimaryButton, StatPill, ProgressRing, ExerciseRow, RoutineCard)
- `data/` – Inhalte & Logik (routines, programs, progress, programProgress)
- `storage/` – lokale Speicherung via AsyncStorage (profile, sessions)
- `theme/` – Design-Tokens (colors, fonts, tokens)
- `onboarding/` – Onboarding-Flow + Context

## Neue Routine hinzufügen

Siehe `VORLAGE_neue_routine.txt`. Es genügt, einen Eintrag in `data/routines.ts`
zu ergänzen – alle Screens lesen dynamisch aus der zentralen Liste.

## Bekannte Einschränkungen

- **Fonts:** Beim allerersten Start werden die Schriften (Plus Jakarta Sans /
  Fraunces / Hanken Grotesk) geladen; bis dahin zeigt die App kurz einen
  ruhigen Off-White-Ladezustand.
- **Tunnel-Modus:** Der externe Tunnel-Dienst (ngrok) kann zeitweise instabil
  sein. Bei Verbindungsabbruch `npx expo start --tunnel` neu starten.
- **App-Icon:** Erscheint nicht in Expo Go (dort immer „Expo Go"); sichtbar erst
  in einem Dev-/Production-Build.
- **Reanimated:** Aktuell **nicht** im Einsatz. Falls später Animationen
  hinzukommen, muss `react-native-reanimated/plugin` als **letztes** Plugin in
  `babel.config.js` ergänzt werden.
