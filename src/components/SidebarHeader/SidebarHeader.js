import React, { useContext } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import { manageCreateProject } from "../../helpers/projects/projects"
import AppContext from "../../auth/context/context";

/**
 * Componente que representa barra superior del SideBar
 */
const SidebarHeader = ({ setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, setReloadSidebar } = useContext(AppContext);

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
        onClick={() => manageCreateProject(user, setReloadSidebar)}
      >
        Agregar Proyecto
      </Button>
    </>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },

  icon: {
    color: "var(--background)",
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

export default SidebarHeader;
