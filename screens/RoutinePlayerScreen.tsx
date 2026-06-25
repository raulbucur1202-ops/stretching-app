// screens/RoutinePlayerScreen.tsx
// Vollbild-Player im modernen MOVA-Stil mit großer GIF-Vorschau.
//
// WICHTIG: Die gesamte Timer-Logik (Countdown, automatischer Wechsel bei 0,
// Abschluss-Screen, Programm-Kontext, Premium-Check) ist UNVERÄNDERT –
// nur Aussehen + Anordnung sind neu.

import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadowSoft } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { PrimaryButton } from '../components/PrimaryButton';
import { routines } from '../data/routines';
import { addSession } from '../storage/sessions';
import { completeDay } from '../data/programProgress';

// Sekunden als m:ss anzeigen, z.B. 45 -> "0:45", 90 -> "1:30".
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function RoutinePlayerScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();

  const routineId: string = route.params?.routineId ?? 'morgen-mobility';
  const routine = routines[routineId];
  const exercises = routine.exercises;

  // Optionaler Programm-Kontext.
  const programId: string | undefined = route.params?.programId;
  const programDay: number | undefined = route.params?.day;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(exercises[0].durationSeconds);
  const [paused, setPaused] = useState(false);
  const [showModification, setShowModification] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const current = exercises[currentIndex];
  const totalDuration = exercises.reduce((sum, e) => sum + e.durationSeconds, 0);

  // Session nur EINMAL pro Abschluss speichern.
  const savedRef = useRef(false);
  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      addSession({
        routineName: routine.title,
        date: new Date().toISOString(),
        durationSeconds: totalDuration,
      });
      if (programId && programDay) {
        completeDay(programDay);
      }
    }
  }, [done]);

  // Zur nächsten Übung – oder Abschluss, wenn es die letzte war.
  function advance() {
    setShowModification(false);
    if (currentIndex + 1 >= exercises.length) {
      setDone(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSecondsLeft(exercises[currentIndex + 1].durationSeconds);
    }
  }

  // Zur vorherigen Übung (bei der ersten deaktiviert).
  function goPrevious() {
    if (currentIndex === 0) return;
    setShowModification(false);
    setCurrentIndex(currentIndex - 1);
    setSecondsLeft(exercises[currentIndex - 1].durationSeconds);
  }

  // Sekunden-Takt.
  useEffect(() => {
    if (paused || done || secondsLeft <= 0) return;
    const id = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, paused, done]);

  // Timer 0 -> automatisch weiter.
  useEffect(() => {
    if (!done && secondsLeft === 0) advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // ---------- ABSCHLUSS-SCREEN ----------
  if (done) {
    return (
      <View
        style={[
          styles.safe,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <StatusBar style="dark" />
        <View style={styles.completeWrap}>
          <View style={styles.completeIconCircle}>
            <Ionicons name="checkmark" size={56} color={colors.accent} />
          </View>
          <Text style={styles.completeTitle}>Geschafft</Text>
          <Text style={styles.completeText}>
            Du hast {routine.title} abgeschlossen.
          </Text>
          <Text style={styles.completeTime}>
            Gesamtzeit: {formatTime(elapsed)} Min
          </Text>
          <PrimaryButton
            title="Fertig"
            onPress={() => navigation.goBack()}
            style={styles.completeButton}
          />
        </View>
      </View>
    );
  }

  // ---------- PLAYER ----------
  const timerRatio =
    current.durationSeconds > 0 ? secondsLeft / current.durationSeconds : 0;
  const isFirst = currentIndex === 0;

  return (
    <View
      style={[
        styles.safe,
        { paddingTop: insets.top + 8, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar style="dark" />

      {/* 1) Kopf: X + "Übung X von Y" + rechts Logo-Platzhalter */}
      <View style={styles.topBar}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          hitSlop={8}
        >
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.stepText}>
          Übung {currentIndex + 1} von {exercises.length}
        </Text>
        {/* Platzhalter rechts für das spätere Logo (gleiche Höhe wie X) */}
        <View style={styles.logoSlot} />
      </View>

      <View style={styles.segments}>
        {exercises.map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i < currentIndex && styles.segmentDone,
              i === currentIndex && styles.segmentCurrent,
              i > currentIndex && styles.segmentUpcoming,
            ]}
          />
        ))}
      </View>

      {/* 2) HERO – GIF-Vorschau oder Platzhalter */}
      <View style={styles.hero}>
        {current.gif ? (
          <Image
            source={{ uri: current.gif }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Ionicons name="sync" size={44} color={colors.accent} />
            <Text style={styles.heroPlaceholderText}>Vorschau folgt</Text>
          </View>
        )}
      </View>

      {/* 3) Cue-Pill + Name */}
      <View style={styles.cuePill}>
        <Text style={styles.cuePillText}>{current.cue}</Text>
      </View>
      <Text style={styles.exerciseName}>{current.name}</Text>

      {/* 4) Timer + schlanker Fortschrittsbalken */}
      <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
      <View style={styles.timerTrack}>
        <View style={[styles.timerFill, { width: `${timerRatio * 100}%` }]} />
      </View>

      {/* 5) Leichter machen + Warnung */}
      <View style={styles.midBlock}>
        {current.modification ? (
          <Pressable onPress={() => setShowModification((v) => !v)} hitSlop={8}>
            <Text style={styles.lighterLink}>
              {showModification ? 'Leichter ausblenden' : 'Leichter machen'}
            </Text>
          </Pressable>
        ) : null}
        {current.modification && showModification ? (
          <View style={styles.modificationBox}>
            <Text style={styles.modificationText}>{current.modification}</Text>
          </View>
        ) : null}
        {current.warning ? (
          <Text style={styles.warningText}>{current.warning}</Text>
        ) : null}
      </View>

      {/* 6) Steuer-Reihe: vorherige · Pause/Weiter · Überspringen */}
      <View style={styles.controls}>
        <Pressable
          style={[styles.sideButton, isFirst && styles.sideButtonDisabled]}
          onPress={goPrevious}
          disabled={isFirst}
          hitSlop={8}
        >
          <Ionicons
            name="play-skip-back"
            size={20}
            color={isFirst ? colors.textMuted : colors.textPrimary}
          />
        </Pressable>

        <Pressable
          style={styles.pauseButton}
          onPress={() => setPaused((p) => !p)}
        >
          <Ionicons
            name={paused ? 'play' : 'pause'}
            size={30}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable style={styles.sideButton} onPress={advance} hitSlop={8}>
          <Ionicons
            name="play-skip-forward"
            size={20}
            color={colors.textPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },

  // 1) Kopf
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowSoft,
  },
  logoSlot: {
    width: 40,
    height: 40,
  },
  stepText: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: colors.textPrimary,
  },
  segments: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 999,
  },
  segmentDone: {
    backgroundColor: colors.accentButton,
  },
  segmentCurrent: {
    backgroundColor: colors.accentButton,
    opacity: 0.4,
  },
  segmentUpcoming: {
    backgroundColor: '#D8D4CC',
  },

  // 2) Hero
  hero: {
    flex: 1,
    minHeight: 180,
    borderRadius: radius.xl,
    backgroundColor: colors.mintSurface,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadowSoft,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  heroPlaceholderText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },

  // 3) Cue + Name
  cuePill: {
    alignSelf: 'center',
    backgroundColor: colors.softTeal,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  cuePillText: {
    fontSize: 13,
    fontFamily: fonts.semibold,
    color: colors.accent,
  },
  exerciseName: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },

  // 4) Timer
  timer: {
    fontSize: 52,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    marginBottom: 10,
  },
  timerTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  timerFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  // 5) Mitte
  midBlock: {
    alignItems: 'center',
    marginBottom: 12,
  },
  lighterLink: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: colors.accent,
    paddingVertical: 6,
  },
  modificationBox: {
    backgroundColor: colors.softTeal,
    borderRadius: 14,
    padding: 12,
    marginTop: 2,
  },
  modificationText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.warmText,
    textAlign: 'center',
    marginTop: 6,
  },

  // 6) Steuerung
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingBottom: 8,
  },
  sideButton: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowSoft,
  },
  sideButtonDisabled: {
    opacity: 0.4,
  },
  pauseButton: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowSoft,
  },

  // Abschluss-Screen
  completeWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  completeIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: colors.softTeal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  completeTitle: {
    fontSize: 30,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  completeText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 6,
  },
  completeTime: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.textPrimary,
    marginBottom: 32,
  },
  completeButton: {
    paddingHorizontal: 48,
  },
});
