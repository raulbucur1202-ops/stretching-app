// components/StatPill.tsx
// Kleine Statistik-Pille (Wert + Label), auf MOVA-Tokens umgestellt.
// Varianten: 'mint' (Standard), 'dark', 'outline'.

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Variant = 'mint' | 'dark' | 'outline';

export function StatPill({
  label,
  value,
  variant = 'mint',
  style,
}: {
  label: string;
  value: string;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}) {
  const dark = variant === 'dark';
  return (
    <View
      style={[
        styles.pill,
        variant === 'mint' && styles.mint,
        variant === 'dark' && styles.dark,
        variant === 'outline' && styles.outline,
        style,
      ]}
    >
      <Text style={[styles.value, dark && styles.valueLight]}>{value}</Text>
      <Text style={[styles.label, dark && styles.labelLight]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mint: { backgroundColor: colors.mintSurface },
  dark: { backgroundColor: colors.charcoal },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: { fontSize: 18, fontFamily: fonts.bold, color: colors.textPrimary },
  valueLight: { color: '#FFFFFF' },
  label: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginTop: 2,
  },
  labelLight: { color: 'rgba(255,255,255,0.7)' },
});
