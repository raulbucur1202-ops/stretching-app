import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { tokens } from '../tokens';
import Card from '../components/Card';
import ExerciseRow from '../components/ExerciseRow';
import PrimaryButton from '../components/PrimaryButton';

export default function RoutineDetailScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding,paddingBottom:120}}>
      <Card style={{height:tokens.sizes.previewHeight,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:tokens.colors.textMuted}}>GIF Preview</Text>
      </Card>

      <View style={{height:12}} />
      <Text style={styles.title}>Nacken & Schultern</Text>
      <Text style={styles.subtitle}>Lockernd • 10 Min • Anfänger</Text>

      <View style={{height:12}} />
      <Card>
        <Text style={{fontWeight:'700'}}>Was es bewirkt</Text>
        <Text style={{marginTop:8,color:tokens.colors.textSecondary}}>Löst Verspannungen, verbessert Haltung</Text>
      </Card>

      <View style={{height:12}} />
      <Card>
        <Text style={{fontWeight:'700'}}>Übungen</Text>
        <View style={{height:8}} />
        <ExerciseRow title="Nackenrolle" duration="30s" level="Beginner"/>
        <ExerciseRow title="Schulterkreisen" duration="40s" level="Beginner"/>
        <ExerciseRow title="Brustöffnung" duration="50s" level="Intermediate"/>
      </Card>

      <View style={{height:20}} />
      <PrimaryButton title="Start" onPress={()=>{}} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{backgroundColor:tokens.colors.background,flex:1},
  title:{fontSize:tokens.type.h3,color:tokens.colors.textPrimary,fontWeight:'700'},
  subtitle:{fontSize:tokens.type.bodySmall,color:tokens.colors.textSecondary,marginTop:6}
});
