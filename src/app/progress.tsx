import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const metrics = [
  { icon: '⭐', value: '27', label: 'Estrellas' },
  { icon: '🔥', value: '5', label: 'Días seguidos' },
  { icon: '📚', value: '8', label: 'Lecciones' },
  { icon: '🏆', value: '3', label: 'Logros' },
];

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.brand}>Mi progreso</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.avatar}>👧🏻</Text>
          <View style={styles.heroCopy}>
            <Text style={styles.name}>Victoria</Text>
            <Text style={styles.level}>Nivel 3 · Young Learner</Text>
            <View style={styles.track}><View style={styles.fill} /></View>
            <Text style={styles.progressText}>3/10 para subir de nivel</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {metrics.map((item) => (
            <View key={item.label} style={styles.metric}>
              <Text style={styles.metricIcon}>{item.icon}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Para practicar</Text>
          <Text style={styles.cardText}>La app irá guardando automáticamente palabras difíciles, pronunciación y errores frecuentes.</Text>
          <View style={styles.words}><Text style={styles.word}>everyone</Text><Text style={styles.word}>traditional</Text><Text style={styles.word}>culture</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Esta semana</Text>
          <Text style={styles.cardText}>4 sesiones · 32 minutos · 18 palabras nuevas · 2 juegos completados.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 18, width: '100%', maxWidth: 900, alignSelf: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#1387F2', fontWeight: '900' },
  brand: { color: '#143A63', fontWeight: '900', fontSize: 18 },
  hero: { backgroundColor: '#EAF7FF', borderRadius: 28, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 18 },
  avatar: { fontSize: 72 },
  heroCopy: { flex: 1 },
  name: { fontSize: 28, fontWeight: '900', color: '#143A63' },
  level: { color: '#55718A', marginTop: 3 },
  track: { height: 10, borderRadius: 20, backgroundColor: '#D6E6F2', marginTop: 15, overflow: 'hidden' },
  fill: { width: '30%', height: '100%', backgroundColor: '#FF4F9A' },
  progressText: { color: '#6B8297', fontSize: 12, marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metric: { flexGrow: 1, flexBasis: 150, minWidth: 140, backgroundColor: 'white', borderRadius: 22, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#E0EDF6' },
  metricIcon: { fontSize: 30 },
  metricValue: { fontSize: 25, fontWeight: '900', color: '#143A63', marginTop: 4 },
  metricLabel: { color: '#688099', marginTop: 2 },
  card: { backgroundColor: 'white', borderRadius: 22, padding: 20, borderWidth: 1, borderColor: '#E0EDF6' },
  cardTitle: { color: '#143A63', fontSize: 19, fontWeight: '900' },
  cardText: { color: '#607A90', lineHeight: 21, marginTop: 6 },
  words: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  word: { backgroundColor: '#FFF0D7', color: '#885E16', paddingVertical: 7, paddingHorizontal: 11, borderRadius: 12, fontWeight: '800' },
});
