import { ModalMessage } from "../../components/ModalMessage/ModalMessage";

/**
 * Eliminar un proyecto
 * @param {JSON} user objeto con información del usuario
 * @param {String} name nombre del proyecto seleccionado
 * @param {Integer} projectIndex indice del proyecto seleccionado
 * @param {Function} setSelectedProject funcion para actualizar proyecto seleccionado
 * @param {Function} setReloadSidebar funcion para actualizar estado del Sidebar
 */
const manageErrors = async (error) => {
  let title = "";
  let text = "";
  switch (error) {
    case 409:
      title = "La estructura de un archivo XML no coincide con la establecida";
      text = "Vuelva a intentarlo"
      break;
    case 406:
      title = "La estructura de un archivo XML no coincide con la establecida";
      text = "Vuelva a intentarlo"
      break;
    case 500:
      title = "Hubo problemas para conectarse con el servidor";
      text = "Vuelva a intentar más tarde";
      break;
    default:
        title = "Hubo un problema";
        text = "Vuelva a intentar más tarde";
        break;
  }
  ModalMessage(title, text, "error", false, 5500);
};

export { manageErrors };
