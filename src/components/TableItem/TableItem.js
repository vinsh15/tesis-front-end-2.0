import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import EdgesTable from "./Edges/Edges";
import NodesTable from "./Nodes/Nodes";
import { TextField } from "@material-ui/core";

/**
 * Componente que representa al contenedor
 * de cada panel en las tabs
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

/**
 * Manejador de props para cada tab
 * @param {int} index tab actual seleccionada
 */
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

/**
 * Componente que representa
 * al contenedor de las tablas
 * para manejo de nodos y aristas
 */
const TableItem = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  /**
   * Manejador de eventos sobre
   * cambios en tabs
   * @param {Event} event 
   * @param {int} newValue nuevo indice
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * Manejador de eventos sobre
   * cambios en el indice de las tabs
   * @param {int} index nuevo indice
   */
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Nodos" {...a11yProps(0)} />
          <Tab label="Relaciones" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <NodesTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <EdgesTable />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
  },
  inputs: {
    padding: theme.spacing(2),
  },
  inputAlign: {
    marginRight: theme.spacing(1.5),
  }
}));

export default TableItem;
