import React, { useContext, useState } from "react";
import clsx from "clsx";
import "./Sidebar.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";
import { manageCreateVersion } from "../../helpers/versions/versions";
import { postProject } from "../../api/projects/projects";

import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import AddIcon from '@material-ui/icons/AddOutlined';
import AppBar from "@material-ui/core/AppBar";
import AppContext from "../../auth/context/context";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import EditIcon from '@material-ui/icons/EditOutlined';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Loader from "../Loader/Loader";
import LoginButton from "../LoginButton/LoginButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavbarItem from "../NavbarItem/NavbarItem";
import SidebarItem from "../SidebarItem/SidebarItem";
import Toolbar from "@material-ui/core/Toolbar";



/**
 * Componente que representa la barra lateral
 * princial de navegacion
 */

const Sidebar = ({
  loader,
  login,
  logout,
  item,
  items,
  setItem
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { user, selectedProject } = useContext(AppContext);

  /**
   * Creacion de barra superior del SideBar con informacion del usuario
   * @returns {JSX} estructura de elementos en la barra lateral
   */
  const SideBarHeader = () => {
    return (
      <>
        <div className={classes.drawerHeader}>
          <IconButton className={classes.icon}>
            <AccountIcon />
            <p className={classes.p}>{user.displayName}</p>
          </IconButton>
          <IconButton className={classes.icon} onClick={() => setOpen(false)}>
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
          onClick={() => postProject(user, "Proyectico")} //Esta es la función a llamar con el modal del nombre
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
  const SideBarFooter = () => {
    return (
      <>
        <Divider className="divider" />
        <div className={classes.drawerFooter}>
          <IconButton className={classes.icon} onClick={logout}>
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
  const Logged = (items) => {
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
                  projectIndex={index}
                  setItem={setItem}
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
  const unLogged = () => {
    return (
      <div className={classes.title}>
        <h1>Iniciar sesión</h1>
        <LoginButton login={login} />
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
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {item && item.length !== 0 ? (
            <>
                <h1 className={classes.h1} style={{ marginLeft: "0" }}>
                  {item[0]}
                </h1>
                <div>
                  <NavbarItem
                    icon={<AddIcon />}
                    title={"Crear nueva versión"}
                    onClick={() => manageCreateVersion(user, selectedProject)}
                  />
                  <NavbarItem
                    icon={<EditIcon />}
                    title={"Agregar elementos"}
                    onClick={() => console.log("Agregar elementos")}
                  />
                </div>
              </>
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
        {loader ? (
          <Loader />
        ) : user ? (
          Logged(items)
        ) : (
          unLogged()
        )}
      </Drawer>
    </div>
  );
}

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

export default Sidebar;
