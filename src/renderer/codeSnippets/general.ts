import {
  initJSOpenAI,
  openAIJSCompletion,
  openAIJSImageCompletion,
  openAIJSTranscription,
} from './javascript';

import {
  initPYOpenAI,
  openAIPYCompletion,
  openAIPYImageCompletion,
  openAIPYTranscription,
} from './python';

import {
  InitOpenAIType,
  OpenAICompletionType,
  OpenAIImageCompletionType,
  OpenAITranscriptionType,
} from '../types/FunctionTypes';

export function initOpenAI({ apiKey, language }: InitOpenAIType) {
  switch (language) {
    case 'js': {
      return initJSOpenAI({ apiKey });
    }
    case 'py': {
      return initPYOpenAI({ apiKey });
    }
    default: {
      console.error('Unknown Language!');
      return null;
    }
  }
}

export function openAICompletion({
  model,
  temperature,
  prompt,
  language,
}: OpenAICompletionType) {
  switch (language) {
    case 'js': {
      return openAIJSCompletion({ model, temperature, prompt });
    }
    case 'py': {
      return openAIPYCompletion({ model, temperature, prompt });
    }
    default: {
      console.error('Unknown Language!');
      return null;
    }
  }
}

export function openAIImageCompletion({
  model,
  numImages,
  prompt,
  height,
  width,
  language,
}: OpenAIImageCompletionType) {
  switch (language) {
    case 'js': {
      return openAIJSImageCompletion({
        model,
        numImages,
        prompt,
        height,
        width,
      });
    }
    case 'py': {
      return openAIPYImageCompletion({
        model,
        numImages,
        prompt,
        height,
        width,
      });
    }
    default: {
      console.error('Unknown Language!');
      return null;
    }
  }
}

export function openAITranscription({
  filePath,
  model,
  language,
}: OpenAITranscriptionType) {
  switch (language) {
    case 'js': {
      return openAIJSTranscription({ filePath, model });
    }
    case 'py': {
      return openAIPYTranscription({ filePath, model });
    }
    default: {
      console.error('Unknown Language!');
      return null;
    }
  }
}
