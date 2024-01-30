import { CopyBlock, dracula } from 'react-code-blocks';
import { saveAs } from 'file-saver';
import { shallow } from 'zustand/shallow';
import OpenAI from 'openai';
import useStore from '../store';
import Node from '../components/Node/Node';

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
  updateOutputString: store.updateOutputString,
  explanation: store.explanation,
  createNode: store.createNode,
});

export default function CodeBlock({ data }) {
  const store = useStore(selector, shallow);

  const handleDownload = () => {
    download(store.data, store.language);
  };

  const handleExecution = async () => {
    const result = await window.electron.execBananas({
      code: store.data,
      language: store.language,
    });

    store.updateOutputString(result);
    store.createNode('display');
  };

  const createExplanationNode = () => {
    store.createNode('explanation');
    explain(store.data, store.updateExplanation);
  };

  return (
    <Node title="Generated Code" titleBG="bg-gray-500" size="xl">
      <div className="flex flex-col gap-2">
        <CopyBlock
          text={data.code}
          language={data.language ?? 'py'}
          showLineNumbers
          theme={dracula}
        />
        <div className="flex flex-row gap-3 justify-center">
          <button
            type="button"
            className="border bg-white rounded-md shadow-sm p-2"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            type="button"
            className="border bg-white rounded-md shadow-sm p-2"
            onClick={handleExecution}
          >
            Execute
          </button>
          <button
            type="button"
            className="border bg-white rounded-md shadow-sm p-2"
            onClick={createExplanationNode}
          >
            Explain
          </button>
        </div>
      </div>
    </Node>
  );
}
