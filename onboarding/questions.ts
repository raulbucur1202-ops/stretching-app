// onboarding/questions.ts
// Nur die Inhalte des Onboardings als Daten – so können wir Fragen/Optionen
// später leicht ändern, ohne den Ablauf-Code anzufassen.

export type Question = {
  heading: string;        // große Überschrift oben
  subtitle?: string;      // kleiner grauer Untertitel (optional, nur Frage 6)
  question?: string;      // zusätzlicher Frage-Text über den Optionen (optional, nur Frage 6)
  options: string[];      // Antwort-Optionen (Einfach-Auswahl)
};

export const questions: Question[] = [
  {
    heading: 'Was beschreibt dich am besten?',
    options: [
      'Büroarbeiter',
      'Körperlich arbeitende Person',
      'Sportler',
      'Allgemein – ich möchte mich besser bewegen',
    ],
  },
  {
    heading: 'Wo fühlst du dich am meisten steif oder eingeschränkt?',
    options: [
      'Nacken',
      'Schultern',
      'Oberer Rücken',
      'Unterer Rücken',
      'Hüfte',
      'Hinterer Oberschenkel',
      'Vorderer Oberschenkel',
      'Adduktoren / Leiste',
      'Knie',
      'Sprunggelenk / Waden',
      'Ganzkörper',
    ],
  },
  {
    heading: 'Was ist dein Hauptziel?',
    options: [
      'Weniger Steifheit',
      'Bessere Beweglichkeit',
      'Erholung nach Arbeit',
      'Erholung nach Sport',
      'Besseres Haltungsgefühl',
      'Morgen-Energie',
      'Abend-Entspannung',
      'Unterstützung für freiere Bewegung',
    ],
  },
  {
    heading: 'Wie viel Zeit hast du?',
    options: ['3 Minuten', '5 Minuten', '10 Minuten', '15 Minuten'],
  },
  {
    heading: 'Was ist dein Level?',
    options: ['Anfänger', 'Fortgeschritten', 'Profi'],
  },
  {
    heading: 'Kurze Sicherheitsfrage',
    subtitle: 'Damit MOVA dich sicher begleiten kann.',
    question:
      'Hast du starke, stechende, ausstrahlende oder zunehmende Schmerzen, Taubheit, eine frische Verletzung oder eine Operation?',
    options: [
      'Nein',
      'Nur leichte Steifheit',
      'Ja, ich sollte medizinischen Rat einholen',
    ],
  },
];

// Die Antwort-Option aus Frage 6, die zur Warn-Box im Abschluss führt:
export const MEDICAL_FLAG_OPTION = 'Ja, ich sollte medizinischen Rat einholen';
