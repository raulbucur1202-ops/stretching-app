import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

export default function ExerciseRow({title,duration,level}:{title:string,duration:string,level?:string}){
  return (
    <View style={styles.row}>
      <View style={styles.left} />
      <View style={{flex:1}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{duration} • {level}</Text>
      </View>
      <View style={{width:12}} />
    </View>
  )
}

const styles = StyleSheet.create({
  row:{height:72,backgroundColor:tokens.colors.surface,borderRadius:tokens.radius.md,flexDirection:'row',alignItems:'center',padding:12,marginTop:10},
  left:{width:60,height:48,backgroundColor:tokens.colors.surfaceMint,borderRadius:12,marginRight:12},
  title:{fontSize:16,fontWeight:'700',color:tokens.colors.textPrimary},
  meta:{fontSize:12,color:tokens.colors.textSecondary,marginTop:6}
});
