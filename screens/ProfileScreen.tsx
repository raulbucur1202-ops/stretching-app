// screens/ProfileScreen.tsx
// Profil-Tab: Level-Auswahl (wird sofort gespeichert) + Test-Hilfen.

import React, { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useOnboarding } from '../onboarding/OnboardingContext';
import { clearSessions } from '../storage/sessions';
import {
  loadProfile,
  saveProfile,
  UserProfile,
  isPremium,
  setPremium,
} from '../storage/profile';
import { clearProgramProgress } from '../data/programProgress';

// Die drei einheitlichen Level.
const LEVELS = ['Anfänger', 'Fortgeschritten', 'Profi'] as const;

export default function ProfileScreen() {
  const { resetOnboarding } = useOnboarding();
  const [level, setLevel] = useState<string>('');
  const [premium, setPremiumState] = useState(false);

  // Aktuelles Level und Premium-Status bei jedem Fokus laden.
  useFocusEffect(
    useCallback(() => {
      loadProfile().then((p) => setLevel(p?.level ?? ''));
      isPremium().then(setPremiumState);
    }, [])
  );

  // Premium zum Testen umschalten.
  async function togglePremium() {
    const next = !premium;
    await setPremium(next);
    setPremiumState(next);
  }

  // Level antippen -> sofort im Profil speichern (bleibt nach Neustart erhalten).
  async function selectLevel(value: string) {
    const existing = await loadProfile();
    // Falls (unerwartet) noch kein Profil da ist, ein minimales anlegen.
    const base: UserProfile = existing ?? {
      userType: '',
      bodyArea: '',
      goal: '',
      duration: '',
      level: '',
      safety: '',
    };
    await saveProfile({ ...base, level: value });
    setLevel(value);
  }

  function confirmResetProgress() {
    Alert.alert(
      'Fortschritt zurücksetzen?',
      'Alle abgeschlossenen Routinen werden gelöscht (Streak & Wochen-Punkte).',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Zurücksetzen',
          style: 'destructive',
          onPress: async () => {
            await clearSessions();
            await clearProgramProgress();
            Alert.alert('Fortschritt zurückgesetzt');
          },
        },
      ]
    );
  }

  function confirmReset() {
    Alert.alert(
      'Onboarding zurücksetzen?',
      'Dein gespeichertes Profil wird gelöscht und das Onboarding startet erneut.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Zurücksetzen',
          style: 'destructive',
          onPress: () => resetOnboarding(),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profil</Text>

        {/* Level-Auswahl */}
        <Text style={styles.sectionTitle}>Dein Level</Text>
        <View style={styles.levelRow}>
          {LEVELS.map((l) => {
            const active = l === level;
            return (
              <Pressable
                key={l}
                onPress={() => selectLevel(l)}
                style={[styles.levelPill, active && styles.levelPillActive]}
              >
                <Text
                  style={[
                    styles.levelText,
                    active && styles.levelTextActive,
                  ]}
                >
                  {l}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Premium-Status (zum Testen umschaltbar) */}
        <Text style={styles.sectionTitle}>Premium</Text>
        <View style={styles.premiumCard}>
          <Text style={styles.premiumStatus}>
            {premium ? 'Premium aktiv' : 'Kostenlos'}
          </Text>
          <Pressable style={styles.premiumToggle} onPress={togglePremium}>
            <Text style={styles.premiumToggleText}>
              {premium ? 'Premium deaktivieren' : 'Premium aktivieren'}
            </Text>
          </Pressable>
        </View>

        {/* Test-Hilfen */}
        <Text style={styles.sectionTitle}>Zum Testen</Text>
        <Pressable style={styles.resetButton} onPress={confirmResetProgress}>
          <Text style={styles.resetButtonText}>Fortschritt zurücksetzen</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={confirmReset}>
          <Text style={styles.resetButtonText}>Onboarding zurücksetzen</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 14,
    marginTop: 8,
  },

  // Level-Pills
  levelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  levelPill: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 18,
  },
  levelPillActive: {
    backgroundColor: colors.softTeal,
    borderColor: colors.accent,
  },
  levelText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  levelTextActive: {
    color: colors.accent,
    fontFamily: fonts.bold,
  },

  // Premium
  premiumCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  premiumStatus: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  premiumToggle: {
    backgroundColor: colors.softTeal,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  premiumToggleText: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: colors.accent,
  },

  // Reset-Buttons
  resetButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginBottom: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.accent,
  },
});
