import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

const add = (value: number) => {
  return +value + +value;
};

export const useStore = create((set, get) => ({
  flows: [],
  nodes: [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: { input: '', label: 'input' },
      type: 'input',
    },
    {
      id: '2',
      position: { x: 0, y: 100 },
      data: { label: 'action' },
      type: 'action',
    },
    {
      id: '3',
      position: { x: 0, y: 200 },
      data: { label: 'action' },
      type: 'action',
    },
    {
      id: '4',
      position: { x: 0, y: 300 },
      data: { label: 'stop' },
      type: 'stop',
    },
    {
      id: '5',
      position: { x: 0, y: 400 },
      data: { label: 'stop' },
      type: 'stop',
    },
    {
      id: '6',
      position: { x: 0, y: 500 },
      data: { label: 'output' },
      type: 'action',
    },
  ],
  edges: [],

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

  addFlow(newFlow) {
    set({ flows: [...get().flows, newFlow] });
  },
}));
