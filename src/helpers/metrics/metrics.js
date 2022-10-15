import { putMetrics } from "../../api/metrics/metrics.js";

import { postLogin } from "../../api/login/login"

import { ModalMessage } from "../../components/ModalMessage/ModalMessage";




const ManageMetrics = async (user, setUser, selectedProject, umbralName, setReloadSidebar) => {  
    
    await putMetrics(user,
        selectedProject.projectIndex,
        selectedProject.arcIndex,
        selectedProject.verIndex,
        umbralName);
    
      
    window.location.reload()

    // ModalMessage(
    //     "¡Metricas calculadas con exito!",
    //     " ",
    //     "success",
    //     false,
    //     4000
    //   );
    // setReloadSidebar(true);
  };

  export { ManageMetrics };