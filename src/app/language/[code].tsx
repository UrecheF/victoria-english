import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumNav } from '@/components/premium-nav';
import { getLanguage } from '@/data/languages';

export default function LanguageScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const language = getLanguage(code);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <PremiumNav />
        <View style={[styles.hero,{borderColor:language.color+'55'}]}>
          <Text style={styles.flag}>{language.flag}</Text>
          <View style={styles.heroCopy}>
            <Text style={[styles.kicker,{color:language.color}]}>IDIOMA ACTIVO</Text>
            <Text style={styles.title}>{language.nativeName}</Text>
            <Text style={styles.greeting}>{language.greeting}</Text>
            <Text style={styles.translation}>{language.translation}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Empieza por aquí</Text>
        <View style={styles.grid}>
          {language.lessons.map((lesson,index)=>(
            <View key={lesson.id} style={styles.card}>
              <View style={[styles.number,{backgroundColor:language.color}]}><Text style={styles.numberText}>{index+1}</Text></View>
              <Text style={styles.cardTitle}>{lesson.title}</Text>
              <Text style={styles.phrase}>{lesson.phrase}</Text>
              <Text style={styles.cardTranslation}>{lesson.translation}</Text>
              <View style={styles.actions}>
                <Link href={`/lesson?lang=${language.code}&lesson=${lesson.id}`} asChild>
                  <Pressable style={styles.primaryBtn}><Text style={styles.primaryText}>▶ Empezar</Text></Pressable>
                </Link>
                <Link href={`/pronunciation?lang=${language.code}`} asChild>
                  <Pressable style={styles.secondaryBtn}><Text style={styles.secondaryText}>🎤 Pronunciar</Text></Pressable>
                </Link>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tools}>
          <Link href={`/games?lang=${language.code}`} asChild><Pressable style={styles.tool}><Text style={styles.toolIcon}>🎮</Text><Text style={styles.toolTitle}>Juegos</Text><Text style={styles.toolText}>Practica {language.nativeName} jugando.</Text></Pressable></Link>
          <Link href={`/vocabulary?lang=${language.code}`} asChild><Pressable style={styles.tool}><Text style={styles.toolIcon}>🧠</Text><Text style={styles.toolTitle}>Vocabulario</Text><Text style={styles.toolText}>Palabras, imágenes y repetición.</Text></Pressable></Link>
          <Link href={`/conversation?lang=${language.code}`} asChild><Pressable style={styles.tool}><Text style={styles.toolIcon}>💬</Text><Text style={styles.toolTitle}>Conversación</Text><Text style={styles.toolText}>Habla con Teacher AI.</Text></Pressable></Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:16,maxWidth:1200,width:'100%',alignSelf:'center'},
 hero:{backgroundColor:'#FFF',borderRadius:28,padding:24,borderWidth:2,flexDirection:'row',alignItems:'center',gap:20},flag:{fontSize:80},heroCopy:{flex:1},kicker:{fontSize:11,fontWeight:'900',letterSpacing:1.4},title:{fontSize:34,fontWeight:'900',color:'#173C78'},greeting:{fontSize:24,fontWeight:'900',color:'#7B46FF',marginTop:4},translation:{fontSize:14,color:'#697C99',marginTop:2},
 sectionTitle:{fontSize:22,fontWeight:'900',color:'#173C78'},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},card:{flexGrow:1,flexBasis:300,minWidth:260,backgroundColor:'#FFF',borderRadius:24,padding:18,borderWidth:1,borderColor:'#DBE9FF'},number:{width:34,height:34,borderRadius:17,alignItems:'center',justifyContent:'center'},numberText:{color:'#FFF',fontWeight:'900'},cardTitle:{fontSize:18,fontWeight:'900',color:'#173C78',marginTop:10},phrase:{fontSize:20,fontWeight:'800',color:'#2C4C80',marginTop:8},cardTranslation:{color:'#6D7E99',marginTop:3},actions:{flexDirection:'row',gap:8,marginTop:14,flexWrap:'wrap'},primaryBtn:{backgroundColor:'#FF2F98',borderRadius:16,paddingVertical:11,paddingHorizontal:15},primaryText:{color:'#FFF',fontWeight:'900'},secondaryBtn:{backgroundColor:'#EAF2FF',borderRadius:16,paddingVertical:11,paddingHorizontal:15},secondaryText:{color:'#315A92',fontWeight:'900'},
 tools:{flexDirection:'row',flexWrap:'wrap',gap:12},tool:{flexGrow:1,flexBasis:220,minWidth:200,backgroundColor:'#F8FBFF',borderWidth:1,borderColor:'#DDEAFF',borderRadius:22,padding:18},toolIcon:{fontSize:32},toolTitle:{fontSize:17,fontWeight:'900',color:'#173C78',marginTop:7},toolText:{color:'#687B9A',marginTop:3,lineHeight:19}
});
