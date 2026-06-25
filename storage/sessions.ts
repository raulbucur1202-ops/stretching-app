// storage/sessions.ts
// Speichert abgeschlossene Routinen (Sessions) lokal mit AsyncStorage.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const SESSIONS_KEY = 'mova_sessions';

// Ein Eintrag pro abgeschlossener Routine.
export type Session = {
  routineName: string;
  date: string;            // heutiges Datum als ISO-String
  durationSeconds: number; // Summe der Übungs-Dauern
};

// Alle gespeicherten Sessions lesen (leere Liste, wenn noch keine da sind).
export async function loadSessions(): Promise<Session[]> {
  const raw = await AsyncStorage.getItem(SESSIONS_KEY);
  return raw ? (JSON.parse(raw) as Session[]) : [];
}

// Eine neue Session ans Ende der Liste hängen und zurückspeichern.
export async function addSession(entry: Session): Promise<void> {
  const list = await loadSessions();
  list.push(entry);
  await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(list));
}

// Alle Sessions löschen – für den Test-Reset.
export async function clearSessions(): Promise<void> {
  await AsyncStorage.removeItem(SESSIONS_KEY);
}
