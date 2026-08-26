import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumNav } from '@/components/premium-nav';

const languages = [
  ['🇺🇸', 'English'], ['🇫🇷', 'Français'], ['🇮🇹', 'Italiano'], ['🇪🇸', 'Español'], ['🇩🇪', 'Deutsch'], ['🇵🇹', 'Português'], ['🌐', 'Más idiomas'],
] as const;

const games = [
  ['🍎', 'Word Match', 'Une palabras'], ['🐯', 'Find the Picture', 'Encuentra la imagen'], ['🎧', 'Listen & Choose', 'Escucha y elige'], ['🧩', 'Puzzle', 'Arma la imagen'], ['🃏', 'Memory', 'Memoria'], ['🔤', 'Build the Word', 'Forma la palabra'],
] as const;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 980;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <PremiumNav />

        <View style={[styles.hero, wide && styles.heroWide]}>
          <View style={styles.kidsPane}>
            <View style={styles.kidBubble}><Text style={styles.kidEmoji}>👧🏼</Text><Text style={styles.kidTag}>Alana</Text></View>
            <View style={[styles.kidBubble, styles.kidBubbleBlue]}><Text style={styles.kidEmoji}>👧🏻</Text><Text style={[styles.kidTag, styles.kidTagBlue]}>Victoria</Text></View>
          </View>
          <View style={styles.heroCenter}>
            <View style={styles.logoRow}><Text style={styles.logoPink}>Alana</Text><Text style={styles.heart}>♥</Text><Text style={styles.logoBlue}>Victoria</Text></View>
            <Text style={styles.logoSub}>L A N G U A G E S</Text>
            <Text style={styles.heroTitle}>Pequeños hoy, grandes mañana.</Text>
            <Text style={styles.heroText}>Más idiomas · más oportunidades · un futuro más grande · juntos.</Text>
            <View style={styles.heroButtons}>
              <Link href="/lesson" asChild><Pressable style={styles.cta}><Text style={styles.ctaText}>▶  Comenzar ahora</Text></Pressable></Link>
              <Link href="/profiles" asChild><Pressable style={styles.ghost}><Text style={styles.ghostText}>👧 Elegir perfil</Text></Pressable></Link>
            </View>
          </View>
          <View style={styles.worldPane}>
            <Text style={styles.world}>🌍</Text>
            <Text style={styles.worldCaption}>Explore the world</Text>
            <Text style={styles.worldPlaces}>🗼  🏛️  🕰️  🏯</Text>
          </View>
        </View>

        <View style={styles.languageStrip}>
          {languages.map(([flag, name]) => <View key={name} style={styles.languageChip}><Text style={styles.languageFlag}>{flag}</Text><Text style={styles.languageText}>{name}</Text></View>)}
        </View>

        <View style={[styles.dashboardRow, !wide && styles.stack]}>
          <View style={[styles.panel, styles.lessonPanel]}>
            <View style={styles.panelHeader}><View><Text style={styles.eyebrow}>LECCIÓN 1 DE 5</Text><Text style={styles.panelTitle}>Hawaii Presentation</Text><Text style={styles.panelSub}>Escucha, repite y aprende</Text></View><Text style={styles.reward}>★★★</Text></View>
            <View style={styles.lessonScene}>
              <Text style={styles.teacherAvatar}>👩🏻‍🏫🌺</Text>
              <View style={styles.phraseBubble}><Text style={styles.phrase}>Good morning,{`\n`}everyone!</Text><Text style={styles.translation}>¡Buenos días a todos!</Text></View>
            </View>
            <View style={styles.actionRow}>
              <Link href="/lesson" asChild><Pressable style={styles.listen}><Text style={styles.listenText}>🔊 Listen</Text></Pressable></Link>
              <Link href="/lesson" asChild><Pressable style={styles.turn}><Text style={styles.turnText}>🎤 Your Turn</Text></Pressable></Link>
            </View>
          </View>

          <View style={[styles.panel, styles.scorePanel]}>
            <Text style={styles.successTitle}>¡Excelente!</Text><Text style={styles.bigStars}>★★★</Text><Text style={styles.score}>Pronunciación: 94%</Text>
            <View style={styles.scoreTrack}><View style={styles.scoreFill} /></View>
            <View style={styles.successBox}><Text style={styles.successBoxTitle}>Fantastic!</Text><Text style={styles.successBoxText}>Your pronunciation is very clear.</Text></View>
            <Link href="/lesson" asChild><Pressable style={styles.nextBtn}><Text style={styles.nextBtnText}>Siguiente →</Text></Pressable></Link>
          </View>

          <View style={[styles.panel, styles.gamesPanel]}>
            <View style={styles.panelHeader}><View><Text style={styles.panelTitle}>🎮 Juegos</Text><Text style={styles.panelSub}>Aprende jugando</Text></View><Text style={styles.miniBadge}>6</Text></View>
            <View style={styles.gameGrid}>{games.map(([icon, title, caption]) => <View key={title} style={styles.gameCard}><Text style={styles.gameIcon}>{icon}</Text><Text style={styles.gameTitle}>{title}</Text><Text style={styles.gameCaption}>{caption}</Text></View>)}</View>
            <Link href="/games" asChild><Pressable style={styles.moreBtn}><Text style={styles.moreBtnText}>Ver todos los juegos →</Text></Pressable></Link>
          </View>
        </View>

        <View style={[styles.dashboardRow, !wide && styles.stack]}>
          <View style={[styles.panel, styles.teacherPanel]}>
            <Text style={styles.panelTitle}>🤖 Teacher AI</Text><Text style={styles.panelSub}>Tu profe de idiomas, siempre contigo</Text>
            <View style={styles.chatRow}><Text style={styles.teacherBig}>👩🏻‍🏫</Text><View style={styles.chatBubble}><Text style={styles.chatText}>Hi! I’m your AI teacher.{`\n`}What would you like to learn today?</Text></View></View>
            <View style={styles.promptGrid}>{['Let’s practice conversation','Explain this word','Tell me a story','Give me a challenge'].map((p) => <View key={p} style={styles.prompt}><Text style={styles.promptText}>{p}</Text></View>)}</View>
            <Link href="/teacher" asChild><Pressable style={styles.micCircle}><Text style={styles.micText}>🎤</Text></Pressable></Link><Text style={styles.tapText}>Tap to speak</Text>
          </View>

          <View style={[styles.panel, styles.taskPanel]}>
            <Text style={styles.panelTitle}>📸 Mi Tarea</Text><Text style={styles.panelSub}>Toma una foto y crea una lección</Text>
            <View style={styles.stepsRow}>{[['1','📷','Toma foto'],['2','OCR','Analizamos'],['3','📖','Generamos']].map(([n, icon, label]) => <View key={n} style={styles.step}><Text style={styles.stepNumber}>{n}</Text><Text style={styles.stepIcon}>{icon}</Text><Text style={styles.stepLabel}>{label}</Text></View>)}</View>
            <View style={styles.notebook}><Text style={styles.notebookText}>This is a cat.{`\n`}It is small.{`\n`}The cat is on the table.</Text></View>
            <Link href="/scan" asChild><Pressable style={styles.ctaSmall}><Text style={styles.ctaText}>📷 Tomar foto</Text></Pressable></Link>
          </View>

          <View style={[styles.panel, styles.progressPanel]}>
            <Text style={styles.panelTitle}>📈 Mi Progreso</Text><Text style={styles.panelSub}>Tu esfuerzo hoy construye grandes oportunidades</Text>
            <View style={styles.metricRow}>{[['⭐','27','estrellas'],['📚','8','lecciones'],['🔥','5','días'],['🏆','3','insignias']].map(([i,v,l]) => <View key={l} style={styles.metric}><Text style={styles.metricIcon}>{i}</Text><Text style={styles.metricValue}>{v}</Text><Text style={styles.metricLabel}>{l}</Text></View>)}</View>
            {['English 65%','Español 40%','Français 20%','Italiano 15%'].map((item, i) => <View key={item} style={styles.progressLine}><Text style={styles.progressLabel}>{item}</Text><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${65 - i*15}%` }]} /></View></View>)}
            <Link href="/progress" asChild><Pressable style={styles.moreBtn}><Text style={styles.moreBtnText}>Ver progreso completo →</Text></Pressable></Link>
          </View>
        </View>

        <View style={[styles.tvBanner, wide && styles.tvWide]}>
          <View style={styles.tvCopy}><Text style={styles.tvTitle}>Disponible en todos tus dispositivos</Text><Text style={styles.tvText}>Smart TV · Android · iOS · Tablet · Web</Text><Text style={styles.tvMotto}>Same dreams. More languages. A brighter future. Together! ♥</Text></View>
          <View style={styles.tvDevices}><Text style={styles.device}>📺</Text><Text style={styles.device}>📱</Text><Text style={styles.device}>▯</Text><Text style={styles.device}>💻</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#EAF7FF'},page:{padding:14,gap:14,maxWidth:1500,width:'100%',alignSelf:'center'},
  hero:{borderRadius:30,padding:22,backgroundColor:'#DFF3FF',borderWidth:1,borderColor:'#CBE8FF',gap:18,overflow:'hidden',shadowColor:'#2C65D8',shadowOpacity:.14,shadowRadius:20,shadowOffset:{width:0,height:8},elevation:5},heroWide:{flexDirection:'row',alignItems:'center'},
  kidsPane:{flex:.8,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'},kidBubble:{backgroundColor:'#FFD8EC',borderRadius:28,padding:10,alignItems:'center',marginRight:-8,borderWidth:4,borderColor:'#FFF'},kidBubbleBlue:{backgroundColor:'#E1D7FF',marginRight:0,marginLeft:-8},kidEmoji:{fontSize:88},kidTag:{fontWeight:'900',color:'#FF3390'},kidTagBlue:{color:'#7045FF'},
  heroCenter:{flex:1.2,alignItems:'center'},logoRow:{flexDirection:'row',alignItems:'center',flexWrap:'wrap',justifyContent:'center'},logoPink:{fontSize:42,fontWeight:'900',color:'#FF3F9C'},heart:{fontSize:30,color:'#FF3F9C',marginHorizontal:7},logoBlue:{fontSize:42,fontWeight:'900',color:'#168DFF'},logoSub:{marginTop:2,color:'#153F85',fontWeight:'900',letterSpacing:5,fontSize:12},heroTitle:{fontSize:24,fontWeight:'900',color:'#183B78',marginTop:10,textAlign:'center'},heroText:{marginTop:6,color:'#4C6594',textAlign:'center',lineHeight:20,maxWidth:520},heroButtons:{flexDirection:'row',gap:10,flexWrap:'wrap',justifyContent:'center',marginTop:16},cta:{backgroundColor:'#FF2F98',paddingVertical:14,paddingHorizontal:24,borderRadius:20,shadowColor:'#FF2F98',shadowOpacity:.3,shadowRadius:12,elevation:4},ctaText:{color:'#FFF',fontWeight:'900'},ghost:{backgroundColor:'#FFF',paddingVertical:14,paddingHorizontal:20,borderRadius:20,borderWidth:1,borderColor:'#D5E7FF'},ghostText:{color:'#18447E',fontWeight:'900'},
  worldPane:{flex:.7,alignItems:'center'},world:{fontSize:100},worldCaption:{fontWeight:'900',color:'#18447E'},worldPlaces:{fontSize:30,marginTop:6},
  languageStrip:{flexDirection:'row',flexWrap:'wrap',gap:9,backgroundColor:'rgba(255,255,255,.85)',padding:10,borderRadius:24,borderWidth:1,borderColor:'#D6EAFF'},languageChip:{flexGrow:1,minWidth:110,backgroundColor:'#F7FBFF',borderRadius:18,padding:12,alignItems:'center',borderWidth:1,borderColor:'#DFECFF'},languageFlag:{fontSize:28},languageText:{fontWeight:'900',color:'#163D7A',marginTop:4,fontSize:12},
  dashboardRow:{flexDirection:'row',gap:12,alignItems:'stretch'},stack:{flexDirection:'column'},panel:{flex:1,backgroundColor:'rgba(255,255,255,.92)',borderRadius:26,padding:18,borderWidth:1,borderColor:'#D7E9FF',shadowColor:'#2549A8',shadowOpacity:.1,shadowRadius:14,shadowOffset:{width:0,height:6},elevation:3},lessonPanel:{backgroundColor:'#DDF5FF'},scorePanel:{backgroundColor:'#F4FFF8'},gamesPanel:{backgroundColor:'#EAF7FF'},teacherPanel:{backgroundColor:'#E9F8FF'},taskPanel:{backgroundColor:'#F3F1FF'},progressPanel:{backgroundColor:'#F3FAFF'},
  panelHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',gap:10},eyebrow:{fontSize:11,fontWeight:'900',color:'#6C4BFF',letterSpacing:1},panelTitle:{fontSize:20,fontWeight:'900',color:'#173C78'},panelSub:{color:'#61749A',fontSize:12,marginTop:2},reward:{fontSize:26,color:'#FFB400'},miniBadge:{backgroundColor:'#7C49FF',color:'#FFF',fontWeight:'900',paddingHorizontal:9,paddingVertical:4,borderRadius:12},
  lessonScene:{flexDirection:'row',alignItems:'center',gap:10,marginTop:12},teacherAvatar:{fontSize:68},phraseBubble:{flex:1,backgroundColor:'#FFF',borderRadius:20,padding:15},phrase:{fontSize:22,fontWeight:'900',color:'#173C78'},translation:{marginTop:5,color:'#4E6894',fontSize:13},actionRow:{flexDirection:'row',gap:8,marginTop:12},listen:{flex:1,backgroundColor:'#10A6FF',borderRadius:18,padding:13,alignItems:'center'},listenText:{color:'#FFF',fontWeight:'900'},turn:{flex:1,backgroundColor:'#FF2F98',borderRadius:18,padding:13,alignItems:'center'},turnText:{color:'#FFF',fontWeight:'900'},
  successTitle:{fontSize:23,fontWeight:'900',color:'#20A859',textAlign:'center'},bigStars:{fontSize:42,color:'#FFB400',textAlign:'center',letterSpacing:4,marginTop:6},score:{fontSize:17,fontWeight:'900',color:'#1D477B',textAlign:'center'},scoreTrack:{height:10,borderRadius:10,backgroundColor:'#DDEEE6',marginTop:10,overflow:'hidden'},scoreFill:{width:'94%',height:'100%',backgroundColor:'#26C96D'},successBox:{marginTop:12,backgroundColor:'#E9FFF1',borderRadius:18,padding:14},successBoxTitle:{color:'#168E4D',fontWeight:'900'},successBoxText:{color:'#3B6C50',marginTop:3},nextBtn:{marginTop:12,backgroundColor:'#FF2F98',borderRadius:18,padding:13,alignItems:'center'},nextBtnText:{color:'#FFF',fontWeight:'900'},
  gameGrid:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:12},gameCard:{flexGrow:1,flexBasis:110,minWidth:100,backgroundColor:'#FFF',borderRadius:17,padding:11,alignItems:'center'},gameIcon:{fontSize:28},gameTitle:{marginTop:4,fontWeight:'900',fontSize:11,color:'#173C78',textAlign:'center'},gameCaption:{fontSize:9,color:'#7082A0',textAlign:'center',marginTop:2},moreBtn:{marginTop:12,backgroundColor:'#E7F1FF',borderRadius:16,padding:11,alignItems:'center'},moreBtnText:{color:'#194A8B',fontWeight:'900',fontSize:12},
  chatRow:{flexDirection:'row',alignItems:'center',gap:10,marginTop:12},teacherBig:{fontSize:62},chatBubble:{flex:1,backgroundColor:'#FFF',padding:13,borderRadius:18},chatText:{color:'#1D477B',fontWeight:'700',lineHeight:18},promptGrid:{flexDirection:'row',flexWrap:'wrap',gap:7,marginTop:10},prompt:{flexGrow:1,flexBasis:120,backgroundColor:'#E7F2FF',padding:9,borderRadius:14},promptText:{fontSize:10,color:'#2B5590',fontWeight:'800',textAlign:'center'},micCircle:{alignSelf:'center',width:66,height:66,borderRadius:33,backgroundColor:'#FF2F98',alignItems:'center',justifyContent:'center',marginTop:14,shadowColor:'#FF2F98',shadowOpacity:.3,shadowRadius:12,elevation:4},micText:{fontSize:28},tapText:{textAlign:'center',color:'#5C7397',fontSize:11,marginTop:5},
  stepsRow:{flexDirection:'row',gap:8,marginTop:12},step:{flex:1,alignItems:'center'},stepNumber:{backgroundColor:'#7C49FF',color:'#FFF',fontWeight:'900',width:24,height:24,borderRadius:12,textAlign:'center',lineHeight:24},stepIcon:{fontSize:24,marginTop:4,color:'#173C78'},stepLabel:{fontSize:10,color:'#234D84',fontWeight:'800',textAlign:'center'},notebook:{marginTop:12,backgroundColor:'#FFF',borderRadius:18,padding:14,borderWidth:1,borderColor:'#E5E4FF'},notebookText:{fontFamily:'monospace',color:'#294675',lineHeight:20},ctaSmall:{marginTop:12,backgroundColor:'#FF2F98',borderRadius:17,padding:12,alignItems:'center'},
  metricRow:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:12},metric:{flexGrow:1,minWidth:70,backgroundColor:'#FFF',borderRadius:15,padding:9,alignItems:'center'},metricIcon:{fontSize:20},metricValue:{fontSize:18,fontWeight:'900',color:'#173C78'},metricLabel:{fontSize:9,color:'#7184A1'},progressLine:{marginTop:10},progressLabel:{fontSize:11,fontWeight:'800',color:'#294F84'},progressTrack:{height:7,backgroundColor:'#DCE8F5',borderRadius:10,marginTop:4,overflow:'hidden'},progressFill:{height:'100%',backgroundColor:'#28A5FF',borderRadius:10},
  tvBanner:{backgroundColor:'#071C4B',borderRadius:28,padding:22,gap:14},tvWide:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},tvCopy:{flex:1},tvTitle:{color:'#FFF',fontSize:21,fontWeight:'900'},tvText:{color:'#BFD7FF',marginTop:5},tvMotto:{color:'#FFF',fontWeight:'800',marginTop:11,lineHeight:20},tvDevices:{flexDirection:'row',gap:18,justifyContent:'center'},device:{fontSize:38},
});
