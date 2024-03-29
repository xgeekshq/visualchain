import { Position } from 'reactflow';
import CustomHandle from '../components/Handler';

export default function Start() {
  return (
    <div className="rounded-md bg-white shadow-xl border-2 border-green-400 w-full">
      <div className="px-6 py-3 flex gap-3 items-center justify-center">
        <p className="text-lg font-bold">🟢</p>
        <p className="text-lg font-bold">Start</p>
      </div>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        isConnectable={1}
      />
    </div>
  );
}
