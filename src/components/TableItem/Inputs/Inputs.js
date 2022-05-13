import React, { useContext, useState } from "react";
import "./inputs.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

import { Button } from "@material-ui/core";

import { useForm } from "react-hook-form";

import AppContext from "../../../auth/context/context";

import nodeHelper from "../../../helpers/nodes/nodes";

const Inputs = () => {
  // input validation
  const {
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  // Getting the values of each input fields
  const [dms, setDms] = useState(0);
  const [coupling, setCoupling] = useState(0);
  const [nameResemblance, setNameResemblance] = useState(0);
  const [packageMapping, setPackageMapping] = useState(0);
  const [umbral, setUmbral] = useState(0);
  const [sum, setSum] = useState(dms  + coupling + nameResemblance + packageMapping)

  function calculateTotal() {
    setSum(dms  + coupling + nameResemblance + packageMapping);

  }


   // Getting all the nodes and edges
  const { selectedProject } = useContext(AppContext);

  let nodesTest = selectedProject.elements.nodes.map((node) => {
    return {
      id: node.data.id,
      name: node.data.name,
      module: node.data.module,
      incompleteResources: node.data.incompleteResources,
    };
  });


  let edgesTest = nodeHelper.getRelationData(selectedProject);
  
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

  return (
    <>
      <form  className="form-styles">
        <div className="input">
          <div className="input-align">
            <input
              value={dms}
              onChange={(e) => setDms(+e.target.value)}
              className={errors.dms ? "input-errors" : "input-styles"}
              placeholder="W DMS"
              name="dms"
            />
            {errors.dms && (
              <small className="validation-text">{errors.dms.message}</small>
            )}
          </div>
          <div className="input-align">
            <input
              className={errors.coupling ? "input-errors" : "input-styles"}
              placeholder="W Acoplamiento"
              name="acloplamiento"
              value={coupling}
              onChange={(e) => setCoupling(+e.target.value)}
            />
            {errors.acoplamiento && (
              <small className="validation-text">
                {errors.acoplamiento.message}
              </small>
            )}
          </div>
          <div className="input-align">
            <input
              className={errors.semejanza ? "input-errors" : "input-styles"}
              placeholder="W Sem. de Nombre"
              name="semejanza"
              value={nameResemblance}
              onChange={(e) => setNameResemblance(+e.target.value)}
            />
            {errors.semejanza && (
              <small className="validation-text">
                {errors.semejanza.message}
              </small>
            )}
          </div>
          <div className="input-align">
            <input
              className={errors.paquete ? "input-errors" : "input-styles"}
              placeholder="W Mapeo de Paquete"
              name="paquete"
              value={packageMapping}
              onChange={(e) => setPackageMapping(+e.target.value)}
            />
            {errors.paquete && (
              <small className="validation-text">
                {errors.paquete.message}
              </small>
            )}
          </div>
          <div className="input-align-umbral">
            <input
              className={
                errors.umbral ? "input-errors-umbral" : "input-styles-umbral"
              }
              placeholder="Umbral"
              name="umbral"
              value={umbral}
              onChange={(e) => setUmbral(e.target.value)}
            />
            {errors.umbral && (
              <small className="validation-text">{errors.umbral.message}</small>
            )}
          </div>
        </div>
        <Button onClick={calculateTotal} variant="contained">
          Total
        </Button>
        <h1>{sum}</h1>
      </form>
    </>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: theme.spacing(2),
  },
}));

export default Inputs;
