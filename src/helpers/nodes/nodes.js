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

const manageCellClick = (nodeArray, selectedNodes, setSelectedNodes, setSelectionModel) => {
    const tempSet = new Set(nodeArray);
    const temp = new Set();
    selectedNodes.forEach(node => {
        if(tempSet.has(node)){
            temp.add(node);
        }
    });
    setSelectedNodes(temp);
    setSelectionModel([...temp]);
}

export default {
    addNode,
    manageCellClick,
    removeNode,
}