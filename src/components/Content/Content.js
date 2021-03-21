import React, { useContext, useState, useEffect } from "react";
import "./Content.css";

import AppContext from "../../auth/context/context";
import CytoscapeComponent from "react-cytoscapejs";
import Loader from "../Loader/Loader";

/**
 * Componente que representa el contenido
 * de la arquitectura seleccionada
 */
const Content = () => {
  const [elementos, setElementos] = useState();
  const { selectedProject } = useContext(AppContext);
  const [load, setLoad] = useState(false);
  let cyto;

  /** Creacion de capa de estilos para el grafo segun Cytoscape */
  var state = {
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
    cyto.on("select", "node", selectedNodeHandler);
    //cyto.style().selector("node").style("background-color", "magenta").update(); // indicate the end of your new stylesheet so that it can be updated on elements
  }

  /**
   * Manejador de evento al seleccionar nodo
   * @param {Event} event referencia al componente
   */
  const selectedNodeHandler = (event) => {
    //console.log(evt.data); // 'bar'
    let target = event;
    //console.log("select ", target);
  };

  useEffect(() => {
    setLoad(true);
    setElementos(selectedProject.elements);
  }, [selectedProject]);

  useEffect(() => {
    if (load) {
      setLoad(false);
    }
  }, [elementos, load]);

  return (
    <>
      {load ? (
        <Loader />
      ) : elementos ? (
        <CytoscapeComponent
          id="component"
          zoom={1}
          maxZoom={2}
          elements={CytoscapeComponent.normalizeElements(elementos)}
          className="component"
          layout={state.layout}
          stylesheet={state.stylesheet}
          pan={{ x: 150, y: 30 }}
          cy={(cy) => {
            getCy(cy);
          }}
        />
      ) : null}
    </>
  );
};

export default Content;
