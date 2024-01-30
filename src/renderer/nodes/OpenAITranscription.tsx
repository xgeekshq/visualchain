import { shallow } from 'zustand/shallow';
import { Position } from 'reactflow';
import useStore from '../store';
import CustomHandle from '../components/Handler';
import Node from '../components/Node/Node';

const selector = (id) => (store) => ({
  setFilePath: (e) => {
    store.updateNode(id, { filePath: e.target.files[0].name });
  },
});

export default function OpenAITranscription({ id, data }) {
  const { setFilePath } = useStore(selector(id), shallow);

  return (
    <Node title="OpenAI Transcription" titleBG="bg-blue-500">
      <CustomHandle type="target" position={Position.Top} isConnectable={1} />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold" htmlFor="filePath">
          File path
        </label>
        <input
          name="filePath"
          id="filePath"
          accept=".mp3"
          className="nodrag border w-full rounded pr-2"
          type="file"
          onChange={setFilePath}
        />
      </div>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={2}
      />
    </Node>
  );
}
