// screens/ProgressScreen.tsx
// Motivierende Fortschritts-Ansicht. Alle Zahlen kommen aus den echten
// gespeicherten Sessions (mova_sessions) und werden bei jedem Fokus neu geladen.

import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { loadSessions, Session } from '../storage/sessions';
import {
  currentStreak,
  longestStreak,
  milestones,
  monthActiveDays,
  sessionsThisWeek,
  totalMinutes,
  totalSessions,
  weeklyGoal,
  MonthDay,
  Milestone,
} from '../data/progress';

// Deutsche Monatsnamen (ohne Abhängigkeit von Geräte-Spracheinstellungen).
const MONTHS_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

// Kleiner Fortschritts-Ring (Donut) mit react-native-svg.
function ProgressRing({ value, goal }: { value: number; goal: number }) {
  const size = 96;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = goal > 0 ? Math.min(1, value / goal) : 0;
  const dashOffset = circumference * (1 - ratio);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Hintergrund-Kreis */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={stroke}
          fill="none"
        />
        {/* Gefüllter Fortschritt – startet oben (um -90° gedreht) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accentButton}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {/* Text in der Mitte */}
      <View style={styles.ringCenter}>
        <Text style={styles.ringText}>
          {value}/{goal}
        </Text>
      </View>
    </View>
  );
}

export default function ProgressScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadSessions().then(setSessions);
    }, [])
  );

  // Werte aus den echten Sessions berechnen.
  const total = totalSessions(sessions);
  const goal = weeklyGoal();
  const thisWeek = sessionsThisWeek(sessions);
  const remaining = Math.max(0, goal - thisWeek);
  const goalReached = thisWeek >= goal;

  const monthDays: MonthDay[] = monthActiveDays(sessions);
  const activeCount = monthDays.filter((d) => d.active).length;
  const monthName = MONTHS_DE[new Date().getMonth()];

  const stones: Milestone[] = milestones(sessions);
  const hasSessions = total > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* a) Kopf */}
        <Text style={styles.heading}>Dein Fortschritt</Text>
        <Text style={styles.subheading}>Schön, dass du dranbleibst.</Text>

        {!hasSessions && (
          <Text style={styles.emptyHint}>
            Starte deine erste Routine auf der Startseite.
          </Text>
        )}

        {/* b) Wochenziel-Karte */}
        <View style={styles.goalCard}>
          <ProgressRing value={thisWeek} goal={goal} />
          <View style={styles.goalTextWrap}>
            <Text style={styles.goalTitle}>Dein Wochenziel</Text>
            <Text style={styles.goalSubtitle}>
              {goalReached
                ? 'Wochenziel erreicht'
                : `Noch ${remaining} ${remaining === 1 ? 'Routine' : 'Routinen'} diese Woche`}
            </Text>
          </View>
        </View>

        {/* c) Drei Statistik-Karten */}
        <View style={styles.statsRow}>
          <StatCard value={currentStreak(sessions)} label="Streak (Tage)" />
          <StatCard value={longestStreak(sessions)} label="Rekord" />
          <StatCard value={totalMinutes(sessions)} label="Min bewegt" />
        </View>

        {/* d) Monats-Karte */}
        <View style={styles.monthCard}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthName}>{monthName}</Text>
            <Text style={styles.monthActive}>{activeCount} aktive Tage</Text>
          </View>
          <View style={styles.monthGrid}>
            {monthDays.map((d) => (
              <View
                key={d.day}
                style={[
                  styles.monthTile,
                  d.active ? styles.monthTileActive : styles.monthTileInactive,
                  d.isToday && styles.monthTileToday,
                ]}
              />
            ))}
          </View>
        </View>

        {/* e) Meilensteine */}
        <Text style={styles.sectionTitle}>Meilensteine</Text>
        <View style={styles.milestoneWrap}>
          {stones.map((m) => (
            <View
              key={m.name}
              style={[
                styles.milestone,
                m.unlocked ? styles.milestoneUnlocked : styles.milestoneLocked,
              ]}
            >
              <Ionicons
                name={m.unlocked ? 'checkmark-circle' : 'lock-closed'}
                size={16}
                color={m.unlocked ? '#0B5042' : colors.textMuted}
              />
              <Text
                style={[
                  styles.milestoneText,
                  m.unlocked
                    ? styles.milestoneTextUnlocked
                    : styles.milestoneTextLocked,
                ]}
              >
                {m.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Eine Statistik-Karte (große Zahl + kleines Label).
function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },

  // a) Kopf
  heading: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  emptyHint: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.accent,
    marginTop: -12,
    marginBottom: 24,
  },

  // b) Wochenziel
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  ringCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  goalTextWrap: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },

  // c) Statistik-Karten
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 30,
    fontFamily: fonts.bold,
    color: colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // d) Monat
  monthCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthName: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  monthActive: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  monthTile: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  monthTileActive: {
    backgroundColor: colors.accentButton,
  },
  monthTileInactive: {
    backgroundColor: '#EDEAE3',
  },
  monthTileToday: {
    borderColor: colors.accent,
  },

  // e) Meilensteine
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  milestoneWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  milestoneUnlocked: {
    backgroundColor: colors.softTeal,
  },
  milestoneLocked: {
    backgroundColor: '#F1EFE8',
  },
  milestoneText: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  milestoneTextUnlocked: {
    color: '#0B5042',
  },
  milestoneTextLocked: {
    color: colors.textMuted,
  },
});
