import Swal from "sweetalert2";

/**
 * Componente que representa pop-up
 * para seleccionar un elemento
 */
const SelectMessage = async (options) => {
  const { value: architecture } = await Swal.fire({
    title: "Selecciona una arquitectura",
    input: "select",
    inputOptions: options,
    inputPlaceholder: "Arquitecturas",
    showCancelButton: true,
    confirmButtonText: "Continuar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "¡Para continuar debe elegir una arquitectura!";
      }
    },
  });
  return architecture;
};

export { SelectMessage };
