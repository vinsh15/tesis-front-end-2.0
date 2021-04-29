import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../auth/context/context";

import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../Loader/Loader";

function NodesTable() {
  const { selectedProject } = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let rows = [];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 250 },
  ];

  selectedProject.elements.nodes.map((x, index) => {
    rows.push({'id': index, 'name': x.data.name});
  });

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
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default NodesTable;
