import {
  InitOpenAIType,
  OpenAICompletionType,
  OpenAIImageCompletionType,
  OpenAITranscriptionType,
} from '../types/FunctionTypes';

export function initJSOpenAI({ apiKey }: Omit<InitOpenAIType, 'language'>) {
  return `
const OpenAI = require('openai');
const fs = require('fs');

const client = new OpenAI({
    apiKey: '${apiKey}'
});`;
}

export function openAIJSCompletion({
  model,
  temperature,
  prompt,
}: Omit<OpenAICompletionType, 'language'>) {
  return `
async function main() {
	const chatCompletion = await client.chat.completions.create({
		messages: [{ role: 'user', content: '${prompt}' }],
		model: '${model}',
		temperature: ${temperature}
	});
	
	console.log(chatCompletion.choices[0].message.content)
}

main();
`;
}

export function openAIJSImageCompletion({
  model,
  numImages,
  prompt,
  height,
  width,
}: Omit<OpenAIImageCompletionType, 'language'>) {
  return `
async function main() {	
const image = await client.images.generate({
    model: '${model}',
    prompt: '${prompt}',
    n: ${numImages},
    size:'${width}x${height}'
})
    
console.log(image.data[0].url)
}
main();
`;
}

export function openAIJSTranscription({
  filePath,
  model,
}: Omit<OpenAITranscriptionType, 'language'>) {
  return `
async function main() {	
const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream('${filePath}'),
    model: '${model}',
});
    
console.log(transcription.text);
}
main();
`;
}
