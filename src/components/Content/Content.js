import React, { useContext, useState, useEffect } from "react";
import "./Content.css";

import AppContext from "../../auth/context/context";
import CytoscapeComponent from "react-cytoscapejs";

/**
 * Componente que representa el contenido
 * de la arquitectura seleccionada
 */
const Content = ({}) => {
  const [elementos, setElementos] = useState();
  const { selectedProject } = useContext(AppContext);  
  let cyto;

  /** Creacion de capa de estilos para el grafo */
  var state = {
    h: "80%",
    w: "80%",
    layout: {
      name: "random",
      fit: true,
      padding: 20,
      avoidOverlap: true,
      nodeDimensionsIncludeLabels: true,
      avoidOverlapPadding: 10,
    },
    stylesheet: [
      {
        selector: "node",
        style: {
          content: "data(id)",
          width: 6,
          height: 6,

          "background-color": "#a65ba6",
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          content: "data(id)",
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          "line-color": "#ddd",
          "target-arrow-color": "#18202C",
        },
      },
    ],
  };

/**
 * Crear referencia al elemento de Cytoscape y
 * actuar el tamaño viewport del grafo 
 * @param {CytoscapeComponent} cy referencia al componente
 */
  function getCy(cy) {
    cyto = cy;
    cyto.resize();
    //cyto.style().selector("node").style("background-color", "magenta").update(); // indicate the end of your new stylesheet so that it can be updated on elements
  }

  useEffect(() => {
    setElementos(selectedProject.elements);
    //console.log(selectedProject, "elements static");
  }, [selectedProject]);

  return (
    <>
      {elementos ? (
        <CytoscapeComponent
          id="component"
          zoom={0.5}
          maxZoom={2}
          elements={CytoscapeComponent.normalizeElements(elementos)}
          className="component"
          layout={state.layout}
          stylesheet={state.stylesheet}
          cy={(cy) => {
            getCy(cy);
          }}
        />
      ) : null}
    </>
  );
};

export default Content;
