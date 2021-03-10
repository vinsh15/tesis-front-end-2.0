import Swal from "sweetalert2";

/**
 * Modal temporal con mensaje
 * @param {String} title Mensaje del modal
 * @param {String} icon Ícono a mostrar
 */
const ModalResponse = (title, text, icon) => {
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      showConfirmButton: false,
      timer: 4000,
    });
}

export default ModalResponse;