import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { tokens } from '../tokens';
import Card from '../components/Card';

export default function ProgressScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Text style={styles.title}>Fortschritt</Text>
      <View style={{height:16}} />
      <Card style={{alignItems:'center',padding:24}}>
        <Text style={{fontSize:tokens.type.h3,fontWeight:'700'}}>Wochenziel</Text>
        <View style={{height:12}} />
        <Text style={{color:tokens.colors.textSecondary}}>3 / 5 Sessions</Text>
      </Card>

      <View style={{height:12}} />
      <Card>
        <Text style={{fontWeight:'700'}}>Monat</Text>
        <Text style={{marginTop:8,color:tokens.colors.textSecondary}}>Diagramm (Platzhalter)</Text>
      </Card>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:tokens.colors.background},
  title:{fontSize:tokens.type.h2,fontWeight:'700',color:tokens.colors.textPrimary}
});
