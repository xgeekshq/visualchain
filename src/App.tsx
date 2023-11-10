import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from './store';

import 'reactflow/dist/style.css';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  data: store.data,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  updateNode: store.updateNode,
  appendFlow: store.appendFlow,
  getNode: store.getNode,
  addNode: store.addNode,
});

export default function App() {
  const store = useStore(selector, shallow);

  function getAllFlows(startNodeId, currentPath = [], allPaths = []) {
    const currentNode = store.nodes.find((node) => node.id === startNodeId);

    // If the current node is a "stop" type, add the current path to the list of all paths
    if (currentNode.type === 'stop') {
      allPaths.push([...currentPath, currentNode.id]);
      return;
    }

    // Iterate through outgoing edges from the current node
    const outgoingEdges = store.edges.filter(
      (edge) => edge.source === startNodeId,
    );
    for (const edge of outgoingEdges) {
      const nextNodeId = edge.target;

      // Avoid cycles by checking if the next node is already in the current path
      if (!currentPath.includes(nextNodeId)) {
        // Recursively explore the next node
        getAllFlows(nextNodeId, [...currentPath, currentNode.id], allPaths);
      }
    }
  }

  const handleRun = () => {
    const startNode = store.nodes.find((val) => val.type === 'start');
    if (!startNode) return;

    let allPaths = [];
    getAllFlows(startNode.id, [], allPaths);

    if (allPaths.length <= 0) return;

    for (const nodes of allPaths) {
      for (let i = 0; i < nodes.length; i++) {
        const node = store.getNode(nodes[i]);
        console.log(node.data);
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <Navbar>
        <NavbarItem label="Run" onClick={handleRun} />
        <NavbarItem
          label="Add Start"
          onClick={() => store.addNode({ type: 'start', label: 'Start' })}
        />
        <NavbarItem
          label="Input"
          onClick={() => store.addNode({ type: 'userInput', label: 3 })}
        />
        <NavbarItem
          label="Operation"
          onClick={() => store.addNode({ type: 'operation', label: '+' })}
        />
        <NavbarItem
          label="Output"
          onClick={() => store.addNode({ type: 'display', label: '' })}
        />
        <NavbarItem
          label="Add End"
          onClick={() => store.addNode({ type: 'stop', label: 'End' })}
        />
      </Navbar>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
