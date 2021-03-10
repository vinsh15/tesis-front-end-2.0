import React, { useContext, useState } from "react";
import "./Sidebar.css";

import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarFooter from "../SidebarFooter/SidebarFooter";
import AppContext from "../../auth/context/context";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../Loader/Loader";
import LoginButton from "../LoginButton/LoginButton";
import SidebarItem from "../SidebarItem/SidebarItem";

/**
 * Componente que representa la barra lateral
 * princial de navegacion
 */

const Sidebar = ({ loader, login, logout, items }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { user } = useContext(AppContext);

  /**
   * Agregar elementos en barra lateral segun proyectos del usuario
   * @param {Array} items almacena el arreglo de proyecto correspondiente al usuario
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  const Logged = (items) => {
    if (Array.isArray(items)) {
      return (
        <>
          <SidebarHeader setOpen={setOpen} />
          <List className="list">
            {items.map((item, index) => {
              return (
                <SidebarItem
                  key={item.name}
                  item={item}
                  projectIndex={index}
                />
              );
            })}
          </List>
          <SidebarFooter logout={logout} />
        </>
      );
    } else {
      return (
        <>
          <SidebarHeader setOpen={setOpen} />
          <h1 className={classes.h1}>No tienes proyectos actualmente</h1>
          <SidebarFooter logout={logout} />
        </>
      );
    }
  };

  /**
   * Barra lateral con contenido para iniciar sesion
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  const unLogged = () => {
    return (
      <div className={classes.title}>
        <h1>Iniciar sesión</h1>
        <LoginButton login={login} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar open={open} setOpen={setOpen} />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {loader ? <Loader /> : user ? Logged(items) : unLogged()}
      </Drawer>
    </div>
  );
};

/** Creacion de capa de estilos para el componente */
const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    minWidth: 200,
    flexShrink: 0,
    backgroundColor: "var(--primaryDark)",
  },

  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    backgroundColor: "var(--primaryDark)",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },

  title: {
    margin: "auto",
    textAlign: "center",
    width: "95%",
    color: "var(--background)",
    letterSpacing: 1,
    fontFamily: "var(--font-family-headline)",
  },

  h1: {
    color: "var(--background)",
    margin: "auto",
    textAlign: "center",
    width: 200,
    fontFamily: "var(font-family-content)",
  },
}));

export default Sidebar;
