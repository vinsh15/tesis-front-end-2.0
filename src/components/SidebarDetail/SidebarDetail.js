import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
});

/**
 * Componente que representa el contenido
 * del item añadido como proyecto en la barra lateral
 */
function SidebarDetail(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

/**
 * Preguntar al usuario si desea mostrar la versión seleccionada
 * @param {String} nodeName nombre de la versión
 * @param {Integer} arqIndex índice de la arquitectura seleccionada
 * @param {Integer} verIndex índice de la versión seleccionada
 */
  const handleSelect = (nodeName, arqIndex, verIndex) => {
    if (nodeName !== selected) {
      Swal.fire({
        text: "¿Deseas mostrar " + nodeName + " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--success)",
        cancelButtonColor: "var(--error)",
        confirmButtonText: "Si, seguro",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelected([nodeName, verIndex, arqIndex]);
        }
      });
    }
  };

  /**
   * Funcion recursiva que agrega elementos al arbol como nodos
   * @param {Array} node almacena el arreglo de proyectos correspondiente al usuario
   * @returns {JSX} estructura de elementos en detalle
   */
  const renderTree = (nodes, select, arqIndex, verIndex) => (
    <>
      {nodes.name ? (
        <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name} onLabelClick={select ? () => handleSelect(nodes.name, arqIndex, verIndex) : null}>
          {Array.isArray(nodes.versions)
            ? nodes.versions.map((node, index) => renderTree(node, true, arqIndex, index))
            : null}
        </TreeItem>
      ) : (
        <TreeItem
          key={nodes.data.id}
          nodeId={nodes.data.id}
          label={nodes.data.id}
        ></TreeItem>
      )}
    </>
  );

  useEffect(() => {
    if (selected) {
      props.setItem(selected);
    }
  }, [selected]);

  return (
    <>
      <AccordionDetails>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}         
        >
          {props.item.architectures.map((architecture, index) =>
            renderTree(architecture, false, index, null)
          )}
        </TreeView>
      </AccordionDetails>
    </>
  );
}

export default SidebarDetail;
