import Swal from "sweetalert2";

/**
 * Componente que representa pop-up
 * para editar un elemento
 */
const EditMessage = async (name) => {
  let value = "";
  await Swal.fire({
    title: "Ingrese un nuevo nombre para '" + name + "'",
    input: "text",
    inputPlaceholder: "Nuevo nombre",
    showCancelButton: true,
    confirmButtonText: "Cambiar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "¡El nombre es obligatorio!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      value = result.value;
    }
  });
  return value;
};

export { EditMessage };
