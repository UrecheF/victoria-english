export type HomeworkActivity = {
  type: 'listen-repeat' | 'match' | 'speak' | 'quiz';
  title: string;
  prompt: string;
};

export type HomeworkAnalysis = {
  title: string;
  extractedText: string;
  vocabulary: string[];
  summary?: string;
  activities: HomeworkActivity[];
};

type AnalyzeHomeworkInput = {
  imageUri?: string | null;
  manualText?: string;
  profile?: 'alana' | 'victoria' | 'guest';
  targetLanguage?: string;
  ageGroup?: '2-4' | '5-7' | '8-11' | '12+';
};

const API_URL = process.env.EXPO_PUBLIC_LEARNING_API_URL?.replace(/\/$/, '');

export function isHomeworkAiConfigured() {
  return Boolean(API_URL);
}

export async function analyzeHomework(input: AnalyzeHomeworkInput): Promise<HomeworkAnalysis> {
  if (!API_URL) {
    throw new Error('HOMEWORK_AI_NOT_CONFIGURED');
  }

  const response = await fetch(`${API_URL}/v1/homework/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`HOMEWORK_AI_HTTP_${response.status}`);
  }

  const data = (await response.json()) as HomeworkAnalysis;

  if (!data?.title || !data?.extractedText || !Array.isArray(data.vocabulary) || !Array.isArray(data.activities)) {
    throw new Error('HOMEWORK_AI_INVALID_RESPONSE');
  }

  return data;
}
