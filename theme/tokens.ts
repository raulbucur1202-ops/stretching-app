// tokens.ts — MOVA Design Tokens (Expo / React Native)
// Single source of truth. Importiere überall via: import { colors, spacing, radii, type, elevation } from "@/theme/tokens";

export const colors = {
  primary: "#116466",
  primaryDeep: "#0B3D3E",
  primaryLight: "#DFF6F3",
  accent: "#F2C76B",
  accentDeep: "#E0A93D",
  accentText: "#633806",
  background: "#F7F5F2",
  surface: "#FFFFFF",
  surfaceAlt: "#FBF9F6",
  text: "#0F1720",
  muted: "#6B7280",
  border: "#ECE8E2",
  successBg: "#E6F4EC",
  successText: "#1F7A4D",
  white: "#FFFFFF",
} as const;

// Gradient-Stops (für expo-linear-gradient: colors={gradients.ctaPrimary})
export const gradients = {
  ctaPrimary: ["#13726F", "#0B3D3E"],
  breathRing: ["#DFF6F3", "#7FD0CB"],
} as const;

export const spacing = { xs: 4, s: 8, m: 16, l: 24, xl: 40 } as const;

export const radii = { small: 10, card: 20, pill: 999 } as const;

// RN-Shadow (iOS) + elevation (Android)
export const elevation = {
  soft: {
    shadowColor: colors.primaryDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  medium: {
    shadowColor: colors.primaryDeep,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 6,
  },
} as const;

// fontFamily-Keys entsprechen den in App.tsx geladenen Google-Fonts (siehe README unten)
export const fonts = {
  display: "Fraunces_600SemiBold",
  body: "HankenGrotesk_400Regular",
  bodyMedium: "HankenGrotesk_500Medium",
  bodySemiBold: "HankenGrotesk_600SemiBold",
} as const;

export const type = {
  h1: { fontFamily: fonts.display, fontSize: 32, lineHeight: 38, letterSpacing: -0.5, color: colors.text },
  h2: { fontFamily: fonts.bodySemiBold, fontSize: 22, lineHeight: 28, color: colors.text },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.text },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, letterSpacing: 0.2, color: colors.muted },
} as const;
