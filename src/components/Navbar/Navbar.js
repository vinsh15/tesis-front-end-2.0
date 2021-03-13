import React, { useContext, useState } from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { manageCreateVersion } from "../../helpers/versions/versions";

import AddIcon from "@material-ui/icons/AddOutlined";
import AppBar from "@material-ui/core/AppBar";
import AppContext from "../../auth/context/context";
import EditIcon from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "../FileReader/FileReader";
import NavbarItem from "../NavbarItem/NavbarItem";
import Toolbar from "@material-ui/core/Toolbar";

/**
 * Componente que representa la barra
 * superior de navegacion
 */
const Navbar = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, selectedProject, setReloadSidebar } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {selectedProject ? (
            <>
              <h1
                className={classes.h1}
                style={{ marginLeft: 0, minWidth: 145 }}
              >
                {selectedProject.versionName}
              </h1>
              <div style={{ textAlign: "right" }}>
                <NavbarItem
                  icon={<AddIcon />}
                  title={"Crear nueva versión"}
                  onClick={() =>
                    manageCreateVersion(user, selectedProject, setReloadSidebar)
                  }
                />
                <NavbarItem
                  icon={<EditIcon />}
                  title={"Agregar elementos"}
                  onClick={() => setShowModal(true)}
                />
              </div>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      {showModal ? (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          projectIndex={selectedProject.projectIndex}
          type={"Elementos"}
        />
      ) : null}
    </>
  );
};

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

  h1: {
    color: "var(--background)",
    margin: "auto",
    fontFamily: "var(font-family-content)",
  },
}));

export default Navbar;
