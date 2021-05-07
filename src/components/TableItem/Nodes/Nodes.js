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
    return {id: node.data.id, name: node.data.name};
  });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 250 },
  ];


  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!loader ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onCellClick={params => {
            nodeHelper.manageCellClick(params.row.id, selectedNodes, setSelectedNodes, cy, setSelectionModel);
          }}
          onColumnHeaderClick={param => {
            if(param.field === '__check__'){
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
