import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';

app.use(cors());
app.use(express.json({ limit: '20mb' }));

function extractOutputText(payload) {
  if (payload.output_text) return payload.output_text;
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) return content.text;
      if (content.text) return content.text;
    }
  }
  return '';
}

async function openaiResponse(input) {
  if (!apiKey) throw new Error('OPENAI_API_KEY no está configurada en el backend.');
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, input }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error?.message || 'Error en proveedor de IA.');
  return extractOutputText(json);
}

app.get('/health', (_req, res) => res.json({ ok: true, service: 'alana-victoria-learning-api' }));

app.post('/v1/teacher/chat', async (req, res) => {
  try {
    const { message, language = 'English', ageGroup = 'child' } = req.body || {};
    if (!String(message || '').trim()) return res.status(400).json({ error: 'Mensaje vacío.' });
    const prompt = `You are Teacher AI for Alana & Victoria Languages. Teach ${language}. Audience: ${ageGroup}. Be warm, concise, age-appropriate, educational and safe. Correct mistakes gently. Prefer short examples and an actionable next step. User message: ${message}`;
    const text = await openaiResponse(prompt);
    res.json({ reply: text || 'Vamos a practicar juntos.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Teacher AI no respondió.' });
  }
});

app.post('/v1/homework/analyze', async (req, res) => {
  try {
    const { imageDataUrl, targetLanguage = 'English' } = req.body || {};
    if (!imageDataUrl?.startsWith('data:image/')) return res.status(400).json({ error: 'Imagen inválida.' });

    const instruction = `Read the homework image carefully. Return ONLY valid JSON with this exact shape: {"title":"...","detectedText":"...","language":"...","vocabulary":[{"word":"...","translation":"..."}],"phrases":[{"target":"...","translation":"..."}],"activities":[{"type":"multiple_choice|repeat|match|fill_blank","prompt":"...","answer":"...","options":["..."]}]}. Preserve the visible homework text accurately. Build a short age-appropriate lesson targeting ${targetLanguage}. Do not invent text that is not visible; generated activities may use the visible content.`;
    const text = await openaiResponse([
      {
        role: 'user',
        content: [
          { type: 'input_text', text: instruction },
          { type: 'input_image', image_url: imageDataUrl },
        ],
      },
    ]);

    let lesson;
    try {
      const clean = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      lesson = JSON.parse(clean);
    } catch {
      return res.status(502).json({ error: 'La IA leyó la imagen pero no devolvió una lección estructurada válida.' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message || 'No se pudo analizar la tarea.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Alana & Victoria Learning API escuchando en http://localhost:${port}`);
});
