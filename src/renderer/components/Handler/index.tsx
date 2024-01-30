import { useMemo } from 'react';
import {
  getConnectedEdges,
  Handle,
  HandleType,
  Position,
  useNodeId,
  useStore,
} from 'reactflow';

const selector = (s) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

type CustomHandleType = {
  isConnectable: Function | number;
  type: HandleType;
  position: Position;
};

function CustomHandle({ isConnectable, type, position }: CustomHandleType) {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);

    if (typeof isConnectable === 'function') {
      return isConnectable({ node, connectedEdges });
    }

    if (typeof isConnectable === 'number') {
      return connectedEdges.length < isConnectable;
    }

    return isConnectable;
  }, [nodeInternals, edges, nodeId, isConnectable]);

  return (
    <Handle
      type={type}
      position={position}
      isConnectable={isHandleConnectable}
      className="w-2 h-2"
    />
  );
}

export default CustomHandle;
