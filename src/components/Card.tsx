import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

export default function Card({children,style}:{children:any,style?:any}){
  return (
    <View style={[styles.card,style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card:{backgroundColor:tokens.colors.surface,borderRadius:tokens.radius.lg,padding:tokens.spacing.xl, ...tokens.shadow.level2}
});
