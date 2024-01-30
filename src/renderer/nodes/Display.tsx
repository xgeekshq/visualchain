import { shallow } from 'zustand/shallow';
import useStore from '../store';
import Node from '../components/Node/Node';

const selector = (store) => ({
  outputString: store.outputString,
  completionType: store.completionType,
});

export default function Display() {
  const store = useStore(selector, shallow);

  return (
    <Node title="Output" titleBG="purple" size="auto">
      {store.completionType !== 'openAIImages' ? (
        <p className="text-lg font-bold">{store.outputString}</p>
      ) : (
        <img src={store.outputString} alt="output" width="1024" height="1024" />
      )}
    </Node>
  );
}
