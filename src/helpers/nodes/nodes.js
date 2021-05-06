/**
 * Agregar un nodo al set
 * @param {String} id ID del nodo
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const addNode = (id, selectedNodes, setSelectedNodes, cy, setSelectionModel) => {
    const temp = selectedNodes;
    temp.add(id);
    setSelectedNodes(temp);
    setSelectionModel([...temp]);
    changeNodeColor(cy, id, 'add');
}

/**
 * Eliminar un nodo del set
 * @param {String} id ID del nodo
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const removeNode = (id, selectedNodes, setSelectedNodes, cy, setSelectionModel) => {
    const temp = selectedNodes;
    temp.delete(id);
    setSelectedNodes(temp);
    setSelectionModel([...temp]);
    changeNodeColor(cy, id, 'remove');
}

/**
 * Manejar acción al hacer click en una 
 * celda de la tabla
 * @param {String} nodeId 
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const manageCellClick = (nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel) => {
    if(selectedNodes.has(nodeId)){
        removeNode(nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel);
        cy.getElementById(nodeId)['_private']['selected'] = false;
    }
    else{
        addNode(nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel);
        cy.getElementById(nodeId)['_private']['selected'] = true;
    }
}

/**
 * Cambiar el color del nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} nodeId ID del nodo
 * @param {String} type Selección/Deselección del nodo
 */
const changeNodeColor = (cy, nodeId, type) => {
    const backgroundColor = type === 'remove' ? "#18202C" : "#ffc74d";
    cy.getElementById(nodeId).animate(
      {
        style: {
          "background-color": backgroundColor,
        },
      },
      {
        duration: 0,
      }
    );
}

export default {
    addNode,
    manageCellClick,
    removeNode,
}