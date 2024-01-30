import CustomHandle from '../components/Handler';

export default function End() {
  return (
    <div className="rounded-md bg-white shadow-xl border-2 border-red-400 w-full">
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={1}
      />

      <div className="px-6 py-3 flex gap-3 items-center justify-center">
        <p className="text-lg font-bold">🛑</p>
        <p className="text-lg font-bold">End</p>
      </div>
    </div>
  );
}
