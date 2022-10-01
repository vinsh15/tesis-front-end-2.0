import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  putMetrics,
} from "../../../api/metrics/metrics";

import AppContext from "../../../auth/context/context";
import Loader from "../../Loader/Loader";
import nodeHelper from "../../../helpers/nodes/nodes";
import { Button } from "@material-ui/core";
import "./inputs.css";
import { Alert, AlertTitle } from "@material-ui/lab";
/**
 * Componente que representa
 * la tabla de aristas del proyecto selecionado
 */
const EdgesTable = () => {
  const { selectedProject } = useContext(AppContext);
  const [loader, setLoader] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "source", headerName: "Origen", width: 300 },
    { field: "target", headerName: "Destino", width: 300 },
    { field: "relation", headerName: "Relación", width: 200 },
    { field: "dms", headerName: "DMS", width: 200 },
    { field: "abstractness", headerName: "Abstractness", width: 200 },
    { field: "coupling", headerName: "Coupling", width: 200 },
  ];

  // Getting the values of each input fields
  const [dms, setDms] = useState(10);
  const [nameResemblance, setNameResemblance] = useState(40);
  const [packageMapping, setPackageMapping] = useState(40);
  const [umbral, setUmbral] = useState(0.65);
  const [sum, setSum] = useState(
    dms  + nameResemblance + packageMapping
  );

  // Calculate the sum total of all the input fields
  function calculateTotal() {
    setSum(dms + nameResemblance + packageMapping);
  }

  // Getting all the nodes and mapping through each item
  let nodesDos = selectedProject.elements.nodes.map((node) => {
    return {
      id: node.data.id,
      name: node.data.name,
      module: node.data.module,
      incompleteResources: node.data.incompleteResources,
    };
  });

  // Getting all the edges (relaciones)
  let edgesDos = nodeHelper.getRelationData(selectedProject);

  // For loop to get the Q and answer

  if (sum <= 100) {
    for (let i = 0; i < edgesDos.length; i++) {
      let flag1 = false;
      let flag2 = false;
      let dividen1 = 0;
      let dividen2 = 0;
      for (let j = 0; j < nodesDos.length; j++) {
        if (
          nodesDos[j].id === edgesDos[i].source &&
          nodesDos[j].incompleteResources
        ) {
          flag1 = true;
          edgesDos[i].q = 0;
          edgesDos[i].answer = "No Aplica";
        }
        if (
          nodesDos[j].id === edgesDos[i].target &&
          nodesDos[j].incompleteResources
        ) {
          flag2 = true;
          edgesDos[i].q = 0;
          edgesDos[i].answer = "No Aplica";
        }
        if (flag1 || flag2) {
          break;
        }
      }
      if (!flag1 && !flag2) {

        if (edgesDos[i].coupling >= 0.6) {
          dividen1 =
            edgesDos[i].nameResemblance * nameResemblance;
        }
//hola esto es una prueba
        dividen1 = dividen1 + edgesDos[i].packageMapping * packageMapping;
        dividen2 = edgesDos[i].dms * dms;

        let q = (dividen1 - dividen2) / sum;
        edgesDos[i].q = q.toFixed(2);

        if (q >= umbral) {
          edgesDos[i].answer = "SI";
        } else {
          edgesDos[i].answer = "NO";
        }
      }

    }
  }

  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ height: 400, width: "100%" }}>
    <button onClick={putMetrics}>prueba</button>
      {!loader ? (
        <DataGrid rows={edgesDos} columns={columns} pageSize={10} />
      ) : (
        <Loader />
      )}
      <p>prueba</p>
    </div>
  );
};

export default EdgesTable;
