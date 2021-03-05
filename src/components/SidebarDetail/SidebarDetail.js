import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AuthContext from "../../auth/context/context";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";

/**
 * Componente que representa el contenido
 * del item añadido como proyecto en la barra lateral
 */
const SidebarDetail = ({
  projectIndex,
  setItem,
  item,

}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const { setSelectedProject } = useContext(AuthContext);

/**
 * Preguntar al usuario si desea mostrar la versión seleccionada
 * y actualizar el proyecto seleccionado
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
          // setSelected(event.target.innerText);
          setSelectedProject({
            'versionName': nodeName,
            'projectIndex': projectIndex,
            'arcIndex': arqIndex,
            'verIndex': verIndex
          })
        }
      });
    }
  };

  /**
   * Función recursiva que agrega elementos al arbol como nodos
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
      setItem(selected);
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
          {item.architectures.map((architecture, index) =>
            renderTree(architecture, false, index, null)
          )}
        </TreeView>
      </AccordionDetails>
    </>
  );
}

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default SidebarDetail;
