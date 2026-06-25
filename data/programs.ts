// data/programs.ts
// Definiert mehrtägige Programme (geordnete Abfolge von Routinen).

import { getRoutineById, routineDurationMinutes } from './routines';

export type ProgramDay = {
  day: number;       // 1..7
  routineId: string; // verweist auf eine Routine in data/routines.ts
};

export type Program = {
  id: string;
  title: string;
  subtitle: string;
  days: ProgramDay[];
};

export const starterProgram: Program = {
  id: 'starter-7',
  title: '7-Tage Starter',
  subtitle: 'Sanft beweglicher in einer Woche',
  days: [
    { day: 1, routineId: 'morgen-mobility' },
    { day: 2, routineId: 'nacken-schultern-reset' },
    { day: 3, routineId: 'huefte-becken' },
    { day: 4, routineId: 'ruecken-huefte' },
    { day: 5, routineId: 'ganzkoerper-beweglichkeit' },
    { day: 6, routineId: 'recovery-beine-huefte' },
    { day: 7, routineId: 'abend-entspannung' },
  ],
};

// Liefert zu einer routineId die Anzeige-Infos (Titel + Dauer in Minuten).
export function getProgramRoutineInfo(routineId: string): {
  title: string;
  durationMinutes: number;
} {
  const routine = getRoutineById(routineId);
  if (!routine) {
    return { title: routineId, durationMinutes: 0 };
  }
  return {
    title: routine.title,
    durationMinutes: routineDurationMinutes(routine),
  };
}
