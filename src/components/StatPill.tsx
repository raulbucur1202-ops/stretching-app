import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

export default function StatPill({label,value}:{label:string,value:string}){
  return (
    <View style={styles.pill}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pill:{backgroundColor:tokens.colors.surfaceMint,paddingHorizontal:14,height:40,borderRadius:20,justifyContent:'center',alignItems:'center'},
  value:{fontSize:16,fontWeight:'700',color:tokens.colors.textPrimary},
  label:{fontSize:12,color:tokens.colors.textSecondary}
});
