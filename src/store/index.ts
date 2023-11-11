import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import {
  initOpenAI,
  openAICompletion,
  openAIImageCompletion,
  openAITranscription,
} from '../codeSnippets/general';

const useStore = create((set, get) => {
  return {
    nodes: [
      { id: nanoid(), type: 'start', position: { x: 50, y: 50 } },
      { id: nanoid(), type: 'end', position: { x: 50, y: 700 } },
    ],
    edges: [],
    data: {},
    explanation: '',
    language: 'js',

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
      const removeNode = changes.find((c) => c.type === 'remove');
      if (removeNode) {
        const nodeToRemove = get().nodes.find((n) => n.id === removeNode.id);

        if (nodeToRemove.type === 'start' || nodeToRemove.type === 'end')
          return;
      }

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

    createNode(type, position = { x: 0, y: 0 }) {
      const id = nanoid();

      switch (type) {
        case 'openAI': {
          const data = { apiKey: '', fn: initOpenAI };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'openAICompletion': {
          const data = {
            model: 'gpt-3.5-turbo-1106',
            temperature: 0,
            prompt: '',
            fn: openAICompletion,
          };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'openAIImages': {
          const data = {
            prompt: '',
            numImages: 1,
            height: 512,
            width: 512,
            fn: openAIImageCompletion,
          };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'start': {
          set({ nodes: [...get().nodes, { id, type, position }] });
          break;
        }
        case 'end': {
          set({ nodes: [...get().nodes, { id, type, position }] });
          break;
        }
        case 'codeBlock': {
          const data = { code: get().data };
          const position = { x: 200, y: 300 };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'explanation': {
          const data = { code: get().data };
          const position = { x: 100, y: 100 };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'codeLanguage': {
          const data = { language: 'js' };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        case 'openAITranscription': {
          const data = { filePath: '', fn: openAITranscription };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
      }
    },

    updateData(newData) {
      set({ data: newData });
    },

    updateExplanation(newExplanation) {
      set({ explanation: get().explanation.concat(newExplanation) });
    },
    updateLanguage(newLanguage) {
      set({ language: newLanguage });
    },
  };
});

export default useStore;
