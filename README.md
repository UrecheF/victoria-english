# Alana & Victoria Languages

Aplicación educativa de idiomas para niños, familias y adultos. La experiencia busca que aprender se sienta como jugar: lecciones visuales, Teacher AI, juegos, tarea con cámara, progreso y perfiles personalizados.

## Estado actual

### Diseño premium implementado

La interfaz fue rediseñada tomando como referencia el mockup visual aprobado:

- Navegación superior responsive con Inicio, Lecciones, Juegos, Teacher AI, Mi Tarea, Progreso y Perfiles.
- Identidad **Alana ♥ Victoria Languages** con paleta cielo, rosa, azul, morado, verde y dorado.
- Home tipo dashboard con hero, perfiles visuales, idiomas, primera lección, Teacher AI, juegos, tarea, progreso y dispositivos.
- Lección Hawaii con panel de profesor, globo de frase, escucha, turno del estudiante, estrellas, progreso y timeline de frases.
- Teacher AI con avatar, estado online, chat, prompts rápidos y micrófono visual.
- Juegos con categorías, tarjetas visuales, XP y reto del día.
- Mi Tarea con cámara/galería real, vista previa, pipeline visual y borrador local de lección.
- Perfiles Alana/Victoria con selección visual y experiencia personalizada.
- Progreso con métricas, idiomas, logros, práctica y resumen semanal.
- Diseño adaptable a móvil, tablet, web y pantallas grandes.

### Funcionalidad disponible

- Primera lección **Hawaii Presentation** con 5 frases.
- Pronunciación mediante Web Speech Synthesis en Web.
- Sistema inicial de estrellas y progreso por frase.
- Juego visual interactivo.
- Cámara/galería mediante `expo-image-picker`.
- Vista previa de la tarea.
- Generación local explícita de borrador desde texto.
- Contrato de frontend seguro para backend de OCR/Teacher AI.
- Perfiles y dashboard de progreso visual.

## Ejecutar

```bash
npm install
npx expo start --clear
```

Web:

```bash
npm run web
```

## Rutas

- `/` — Dashboard principal
- `/lesson` — Hawaii Presentation
- `/games` — Juegos
- `/teacher` — Teacher AI
- `/scan` — Foto/Tarea → Lección
- `/profiles` — Alana / Victoria
- `/progress` — Progreso

## Pipeline oficial

Teacher AI → 📸 foto de tarea → OCR → crea lección → juegos → progreso → perfiles → Android/iOS → TV.

## Arquitectura

Expo SDK 57 · React Native · Expo Router · TypeScript.

La IA real, OCR y evaluación avanzada de pronunciación se conectarán mediante backend seguro. Las claves de proveedores nunca deben vivir dentro del frontend.

## Siguientes hitos

1. Validación visual y responsive del nuevo sistema premium.
2. Voz y evaluación real de pronunciación multiplataforma.
3. Persistencia local de perfiles y progreso.
4. OCR real desde la foto de tarea.
5. Teacher AI con backend real y filtros infantiles.
6. Generación dinámica de lecciones y juegos.
7. Builds Android/iOS.
8. Modo TV y estrategia Samsung Tizen.
