import axios from "axios";
import jwt from "jwt-encode";

const url = "/arquitecturas/";

/**
 * Agregar una nueva arquitectura a la base de datos del usuario
 * @param {FormData} formData objeto form-data con la información de la arquitectura
 */
const postArchitecture = async (formData, setReloadSidebar) => {
  setReloadSidebar(true);
  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

/**
 * Eliminar una arquitectura de la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Integer} archIndex índice de la arquitectura
 * @returns arquitecturas del usuario o error
 */
const deleteArchitecture = async (
  user,
  projectIndex,
  archIndex,
  setReloadSidebar
) => {
  const userInfo = {
    user_id: user.uid,
    project_index: projectIndex,
    arch_index: archIndex,
  };
  const token = jwt(userInfo, "secret");
  setReloadSidebar(true);
  try {
    const response = await axios.delete(url, {
      data: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

/**
 * Editar el nombre de una arquitectura en la base de datos
 * @param {JSON} user Objeto con la información del usuario
 * @param {Integer} projectIndex índice del proyecto
 * @param {Integer} archIndex índice de la arquitectura
 * @param {String} name nuevo nombre de la arquitectura
 * @returns arquitecturas del usuario o error
 */
const putArchitecture = async (
  user,
  projectIndex,
  archIndex,
  name,
  setReloadSidebar
) => {
  const userInfo = {
    user_id: user.uid,
    project_index: projectIndex,
    arch_index: archIndex,
    arch_name: name,
  };
  const token = jwt(userInfo, "secret");
  setReloadSidebar(true);
  try {
    const response = await axios.put(url, {
      token: token,
    });
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

export { postArchitecture, putArchitecture, deleteArchitecture };
