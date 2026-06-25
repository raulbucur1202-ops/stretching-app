// data/routines.ts
// Die Übungs- und Routine-Inhalte als Daten.
//
// WICHTIG: Die Übungs-Struktur (Exercise) bleibt unverändert, damit der
// Routine Player weiter funktioniert. Neu sind nur Zusatzfelder auf der
// Routine-Ebene (title, subtitle, category, ...) für die Bibliothek.

// ===========================================================================
// TYPEN – hier ist definiert, welche Felder eine Übung und eine Routine haben.
// Neue Inhalte fügst du NUR als neue Einträge unten in `routines` hinzu;
// die Screens lesen automatisch aus dieser Liste. (Siehe VORLAGE_neue_routine.txt)
// ===========================================================================

// Eine einzelne Übung innerhalb einer Routine.
export type Exercise = {
  name: string;          // PFLICHT: Name der Übung
  durationSeconds: number; // PFLICHT: Dauer in Sekunden (Timer zählt davon runter)
  cue: string;           // PFLICHT: kurzer Merksatz (1 Zeile), darf '' sein
  instruction: string;   // PFLICHT: ausführliche Anleitung, darf '' sein
  modification: string;  // PFLICHT-Feld: leichtere Variante; '' = keine
  warning: string;       // PFLICHT-Feld: Sicherheitshinweis; '' = keiner
  gif?: string;          // OPTIONAL: Datei/URL für die Vorschau-Animation
};

// Eine komplette Routine (Liste von Übungen + Anzeige-Infos).
export type Routine = {
  id: string;            // PFLICHT: eindeutiger Kurz-Slug, z.B. 'morgen-mobility'
  title: string;         // PFLICHT: Anzeigename
  subtitle: string;      // PFLICHT: kurzer Untertitel
  category: 'Mobility' | 'Dehnen' | 'Aktivierung' | 'Entspannung'; // PFLICHT: Filter-Kategorie
  bodyArea: string;      // PFLICHT: Körperregion (Anzeige + Suche)
  level: 'Anfänger' | 'Fortgeschritten' | 'Profi'; // PFLICHT: Schwierigkeitsstufe
  premium: boolean;      // PFLICHT: true = nur mit Premium spielbar
  description: string;   // PFLICHT: 1–2 Sätze, was die Routine bewirkt
  targetMuscles: string[]; // PFLICHT: beteiligte Muskeln/Regionen (als Liste)
  scienceNote?: string;  // OPTIONAL: kurzer Hintergrund-Satz ("Mechanik-Tipp")
  exercises: Exercise[]; // PFLICHT: die Übungen in Reihenfolge
};

export const routines: Record<string, Routine> = {
  'morgen-mobility': {
    id: 'morgen-mobility',
    title: 'Morgen-Mobility',
    subtitle: 'Sanft beweglich in den Tag starten',
    description:
      'Sanfte Ganzkörper-Mobilisation, die den Körper nach dem Aufstehen weckt und Steifheit reduziert.',
    targetMuscles: ['Nacken', 'Schultern', 'Brustwirbelsäule', 'Rumpf', 'Hüfte'],
    category: 'Mobility',
    bodyArea: 'Ganzkörper',
    level: 'Anfänger',
    premium: false,
    exercises: [
      {
        name: 'Nacken sanft lösen',
        durationSeconds: 40,
        cue: 'Langsam und kontrolliert',
        instruction:
          'Senke das Kinn sanft Richtung Brust und rolle den Kopf langsam von einer Seite zur anderen. Bewege dich nur so weit, wie es angenehm ist.',
        modification: 'Mache die Bewegung kleiner und langsamer.',
        warning: 'Bei Schwindel oder Schmerzen stoppen.',
      },
      {
        name: 'Schultern kreisen',
        durationSeconds: 40,
        cue: 'Große, ruhige Kreise',
        instruction:
          'Kreise beide Schultern langsam nach hinten, dann nach vorne. Lass die Arme locker hängen.',
        modification: 'Nur eine Schulter nach der anderen kreisen.',
        warning: '',
      },
      {
        name: 'Brustkorb öffnen',
        durationSeconds: 40,
        cue: 'Brust weit, Atem ruhig',
        instruction:
          'Verschränke die Hände hinter dem Kopf, ziehe die Ellbogen sanft nach außen und öffne den Brustkorb. Atme tief.',
        modification: 'Hände locker an den Hinterkopf legen, ohne zu ziehen.',
        warning: '',
      },
      {
        name: 'Katze-Kuh im Stehen',
        durationSeconds: 45,
        cue: 'Wirbel für Wirbel',
        instruction:
          'Stütze die Hände auf die Oberschenkel. Mache abwechselnd einen runden und einen sanft gestreckten Rücken, im Atemrhythmus.',
        modification: 'Bewegung kleiner halten.',
        warning: '',
      },
      {
        name: 'Seitneigung',
        durationSeconds: 40,
        cue: 'Lange Körperseite',
        instruction:
          'Strecke einen Arm über den Kopf und neige dich sanft zur Gegenseite. Dann die Seite wechseln.',
        modification: 'Hand in die Hüfte statt über den Kopf.',
        warning: '',
      },
      {
        name: 'Hüfte kreisen',
        durationSeconds: 45,
        cue: 'Locker aus der Hüfte',
        instruction:
          'Hände in die Hüften, kreise das Becken langsam in eine Richtung, dann in die andere.',
        modification: 'Kleinere Kreise machen.',
        warning: '',
      },
      {
        name: 'Tief durchatmen',
        durationSeconds: 30,
        cue: 'Ankommen',
        instruction:
          'Steh ruhig, atme drei- bis viermal tief ein und aus. Spüre, wie wach der Körper jetzt ist.',
        modification: '',
        warning: '',
      },
    ],
  },

  'nacken-schultern-reset': {
    id: 'nacken-schultern-reset',
    title: 'Nacken & Schultern Reset',
    subtitle: 'Lockerheit für den oberen Körper',
    description:
      'Löst das Verspannungsgefühl im oberen Körper – ideal nach langem Sitzen am Bildschirm.',
    targetMuscles: ['Nackenmuskulatur', 'Trapezius', 'Schultern', 'Brustmuskulatur', 'oberer Rücken'],
    category: 'Mobility',
    bodyArea: 'Nacken & Schultern',
    level: 'Anfänger',
    premium: false,
    exercises: [
      {
        name: 'Nacken seitlich dehnen',
        durationSeconds: 40,
        cue: 'Ohr Richtung Schulter',
        instruction:
          'Neige den Kopf sanft zur Seite, lass die Gegenschulter locker nach unten sinken. Halten, dann Seite wechseln.',
        modification: 'Kürzer halten, weniger Zug.',
        warning: 'Bei Schwindel oder ausstrahlenden Beschwerden stoppen.',
      },
      {
        name: 'Schultern kreisen',
        durationSeconds: 40,
        cue: 'Locker und groß',
        instruction:
          'Kreise beide Schultern langsam nach hinten, dann nach vorne.',
        modification: 'Eine Schulter nach der anderen.',
        warning: '',
      },
      {
        name: 'Brustöffner am Türrahmen',
        durationSeconds: 45,
        cue: 'Brust weit',
        instruction:
          'Lege einen Unterarm an einen Türrahmen und drehe den Oberkörper sanft weg, bis sich die Brust öffnet. Seite wechseln.',
        modification: 'Kleineren Winkel wählen.',
        warning: '',
      },
      {
        name: 'Oberen Rücken mobilisieren',
        durationSeconds: 45,
        cue: 'Rund und auf',
        instruction:
          'Hände vor dir verschränken, nach vorne schieben und den oberen Rücken rund machen, dann wieder öffnen.',
        modification: 'Bewegung kleiner.',
        warning: '',
      },
      {
        name: 'Nacken entspannen',
        durationSeconds: 30,
        cue: 'Loslassen',
        instruction:
          'Schultern und Kiefer locker lassen, ruhig atmen und nachspüren.',
        modification: '',
        warning: '',
      },
    ],
  },

  'ruecken-huefte': {
    id: 'ruecken-huefte',
    title: 'Rücken & Hüfte lösen',
    subtitle: 'Mehr Freiheit in der Körpermitte',
    description:
      'Bringt mehr Freiheit in die Körpermitte und lockert unteren Rücken und Hüfte.',
    targetMuscles: ['unterer Rücken', 'Hüftbeuger', 'Gesäß', 'hintere Oberschenkel'],
    category: 'Mobility',
    bodyArea: 'Rücken & Hüfte',
    level: 'Fortgeschritten',
    premium: true,
    exercises: [
      {
        name: 'Beckenkippen im Stehen',
        durationSeconds: 40,
        cue: 'Becken vor und zurück',
        instruction:
          'Hände in die Hüften, kippe das Becken langsam vor und zurück. Der untere Rücken bewegt sanft mit.',
        modification: 'Bewegung kleiner.',
        warning: 'Bei stechenden Rückenbeschwerden stoppen.',
      },
      {
        name: 'Sanfte Vorbeuge',
        durationSeconds: 45,
        cue: 'Langer Rücken',
        instruction:
          'Mit langem Rücken aus der Hüfte leicht nach vorne beugen, Knie weich. Langsam wieder aufrichten.',
        modification: 'Hände auf den Oberschenkeln abstützen.',
        warning: '',
      },
      {
        name: 'Hüftbeuger dehnen',
        durationSeconds: 50,
        cue: 'Hüfte nach vorn',
        instruction:
          'Großer Schritt nach vorne, hinteres Knie tief, Hüfte sanft nach vorne schieben. Seite wechseln.',
        modification: 'Festhalten, kleinerer Schritt.',
        warning: '',
      },
      {
        name: 'Figur 4 im Stehen',
        durationSeconds: 45,
        cue: 'Außenhüfte öffnen',
        instruction:
          'Einen Knöchel über das andere Knie legen, Standbein leicht beugen, festhalten. Seite wechseln.',
        modification: 'An Wand oder Stuhl festhalten.',
        warning: '',
      },
      {
        name: 'Katze-Kuh im Stehen',
        durationSeconds: 45,
        cue: 'Wirbel für Wirbel',
        instruction:
          'Hände auf die Oberschenkel, abwechselnd runden und sanft gestreckten Rücken im Atemrhythmus.',
        modification: 'Bewegung kleiner.',
        warning: '',
      },
    ],
  },

  'beine-dehnen': {
    id: 'beine-dehnen',
    title: 'Beine tief dehnen',
    subtitle: 'Recovery für Hamstrings, Hüfte & Waden',
    description:
      'Intensiveres Dehnen für Beinrückseite, Waden und Hüfte – gut zur Erholung.',
    targetMuscles: ['Hamstrings', 'Waden', 'Quadrizeps', 'Adduktoren', 'Hüftbeuger'],
    category: 'Dehnen',
    bodyArea: 'Beine & Hüfte',
    level: 'Fortgeschritten',
    premium: false,
    exercises: [
      {
        name: 'Hamstrings dehnen',
        durationSeconds: 60,
        cue: 'Langer Rücken, Knie weich',
        instruction:
          'Eine Ferse leicht vorstellen, mit geradem Rücken aus der Hüfte über das vordere Bein beugen. Seite wechseln.',
        modification: 'Knie mehr beugen, weniger weit.',
        warning: 'Sanft dehnen, nie in den Schmerz ziehen.',
      },
      {
        name: 'Waden an der Wand',
        durationSeconds: 50,
        cue: 'Ferse am Boden',
        instruction:
          'Hände an die Wand, ein Bein gestreckt nach hinten, Ferse bleibt am Boden. Seite wechseln.',
        modification: 'Geringerer Abstand zur Wand.',
        warning: '',
      },
      {
        name: 'Quads dehnen',
        durationSeconds: 50,
        cue: 'Knie unten, Hüfte vor',
        instruction:
          'Im Stehen einen Fuß zum Gesäß ziehen, Knie zeigt nach unten, Hüfte leicht vorschieben. Seite wechseln.',
        modification: 'An der Wand festhalten, weniger Zug.',
        warning: 'Bei Knieschmerzen reduzieren oder auslassen.',
      },
      {
        name: 'Leiste & Adduktoren',
        durationSeconds: 50,
        cue: 'Breit, zur Seite sinken',
        instruction:
          'Breiter Stand, Gewicht zur Seite verlagern und das Knie beugen, anderes Bein gestreckt. Seite wechseln.',
        modification: 'Weniger tief gehen.',
        warning: '',
      },
      {
        name: 'Tiefer Hüftöffner',
        durationSeconds: 60,
        cue: 'In die Hüfte sinken',
        instruction:
          'Tiefer Ausfallschritt, Hände innen neben dem vorderen Fuß, sanft in die Hüfte sinken. Seite wechseln.',
        modification: 'Hinteres Knie ablegen, höher bleiben.',
        warning: '',
      },
      {
        name: 'Nachspüren',
        durationSeconds: 30,
        cue: 'Locker lassen',
        instruction:
          'Ruhig stehen, ein paar Mal tief atmen, die Beine spüren.',
        modification: '',
        warning: '',
      },
    ],
  },

  'abend-entspannung': {
    id: 'abend-entspannung',
    title: 'Abend-Entspannung',
    subtitle: 'Zum Runterkommen',
    description:
      'Ruhige Übungen zum Runterkommen und Loslassen am Abend.',
    targetMuscles: ['Schultern', 'Flanken', 'Rücken', 'Atmung'],
    category: 'Entspannung',
    bodyArea: 'Ganzkörper',
    level: 'Anfänger',
    premium: false,
    exercises: [
      {
        name: 'Schultern lösen',
        durationSeconds: 40,
        cue: 'Hochziehen, fallen lassen',
        instruction:
          'Schultern zu den Ohren ziehen, kurz halten, mit dem Ausatmen fallen lassen.',
        modification: '',
        warning: '',
      },
      {
        name: 'Sanfte Seitneigung',
        durationSeconds: 40,
        cue: 'Lange Körperseite',
        instruction:
          'Einen Arm über den Kopf strecken, sanft zur Seite neigen, in die Flanke atmen. Seite wechseln.',
        modification: 'Hand in die Hüfte.',
        warning: '',
      },
      {
        name: 'Lockere Vorbeuge',
        durationSeconds: 45,
        cue: 'Schwer werden lassen',
        instruction:
          'Locker nach vorne beugen, Kopf und Arme hängen lassen, Knie weich. Langsam wieder aufrollen.',
        modification: 'Auf den Oberschenkeln abstützen.',
        warning: 'Bei Schwindel langsam aufrichten.',
      },
      {
        name: 'Ruhige Atmung',
        durationSeconds: 60,
        cue: '4 ein, 6 aus',
        instruction:
          'Ruhig atmen: etwa 4 Sekunden ein, 6 Sekunden aus. Mit jedem Ausatmen weicher werden.',
        modification: 'In eigenem Tempo atmen.',
        warning: '',
      },
    ],
  },

  'huefte-becken': {
    id: 'huefte-becken',
    title: 'Hüfte & Becken Mobility',
    subtitle: 'Locker und frei aus der Körpermitte',
    description:
      'Macht Hüfte und Becken locker und frei – wichtig für Alltagsbewegungen wie Bücken und Aufstehen.',
    targetMuscles: ['Hüftbeuger', 'Gesäß', 'Adduktoren', 'Beckenregion'],
    category: 'Mobility',
    bodyArea: 'Hüfte & Becken',
    level: 'Anfänger',
    premium: false,
    scienceNote:
      'Eine bewegliche Hüfte unterstützt Alltagsbewegungen wie Bücken, Aufstehen und Gehen.',
    exercises: [
      {
        name: 'Beckenkippen im Stehen',
        durationSeconds: 45,
        cue: 'Becken vor und zurück',
        instruction:
          'Hände in die Hüften. Kippe das Becken langsam nach vorne und hinten, der untere Rücken bewegt sanft mit.',
        modification: 'Bewegung kleiner machen.',
        warning: 'Bei stechenden Rückenbeschwerden stoppen.',
      },
      {
        name: 'Hüftkreisen',
        durationSeconds: 45,
        cue: 'Große, ruhige Kreise',
        instruction:
          'Hände in die Hüften, kreise das Becken langsam in eine Richtung, dann in die andere.',
        modification: 'Kleinere Kreise.',
        warning: '',
      },
      {
        name: 'Figur 4 im Stehen',
        durationSeconds: 45,
        cue: 'Außenhüfte öffnen',
        instruction:
          'Lege einen Knöchel über das andere Knie, beuge das Standbein leicht, halte dich fest. Seite wechseln.',
        modification: 'An Wand oder Stuhl festhalten.',
        warning: '',
      },
      {
        name: 'Sanfter Hüftbeuger',
        durationSeconds: 50,
        cue: 'Hüfte nach vorn',
        instruction:
          'Schritt nach vorne, hinteres Knie tief, Hüfte langsam nach vorne schieben, bis es vorne zieht. Seite wechseln.',
        modification: 'Kleinerer Schritt, festhalten.',
        warning: '',
      },
      {
        name: 'Adduktoren sanft',
        durationSeconds: 45,
        cue: 'Breit, zur Seite sinken',
        instruction:
          'Breiter Stand, Gewicht zur Seite verlagern, ein Knie beugen, anderes Bein gestreckt. Seite wechseln.',
        modification: 'Weniger tief gehen.',
        warning: '',
      },
      {
        name: 'Nachspüren',
        durationSeconds: 30,
        cue: 'Locker lassen',
        instruction:
          'Ruhig stehen, ein paar Mal tief atmen, die Hüfte spüren.',
        modification: '',
        warning: '',
      },
    ],
  },

  'ganzkoerper-beweglichkeit': {
    id: 'ganzkoerper-beweglichkeit',
    title: 'Ganzkörper-Beweglichkeit',
    subtitle: 'Einmal durch den ganzen Körper',
    description:
      'Bewegt einmal den ganzen Körper durch seinen Bewegungsumfang.',
    targetMuscles: ['Brustwirbelsäule', 'Hüfte', 'Hamstrings', 'Schultern', 'Sprunggelenk'],
    category: 'Mobility',
    bodyArea: 'Ganzkörper',
    level: 'Fortgeschritten',
    premium: true,
    scienceNote:
      'Aktive Mobility bewegt die Gelenke durch ihren Bewegungsumfang und eignet sich gut als tägliche Bewegungspflege.',
    exercises: [
      {
        name: 'Brustwirbelsäule rotieren',
        durationSeconds: 45,
        cue: 'Aus der Mitte drehen',
        instruction:
          'Leicht in die Knie, Hände vor der Brust. Drehe den Oberkörper kontrolliert nach links und rechts.',
        modification: 'Kleinere Drehung.',
        warning: '',
      },
      {
        name: 'Tiefe Hocke halten',
        durationSeconds: 45,
        cue: 'Tief sinken, Brust auf',
        instruction:
          'Sinke mit den Fersen am Boden in eine tiefe Hocke, halte dich locker, sanftes Wippen erlaubt.',
        modification: 'Festhalten oder weniger tief.',
        warning: 'Bei Knieschmerzen höher bleiben.',
      },
      {
        name: 'Ausfallschritt mit Reach',
        durationSeconds: 50,
        cue: 'Lang machen',
        instruction:
          'Großer Ausfallschritt, hinteres Knie tief, gleichseitigen Arm nach oben und leicht zur Seite strecken. Seite wechseln.',
        modification: 'Kleinerer Schritt, ohne Arm.',
        warning: '',
      },
      {
        name: 'Aktive Hamstrings',
        durationSeconds: 45,
        cue: 'Bein lang',
        instruction:
          'Ferse vorstellen, Fußspitze anziehen, mit geradem Rücken sanft Richtung Bein beugen und wieder hoch. Seite wechseln.',
        modification: 'Knie mehr beugen.',
        warning: '',
      },
      {
        name: 'Schultern öffnen',
        durationSeconds: 40,
        cue: 'Brust weit',
        instruction:
          'Hände hinter dem Rücken locker falten, Arme sanft anheben, Brust öffnen.',
        modification: 'Handtuch zwischen die Hände nehmen.',
        warning: '',
      },
      {
        name: 'Sprunggelenk mobilisieren',
        durationSeconds: 40,
        cue: 'Knie über Zeh',
        instruction:
          'Schritt nach vorne, Knie sanft über die Zehen schieben, Ferse bleibt am Boden. Seite wechseln.',
        modification: 'Kleinere Bewegung.',
        warning: '',
      },
    ],
  },

  'huefte-sport': {
    id: 'huefte-sport',
    title: 'Hüft-Mobility für Sport',
    subtitle: 'Tiefe Hüftbeweglichkeit für Athleten',
    description:
      'Tiefe Hüftbeweglichkeit für Athleten – unterstützt Sprinten, Richtungswechsel und tiefe Positionen.',
    targetMuscles: ['Hüftbeuger', 'Gesäß/Rotatoren', 'Adduktoren', 'Hüftkapsel-Bereich'],
    category: 'Mobility',
    bodyArea: 'Hüfte',
    level: 'Profi',
    premium: true,
    scienceNote:
      'Gezielte Hüftbeweglichkeit wird im Sport genutzt, um Sprinten, Richtungswechsel und tiefe Positionen zu unterstützen.',
    exercises: [
      {
        name: '90/90 Hüftwechsel',
        durationSeconds: 60,
        cue: 'Beide Knie 90 Grad',
        instruction:
          'Im Sitzen ein Bein vorne, eins seitlich, beide Knie 90 Grad. Schwenke kontrolliert von Seite zu Seite, indem du die Knie über den Boden führst.',
        modification: 'Hände hinter dir abstützen.',
        warning: '',
      },
      {
        name: 'Tiefer Ausfallschritt mit Rotation',
        durationSeconds: 55,
        cue: 'Hüfte tief, dann drehen',
        instruction:
          'Tiefer Ausfallschritt, Hände innen neben dem Fuß. Drehe den oberen Arm zur Decke auf, dann zurück. Seite wechseln.',
        modification: 'Hinteres Knie ablegen.',
        warning: '',
      },
      {
        name: 'Taube (Hüftöffner)',
        durationSeconds: 60,
        cue: 'In die Außenhüfte sinken',
        instruction:
          'Vorderes Bein angewinkelt vor dir am Boden, hinteres lang. Sinke mit aufrechtem Becken sanft nach vorne. Seite wechseln.',
        modification: 'Höher bleiben, Kissen unter die Hüfte.',
        warning: 'Bei Knieschmerzen reduzieren.',
      },
      {
        name: 'Kniender Hüftbeuger',
        durationSeconds: 55,
        cue: 'Hüfte nach vorn',
        instruction:
          'Kniestand, vorderer Fuß auf, Hüfte nach vorne schieben, Po leicht anspannen, bis es vorne zieht. Seite wechseln.',
        modification: 'Kleinere Bewegung.',
        warning: '',
      },
      {
        name: 'Aktive Hüftkreise (CARs)',
        durationSeconds: 50,
        cue: 'Größtmöglicher Kreis',
        instruction:
          'Auf einem Bein stehen, das andere Knie anheben und langsam einen möglichst großen Kreis aus der Hüfte führen. Seite wechseln.',
        modification: 'Festhalten, kleinerer Kreis.',
        warning: '',
      },
      {
        name: 'Nachatmen',
        durationSeconds: 30,
        cue: 'Ankommen',
        instruction: 'Ruhig stehen, tief atmen, die Hüfte spüren.',
        modification: '',
        warning: '',
      },
    ],
  },

  'sprint-prep': {
    id: 'sprint-prep',
    title: 'Sprint Prep – dynamische Aktivierung',
    subtitle: 'Dynamisch warm vor Sprint & Sport',
    description:
      'Dynamische Aktivierung als Vorbereitung auf schnelle, explosive Belastung.',
    targetMuscles: ['Hüfte', 'Hamstrings', 'Quadrizeps', 'Gesäß', 'Waden'],
    category: 'Aktivierung',
    bodyArea: 'Beine & Hüfte',
    level: 'Profi',
    premium: true,
    scienceNote:
      'Vor schnellen, explosiven Belastungen werden dynamische Bewegungen bevorzugt; langes statisches Dehnen meist auf danach gelegt.',
    exercises: [
      {
        name: 'Beinpendel vor/zurück',
        durationSeconds: 40,
        cue: 'Locker schwingen',
        instruction:
          'An der Wand festhalten, ein Bein locker nach vorne und hinten pendeln, kontrolliert größer werden. Seite wechseln.',
        modification: 'Kleinere Schwünge.',
        warning: 'Erst nach 2–3 Minuten lockerem Warmwerden starten.',
      },
      {
        name: 'Beinpendel seitlich',
        durationSeconds: 40,
        cue: 'Quer schwingen',
        instruction:
          'Festhalten, ein Bein vor dem Körper locker von Seite zu Seite pendeln. Seite wechseln.',
        modification: 'Kleinere Schwünge.',
        warning: '',
      },
      {
        name: 'Gehende Ausfallschritte',
        durationSeconds: 45,
        cue: 'Lang und tief',
        instruction:
          'Abwechselnd große Ausfallschritte nach vorne, Oberkörper aufrecht, hinteres Knie tief.',
        modification: 'Kürzere Schritte.',
        warning: '',
      },
      {
        name: 'Knie-Hebe-Marsch',
        durationSeconds: 40,
        cue: 'Knie hoch, Tempo',
        instruction:
          'Marschiere auf der Stelle, ziehe abwechselnd die Knie betont hoch, Arme schwingen mit.',
        modification: 'Langsameres Tempo.',
        warning: '',
      },
      {
        name: 'Hüftöffner im Gehen',
        durationSeconds: 40,
        cue: 'Knie nach außen führen',
        instruction:
          'Im Gehen abwechselnd das Knie anheben und in einem Bogen nach außen öffnen.',
        modification: 'Festhalten, langsamer.',
        warning: '',
      },
      {
        name: 'Anfersen locker',
        durationSeconds: 35,
        cue: 'Fersen zum Po',
        instruction:
          'Leichtes Joggen auf der Stelle, Fersen locker Richtung Gesäß ziehen.',
        modification: 'Zügiges Gehen statt Joggen.',
        warning: '',
      },
    ],
  },

  'recovery-beine-huefte': {
    id: 'recovery-beine-huefte',
    title: 'Recovery – Beine & Hüfte',
    subtitle: 'Ruhiges Dehnen nach dem Training',
    description:
      'Ruhiges, längeres Dehnen nach dem Training zur Unterstützung der Beweglichkeit.',
    targetMuscles: ['Hamstrings', 'Quadrizeps/Rektus femoris', 'Hüftbeuger', 'Gesäß', 'Adduktoren', 'Waden'],
    category: 'Dehnen',
    bodyArea: 'Beine & Hüfte',
    level: 'Fortgeschritten',
    premium: true,
    scienceNote:
      'Längeres, ruhiges Dehnen wird vor allem eingesetzt, um Beweglichkeit über die Zeit zu unterstützen – ideal nach dem Sport.',
    exercises: [
      {
        name: 'Hamstrings dehnen',
        durationSeconds: 60,
        cue: 'Langer Rücken',
        instruction:
          'Ferse vorstellen, Fußspitze hoch, mit geradem Rücken aus der Hüfte über das Bein beugen und ruhig halten. Seite wechseln.',
        modification: 'Knie mehr beugen.',
        warning: 'Sanft dehnen, nie in den Schmerz.',
      },
      {
        name: 'Quads / Rektus femoris',
        durationSeconds: 60,
        cue: 'Knie unten, Hüfte vor',
        instruction:
          'Im Stehen einen Fuß zum Gesäß ziehen, Knie zeigt nach unten, Hüfte leicht vorschieben und halten. Seite wechseln.',
        modification: 'Festhalten, weniger Zug.',
        warning: 'Bei Knieschmerzen reduzieren.',
      },
      {
        name: 'Hüftbeuger dehnen',
        durationSeconds: 60,
        cue: 'Hüfte nach vorn',
        instruction:
          'Ausfallschritt, hinteres Knie ablegen, Hüfte ruhig nach vorne schieben und halten. Seite wechseln.',
        modification: 'Kleinere Position.',
        warning: '',
      },
      {
        name: 'Gesäß / Figur 4',
        durationSeconds: 60,
        cue: 'Außenhüfte lang',
        instruction:
          'Auf dem Rücken einen Knöchel über das andere Knie legen, Oberschenkel sanft heranziehen und halten. Seite wechseln.',
        modification: 'Weniger heranziehen.',
        warning: '',
      },
      {
        name: 'Adduktoren / Leiste',
        durationSeconds: 55,
        cue: 'Breit und ruhig',
        instruction:
          'Breiter Stand, zu einer Seite sinken, anderes Bein gestreckt, ruhig halten. Seite wechseln.',
        modification: 'Weniger tief.',
        warning: '',
      },
      {
        name: 'Waden dehnen',
        durationSeconds: 50,
        cue: 'Ferse am Boden',
        instruction:
          'An der Wand ein Bein gestreckt nach hinten, Ferse bleibt am Boden, halten. Seite wechseln.',
        modification: 'Geringerer Abstand.',
        warning: '',
      },
    ],
  },
};

// Liste aller Routinen (Reihenfolge wie oben definiert).
export const allRoutines: Routine[] = Object.values(routines);

// Eine Routine anhand ihrer id holen.
export function getRoutineById(id: string): Routine | undefined {
  return routines[id];
}

// Zentrale Zugriffslogik: Darf diese Routine gespielt werden?
// Spielbar, wenn: nicht premium, ODER Nutzer ist Premium, ODER sie wird aus
// dem 7-Tage-Programm gestartet (Programm bleibt komplett gratis).
export function canPlayRoutine(opts: {
  premium: boolean;
  userIsPremium: boolean;
  fromProgram: boolean;
}): boolean {
  return !opts.premium || opts.userIsPremium || opts.fromProgram;
}

// Dauer einer Routine in Minuten – aus der Summe der Übungen berechnet
// (nicht fest eingetippt), gerundet auf ganze Minuten.
export function routineDurationMinutes(routine: Routine): number {
  const seconds = routine.exercises.reduce(
    (sum, e) => sum + e.durationSeconds,
    0
  );
  return Math.round(seconds / 60);
}
