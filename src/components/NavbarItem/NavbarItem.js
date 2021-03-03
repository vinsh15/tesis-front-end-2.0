import React from "react";

import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: "11rem",
    textTransform: "none !important",
    color: "var(--background) !important",
    border: "1px solid var(--background) !important",
    padding: "5px 10px !important",
    cursor: "pointer !important",
    marginRight: "5px",
  },
}));

/** Componente que representa la barra  de navegación */
function NavbarItem(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");

  const swlInput = async () => {
    const value  = await Swal.fire({
      title: "Ingrese el nombre de la nueva versión",
      input: "text",
      inputPlaceholder: "Nombre",
      showCancelButton: true,
      confirmButtonText: "Crear versión",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "El nombre de la arquitectura es obligatorio";
        } else {
          setName(value);
        }
      },
    });
  };

  /**
   * Popup temporal de SweetAlert con mensaje exitoso
   */
  function swlSuccess() {
    Swal.fire({
      title: "¡Nueva versión creada!",
      icon: "success",
      showConfirmButton: false,
      timer: 4000,
    });
  }

  function handleAdd() {
    console.log("add");
    swlInput();
  }

  function handleCreate() {
    console.log("Create");
  }

  return (
    <>
      {props.type === "add" ? (
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Crear nueva versión
        </Button>
      ) : (
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={handleCreate}
        >
          Agregar elementos
        </Button>
      )}
    </>
  );
}

export default NavbarItem;
