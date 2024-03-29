import { shallow } from 'zustand/shallow';
import { Position } from 'reactflow';
import useStore from '../store';
import CustomHandle from '../components/Handler';
import Node from '../components/Node/Node';

const selector = (id) => (store) => ({
  setModel: (e) => store.updateNode(id, { model: e.target.value }),
  setTemperature: (e) =>
    store.updateNode(id, { temperature: Number(e.target.value) }),
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
    <Node title="OpenAI Completion" titleBG="bg-blue-500">
      <CustomHandle type="target" position={Position.Top} isConnectable={1} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold" htmlFor="selectModel">
            Model
          </label>
          <select
            name="selectModel"
            id="selectModel"
            onChange={setModel}
            className="nodrag border w-full rounded"
          >
            {models.map((model) => (
              <option key={model.value} value={model.value}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold" htmlFor="temperature">
            Temperature
          </label>
          <input
            name="temperature"
            id="temperature"
            className="nodrag border w-full rounded px-2"
            type="number"
            min={0}
            max={1}
            value={data.temperature}
            onChange={setTemperature}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="nodrag border w-full rounded px-2"
            value={data.prompt}
            onChange={setPrompt}
            rows={4}
            cols={40}
          />
        </div>
      </div>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={2}
      />
    </Node>
  );
}
