import React from "react";
import "./Sidebar.css";

import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Loader from "../Loader/Loader";
import LoginButton from "../LoginButton/LoginButton";
import SidebarItem from "../SidebarItem/SidebarItem";


/** Creacion de capa de estilos para el componente */
const drawerWidth = "35%";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    minWidth: 200,
    flexShrink: 0,
    backgroundColor: "var(--primaryDark)",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "var(--primaryDark)",
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "var(--primaryDark)",
    padding: theme.spacing(3),
  },
  title: {
    margin: "auto",
    textAlign: "center",
    width: "95%",
    color: 'var(--background)',
    letterSpacing: 1,
    fontFamily: 'var(--font-family-headline)'
  },
  display: {
    display: "flex",
    padding: 10,
    justifyContent: 'flex-end',
  },
  icon: {
    color: 'var(--background)'
  },
  h1: {
    color: 'var(--background)',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'var(font-family-content)'
  }
}));

/**
 * Componente que representa la barra lateral
 * princial de navegacion
 */

function Sidebar(props) {
  const classes = useStyles();

  /**
   * Creacion de elementos en barra lateral segun contenido de usuario existente
   * @param {Array} items almacena el arreglo de proyecto correspondiente al usuario
   * @returns {} estructura de elementos en la barra lateral
   */
  function Logged(items) {
    if (Array.isArray(items)) {
      return (
        <>
          <div className={classes.display}>
            <IconButton className={classes.icon} onClick={props.logout}>
              <ExitToAppIcon />
            </IconButton>
          </div>
          <List>
            {items.map((item, index) => {
              return <SidebarItem key={item.name} item={item} index={index} />;
            })}
          </List>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.display}>
            <IconButton className={classes.icon} onClick={props.logout}>
              <ExitToAppIcon />
            </IconButton>
          </div>
          <h1 className={classes.h1}>No tienes proyectos actualmente</h1>
        </>
      );
    }
  }

  /**
   * Creacion de elementos en barra lateral para usuario no existente
   * @returns {} estructura de elementos en la barra lateral
   */
  function unLogged() {
    return (
      <div className={classes.title}>
        <h1>Iniciar sesión</h1>
        <LoginButton login={props.login} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {props.loader ? (
          <Loader />
        ) : props.user ? (
          Logged(props.items)
        ) : (
          unLogged()
        )}
      </Drawer>
    </div>
  );
}

export default Sidebar;
