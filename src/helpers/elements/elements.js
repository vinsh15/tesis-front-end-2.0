import { postElements } from "../../api/elements/elements";

/**
 * Subir los nuevos elementos a la base de datos
 * @param {Array} files arreglo que contiene todos los archivos XML
 * @param {JSON} user objeto con información del usuario
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 */
const submitElements = async (files, user, selectedProject) => {
    const formData = getFormData(files, user, selectedProject);
    const response = await postElements(formData);
    return response;
}

/**
 * Construir el form-data
 * @param {Array} files arreglo que contiene todos los archivos XML
 * @param {JSON} user objeto con información del usuario
 * @param {JSON} selectedProject objeto con información del proyecto seleccionado
 * @returns FormData con la información para la API
 */
const getFormData = (files, user, selectedProject) => {
    const formData = new FormData();
    formData.append('user_id', user.uid);
    formData.append('ver_index', selectedProject.verIndex);
    formData.append('arc_index', selectedProject.arcIndex);
    formData.append('project_index', selectedProject.projectIndex);
    files.forEach(file => {
      addFile(file, formData);
    })
    return formData;
}

/**
 * Agrega el archivo al form-data y lo elimina del dropzone
 * @param {File} file archivo XML
 * @param {FormData} formData objeto form-data
 */
const addFile = (file, formData) => {
    formData.append("file", file.file, file.meta.name);
    file.remove();
};

export {
    submitElements
}