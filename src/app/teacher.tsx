import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const quickPrompts = ['Explícame una palabra', 'Practiquemos conversación', 'Cuéntame una historia', 'Dame un reto'];

export default function TeacherScreen() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Hi! Soy tu Teacher AI. Puedo ayudarte a practicar idiomas paso a paso.');

  const send = (value = message) => {
    const clean = value.trim();
    if (!clean) return;
    setReply(`✨ Entendí: “${clean}”. El modo IA real se conectará a un backend seguro; por ahora esta pantalla valida el flujo y la experiencia.`);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}>
          <Link href="/" asChild><Pressable><Text style={styles.back}>← Inicio</Text></Pressable></Link>
          <Text style={styles.brand}>Alana ♥ Victoria</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.avatar}>👩‍🏫</Text>
          <Text style={styles.title}>Teacher AI</Text>
          <Text style={styles.subtitle}>Tu profesora para aprender hablando, escuchando, jugando y preguntando.</Text>
          <View style={styles.reply}><Text style={styles.replyText}>{reply}</Text></View>
        </View>

        <View style={styles.quickGrid}>
          {quickPrompts.map((prompt) => (
            <Pressable key={prompt} style={styles.quick} onPress={() => send(prompt)}>
              <Text style={styles.quickText}>{prompt}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.composer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe qué quieres aprender..."
            placeholderTextColor="#7890A5"
            style={styles.input}
            onSubmitEditing={() => send()}
          />
          <Pressable style={styles.send} onPress={() => send()}><Text style={styles.sendText}>ENVIAR</Text></Pressable>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteTitle}>🔒 IA preparada correctamente</Text>
          <Text style={styles.noteText}>La clave del proveedor de IA nunca debe ir dentro de la app. El siguiente paso será conectar esta interfaz a un backend seguro con filtros infantiles y perfiles por edad.</Text>
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
  hero: { backgroundColor: '#EAF7FF', borderRadius: 30, padding: 28, alignItems: 'center' },
  avatar: { fontSize: 76 },
  title: { marginTop: 8, fontSize: 34, fontWeight: '900', color: '#143A63' },
  subtitle: { marginTop: 8, color: '#53708A', textAlign: 'center', fontSize: 16, lineHeight: 23, maxWidth: 650 },
  reply: { marginTop: 20, backgroundColor: 'white', borderRadius: 20, padding: 18, width: '100%' },
  replyText: { color: '#34566F', fontSize: 16, lineHeight: 23 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quick: { flexGrow: 1, flexBasis: 180, backgroundColor: 'white', borderWidth: 1, borderColor: '#DFECF5', borderRadius: 18, padding: 16 },
  quickText: { color: '#24506E', fontWeight: '800', textAlign: 'center' },
  composer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  input: { flex: 1, minHeight: 52, backgroundColor: 'white', borderWidth: 1, borderColor: '#D9E8F3', borderRadius: 17, paddingHorizontal: 16, color: '#143A63' },
  send: { backgroundColor: '#FF4F9A', borderRadius: 17, paddingVertical: 17, paddingHorizontal: 18 },
  sendText: { color: 'white', fontWeight: '900' },
  note: { backgroundColor: '#FFF4D8', borderRadius: 22, padding: 20 },
  noteTitle: { color: '#805A00', fontWeight: '900', fontSize: 17 },
  noteText: { color: '#806E40', marginTop: 6, lineHeight: 21 },
});
