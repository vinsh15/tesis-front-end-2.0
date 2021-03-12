import Swal from "sweetalert2";
import { postProject } from "../../api/projects/projects";
import ModalResponse from "../../components/ModalResponse/ModalResponse";

/**
 * Pop-up para pedir al usuario el nombre del nuevo proyecto
 * @param {JSON} user objeto con información del usuario
 */
const manageCreateProject = async (user, setReloadSidebar) => {
    await Swal.fire({
        title: "Ingrese el nombre del nuevo proyecto",
        input: "text",
      inputPlaceholder: "Nombre",
      showCancelButton: true,
      confirmButtonText: "Crear proyecto",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "El nombre del proyecto es obligatorio";
        }
      },
    }).then(result => {
        if(result.isConfirmed){
            submitProject(user, result.value, setReloadSidebar);
        }
    })
}

/**
 * Subir el nuevo proyecto a la base de datos
 * @param {JSON} user 
 * @param {String} projectName nombre del nuevo proyecto
 */
const submitProject = async (user, projectName, setReloadSidebar) => {
    const response = await postProject(user, projectName);
    if(response !== 'Error'){
        setReloadSidebar(true);
        ModalResponse("¡Nuevo proyecto creado!", "El proyecto fue creado con éxito", "success");
        setReloadSidebar(false);
    }
    else{
        ModalResponse("¡Hubo un error!", "El proyecto no fue creado", "error")
    }
}

export {
    manageCreateProject
}