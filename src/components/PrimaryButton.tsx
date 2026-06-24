import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { tokens } from '../tokens';

export default function PrimaryButton({title,onPress}:{title:string,onPress:()=>void}){
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.9}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn:{height:56,backgroundColor:tokens.colors.btnPrimaryBg,alignItems:'center',justifyContent:'center',borderRadius:tokens.radius.lg,paddingHorizontal:24},
  text:{color:tokens.colors.btnPrimaryText,fontSize:tokens.type.button,fontWeight:'700'}
});
