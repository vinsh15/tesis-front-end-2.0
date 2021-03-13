import React, { useContext, useState } from "react";
import "./FileReader.css";
import "react-dropzone-uploader/dist/styles.css";

import { makeStyles } from "@material-ui/core/styles";
import ModalResponse from "../../components/ModalResponse/ModalResponse";
import { submitArchitecture } from "../../helpers/architecture/architecture";
import { submitElements } from "../../helpers/elements/elements";

import AppContext from "../../auth/context/context";
import Dropzone from "react-dropzone-uploader";
import Loader from "../Loader/Loader";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

/**
 * Componente que representa pop-up
 * para añadir archivos
 */
const FileReader = ({ onClose, open, projectIndex, type }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [valid, setValid] = useState(true);
  const [loader, setLoader] = useState(false);
  const { user, setReloadSidebar, selectedProject } = useContext(AppContext);
  var messages = {
    "error": "",
    "success": ""
  };

  const handleChangeStatus = ({ meta }, status) => {
    //console.log(status, meta)
  };


  /**
   * Manejar acción en base al tipo de data a subir a 
   * la base de datos
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   */
  const handleSubmit = async (allFiles) => {
    if(name !== ""){
      setLoader(true);
      var response;
      switch (type.toLowerCase()) {
        case 'arquitectura':
          response = await manageArchitectureSubmit(allFiles);
          break;
        case 'elementos':
          response = await manageElementsSubmit(allFiles);
          break;
        default:
          break;
      }
      manageResponse(response);
    }else{
      setValid(false);     
    }
  };

  /**
   * Manejar los modals a mostrar en base a
   * la respuesta obtenida de la API
   * @param {JSON} response respuesta de la llamada a la API
   */
  const manageResponse = (response) => {
    setTimeout(setLoader(false), 3000);
    onClose();
    if(type.toLowerCase() === 'arquitectura'){
      setReloadSidebar(true);
    }
    if(response === 'Error'){
      ModalResponse("¡Hubo un error!", messages.error, "error");
    }
    else{
      ModalResponse("¡Éxito!", messages.success, "success");
    }
    if(type.toLowerCase() === 'arquitectura'){
      setReloadSidebar(false);
    }
  }

  /**
   * Llamada a la API para agregar una nueva arquitectura
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   * @returns JSON de la respuesta de la API
   */
  const manageArchitectureSubmit = async (allFiles) => {
    const response = await submitArchitecture(allFiles, user, name, projectIndex);
    messages = {
      "success": "Se ha creado una nueva arquitectura",
      "error": "No se ha podido crear una nueva arquitectura"
    };
    return response;
  }

  /**
   * Llamada a la API para agregar nuevos elementos a una
   * versión de una arquitectura
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   * @returns JSON de la respuesta de la API
   */
  const manageElementsSubmit = async (allFiles) => {
    const response = await submitElements(allFiles, user, selectedProject);
    messages = {
      "success": "Se han agregado los nuevos elementos",
      "error": "No se han podido agregar los nuevos elementos"
    };
    return response;
  }

  /**
   * Actualizar el nombre según se actualice el TextField
   * @param {Event} event objeto de tipo evento
   */
  const handleChange = (event) => {
    setValid(true);
    setName(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.paper}>
          {loader ? (
            <Loader />
          ) : (
            <>
              <h2 className={classes.h1}>Agregar {type}</h2>
              <TextField
                required
                id="outlined-basic"
                label="Nombre"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
              {!valid ? (
                <div className={classes.validacion}>
                  * El nombre de la arquitectura es obligatorio{" "}
                </div>
              ) : null}
              <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                styles={{ dropzone: { maxHeight: 200, maxWidth: 400 } }}
                accept="text/xml"
                inputContent={(files, extra) =>
                  extra.reject
                    ? "Solo cargar archivos .xml"
                    : "Agrega archivos o hacer clic para buscar"
                }
                styles={{
                  dropzoneReject: {
                    borderColor: "red",
                    backgroundColor: "#DAA",
                  },
                  inputLabel: (files, extra) =>
                    extra.reject ? { color: "red" } : {},
                }}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "20%",
    left: "20%",
    width: "60%",
    minHeight: 300,
    maxHeight: 600,
    overflow: "auto",
    border: "none",
    borderRadius: 5,
    background: "var(--background)",
    boxShadow: theme.shadows[5],
    padding: "32px 24px 20px",
  },
  h1: {
    color: "var(--primaryDark)",
    margin: "auto",
    marginBottom: 35,
    textAlign: "center",
    fontFamily: "var(font-family-content)",
  },
  validacion: {
    color: "var(--error)",
    fontSize: 13,
    margin: 5,
  },
}));

export default FileReader;
