import { shallow } from 'zustand/shallow';
import useStore from '../store';
import CustomHandle from '../components/Handler';
import Node from '../components/Node/Node';

const selector = (id) => (store) => ({
  setApiKey: (e) => store.updateNode(id, { apiKey: e.target.value }),
});

export default function OpenAI({ id, data }) {
  const { setApiKey } = useStore(selector(id), shallow);

  return (
    <Node title="OpenAI">
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={1}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold" htmlFor="apikey">
          Api Key:
        </label>
        <input
          name="apikey"
          id="apikey"
          className="nodrag border w-full rounded px-2"
          type="text"
          value={data.apiKey}
          onChange={setApiKey}
        />
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
