// data/progress.ts
// Kleine Hilfsfunktionen, die aus der Session-Liste die Fortschritts-Werte
// berechnen. Reine Funktionen ohne Speicherzugriff – so leicht nachvollziehbar.

import { Session } from '../storage/sessions';

// Ein Datum als Tages-Schlüssel "YYYY-MM-DD" (nach lokaler Zeit).
function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Menge aller Tage, an denen mindestens eine Session war.
function activeDays(sessions: Session[]): Set<string> {
  return new Set(sessions.map((s) => dayKey(new Date(s.date))));
}

// Gesamtzahl aller abgeschlossenen Routinen.
export function totalSessions(sessions: Session[]): number {
  return sessions.length;
}

// Aktuelle Serie: aufeinanderfolgende Tage bis heute mit mind. einer Session.
// heute zählt; gestern+heute = 2; eine Lücke setzt zurück (0, wenn heute leer).
export function currentStreak(sessions: Session[]): number {
  const days = activeDays(sessions);
  let streak = 0;
  const cursor = new Date();
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// 7 Wahr/Falsch-Werte für die aktuelle Woche (Montag..Sonntag):
// war an dem Tag mindestens eine Session?
export function weekDots(sessions: Session[]): boolean[] {
  const days = activeDays(sessions);
  const today = new Date();

  // Montag dieser Woche bestimmen (getDay(): So=0..Sa=6).
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  const dots: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dots.push(days.has(dayKey(d)));
  }
  return dots;
}

// Montag 00:00 der aktuellen Woche (lokale Zeit).
function startOfThisWeek(): Date {
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Gesamte bewegte Zeit in Minuten (gerundet auf ganze Minuten).
export function totalMinutes(sessions: Session[]): number {
  const seconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  return Math.round(seconds / 60);
}

// Längste je erreichte Folge aufeinanderfolgender aktiver Tage.
export function longestStreak(sessions: Session[]): number {
  const days = [...activeDays(sessions)].sort(); // ISO-Strings sortieren korrekt
  if (days.length === 0) return 0;

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const cur = new Date(days[i]);
    const diffDays = Math.round((cur.getTime() - prev.getTime()) / 86400000);
    run = diffDays === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }
  return longest;
}

// Wochenziel: feste Zahl, hier leicht änderbar.
export const WEEKLY_GOAL = 4;
export function weeklyGoal(): number {
  return WEEKLY_GOAL;
}

// Anzahl Sessions in der aktuellen Woche (Mo–So).
export function sessionsThisWeek(sessions: Session[]): number {
  const monday = startOfThisWeek();
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);
  return sessions.filter((s) => {
    const d = new Date(s.date);
    return d >= monday && d < nextMonday;
  }).length;
}

// Ein Eintrag pro Tag des aktuellen Monats.
export type MonthDay = { day: number; active: boolean; isToday: boolean };

export function monthActiveDays(sessions: Session[]): MonthDay[] {
  const days = activeDays(sessions);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDay = today.getDate();

  // Tag 0 des Folgemonats = letzter Tag dieses Monats.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result: MonthDay[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    result.push({
      day: d,
      active: days.has(dayKey(date)),
      isToday: d === todayDay,
    });
  }
  return result;
}

// Vier Meilensteine mit Name und Freischalt-Status.
export type Milestone = { name: string; unlocked: boolean };

export function milestones(sessions: Session[]): Milestone[] {
  const total = totalSessions(sessions);
  const longest = longestStreak(sessions);
  return [
    { name: 'Erste Routine', unlocked: total >= 1 },
    { name: '3-Tage-Streak', unlocked: longest >= 3 },
    { name: '7-Tage-Streak', unlocked: longest >= 7 },
    { name: '10 Routinen', unlocked: total >= 10 },
  ];
}
