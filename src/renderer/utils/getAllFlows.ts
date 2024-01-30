function getAllFlows(
  store,
  startNodeId: string,
  currentPath = [],
  allPaths = [],
) {
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
      getAllFlows(
        store,
        nextNodeId,
        [...currentPath, currentNode.id],
        allPaths,
      );
    }
  }
}

export default getAllFlows;
