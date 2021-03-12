import { postArchitecture } from "../../api/architecture/architecture";


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
}

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
    formData.append('uid', user.uid);
    formData.append('name', name);
    formData.append('index', projectIndex);
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
    submitArchitecture
}