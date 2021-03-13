import React, { useContext } from "react";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AppContext from "../../auth/context/context";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

/**
 * Componente que representa el contenido
 * del item añadido como proyecto en la barra lateral
 */
const SidebarDetail = ({
  projectIndex,
  item,

}) => {
  const classes = useStyles();
  const { selectedProject, setSelectedProject } = useContext(AppContext);

  /**
   * Preguntar al usuario si desea mostrar la versión seleccionada
   * y actualizar el proyecto seleccionado
   * @param {String} nodeName nombre de la versión
   * @param {Integer} arqIndex índice de la arquitectura seleccionada
   * @param {Integer} verIndex índice de la versión seleccionada
   * @param {JSON} elems objeto que contiene los elementos que conforman al grafo
   */
  const handleSelect = (nodeName, arqIndex, verIndex, elems) => {
    if (nodeName !== selectedProject) {
      Swal.fire({
        text: "¿Deseas mostrar " + nodeName + "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--success)",
        cancelButtonColor: "var(--error)",
        confirmButtonText: "Si, seguro",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedProject({
            versionName: nodeName,
            projectIndex: projectIndex,
            arcIndex: arqIndex,
            verIndex: verIndex,
            elements: elems
          });
        }
      });
    }
  };

  /**
   * 
   * @param {JSON} nodes objeto que contiene toda la información sobre un nodo
   * @param {Boolean} select si el elemento está o no seleccionado
   * @param {Integer} arqIndex índice de la arquitectura en el arreglo
   * @param {Integer} verIndex índice de la versión en el arreglo
   * @param {JSON} elems objeto que contiene los elementos que conforman al grafo
   */
  const renderTree = (nodes, select, arqIndex, verIndex, elems) => (
      <TreeItem
        key={verIndex != null ? verIndex : arqIndex}
        nodeId={nodes.name}
        label={nodes.name}
        onLabelClick={
          select ? () => handleSelect(nodes.name, arqIndex, verIndex, elems) : null
        }
      >
        {Array.isArray(nodes.versions)
          ? nodes.versions.map((node, index) =>
              renderTree(node, true, arqIndex, index, node.elements)
            )
          : null}
      </TreeItem>
  );

  return (
      <AccordionDetails>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {item.architectures ? (item.architectures.map((architecture, index) =>
            renderTree(architecture, false, index, null, null))) :
            <h3 style={{textAlign: 'justify'}}>Este proyecto no tiene arquitecturas</h3>
          }
        </TreeView>
      </AccordionDetails>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default SidebarDetail;
