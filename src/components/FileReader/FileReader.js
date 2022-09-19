import React, { useContext, useState } from "react";
import "./FileReader.css";
import "react-dropzone-uploader/dist/styles.css";

import { makeStyles } from "@material-ui/core/styles";
import { ModalMessage } from "../../components/ModalMessage/ModalMessage";
import { submitArchitecture } from "../../helpers/architecture/architecture";
import { manageElementsSubmit } from "../../helpers/elements/elements";

import AppContext from "../../auth/context/context";
import Dropzone from "react-dropzone-uploader";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import Loader from "../Loader/Loader";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { manageErrors } from "../../helpers/errors/errors";

/**
 * Componente que representa pop-up
 * para añadir archivos
 */
const FileReader = ({ onClose, open, projectIndex, type }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [valid, setValid] = useState(true);
  const [loader, setLoader] = useState(false);
  const {
    user,
    setReloadSidebar,
    selectedProject, setSelectedProject,
  } = useContext(AppContext);

  /**
   * Manejar acción en base al tipo de data a subir a
   * la base de datos
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   */
  const handleSubmit = async (allFiles) => {
    var response;
    setLoader(true);
    switch (type.toLowerCase()) {
      case "arquitectura":
        if (name !== "") {
          setLoader(true);
          response = await manageArchitectureSubmit(allFiles);
          manageResponse(response);
          break;
        } else {
          setValid(false);
          break;
        }
      case "elementos":
        setLoader(true);
        manageElementsSubmit(
          user,
          allFiles,
          selectedProject,
          setSelectedProject,
          setReloadSidebar
        );
        break;
      default:
        break;
    }
  };

  /**
   * Manejar los modals a mostrar en base a
   * la respuesta obtenida de la API
   * @param {JSON} response respuesta de la llamada a la API
   */
  const manageResponse = (response) => {
    setReloadSidebar(false);
    if (Number.isInteger(response)) {
      manageErrors(response)
    } else {
      ModalMessage("¡Arquitectura creada!", " ", "success", false, 4000);
    }
  };

  /**
   * Llamada a la API para agregar una nueva arquitectura
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   * @returns JSON de la respuesta de la API
   */
  const manageArchitectureSubmit = async (allFiles) => {
    const response = await submitArchitecture(
      allFiles,
      user,
      name,
      projectIndex,
      setReloadSidebar
    );
    return response;
  };

  /**
   * Actualizar el nombre según se actualice el TextField
   * @param {Event} event objeto de tipo evento
   */
  const handleChange = (event) => {
    setValid(true);
    setName(event.target.value);
  };

  React.useEffect(() => {
    if (loader) {
      setTimeout(setLoader(false), 5000);
      onClose();
    }
  }, [loader]);

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
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onClose}
                  className={classes.onClose}
                  edge="start"
                >
                  <HighlightOffIcon />
                </IconButton>
                <h2 className={classes.h1}>Agregar prueba {type}</h2>
              </div>

              {type.toLowerCase() === "arquitectura" ? (
                <>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Nombre prueba"
                    value={name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  {!valid ? (
                    <div className={classes.validacion}>
                      * El nombre de la arquitectura es obligatorio{" "}
                    </div>
                  ) : null}
                </>
              ) : null}
              <Dropzone
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
    top: "24%",
    left: "23%",
    width: "60%",
    minHeight: 300,
    maxHeight: 600,
    overflow: "auto",
    border: "none",
    borderRadius: 8,
    background: "var(--background)",
    boxShadow: theme.shadows[5],
    padding: "1.25rem",
    outline: "none",
    animationDuration: "0.3s",
    animationTimingFunction: "ease",
    animationDelay: "0s",
    animationIterationCount: 1,
    animationDirection: "normal",
    animationFillMode: "none",
    animationPlayState: "running",
  },
  h1: {
    color: "var(--primaryDark)",
    margin: "auto",
    marginBottom: 35,
    fontSize: "1.875rem",
    textAlign: "center",
    fontFamily: "var(font-family-content)",
  },
  validacion: {
    color: "var(--error)",
    fontSize: 13,
    margin: 5,
  },
  onClose: {
    position: "relative",
    left: "98%",
    top: "-9px",
    backgroundColor: "var(primaryDark)",
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
}));

export default FileReader;
