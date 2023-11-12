export function initJSOpenAI({ apiKey }: { apiKey: string }) {
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
}: {
	model: string;
	temperature: number;
	prompt: string;
}) {
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
	width
}: {
	model: string;
	numImages: number;
	prompt: string;
	height: number;
	width: number;
}) {
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

export function openAIJSTranscription({filePath, model}: {filePath: string; model: string}) {
    return `
async function main() {	
const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream('${filePath}'),
    model: '${model}',
});
    
console.log(transcription.text);
}
main();
`
}
