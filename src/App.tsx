import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

import 'reactflow/dist/style.css';

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  updateNode: store.updateNode
});

export default function App() {
  const store = useStore(selector, shallow);


  const handleRun = () => {
    const input = store.nodes.find((val) => val.type === "input").data.input

    const result = store.nodes.find((val) => val.type === "action").data.action(input)

    const output = store.nodes.find((val) => val.type === "output")

    console.log(output)

    store.updateNode(output.id, { label: result })

    console.log(store.nodes.find((val) => val.type === "output"))
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={handleRun}>Run</button>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
