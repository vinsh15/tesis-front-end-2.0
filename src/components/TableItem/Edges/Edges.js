import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import AppContext from "../../../auth/context/context";
import Loader from "../../Loader/Loader";
import nodeHelper from "../../../helpers/nodes/nodes";
import { Button } from "@material-ui/core";
import "./inputs.css"
/**
 * Componente que representa
 * la tabla de aristas del proyecto selecionado
 */
const EdgesTable = () => {
  const { selectedProject } = useContext(AppContext);
  const [loader, setLoader] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "source", headerName: "Origen", width: 200 },
    { field: "target", headerName: "Destino", width: 200 },
    { field: "relation", headerName: "Relación", width: 200 },
    { field: "dms", headerName: "DMS", width: 150 },
    { field: "abstractness", headerName: "Abstracción", width: 150 },
    { field: "coupling", headerName: "Acoplamiento", width: 150 },
    { field: "instability", headerName: "Instabilidad", width: 150 },
    { field: "nameResemblance", headerName: "Semejanza del Nombre", width: 200 },
    { field: "packageMapping", headerName: "Mapeo de Paquete", width: 200 },
    { field: "q", headerName: "Q", width: 250 },
    { field: "answer", headerName: "Answer", width: 250 }
  ];

  // Getting the values of each input fields
  const [dms, setDms] = useState(25);
  const [coupling, setCoupling] = useState(25);
  const [nameResemblance, setNameResemblance] = useState(25);
  const [packageMapping, setPackageMapping] = useState(25);
  const [umbral, setUmbral] = useState(0);
  const [sum, setSum] = useState(dms  + coupling + nameResemblance + packageMapping)

  // Calculate the sum total of all the input fields
  function calculateTotal() {
    setSum(dms  + coupling + nameResemblance + packageMapping);

  }

  // Getting all the nodes and mapping through each item
  let nodesTest = selectedProject.elements.nodes.map((node) => {
    return {
      id: node.data.id,
      name: node.data.name,
      module: node.data.module,
      incompleteResources: node.data.incompleteResources,
    };
  });

// Getting all the edges (relaciones)
  let edgesTest = nodeHelper.getRelationData(selectedProject);
  
// For loop to get the Q and answer
  for(let i = 0; i<edgesTest.length; i++) {
    let flag1 = false;
    let flag2 = false;
    let upper1 = 0;
    let upper2 = 0;
      for(let j = 0; j < nodesTest.length; j++){
        if(nodesTest[j].id === edgesTest[i].source && nodesTest[j].incompleteResources === true){
          flag1 = true;
          edgesTest[i].q = "NA";
          edgesTest[i].answer = "NA";
        }
        if(nodesTest[j].id === edgesTest[i].target){
          flag2 = true;
          edgesTest[i].q = "NA";
          edgesTest[i].answer = "NA";
        }
        if(flag1 && flag2){
          break;
        }
      }
    upper1 = edgesTest[i].coupling*coupling + edgesTest[i].nameResemblance*nameResemblance + edgesTest[i].packageMapping*packageMapping;
    upper2 = edgesTest[i].dms * dms;
    let q = (upper1 - upper2) / sum;
    edgesTest[i].q = q;

    if( q >= umbral){
      edgesTest[i].answer = 'SI';
    }else{
      edgesTest[i].answer = 'NO';
    }
  
  }
    console.log(`Relaciones:`, edgesTest)

  useEffect(() => {
    setLoader(false);
  }, [selectedProject.elements]);

  return (
    <div style={{ height: 550, width: "100%" }}>
     <form  className="form-styles">
        <div className="input">
          <div className="input-align">
          <label className="input-label">DMS</label>
            <input
              value={dms}
              onChange={(e) => setDms(+e.target.value)}
              className="input-styles"
              placeholder="W DMS"
              name="dms"
            />
          </div>
          <div className="input-align">
          <label className="input-label">Acoplamiento</label>
            <input
              className="input-styles"
              placeholder="W Acoplamiento"
              name="acloplamiento"
              value={coupling}
              onChange={(e) => setCoupling(+e.target.value)}
            />
          </div>
          <div className="input-align">
          <label className="input-label">Semejanza de Nombre</label>
            <input
              className="input-styles"
              placeholder="W Sem. de Nombre"
              name="semejanza"
              value={nameResemblance}
              onChange={(e) => setNameResemblance(+e.target.value)}
            />
          </div>
          <div className="input-align">
          <label className="input-label">Mapeo de Paquete</label>
            <input
              className="input-styles"
              placeholder="W Mapeo de Paquete"
              name="paquete"
              value={packageMapping}
              onChange={(e) => setPackageMapping(+e.target.value)}
            />
          </div>
          <div className="input-align-umbral">
          <label className="input-label">Umbral</label>
            <input
              className="input-styles-umbral"
              placeholder="Umbral"
              name="umbral"
              value={umbral}
              onChange={(e) => setUmbral(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-total"> 
          <Button onClick={calculateTotal} variant="contained">
            Total
          </Button>
        </div>
      </form>
      <div className="total-sum">
        <p>Total:<span>{sum}</span></p>
      </div>
      {!loader ? (
        <DataGrid 
          rows={edgesTest} 
          columns={columns} 
          pageSize={12} 
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EdgesTable;
