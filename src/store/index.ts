import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { initOpenAI } from '../codeSnippets/python';

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  data: {},
  getNode(id: string) {
    return get().nodes.find((node) => node.id === id);
  },

  addNode(data: object, type: string) {
    const id = nanoid();

    const newNode = {
      id,
      position: { x: 0, y: 0 },
      data,
      type,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },

	createNode(type) {
    const id = nanoid();

    switch (type) {
      case 'openAI': {
        const data = { apiKey: '', fn: initOpenAI };
        const position = { x: 0, y: 0 };

        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
			case 'openAICompletion': {
        const data = { model: 'gpt-3.5-turbo-1106', temperature: 0, prompt: '' };
        const position = { x: 0, y: 0 };

        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
			case 'openAIImages': {
        const data = { prompt: '', numImages: 1, height: 512, width: 512 };
        const position = { x: 0, y: 0 };

        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },

  updateData(newData) {
    set({data: newData })
  },
}));

export default useStore;
