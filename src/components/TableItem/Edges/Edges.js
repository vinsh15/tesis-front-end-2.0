import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  putMetrics,
} from "../../../api/metrics/metrics";

import { ManageMetrics } from "../../../helpers/metrics/metrics"

import AppContext from "../../../auth/context/context";
import Loader from "../../Loader/Loader";
import nodeHelper from "../../../helpers/nodes/nodes";
import "./inputs.css";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Button } from "@material-ui/core";

/**
 * Componente que representa
 * la tabla de aristas del proyecto selecionado
 */
const EdgesTable = () => {
  const { user, selectedProject, setReloadSidebar } = useContext(AppContext);
  const [loader, setLoader] = useState(true);

  const columns1 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "source", headerName: "Origen", width: 300 },
    { field: "target", headerName: "Destino", width: 300 },
    { field: "relation", headerName: "Relación", width: 200 },
    { field: "coupling", headerName: "Coupling", width: 200 },
    { field: "abstractness", headerName: "Abstracción", width: 200 },
    { field: "instability", headerName: "Inestabilidad", width: 200 },
    { field: "dms", headerName: "DMS", width: 200 },
    { field: "nameRessemblance", headerName: "Semejanza de Nombre", width: 200 },
    { field: "packageMapping", headerName: "Mapeo de Paquetes", width: 200 },
    { field: "q", headerName: "Q", width: 250 },
    { field: "answer", headerName: "Candidato a Compuesto?", width: 250 },

  ];

  // Getting the values of each input fields
  const [dms, setDms] = useState(15);
  const [nameResemblance, setNameResemblance] = useState(35);
  const [packageMapping, setPackageMapping] = useState(35);
  const [umbralName, setUmbralName] = useState(35);
  const [umbralCoupling, setUmbralCoupling] = useState(0.65);
  const [umbral, setUmbral] = useState(0.4);
  const [sum, setSum] = useState(dms + nameResemblance + packageMapping);
  let total = (dms + nameResemblance + packageMapping)

  // Calculate the sum total of all the input fields
  function calculateTotal() {
    setSum(dms + nameResemblance + packageMapping);
    total = sum;
  }

  // Getting all the nodes and mapping through each item
  let nodesDos = selectedProject.elements.nodes.map((node) => {
    return {
      id: node.data.id,
      name: node.data.name,
      module: node.data.module,
      incomompleteProperties: node.data.incomompleteProperties,
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
          nodesDos[j].incomompleteProperties
        ) {

          flag1 = true;
          edgesDos[i].q = 0;
          edgesDos[i].answer = "No Aplica";
        }
        if (
          nodesDos[j].id === edgesDos[i].target && nodesDos[j].incomompleteProperties) {
          flag2 = true;
          edgesDos[i].q = 0;
          edgesDos[i].answer = "No Aplica";
        }
        if (flag1 || flag2) {
          break;
        }
      }
      if (!flag1 && !flag2) {

        console.log("partida " + edgesDos[i].source + "llegada " + edgesDos[i].target)
        console.log("Nombre: " + edgesDos[i].nameRessemblance + " Mapeo " + edgesDos[i].packageMapping)

        if (edgesDos[i].coupling >= umbralCoupling) {
          dividen1 =
            edgesDos[i].nameRessemblance * nameResemblance;
        }

        dividen1 = dividen1 + edgesDos[i].packageMapping * packageMapping;
        dividen2 = edgesDos[i].dms * dms;

        let q = (dividen1 - dividen2) / sum;
        edgesDos[i].q = q.toFixed(2);

        if (q >= umbral) {
          edgesDos[i].answer = "Si";
        } else {
          edgesDos[i].answer = "No";
        }
      } else {
        edgesDos[i].q = 'Imposible Calcular'
        edgesDos[i].answer = 'Imposible Concluir'

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
      <div className="form-wrapper">
        <form className="form-umbral">
          <div className="input-align-umbral">
            <input
              className="input-styles-umbral"
              placeholder="ejm. 0.45"
              name="umbral"
              value={umbralName}
              type="number"
              min="0"
              max="1"
              onChange={(e) => setUmbralName(e.target.value)}
            />
            <label className="input-label">Umbral Semejanza</label>
          </div>
          <div className="btn-total">
            <Button onClick={ ManageMetrics(user, selectedProject, umbralName)} variant="contained">
              Calcular Métricas
            </Button>
          </div>
        </form>
        <div className="divider-edges"></div>
        <form className="form-styles">
          <div className="input">
            <div className="input-align">
              <input
                value={dms}
                onChange={(e) => {
                  setDms(+e.target.value)
                  calculateTotal()
                }}
                className="input-styles"
                placeholder="ejm. 15"
                name="dms"
              />
              <label className="input-label">Peso DMS</label>
            </div>
            <div className="input-align">
              <input
                className="input-styles"
                placeholder="ejm. 35"
                name="semejanza"
                value={nameResemblance}
                onChange={(e) => {
                  setNameResemblance(+e.target.value)
                  calculateTotal()
                }}
              />
              <label className="input-label">Peso Semejanza de Nombre</label>
            </div>
            <div className="input-align">
              <input
                className="input-styles"
                placeholder="ejm. 35"
                name="paquete"
                value={packageMapping}
                onChange={(e) => {
                  setPackageMapping(+e.target.value)
                  calculateTotal()
                }}
              />
              <label className="input-label">Peso Mapeo de Paquete</label>
            </div>
            <div className="input-align-umbral">
              <input
                className="input-styles-umbral"
                placeholder="ejm. 0.45"
                name="umbral"
                value={umbralName}
                type="text"
                onChange={(e) => setUmbralName(e.target.value)}
              />
              <label className="input-label">Umbral Semejanza</label>
            </div>
            <div className="input-align-umbral">
              <input
                className="input-styles-umbral"
                placeholder="ejm. 0.65"
                name="umbral"
                value={umbralCoupling}
                type="text"
                onChange={(e) => setUmbralCoupling(e.target.value)}
              />
              <label className="input-label">Umbral Acoplamiento</label>
            </div>
            <div className="input-align-umbral">
              <input
                className="input-styles-umbral"
                placeholder="Umbral"
                name="umbral"
                value={umbral}
                type="text"
                onChange={(e) => setUmbral(e.target.value)}
              />
              <label className="input-label">Umbral Q</label>
            </div>
          </div>

          <div className="btn-total">
            <Button onClick={() => {
              calculateTotal();
            }
            }>
              Calcular Hipótesis
            </Button>
          </div>

        </form >
      </div>
      <div className="total-sum">
        <p>
          Total:<span>{total}</span>
        </p>
      </div>
      {
        sum > 100 ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            El total de los pesos no puede ser mayor a 100 — <strong>Vuelve a calcular!</strong>
          </Alert>
          :
          <Alert severity="success">
            <AlertTitle>Calculo Exitoso</AlertTitle>
          </Alert>
      }
      {
        !loader ? (
          <DataGrid rows={edgesDos} columns={columns1} pageSize={10} />
        ) : (
          <Loader />
        )
      }
    </div >
  );
}












//   return (
//     <div style={{ height: 800, width: "100%" }}>
//       <button onClick={() => ManageMetrics(user, selectedProject, setReloadSidebar)
//       }>
//         Calcular Metricas
//       </button>
//       {!loader ? (
//         <DataGrid rows={edgesDos} columns={columns1} pageSize={10} />
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

export default EdgesTable;

