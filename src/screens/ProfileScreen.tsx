import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { tokens } from '../tokens';
import Card from '../components/Card';

export default function ProfileScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Card>
        <Text style={{fontSize:tokens.type.h3,fontWeight:'700'}}>Dein Profil</Text>
        <Text style={{marginTop:8,color:tokens.colors.textSecondary}}>Mitglied seit Jan 2026</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:tokens.colors.background}
});
