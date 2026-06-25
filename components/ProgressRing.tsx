// components/ProgressRing.tsx
// Fortschritts-Ring mit react-native-svg, auf MOVA-Tokens umgestellt.

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

export function ProgressRing({
  size = 120,
  progress = 0.5,
  stroke = 12,
}: {
  size?: number;
  progress?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const dash = circumference * clamped;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.surfaceMuted}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accentPrimary}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash}, ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
        />
      </Svg>
    </View>
  );
}
