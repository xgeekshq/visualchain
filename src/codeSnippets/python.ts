export function initOpenAI({apiKey}: {apiKey: string}){
  return `client = OpenAI(api_key="${apiKey}")`
}

export function openAICompletion(model: string, temperature: number, prompt: string){
  return `chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "${prompt}",
        }
    ],
    model="${model}",
    temperature="${temperature}"
)`
}

