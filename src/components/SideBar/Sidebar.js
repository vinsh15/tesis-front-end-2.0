import React, { useState } from "react";
import clsx from "clsx";
import "./Sidebar.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

import Loader from "../Loader/Loader";
import LoginButton from "../LoginButton/LoginButton";
import NavbarItem from "../NavbarItem/NavbarItem";
import SidebarItem from "../SidebarItem/SidebarItem";

/** Creacion de capa de estilos para el componente */
const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  hide: {
    display: "none",
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

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },

  drawerFooter: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  title: {
    margin: "auto",
    textAlign: "center",
    width: "95%",
    color: "var(--background)",
    letterSpacing: 1,
    fontFamily: "var(--font-family-headline)",
  },

  icon: {
    color: "var(--background)",
  },

  h1: {
    color: "var(--background)",
    margin: "auto",
    textAlign: "center",
    fontFamily: "var(font-family-content)",
  },

  p: {
    marginLeft: 5,
    fontSize: "1rem",
  },

  button: {
    width: "95%",
    marginLeft: "2.5%",
    textTransform: "none !important",
    color: "var(--background) !important",
    border: "1px solid var(--background) !important",
    padding: "5px 10px !important",
    cursor: "pointer !important",
  },
}));

/**
 * Componente que representa la barra lateral
 * princial de navegacion
 */

function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * Creacion de barra superior del SideBar con informacion del usuario
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  function SideBarHeader() {
    return (
      <>
        <div className={classes.drawerHeader}>
          <IconButton className={classes.icon}>
            <AccountIcon />
            <p className={classes.p}>{props.user.displayName}</p>
          </IconButton>
          <IconButton className={classes.icon} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider className="divider" />
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          onClick={console.log("new project")}
        >
          Agregar Proyecto
        </Button>
      </>
    );
  }

  /**
   * Creacion de barra inferior fija del SideBar con boton logout
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  function SideBarFooter() {
    return (
      <>
        <Divider className="divider" />
        <div className={classes.drawerFooter}>
          <IconButton className={classes.icon} onClick={props.logout}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </>
    );
  }

  /**
   * Agregar elementos en barra lateral segun proyectos del usuario
   * @param {Array} items almacena el arreglo de proyecto correspondiente al usuario
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  function Logged(items) {
    if (Array.isArray(items)) {
      return (
        <>
          {SideBarHeader()}
          <List className="list">
            {items.map((item, index) => {
              return (
                <SidebarItem
                  key={item.name}
                  item={item}
                  index={index}
                  setItem={props.setItem}
                />
              );
            })}
          </List>
          {SideBarFooter()}
        </>
      );
    } else {
      return (
        <>
          {SideBarHeader()}
          <h1 className={classes.h1}>No tienes proyectos actualmente</h1>
          {SideBarFooter()}
        </>
      );
    }
  }

  /**
   * Barra lateral con contenido para iniciar sesion
   * @returns {JSX} estructura de elementos en la barra lateral
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
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {props.item ? (
            props.item.length !== 0 ? (
              <>
                <h1 className={classes.h1} style={{ marginLeft: "0" }}>
                  {props.item}
                </h1>
                <div>
                  <NavbarItem item={props.item} />
                  <NavbarItem type={"add"} item={props.item} />
                </div>
              </>
            ) : null
          ) : null}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
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
