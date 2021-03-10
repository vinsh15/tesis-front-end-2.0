import React, { useContext } from "react";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AppContext from "../../auth/context/context";
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
   */
  const handleSelect = (nodeName, arqIndex, verIndex) => {
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
          });
        }
      });
    }
  };

  /**
   * Función recursiva que agrega elementos al arbol como nodos
   * @param {Array} node almacena el elemento por agregar
   * @returns {JSX} estructura de elementos en detalle
   */
  const renderTree = (node, select, arqIndex, verIndex) => (
    
      <TreeItem
        key={node.name}
        nodeId={node.name}
        label={node.name}
        onLabelClick={
          select ? () => handleSelect(node.name, arqIndex, verIndex) : null
        }
      >
        {Array.isArray(node.versions)
          ? node.versions.map((node, index) =>
              renderTree(node, true, arqIndex, index)
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
          {/* Aqúi hay que colocar cuando un proeycto no tiene arquitecturas  */}
          {item.architectures?.map((architecture, index) =>
            renderTree(architecture, false, index, null)
          )}
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
