import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";


import AppContext from "../../../auth/context/context";
import Loader from "../../Loader/Loader";
import nodeHelper from "../../../helpers/nodes/nodes";

/**
 * Componente que representa 
 * la tabla de nodos del proyecto selecionado
 */
const NodesTable = () => {
  const {
    selectedProject,
    selectedNodes, setSelectedNodes,
    selectionModel, setSelectionModel,
    cy
  } = useContext(AppContext);
  let [loader, setLoader] = useState(true);

  let rows = selectedProject.elements.nodes.map(node => {
    return { id: node.data.id, name: node.data.name, 
             isInterface: !node.data.incomompleteProperties ? node.data.isInterface ? 'Si' : 'No' : '-', 
             isAbtsract: node.data.hasOwnProperty('isAbstract') ? node.data.isAbtsract ? 'Si' : 'No' : '-', 
             module: node.data.hasOwnProperty('module') ? node.data.module : "-", 
             incomompleteProperties: node.data.incomompleteProperties ? "No" : "Si" };
  });

  const columns = [
    { field: "name", headerName: "Nombre", width: 400 },
    { field: "isInterface", headerName: "Es Interfaz?", width: 150 },
    { field: "isAbtsract", headerName: "Es Abstracto?", width: 150 },
    { field: "module", headerName: "Modulo", width: 150 },
    { field: "incomompleteProperties", headerName: "Propiedades Completas", width: 250 },
  ];


  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {!loader ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onCellClick={params => {
            nodeHelper.manageCellClick(params.row.name, selectedNodes, setSelectedNodes, cy, setSelectionModel);
          }}
          onColumnHeaderClick={param => {
            if (param.field === '__check__') {
              nodeHelper.manageCheckSelection(selectedNodes, setSelectedNodes, cy, setSelectionModel);
            }
          }}
          selectionModel={selectionModel}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default NodesTable;
