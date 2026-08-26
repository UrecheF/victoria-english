import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeworkImage = {
  uri: string;
  width?: number;
  height?: number;
  fileName?: string | null;
};

function extractVocabulary(text: string) {
  const words = text
    .toLowerCase()
    .replace(/[^a-zA-ZÀ-ÿ'\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3);

  return [...new Set(words)].slice(0, 10);
}

export default function ScanScreen() {
  const [image, setImage] = useState<HomeworkImage | null>(null);
  const [sourceText, setSourceText] = useState('');
  const [created, setCreated] = useState(false);
  const vocabulary = useMemo(() => extractVocabulary(sourceText), [sourceText]);

  const resetLesson = () => setCreated(false);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso de cámara', 'Necesitamos la cámara para fotografiar la tarea.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImage({ uri: asset.uri, width: asset.width, height: asset.height, fileName: asset.fileName });
      resetLesson();
    }
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImage({ uri: asset.uri, width: asset.width, height: asset.height, fileName: asset.fileName });
      resetLesson();
    }
  };

  const createLesson = () => {
    if (!sourceText.trim()) {
      Alert.alert('Falta el texto', 'Escribe o pega el texto visible en la tarea para crear esta primera versión de la lección.');
      return;
    }
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
          <Text style={styles.camera}>📷✨</Text>
          <Text style={styles.title}>Convierte la tarea en una clase</Text>
          <Text style={styles.subtitle}>Fotografía el cuaderno o elige una imagen. La app ya captura y conserva la foto; el siguiente servicio será OCR + Teacher AI para leerla automáticamente.</Text>
        </View>

        <View style={styles.captureCard}>
          <Text style={styles.cardTitle}>1 · Agrega la tarea</Text>
          <View style={styles.captureActions}>
            <Pressable style={styles.cameraButton} onPress={takePhoto}><Text style={styles.cameraButtonText}>📷 TOMAR FOTO</Text></Pressable>
            <Pressable style={styles.galleryButton} onPress={choosePhoto}><Text style={styles.galleryButtonText}>🖼️ ELEGIR FOTO</Text></Pressable>
          </View>

          {image ? (
            <View style={styles.previewWrap}>
              <Image source={{ uri: image.uri }} style={styles.preview} contentFit="contain" transition={180} />
              <View style={styles.previewMeta}>
                <Text style={styles.ready}>✅ Imagen lista</Text>
                <Text style={styles.metaText}>{image.fileName || 'Tarea capturada'}{image.width && image.height ? ` · ${image.width}×${image.height}` : ''}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyPreview}><Text style={styles.emptyIcon}>📄</Text><Text style={styles.emptyText}>Aún no has agregado una foto.</Text></View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.stepHeader}>
            <Text style={styles.cardTitle}>2 · Texto de la tarea</Text>
            <View style={styles.pendingBadge}><Text style={styles.pendingText}>OCR REAL · SIGUIENTE CORTE</Text></View>
          </View>
          <Text style={styles.cardText}>Por ahora transcribe o pega aquí lo que aparece en la foto. No simulamos OCR: cuando conectemos el backend, este campo se llenará automáticamente desde la imagen.</Text>
          <TextInput
            value={sourceText}
            onChangeText={(text) => { setSourceText(text); resetLesson(); }}
            multiline
            placeholder={'Ejemplo:\nAnimals\nDog\nCat\nBird\nHorse'}
            placeholderTextColor="#8CA0B3"
            style={styles.input}
          />
          <Pressable style={[styles.create, !sourceText.trim() && styles.disabled]} onPress={createLesson} disabled={!sourceText.trim()}>
            <Text style={styles.createText}>✨ CREAR BORRADOR DE LECCIÓN</Text>
          </Pressable>
        </View>

        {created && (
          <View style={styles.lesson}>
            <Text style={styles.success}>✅ Borrador creado en el dispositivo</Text>
            <Text style={styles.lessonTitle}>Mi tarea escolar</Text>
            <Text style={styles.detected}>{sourceText}</Text>

            <Text style={styles.subTitle}>Vocabulario detectado localmente</Text>
            <View style={styles.wordGrid}>
              {vocabulary.length > 0
                ? vocabulary.map((word) => <View key={word} style={styles.word}><Text style={styles.wordText}>{word}</Text></View>)
                : <Text style={styles.helper}>Escribe varias palabras para generar vocabulario.</Text>}
            </View>

            <View style={styles.activityGrid}>
              <View style={styles.activity}><Text style={styles.activityIcon}>🔊</Text><Text style={styles.activityTitle}>Escucha y repite</Text><Text style={styles.activityText}>Pronunciación guiada del vocabulario.</Text></View>
              <View style={styles.activity}><Text style={styles.activityIcon}>🧩</Text><Text style={styles.activityTitle}>Une palabras</Text><Text style={styles.activityText}>Juego visual para reforzar memoria.</Text></View>
              <View style={styles.activity}><Text style={styles.activityIcon}>🎤</Text><Text style={styles.activityTitle}>Di la respuesta</Text><Text style={styles.activityText}>Preparado para evaluación de voz.</Text></View>
            </View>

            <Text style={styles.helper}>Teacher AI real sustituirá esta generación local para crear explicaciones, imágenes, preguntas y juegos adaptados a la edad y al idioma elegido.</Text>
            <Link href="/teacher" asChild><Pressable style={styles.teacher}><Text style={styles.teacherText}>🤖 CONTINUAR CON TEACHER AI</Text></Pressable></Link>
            <Link href="/lesson" asChild><Pressable style={styles.start}><Text style={styles.startText}>👩‍🏫 ABRIR LECCIÓN DE PRÁCTICA</Text></Pressable></Link>
          </View>
        )}

        <View style={styles.roadmap}>
          <Text style={styles.roadmapTitle}>Pipeline que estamos construyendo</Text>
          <Text style={styles.roadmapText}>📷 Cámara/galería ✅ → OCR seguro → análisis con IA → lección personalizada → juego automático → guardar en Mis Lecciones → progreso del perfil.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFF' },
  page: { padding: 20, gap: 18, maxWidth: 960, width: '100%', alignSelf: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  back: { color: '#1387F2', fontWeight: '900' },
  brand: { color: '#143A63', fontWeight: '900', fontSize: 18 },
  hero: { backgroundColor: '#EAF7FF', borderRadius: 30, padding: 28, alignItems: 'center' },
  camera: { fontSize: 66 },
  title: { fontSize: 32, fontWeight: '900', color: '#143A63', marginTop: 8, textAlign: 'center' },
  subtitle: { color: '#55718A', textAlign: 'center', lineHeight: 22, maxWidth: 700, marginTop: 8 },
  captureCard: { backgroundColor: 'white', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: '#E1EDF5' },
  captureActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  cameraButton: { flexGrow: 1, minWidth: 180, backgroundColor: '#1387F2', borderRadius: 17, paddingVertical: 15, alignItems: 'center' },
  cameraButtonText: { color: 'white', fontWeight: '900' },
  galleryButton: { flexGrow: 1, minWidth: 180, backgroundColor: '#EEF7FF', borderRadius: 17, paddingVertical: 15, alignItems: 'center', borderWidth: 1, borderColor: '#CFE5F7' },
  galleryButtonText: { color: '#1567A9', fontWeight: '900' },
  previewWrap: { marginTop: 16, borderRadius: 20, overflow: 'hidden', backgroundColor: '#F4F9FC', borderWidth: 1, borderColor: '#DDEAF3' },
  preview: { width: '100%', height: 310, backgroundColor: '#EDF5FA' },
  previewMeta: { padding: 12 },
  ready: { color: '#158255', fontWeight: '900' },
  metaText: { color: '#6A8298', marginTop: 3, fontSize: 12 },
  emptyPreview: { marginTop: 16, minHeight: 150, borderRadius: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CFE0EC', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFDFF' },
  emptyIcon: { fontSize: 40 },
  emptyText: { color: '#7790A5', marginTop: 6 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: '#E1EDF5' },
  stepHeader: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#143A63' },
  pendingBadge: { backgroundColor: '#FFF4D8', borderRadius: 99, paddingVertical: 5, paddingHorizontal: 10 },
  pendingText: { color: '#8B6500', fontWeight: '900', fontSize: 10 },
  cardText: { marginTop: 7, color: '#607A90', lineHeight: 21 },
  input: { minHeight: 150, marginTop: 16, borderWidth: 1, borderColor: '#D7E6F1', backgroundColor: '#FBFDFF', borderRadius: 18, padding: 16, textAlignVertical: 'top', color: '#143A63', fontSize: 16 },
  create: { marginTop: 14, backgroundColor: '#FF4F9A', borderRadius: 17, paddingVertical: 15, alignItems: 'center' },
  disabled: { opacity: 0.45 },
  createText: { color: 'white', fontWeight: '900' },
  lesson: { backgroundColor: '#EAFBF2', borderRadius: 24, padding: 22 },
  success: { color: '#158255', fontWeight: '900' },
  lessonTitle: { color: '#143A63', fontSize: 24, fontWeight: '900', marginTop: 6 },
  detected: { color: '#52708A', marginTop: 10, lineHeight: 21, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: 12 },
  subTitle: { color: '#235471', fontWeight: '900', marginTop: 18 },
  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  word: { backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 13 },
  wordText: { color: '#235471', fontWeight: '800' },
  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 18 },
  activity: { flexGrow: 1, flexBasis: 180, backgroundColor: 'white', borderRadius: 18, padding: 16 },
  activityIcon: { fontSize: 27 },
  activityTitle: { color: '#143A63', fontWeight: '900', marginTop: 8 },
  activityText: { color: '#688099', lineHeight: 19, marginTop: 4, fontSize: 13 },
  helper: { marginTop: 14, color: '#4C806A', lineHeight: 21 },
  teacher: { marginTop: 16, backgroundColor: '#7C4DFF', borderRadius: 17, paddingVertical: 14, alignItems: 'center' },
  teacherText: { color: 'white', fontWeight: '900' },
  start: { marginTop: 10, backgroundColor: '#16A66A', borderRadius: 17, paddingVertical: 14, alignItems: 'center' },
  startText: { color: 'white', fontWeight: '900' },
  roadmap: { backgroundColor: '#FFF4D8', borderRadius: 22, padding: 20 },
  roadmapTitle: { color: '#805A00', fontWeight: '900' },
  roadmapText: { color: '#806E40', marginTop: 6, lineHeight: 21 },
});
