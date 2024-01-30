import { shallow } from 'zustand/shallow';
import { Position } from 'reactflow';
import CustomHandle from '../components/Handler';
import useStore from '../store';
import Node from '../components/Node/Node';

const models = [
  { value: 'py', name: 'Python' },
  { value: 'js', name: 'Javascript' },
];

const selector = (id) => (store) => ({
  setLanguage: (e) => {
    store.updateNode(id, { language: e.target.value });
    store.updateLanguage(e.target.value);
  },
});

export default function CodeTypeSelector({ id }) {
  const { setLanguage } = useStore(selector(id), shallow);

  return (
    <Node title="Code Selection" titleBG="bg-red-500">
      <CustomHandle type="target" position={Position.Top} isConnectable={2} />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold" htmlFor="selectModel">
          Language:
        </label>
        <select
          name="selectModel"
          id="selectModel"
          className="nodrag border w-full rounded"
          onChange={setLanguage}
        >
          {models.map((model) => (
            <option value={model.value}>{model.name}</option>
          ))}
        </select>
      </div>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={2}
      />
    </Node>
  );
}
