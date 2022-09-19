import axios from "axios";
import jwt from "jwt-encode";

const url = "/metricas/";

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
const putMetrics = async (user, projectIndex, arcIndex,name) => {
    const userInfo = {
        user_id: user.uid,
        project_index: projectIndex,
        arch_index: arcIndex,
        ver_index: verIndex,
        ver_name: name
    };
    const token = jwt(userInfo, 'secret');
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
    putVersion,
}