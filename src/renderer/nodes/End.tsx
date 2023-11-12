import React from 'react';
import CustomHandle from '../components/Handler';

export default function End() {
  return (
    <div className="flex rounded-md bg-white shadow-xl b border-2 border-red-400">
      <label className="flex gap-4 m-2 px-2 py-1 w-full  items-center justify-center">
        <p className="text-lg font-bold">🛑</p>
        <p className="text-lg font-bold">End</p>
      </label>
      <CustomHandle
        className="w-2 h-2"
        type="target"
        position="top"
        isConnectable={1}
      />
    </div>
  );
}
