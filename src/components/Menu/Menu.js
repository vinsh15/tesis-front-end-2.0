import React, { useContext } from "react";
import AppContext from "../../auth/context/context";
import {
  manageEditProject,
  manageDeleteProject,
} from "../../helpers/projects/projects";
import {
  manageEditArchitecture,
  manageDeleteArchitecture,
} from "../../helpers/architecture/architecture";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

/**
 * Componente que representa al
 * menu popup para manejo de
 * arquitecturas y proyectos
 */
const StyledMenu = ({ item, projectIndex, setOpen }) => {
  const { user, setSelectedProject, setReloadSidebar } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  /**
   * Manejador de click sobre icon
   * para abrir menu
   * @param {Event} event
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cerrar menu
   * @param {Event} event
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        style={{ transform: "rotate(90deg)" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        PaperProps={{
          style: {
            padding: 10,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            handleClose();
          }}
        >
          Agregar Arquitectura
        </MenuItem>
        <MenuItem
          disabled={item.architectures ? false : true}
          onClick={() => {
            manageEditArchitecture(
              user,
              projectIndex,
              item.architectures,
              setSelectedProject,
              setReloadSidebar
            );
            handleClose();
          }}
        >
          Editar Arquitectura
        </MenuItem>
        <MenuItem
          disabled={item.architectures ? false : true}
          onClick={() => {
            manageDeleteArchitecture(
              user,
              projectIndex,
              item.architectures,
              setSelectedProject,
              setReloadSidebar
            );
            handleClose();
          }}
        >
          Eliminar Arquitectura
        </MenuItem>
        <Divider className="dividerMenu" />
        <MenuItem
          onClick={() => {
            manageEditProject(user, item.name, projectIndex, setReloadSidebar);
            handleClose();
          }}
        >
          Editar Proyecto
        </MenuItem>
        <MenuItem
          onClick={() => {
            manageDeleteProject(
              user,
              item.name,
              projectIndex,
              setSelectedProject,
              setReloadSidebar
            );
            handleClose();
          }}
        >
          Eliminar Proyecto
        </MenuItem>
      </Menu>
    </>
  );
};

export default StyledMenu;
