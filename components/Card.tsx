// components/Card.tsx
// Weiche Oberflächen-Karte (neues Design-Paket, auf MOVA-Tokens umgestellt).

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, shadow } from '../theme/colors';

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 24,
    ...shadow.level2,
  },
});
