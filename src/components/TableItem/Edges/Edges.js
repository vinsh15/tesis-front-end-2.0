import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../auth/context/context";

import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../Loader/Loader";

/**
 * Componente que representa
 * la tabla de aristas del proyecto selecionado
 */
const EdgesTable = () => {
  const { selectedProject } = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let rows = [];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "source", headerName: "Source", width: 200 },
    { field: "target", headerName: "Target", width: 200 },
    { field: "relation", headerName: "Relation", width: 130 },
  ];

  selectedProject.elements.edges.map((x, index) => {
    rows.push({
      id: index,
      source: x.data.source,
      target: x.data.target,
      relation: x.scratch.relation,
    });
  });

  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!loader ? (
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EdgesTable;
