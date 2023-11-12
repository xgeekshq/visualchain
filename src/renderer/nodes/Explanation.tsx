import React from "react";
import { shallow } from "zustand/shallow";
import useStore from "../store";


const selector = (store) => ({
	explanation: store.explanation,
});
export default function Explanation() {

	const store = useStore(selector, shallow);

	
	return (
		<div className="flex flex-col rounded-md bg-white shadow-xl border w-[600px] z-[999999]">
				<p className={"rounded-t-md px-2 py-1 bg-purple-500 text-white text-sm"}>
				Code Explanation
			</p>
			<label className="flex px-2 py-1 w-full items-center justify-center">
				<p className=" text-lg font-bold">{store.explanation}</p>
			</label>
		</div>
	);
}
