const isValidConnection = (store, connection) => {
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

  return false;
};

export default isValidConnection;
