import axios from "axios";
import jwt from "jwt-encode";

const url = "/proyectos/";

/**
 * Agregar un nuevo proyecto a la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {String} projectName nombre del proyecto creado
 * @returns {Array} proyectos del usuario o error
 */
const postProject = async (user, projectName, setReloadSidebar) => {
    const userInfo = {
        user_id: user.uid,
        project_name: projectName
    };
    const token = jwt(userInfo, 'secret');
    setReloadSidebar(true);
    try {
        const response = await axios.post(url, {
            token: token
        });
        return response.data;
    }
    catch(error) {
        console.log("ERROR: " + error);
        return error.response.status;
    }
}

/**
 * Eliminar un proyecto de la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {Integer} index índice del proyecto
 * @returns proyectos del usuario o error
 */
const deleteProject = async (user, index, setReloadSidebar) => {
    const userInfo = {
        user_id: user.uid,
        project_index: index
    };
    const token = jwt(userInfo, 'secret');
    setReloadSidebar(true);
    try {
        const response = await axios.delete(url, {
            data: {
                token: token
            }
        });
        return response.data;
    }
    catch(error) {
        return error.response.status;
    }
}   

/**
 * Editar el nombre de un proyecto en la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {Integer} index índice del proyecto
 * @param {String} name nuevo nombre del proyecto
 * @returns proyectos del usuario o error
 */
const putProject = async (user, index, name, setReloadSidebar) => {
    const userInfo = {
        user_id: user.uid,
        project_index: index,
        project_name: name
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
    postProject,
    putProject,
    deleteProject,
}