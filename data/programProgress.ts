// data/programProgress.ts
// Speichert, welche Tage des 7-Tage-Programms erledigt sind (lokal, AsyncStorage).

import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROGRAM_KEY = 'mova_program_starter7';
export const PROGRAM_TOTAL_DAYS = 7;

// Liste der erledigten Tage, z.B. [1, 2].
export async function getCompletedDays(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(PROGRAM_KEY);
  return raw ? (JSON.parse(raw) as number[]) : [];
}

// Einen Tag als erledigt markieren (ohne Duplikate) und speichern.
export async function completeDay(day: number): Promise<void> {
  const days = await getCompletedDays();
  if (!days.includes(day)) {
    days.push(day);
    await AsyncStorage.setItem(PROGRAM_KEY, JSON.stringify(days));
  }
}

// Der niedrigste Tag (1..7), der noch NICHT erledigt ist.
// Reine Funktion: bekommt die erledigten Tage übergeben.
// Sind alle 7 erledigt, gibt sie 8 zurück (= Programm abgeschlossen).
export function activeDay(completed: number[]): number {
  for (let d = 1; d <= PROGRAM_TOTAL_DAYS; d++) {
    if (!completed.includes(d)) return d;
  }
  return PROGRAM_TOTAL_DAYS + 1; // alle erledigt
}

// Ist das Programm komplett abgeschlossen?
export function isProgramComplete(completed: number[]): boolean {
  return completed.length >= PROGRAM_TOTAL_DAYS;
}

// Programm-Fortschritt löschen – für den Test-Reset.
export async function clearProgramProgress(): Promise<void> {
  await AsyncStorage.removeItem(PROGRAM_KEY);
}
