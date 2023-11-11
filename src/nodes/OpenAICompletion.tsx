import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from '../store';
import CustomHandle from '../components/Handler';

const selector = (id) => (store) => ({
  setModel: (e) => store.updateNode(id, { model: e.target.value }),
  setTemperature: (e) => store.updateNode(id, { temperature: e.target.value }),
  setPrompt: (e) => store.updateNode(id, { prompt: e.target.value }),
});

const models = [
  { value: 'gpt-3.5-turbo-1106', name: 'GPT-3.5 Turbo' },
  { value: 'gpt-4-1106-preview', name: 'GPT-4 Turbo' },
  { value: 'gpt-4', name: 'GPT-4' },
];

export default function OpenAICompletion({ id, data }) {
  const { setModel, setTemperature, setPrompt } = useStore(
    selector(id),
    shallow,
  );

  return (
    <div className="rounded-md bg-white shadow-xl border">
      <p className={'rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm'}>
        OpenAICompletion
      </p>

      <label className="flex flex-col px-2 py-1">
        <p className="text-xs font-bold mb-2">Model</p>
        <select name="selectModel">
          {models.map((model) => (
            <option key={model.value} value={model.value} onChange={setModel}>
              {model.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col px-2 py-1">
        <p className="text-xs font-bold mb-2">Temperature</p>
        <input
          className="nodrag border"
          type="number"
          min={0}
          max={1}
          value={data.temperature}
          onChange={setTemperature}
        />
      </label>
      <label className="flex flex-col px-2 py-1">
        <p className="text-xs font-bold mb-2">Prompt</p>
        <textarea
          className="nodrag border"
          value={data.prompt}
          onChange={setPrompt}
          rows={4}
          cols={40}
        />
      </label>
      <CustomHandle
        className="w-2 h-2"
        type="source"
        position="bottom"
        isConnectable={1}
      />
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={1}
      />
    </div>
  );
}
