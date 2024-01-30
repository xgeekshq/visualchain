import { shallow } from 'zustand/shallow';
import useStore from '../store';
import CustomHandle from '../components/Handler';
import Node from '../components/Node/Node';

const selector = (id) => (store) => ({
  setModel: (e) => store.updateNode(id, { model: e.target.value }),
  setPrompt: (e) => store.updateNode(id, { prompt: e.target.value }),
  setNumImages: (e) => store.updateNode(id, { numImages: e.target.value }),
  setHeight: (e) => store.updateNode(id, { height: e.target.value }),
  setWidth: (e) => store.updateNode(id, { width: e.target.value }),
});

const models = [
  { value: 'dall-e-2', name: 'Dall E 2' },
  { value: 'dall-e-3', name: 'Dall E 3' },
];

export default function OpenAIImages({ id, data }) {
  const { setPrompt, setNumImages, setHeight, setWidth, setModel } = useStore(
    selector(id),
    shallow,
  );

  return (
    <Node title="OpenAI Images" titleBG="yellow">
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={1}
      />

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
              <option value={model.value}>{model.name}</option>
            ))}
          </select>
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
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold" htmlFor="nrImages">
            Number of Images
          </label>
          <input
            name="nrImages"
            id="nrImages"
            className="nodrag border w-full rounded pl-2"
            type="number"
            min={0}
            max={4}
            value={data.numImages}
            onChange={setNumImages}
          />
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs font-bold" htmlFor="width">
              Width
            </label>
            <input
              name="width"
              id="width"
              className="nodrag border w-full rounded pl-2"
              type="number"
              min={0}
              value={data.width}
              onChange={setWidth}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-xs font-bold" htmlFor="height">
              Height
            </label>
            <input
              name="height"
              id="height"
              className="nodrag border w-full rounded pl-2"
              type="number"
              min={0}
              value={data.height}
              onChange={setHeight}
            />
          </div>
        </div>
      </div>

      <CustomHandle
        className="w-2 h-2"
        type="source"
        position="bottom"
        isConnectable={2}
      />
    </Node>
  );
}
