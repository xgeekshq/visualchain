import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "../store";
import CustomHandle from "../components/Handler";

const selector = (id) => (store) => ({
	setApiKey: (e) => store.updateNode(id, { apiKey: e.target.value }),
});

export default function OpenAI({ id, data }) {
	const { setApiKey } = useStore(selector(id), shallow);

	return (
		<div className="rounded-md bg-white shadow-xl border w-96">
			<p className={"rounded-t-md px-2 py-1 bg-green-500 text-white text-sm"}>
				OpenAI
			</p>

			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">ApiKey</p>
				<input
					className="nodrag border w-full"
					type="text"
					value={data.apiKey}
					onChange={setApiKey}
				/>
			</label>
			<CustomHandle className="w-2 h-2" type="source" position="bottom"  isConnectable={1} />
			<CustomHandle className="w-2 h-2" type="target" position="top"  isConnectable={1}/>
		</div>
	);
}
