// storage/profile.ts
// Alles rund ums lokale Speichern des Nutzer-Profils an EINER Stelle.
// Genutzt wird AsyncStorage (speichert Daten dauerhaft auf dem Gerät).

import AsyncStorage from '@react-native-async-storage/async-storage';

// Die Schlüssel, unter denen wir speichern.
export const PROFILE_KEY = 'mova_user_profile';
export const DONE_KEY = 'mova_onboarding_done';

// So sieht das gespeicherte Profil aus (die 6 Onboarding-Antworten + Premium).
export type UserProfile = {
  userType: string;    // Frage 1
  bodyArea: string;    // Frage 2
  goal: string;        // Frage 3
  duration: string;    // Frage 4
  level: string;       // Frage 5
  safety: string;      // Frage 6
  isPremium?: boolean; // Premium-Status (Standard: false)
};

// Profil speichern UND vermerken, dass das Onboarding abgeschlossen ist.
export async function saveProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  await AsyncStorage.setItem(DONE_KEY, 'true');
}

// Gespeichertes Profil lesen (null, wenn noch keins vorhanden ist).
export async function loadProfile(): Promise<UserProfile | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

// Wurde das Onboarding schon abgeschlossen?
export async function isOnboardingDone(): Promise<boolean> {
  const value = await AsyncStorage.getItem(DONE_KEY);
  return value === 'true';
}

// Beide Schlüssel löschen – für den Reset-Button zum Testen.
export async function clearOnboarding(): Promise<void> {
  await AsyncStorage.multiRemove([PROFILE_KEY, DONE_KEY]);
}

// Ist der Nutzer Premium? (false, wenn kein Profil oder Feld fehlt)
export async function isPremium(): Promise<boolean> {
  const profile = await loadProfile();
  return profile?.isPremium === true;
}

// Premium an-/ausschalten und im Profil speichern.
export async function setPremium(value: boolean): Promise<void> {
  const existing = await loadProfile();
  const base: UserProfile = existing ?? {
    userType: '',
    bodyArea: '',
    goal: '',
    duration: '',
    level: '',
    safety: '',
  };
  await saveProfile({ ...base, isPremium: value });
}
