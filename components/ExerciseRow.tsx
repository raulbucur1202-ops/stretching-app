// components/ExerciseRow.tsx
// Zeile für eine Übung (Thumbnail + Titel + Meta), auf MOVA-Tokens umgestellt.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/fonts';

export function ExerciseRow({
  title,
  duration,
  level,
}: {
  title: string;
  duration: string;
  level?: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {!!(duration || level) && (
          <Text style={styles.meta}>
            {duration}
            {level ? ` · ${level}` : ''}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
  },
  left: {
    width: 60,
    height: 48,
    backgroundColor: colors.mintSurface,
    borderRadius: 12,
    marginRight: 12,
  },
  title: { fontSize: 16, fontFamily: fonts.bold, color: colors.textPrimary },
  meta: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
