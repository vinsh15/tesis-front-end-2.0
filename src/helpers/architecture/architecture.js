import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
import { DeleteMessage } from "../../components/DeleteMessage/DeleteMessage";
import { EditMessage } from "../../components/EditMessage/EditMessage";
import {
  postArchitecture,
  putArchitecture,
  deleteArchitecture,
} from "../../api/architecture/architecture";
import { SelectMessage } from "../../components/SelectMessage/SelectMessage";

/**
 * Eliminar arquitectura
 * @param {JSON} user objeto con información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Array} architectures arquitecturas del proyecto
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageDeleteArchitecture = async (
  user,
  projectIndex,
  architectures,
  setSelectedProject,
  setReloadSidebar
) => {
  let options = {};
  architectures.map(
    (architecture, index) => (options[index] = architecture.name)
  );
  let architecture = await SelectMessage(options);
  if (architecture) {
    let response = await DeleteMessage(options[architecture]);
    if (response) {
      let responseDelete = await deleteArchitecture(
        user,
        projectIndex,
        architecture
      );
      if (responseDelete !== "Error") {
        setReloadSidebar(true);
        setSelectedProject();
        ModalMessage("¡Arquitectura eliminada!", " ", "success", false, 4000);
        setReloadSidebar(false);
      } else {
        ModalMessage(
          "¡Hubo un error!",
          "No se ha eliminado la arquitectura",
          "error",
          false,
          5500
        );
      }
    }
  }
};

/**
 * Editar el nombre de una arquitectura
 * @param {JSON} user objeto con información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Array} architectures arquitecturas del proyecto
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageEditArchitecture = async (
  user,
  projectIndex,
  architectures,
  setSelectedProject,
  setReloadSidebar
) => {
  let options = {};
  architectures.map(
    (architecture, index) => (options[index] = architecture.name)
  );
  let architecture = await SelectMessage(options);
  if (architecture) {
    let response = await EditMessage(options[architecture]);
    if (response !== "") {
      let responseEdit = await putArchitecture(
        user,
        projectIndex,
        architecture,
        response
      );
      if (responseEdit !== "Error") {
        setReloadSidebar(true);
        setSelectedProject();
        ModalMessage("¡Arquitectura editada!", " ", "success", false, 4000);
        setReloadSidebar(false);
      } else {
        ModalMessage(
          "¡Hubo un error!",
          "No se ha editado la arquitectura",
          "error",
          false,
          5500
        );
      }
    }
  }
};

/**
 * Subir la nueva arquitectura a la base de datos
 * @param {Array} files arreglo que contiene todos los archivos XML
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del nuevo proyecto
 * @param {Integer} projectIndex índice del proyecto
 */
const submitArchitecture = async (files, user, name, projectIndex) => {
  const formData = getFormData(files, user, name, projectIndex);
  const response = await postArchitecture(formData);
  return response;
};

/**
 * Construir el form-data
 * @param {Array} files arreglo que contiene todos los archivos XML
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del nuevo proyecto
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @returns FormData con la información para la API
 */
const getFormData = (files, user, name, projectIndex) => {
  const formData = new FormData();
  formData.append("uid", user.uid);
  formData.append("name", name);
  formData.append("index", projectIndex);
  files.forEach((file) => {
    addFile(file, formData);
  });
  return formData;
};

/**
 * Agrega el archivo al form-data y lo elimina del dropzone
 * @param {File} file archivo XML
 * @param {FormData} formData objeto form-data
 */
const addFile = (file, formData) => {
  formData.append("file", file.file, file.meta.name);
  file.remove();
};

export { submitArchitecture, manageEditArchitecture, manageDeleteArchitecture };
