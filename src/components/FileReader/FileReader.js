import React from "react";
import "./FileReader.css";
import "react-dropzone-uploader/dist/styles.css";

import { makeStyles } from "@material-ui/core/styles";
import { postArchitecture } from "../../api/architecture/architecture";
import Dropzone from "react-dropzone-uploader";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: "60%",
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
}));

/** Componente que representa pop-up
 *  para añadir archivos
 */
function FileReader(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");

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
    formData.append('uid', props.uid);
    formData.append('name', name);
    formData.append('index', props.index);
    allFiles.forEach(file => {
      addFile(file, formData);
    })
    return formData;
  }

  /**
   * 
   * @param {Array} allFiles arreglo que contiene todos los archivos XML
   */
  const handleSubmit = async (allFiles) => {
    if(name !== ""){
      const formData = getFormData(allFiles);
      var response = await postArchitecture(formData);
      if(response !== 'Error'){
        //Respuesta fallida
      }
      else{
        //Respuesta exitosa
      }
    }
  };

  /**
   * Actualizar el nombre según se actualice el TextField
   * @param {Event} event objeto de tipo evento
   */
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.onClose}
      >
        <div className={classes.paper}>
          <h2 className={classes.h1}>Agregar {props.type}</h2>
          <TextField
            required
            id="outlined-basic"
            label="Nombre"
            value={name}
            onChange={handleChange}
            variant="outlined"
          />
          <Dropzone
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            styles={{ dropzone: { maxHeight: 200, maxWidth: 400 } }}
            accept="text/xml"
            inputContent={(files, extra) =>
              extra.reject
                ? "XML files only"
                : "Agrega archivos o has click para buscar"
            }
            styles={{
              dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
              inputLabel: (files, extra) =>
                extra.reject ? { color: "red" } : {},
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default FileReader;
