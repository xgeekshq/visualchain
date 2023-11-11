import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "../store";
import CustomHandle from "../components/Handler";

const selector = (id) => (store) => ({
	setPrompt: (e) => store.updateNode(id, { prompt: e.target.value }),
	setNumImages: (e) => store.updateNode(id, { numImages: e.target.value }),
	setHeight: (e) => store.updateNode(id, { height: e.target.value }),
	setWidth: (e) => store.updateNode(id, { width: e.target.value }),
});


export default function OpenAIImages({ id, data }) {

	const { setPrompt, setNumImages, setHeight, setWidth } = useStore(selector(id), shallow);

	return (
		<div className="rounded-md bg-white shadow-xl border">
			<p className={"rounded-t-md px-2 py-1 bg-yellow-500 text-white text-sm"}>
				OpenAIImages
			</p>
			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">Prompt</p>
				<textarea
					className="nodrag border"
					value={data.prompt}
					onChange={setPrompt}
					rows={4} cols={40}
				/>
			</label>
			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">Number of Images</p>
				<input
					className="nodrag border"
					type="number"
					min={0}
					max={4}
					value={data.numImages}
					onChange={setNumImages}
				/>
			</label>
			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">Height</p>
				<input
					className="nodrag border"
					type="number"
					min={0}
					value={data.height}
					onChange={setHeight}
				/>
			</label>
			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">Width</p>
				<input
					className="nodrag border"
					type="number"
					min={0}
					value={data.width}
					onChange={setWidth}
				/>
			</label>
			<CustomHandle className="w-2 h-2" type="source" position="bottom"  isConnectable={2} />
			<CustomHandle className="w-2 h-2" type="target" position="top"  isConnectable={1} />
		</div>
	);
}
