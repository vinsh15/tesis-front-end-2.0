import React from "react";

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
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  /**
   * Funcion recursiva que agrega elementos al arbol como nodos
   * @param {Array} items almacena el arreglo de proyecto correspondiente al usuario
   * @returns {} estructura de elementos en detalle
   */
  const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name}>
      {Array.isArray(nodes.architectures)
        ? nodes.architectures.map((node) => renderTree(node))
        : null}
      
    </TreeItem>
  );

  return (
    <>
      <AccordionDetails>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {renderTree(props.item)}
        </TreeView>
      </AccordionDetails>
    </>
  );
}

export default SidebarDetail;
