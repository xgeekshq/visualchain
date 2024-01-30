import { shallow } from 'zustand/shallow';
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
    <Node title="Code Selection" titleBG="red">
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={2}
      />

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
        className="w-2 h-2"
        type="source"
        position="bottom"
        isConnectable={2}
      />
    </Node>
  );
}
