// screens/RoutineDetailScreen.tsx
// Detailseite einer Routine (öffnet im Stack, über den Tabs).
// Liest die Routine DYNAMISCH aus data/routines.ts über getRoutineById –
// neue Routinen erscheinen hier automatisch, ohne Code-Änderung.

import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { colors, radius, shadowSoft } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { PrimaryButton } from '../components/PrimaryButton';
import {
  getRoutineById,
  routineDurationMinutes,
  canPlayRoutine,
} from '../data/routines';
import { isPremium } from '../storage/profile';

export default function RoutineDetailScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const routineId: string = route.params?.routineId;
  const routine = getRoutineById(routineId);

  const [userIsPremium, setUserIsPremium] = useState(false);
  useFocusEffect(
    useCallback(() => {
      isPremium().then(setUserIsPremium);
    }, [])
  );

  // Falls die id mal nicht passt: sauberer Rückfall.
  if (!routine) {
    return (
      <View style={[styles.safe, { paddingTop: insets.top + 40, paddingHorizontal: 20 }]}>
        <Text style={styles.title}>Routine nicht gefunden</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.startButton}>
          <Text style={styles.startButtonText}>Zurück</Text>
        </Pressable>
      </View>
    );
  }

  const minutes = routineDurationMinutes(routine);
  const locked = routine.premium && !userIsPremium;

  // "Routine starten": gesperrt -> Paywall, sonst Player.
  function onStart() {
    const allowed = canPlayRoutine({
      premium: routine!.premium,
      userIsPremium,
      fromProgram: false,
    });
    navigation.navigate(
      allowed ? 'Player' : 'Paywall',
      allowed ? { routineId: routine!.id } : undefined
    );
  }

  return (
    <View style={[styles.safe, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Zurück */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>

        {/* GIF/Vorschau */}
        <View style={styles.hero}>
          {routine.exercises[0]?.gif ? (
            <Image
              source={{ uri: routine.exercises[0].gif }}
              style={styles.heroImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <Ionicons name="sync" size={40} color={colors.accent} />
              <Text style={styles.heroPlaceholderText}>Vorschau folgt</Text>
            </View>
          )}
        </View>

        {/* Titel + Untertitel */}
        <Text style={styles.title}>{routine.title}</Text>
        <Text style={styles.subtitle}>{routine.subtitle}</Text>

        {/* Meta-Pills */}
        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>{minutes} Min</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>{routine.level}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>{routine.bodyArea}</Text>
          </View>
        </View>

        {/* Was es bewirkt */}
        <Text style={styles.sectionTitle}>Was es bewirkt</Text>
        <Text style={styles.body}>{routine.description}</Text>

        {/* Beteiligte Muskeln */}
        <Text style={styles.sectionTitle}>Beteiligte Muskeln</Text>
        <View style={styles.chipWrap}>
          {routine.targetMuscles.map((m) => (
            <View key={m} style={styles.musclePill}>
              <Text style={styles.musclePillText}>{m}</Text>
            </View>
          ))}
        </View>

        {/* Mechanik-Tipp (nur wenn vorhanden) */}
        {routine.scienceNote ? (
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Mechanik-Tipp</Text>
            <Text style={styles.tipText}>{routine.scienceNote}</Text>
          </View>
        ) : null}

        {/* Übungen */}
        <Text style={styles.sectionTitle}>
          Übungen · {routine.exercises.length}
        </Text>
        <View style={styles.exerciseList}>
          {routine.exercises.map((ex, i) => (
            <View key={i} style={styles.exerciseRow}>
              <View style={styles.exerciseIndex}>
                <Text style={styles.exerciseIndexText}>{i + 1}</Text>
              </View>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseDuration}>{ex.durationSeconds}s</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixer Start-Button unten */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton
          title={locked ? 'Mit Premium freischalten' : 'Routine starten'}
          onPress={onStart}
        />
      </View>
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
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...shadowSoft,
  },

  // Hero
  hero: {
    width: '100%',
    height: 230,
    borderRadius: radius.xl,
    backgroundColor: colors.mintSurface,
    overflow: 'hidden',
    marginBottom: 20,
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
    color: colors.textMuted,
  },

  // Titel
  title: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginBottom: 14,
  },

  // Meta
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  metaPill: {
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 14,
    ...shadowSoft,
  },
  metaPillText: {
    fontSize: 13,
    fontFamily: fonts.semibold,
    color: colors.textPrimary,
  },

  // Abschnitte
  sectionTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 10,
    marginTop: 4,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    marginBottom: 24,
  },

  // Muskeln
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  musclePill: {
    backgroundColor: colors.softTeal,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  musclePillText: {
    fontSize: 13,
    fontFamily: fonts.semibold,
    color: colors.accent,
  },

  // Tipp-Karte
  tipCard: {
    backgroundColor: colors.mintSurface,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 24,
    ...shadowSoft,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },

  // Übungen
  exerciseList: {
    gap: 10,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...shadowSoft,
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.mintSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseIndexText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.accent,
  },
  exerciseName: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.textPrimary,
  },
  exerciseDuration: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  startButton: {
    backgroundColor: colors.charcoal,
    borderRadius: radius.lg,
    paddingVertical: 17,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
