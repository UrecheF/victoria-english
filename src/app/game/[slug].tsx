import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { PremiumNav } from '@/components/premium-nav';

type Game = {
  title:string; icon:string; instruction:string; type:'choice'|'memory'|'build'|'fill'|'listen'|'truefalse'|'sequence'|'translate'; prompt:string; answer:string; options?:string[]; tokens?:string[];
};

const games:Record<string,Game>={
  'word-match':{title:'Word Match',icon:'🍎',instruction:'Elige la traducción correcta.',type:'choice',prompt:'Apple',answer:'Manzana',options:['Manzana','Casa','Perro','Azul']},
  'find-picture':{title:'Find the Picture',icon:'🐯',instruction:'Encuentra el animal correcto.',type:'choice',prompt:'Tiger',answer:'🐯',options:['🐶','🐯','🐼','🐰']},
  'listen-choose':{title:'Listen & Choose',icon:'🎧',instruction:'Escucha y toca lo que oyes.',type:'listen',prompt:'Good morning',answer:'Good morning',options:['Good night','Good morning','Thank you','See you']},
  'memory':{title:'Memory',icon:'🃏',instruction:'Encuentra la pareja correcta.',type:'memory',prompt:'Une palabra e imagen',answer:'cat|🐱',options:['cat','🐱','dog','🐶','apple','🍎']},
  'build-word':{title:'Build the Word',icon:'🔤',instruction:'Ordena las letras.',type:'build',prompt:'Forma la palabra “CAT”',answer:'CAT',tokens:['T','C','A']},
  'sentence-builder':{title:'Sentence Builder',icon:'🧱',instruction:'Ordena las palabras.',type:'sequence',prompt:'Forma la frase correcta',answer:'I like apples',tokens:['apples','I','like']},
  'fill-blank':{title:'Fill the Blank',icon:'✏️',instruction:'Completa la oración.',type:'fill',prompt:'I ___ happy.',answer:'am',options:['is','are','am','be']},
  'true-false':{title:'True or False',icon:'✅',instruction:'Decide si la traducción es correcta.',type:'truefalse',prompt:'“Dog” significa “Perro”.',answer:'Verdadero',options:['Verdadero','Falso']},
  'quick-translate':{title:'Quick Translate',icon:'⚡',instruction:'Traduce antes de que termine el reto.',type:'translate',prompt:'Gracias',answer:'Thank you',options:['Please','Thank you','Hello','Sorry']},
  'world-quest':{title:'World Quest',icon:'🌍',instruction:'Aprende cultura e idioma.',type:'choice',prompt:'¿Cómo saludamos en italiano?',answer:'Ciao',options:['Bonjour','Ciao','Hallo','Olá']},
  'grammar-battle':{title:'Grammar Battle',icon:'⚔️',instruction:'Elige la frase correcta.',type:'choice',prompt:'Selecciona la opción correcta:',answer:'She is happy.',options:['She are happy.','She is happy.','She am happy.']},
  'speed-round':{title:'Speed Round',icon:'🚀',instruction:'Responde rápido.',type:'choice',prompt:'Blue = ?',answer:'Azul',options:['Rojo','Azul','Verde','Negro']},
};

export default function GameScreen(){
  const {slug}=useLocalSearchParams<{slug:string}>();
  const game=games[slug||'']||games['word-match'];
  const[selected,setSelected]=useState<string[]>([]);const[status,setStatus]=useState<'idle'|'good'|'bad'>('idle');const[score,setScore]=useState(0);const completedRef=useRef(false);
  const built=useMemo(()=>selected.join(game.type==='build'?'':' '),[selected,game.type]);
  const reset=()=>{completedRef.current=false;setSelected([]);setStatus('idle')};
  const choose=(value:string)=>{if(completedRef.current)return;if(game.type==='memory'){const next=[...selected,value].slice(-2);setSelected(next);if(next.length===2){const pair=next.join('|');const reverse=[...next].reverse().join('|');const ok=pair===game.answer||reverse===game.answer;setStatus(ok?'good':'bad');if(ok){completedRef.current=true;setScore(s=>s+10)};}return;}const ok=value===game.answer;setSelected([value]);setStatus(ok?'good':'bad');if(ok){completedRef.current=true;setScore(s=>s+10)}};
  const token=(value:string)=>{if(completedRef.current||selected.length>=(game.tokens?.length||0))return;const next=[...selected,value];setSelected(next);const target=game.type==='build'?next.join(''):next.join(' ');if(target===game.answer){completedRef.current=true;setStatus('good');setScore(s=>s+15)}else if(next.length===(game.tokens?.length||0))setStatus('bad')};
  const listen=()=>Speech.speak(game.prompt,{language:'en-US',rate:.8});

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}><PremiumNav/>
    <View style={styles.hero}><Text style={styles.icon}>{game.icon}</Text><View style={{flex:1}}><Text style={styles.title}>{game.title}</Text><Text style={styles.instruction}>{game.instruction}</Text></View><View style={styles.score}><Text style={styles.scoreText}>⭐ {score}</Text></View></View>
    <View style={styles.board}><Text style={styles.prompt}>{game.prompt}</Text>{game.type==='listen'?<Pressable style={styles.listen} onPress={listen}><Text style={styles.listenText}>🔊 Escuchar</Text></Pressable>:null}
      {game.tokens?<><View style={styles.built} accessibilityLiveRegion="polite"><Text style={styles.builtText}>{built||'...'}</Text></View><View style={styles.options}>{game.tokens.map((t,i)=><Pressable key={`${t}-${i}`} style={styles.option} onPress={()=>token(t)} disabled={status==='good'} accessibilityRole="button" accessibilityLabel={`Agregar ${t}`}><Text style={styles.optionText}>{t}</Text></Pressable>)}</View></>:<View style={styles.options}>{(game.options||[]).map((o,i)=><Pressable key={`${o}-${i}`} style={[styles.option,selected.includes(o)&&styles.selected]} onPress={()=>choose(o)} disabled={status==='good'} accessibilityRole="button" accessibilityState={{selected:selected.includes(o),disabled:status==='good'}}><Text style={styles.optionText}>{o}</Text></Pressable>)}</View>}
      {status!=='idle'?<View style={[styles.feedback,status==='good'?styles.good:styles.bad]} accessibilityLiveRegion="assertive"><Text style={styles.feedbackTitle}>{status==='good'?'🎉 ¡Excelente!':'💪 Intenta otra vez'}</Text><Text style={styles.feedbackText}>{status==='good'?`Respuesta correcta: ${game.answer}`:'Revisa la pista y prueba de nuevo.'}</Text></View>:null}
      <View style={styles.actions}><Pressable style={styles.reset} onPress={reset}><Text style={styles.resetText}>↻ Reiniciar</Text></Pressable><Pressable style={styles.next} onPress={()=>router.replace('/games')}><Text style={styles.nextText}>Más juegos →</Text></Pressable></View>
    </View>
  </ScrollView></SafeAreaView>
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:14,maxWidth:900,width:'100%',alignSelf:'center'},hero:{flexDirection:'row',alignItems:'center',gap:14,backgroundColor:'#FFF',borderRadius:26,padding:18,borderWidth:1,borderColor:'#DCEAFF'},icon:{fontSize:58},title:{fontSize:30,fontWeight:'900',color:'#173C78'},instruction:{marginTop:3,color:'#657B9C'},score:{backgroundColor:'#FFF4D8',padding:10,borderRadius:14},scoreText:{fontWeight:'900',color:'#946800'},board:{backgroundColor:'#F7FBFF',borderRadius:28,padding:22,borderWidth:1,borderColor:'#D8E9FF'},prompt:{fontSize:27,fontWeight:'900',color:'#173C78',textAlign:'center',marginVertical:18},listen:{alignSelf:'center',backgroundColor:'#10A6FF',paddingVertical:12,paddingHorizontal:22,borderRadius:18},listenText:{color:'#FFF',fontWeight:'900'},built:{backgroundColor:'#FFF',borderRadius:18,padding:18,marginTop:12,minHeight:65,justifyContent:'center'},builtText:{fontSize:24,fontWeight:'900',color:'#7C49FF',textAlign:'center'},options:{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',gap:10,marginTop:18},option:{minWidth:130,backgroundColor:'#FFF',borderRadius:18,padding:16,borderWidth:2,borderColor:'#DCEAFF',alignItems:'center'},selected:{borderColor:'#7C49FF',backgroundColor:'#F2EDFF'},optionText:{fontSize:18,fontWeight:'900',color:'#284F87'},feedback:{marginTop:20,borderRadius:18,padding:16},good:{backgroundColor:'#E9FFF2'},bad:{backgroundColor:'#FFF0F4'},feedbackTitle:{fontSize:18,fontWeight:'900',color:'#173C78'},feedbackText:{marginTop:4,color:'#617895'},actions:{flexDirection:'row',gap:10,marginTop:18,justifyContent:'center'},reset:{backgroundColor:'#E9F3FF',padding:13,paddingHorizontal:20,borderRadius:16},resetText:{fontWeight:'900',color:'#24578F'},next:{backgroundColor:'#FF2F98',padding:13,paddingHorizontal:20,borderRadius:16},nextText:{fontWeight:'900',color:'#FFF'}});
