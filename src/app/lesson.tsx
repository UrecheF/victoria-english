import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumNav } from '@/components/premium-nav';

type Phrase = { text: string; translation: string };
const lessons: Phrase[] = [
  { text: 'Good morning, everyone!', translation: '¡Buenos días a todos!' },
  { text: 'Aloha! Welcome to Hawaii!', translation: '¡Aloha! ¡Bienvenidos a Hawái!' },
  { text: 'Today we will show you some beautiful parts of Hawaiian culture.', translation: 'Hoy les mostraremos algunas partes hermosas de la cultura hawaiana.' },
  { text: 'You will see animals, food, traditional clothes, music, and dance.', translation: 'Verán animales, comida, ropa tradicional, música y danza.' },
  { text: 'We hope you enjoy our presentation. Mahalo!', translation: 'Esperamos que disfruten nuestra presentación. ¡Mahalo!' },
];
function speakWeb(text: string) { if (Platform.OS !== 'web' || typeof window === 'undefined' || !('speechSynthesis' in window)) return false; const synth = window.speechSynthesis; synth.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=.76; synth.speak(u); return true; }

export default function LessonScreen() {
  const [step,setStep]=useState(0); const [stars,setStars]=useState(0); const [message,setMessage]=useState('Escucha primero y luego practica.');
  const phrase=lessons[step]; const progress=useMemo(()=>`${Math.round(((step+1)/lessons.length)*100)}%`,[step]);
  const listen=()=>setMessage(speakWeb(phrase.text)?'🔊 Escucha el ritmo y repite con calma.':'🔊 La voz nativa móvil se conecta en la siguiente fase.');
  const practice=()=>{const nextStars=Math.min(3,stars+1);setStars(nextStars);setMessage(nextStars===3?'🎉 ¡Excelente! Ya puedes continuar.':'🌟 ¡Muy bien! Una vez más.');};
  const next=()=>{if(step<lessons.length-1){setStep(step+1);setStars(0);setMessage('Escucha primero y luego practica.');}};

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}><PremiumNav />
    <View style={styles.headerRow}><View><Text style={styles.eyebrow}>LECCIÓN 1 DE 5</Text><Text style={styles.title}>Hawaii Presentation</Text><Text style={styles.sub}>Escucha, repite y aprende</Text></View><Text style={styles.counter}>{step+1}/{lessons.length}</Text></View>
    <View style={styles.track}><View style={[styles.fill,{width:progress}]} /></View>
    <View style={styles.contentRow}>
      <View style={styles.scene}>
        <View style={styles.sceneTop}><Text style={styles.island}>🌴🌺</Text><Text style={styles.teacher}>👩🏻‍🏫</Text><Text style={styles.island}>🌊☀️</Text></View>
        <View style={styles.bubble}><Text style={styles.phrase}>{phrase.text}</Text><Text style={styles.translation}>{phrase.translation}</Text></View>
        <View style={styles.buttonRow}><Pressable style={styles.listen} onPress={listen}><Text style={styles.buttonText}>🔊 Listen</Text></Pressable><Pressable style={styles.turn} onPress={practice}><Text style={styles.buttonText}>🎤 Your Turn</Text></Pressable></View>
        <View style={styles.stars}>{[1,2,3].map(n=><Text key={n} style={styles.star}>{n<=stars?'★':'☆'}</Text>)}</View><Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.sideCard}><Text style={styles.sideTitle}>{stars===3?'¡Excelente!':'Tu progreso'}</Text><Text style={styles.bigStars}>{[1,2,3].map(n=>n<=stars?'★':'☆').join('')}</Text><Text style={styles.score}>Pronunciación guiada</Text><View style={styles.miniTrack}><View style={[styles.miniFill,{width:`${Math.max(15,stars*33)}%`}]} /></View><View style={styles.feedback}><Text style={styles.feedbackTitle}>{stars===3?'Fantastic!':'Keep going!'}</Text><Text style={styles.feedbackText}>{stars===3?'You’re ready for the next phrase.':'Listen, repeat and earn your stars.'}</Text></View>{stars===3&&step<lessons.length-1&&<Pressable style={styles.next} onPress={next}><Text style={styles.nextText}>Siguiente →</Text></Pressable>}{stars===3&&step===lessons.length-1&&<View style={styles.complete}><Text style={styles.trophy}>🏆</Text><Text style={styles.completeTitle}>¡Lección completada!</Text><Text style={styles.completeText}>+15 estrellas · juego desbloqueado</Text></View>}</View>
    </View>
    <View style={styles.timeline}>{lessons.map((item,i)=><Pressable key={item.text} onPress={()=>{setStep(i);setStars(0)}} style={[styles.timelineItem,i===step&&styles.timelineActive]}><Text style={[styles.timelineNumber,i===step&&styles.timelineNumberActive]}>{i+1}</Text><Text numberOfLines={2} style={styles.timelineText}>{item.text}</Text></Pressable>)}</View>
  </ScrollView></SafeAreaView>;
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:14,maxWidth:1250,width:'100%',alignSelf:'center'},headerRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',backgroundColor:'#FFF',borderRadius:24,padding:18,borderWidth:1,borderColor:'#D8E9FF'},eyebrow:{fontSize:11,fontWeight:'900',letterSpacing:1,color:'#7C49FF'},title:{fontSize:27,fontWeight:'900',color:'#173C78'},sub:{color:'#6A7B9D',marginTop:2},counter:{fontWeight:'900',color:'#7C49FF',fontSize:18},track:{height:11,backgroundColor:'#D7E9F8',borderRadius:12,overflow:'hidden'},fill:{height:'100%',backgroundColor:'#27C777'},contentRow:{flexDirection:'row',flexWrap:'wrap',gap:12},scene:{flex:2,minWidth:300,backgroundColor:'#DDF5FF',borderRadius:30,padding:22,alignItems:'center',borderWidth:1,borderColor:'#CBE8FF'},sceneTop:{flexDirection:'row',alignItems:'flex-end',justifyContent:'center',gap:12},island:{fontSize:46},teacher:{fontSize:105},bubble:{backgroundColor:'#FFF',borderRadius:24,padding:20,width:'100%',maxWidth:720,alignItems:'center',marginTop:8,shadowColor:'#2858B7',shadowOpacity:.1,shadowRadius:12,elevation:3},phrase:{fontSize:30,lineHeight:38,fontWeight:'900',color:'#173C78',textAlign:'center'},translation:{marginTop:8,fontSize:16,color:'#54709A',textAlign:'center'},buttonRow:{flexDirection:'row',gap:10,marginTop:16,width:'100%',maxWidth:620},listen:{flex:1,backgroundColor:'#10A6FF',borderRadius:20,padding:15,alignItems:'center'},turn:{flex:1,backgroundColor:'#FF2F98',borderRadius:20,padding:15,alignItems:'center'},buttonText:{color:'#FFF',fontWeight:'900'},stars:{flexDirection:'row',marginTop:14},star:{fontSize:42,color:'#FFB400',marginHorizontal:3},message:{color:'#4D6790',fontWeight:'800',textAlign:'center',marginTop:3},sideCard:{flex:1,minWidth:250,backgroundColor:'#F6FFF9',borderRadius:30,padding:22,borderWidth:1,borderColor:'#D9F2E3'},sideTitle:{fontSize:24,fontWeight:'900',color:'#22A35C',textAlign:'center'},bigStars:{fontSize:44,color:'#FFB400',textAlign:'center',marginTop:8},score:{fontWeight:'900',color:'#173C78',textAlign:'center',marginTop:4},miniTrack:{height:10,backgroundColor:'#DDEDE5',borderRadius:10,marginTop:12,overflow:'hidden'},miniFill:{height:'100%',backgroundColor:'#27C777'},feedback:{backgroundColor:'#E7FFF0',padding:14,borderRadius:18,marginTop:14},feedbackTitle:{fontWeight:'900',color:'#168D50'},feedbackText:{color:'#446E58',marginTop:3,lineHeight:18},next:{marginTop:14,backgroundColor:'#FF2F98',borderRadius:18,padding:13,alignItems:'center'},nextText:{color:'#FFF',fontWeight:'900'},complete:{alignItems:'center',marginTop:14},trophy:{fontSize:45},completeTitle:{fontSize:20,fontWeight:'900',color:'#178A50'},completeText:{color:'#5A7A68',marginTop:4},timeline:{flexDirection:'row',flexWrap:'wrap',gap:8},timelineItem:{flexGrow:1,flexBasis:150,minWidth:135,backgroundColor:'#FFF',borderRadius:18,padding:11,borderWidth:1,borderColor:'#DCEAFF'},timelineActive:{borderColor:'#7C49FF',backgroundColor:'#F2EDFF'},timelineNumber:{width:24,height:24,borderRadius:12,backgroundColor:'#E9F2FF',textAlign:'center',lineHeight:24,fontWeight:'900',color:'#315A92'},timelineNumberActive:{backgroundColor:'#7C49FF',color:'#FFF'},timelineText:{fontSize:11,fontWeight:'800',color:'#294E84',marginTop:7,lineHeight:15}
});
