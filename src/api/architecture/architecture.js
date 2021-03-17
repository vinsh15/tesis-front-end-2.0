import axios from "axios";
import jwt from "jwt-encode";

const url = "/arquitecturas/";

/**
 * Agregar una nueva arquitectura a la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de la arquitectura
 */
const postArchitecture = async (formData) => {
    try {
        const response = await axios.post(url, formData,
        {
            headers: {'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

/**
 * Eliminar una arquitectura de la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Integer} archIndex índice de la arquitectura
 * @returns proyectos del usuario o error
 */
const deleteArchitecture = async (user, projectIndex, archIndex) => {
    try {
        const userInfo = {
            user_id: user.uid,
            project_index: projectIndex,
            arch_index: archIndex
        };
        const token = jwt(userInfo, 'secret');
        const response = await axios.delete(url, {
            data: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        return "Error";
    }
}

export {
    deleteArchitecture,
    postArchitecture,
}