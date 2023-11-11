import React from "react";
import { Handle } from "reactflow";

export default function End() {
	return (
		<div className="flex rounded-md bg-white shadow-xl border w-20">
			<label className="flex px-2 py-1 w-full  items-center justify-center">
				<p className="text-lg font-bold">🛑</p>
			</label>
			<Handle className="w-2 h-2" type="target" position="top" />
		</div>
	);
}
