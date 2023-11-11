export function initOpenAI({ apiKey }: { apiKey: string }) {
	return `
from openai import OpenAI
  
client = OpenAI(api_key="${apiKey}")
`;
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
chat_completion = client.chat.completions.create(
  messages=[{"role": "user", "content": "${prompt}"}],
  model="${model}",
  temperature="${temperature}"
)

print(chat_completion.choices[0].message.content)
`;
}
