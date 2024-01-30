import { applyNodeChanges, applyEdgeChanges, Node, Edge } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import {
  initOpenAI,
  openAICompletion,
  openAIImageCompletion,
  openAITranscription,
} from '../codeSnippets/general';

interface VisualchainState {
  nodes: Node[];
  edges: Edge[];
}

const useStore = create<VisualchainState>((set, get) => {
  const getNode = (id: string) => {
    return get().nodes.find((node) => node.id === id);
  };

  const addNode = (data: object, type: string) => {
    const id = nanoid();
    const newNode = {
      id,
      position: { x: 0, y: 0 },
      data,
      type,
    };

    set({ nodes: [...get().nodes, newNode] });
  };

  const onEdgesChange = (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  };

  const updateNode = (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    });
  };

  const addEdge = (data) => {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  };

  const updateData = (newData) => {
    set({ data: newData });
  };

  const updateExplanation = (newExplanation) => {
    set({ explanation: get().explanation.concat(newExplanation) });
  };

  const updateLanguage = (newLanguage) => {
    set({ language: newLanguage });
  };

  const updateOutputString = (outputString) => {
    set({ outputString });
  };

  const updateCompletionType = (type) => {
    set({ completionType: type });
  };

  return {
    nodes: [
      { id: nanoid(), type: 'start', position: { x: 50, y: 50 } },
      {
        id: nanoid(),
        type: 'tutorial',
        draggable: false,
        selectable: false,
        position: { x: 200, y: 50 },
      },
      { id: nanoid(), type: 'end', position: { x: 50, y: 900 } },
    ],
    edges: [],
    getNode,
    addNode,
    onEdgesChange,
    updateNode,
    addEdge,
    updateData,
    updateExplanation,
    updateLanguage,
    updateOutputString,
    updateCompletionType,
    data: {},
    explanation: '',
    outputString: '',
    completionType: '',
    language: 'py',
    onNodesChange(changes) {
      const removeNode = changes.find((c) => c.type === 'remove');
      if (!removeNode) return;

      const nodeToRemove = getNode(removeNode.id);
      if (!nodeToRemove) return;
      if (nodeToRemove.type === 'start' || nodeToRemove.type === 'end') return;

      if (
        ['openAITranscription', 'openAIImages', 'openAICompletion'].includes(
          nodeToRemove.type,
        )
      ) {
        set({
          nodes: applyNodeChanges(
            changes,
            get().nodes.filter(
              (val) =>
                val.type !== 'display' &&
                val.type !== 'codeBlock' &&
                val.type !== 'explanation',
            ),
          ),
        });

        return;
      }

      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
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
            model: 'dall-e-2',
            numImages: 1,
            height: 1024,
            width: 1024,
            fn: openAIImageCompletion,
          };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
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
        case 'display': {
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
          const data = {
            filePath: '',
            model: 'whisper-1',
            fn: openAITranscription,
          };
          set({ nodes: [...get().nodes, { id, type, data, position }] });
          break;
        }
        default: {
          console.error('Unknown Node Type!');
        }
      }
    },
  };
});

export default useStore;
