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
- Flujo **Foto/Tarea → Crear lección** con generador local de demostración; cámara/OCR real pendiente.
- Perfiles Alana y Victoria.
- Dashboard inicial de progreso.
- Concepto de TV/pantalla grande preparado para una fase Samsung/Tizen específica.

## Ejecutar

```bash
npm install
npx expo start --clear
```

Web:

```bash
npm run web
```

## Rutas principales

- `/` — Home
- `/lesson` — Hawaii Presentation
- `/games` — juego visual
- `/teacher` — Teacher AI
- `/scan` — tarea a lección
- `/profiles` — perfiles Alana/Victoria
- `/progress` — progreso

## Arquitectura objetivo

El proyecto usa Expo SDK 57, React Native, Expo Router y TypeScript. La IA real, OCR y evaluación avanzada de pronunciación deben conectarse mediante servicios/backend seguros: las API keys nunca deben vivir dentro del frontend.

## Siguientes hitos

1. Voz y pronunciación real multiplataforma.
2. Persistencia local de perfiles y progreso.
3. Cámara real + OCR.
4. Backend de Teacher AI con filtros infantiles.
5. Generador dinámico de lecciones y juegos.
6. Android/iOS instalables.
7. Modo TV con navegación por control remoto y estrategia Samsung Tizen.

## Primera lección

**Hawaii Presentation**

- Good morning, everyone!
- Aloha! Welcome to Hawaii!
- Today we will show you some beautiful parts of Hawaiian culture.
- You will see animals, food, traditional clothes, music, and dance.
- We hope you enjoy our presentation. Mahalo!
