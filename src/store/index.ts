import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

const add = (value: number) => {
  return Number(value) + Number(value);
};

const useStore = create((set, get) => ({
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { input: '2' }, type: 'input' },
    {
      id: '2',
      position: { x: 0, y: 100 },
      data: { action: add },
      type: 'default',
    },
    {
      id: '3',
      position: { x: 0, y: 200 },
      data: { label: '' },
      type: 'output',
    },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],

  addNode({ type = 'default', label }: { type: string; label: string }) {
    const id = nanoid();

    const newNode = {
      id,
      position: { x: 0, y: 0 },
      data: { label },
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
}));

export default useStore;
