import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { tokens } from '../tokens';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';

export default function PaywallScreen(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{padding:tokens.spacing.screenPadding}}>
      <Card style={{backgroundColor:tokens.colors.surface}}>
        <Text style={{fontSize:tokens.type.h2,fontWeight:'700'}}>Premium</Text>
        <Text style={{marginTop:8,color:tokens.colors.textSecondary}}>Unbegrenzte Programme, personalisierte Routinen</Text>
        <View style={{height:16}} />
        <PrimaryButton title="Upgrade" onPress={()=>{}} />
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:tokens.colors.background}
});
