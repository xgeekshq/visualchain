import React from "react";
import { Handle, useStore } from "reactflow";
import { shallow } from "zustand/shallow";

const models = [
    { value: "js", name: "Javascript" },
    { value: "py", name: "Python" }
];

const selector = (id) => (store) => ({
    setLanguage: (e) => store.updateNode(id, { language: e.target.value }),
});

export default function CodeTypeSelector({ id, data }) {
    const { setLanguage } = useStore(selector(id), shallow);

    return (
        <div className="flex flex-col rounded-md bg-white shadow-xl border w-96">
            <p className={"rounded-t-md px-2 py-1 bg-red-500 text-white text-sm"}>
                Code selection
            </p>
            <label className="flex flex-col px-2 py-1">
                <p className="text-xs font-bold mb-2">Language:</p>
                <select name="selectModel">
                    {models.map((model) => (
                        <option value={model.value} onChange={setLanguage}>{model.name}</option>
                    ))}
                </select>
            </label>
            <Handle className="w-2 h-2" type="source" position="bottom" />
            <Handle className="w-2 h-2" type="target" position="top" />
        </div >
    );
}
