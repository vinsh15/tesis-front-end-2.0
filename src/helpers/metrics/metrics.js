import React, { useContext } from "react";
import { putMetrics } from "../../api/metrics/metrics.js";

import AppContext from "../../auth/context/context.js"
import { ModalMessage } from "../../components/ModalMessage/ModalMessage";




const ManageMetrics = async (user, selectedProject, umbralName) => {  
    // setReloadSidebar(true);
    console.log("UMBRAL NAME1: " + umbralName)
    await putMetrics(user,
        selectedProject.projectIndex,
        selectedProject.arcIndex,
        selectedProject.verIndex,
        umbralName);
    
      // ModalMessage(
      //   "¡Metricas calculadas con exito!",
      //   " ",
      //   "success",
      //   false,
      //   4000
      // );
    window.location.reload()
  };

  export { ManageMetrics };