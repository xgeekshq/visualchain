import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { saveAs } from 'file-saver';
import useStore from "./store";

import "reactflow/dist/style.css";
import Navbar from "./components/Navbar/Navbar";
import NavbarItem from "./components/Navbar/NavbarItem";
import OpenAI from "./nodes/OpenAI";

const nodeTypes = {
  openAI: OpenAI
}

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  data: store.data,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  createNode: store.createNode,
  addEdge: store.addEdge,
  updateNode: store.updateNode,
  appendFlow: store.appendFlow,
  getNode: store.getNode,
  addNode: store.addNode,
  updateData: store.updateData
});

export default function App() {
  const store = useStore(selector, shallow);

  function getAllFlows(startNodeId, currentPath = [], allPaths = []) {
    const currentNode = store.nodes.find((node) => node.id === startNodeId);

    // If the current node is a "stop" type, add the current path to the list of all paths
    if (currentNode.type === "stop") {
      allPaths.push([...currentPath, currentNode.id]);
      return;
    }

    // Iterate through outgoing edges from the current node
    const outgoingEdges = store.edges.filter(
      (edge) => edge.source === startNodeId
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
    let myJson = {}
    const startNode = store.nodes.find((val) => val.type === "start");
    if (!startNode) return;

    const allPaths = [];
    getAllFlows(startNode.id, [], allPaths);

    if (allPaths.length <= 0) return;

    for (const nodes of allPaths) {
      for (let i = 0; i < nodes.length; i++) {
        const node = store.getNode(nodes[i]);
        myJson[node.type] = node.data
      }
    }

    store.updateData(myJson)

  };

  console.log(store.data)

  return (
    <div className="flex w-full h-screen">
      <Navbar>
        <NavbarItem label="Run" onClick={handleRun} />
        <NavbarItem
          label="Add Start"
          onClick={() => store.addNode({ label: "Start" }, 'start')}
        />
        <NavbarItem
          label="Input"
          onClick={() => store.addNode({ type: "userInput", label: 3 })}
        />
        <NavbarItem
          label="OpenAi"
          onClick={() => store.createNode("openAI")}
        />
        <NavbarItem
          label="Operation"
          onClick={() => store.addNode({ type: "operation", label: "+" })}
        />
        <NavbarItem
          label="Output"
          onClick={() => store.addNode({ type: "display", label: "" })}
        />
        <NavbarItem
          label="Add End"
          onClick={() => store.addNode({ label: "End" }, 'stop')}
        />
        <NavbarItem
          label='Download'
          onClick={() => {
            let output = ``

            for (const key in store.data) {
              // console.log(key)
              if (store.data.hasOwnProperty(key)) {
                console.log(`${key} : ${store.data[key]}`)
                if (key === "openAI") {
                  // This is just a test!!
                  let apiKey = store.data[key].apiKey

                  output += `from openai import OpenAI

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="${apiKey}",
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        }
    ],
    model="gpt-3.5-turbo",
)

print(chat_completion.choices[0].message.content)
`
                }
              }
            }

            const file = new Blob([output], { type: 'text/plain;charset=utf-8' });
            saveAs(file, 'hello_world.py');
          }}
        />
      </Navbar>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        nodeTypes={nodeTypes}
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
