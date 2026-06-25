// RoutineCard.tsx — MOVA (Expo / React Native)
// Benötigt: expo-linear-gradient  ->  npx expo install expo-linear-gradient
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radii, type, elevation, gradients } from "@/theme/tokens";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  meta?: string;            // z.B. "8 Min · Anfänger · Nacken"
  onStart?: () => void;
  onPress?: () => void;     // Tap auf die ganze Card (z.B. -> Routine Detail)
};

export function RoutineCard({
  badge = "Für dich empfohlen",
  title,
  subtitle,
  meta,
  onStart,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (to: number, duration: number) =>
    Animated.timing(scale, { toValue: to, duration, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title} – Routine starten`}
        onPress={onPress}
        onPressIn={() => animateTo(0.98, 120)}
        onPressOut={() => animateTo(1, 160)}
      >
        <View style={styles.card}>
          {/* Mint-Deko-Kreis */}
          <View style={styles.decorCircle} pointerEvents="none" />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {!!meta && <Text style={styles.meta}>{meta}</Text>}

          {/* Gradient-CTA (pill) */}
          <Pressable
            onPress={onStart}
            accessibilityRole="button"
            accessibilityLabel="Routine starten"
            style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
          >
            <LinearGradient
              colors={gradients.ctaPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>▶  Routine starten</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: spacing.m,
    overflow: "hidden",
    ...elevation.soft,
  },
  decorCircle: {
    position: "absolute",
    top: -30,
    right: -26,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  badgeText: { ...type.caption, color: colors.accentText },
  title: { ...type.h2, marginTop: spacing.s + 4 },
  subtitle: { ...type.body, color: colors.muted, marginTop: 2 },
  meta: { ...type.caption, marginTop: 4 },
  cta: {
    marginTop: spacing.m,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaText: { ...type.body, fontFamily: type.h2.fontFamily, color: colors.white, fontSize: 16 },
});
