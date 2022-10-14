import React, { useState, } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuIcon from "@material-ui/icons/Menu";
import "./table.css"

import TableItem from "../TableItem/TableItem";

/**
 * Componente que representa 
 * al contenedor de tabs con tablas
 * del proyecto selecionado
 */
const Table = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /**
   * Cambiar estado del drawer
   */
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawer}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <Divider />
        <TableItem />
      </Drawer>
    </div>
  )
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 25,
    backgroundColor: "var(--primaryDark)",
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    transition: "0.5s",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    color: "white",
    "&:hover": {
      color: "var(--primaryDark)",
    },
  },
  hide: {
    transition: "1s",
    display: "none",
  },
  drawer: {
    width: '50%',
    flexShrink: 0,
  },
  drawerPaper: {
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",

    width: '70%',
    height: '100%',
  },
  drawerHeader: {
    height: 40,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  },
}));

export default Table;
