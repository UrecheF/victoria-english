# Alana & Victoria Languages

Aplicación educativa de idiomas para niños, familias y adultos. El objetivo es que aprender se sienta como jugar: lecciones visuales, voz, juegos, progreso y una Teacher AI que acompañe al estudiante.

## Estado actual

Ya existe un primer MVP navegable con:

- Home responsive para móvil, tablet, web y pantallas grandes.
- Branding **Alana ♥ Victoria**.
- Idiomas iniciales: inglés, francés, italiano, español, alemán y portugués.
- Rangos de edad: 2–4, 5–7, 8–11 y 12+/adultos.
- Primera lección **Hawaii Presentation** con cinco frases, traducción, audio Web, estrellas y progreso.
- Primer juego visual interactivo.
- Pantalla **Teacher AI** preparada para backend seguro.
- Flujo **Foto/Tarea → Crear lección** con cámara/galería real, vista previa, transcripción manual temporal y generador local de borrador.
- Perfiles Alana y Victoria.
- Dashboard inicial de progreso.
- Concepto de TV/pantalla grande preparado para una fase Samsung/Tizen específica.

## Ejecutar

```bash
npm install
npx expo start --clear
```

> `npm install` sincroniza el lockfile local e instala `expo-image-picker`, usado por la captura de tareas.

Web:

```bash
npm run web
```

## Rutas principales

- `/` — Home
- `/lesson` — Hawaii Presentation
- `/games` — juego visual
- `/teacher` — Teacher AI
- `/scan` — cámara/galería → tarea → borrador de lección
- `/profiles` — perfiles Alana/Victoria
- `/progress` — progreso

## Flujo de tarea

En `/scan` ya se puede:

1. Tomar foto con la cámara.
2. Elegir una foto existente.
3. Verla dentro de la app.
4. Escribir o pegar temporalmente el texto visible.
5. Extraer vocabulario localmente.
6. Crear un borrador con actividades.
7. Continuar a Teacher AI o a una lección de práctica.

La app **no simula OCR**. El siguiente bloque conectará imagen → OCR seguro → Teacher AI → lección dinámica. Las API keys y secretos nunca deben vivir en el frontend.

## Arquitectura objetivo

El proyecto usa Expo SDK 57, React Native, Expo Router y TypeScript. La IA real, OCR y evaluación avanzada de pronunciación deben conectarse mediante servicios/backend seguros.

## Siguientes hitos

1. OCR seguro desde imagen.
2. Backend de Teacher AI con filtros infantiles y salida estructurada.
3. Generador dinámico de lecciones y juegos.
4. Voz y pronunciación real multiplataforma.
5. Persistencia local de perfiles y progreso.
6. Android/iOS instalables.
7. Modo TV con navegación por control remoto y estrategia Samsung Tizen.

## Primera lección

**Hawaii Presentation**

- Good morning, everyone!
- Aloha! Welcome to Hawaii!
- Today we will show you some beautiful parts of Hawaiian culture.
- You will see animals, food, traditional clothes, music, and dance.
- We hope you enjoy our presentation. Mahalo!
