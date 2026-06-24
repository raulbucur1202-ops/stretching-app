import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { tokens } from '../tokens';

export default function OnboardingScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Text style={styles.title}>Willkommen</Text>
      <Text style={{marginTop:12,color:tokens.colors.textSecondary}}>Wir fragen ein paar kurze Dinge, um deine Routinen zu personalisieren.</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:tokens.colors.background},
  title:{fontSize:tokens.type.h2,fontWeight:'700',color:tokens.colors.textPrimary}
});
