import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumNav } from '@/components/premium-nav';
import { languageOptions } from '@/data/languages';

const gameResults = [
  ['Word Match','Une palabras e imágenes','/games'],['Memory','Memoriza pares','/games'],['Listen & Choose','Escucha y elige','/games'],['Build the Word','Forma palabras','/games'],['Pronunciation Battle','Practica pronunciación','/pronunciation'],['World Quest','Explora culturas','/games'],['Conversation Challenge','Habla con Teacher AI','/conversation'],['Vocabulary Sprint','Reto rápido de palabras','/vocabulary'],
] as const;

const staticResults = [
  ['Teacher AI','Profesora virtual con IA','/teacher','🤖'],['Mi Tarea','Foto, OCR y lección','/scan','📸'],['Mi Progreso','Estrellas, XP y logros','/progress','📈'],['Perfiles','Alana y Victoria','/profiles','👧'],['Lecciones','Todas las lecciones','/lessons','📚'],['Pronunciación','Laboratorio de voz','/pronunciation','🎤'],['Vocabulario','Tarjetas de palabras','/vocabulary','🧠'],['Conversación','Práctica conversacional','/conversation','💬'],['Logros','Insignias y recompensas','/achievements','🏆'],
] as const;

const languageNamesInSpanish: Record<string, string> = {
  ar: 'árabe',
  de: 'alemán',
  en: 'inglés',
  es: 'español',
  fr: 'francés',
  it: 'italiano',
  ja: 'japonés',
  ko: 'coreano',
  pt: 'portugués',
  zh: 'chino',
};

const normalizeSearchText = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function SearchScreen(){
  const [query,setQuery]=useState('');
  const normalized=normalizeSearchText(query.trim());
  const results=useMemo(()=>{
    const languages=languageOptions.map(l=>({
      title:l.nativeName,
      subtitle:`Aprender ${languageNamesInSpanish[l.code] ?? l.name}`,
      href:`/language/${l.code}`,
      icon:l.flag,
      keywords:[l.name,languageNamesInSpanish[l.code],...l.lessons.flatMap(lesson=>[lesson.title,lesson.phrase,lesson.translation])].join(' '),
    }));
    const games=gameResults.map(([title,subtitle,href])=>({title,subtitle,href,icon:'🎮',keywords:''}));
    const sections=staticResults.map(([title,subtitle,href,icon])=>({title,subtitle,href,icon,keywords:''}));
    const all=[...languages,...games,...sections];
    if(!normalized) return all.slice(0,14);
    return all.filter(item=>normalizeSearchText(`${item.title} ${item.subtitle} ${item.keywords}`).includes(normalized));
  },[normalized]);

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}><PremiumNav/>
    <View style={styles.hero}><Text style={styles.eyebrow}>BUSCADOR GLOBAL</Text><Text style={styles.title}>¿Qué quieres aprender?</Text><Text style={styles.sub}>Busca idiomas, juegos, lecciones, Teacher AI, pronunciación, vocabulario y más.</Text>
      <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput autoFocus value={query} onChangeText={setQuery} placeholder="Ej: francés, animales, pronunciación..." placeholderTextColor="#8291AA" style={styles.input} accessibilityLabel="Buscar idiomas, juegos y lecciones" returnKeyType="search"/>{query.length>0&&<Pressable onPress={()=>setQuery('')} style={styles.clear} accessibilityRole="button" accessibilityLabel="Borrar búsqueda"><Text style={styles.clearText}>×</Text></Pressable>}</View>
    </View>
    <Text style={styles.count}>{results.length} resultados</Text>
    <View style={styles.grid}>{results.map((item)=><Link key={`${item.title}-${item.href}`} href={item.href as any} asChild><Pressable style={styles.card}><Text style={styles.icon}>{item.icon}</Text><View style={styles.copy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardSub}>{item.subtitle}</Text></View><Text style={styles.arrow}>→</Text></Pressable></Link>)}</View>
    {results.length===0&&<View style={styles.empty}><Text style={styles.emptyIcon}>🔎</Text><Text style={styles.emptyTitle}>No encontré eso todavía</Text><Text style={styles.emptyText}>Prueba con “English”, “Juegos”, “Teacher AI”, “Pronunciación” o “Tarea”.</Text></View>}
  </ScrollView></SafeAreaView>
}

const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:14,maxWidth:1100,width:'100%',alignSelf:'center'},hero:{backgroundColor:'#FFF',borderRadius:28,padding:22,borderWidth:1,borderColor:'#D9E9FF'},eyebrow:{fontSize:11,fontWeight:'900',letterSpacing:1.3,color:'#7B46FF'},title:{fontSize:30,fontWeight:'900',color:'#173C78',marginTop:3},sub:{color:'#6C7E99',marginTop:4,lineHeight:20},searchBox:{marginTop:18,flexDirection:'row',alignItems:'center',backgroundColor:'#F5FAFF',borderRadius:20,borderWidth:2,borderColor:'#DCEAFF',paddingHorizontal:14},searchIcon:{fontSize:24,color:'#395D91'},input:{flex:1,paddingVertical:14,fontSize:16,color:'#173C78',outlineStyle:'none' as any},clear:{width:32,height:32,borderRadius:16,backgroundColor:'#E9F1FF',alignItems:'center',justifyContent:'center'},clearText:{fontSize:22,color:'#496488'},count:{fontWeight:'900',color:'#526C94'},grid:{gap:9},card:{backgroundColor:'#FFF',borderRadius:20,padding:14,borderWidth:1,borderColor:'#DDEAFF',flexDirection:'row',alignItems:'center',gap:12},icon:{fontSize:30},copy:{flex:1},cardTitle:{fontSize:16,fontWeight:'900',color:'#173C78'},cardSub:{fontSize:12,color:'#71819B',marginTop:2},arrow:{fontSize:22,fontWeight:'900',color:'#7B46FF'},empty:{alignItems:'center',padding:35,backgroundColor:'#FFF',borderRadius:24},emptyIcon:{fontSize:48},emptyTitle:{fontSize:20,fontWeight:'900',color:'#173C78',marginTop:8},emptyText:{color:'#71819B',textAlign:'center',marginTop:5,maxWidth:420}});
