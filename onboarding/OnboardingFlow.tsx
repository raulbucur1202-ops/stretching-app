// onboarding/OnboardingFlow.tsx
// Der sichtbare Onboarding-Ablauf beim ersten App-Start.
//
// WICHTIG: Dieser Schritt baut NUR den sichtbaren Ablauf:
//   - 6 Frage-Screens mit Einfach-Auswahl
//   - Zurück-Pfeil + Fortschrittsanzeige + Weiter-Button
//   - Abschluss-Screen mit Disclaimer + Checkbox
// Es wird NOCH NICHTS gespeichert, kein Konto angebunden und es gibt noch
// KEINE echte Weiterleitung zum Home-Screen. Das folgt im nächsten Schritt.

import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { questions, MEDICAL_FLAG_OPTION } from './questions';
import { useOnboarding } from './OnboardingContext';
import { saveProfile, UserProfile } from '../storage/profile';

const DISCLAIMER_TEXT =
  'MOVA unterstützt Beweglichkeit, Flexibilität und allgemeines Wohlbefinden. ' +
  'Die App ersetzt keine medizinische Diagnose, Physiotherapie oder ärztliche ' +
  'Behandlung. Bei starken, stechenden, zunehmenden oder ausstrahlenden ' +
  'Schmerzen, Taubheitsgefühl, frischen Verletzungen, nach Operationen oder bei ' +
  'medizinischen Erkrankungen hole bitte vor dem Training ärztlichen Rat ein. ' +
  'Höre auf deinen Körper und beende eine Übung bei Schmerzen.';

export default function OnboardingFlow() {
  // Welcher Schritt ist sichtbar? 0..5 = die 6 Fragen, 6 = Abschluss-Screen.
  const [step, setStep] = useState(0);

  // Gewählte Antwort je Frage (null = noch nichts gewählt).
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );

  // Häkchen auf dem Abschluss-Screen.
  const [acknowledged, setAcknowledged] = useState(false);

  // "Schalter", um nach dem Speichern zur normalen App zu wechseln.
  const { completeOnboarding } = useOnboarding();

  const isFinish = step === questions.length;
  const totalSteps = questions.length; // 6

  // Eine Option für die aktuelle Frage wählen.
  function selectOption(option: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = option;
      return next;
    });
  }

  function goNext() {
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  // Abschluss: die 6 Antworten zu einem Profil bündeln, lokal speichern und
  // danach zur normalen App wechseln.
  async function finishOnboarding() {
    const profile: UserProfile = {
      userType: answers[0] ?? '',
      bodyArea: answers[1] ?? '',
      goal: answers[2] ?? '',
      duration: answers[3] ?? '',
      level: answers[4] ?? '',
      safety: answers[5] ?? '',
    };
    try {
      await saveProfile(profile);
      completeOnboarding();
    } catch (e) {
      Alert.alert(
        'Speichern fehlgeschlagen',
        'Bitte versuche es noch einmal.'
      );
    }
  }

  // ---------- ABSCHLUSS-SCREEN ----------
  if (isFinish) {
    const showMedicalWarning = answers[5] === MEDICAL_FLAG_OPTION;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />

        {/* Kopf: Zurück-Pfeil + voller Fortschrittsbalken */}
        <View style={styles.topBar}>
          <Pressable onPress={goBack} hitSlop={10} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <ProgressBar current={totalSteps} total={totalSteps} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Bevor wir starten</Text>

          {/* Freundliche Hinweis-Box – nur wenn medizinischer Hinweis gewählt wurde */}
          {showMedicalWarning && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                Bitte sprich vor dem Training mit einer Ärztin oder einem Arzt.
                Du kannst die App trotzdem ansehen.
              </Text>
            </View>
          )}

          {/* Ruhige Karte mit Disclaimer */}
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerText}>{DISCLAIMER_TEXT}</Text>
          </View>

          {/* Checkbox-Zeile */}
          <Pressable
            style={styles.checkRow}
            onPress={() => setAcknowledged((v) => !v)}
          >
            <View
              style={[styles.checkbox, acknowledged && styles.checkboxChecked]}
            >
              {acknowledged && (
                <Ionicons name="checkmark" size={16} color={colors.card} />
              )}
            </View>
            <Text style={styles.checkLabel}>
              Ich habe den Hinweis gelesen und verstanden.
            </Text>
          </Pressable>
        </ScrollView>

        {/* Fuß: "Los geht's" – erst aktiv, wenn das Häkchen gesetzt ist */}
        <View style={styles.footer}>
          <PrimaryButton
            label="Los geht's"
            disabled={!acknowledged}
            // Speichert das Profil und wechselt danach zur normalen App.
            onPress={finishOnboarding}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ---------- FRAGE-SCREENS ----------
  const q = questions[step];
  const selected = answers[step];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Kopf: Zurück-Pfeil (außer beim ersten Schritt) + Fortschrittsbalken */}
      <View style={styles.topBar}>
        {step > 0 ? (
          <Pressable onPress={goBack} hitSlop={10} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
        ) : (
          // Platzhalter, damit der Fortschrittsbalken gleich ausgerichtet bleibt
          <View style={styles.backButton} />
        )}
        <ProgressBar current={step + 1} total={totalSteps} />
      </View>

      <Text style={styles.stepText}>
        Schritt {step + 1} von {totalSteps}
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>{q.heading}</Text>
        {q.subtitle && <Text style={styles.subtitle}>{q.subtitle}</Text>}
        {q.question && <Text style={styles.questionText}>{q.question}</Text>}

        {/* Antwort-Optionen als große Auswahl-Pills (Einfach-Auswahl) */}
        <View style={styles.optionList}>
          {q.options.map((option) => {
            const isSelected = selected === option;
            return (
              <Pressable
                key={option}
                onPress={() => selectOption(option)}
                style={[styles.optionPill, isSelected && styles.optionPillSelected]}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={colors.accent}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Fuß: Weiter – ausgegraut solange nichts gewählt ist */}
      <View style={styles.footer}>
        <PrimaryButton label="Weiter" disabled={!selected} onPress={goNext} />
      </View>
    </SafeAreaView>
  );
}

// ---------- Kleine wiederverwendbare Bausteine ----------

// Dünne Fortschritts-Leiste in accent.
function ProgressBar({ current, total }: { current: number; total: number }) {
  const ratio = Math.min(1, current / total);
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${ratio * 100}%` }]} />
    </View>
  );
}

// Großer Haupt-Button (accentButton). Ausgegraut, wenn disabled.
function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
    >
      <Text
        style={[
          styles.primaryButtonText,
          disabled && styles.primaryButtonTextDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Kopfbereich
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 4,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  stepText: {
    fontSize: 13,
    color: colors.textMuted,
    paddingHorizontal: 20,
    marginTop: 12,
  },

  // Inhalt
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    lineHeight: 33,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 23,
    marginBottom: 8,
  },

  // Optionen
  optionList: {
    marginTop: 16,
    gap: 12,
  },
  optionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  optionPillSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.softTeal,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Fuß-Button
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  primaryButton: {
    backgroundColor: colors.accentButton,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: colors.border,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  primaryButtonTextDisabled: {
    color: colors.textMuted,
  },

  // Abschluss-Screen
  warningBox: {
    backgroundColor: colors.warmBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.warmText,
  },
  disclaimerCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accentButton,
    borderColor: colors.accentButton,
  },
  checkLabel: {
    fontSize: 15,
    color: colors.textPrimary,
    flexShrink: 1,
  },
});
