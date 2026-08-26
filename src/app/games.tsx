import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumNav } from '@/components/premium-nav';

const answers=[{label:'A Fish',correct:false},{label:'A Turtle',correct:true},{label:'A Dolphin',correct:false}];

type Game={id:string;icon:string;title:string;caption:string;category:string;xp:number;color:string};
const games:Game[]=[
 {id:'word-match',icon:'🍎',title:'Word Match',caption:'Une palabras e imágenes',category:'Vocabulario',xp:10,color:'#FFF0F6'},
 {id:'picture-hunt',icon:'🐯',title:'Find the Picture',caption:'Encuentra la imagen correcta',category:'Vocabulario',xp:10,color:'#FFF8E7'},
 {id:'listen-choose',icon:'🎧',title:'Listen & Choose',caption:'Escucha y elige',category:'Escucha',xp:12,color:'#ECF7FF'},
 {id:'puzzle',icon:'🧩',title:'Picture Puzzle',caption:'Arma la imagen',category:'Memoria',xp:12,color:'#F3EEFF'},
 {id:'memory',icon:'🃏',title:'Memory',caption:'Encuentra las parejas',category:'Memoria',xp:15,color:'#FFF5E8'},
 {id:'build-word',icon:'🔤',title:'Build the Word',caption:'Forma la palabra',category:'Vocabulario',xp:15,color:'#EEF9FF'},
 {id:'pronunciation',icon:'🎤',title:'Pronunciation Battle',caption:'Habla y gana estrellas',category:'Pronunciación',xp:20,color:'#FFF0F7'},
 {id:'world-quest',icon:'🌍',title:'World Quest',caption:'Explora países y culturas',category:'Cultura',xp:20,color:'#EEFFF8'},
 {id:'speed-words',icon:'⚡',title:'Vocabulary Sprint',caption:'Responde antes del tiempo',category:'Vocabulario',xp:18,color:'#FFF8D8'},
 {id:'story-order',icon:'📚',title:'Story Order',caption:'Ordena una mini historia',category:'Lectura',xp:18,color:'#F0F4FF'},
 {id:'sound-bingo',icon:'🎯',title:'Sound Bingo',caption:'Escucha y marca',category:'Escucha',xp:16,color:'#EFFAFF'},
 {id:'missing-word',icon:'🕳️',title:'Missing Word',caption:'Completa la frase',category:'Gramática',xp:18,color:'#F7F2FF'},
 {id:'sentence-builder',icon:'🏗️',title:'Sentence Builder',caption:'Construye oraciones',category:'Gramática',xp:20,color:'#FFF3E9'},
 {id:'true-false',icon:'✅',title:'True or False',caption:'¿Es correcto o no?',category:'Lectura',xp:10,color:'#ECFFF3'},
 {id:'emoji-talk',icon:'😄',title:'Emoji Talk',caption:'Describe emociones',category:'Conversación',xp:16,color:'#FFF2FB'},
 {id:'role-play',icon:'🎭',title:'Role Play',caption:'Actúa una conversación',category:'Conversación',xp:22,color:'#F3EFFF'},
 {id:'color-hunt',icon:'🌈',title:'Color Hunt',caption:'Encuentra colores',category:'Vocabulario',xp:10,color:'#F4FBFF'},
 {id:'number-race',icon:'🔢',title:'Number Race',caption:'Cuenta y responde',category:'Vocabulario',xp:12,color:'#FFF7E8'},
 {id:'animal-sounds',icon:'🦁',title:'Animal Sounds',caption:'Escucha y adivina',category:'Escucha',xp:14,color:'#F2FFF2'},
 {id:'spell-it',icon:'✍️',title:'Spell It!',caption:'Deletrea la palabra',category:'Vocabulario',xp:16,color:'#EEF5FF'},
 {id:'mini-karaoke',icon:'🎵',title:'Mini Karaoke',caption:'Canta y repite frases',category:'Pronunciación',xp:20,color:'#FFF0FA'},
 {id:'tongue-twister',icon:'👅',title:'Tongue Twister',caption:'Reto de pronunciación',category:'Pronunciación',xp:24,color:'#FFF3F0'},
 {id:'detective',icon:'🕵️',title:'Word Detective',caption:'Encuentra la pista',category:'Lectura',xp:18,color:'#F3F6FF'},
 {id:'culture-quiz',icon:'🏯',title:'Culture Quiz',caption:'Descubre el mundo',category:'Cultura',xp:18,color:'#EEFAFF'},
];

const categories=['Todos','Vocabulario','Escucha','Memoria','Pronunciación','Gramática','Lectura','Conversación','Cultura'];

export default function GamesScreen(){
 const [selected,setSelected]=useState<string|null>(null);
 const [category,setCategory]=useState('Todos');
 const [activeGame,setActiveGame]=useState<Game>(games[0]);
 const result=useMemo(()=>answers.find(i=>i.label===selected),[selected]);
 const filtered=useMemo(()=>category==='Todos'?games:games.filter(g=>g.category===category),[category]);

 return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}><PremiumNav/>
  <View style={styles.header}><View><Text style={styles.eyebrow}>APRENDE JUGANDO</Text><Text style={styles.title}>Juegos</Text><Text style={styles.sub}>24 actividades de vocabulario, memoria, escucha, conversación y pronunciación.</Text></View><View style={styles.points}><Text style={styles.pointsText}>⭐ 27</Text></View></View>

  <View style={styles.categoryRow}>{categories.map(x=>{const active=category===x;return <Pressable key={x} onPress={()=>setCategory(x)} style={StyleSheet.flatten([styles.category,active?styles.categoryActive:null])}><Text style={StyleSheet.flatten([styles.categoryText,active?styles.categoryTextActive:null])}>{x}</Text></Pressable>})}</View>

  <View style={styles.grid}>{filtered.map((game)=><Pressable key={game.id} onPress={()=>{setActiveGame(game);setSelected(null)}} style={StyleSheet.flatten([styles.gameCard,{backgroundColor:game.color},activeGame.id===game.id?styles.gameCardActive:null])}><Text style={styles.gameIcon}>{game.icon}</Text><Text style={styles.gameTitle}>{game.title}</Text><Text style={styles.gameCaption}>{game.caption}</Text><Text style={styles.categoryMini}>{game.category}</Text><View style={styles.xpBadge}><Text style={styles.xpText}>+{game.xp} XP</Text></View></Pressable>)}</View>

  <View style={styles.playPanel}>
    <View style={styles.playHeader}><View><Text style={styles.challengeLabel}>JUEGO ACTIVO</Text><Text style={styles.challengeTitle}>{activeGame.icon} {activeGame.title}</Text><Text style={styles.challengeSub}>{activeGame.caption}</Text></View><View style={styles.playBadge}><Text style={styles.playBadgeText}>+{activeGame.xp} XP</Text></View></View>
    <View style={styles.challenge}><View style={styles.challengeVisual}><Text style={styles.turtle}>🐢</Text><Text style={styles.sparkles}>✨🌊✨</Text></View><View style={styles.challengeContent}><Text style={styles.challengeLabel}>RETO RÁPIDO</Text><Text style={styles.challengeTitle}>What animal is this?</Text><Text style={styles.challengeSub}>Escoge la respuesta correcta</Text><View style={styles.answerList}>{answers.map(a=>{const active=selected===a.label;const good=active&&a.correct;const bad=active&&!a.correct;return <Pressable key={a.label} onPress={()=>setSelected(a.label)} style={StyleSheet.flatten([styles.answer,good?styles.good:null,bad?styles.bad:null])}><Text style={StyleSheet.flatten([styles.answerText,good?styles.goodText:null,bad?styles.badText:null])}>{a.label} {good?'✓':bad?'↻':''}</Text></Pressable>})}</View>{result&&<View style={StyleSheet.flatten([styles.feedback,result.correct?styles.feedbackGood:styles.feedbackTry])}><Text style={styles.feedbackTitle}>{result.correct?'🎉 Excellent!':'💪 Almost!'}</Text><Text style={styles.feedbackText}>{result.correct?`Turtle significa tortuga. +${activeGame.xp} XP.`:'Mira la imagen y vuelve a intentarlo.'}</Text></View>}</View></View>
  </View>
 </ScrollView></SafeAreaView>
}

const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:14,maxWidth:1250,width:'100%',alignSelf:'center'},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#FFF',borderRadius:24,padding:18,borderWidth:1,borderColor:'#D8E9FF'},eyebrow:{fontSize:11,fontWeight:'900',letterSpacing:1.2,color:'#7C49FF'},title:{fontSize:31,fontWeight:'900',color:'#173C78'},sub:{color:'#687B9A',marginTop:3,maxWidth:650},points:{backgroundColor:'#FFF4D8',paddingVertical:9,paddingHorizontal:14,borderRadius:16},pointsText:{fontWeight:'900',color:'#9B6A00'},categoryRow:{flexDirection:'row',flexWrap:'wrap',gap:8},category:{backgroundColor:'#FFF',borderRadius:15,paddingVertical:9,paddingHorizontal:14,borderWidth:1,borderColor:'#DCEAFF'},categoryActive:{backgroundColor:'#7C49FF'},categoryText:{color:'#315A92',fontWeight:'800',fontSize:12},categoryTextActive:{color:'#FFF'},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},gameCard:{flexGrow:1,flexBasis:180,minWidth:155,borderRadius:22,padding:17,borderWidth:2,borderColor:'transparent',position:'relative'},gameCardActive:{borderColor:'#7C49FF',shadowColor:'#7C49FF',shadowOpacity:.18,shadowRadius:10,elevation:3},gameIcon:{fontSize:38},gameTitle:{marginTop:8,fontWeight:'900',color:'#173C78',fontSize:15},gameCaption:{marginTop:3,color:'#6D7E99',fontSize:12,minHeight:32},categoryMini:{marginTop:8,fontSize:9,fontWeight:'900',color:'#7A8AA3',textTransform:'uppercase'},xpBadge:{position:'absolute',right:10,top:10,backgroundColor:'#EAF9F1',paddingHorizontal:8,paddingVertical:4,borderRadius:11},xpText:{fontSize:9,fontWeight:'900',color:'#1C9256'},playPanel:{backgroundColor:'#FFF',borderRadius:28,padding:16,borderWidth:1,borderColor:'#D8E9FF'},playHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:12},playBadge:{backgroundColor:'#E9FFF1',borderRadius:15,paddingVertical:8,paddingHorizontal:12},playBadgeText:{fontWeight:'900',color:'#188D52'},challenge:{flexDirection:'row',flexWrap:'wrap',gap:14,backgroundColor:'#DDF5FF',borderRadius:24,padding:18},challengeVisual:{flex:1,minWidth:230,alignItems:'center',justifyContent:'center',backgroundColor:'#EAFBFF',borderRadius:22,padding:20},turtle:{fontSize:110},sparkles:{fontSize:25},challengeContent:{flex:1,minWidth:260},challengeLabel:{fontSize:11,fontWeight:'900',letterSpacing:1.2,color:'#7C49FF'},challengeTitle:{fontSize:27,fontWeight:'900',color:'#173C78',marginTop:4},challengeSub:{color:'#647899',marginTop:3},answerList:{gap:8,marginTop:14},answer:{backgroundColor:'#FFF',borderRadius:16,padding:13,borderWidth:2,borderColor:'#DDEAFF'},good:{backgroundColor:'#E9FFF2',borderColor:'#26C777'},bad:{backgroundColor:'#FFF0F4',borderColor:'#FF6A9F'},answerText:{fontWeight:'900',color:'#274D84',textAlign:'center'},goodText:{color:'#188D52'},badText:{color:'#C54D72'},feedback:{marginTop:10,borderRadius:16,padding:13},feedbackGood:{backgroundColor:'#E8FFF1'},feedbackTry:{backgroundColor:'#FFF4D8'},feedbackTitle:{fontWeight:'900',color:'#173C78'},feedbackText:{marginTop:3,color:'#5C7190'}})
