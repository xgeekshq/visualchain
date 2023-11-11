import { CopyBlock, dracula } from 'react-code-blocks';
import useStore from '../store';
import { saveAs } from 'file-saver';
import { shallow } from 'zustand/shallow';
import OpenAI from 'openai';

function download(myCode, language) {
  const file = new Blob([myCode], { type: 'text/plain;charset=utf-8' });
  saveAs(file, `askAI.${language}`);
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function explain(prompt, updateExplanation) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful code assistant. With many experience in software development, I will give you the code and you will explain it. Format the output as a HTML tags.',
      },
      { role: 'user', content: prompt },
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    updateExplanation(chunk.choices[0].delta.content);
  }
}

const selector = (store) => ({
  data: store.data,
  language: store.language,
  updateExplanation: store.updateExplanation,
  explanation: store.explanation,
  createNode: store.createNode,
});
export default function CodeBlock({ data }) {
  const store = useStore(selector, shallow);

  const createExplanationNode = () => {
    store.createNode('explanation');
    explain(store.data, store.updateExplanation);
  };

  return (
    <div className="rounded-md bg-white shadow-xl border-1">
      <p className={'rounded-t-md px-2 py-1 bg-gray-500 text-white text-sm'}>
        Generated Code
      </p>
      <CopyBlock
        text={data.code}
        language={data.language ?? 'js'}
        showLineNumbers={true}
        theme={dracula}
      />
      <div className="flex gap-4 py-2 justify-center">
        <button
          className="border bg-white rounded-md shadow-sm p-2"
          onClick={() => download(store.data, store.language)}>
          Download
        </button>
        <button className="border bg-white rounded-md shadow-sm p-2">
          Execute
        </button>
        <button
          className="border bg-white rounded-md shadow-sm p-2"
          onClick={createExplanationNode}>
          Explain
        </button>
      </div>
    </div>
  );
}
