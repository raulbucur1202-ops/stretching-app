// screens/ProgramDetailScreen.tsx
// Detailseite des 7-Tage-Programms (Vollbild über den Tabs).
// Zeigt Fortschritt und die 7 Tage in drei Zuständen: erledigt / heute / kommend.

import React, { useCallback, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { starterProgram, getProgramRoutineInfo } from '../data/programs';
import {
  getCompletedDays,
  activeDay,
  isProgramComplete,
  PROGRAM_TOTAL_DAYS,
} from '../data/programProgress';

export default function ProgramDetailScreen() {
  const navigation = useNavigation<any>();
  const [completed, setCompleted] = useState<number[]>([]);

  // Bei jedem Fokus den Fortschritt neu laden (z.B. nach einem erledigten Tag).
  useFocusEffect(
    useCallback(() => {
      getCompletedDays().then(setCompleted);
    }, [])
  );

  const active = activeDay(completed);
  const programDone = isProgramComplete(completed);
  const progressRatio = completed.length / PROGRAM_TOTAL_DAYS;

  // Eine Routine aus dem Programm starten (mit Programm-Kontext).
  function startDay(day: number, routineId: string) {
    navigation.navigate('Player', {
      routineId,
      programId: starterProgram.id,
      day,
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Kopf: Zurück + Titel */}
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>{starterProgram.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Fortschritts-Karte */}
        <View style={styles.progressCard}>
          <Text style={styles.progressSubtitle}>{starterProgram.subtitle}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressRatio * 100}%` }]}
            />
          </View>
          {programDone ? (
            <Text style={styles.progressDone}>Programm abgeschlossen</Text>
          ) : (
            <Text style={styles.progressText}>
              {completed.length} / {PROGRAM_TOTAL_DAYS} Tage
            </Text>
          )}
        </View>

        {/* Die 7 Tage */}
        <View style={styles.dayList}>
          {starterProgram.days.map((d) => {
            const info = getProgramRoutineInfo(d.routineId);
            const status =
              d.day < active ? 'done' : d.day === active ? 'today' : 'locked';
            const tappable = status === 'done' || status === 'today';

            return (
              <Pressable
                key={d.day}
                disabled={!tappable}
                onPress={() => startDay(d.day, d.routineId)}
                style={[
                  styles.dayCard,
                  status === 'today' && styles.dayCardToday,
                  status === 'locked' && styles.dayCardLocked,
                ]}
              >
                {/* Status-Kreis links */}
                <View
                  style={[
                    styles.dayCircle,
                    status === 'locked'
                      ? styles.dayCircleLocked
                      : styles.dayCircleFilled,
                  ]}
                >
                  {status === 'done' ? (
                    <Ionicons name="checkmark" size={18} color={colors.card} />
                  ) : (
                    <Text
                      style={[
                        styles.dayCircleNumber,
                        status === 'locked' && styles.dayCircleNumberLocked,
                      ]}
                    >
                      {d.day}
                    </Text>
                  )}
                </View>

                {/* Mitte: Titel + Meta */}
                <View style={styles.dayTextWrap}>
                  <Text style={styles.dayTitle}>{info.title}</Text>
                  <Text style={styles.dayMeta}>
                    Tag {d.day} · {info.durationMinutes} Min
                  </Text>
                </View>

                {/* Rechts: Status-Element */}
                {status === 'today' && (
                  <View style={styles.todayPill}>
                    <Text style={styles.todayPillText}>Heute</Text>
                  </View>
                )}
                {status === 'locked' && (
                  <Ionicons
                    name="lock-closed"
                    size={18}
                    color={colors.textMuted}
                  />
                )}
                {status === 'done' && (
                  <Ionicons
                    name="refresh"
                    size={18}
                    color={colors.textMuted}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },

  // Fortschritts-Karte
  progressCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  progressSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accentButton,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent,
  },
  progressDone: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent,
  },

  // Tages-Liste
  dayList: {
    gap: 12,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  dayCardToday: {
    borderColor: colors.accentButton,
    backgroundColor: colors.softTeal,
  },
  dayCardLocked: {
    opacity: 0.6,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleFilled: {
    backgroundColor: colors.accentButton,
  },
  dayCircleLocked: {
    borderWidth: 1.5,
    borderColor: colors.textMuted,
  },
  dayCircleNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
  },
  dayCircleNumberLocked: {
    color: colors.textMuted,
  },
  dayTextWrap: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  dayMeta: {
    fontSize: 13,
    color: colors.textMuted,
  },
  todayPill: {
    backgroundColor: colors.warmBg,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  todayPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warmText,
  },
});
