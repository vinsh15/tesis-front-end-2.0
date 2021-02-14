import React from "react";
import "./FileReader.css";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

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
    color: "var(--uiDarkGrey)",
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

  const onSubmit = (file, formData) => {
    formData.append("file", file.file, file.meta.name);
    file.remove();
  };

  const handleSubmit = (allFiles) => {
    const formData = new FormData();

    if (name !== "")
      allFiles.forEach((file) => {
        //onSubmit(file, formData)
        console.log(file);
      });
  };

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
          <h2 className={classes.h1}>Agregar arquitectura</h2>
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
                : "Agrega archivos o haz click para buscar"
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
