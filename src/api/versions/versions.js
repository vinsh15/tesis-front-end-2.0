import axios from "axios";

/**
 * Agregar una nueva versión a la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de la arquitectura
 */
const postVersion = async (formData) => {
    try {
        const response = await axios.post("/version/", formData,
        {
            headers: {'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
    catch(error){
        return "Error";
    }
}

export {
    postVersion,
}