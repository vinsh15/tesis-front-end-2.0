import axios from "axios";

/**
 * Agregar/reemplazar nuevos elementos a una arquitectura
 * en la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de los elementos
 */
const postElements = async (formData) => {
    try {
        const response = await axios.post("/elementos/", formData,
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
    postElements,
}