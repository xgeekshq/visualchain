import './index.css';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useCallback, useRef, useState } from 'react';
import {
  FiPlayCircle,
  FiKey,
  FiMessageSquare,
  FiImage,
  FiMusic,
  FiSettings,
} from 'react-icons/fi';
import useStore from './store';

import 'reactflow/dist/style.css';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';
import OpenAI from './nodes/OpenAI';
import OpenAICompletion from './nodes/OpenAICompletion';
import OpenAIImages from './nodes/OpenAIImage';
import End from './nodes/End';
import CodeBlock from './nodes/Codeblock';
import Start from './nodes/Start';
import Explanation from './nodes/Explanation';
import CodeTypeSelector from './nodes/CodeTypeSelector';
import OpenAITranscription from './nodes/OpenAITranscription';

import Display from './nodes/Display';
import Tutorial from './nodes/Tutorial';

const nodeTypes = {
  openAI: OpenAI,
  openAICompletion: OpenAICompletion,
  openAIImages: OpenAIImages,
  openAITranscription: OpenAITranscription,
  end: End,
  start: Start,
  codeBlock: CodeBlock,
  explanation: Explanation,
  codeLanguage: CodeTypeSelector,
  display: Display,
  tutorial: Tutorial,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  data: store.data,
  language: store.language,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  createNode: store.createNode,
  addEdge: store.addEdge,
  updateNode: store.updateNode,
  appendFlow: store.appendFlow,
  getNode: store.getNode,
  addNode: store.addNode,
  updateData: store.updateData,
  updateLanguage: store.updateLanguage,
  updateCompletionType: store.updateCompletionType,
});

export default function App() {
  const reactFlowWrapper = useRef(null);
  const store = useStore(selector, shallow);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 210,
        y: event.clientY,
      });

      store.createNode(type, position);
    },
    [reactFlowInstance],
  );

  const isValidConnection = (connection) => {
    const sourceNode = store.nodes.find((val) => val.id === connection.source);

    const targetNode = store.nodes.find((val) => val.id === connection.target);

    if (sourceNode.type === 'start' && targetNode.type === 'openAI') {
      return true;
    }

    if (
      sourceNode.type === 'openAI' &&
      (targetNode.type === 'openAICompletion' ||
        targetNode.type === 'openAIImages' ||
        targetNode.type === 'openAITranscription')
    ) {
      return true;
    }

    if (
      (sourceNode.type === 'openAICompletion' ||
        sourceNode.type === 'openAIImages' ||
        sourceNode.type === 'openAITranscription') &&
      targetNode.type === 'codeLanguage'
    ) {
      return true;
    }

    if (sourceNode.type === 'codeLanguage' && targetNode.type === 'end') {
      return true;
    }

    // if (sourceNode.type === "codeLanguage" && targetNode.type === "display") {
    //   return true
    // }

    // if (sourceNode.type === 'display' && targetNode.type === 'end') {
    //   return true;
    // }

    return false;
  };

  function getAllFlows(startNodeId, currentPath = [], allPaths = []) {
    const currentNode = store.nodes.find((node) => node.id === startNodeId);

    // If the current node is a "stop" type, add the current path to the list of all paths
    if (currentNode.type === 'end') {
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
    const myJson = {};
    const startNode = store.nodes.find((val) => val.type === 'start');
    if (!startNode) return;

    const allPaths = [];
    getAllFlows(startNode.id, [], allPaths);

    if (allPaths.length <= 0) return;

    for (const nodes of allPaths) {
      for (let i = 0; i < nodes.length; i++) {
        const node = store.getNode(nodes[i]);
        myJson[node.type] = node.data;
      }
    }

    let myCode = '';

    for (const x in myJson) {
      if (
        x === 'start' ||
        x === 'end' ||
        x === 'codeLanguage' ||
        x === 'display'
      )
        continue;

      store.updateCompletionType(x);

      const { fn, ...args } = myJson[x];
      if (fn) {
        myCode += fn({ ...args, language: store.language });
        myCode += `
`;
      }
    }

    // console.log(myCode);
    store.updateData(myCode);
    store.createNode('codeBlock');
  };

  return (
    <div className="flex w-full h-screen">
      <Navbar>
        <div className="flex items-center w-full px-3 mt-3 text-sm font-bold">
          OpenAI
        </div>
        <NavbarItem
          label="API Key"
          type="openAI"
          icon={<FiKey />}
          onClick={() => store.createNode('openAI')}
          draggable
        />
        <NavbarItem
          label="Completion"
          type="openAICompletion"
          icon={<FiMessageSquare />}
          onClick={() => store.createNode('openAICompletion')}
          draggable
        />
        <NavbarItem
          label="Images"
          type="openAIImages"
          icon={<FiImage />}
          onClick={() => store.createNode('openAIImages')}
          draggable
        />
        <NavbarItem
          label="Transcription"
          type="openAITranscription"
          icon={<FiMusic />}
          onClick={() => store.createNode('openAITranscription')}
          draggable
        />
        <div className="w-full mt-3 border-t border-gray-700" />
        <div className="flex items-center w-full px-3 mt-3 text-sm font-bold">
          Options
        </div>
        <NavbarItem
          label="Code language"
          type="codeLanguage"
          icon={<FiSettings />}
          onClick={() => store.createNode('codeLanguage')}
          draggable
        />
        <div className="w-full mt-3 border-t border-gray-700" />
        <NavbarItem
          label="Run"
          onClick={() => handleRun()}
          icon={<FiPlayCircle />}
        />
      </Navbar>
      <ReactFlowProvider>
        <div className="flex-grow h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={store.nodes}
            edges={store.edges}
            nodeTypes={nodeTypes}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onConnect={store.addEdge}
            isValidConnection={isValidConnection}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
