import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const demoWords = ['animals', 'dog', 'cat', 'bird', 'horse'];

export default function ScanScreen() {
  const [sourceText, setSourceText] = useState('');
  const [created, setCreated] = useState(false);

  const createLesson = () => {
    if (!sourceText.trim()) return;
    setCreated(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.brand}>📸 Aprende con tu tarea</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.camera}>📷</Text>
          <Text style={styles.title}>Foto → Lección</Text>
          <Text style={styles.subtitle}>La versión final permitirá tomar una foto del cuaderno, guía o libro y convertirla en una clase personalizada.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Primera versión funcional</Text>
          <Text style={styles.cardText}>Mientras conectamos cámara + OCR real, pega aquí el texto de la tarea. El generador local crea inmediatamente una lección de práctica.</Text>
          <TextInput
            value={sourceText}
            onChangeText={(text) => { setSourceText(text); setCreated(false); }}
            multiline
            placeholder={'Ejemplo:\nAnimals\nDog\nCat\nBird\nHorse'}
            placeholderTextColor="#8CA0B3"
            style={styles.input}
          />
          <Pressable style={[styles.create, !sourceText.trim() && styles.disabled]} onPress={createLesson} disabled={!sourceText.trim()}>
            <Text style={styles.createText}>✨ CREAR LECCIÓN</Text>
          </Pressable>
        </View>

        {created && (
          <View style={styles.lesson}>
            <Text style={styles.success}>✅ Lección creada</Text>
            <Text style={styles.lessonTitle}>School Homework</Text>
            <Text style={styles.detected}>{sourceText}</Text>
            <View style={styles.wordGrid}>
              {demoWords.map((word) => <View key={word} style={styles.word}><Text style={styles.wordText}>{word}</Text></View>)}
            </View>
            <Text style={styles.helper}>Este corte demuestra el flujo de creación. El OCR real sustituirá la entrada manual y Teacher AI generará vocabulario, preguntas y juegos desde el contenido detectado.</Text>
            <Link href="/lesson" asChild><Pressable style={styles.start}><Text style={styles.startText}>👩‍🏫 EMPEZAR A APRENDER</Text></Pressable></Link>
          </View>
        )}

        <View style={styles.roadmap}>
          <Text style={styles.roadmapTitle}>Siguiente integración</Text>
          <Text style={styles.roadmapText}>1. Cámara real · 2. OCR · 3. análisis de contenido · 4. Teacher AI · 5. lección personalizada · 6. guardar en Mis Lecciones.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 18, maxWidth: 900, width: '100%', alignSelf: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#1387F2', fontWeight: '900' },
  brand: { color: '#143A63', fontWeight: '900', fontSize: 18 },
  hero: { backgroundColor: '#EAF7FF', borderRadius: 30, padding: 28, alignItems: 'center' },
  camera: { fontSize: 66 },
  title: { fontSize: 32, fontWeight: '900', color: '#143A63', marginTop: 8 },
  subtitle: { color: '#55718A', textAlign: 'center', lineHeight: 22, maxWidth: 650, marginTop: 8 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: '#E1EDF5' },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#143A63' },
  cardText: { marginTop: 6, color: '#607A90', lineHeight: 21 },
  input: { minHeight: 150, marginTop: 16, borderWidth: 1, borderColor: '#D7E6F1', backgroundColor: '#FBFDFF', borderRadius: 18, padding: 16, textAlignVertical: 'top', color: '#143A63', fontSize: 16 },
  create: { marginTop: 14, backgroundColor: '#FF4F9A', borderRadius: 17, paddingVertical: 15, alignItems: 'center' },
  disabled: { opacity: 0.45 },
  createText: { color: 'white', fontWeight: '900' },
  lesson: { backgroundColor: '#EAFBF2', borderRadius: 24, padding: 22 },
  success: { color: '#158255', fontWeight: '900' },
  lessonTitle: { color: '#143A63', fontSize: 24, fontWeight: '900', marginTop: 6 },
  detected: { color: '#52708A', marginTop: 10, lineHeight: 21 },
  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  word: { backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 13 },
  wordText: { color: '#235471', fontWeight: '800' },
  helper: { marginTop: 14, color: '#4C806A', lineHeight: 21 },
  start: { marginTop: 16, backgroundColor: '#16A66A', borderRadius: 17, paddingVertical: 14, alignItems: 'center' },
  startText: { color: 'white', fontWeight: '900' },
  roadmap: { backgroundColor: '#FFF4D8', borderRadius: 22, padding: 20 },
  roadmapTitle: { color: '#805A00', fontWeight: '900' },
  roadmapText: { color: '#806E40', marginTop: 6, lineHeight: 21 },
});
