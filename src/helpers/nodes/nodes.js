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
    const edges = getEdges(cy, id);
    changeEdgesColor(cy, edges, 'add');
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
    const edges = getEdges(cy, id);
    changeEdgesColor(cy, edges, 'remove');
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

/**
 * Obtener todas las aristas de 
 * un nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} nodeId ID del nodo
 * @returns arreglo de objetos con info de aristas
 */
const getEdges = (cy, nodeId) => {
  return cy.getElementById(nodeId).connectedEdges();
}

/**
 * Manejar el cambio de color de todas las aristas
 * de un nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Array} edges Arreglo de objetos con info de aristas
 * @param {String} type Selección/Deselección del nodo
 */
const changeEdgesColor = (cy, edges, type) => {
  edges.forEach(edge => {
    const edgeId = edge['_private']['data'].id;
    changeEdgeColor(cy, edgeId, type);
  })
}

/**
 * Cambiar el color de una arista
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} edgeId ID de la arista
 * @param {String} type Selección/Deselección del nodo
 */
const changeEdgeColor = (cy, edgeId, type) => {
  const backgroundColor = type === 'remove' ? "#18202C" : "#ffc74d";
    cy.getElementById(edgeId).animate(
      {
        style: {
          "line-color": backgroundColor,
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