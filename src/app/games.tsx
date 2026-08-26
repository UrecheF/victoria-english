import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const answers = [
  { label: 'A Fish', correct: false },
  { label: 'A Turtle', correct: true },
  { label: 'A Dolphin', correct: false },
];

export default function GamesScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = useMemo(() => answers.find((item) => item.label === selected), [selected]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.brand}>🎮 Juegos</Text>
          <Text style={styles.points}>⭐ 27</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🐢</Text>
          <Text style={styles.heroTitle}>What animal is this?</Text>
          <Text style={styles.heroSubtitle}>Escoge la respuesta correcta</Text>

          <View style={styles.answerList}>
            {answers.map((answer) => {
              const active = selected === answer.label;
              const good = active && answer.correct;
              const bad = active && !answer.correct;
              return (
                <Pressable
                  key={answer.label}
                  onPress={() => setSelected(answer.label)}
                  style={[styles.answer, good && styles.goodAnswer, bad && styles.badAnswer]}
                >
                  <Text style={[styles.answerText, good && styles.goodText, bad && styles.badText]}>
                    {answer.label} {good ? '✓' : bad ? '↻' : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {result && (
            <View style={[styles.feedback, result.correct ? styles.feedbackGood : styles.feedbackTry]}>
              <Text style={styles.feedbackTitle}>{result.correct ? '🎉 Excellent!' : '💪 Almost!'}</Text>
              <Text style={styles.feedbackText}>{result.correct ? 'Turtle significa tortuga. Ganaste una estrella.' : 'Mira la imagen y vuelve a intentarlo.'}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Más juegos</Text>
        <View style={styles.grid}>
          {[
            ['🧠', 'Memoria', 'Encuentra las parejas'],
            ['🔊', 'Escucha y elige', 'Reconoce palabras por audio'],
            ['🧩', 'Puzzle', 'Arma palabras e imágenes'],
            ['🎤', 'Pronunciación', 'Habla y gana estrellas'],
            ['🔤', 'Construye la palabra', 'Ordena letras'],
            ['🖼️', 'Encuentra la imagen', 'Conecta palabra y objeto'],
          ].map(([icon, title, caption]) => (
            <View key={title} style={styles.gameCard}>
              <Text style={styles.gameIcon}>{icon}</Text>
              <Text style={styles.gameTitle}>{title}</Text>
              <Text style={styles.gameCaption}>{caption}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 20, width: '100%', maxWidth: 1000, alignSelf: 'center' },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { color: '#1387F2', fontWeight: '900' },
  brand: { color: '#143A63', fontWeight: '900', fontSize: 20 },
  points: { color: '#D68A00', fontWeight: '900' },
  hero: { backgroundColor: '#EAF7FF', borderRadius: 30, padding: 28, alignItems: 'center' },
  heroEmoji: { fontSize: 92 },
  heroTitle: { marginTop: 8, fontSize: 30, fontWeight: '900', color: '#143A63', textAlign: 'center' },
  heroSubtitle: { marginTop: 5, color: '#5F7A91' },
  answerList: { width: '100%', maxWidth: 520, marginTop: 22, gap: 10 },
  answer: { backgroundColor: 'white', borderRadius: 17, paddingVertical: 14, paddingHorizontal: 18, borderWidth: 2, borderColor: '#DCEAF5' },
  goodAnswer: { backgroundColor: '#E9FAF1', borderColor: '#21B66F' },
  badAnswer: { backgroundColor: '#FFF2F4', borderColor: '#FF759C' },
  answerText: { color: '#244865', fontWeight: '900', textAlign: 'center', fontSize: 16 },
  goodText: { color: '#168453' },
  badText: { color: '#C94F72' },
  feedback: { width: '100%', maxWidth: 520, marginTop: 16, borderRadius: 18, padding: 16 },
  feedbackGood: { backgroundColor: '#E9FAF1' },
  feedbackTry: { backgroundColor: '#FFF3D9' },
  feedbackTitle: { fontSize: 18, fontWeight: '900', color: '#143A63' },
  feedbackText: { marginTop: 4, color: '#587087' },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: '#143A63' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gameCard: { flexGrow: 1, flexBasis: 220, minWidth: 190, backgroundColor: 'white', borderRadius: 22, padding: 20, borderWidth: 1, borderColor: '#E1EDF6' },
  gameIcon: { fontSize: 38 },
  gameTitle: { marginTop: 10, fontWeight: '900', color: '#143A63', fontSize: 17 },
  gameCaption: { marginTop: 4, color: '#6B8297', lineHeight: 19 },
});
