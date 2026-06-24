import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { tokens } from '../tokens';

export default function ProgressRing({size=120,progress=0.5}:{size?:number,progress?:number}){
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <View style={{width:size,height:size}}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size/2} cy={size/2} r={radius} stroke={tokens.colors.surfaceMuted} strokeWidth={stroke} fill="none" />
        <Circle cx={size/2} cy={size/2} r={radius} stroke={tokens.colors.accentPrimary} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${dash}, ${circumference - dash}`} transform={`rotate(-90 ${size/2} ${size/2})`} fill="none" />
      </Svg>
    </View>
  )
}
