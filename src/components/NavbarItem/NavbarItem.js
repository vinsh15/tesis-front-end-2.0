import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import AppContext from "../../auth/context/context";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/EditOutlined';
import { postVersion } from "../../api/versions/versions";
import Swal from "sweetalert2";


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
  const { user, selectedProject } = useContext(AppContext);

  /**
   * Pedir al usuario el nombre de la nueva versión para
   * actualizar la base de datos
   */
  const manageCreateVersion = async () => {
    await Swal.fire({
      title: "Ingrese el nombre de la nueva versión",
      input: "text",
      inputPlaceholder: "Nombre",
      showCancelButton: true,
      confirmButtonText: "Crear versión",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "El nombre de la arquitectura es obligatorio";
        }
      },
    }).then(result => {
      if(result.isConfirmed){
        submitVersion(result.value);
      }
    });
  };

  /**
   * Popup temporal de SweetAlert con mensaje exitoso
   */
  const swlSuccess = () => {
    Swal.fire({
      title: "¡Nueva versión creada!",
      icon: "success",
      showConfirmButton: false,
      timer: 4000,
    });
  }

  /**
   * Subir la nueva versión a la base de datos
   * @param {String} versionName el nombre ingresado de la versión 
   */
  const submitVersion = async (versionName) => {
    const formData = getFormData(versionName);
    const response = await postVersion(formData);
    if(response !== 'Error'){
      swlSuccess();
    }
    else{
      //Respuesta fallida
    }
  } 

  /**
   * Construir el form-data
   * @param {String} versionName arreglo que contiene todos los archivos XML
   */
  const getFormData = (versionName) => {
    const formData = new FormData();
    formData.append('uid', user.uid);
    formData.append('version_name', versionName);
    formData.append('ver_index', selectedProject.verIndex);
    formData.append('arc_index', selectedProject.arcIndex);
    formData.append('project_index', selectedProject.projectIndex);
    return formData;
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
          onClick={manageCreateVersion}
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
