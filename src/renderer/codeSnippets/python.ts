export function initPYOpenAI({ apiKey }: { apiKey: string }) {
	return `
from openai import OpenAI
  
client = OpenAI(api_key='${apiKey}')
`;
}

export function openAIPYCompletion({
	model,
	temperature,
	prompt,
}: {
	model: string;
	temperature: number;
	prompt: string;
}) {
	return `
chat_completion = client.chat.completions.create(
  messages=[{'role': 'user', 'content': '${prompt}'}],
  model='${model}',
  temperature=${temperature}
)

print(chat_completion.choices[0].message.content)
`;
}

export function openAIPYImageCompletion({
	model,
	numImages,
	prompt,
	height,
	width
}: {
	model: string;
	numImages: number;
	prompt: string;
	height: number;
	width: number;
}) {
	return `
chat_completion = client.images.generate(
	model='${model}',
	prompt='${prompt}',
	n=${numImages},
	size='${width}x${height}'
)

print(chat_completion.data[0].url)
`;
}

export function openAIPYTranscription({filePath, model}: {filePath: string; model: string}) {
    return `
audio_file = open('${filePath}', 'rb')
transcript = client.audio.transcriptions.create(
  model='${model}', 
  file=audio_file
)

print(transcript.text)
`
}
