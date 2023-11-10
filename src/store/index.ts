import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

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
