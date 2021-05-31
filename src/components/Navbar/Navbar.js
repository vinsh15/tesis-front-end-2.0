import React, { useContext, useState } from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  manageCreateVersion,
  manageDeleteVersion,
  manageEditVersion,
} from "../../helpers/versions/versions";
import { downloadGraph } from "../../helpers/content/downloader";

import Swal from "sweetalert2";

import AddIcon from "@material-ui/icons/AddOutlined";
import AppBar from "@material-ui/core/AppBar";
import AppContext from "../../auth/context/context";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CreateIcon from "@material-ui/icons/CreateNewFolderOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Excel from "../Excel/ExcelDownloader";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "../FileReader/FileReader";
import nodeHelper from "../../helpers/nodes/nodes";
import Toolbar from "@material-ui/core/Toolbar";
import NavbarItem from "../NavbarItem/NavbarItem";

/**
 * Componente que representa la barra
 * superior de navegacion
 */
const Navbar = ({ open, setOpen }) => {
  const classes = useStyles();
  const { user, selectedProject, setSelectedProject, setReloadSidebar, cy } =
    useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Cerrar proyecto seleccionado
   */
  const onClose = () => {
    Swal.fire({
      text: "¿Seguro que deseas cerrar " + selectedProject.versionName + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--success)",
      cancelButtonColor: "var(--error)",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedProject();
      }
    });
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
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
                  <Excel
                    fileName={selectedProject.versionName}
                    nodesData={nodeHelper.getNodeData(selectedProject)}
                    relationsData={nodeHelper.getRelationData(selectedProject)}
                  />
                  <MenuItem
                    onClick={() =>
                      downloadGraph("jpg", cy, selectedProject.versionName)
                    }
                  >
                    Descargar JPG
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      downloadGraph("png", cy, selectedProject.versionName)
                    }
                  >
                    Descargar PNG
                  </MenuItem>
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

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onClose}
                  edge="start"
                >
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>
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
    fontSize: 24,
  },

  icon: {
    color: "var(--background)",
    paddingRight: 0,
    paddingLeft: 5,
  },
}));

export default Navbar;
