import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import AuthContext from "../../auth/context/context";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/EditOutlined';
import { postVersion } from "../../api/versions/versions";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: '11rem',
    textTransform: "none !important",
    color: "var(--background) !important",
    border: "1px solid var(--background) !important",
    padding: "5px 10px !important",
    cursor: "pointer !important",
    marginRight: "5px"
  },
}));

/** Componente que representa la barra  de navegación */
function NavbarItem(props) {
  const classes = useStyles();
  const { user, selectedProject } = useContext(AuthContext);

  const handleAdd = async () => {
    const formData = getFormData();
    const response = await postVersion(formData);
    console.log(response);
    if(response !== 'Error'){
      //Respuesta exitosa
    }
    else{
      //Respuesta fallida
    }
    
  }

  const getFormData = () => {
    const formData = new FormData();
    const versionName = 'Samuel' //Nombre temporal
    formData.append('uid', user.uid);
    formData.append('version_name', versionName);
    formData.append('ver_index', selectedProject.verIndex);
    formData.append('arc_index', selectedProject.arcIndex);
    formData.append('project_index', selectedProject.projectIndex);
    return formData;
  }

  function handleCreate(){
      console.log("Create")
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
