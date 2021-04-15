import axios from "axios";
import jwt from "jwt-encode";

const url = "/version/";

/**
 * Agregar una nueva versión a la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de la arquitectura
 */
const postVersion = async (formData, setReloadSidebar) => {
    setReloadSidebar(true);
    try {
        const response = await axios.post(url, formData,
        {
            headers: {'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
    catch(error){
        return error.response.status;
    }
}

/**
 * Eliminar una versión de la base de datos
 * @param {JSON} user objeto con la información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Integer} arcIndex índice de la arquitectura
 * @param {Integer} verIndex índice de la versión
 * @returns versiones de una arquitectura de un proyecto
 *  del usuario o error
 */
const deleteVersion = async (user, projectIndex, arcIndex, verIndex, setReloadSidebar) => {
    const userInfo = {
        user_id: user.uid,
        project_index: projectIndex,
        arc_index: arcIndex,
        ver_index: verIndex
    };
    const token = jwt(userInfo, 'secret');
    setReloadSidebar(true)
    try {
        const response = await axios.delete(url, {
            data: {
                token: token
            }
        });
        return response.data;

    } catch (error) {
        return error.response.status;
    }
}

/**
 * Editar el nombre de una versión en la base de datos
 * @param {JSON} user objeto con la información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Integer} arcIndex índice de la arquitectura
 * @param {Integer} verIndex índice de la versión
 * @param {String} name nuevo nombre de la versión
 * @returns versiones de una arquitectura de un proyecto
 * del usuario o error
 */
const putVersion = async (user, projectIndex, arcIndex, verIndex, name, setReloadSidebar) => {
    const userInfo = {
        user_id: user.uid,
        project_index: projectIndex,
        arch_index: arcIndex,
        ver_index: verIndex,
        ver_name: name
    };
    const token = jwt(userInfo, 'secret');
    setReloadSidebar(true);
    try {
        const response = await axios.put(url, {
            token: token
        });
        return response.data;

    } catch (error) {
        return error.response.status;
    }
}

export {
    postVersion,
    putVersion,
    deleteVersion,
}