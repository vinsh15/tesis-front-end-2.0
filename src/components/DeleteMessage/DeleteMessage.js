import Swal from "sweetalert2";

/**
 * Componente que representa pop-up
 * para eliminar un elemento
 */
const DeleteMessage = async (
    name
  ) => {
    let response = false;
    await Swal.fire({
      text: "¿Seguro que deseas eliminar " + name + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--success)",
      cancelButtonColor: "var(--error)",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
       response = true; 
      }      
      });
      return response;
  }

export { DeleteMessage };
