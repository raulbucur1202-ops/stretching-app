// screens/PaywallScreen.tsx
// Einfache Paywall (Vollbild über den Tabs) – NOCH OHNE echte Bezahlung.
//
// TODO (später): Hier wird der echte In-App-Kauf eingebaut (z.B. RevenueCat).
// Aktuell schaltet "Premium freischalten" nur lokal das Premium-Flag um,
// damit wir die Free/Premium-Logik testen können.

import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { PrimaryButton } from '../components/PrimaryButton';
import { setPremium } from '../storage/profile';

const BENEFITS = [
  'Alle Routinen & Profi-Inhalte',
  'Sport- & Recovery-Routinen',
  'Weitere Programme (bald)',
  'Dein voller Fortschritt',
];

export default function PaywallScreen() {
  const navigation = useNavigation<any>();

  // Platzhalter-"Kauf": schaltet Premium lokal frei.
  // TODO: Später echten In-App-Kauf (z.B. RevenueCat) anstoßen und erst
  // nach erfolgreicher Transaktion setPremium(true) aufrufen.
  async function unlockPremium() {
    await setPremium(true);
    Alert.alert('Premium ist jetzt aktiv');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Schließen */}
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headline}>MOVA Premium</Text>
        <Text style={styles.subtitle}>
          Alles freischalten für freiere Bewegung.
        </Text>

        {/* Vorteils-Liste */}
        <View style={styles.benefits}>
          {BENEFITS.map((b) => (
            <View key={b} style={styles.benefitRow}>
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={colors.accent}
              />
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        {/* Plan-Karten (nur Anzeige, Platzhalter-Preise) */}
        <View style={styles.plansRow}>
          <View style={styles.planCard}>
            <Text style={styles.planName}>Monatlich</Text>
            <Text style={styles.planPrice}>4,99 €</Text>
          </View>
          <View style={[styles.planCard, styles.planCardHighlight]}>
            <View style={styles.popularPill}>
              <Text style={styles.popularPillText}>Beliebt</Text>
            </View>
            <Text style={styles.planName}>Jährlich</Text>
            <Text style={styles.planPrice}>29,99 €</Text>
          </View>
        </View>

        {/* Freischalt-Button */}
        <PrimaryButton
          title="Premium freischalten"
          onPress={unlockPremium}
          style={styles.unlockButton}
        />

        {/* Platzhalter-Links (noch ohne Funktion) */}
        <View style={styles.linksRow}>
          <Text style={styles.linkText}>Kauf wiederherstellen</Text>
          <Text style={styles.linkDot}>·</Text>
          <Text style={styles.linkText}>AGB</Text>
          <Text style={styles.linkDot}>·</Text>
          <Text style={styles.linkText}>Datenschutz</Text>
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
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  headline: {
    fontSize: 30,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginBottom: 28,
  },

  // Vorteile
  benefits: {
    gap: 14,
    marginBottom: 28,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    flexShrink: 1,
  },

  // Pläne
  plansRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  planCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  planCardHighlight: {
    borderColor: colors.accentButton,
    borderWidth: 2,
  },
  popularPill: {
    position: 'absolute',
    top: -11,
    backgroundColor: colors.accentButton,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  popularPillText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.card,
  },
  planName: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },

  // Button
  unlockButton: {
    marginBottom: 18,
  },

  // Links
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textMuted,
  },
  linkDot: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textMuted,
  },
});
