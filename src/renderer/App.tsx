import { DragEvent, useCallback, useRef, useState } from 'react';

import './index.css';
import 'reactflow/dist/style.css';

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow';

import { shallow } from 'zustand/shallow';
import {
  FiPlayCircle,
  FiKey,
  FiMessageSquare,
  FiImage,
  FiMusic,
  FiSettings,
} from 'react-icons/fi';

import useStore from './store';
import nodes from './nodes';

import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';

import getAllFlows from './utils/getAllFlows';
import isValidConnection from './utils/isValidConnection';

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

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    if (!event.dataTransfer) return;

    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!event.dataTransfer) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (reactFlowInstance == null) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 210,
        y: event.clientY,
      });

      store.createNode(type, position);
    },
    [reactFlowInstance],
  );

  const handleRun = () => {
    const myJson = {};
    const startNode = store.nodes.find((val) => val.type === 'start');
    if (!startNode) return;

    const allPaths = [];
    getAllFlows(store, startNode.id, [], allPaths);

    if (allPaths.length <= 0) return;

    for (const nodes of allPaths) {
      for (let i = 0; i < nodes.length; i++) {
        const node = store.getNode(nodes[i]);
        myJson[node.type] = node.data;
      }
    }

    let myCode = '';

    for (const x in myJson) {
      if (['start', 'end', 'codeLanguage', 'display'].includes(x)) continue;

      store.updateCompletionType(x);

      const { fn, ...args } = myJson[x];
      if (fn) {
        myCode += fn({ ...args, language: store.language });
        myCode += `
`;
      }
    }

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
            nodeTypes={nodes}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onConnect={store.addEdge}
            isValidConnection={(connection) =>
              isValidConnection(store, connection)
            }
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
