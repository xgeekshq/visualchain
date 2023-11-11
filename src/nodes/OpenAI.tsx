import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "../store";

const selector = (id) => (store) => ({
	setApiKey: (e) => store.updateNode(id, { apiKey: e.target.value }),
});

export default function OpenAI({ id, data }) {
	const { setApiKey } = useStore(selector(id), shallow);

	return (
		<div className="rounded-md bg-white shadow-xl border">
			<label className="flex flex-col px-2 py-1">
				<p className="text-xs font-bold mb-2">ApiKey</p>
				<input
					className="nodrag border"
					type="text"
					value={data.apiKey}
					onChange={setApiKey}
				/>
			</label>
			<Handle className="w-2 h-2" type="source" position="bottom" />
			<Handle className="w-2 h-2" type="target" position="top" />
		</div>
	);
}
