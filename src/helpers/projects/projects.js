import Swal from "sweetalert2";
import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
import { DeleteMessage } from "../../components/DeleteMessage/DeleteMessage";
import { EditMessage } from "../../components/EditMessage/EditMessage";
import {
  postProject,
  putProject,
  deleteProject,
} from "../../api/projects/projects";
import ModalResponse from "../../components/ModalResponse/ModalResponse";

/**
 *
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del proyecto seleccionado
 * @param {Integer} projectIndex indice del proyecto seleccionado
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageDeleteProject = async (
  user,
  name,
  projectIndex,
  setSelectedProject,
  setReloadSidebar
) => {
  let response = await DeleteMessage(name);
  if (response) {
    let responseDelete = await deleteProject(user, projectIndex);
    if (responseDelete !== "Error") {
      setReloadSidebar(true);
      setSelectedProject();
      ModalMessage("¡Proyecto eliminado!", " ", "success", false, 4000);
      setReloadSidebar(false);
    } else {
      ModalMessage(
        "¡Hubo un error!",
        "No se ha eliminado el proyecto",
        "error",
        false,
        5500
      );
    }
  }
};

/**
 *
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del proyecto seleccionado
 * @param {Integer} projectIndex indice del proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageEditProject = async (
  user,
  name,
  projectIndex,
  setReloadSidebar
) => {
  let response = await EditMessage(name);
  if (response !== "") {
    let responseEdit = await putProject(user, projectIndex, response);
    if (responseEdit !== "Error") {
      setReloadSidebar(true);
      ModalMessage("¡Proyecto editado!", " ", "success", false, 4000);
      setReloadSidebar(false);
    } else {
      ModalMessage(
        "¡Hubo un error!",
        "No se ha editado el proyecto",
        "error",
        false,
        5500
      );
    }
  }
};

/**
 * Pop-up para pedir al usuario el nombre del nuevo proyecto
 * @param {JSON} user objeto con información del usuario
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sideba
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
  }).then((result) => {
    if (result.isConfirmed) {
      submitProject(user, result.value, setReloadSidebar);
    }
  });
};

/**
 * Subir el nuevo proyecto a la base de datos
 * @param {JSON} user
 * @param {String} projectName nombre del nuevo proyecto
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sideba
 */
const submitProject = async (user, projectName, setReloadSidebar) => {
  const response = await postProject(user, projectName);
  if (response !== "Error") {
    setReloadSidebar(true);
    ModalResponse(
      "¡Nuevo proyecto creado!",
      "El proyecto fue creado con éxito",
      "success"
    );
    setReloadSidebar(false);
  } else {
    ModalResponse("¡Hubo un error!", "El proyecto no fue creado", "error");
  }
};

export { manageCreateProject, manageEditProject, manageDeleteProject };