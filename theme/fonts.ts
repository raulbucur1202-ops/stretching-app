// theme/fonts.ts
// Schrift-Namen (Plus Jakarta Sans). Werden in App.tsx via useFonts geladen.
// In Styles als fontFamily nutzen, z.B. { fontFamily: fonts.bold }.

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;
