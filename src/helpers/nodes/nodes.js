/**
 * Agregar un nodo al set
 * @param {String} id ID del nodo
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const addNode = (
  id,
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  const temp = selectedNodes;
  temp.add(id);
  setSelectedNodes(temp);
  setSelectionModel([...temp]);
  changeNodeColor(cy, id, "add");
  const edges = getEdges(cy, id);
  changeEdgesColor(cy, edges, "add");
};

/**
 * Eliminar un nodo del set
 * @param {String} id ID del nodo
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const removeNode = (
  id,
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  const temp = selectedNodes;
  temp.delete(id);
  setSelectedNodes(temp);
  setSelectionModel([...temp]);
  changeNodeColor(cy, id, "remove");
  const edges = getEdges(cy, id);
  changeEdgesColor(cy, edges, "remove");
};

/**
 * Manejar acción al hacer click en una
 * celda de la tabla
 * @param {String} nodeId
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const manageCellClick = (
  nodeId,
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  if (selectedNodes.has(nodeId)) {
    removeNode(nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel);
    cy.getElementById(nodeId)["_private"]["selected"] = false;
    repaintEdges(selectedNodes, cy);
  } else {
    addNode(nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel);
    cy.getElementById(nodeId)["_private"]["selected"] = true;
  }
};

/**
 * Cambiar el color del nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} nodeId ID del nodo
 * @param {String} type Selección/Deselección del nodo
 */
const changeNodeColor = (cy, nodeId, type) => {
  const backgroundColor = type === "remove" ? "#18202C" : "#ffc74d";
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
};

/**
 * Obtener todas las aristas de
 * un nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} nodeId ID del nodo
 * @returns arreglo de objetos con info de aristas
 */
const getEdges = (cy, nodeId) => {
  return cy.getElementById(nodeId).connectedEdges();
};

/**
 * Manejar el cambio de color de todas las aristas
 * de un nodo
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Array} edges Arreglo de objetos con info de aristas
 * @param {String} type Selección/Deselección del nodo
 */
const changeEdgesColor = (cy, edges, type) => {
  edges.forEach((edge) => {
    const edgeId = edge["_private"]["data"].id;
    changeEdgeColor(cy, edgeId, type);
  });
};

/**
 * Cambiar el color de una arista
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {String} edgeId ID de la arista
 * @param {String} type Selección/Deselección del nodo
 */
const changeEdgeColor = (cy, edgeId, type) => {
  const backgroundColor = type === "remove" ? "#18202C" : "#ffc74d";
  cy.getElementById(edgeId).style({
    "line-color": backgroundColor,
    "target-arrow-color": backgroundColor,
  });
};

/**
 * Manejar selección de columna de nodos
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const manageCheckSelection = (
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  const nodes = cy.filter("nodes");
  if (selectedNodes.size > 0) {
    removeAllNodes(selectedNodes, setSelectedNodes, cy, setSelectionModel);
  } else {
    addAllNodes(nodes, selectedNodes, setSelectedNodes, cy, setSelectionModel);
  }
};

/**
 * Deseleccionar todos los nodos
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const removeAllNodes = (
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  selectedNodes.forEach((node) => {
    removeNode(node, selectedNodes, setSelectedNodes, cy, setSelectionModel);
    cy.getElementById(node)["_private"]["selected"] = false;
  });
};

/**
 * Seleccionar todos los nodos
 * @param {Array} nodeArray Arreglo de nodos
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Function} setSelectedNodes Función para setear los nodos seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 * @param {Function} setSelectionModel Función para setear el selection model
 */
const addAllNodes = (
  nodeArray,
  selectedNodes,
  setSelectedNodes,
  cy,
  setSelectionModel
) => {
  nodeArray.forEach((node) => {
    const nodeId = node["_private"]["data"].id;
    addNode(nodeId, selectedNodes, setSelectedNodes, cy, setSelectionModel);
    cy.getElementById(nodeId)["_private"]["selected"] = true;
  });
};

/**
 * Repintar las aristas
 * @param {Set} selectedNodes Nodos globalmente seleccionados
 * @param {Ref} cy Referencia a objeto cytoscape
 */
const repaintEdges = (selectedNodes, cy) => {
  selectedNodes.forEach((node) => {
    const edges = getEdges(cy, node);
    changeEdgesColor(cy, edges);
  });
};

/**
 * Conseguir todos los nodos del proyecto
 * actualmente abierto
 * @param {JSON} selectedProject Objeto con información del proyecto actual
 * @returns Arreglo de objetos de tipo nodo
 */
const getNodeData = (selectedProject) => {
  return selectedProject.elements.nodes.map((node, index) => ({
    id: index,
    name: node.data.name,
    module: node.data.module,
    incomompleteProperties: node.data.incomompleteProperties,
  }));
};

/**
 * Conseguir todas las relaciones existentes
 * del proyecto actualmente abierto
 * @param {JSON} selectedProject Objeto con información del proyecto actual
 * @returns Arreglo de objetos de tipo aristas
 */
const getRelationData = (selectedProject) => {
  return selectedProject.elements.edges?.map((edge, index) => {
    return {
      id: index,
      source: edge.data.source,
      target: edge.data.target,
      relation: getRelationType(edge.scratch.relation),
      dms: edge.hasOwnProperty('metrics') ? edge.metrics.DMS.value : 'No Calculado',
      abstractness: edge.hasOwnProperty('metrics') ? edge.metrics.abstractness?.value : 'No Calculado',
      coupling: edge.hasOwnProperty('metrics') ? edge.metrics.coupling.value : 'No Calculado',
      instability: edge.hasOwnProperty('metrics') ? edge.metrics.instability?.value : 'No Calculado',
      nameRessemblance: edge.hasOwnProperty('metrics') ? edge.metrics.nameRessemblance?.value : 'No Calculado',
      packageMapping: edge.hasOwnProperty('metrics') ? edge.metrics.packageMapping?.value : 'No Calculado',
    };
  })
};

/**
 * Obtener el nombre de una relación
 * @param {String} relation Tipo de relación
 * @returns Nombre de la relación
 */
const getRelationType = (relation) => {
  switch (relation) {
    case "implements":
      return "Implementación";
    case "extends":
      return "Extensión";
    case "use":
      return "Use"
    default:
      break;
  }
};

export default {
  addNode,
  manageCellClick,
  manageCheckSelection,
  getNodeData,
  getRelationData,
  removeNode,
  repaintEdges,
};

export {
  repaintEdges
}
