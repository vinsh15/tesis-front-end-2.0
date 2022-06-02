import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
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
    { field: "dms", headerName: "DMS", width: 150 },
    { field: "abstractness", headerName: "Abstracción", width: 150 },
    { field: "coupling", headerName: "Acoplamiento", width: 150 },
    { field: "instability", headerName: "Instabilidad", width: 150 },
    {
      field: "nameResemblance",
      headerName: "Semejanza del Nombre",
      width: 200,
    },
    { field: "packageMapping", headerName: "Mapeo de Paquete", width: 200 },
    { field: "q", headerName: "Q", width: 250 },
    { field: "answer", headerName: "Answer", width: 250 },
  ];

  // Getting the values of each input fields
  const [dms, setDms] = useState(10);
  const [coupling, setCoupling] = useState(0);
  const [nameResemblance, setNameResemblance] = useState(40);
  const [packageMapping, setPackageMapping] = useState(40);
  const [umbral, setUmbral] = useState(0.65);
  const [sum, setSum] = useState(
    dms + coupling + nameResemblance + packageMapping
  );

  // Calculate the sum total of all the input fields
  function calculateTotal() {
    setSum(dms + coupling + nameResemblance + packageMapping);
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
    <div style={{ height: "80vh", width: "100%" }}>
      <form className="form-styles">
        <div className="input">
          <div className="input-align">
            <input
              value={dms}
              onChange={(e) => setDms(+e.target.value)}
              className="input-styles"
              placeholder="W DMS"
              name="dms"
            />
            <label className="input-label">DMS</label>
          </div>
          <div className="input-align">
            <input
              className="input-styles"
              placeholder="W Acoplamiento"
              name="acloplamiento"
              value={coupling}
              onChange={(e) => setCoupling(+e.target.value)}
            />
            <label className="input-label">Acoplamiento</label>
          </div>
          <div className="input-align">
            <input
              className="input-styles"
              placeholder="W Sem. de Nombre"
              name="semejanza"
              value={nameResemblance}
              onChange={(e) => setNameResemblance(+e.target.value)}
            />
            <label className="input-label">Semejanza de Nombre</label>
          </div>
          <div className="input-align">
            <input
              className="input-styles"
              placeholder="W Mapeo de Paquete"
              name="paquete"
              value={packageMapping}
              onChange={(e) => setPackageMapping(+e.target.value)}
            />
            <label className="input-label">Mapeo de Paquete</label>
          </div>
          <div className="input-align-umbral">
            <input
              className="input-styles-umbral"
              placeholder="Umbral"
              name="umbral"
              value={umbral}
              type="number"
              min="0"
              max="1"
              onChange={(e) => setUmbral(e.target.value)}
            />
            <label className="input-label">Umbral</label>
          </div>
        </div>
        <div className="btn-total">
          <Button onClick={calculateTotal} variant="contained">
            Calcular
          </Button>
        </div>
      </form>
      <div className="total-sum">
        <p>
          Total:<span>{sum}</span>
        </p>
      </div>
      {sum > 100 ?
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          El total de los pesos no puede ser mayor a 100 — <strong>Vuelve a calcular!</strong>
        </Alert>
        :
        <Alert severity="success">
          <AlertTitle>Calculo Exitoso</AlertTitle>
        </Alert>
      }
      {!loader ? (
        <DataGrid rows={edgesDos} columns={columns} pageSize={10} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EdgesTable;
