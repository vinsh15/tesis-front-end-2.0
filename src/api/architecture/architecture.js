import axios from "axios";

/**
 * Agregar una nueva arquitectura a la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de la arquitectura
 */
const postArchitecture = async (formData) => {
    try {
        const response = await axios.post("/arquitecturas/", formData,
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
    postArchitecture,
}