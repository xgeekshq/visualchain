import { shallow } from 'zustand/shallow';
import useStore from '../store';

const selector = (store) => ({
  outputString: store.outputString,
  completionType: store.completionType,
});
export default function Display() {
  const store = useStore(selector, shallow);

  return (
    <div className="flex flex-col rounded-md bg-white shadow-xl border w-[600px] z-[100]">
      <p className="rounded-t-md px-2 py-1 bg-purple-500 text-white text-sm">
        Output
      </p>
      <label className="flex px-2 py-1 w-full items-center justify-center">
        {store.completionType !== 'openAIImages' ? (
          <p className=" text-lg font-bold">{store.outputString}</p>
        ) : (
          <img
            src={store.outputString}
            alt="output"
            width="1024"
            height="1024"
          />
        )}
      </label>
    </div>
  );
}
