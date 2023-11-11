import { initJSOpenAI, openAIJSCompletion, openAIJSImageCompletion, openAIJSTranscription } from "./javascript";
import { initPYOpenAI, openAIPYCompletion, openAIPYImageCompletion, openAIPYTranscription } from "./python";

export function initOpenAI({ apiKey, language }: { apiKey: string, language: "js" | "py" }) {
    console.log("OLA", apiKey, language)

	switch (language) {
        case "js": {
            return initJSOpenAI({apiKey})
        }

        case "py": {
            return initPYOpenAI({apiKey})
        }
    } 
}

export function openAICompletion({
	model,
	temperature,
	prompt,
    language
}: {
	model: string;
	temperature: number;
	prompt: string;
    language: "js" | "py"
}) {
	switch (language) {
        case "js": {
            return openAIJSCompletion({model, temperature, prompt})
        }

        case "py": {
            return openAIPYCompletion({model, temperature, prompt})
        }
    } 
}

export function openAIImageCompletion({
	model,
	numberOfImages,
	prompt,
	height,
	width,
    language
}: {
	model: string;
	numberOfImages: number;
	prompt: string;
	height: number;
	width: number;
    language: "js" | "py"
}) {
	switch (language) {
        case "js": {
            return openAIJSImageCompletion({model,numberOfImages,prompt,height, width})
        }

        case "py": {
            return openAIPYImageCompletion({model,numberOfImages,prompt,height,width})
        }
    } 
}

export function openAITranscription({filePath, model, language}: {filePath: string; model: string, language: "js" | "py" }) {
    switch (language) {
        case "js": {
            return openAIJSTranscription({filePath, model})
        }

        case "py": {
            return openAIPYTranscription({filePath, model})
        }
    }
}
