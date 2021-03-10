import React, { useContext, useState } from "react";
import "./FileReader.css";
import "react-dropzone-uploader/dist/styles.css";

import AppContext from "../../auth/context/context";
import Dropzone from "react-dropzone-uploader";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader/Loader";
import Modal from "@material-ui/core/Modal";
import { postArchitecture } from "../../api/architecture/architecture";
import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
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
  const { user, setReloadSidebar } = useContext(AppContext);

  const handleChangeStatus = ({ meta }, status) => {
    //console.log(status, meta)
  };

  /**
   * Agrega el archivo al form-data y lo elimina del dropzone
   * @param {File} file archivo XML
   * @param {FormData} formData objeto form-data
   */
  const addFile = (file, formData) => {
    formData.append("file", file.file, file.meta.name);
    file.remove();
  };

  /**
   * Construir el form-data
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   */
  const getFormData = (allFiles) => {
    const formData = new FormData();
    formData.append("uid", user.uid);
    formData.append("name", name);
    formData.append("index", projectIndex);
    allFiles.forEach((file) => {
      addFile(file, formData);
    });
    return formData;
  };

  /**
   *
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   */
  const handleSubmit = async (allFiles) => {
    setLoader(true);
    if (name !== "") {
      const formData = getFormData(allFiles);
      const response = await postArchitecture(formData);
      if (response !== "Error") {
        setName("");
        swlSuccess();
      } else {
        swlError();
      }
    } else {
      setValid(false);
    }
  };

  /**
   * Actualizar el nombre según se actualice el TextField
   * @param {Event} event objeto de tipo evento
   */
  const handleChange = (event) => {
    setValid(true);
    setName(event.target.value);
  };

  /**
   * Modal con mensaje de exito y actualizacion
   * del Sidebar
   */
  function swlSuccess() {
    setTimeout(setLoader(false), 3000);
    onClose();
    setReloadSidebar(true);
    ModalMessage(
      "¡Arquitectura creada!",
      "Se ha creado una nueva arquitectura",
      "success",
      false,
      5000
    );
    setReloadSidebar(false);
  }

  /**
   * Modal con mensaje de error
   */
  function swlError() {
    setTimeout(setLoader(false), 3000);
    onClose();
    ModalMessage(
      "¡Hubo un error!",
      "No se ha creado una nueva arquitectura",
      "error",
      false,
      5500
    );
  }

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
