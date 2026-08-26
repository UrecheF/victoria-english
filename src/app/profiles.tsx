import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profiles = [
  { name: 'Alana', icon: '👧', level: 'Little Explorer', color: '#FFE4F1' },
  { name: 'Victoria', icon: '👧🏻', level: 'Young Learner', color: '#E5F2FF' },
];

export default function ProfilesScreen() {
  const [selected, setSelected] = useState('Victoria');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.title}>Perfiles</Text>
        </View>

        <Text style={styles.heading}>¿Quién va a aprender hoy?</Text>
        <Text style={styles.subheading}>Cada perfil tendrá su propio idioma, progreso, estrellas, dificultad y recomendaciones.</Text>

        <View style={styles.grid}>
          {profiles.map((profile) => {
            const active = selected === profile.name;
            return (
              <Pressable key={profile.name} onPress={() => setSelected(profile.name)} style={[styles.card, { backgroundColor: profile.color }, active && styles.active]}>
                <Text style={styles.icon}>{profile.icon}</Text>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.level}>{profile.level}</Text>
                <Text style={styles.check}>{active ? '✓ Perfil activo' : 'Tocar para elegir'}</Text>
              </Pressable>
            );
          })}
        </View>

        <Link href="/lesson" asChild>
          <Pressable style={styles.continue}><Text style={styles.continueText}>CONTINUAR COMO {selected.toUpperCase()} →</Text></Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { flex: 1, padding: 20, gap: 18, width: '100%', maxWidth: 900, alignSelf: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#1387F2', fontWeight: '900' },
  title: { color: '#143A63', fontWeight: '900', fontSize: 18 },
  heading: { fontSize: 32, lineHeight: 38, fontWeight: '900', color: '#143A63', textAlign: 'center', marginTop: 25 },
  subheading: { color: '#607A90', textAlign: 'center', lineHeight: 22, maxWidth: 650, alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 12 },
  card: { flexGrow: 1, flexBasis: 280, borderRadius: 28, padding: 28, alignItems: 'center', borderWidth: 3, borderColor: 'transparent' },
  active: { borderColor: '#FF4F9A' },
  icon: { fontSize: 72 },
  name: { marginTop: 8, fontSize: 27, fontWeight: '900', color: '#143A63' },
  level: { marginTop: 4, color: '#55718A', fontWeight: '700' },
  check: { marginTop: 14, color: '#FF4F9A', fontWeight: '900' },
  continue: { marginTop: 'auto', backgroundColor: '#1387F2', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  continueText: { color: 'white', fontWeight: '900' },
});
