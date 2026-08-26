# Alana & Victoria Languages 🌍💗

Aplicación educativa de idiomas pensada para niños, familias y adultos. El producto nace para Alana y Victoria y evoluciona como una experiencia multiplataforma con lecciones visuales, juegos, pronunciación, progreso y profesora con IA.

## Objetivo

Aprender idiomas mediante una secuencia simple y positiva:

**Ver → escuchar → repetir → recibir ayuda → ganar estrellas → jugar → avanzar.**

## Plataformas objetivo

- Web / PWA
- Android
- iOS / iPadOS
- Tablets
- Smart TV mediante experiencia web optimizada para pantalla grande
- Samsung TV/Tizen como fase específica de empaquetado y navegación por control remoto

## Idiomas iniciales

- Inglés
- Francés
- Italiano
- Español
- Alemán
- Portugués

La arquitectura debe permitir sumar más idiomas sin rehacer la aplicación.

## Rangos de aprendizaje

- 2–4: Little Explorer
- 5–7: Young Learner
- 8–11: Junior Student
- 12+: Teen & Adult

## MVP actual

- Home responsive con marca **Alana & Victoria**
- Selector visual de idiomas y edades
- Primera lección `Hawaii Presentation`
- Progreso por frase
- Audio de pronunciación en Web
- Sistema inicial de estrellas
- Primer juego visual interactivo
- Diseño adaptable a móvil, web y pantalla grande

## Siguiente corte

1. Voz real multiplataforma.
2. Evaluación de pronunciación.
3. Persistencia de progreso.
4. Perfiles Alana / Victoria / invitado.
5. Selector dinámico de idioma.
6. Teacher AI conversacional.
7. Cámara/OCR: fotografía de tarea → generación de lección.
8. Modo TV y navegación con control remoto.
9. Builds Android/iOS y estrategia Tizen.
10. Deploy web público.

El seguimiento maestro está en el Issue #1 del repositorio.

## Desarrollo

```bash
npm install
npx expo start
```

Web:

```bash
npm run web
```

Android:

```bash
npm run android
```

## Estructura principal

```text
src/app/
  index.tsx    # Home
  lesson.tsx   # Lección interactiva
  games.tsx    # Juegos visuales
  _layout.tsx  # Navegación
```

## Principios

- Cada corte debe quedar ejecutable.
- No fingir IA o evaluación si todavía no existe un motor real.
- Prioridad: funcionamiento → experiencia → seguridad → IA → publicación.
- Interfaz amigable, visual y accesible para niños, sin limitar el producto a público infantil.
- No guardar claves privadas en el frontend.
