import React, { useContext, useState } from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  manageCreateVersion,
  manageDeleteVersion,
  manageEditVersion,
} from "../../helpers/versions/versions";
import { downloadGraph } from "../../helpers/content/downloader";

import AddIcon from "@material-ui/icons/AddOutlined";
import AppBar from "@material-ui/core/AppBar";
import AppContext from "../../auth/context/context";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CreateIcon from "@material-ui/icons/CreateNewFolderOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "../FileReader/FileReader";
import NavbarItem from "../NavbarItem/NavbarItem";
import Toolbar from "@material-ui/core/Toolbar";

import Excel from "../Excel/ExcelDownloader";

/**
 * Componente que representa la barra
 * superior de navegacion
 */
const Navbar = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    user,
    selectedProject,
    setSelectedProject,
    setReloadSidebar,
    cy
  } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
              <div className={classes.title}>
                <h1
                  className={classes.h1}
                  style={{ marginLeft: 0, minWidth: 145 }}
                >
                  {selectedProject.versionName}
                </h1>
                <IconButton
                  aria-label="open edit"
                  className={classes.icon}
                  onClick={() =>
                    manageEditVersion(
                      user,
                      selectedProject,
                      setSelectedProject,
                      setReloadSidebar
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
                {selectedProject.versions > 1 ? (
                  <IconButton
                    aria-label="open delete"
                    className={classes.icon}
                    onClick={() =>
                      manageDeleteVersion(
                        user,
                        selectedProject,
                        setSelectedProject,
                        setReloadSidebar
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </div>
              <div style={{ textAlign: "right" }}>
                <NavbarItem
                  icon={<GetAppIcon />}
                  title={"Descargar"}
                  aria_controls={"simple-menu"}
                  aria_haspopup={"true"}
                  onClick={handleClick}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      padding: 10,
                    },
                  }}
                >
                  <Excel type="nodes" data={[{id: "hola", name: "mari"}]} fileName="hola"/>
                  <MenuItem onClick={() => downloadGraph("jpg", cy, "prueba")}>Descargar JPG</MenuItem>
                  <MenuItem onClick={() => downloadGraph("png", cy, "prueba")}>Descargar PNG</MenuItem>
                </Menu>
                <NavbarItem
                  icon={<CreateIcon />}
                  title={"Crear nueva versión"}
                  aria_controls={"simple-menu"}
                  aria_haspopup={"false"}
                  onClick={() =>
                    manageCreateVersion(user, selectedProject, setReloadSidebar)
                  }
                />
                <NavbarItem
                  icon={<AddIcon />}
                  aria_controls={"simple-menu"}
                  aria_haspopup={"false"}
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
    color: "var(--background)",
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

  title: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  h1: {
    color: "var(--background)",
    margin: "auto",
    fontFamily: "var(font-family-content)",
    display: "inline",
    paddingRight: 16,
    fontSize: 24
  },

  icon: {
    color: "var(--background)",
    paddingRight: 0,
    paddingLeft: 5,
  },
}));

export default Navbar;
