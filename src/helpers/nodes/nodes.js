const addNode = (id, selectedNodes, setSelectedNodes) => {
    const temp = selectedNodes;
    temp.add(id);
    setSelectedNodes(temp);
}

const removeNode = (id, selectedNodes, setSelectedNodes) => {
    const temp = selectedNodes;
    temp.delete(id);
    setSelectedNodes(temp);
}

export default {
    addNode,
    removeNode,
}