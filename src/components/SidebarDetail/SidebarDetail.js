import React, { useEffect } from "react";

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
  const [selected, setSelected] = React.useState([]);


  const handleSelect = (nodeName, index) => {
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
          console.log(nodeName)
          setSelected([nodeName, index]);
        }
      });
    }
  };

  /**
   * Funcion recursiva que agrega elementos al arbol como nodos
   * @param {Array} node almacena el arreglo de proyectos correspondiente al usuario
   * @returns {JSX} estructura de elementos en detalle
   */
  const renderTree = (nodes, select, arqIndex) => (
    <>
      {console.log(nodes, select)}
      {nodes.name ? (
        <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name} onLabelClick={select ? () => handleSelect(nodes.name, arqIndex) : null}>
          {Array.isArray(nodes.versions)
            ? nodes.versions.map((node, index) => renderTree(node, true, index))
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
      console.log(selected);
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
            renderTree(architecture, false, index)
          )}
        </TreeView>
      </AccordionDetails>
    </>
  );
}

export default SidebarDetail;
