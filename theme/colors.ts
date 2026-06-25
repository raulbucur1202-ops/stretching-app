// theme/colors.ts
// Zentrale Farb-Palette für MOVA (ruhiger, premium Spa-Look).
// Immer von hier importieren – niemals Farben direkt im Code eintippen.
//
// Hinweis: Die ursprünglichen Keys (background, textPrimary, ...) bleiben
// erhalten und sind auf die neue Palette gemappt – so übernehmen alle
// bestehenden Screens sofort den neuen Look, ohne Umbau. Neue, sprechende
// Namen (primary, surface, muted, ...) sind zusätzlich verfügbar.

export const colors = {
  // --- Bestehende Keys (Werte auf das neue Premium-Design aktualisiert) ---
  background: '#F4F3EE',   // App-Hintergrund (wärmeres Off-White)
  textPrimary: '#1F2933',  // Haupttext (Charcoal)
  textMuted: '#8A97A2',    // Untertitel / gedämpft
  accent: '#15897C',       // Primär-Türkis – Text & Icons
  accentButton: '#15897C', // Türkis-Akzent (Fortschritt/Dots)
  card: '#FFFFFF',         // Karten / Oberflächen
  border: 'rgba(31,41,51,0.06)', // sehr dezente Ränder
  softTeal: '#E4F2ED',     // zarte Mint-Fläche (Pills/Cue)
  flame: '#E0A93D',        // Akzent für Streak
  warmBg: '#FBEFD9',       // warme Fläche / Premium-Pill
  warmText: '#8A5A12',     // Text auf warmer Fläche
  warmIcon: '#C77A1C',     // Icon auf warmer Fläche

  // --- Neue, sprechende Tokens (aus dem neuen Design-Paket) ---
  surface: '#FFFFFF',
  surfaceMuted: '#F8F7F5',
  surfaceMint: '#DCEDE6',
  surfaceMintSoft: '#E4F2ED',
  textSecondary: '#56606A',
  accentPrimary: '#15897C',
  accentPrimaryDark: '#0F6E56',
  btnPrimaryBg: '#1F2933',
  disabled: 'rgba(31,41,51,0.12)',
  overlay: 'rgba(31,41,51,0.32)',
  successBg: '#E6F4EC',
  successText: '#1F7A4D',

  // --- Marken-/Stil-Flächen ---
  mintSurface: '#DCEDE6',  // weiche Mint-Fläche
  charcoal: '#1F2933',     // dunkle Akzent-Elemente (Buttons/Chips)
} as const;

export type AppColors = typeof colors;

// Rundungen (additiv; bestehende lg/xl bleiben für aktuelle Screens gleich).
export const radius = {
  sm: 12,
  md: 20,
  lg: 22,
  xl: 28,
} as const;

// Weicher Standard-Schatten (von Screens genutzt).
export const shadowSoft = {
  shadowColor: '#1F2933',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
} as const;

// Schatten-Stufen aus dem Design-Paket (für später verfügbar).
export const shadow = {
  level1: { shadowColor: '#1F2933', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 2 },
  level2: { shadowColor: '#1F2933', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 18, elevation: 4 },
  level3: { shadowColor: '#1F2933', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 12 }, shadowRadius: 28, elevation: 8 },
} as const;
