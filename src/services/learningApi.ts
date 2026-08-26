export type TeacherReply = {
  reply: string;
  corrections?: string[];
  suggestions?: string[];
};

export type HomeworkLesson = {
  title: string;
  detectedText: string;
  language: string;
  vocabulary: Array<{ word: string; translation?: string }>;
  phrases: Array<{ target: string; translation?: string }>;
  activities: Array<{ type: string; prompt: string; answer?: string; options?: string[] }>;
};

const API_URL = process.env.EXPO_PUBLIC_LEARNING_API_URL?.replace(/\/$/, '');

async function request<T>(path: string, init: RequestInit): Promise<T> {
  if (!API_URL) throw new Error('EXPO_PUBLIC_LEARNING_API_URL no está configurada.');
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error || `Error ${response.status}`);
  return body as T;
}

export const learningApi = {
  teacherChat(message: string, language = 'English', ageGroup = 'child') {
    return request<TeacherReply>('/v1/teacher/chat', {
      method: 'POST',
      body: JSON.stringify({ message, language, ageGroup }),
    });
  },

  async analyzeHomework(imageUri: string, targetLanguage = 'English') {
    const imageResponse = await fetch(imageUri);
    const blob = await imageResponse.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return request<HomeworkLesson>('/v1/homework/analyze', {
      method: 'POST',
      body: JSON.stringify({ imageDataUrl: dataUrl, targetLanguage }),
    });
  },
};
