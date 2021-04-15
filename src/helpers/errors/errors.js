import { ModalMessage } from "../../components/ModalMessage/ModalMessage";

/**
 * Eliminar un proyecto
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del proyecto seleccionado
 * @param {Integer} projectIndex indice del proyecto seleccionado
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageErrors = async (error, name) => {
  let status = error.response.status;
  let title = "";
  let text = "";
  switch (status) {
    case status == 409:
      title = "La estructura de un archivo XML no coincide con la establecida";
      break;
    case status == 406:
      title = "La estructura de un archivo XML no coincide con la establecida";
      break;
    case status == 500:
      title = "Hubo problemas para conectarse con el servidor";
      text = "Vuelva a intentar más tarde";
      break;
  }
  ModalMessage(title, text, "error", false, 5500);
};

export { manageErrors };
