import { CopyBlock, dracula } from 'react-code-blocks';
import { saveAs } from 'file-saver';
import { shallow } from 'zustand/shallow';
import OpenAI from 'openai';
import useStore from '../store';

function download(myCode, language) {
  const file = new Blob([myCode], { type: 'text/plain;charset=utf-8' });
  saveAs(file, `askAI.${language}`);
}

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

async function explain(prompt, updateExplanation) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful code assistant. With many experience in software development, I will give you the code and you will explain it shortly.',
      },
      {
        role: 'user',
        content: prompt.replace(
          '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',
          '',
        ),
      },
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    if (chunk.choices[0].delta.content) {
      updateExplanation(chunk.choices[0].delta.content);
    }
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
      <p className="rounded-t-md px-2 py-1 bg-gray-500 text-white text-sm">
        Generated Code
      </p>
      <CopyBlock
        text={data.code}
        language={data.language ?? 'py'}
        showLineNumbers
        theme={dracula}
      />
      <div className="flex gap-4 py-2 justify-center">
        <button
          className="border bg-white rounded-md shadow-sm p-2"
          onClick={() => download(store.data, store.language)}
        >
          Download
        </button>
        <button className="border bg-white rounded-md shadow-sm p-2" onClick={async () => {
          const result = await window.electron.execBananas({code: store.data, language: store.language})
          console.log(result)
        }}>
          Execute
        </button>
        <button
          className="border bg-white rounded-md shadow-sm p-2"
          onClick={createExplanationNode}
        >
          Explain
        </button>
      </div>
    </div>
  );
}
