export function initJSOpenAI({ apiKey }: { apiKey: string }) {
	return `
const openai = require("OpenAI");

const client = new OpenAI({
    apiKey: ${apiKey}
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
const chatCompletion =  client.chat.completions.create({
    messages: [{ role: "user", content: "${prompt}" }],
    model: "${model}",
    temperature: ${temperature}
}).then((result) => chatCompletion.choices[0].message.content);
`;
}

export function openAIJSImageCompletion({
	model,
	numberOfImages,
	prompt,
	height,
	width
}: {
	model: string;
	numberOfImages: number;
	prompt: string;
	height: number;
	width: number;
}) {
	return `

    const image = openai.images.generate({
        model: "${model}",
        prompt: "${prompt}",
        n: ${numberOfImages},
        size:"${width}x${height}"
     }).then((result) => image.data[0].url);
`;
}

export function openAIJSTranscription({filePath, model}: {filePath: string; model: string}) {
    return `
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("${filePath}"),
        model: "${model}",
      });
    
      console.log(transcription.text);
    `
}
