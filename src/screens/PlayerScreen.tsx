import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { tokens } from '../tokens';
import ProgressRing from '../components/ProgressRing';
import PrimaryButton from '../components/PrimaryButton';

export default function PlayerScreen(){
  const [running,setRunning] = useState(true);
  const total = 60; // seconds
  const [t, setT] = useState(0);

  useEffect(()=>{
    let id: any;
    if(running){
      id = setInterval(()=> setT(s=> Math.min(total,s+1)),1000)
    }
    return ()=> clearInterval(id)
  },[running])

  const progress = t/total;

  return (
    <View style={styles.screen}>
      <View style={{alignItems:'center',marginTop:40}}>
        <ProgressRing size={160} progress={progress} />
        <Text style={styles.timer}>{Math.max(0,total-t)}s</Text>
      </View>

      <View style={{flex:1,justifyContent:'flex-end',marginBottom:40,paddingHorizontal:tokens.spacing.screenPadding}}>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Pressable style={styles.control}><Text style={{color:'#fff'}}>◀︎</Text></Pressable>
          <Pressable onPress={()=>setRunning(r=>!r)} style={[styles.control,{width:tokens.sizes.controlLarge,height:tokens.sizes.controlLarge,borderRadius:tokens.sizes.controlLarge/2}]}>
            <Text style={{color:'#fff'}}>{running? '❚❚' : '►'}</Text>
          </Pressable>
          <Pressable style={styles.control}><Text style={{color:'#fff'}}>▶︎</Text></Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:tokens.colors.background},
  timer:{fontSize:tokens.type.h1,color:tokens.colors.textPrimary,fontWeight:'700',marginTop:20,textAlign:'center'},
  control:{backgroundColor:tokens.colors.btnPrimaryBg,width:56,height:56,borderRadius:28,alignItems:'center',justifyContent:'center'}
});
