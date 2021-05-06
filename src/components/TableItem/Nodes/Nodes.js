import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../auth/context/context";

import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../Loader/Loader";
import nodeHelper from "../../../helpers/nodes/nodes";

/**
 * Componente que representa 
 * la tabla de nodos del proyecto selecionado
 */
const NodesTable = () => {
  const { selectedProject, selectedNodes, setSelectedNodes,
  selectionModel, setSelectionModel, cy } = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let rows = [];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 250 },
  ];

  selectedProject.elements.nodes.map((x, index) => {
    rows.push({id: x.data.id, 'name': x.data.name});
  });

  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!loader ? (
        <DataGrid
          id={Math.random()}
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onCellClick={params => {
            nodeHelper.manageCellClick(params.row.id, selectedNodes, setSelectedNodes, cy, setSelectionModel);
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
