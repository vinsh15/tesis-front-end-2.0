import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

/**
 * Componente que representa la barra inferior
 * del SideBar con boton logout
 */
const SidebarFooter = ({ logout }) => {
  const classes = useStyles();

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
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  drawerFooter: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  icon: {
    color: "var(--background)",
  },
}));

export default SidebarFooter;