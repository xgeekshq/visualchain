export function initOpenAI({ apiKey }: { apiKey: string }) {
	return `
const openai = require("OpenAI");

const client = new OpenAI({
    apiKey: ${apiKey}
});`;
}

export function openAICompletion({
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
