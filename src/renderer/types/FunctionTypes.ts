export type SupportedLanguages = 'js' | 'py';

export type InitOpenAIType = {
  apiKey: string;
  language: SupportedLanguages;
};
export type OpenAICompletionType = {
  model: string;
  temperature: number;
  prompt: string;
  language: SupportedLanguages;
};
export type OpenAIImageCompletionType = {
  model: string;
  numImages: number;
  prompt: string;
  height: number;
  width: number;
  language: SupportedLanguages;
};
export type OpenAITranscriptionType = {
  filePath: string;
  model: string;
  language: SupportedLanguages;
};
