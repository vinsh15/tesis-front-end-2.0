import React, { useContext, useState, useEffect } from "react";
import "./Content.css";

import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import Swal from "sweetalert2";

import AppContext from "../../auth/context/context";
import CytoscapeComponent from "react-cytoscapejs";
import Loader from "../Loader/Loader";

/**
 * Componente que representa el contenido
 * de la arquitectura seleccionada
 */
const Content = () => {
  const classes = useStyles();
  const [elementos, setElementos] = useState();
  const { selectedProject, setSelectedProject, setCy } = useContext(AppContext);
  const [load, setLoad] = useState(false);
  let cyto;

  /** Creacion de capa de estilos para el grafo segun Cytoscape */
  var state = {
    layout: {
      name: "random",
      fit: true,
      padding: 30,
      avoidOverlap: true,
      nodeDimensionsIncludeLabels: true,
      avoidOverlapPadding: 150,
    },
    stylesheet: [
      {
        selector: "node",
        style: {
          content: "data(id)",
          width: 10,
          height: 10,
          "background-color": "#18202C",
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
   * Cerrar proyecto seleccionado
   * @param {CytoscapeComponent} cy referencia al componente
   */
  function onClose() {
    Swal.fire({
      text: "¿Seguro que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--success)",
      cancelButtonColor: "var(--error)",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedProject();
      }
    });
  }

  /**
   * Crear referencia al elemento de Cytoscape y
   * actuar el tamaño viewport del grafo
   * @param {CytoscapeComponent} cy referencia al componente
   */
  function getCy(cy) {
    cyto = cy;
    cyto.fit();
    cyto.on("select", "node", selectedNodeHandler);
    cyto.on("unselect", "node", unselectNodeHandler);
    //cyto.style().selector("node").style("background-color", "magenta").update(); // indicate the end of your new stylesheet so that it can be updated on elements
  }

  /**
   * Manejador de evento al seleccionar nodo
   * @param {Event} event referencia al elemento
   */
  const selectedNodeHandler = (evt) => {
    //console.log(evt.data); // 'bar'
    console.log();
    cyto.getElementById("Behavior").animate(
      {
        style: {
          "background-color": "#ffc74d",
        },
      },
      {
        duration: 100,
      }
    );
    //console.log("select ", target);
  };

  /**
   * Manejador de evento dejar de seleccionar nodo
   * @param {Event} event referencia al elemento
   */
  const unselectNodeHandler = (evt) => {
    //console.log(evt.data); // 'bar'
    cyto.getElementById("Behavior").animate(
      {
        style: {
          "background-color": "#18202C",
        },
      },
      {
        duration: 100,
      }
    );
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
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            className={classes.onClose}
            onClick={onClose}
            edge="start"
          >
            <HighlightOffIcon />
          </IconButton>
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
              setCy(cy);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  onClose: {
    position: "absolute",
    right: "18px",
    top: "70px",
    zIndex: 3,
  },
}));

export default Content;
