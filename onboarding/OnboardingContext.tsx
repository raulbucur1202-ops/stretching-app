// onboarding/OnboardingContext.tsx
// Ein einfacher "Schalter", den App.tsx bereitstellt und den andere
// Bildschirme nutzen können:
//   - completeOnboarding(): wechselt zur normalen App (nach dem Speichern)
//   - resetOnboarding(): löscht die Daten und bringt zurück ins Onboarding
//
// So muss man diese Funktionen nicht umständlich durch die Navigation reichen.

import { createContext, useContext } from 'react';

export type OnboardingControls = {
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingControls>({
  completeOnboarding: () => {},
  resetOnboarding: () => {},
});

export const OnboardingProvider = OnboardingContext.Provider;

export function useOnboarding(): OnboardingControls {
  return useContext(OnboardingContext);
}
