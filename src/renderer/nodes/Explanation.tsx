import { shallow } from 'zustand/shallow';
import useStore from '../store';
import Node from '../components/Node/Node';

const selector = (store) => ({
  explanation: store.explanation,
});

export default function Explanation() {
  const store = useStore(selector, shallow);

  return (
    <Node title="Code Explanation" titleBG="bg-purple-500" size="lg">
      <p className=" text-lg font-bold">{store.explanation}</p>
    </Node>
  );
}
