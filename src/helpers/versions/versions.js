import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
import { DeleteMessage } from "../../components/DeleteMessage/DeleteMessage";
import { EditMessage } from "../../components/EditMessage/EditMessage";
import Swal from "sweetalert2";
import {
  postVersion,
  putVersion,
  deleteVersion,
} from "../../api/versions/versions";

/**
 *
 * @param {JSON} user objeto con información del usuario
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageDeleteVersion = async (
  user,
  selectedProject,
  setSelectedProject,
  setReloadSidebar
) => {
  let response = await DeleteMessage(selectedProject.versionName);
  if (response) {
    let deleteResponse = await deleteVersion(
      user,
      selectedProject.projectIndex,
      selectedProject.arcIndex,
      selectedProject.verIndex
    );
    if (deleteResponse !== "Error") {
      setReloadSidebar(true);
      setSelectedProject();
      ModalMessage("¡Versión eliminada!", " ", "success", false, 4000);
      setReloadSidebar(false);
    } else {
      ModalMessage(
        "¡Hubo un error!",
        "No se ha eliminado la versión",
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
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageEditVersion = async (
  user,
  selectedProject,
  setSelectedProject,
  setReloadSidebar
) => {
  let response = await EditMessage(selectedProject.versionName);
  if (response !== "") {
    let editResponse = await putVersion(user, selectedProject.projectIndex, selectedProject.arcIndex, selectedProject.verIndex, response);
    if( editResponse !== "Error"){
      setReloadSidebar(true);
      setSelectedProject({
        versionName: response,
        projectIndex: selectedProject.projectIndex,
        arcIndex: selectedProject.arqIndex,
        verIndex: selectedProject.verIndex,
        elements: selectedProject.elements,
      });
      ModalMessage("¡Versión editada!", " ", "success", false, 4000);
      setReloadSidebar(false);
    }else {
      ModalMessage(
        "¡Hubo un error!",
        "No se ha editado la versión",
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
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sideb
 */
const manageCreateVersion = async (user, selectedProject, setReloadSidebar) => {
  await Swal.fire({
    title: "Ingrese el nombre de la nueva versión",
    input: "text",
    inputPlaceholder: "Nombre",
    showCancelButton: true,
    confirmButtonText: "Crear versión",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "El nombre de la arquitectura es obligatorio";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      submitVersion(result.value, user, selectedProject, setReloadSidebar);
    }
  });
};

/**
 * Subir la nueva versión a la base de datos
 * @param {String} versionName el nombre ingresado de la versión
 * @param {JSON} user objeto con información del usuario
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sideb
 */
const submitVersion = async (
  versionName,
  user,
  selectedProject,
  setReloadSidebar
) => {
  const formData = getFormData(versionName, user, selectedProject);
  const response = await postVersion(formData);
  if (response !== "Error") {
    setReloadSidebar(true);
    ModalMessage(
      "¡Nueva versión creada!",
      "Se ha agregado una nueva versión a la arquitectura",
      "success",
      false,
      5000
    );
    setReloadSidebar(false);
  } else {
    ModalMessage(
      "¡Hubo un error!",
      "No se ha creado una nueva versión",
      "error",
      false,
      5500
    );
  }
};

/**
 * Construir el form-data
 * @param {String} versionName arreglo que contiene todos los archivos XML
 * @param {JSON} user objeto con información del usuario
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 */
const getFormData = (versionName, user, selectedProject) => {
  const formData = new FormData();
  formData.append("uid", user.uid);
  formData.append("version_name", versionName);
  formData.append("ver_index", selectedProject.verIndex);
  formData.append("arc_index", selectedProject.arcIndex);
  formData.append("project_index", selectedProject.projectIndex);
  return formData;
};

export { manageCreateVersion, manageDeleteVersion, manageEditVersion };
