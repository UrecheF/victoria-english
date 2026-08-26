import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages = [
  { flag: '🇺🇸', name: 'English', color: '#DDF1FF' },
  { flag: '🇫🇷', name: 'Français', color: '#FFE2ED' },
  { flag: '🇮🇹', name: 'Italiano', color: '#E4F8E8' },
  { flag: '🇪🇸', name: 'Español', color: '#FFF0D7' },
  { flag: '🇩🇪', name: 'Deutsch', color: '#F2ECFF' },
  { flag: '🇵🇹', name: 'Português', color: '#E7F8F1' },
];

const ages = [
  { icon: '🧸', label: '2–4', caption: 'Little Explorer' },
  { icon: '🎨', label: '5–7', caption: 'Young Learner' },
  { icon: '🚀', label: '8–11', caption: 'Junior Student' },
  { icon: '🌟', label: '12+', caption: 'Teen & Adult' },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={[styles.hero, wide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <View style={styles.brandRow}>
              <Text style={styles.brandAlana}>Alana</Text>
              <Text style={styles.heart}>♥</Text>
              <Text style={styles.brandVictoria}>Victoria</Text>
            </View>
            <Text style={styles.kicker}>LANGUAGES FOR A BRIGHTER FUTURE</Text>
            <Text style={styles.heroTitle}>Aprender idiomas debe sentirse como jugar.</Text>
            <Text style={styles.heroBody}>
              Lecciones visuales, juegos, voz, retos y una profesora con IA que acompaña a cada estudiante según su edad.
            </Text>

            <View style={styles.actions}>
              <Link href="/lesson" asChild>
                <Pressable style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>▶  COMENZAR</Text>
                </Pressable>
              </Link>
              <Link href="/games" asChild>
                <Pressable style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>🎮  JUEGOS</Text>
                </Pressable>
              </Link>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}><Text style={styles.statNumber}>27</Text><Text style={styles.statLabel}>⭐ estrellas</Text></View>
              <View style={styles.stat}><Text style={styles.statNumber}>5</Text><Text style={styles.statLabel}>🔥 días</Text></View>
              <View style={styles.stat}><Text style={styles.statNumber}>8</Text><Text style={styles.statLabel}>📚 lecciones</Text></View>
            </View>
          </View>

          <View style={styles.teacherCard}>
            <Text style={styles.teacherEmoji}>👩‍🏫</Text>
            <Text style={styles.teacherTitle}>Tu profesora IA</Text>
            <Text style={styles.teacherText}>“Hi! What would you like to learn today?”</Text>
            <View style={styles.wave}><Text style={styles.waveText}>▂▄▆█▆▄▂ ▂▅▇▅▂</Text></View>
            <Text style={styles.teacherHint}>🎤 Toca para hablar</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Elige un idioma</Text>
        <View style={styles.grid}>
          {languages.map((language) => (
            <View key={language.name} style={[styles.languageCard, { backgroundColor: language.color }]}>
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={styles.languageName}>{language.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Una experiencia para cada edad</Text>
        <View style={styles.grid}>
          {ages.map((age) => (
            <View key={age.label} style={styles.ageCard}>
              <Text style={styles.ageIcon}>{age.icon}</Text>
              <Text style={styles.ageLabel}>{age.label}</Text>
              <Text style={styles.ageCaption}>{age.caption}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tvBanner}>
          <Text style={styles.tvIcon}>📺</Text>
          <View style={styles.tvCopy}>
            <Text style={styles.tvTitle}>Modo TV y pantalla grande</Text>
            <Text style={styles.tvText}>Interfaz grande, controles simples y sesiones familiares pensadas para Smart TV, tablet, móvil y web.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 22, maxWidth: 1180, width: '100%', alignSelf: 'center' },
  hero: { backgroundColor: '#EAF7FF', borderRadius: 32, padding: 24, gap: 22, overflow: 'hidden' },
  heroWide: { flexDirection: 'row', alignItems: 'center', padding: 36 },
  heroCopy: { flex: 1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  brandAlana: { fontSize: 34, fontWeight: '900', color: '#FF4F9A' },
  heart: { fontSize: 23, marginHorizontal: 8, color: '#FF4F9A' },
  brandVictoria: { fontSize: 34, fontWeight: '900', color: '#1387F2' },
  kicker: { marginTop: 4, fontSize: 11, fontWeight: '900', letterSpacing: 1.4, color: '#345A7C' },
  heroTitle: { marginTop: 18, fontSize: 36, lineHeight: 42, fontWeight: '900', color: '#143A63' },
  heroBody: { marginTop: 12, fontSize: 17, lineHeight: 25, color: '#496987', maxWidth: 650 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 22 },
  primaryButton: { backgroundColor: '#FF4F9A', paddingVertical: 15, paddingHorizontal: 22, borderRadius: 18 },
  primaryButtonText: { color: 'white', fontWeight: '900', fontSize: 15 },
  secondaryButton: { backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 22, borderRadius: 18, borderWidth: 1, borderColor: '#D6E8F5' },
  secondaryButtonText: { color: '#1567A9', fontWeight: '900', fontSize: 15 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 },
  stat: { backgroundColor: 'rgba(255,255,255,0.75)', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 15 },
  statNumber: { fontWeight: '900', color: '#143A63', fontSize: 18 },
  statLabel: { color: '#52708B', fontSize: 12 },
  teacherCard: { flex: 0.75, minWidth: 260, backgroundColor: 'white', borderRadius: 28, padding: 24, alignItems: 'center', justifyContent: 'center' },
  teacherEmoji: { fontSize: 74 },
  teacherTitle: { marginTop: 8, fontSize: 21, fontWeight: '900', color: '#143A63' },
  teacherText: { marginTop: 8, color: '#53708A', textAlign: 'center', fontSize: 15, lineHeight: 22 },
  wave: { marginTop: 18, backgroundColor: '#EAF7FF', paddingVertical: 9, paddingHorizontal: 15, borderRadius: 16 },
  waveText: { color: '#1387F2', letterSpacing: 2 },
  teacherHint: { marginTop: 10, color: '#FF4F9A', fontWeight: '800' },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: '#143A63', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  languageCard: { minWidth: 145, flexGrow: 1, flexBasis: 150, borderRadius: 22, padding: 18, alignItems: 'center' },
  languageFlag: { fontSize: 38 },
  languageName: { marginTop: 8, fontWeight: '900', color: '#244865' },
  ageCard: { minWidth: 150, flexGrow: 1, flexBasis: 160, backgroundColor: 'white', borderRadius: 22, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#E2EEF7' },
  ageIcon: { fontSize: 40 },
  ageLabel: { marginTop: 8, fontSize: 18, fontWeight: '900', color: '#143A63' },
  ageCaption: { marginTop: 3, color: '#688099', fontSize: 12 },
  tvBanner: { backgroundColor: '#143A63', borderRadius: 26, padding: 22, flexDirection: 'row', alignItems: 'center', gap: 16 },
  tvIcon: { fontSize: 44 },
  tvCopy: { flex: 1 },
  tvTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
  tvText: { color: '#CDE5F7', marginTop: 4, lineHeight: 20 },
});
