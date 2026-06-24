import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { tokens } from '../tokens';
import StatPill from '../components/StatPill';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import ProgressRing from '../components/ProgressRing';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(){
  const nav = useNavigation();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Text style={styles.greeting}>Guten Morgen, Lea</Text>
      <View style={{flexDirection:'row',marginTop:12}}>
        <StatPill label="Streak" value="7" />
        <View style={{width:12}}/>
        <StatPill label="Minuten" value="24" />
        <View style={{width:12}}/>
        <StatPill label="Woche" value="3/5" />
      </View>

      <Card style={{marginTop:20}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flex:1}}>
            <Text style={styles.cardTitle}>Heutige Routine</Text>
            <Text style={styles.cardSubtitle}>Kurz: Nacken & Schultern — 10 Min</Text>
            <View style={{height:16}}/>
            <PrimaryButton title="Start" onPress={()=>nav.navigate('Progress' as any)} />
          </View>
          <ProgressRing size={120} progress={0.25} />
        </View>
      </Card>

      <Card style={{marginTop:16, backgroundColor:tokens.colors.surfaceMint}}>
        <Text style={styles.cardTitle}>7‑Tage Starter‑Programm</Text>
        <Text style={styles.cardSubtitle}>Tag 3 — 12 Min • Mobilität Fokus</Text>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{backgroundColor:tokens.colors.background,flex:1},
  greeting:{fontSize:tokens.type.h1,color:tokens.colors.textPrimary,fontFamily:tokens.type.family,fontWeight:'700'},
  cardTitle:{fontSize:tokens.type.h3,color:tokens.colors.textPrimary,fontWeight:'700'},
  cardSubtitle:{fontSize:tokens.type.bodySmall,color:tokens.colors.textSecondary,marginTop:6}
});
