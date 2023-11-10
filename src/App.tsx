import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

import 'reactflow/dist/style.css';

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  data: store.data,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  updateNode: store.updateNode,
  appendFlow: store.appendFlow
});

export default function App() {
  const store = useStore(selector, shallow);

  function getAllFlows(startNodeId, currentPath = [], allPaths = []) {
    const currentNode = store.nodes.find(node => node.id === startNodeId);

    // If the current node is a "stop" type, add the current path to the list of all paths
    if (currentNode.type === "stop") {
      allPaths.push([...currentPath, currentNode.id]);
      return;
    }
  
    // Iterate through outgoing edges from the current node
    const outgoingEdges = store.edges.filter(edge => edge.source === startNodeId);
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


    const input = store.nodes.find((val) => val.type === "input")
    
    let allPaths = [];
    getAllFlows(input.id, [], allPaths)
    console.log(allPaths)

    

    
   

    // const result = store.nodes.find((val) => val.type === "action").data.action(input)

    // const output = store.nodes.find((val) => val.type === "output")

    // console.log(output)

    // store.updateNode(output.id, { label: result })

    // console.log(store.edges)
  }

  const isValidConnection = (connection) => {
    const sourceNode = store.nodes.find((val) => val.id === connection.source)

    const targetNode = store.nodes.find((val) => val.id === connection.target)

    if (sourceNode.type === "input" && targetNode.type === "action") {
      return true
    }

    if (sourceNode.type === "action" && targetNode.type === "output" || targetNode.type === "action") {
      return true
    }

    return false
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={handleRun}>Run</button>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        // isValidConnection={isValidConnection}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
