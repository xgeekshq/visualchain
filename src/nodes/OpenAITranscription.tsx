import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from '../store';
import CustomHandle from '../components/Handler';

const selector = (id) => (store) => ({
	setFilePath: (e) =>  {
		console.log(e.target.files[0].name)
		store.updateNode(id, { filePath: e.target.files[0].name })
	},
});

export default function OpenAITranscription({ id, data }) {
	const { setFilePath } = useStore(
		selector(id),
		shallow,
	);

	console.log(data.filePath)

	return (
		<div className="rounded-md bg-white shadow-xl border">
			<p className={'rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm'}>
				OpenAITranscription
			</p>

			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">File path</p>
				<input
					accept='.mp3'
					className="nodrag border"
					type="file"
					onChange={setFilePath}
				/>
			</label>
			<CustomHandle className="w-2 h-2" type="source" position="bottom" isConnectable={2} />
			<CustomHandle className="w-2 h-2" type="target" position="top" isConnectable={1} />
		</div>
	);
}
