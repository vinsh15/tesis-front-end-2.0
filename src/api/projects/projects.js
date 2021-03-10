import axios from "axios";
import jwt from "jwt-encode";

/**
 * Agregar un nuevo proyecto a la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {String} projectName nombre del proyecto creado
 * @returns {Array} proyectos del usuario o error
 */
const postProject = async (user, projectName) => {
    const userInfo = {
        user_id: user.uid,
        project_name: projectName
    }
    const token = jwt(userInfo, 'secret');
    try {
        const response = await axios.post("/proyectos/", {
            token: token
        })
        return response.data;
    }
    catch(error) {
        return "Error";
    }
}

export {
    postProject,
}