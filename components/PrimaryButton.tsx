// components/PrimaryButton.tsx
// Großer dunkler Haupt-Button (auf MOVA-Tokens umgestellt).

import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/fonts';

export function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    backgroundColor: colors.btnPrimaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xl,
    paddingHorizontal: 24,
  },
  btnDisabled: {
    backgroundColor: colors.disabled,
  },
  btnPressed: {
    opacity: 0.9,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
