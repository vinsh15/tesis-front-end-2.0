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
      title: "¿Seguro que deseas eliminar '" + name + "'?",
      text: "Una vez eliminado, no hay manera de recurperarlo",
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
