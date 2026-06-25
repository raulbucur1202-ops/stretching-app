// screens/HomeScreen.tsx
// MOVA – Home (soft, große Rundungen, weiche Schatten, viel Whitespace).

import React, { useCallback, useEffect, useState } from 'react';
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
import { colors, radius, shadowSoft } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { StatPill } from '../components/StatPill';
import { PrimaryButton } from '../components/PrimaryButton';
import { loadProfile } from '../storage/profile';
import { loadSessions } from '../storage/sessions';
import {
  currentStreak,
  weekDots,
  totalMinutes,
  sessionsThisWeek,
  weeklyGoal,
} from '../data/progress';
import { starterProgram } from '../data/programs';
import {
  getCompletedDays,
  activeDay,
  isProgramComplete,
  PROGRAM_TOTAL_DAYS,
} from '../data/programProgress';

const DEFAULT_CHIPS = ['Nacken', 'Schultern', 'Rücken', 'Hüfte'];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [chips, setChips] = useState<string[]>(DEFAULT_CHIPS);
  const [streak, setStreak] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [dots, setDots] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [programDays, setProgramDays] = useState<number[]>([]);

  const goal = weeklyGoal();

  useEffect(() => {
    loadProfile().then((profile) => {
      if (!profile) return;
      if (profile.bodyArea === 'Ganzkörper') {
        setChips(['Nacken', 'Schultern', 'Hüfte']);
      } else if (profile.bodyArea) {
        setChips([profile.bodyArea]);
      }
    });
  }, []);

  // Bei jedem Fokus echte Werte neu laden.
  useFocusEffect(
    useCallback(() => {
      loadSessions().then((sessions) => {
        setStreak(currentStreak(sessions));
        setDots(weekDots(sessions));
        setMinutes(totalMinutes(sessions));
        setWeekCount(sessionsThisWeek(sessions));
      });
      getCompletedDays().then(setProgramDays);
    }, [])
  );

  const programActive = activeDay(programDays);
  const programDone = isProgramComplete(programDays);
  const programRatio = programDays.length / PROGRAM_TOTAL_DAYS;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Begrüßung */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Guten Morgen</Text>
          <Text style={styles.name}>Raul</Text>
        </View>

        {/* 3 Statistik-Pills (neue Komponente) */}
        <View style={styles.statsRow}>
          <StatPill variant="dark" value={String(streak)} label="Streak" style={styles.statItem} />
          <StatPill variant="outline" value={String(minutes)} label="Min bewegt" style={styles.statItem} />
          <StatPill variant="mint" value={`${weekCount}/${goal}`} label="Woche" style={styles.statItem} />
        </View>

        {/* Wochen-Punkte */}
        <View style={styles.weekCard}>
          <Text style={styles.weekLabel}>Diese Woche</Text>
          <View style={styles.weekDots}>
            {dots.map((filled, i) => (
              <View
                key={i}
                style={[styles.weekDot, filled ? styles.weekDotFilled : styles.weekDotEmpty]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>Heutige Routine</Text>

        {/* Haupt-Karte: weiches Design, Bewegungs-Motiv, charcoal-Button */}
        <Pressable
          style={styles.mainCard}
          onPress={() =>
            navigation.navigate('RoutineDetail', { routineId: 'morgen-mobility' })
          }
        >
          <View style={styles.decoCircleBig} />
          <View style={styles.decoCircleSmall} />

          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>Für dich empfohlen</Text>
          </View>

          <Text style={styles.cardTitle}>Morgen-Mobility</Text>
          <Text style={styles.cardSubtitle}>
            Sanft beweglich in den Tag starten
          </Text>
          <Text style={styles.cardMeta}>8 Min · Anfänger · Nacken</Text>

          <PrimaryButton
            title="Routine starten"
            onPress={() =>
              navigation.navigate('RoutineDetail', { routineId: 'morgen-mobility' })
            }
          />
        </Pressable>

        {/* Dein Programm (mint, weich) */}
        <Pressable
          style={styles.programCard}
          onPress={() => navigation.navigate('ProgramDetail')}
        >
          <View style={styles.programHeader}>
            <Text style={styles.programTitle}>{starterProgram.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </View>
          <View style={styles.programTrack}>
            <View
              style={[styles.programFill, { width: `${programRatio * 100}%` }]}
            />
          </View>
          <Text style={styles.programMeta}>
            {programDone
              ? 'Abgeschlossen'
              : `Tag ${programActive} von ${PROGRAM_TOTAL_DAYS}`}
          </Text>
        </Pressable>

        {/* Steifheits-Chips */}
        <Text style={styles.blockTitle}>Für deine Steifheit</Text>
        <View style={styles.chipWrap}>
          {chips.map((label) => (
            <View key={label} style={styles.chip}>
              <Text style={styles.chipText}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Abend-Entspannung */}
        <Pressable
          style={styles.softCard}
          onPress={() =>
            navigation.navigate('RoutineDetail', { routineId: 'abend-entspannung' })
          }
        >
          <View style={styles.softCardTextWrap}>
            <Text style={styles.softCardTitle}>Abend-Entspannung</Text>
            <Text style={styles.softCardSubtitle}>5 Min · zum Runterkommen</Text>
          </View>
          <Ionicons name="moon" size={26} color={colors.accent} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },

  // Begrüßung
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 30,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },

  // Statistik-Pills
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
  },
  statChip: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChipDark: {
    backgroundColor: colors.charcoal,
  },
  statChipOutline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statChipMint: {
    backgroundColor: colors.mintSurface,
  },
  statNumberLight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabelLight: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statNumberDark: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabelDark: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Wochen-Punkte
  weekCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 28,
    ...shadowSoft,
  },
  weekLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  weekDots: {
    flexDirection: 'row',
    gap: 7,
  },
  weekDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
  },
  weekDotFilled: {
    backgroundColor: colors.accentButton,
  },
  weekDotEmpty: {
    backgroundColor: '#D8D4CC',
  },

  // Label
  sectionLabel: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.accent,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // Haupt-Karte
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: 24,
    marginBottom: 32,
    overflow: 'hidden',
    ...shadowSoft,
  },
  decoCircleBig: {
    position: 'absolute',
    top: -45,
    right: -35,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: colors.softTeal,
  },
  decoCircleSmall: {
    position: 'absolute',
    top: -20,
    right: 60,
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: colors.background,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.warmBg,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
    marginBottom: 14,
  },
  tagPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warmText,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 10,
  },
  cardMeta: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 22,
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.charcoal,
    borderRadius: radius.lg,
    paddingVertical: 17,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Programm-Karte (mint)
  programCard: {
    backgroundColor: colors.mintSurface,
    borderRadius: radius.xl,
    padding: 22,
    marginBottom: 32,
    ...shadowSoft,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  programTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  programTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(31,41,51,0.12)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  programFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accentButton,
  },
  programMeta: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },

  // Chips
  blockTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 32,
  },
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 18,
    ...shadowSoft,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Abend-Karte
  softCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.softTeal,
    borderRadius: radius.xl,
    padding: 22,
  },
  softCardTextWrap: {
    flex: 1,
  },
  softCardTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  softCardSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
