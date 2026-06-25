// screens/LibraryScreen.tsx
// Bibliothek – einfach: Suche + eine Kategorie-Chip-Reihe + sofort sichtbare Liste.
// Premium-Logik unverändert: gesperrte Routinen -> Paywall.

import React, { useCallback, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { colors, radius, shadowSoft } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { allRoutines, routineDurationMinutes } from '../data/routines';
import { isPremium } from '../storage/profile';

const CATEGORIES = ['Alle', 'Mobility', 'Dehnen', 'Aktivierung', 'Entspannung'] as const;
type Category = (typeof CATEGORIES)[number];

export default function LibraryScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Alle');
  const [userIsPremium, setUserIsPremium] = useState(false);

  useFocusEffect(
    useCallback(() => {
      isPremium().then(setUserIsPremium);
    }, [])
  );

  // Live-Filter: Kategorie UND Suchtext (Titel oder Körperregion).
  const q = query.trim().toLowerCase();
  const visibleRoutines = allRoutines.filter((r) => {
    const categoryOk = category === 'Alle' || r.category === category;
    const searchOk =
      q === '' ||
      r.title.toLowerCase().includes(q) ||
      r.bodyArea.toLowerCase().includes(q);
    return categoryOk && searchOk;
  });

  // Tap öffnet immer den Detail-Screen; der Start dort prüft Premium.
  function openRoutine(routineId: string) {
    navigation.navigate('RoutineDetail', { routineId });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Bibliothek</Text>

        {/* Suchleiste */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Routine oder Bereich suchen"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Kategorie-Chips (horizontal) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipRow}
        >
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(c)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Liste */}
        {visibleRoutines.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Keine Routine gefunden.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {visibleRoutines.map((routine) => {
              const locked = routine.premium && !userIsPremium;
              return (
                <Pressable
                  key={routine.id}
                  style={styles.card}
                  onPress={() => openRoutine(routine.id)}
                >
                  {/* Thumbnail-Platzhalter */}
                  <View style={styles.thumb}>
                    <Ionicons name="body-outline" size={26} color={colors.accent} />
                  </View>

                  {/* Text */}
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {routine.title}
                    </Text>
                    <Text style={styles.cardMeta}>
                      {routineDurationMinutes(routine)} Min · {routine.level}
                    </Text>
                  </View>

                  {/* Label rechts oben */}
                  <View
                    style={[
                      styles.tag,
                      locked ? styles.tagPremium : styles.tagFree,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        locked ? styles.tagTextPremium : styles.tagTextFree,
                      ]}
                    >
                      {locked ? 'Premium' : 'Frei'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
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
  heading: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 18,
  },

  // Suche
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    ...shadowSoft,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    padding: 0,
  },

  // Chips
  chipScroll: {
    marginBottom: 22,
  },
  chipRow: {
    gap: 10,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  chipActive: {
    backgroundColor: colors.charcoal,
  },
  chipText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },

  // Liste
  list: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 14,
    ...shadowSoft,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.lg - 6,
    backgroundColor: colors.mintSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  tag: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagFree: {
    backgroundColor: colors.softTeal,
  },
  tagPremium: {
    backgroundColor: colors.warmBg,
  },
  tagText: {
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  tagTextFree: {
    color: colors.accent,
  },
  tagTextPremium: {
    color: colors.warmText,
  },

  // Leer
  emptyBox: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 24,
    ...shadowSoft,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
