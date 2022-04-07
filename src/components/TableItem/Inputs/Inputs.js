import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

import {Button} from '@material-ui/core';


const Inputs = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <>
      <div className={classes.inputs}>
        <TextField
            label="Peso DMS"
            id="outlined-size-small"
            className={classes.inputAlign}
            defaultValue="25"
            size="small"
            >
        </TextField>
         <TextField
            label="Peso Acoplamiento"
            id="outlined-size-small"
            className={classes.inputAlign}
            defaultValue="25"
            size="small"
            >
        </TextField>
        <TextField
            label="Semejanza "
            id="outlined-size-small"
            className={classes.inputAlign}
            defaultValue="25"
            size="small"
            >
        </TextField>
        <TextField
            label="Paquete"
            id="outlined-size-small"
            className={classes.inputAlign}
            defaultValue="25"
            size="small"
            >
        </TextField>
      </div>
      <div>
          <Button variant="contained">
            Total
          </Button>
      </div>
    </>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: theme.spacing(2),
  },
  inputAlign: {
    marginRight: theme.spacing(1.5),
    width: 10,
  }
}));

export default Inputs;
