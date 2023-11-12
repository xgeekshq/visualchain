import React from "react";
import { shallow } from "zustand/shallow";
import CustomHandle from "../components/Handler";
import useStore from "../store";

const models = [
    { value: "py", name: "Python" },
    { value: "js", name: "Javascript" }
];

const selector = (id) => (store) => ({
    setLanguage: (e) => {
        store.updateNode(id, {language: e.target.value})
        store.updateLanguage(e.target.value)
    }
});

export default function CodeTypeSelector({ id }) {
    const { setLanguage } = useStore(selector(id), shallow);

    return (
        <div className="flex flex-col rounded-md bg-white shadow-xl border w-96">
            <p className={"rounded-t-md px-2 py-1 bg-red-500 text-white text-sm"}>
                Code selection
            </p>
            <label className="flex flex-col px-2 py-1">
                <p className="text-xs font-bold mb-2">Language:</p>
                <select name="selectModel" onChange={setLanguage}>
                    {models.map((model) => (
                        <option value={model.value}>{model.name}</option>
                    ))}
                </select>
            </label>
            <CustomHandle className="w-2 h-2" type="source" position="bottom"  isConnectable={2} />
            <CustomHandle className="w-2 h-2" type="target" position="top"  isConnectable={2}/>
        </div >
    );
}
