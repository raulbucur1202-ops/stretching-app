import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { tokens } from '../tokens';
import Card from '../components/Card';
import ExerciseRow from '../components/ExerciseRow';

const MOCK = new Array(8).fill(0).map((_,i)=>({id:i,title:`Routine ${i+1}`,duration:5+(i*2),level: i%3===0? 'Beginner': i%3===1? 'Intermediate':'Advanced'}))

export default function LibraryScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Text style={styles.title}>Bibliothek</Text>
      <TextInput placeholder="Suche" style={styles.search} />
      <View style={{height:12}} />
      <View style={{flexDirection:'row',gap:8}}>
        <Card style={{paddingHorizontal:12,paddingVertical:6,borderRadius:tokens.radius.md}}>
          <Text style={{color:tokens.colors.accentPrimary}}>Alle</Text>
        </Card>
        <Card style={{paddingHorizontal:12,paddingVertical:6,borderRadius:tokens.radius.md}}>
          <Text>Nacken</Text>
        </Card>
      </View>

      <View style={{height:12}} />
      {MOCK.map(r=> (
        <ExerciseRow key={r.id} title={r.title} duration={`${r.duration} Min`} level={r.level} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{backgroundColor:tokens.colors.background,flex:1},
  title:{fontSize:tokens.type.h2,color:tokens.colors.textPrimary,fontWeight:'700',marginTop:12},
  search:{height:56,backgroundColor:tokens.colors.surface,borderRadius:tokens.radius.sm,paddingHorizontal:12,marginTop:12}
});
