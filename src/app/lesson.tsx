import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Phrase = { text: string; translation: string };

const lessons: Phrase[] = [
  { text: 'Good morning, everyone!', translation: '¡Buenos días a todos!' },
  { text: 'Aloha! Welcome to Hawaii!', translation: '¡Aloha! ¡Bienvenidos a Hawái!' },
  { text: 'Today we will show you some beautiful parts of Hawaiian culture.', translation: 'Hoy les mostraremos algunas partes hermosas de la cultura hawaiana.' },
  { text: 'You will see animals, food, traditional clothes, music, and dance.', translation: 'Verán animales, comida, ropa tradicional, música y danza.' },
  { text: 'We hope you enjoy our presentation. Mahalo!', translation: 'Esperamos que disfruten nuestra presentación. ¡Mahalo!' },
];

function speakWeb(text: string) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.78;
  synth.speak(utterance);
  return true;
}

export default function LessonScreen() {
  const [step, setStep] = useState(0);
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState('Escucha primero y luego practica.');
  const phrase = lessons[step];
  const progress = useMemo(() => `${Math.round(((step + 1) / lessons.length) * 100)}%`, [step]);

  const listen = () => {
    const ok = speakWeb(phrase.text);
    setMessage(ok ? '🔊 Escucha con atención y repite el ritmo.' : '🔊 Audio web listo. La voz nativa móvil entra en la siguiente fase.');
  };

  const practice = () => {
    const nextStars = Math.min(3, stars + 1);
    setStars(nextStars);
    setMessage(nextStars === 3 ? '🎉 ¡Excelente! Ya puedes continuar.' : '🌟 ¡Muy bien! Repite una vez más.');
  };

  const next = () => {
    if (step < lessons.length - 1) {
      setStep(step + 1);
      setStars(0);
      setMessage('Escucha primero y luego practica.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.brand}>Alana ♥ Victoria</Text>
          <Text style={styles.counter}>{step + 1}/{lessons.length}</Text>
        </View>

        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: progress }]} /></View>

        <View style={styles.scene}>
          <Text style={styles.sceneEmoji}>🌺👩‍🏫🌴</Text>
          <Text style={styles.lessonLabel}>LECCIÓN 1 · HAWAII PRESENTATION</Text>
          <Text style={styles.phrase}>{phrase.text}</Text>
          <Text style={styles.translation}>{phrase.translation}</Text>

          <View style={styles.buttonRow}>
            <Pressable style={styles.listenButton} onPress={listen}>
              <Text style={styles.listenText}>🔊 ESCUCHAR</Text>
            </Pressable>
            <Pressable style={styles.speakButton} onPress={practice}>
              <Text style={styles.speakText}>🎤 MI TURNO</Text>
            </Pressable>
          </View>

          <View style={styles.stars}>
            {[1, 2, 3].map((n) => <Text key={n} style={styles.star}>{n <= stars ? '★' : '☆'}</Text>)}
          </View>
          <Text style={styles.message}>{message}</Text>

          {stars === 3 && step < lessons.length - 1 && (
            <Pressable style={styles.nextButton} onPress={next}><Text style={styles.nextText}>SIGUIENTE →</Text></Pressable>
          )}
          {stars === 3 && step === lessons.length - 1 && (
            <View style={styles.complete}><Text style={styles.completeEmoji}>🏆</Text><Text style={styles.completeTitle}>¡Lección completada!</Text><Text style={styles.completeText}>Ganaste 15 estrellas y desbloqueaste un juego.</Text></View>
          )}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Cómo aprenderemos</Text>
          <Text style={styles.tipText}>Escuchar → repetir → recibir ayuda → ganar estrellas → jugar → volver a practicar lo difícil.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 18, width: '100%', maxWidth: 980, alignSelf: 'center' },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { color: '#1387F2', fontWeight: '900' },
  brand: { color: '#143A63', fontWeight: '900', fontSize: 18 },
  counter: { color: '#6B8297', fontWeight: '800' },
  progressTrack: { height: 10, backgroundColor: '#DCEAF5', borderRadius: 20, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FF4F9A', borderRadius: 20 },
  scene: { backgroundColor: 'white', borderRadius: 32, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#E0EDF6' },
  sceneEmoji: { fontSize: 62 },
  lessonLabel: { marginTop: 10, color: '#1387F2', fontSize: 12, letterSpacing: 1.2, fontWeight: '900' },
  phrase: { marginTop: 22, fontSize: 34, lineHeight: 43, fontWeight: '900', color: '#143A63', textAlign: 'center', maxWidth: 760 },
  translation: { marginTop: 10, fontSize: 18, color: '#698198', textAlign: 'center' },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 },
  listenButton: { backgroundColor: '#1387F2', paddingVertical: 15, paddingHorizontal: 24, borderRadius: 18 },
  listenText: { color: 'white', fontWeight: '900' },
  speakButton: { backgroundColor: '#FF4F9A', paddingVertical: 15, paddingHorizontal: 24, borderRadius: 18 },
  speakText: { color: 'white', fontWeight: '900' },
  stars: { flexDirection: 'row', marginTop: 22 },
  star: { fontSize: 42, color: '#FFB81C', marginHorizontal: 4 },
  message: { marginTop: 8, color: '#506B84', textAlign: 'center', fontWeight: '700' },
  nextButton: { marginTop: 20, backgroundColor: '#16A66A', borderRadius: 18, paddingVertical: 14, paddingHorizontal: 28 },
  nextText: { color: 'white', fontWeight: '900' },
  complete: { marginTop: 22, backgroundColor: '#EAFBF2', borderRadius: 22, padding: 20, width: '100%', alignItems: 'center' },
  completeEmoji: { fontSize: 44 },
  completeTitle: { color: '#14734C', fontSize: 22, fontWeight: '900', marginTop: 4 },
  completeText: { color: '#4C806A', marginTop: 5, textAlign: 'center' },
  tipCard: { backgroundColor: '#FFF4D8', borderRadius: 22, padding: 20 },
  tipTitle: { color: '#805A00', fontWeight: '900', fontSize: 18 },
  tipText: { color: '#806E40', marginTop: 6, lineHeight: 21 },
});
