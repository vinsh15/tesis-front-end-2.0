import React, { useState, useContext } from "react";
import AppContext from "../../auth/context/context";
import "./SidebarItem.css";
import {
  manageEditProject,
  manageDeleteProject,
} from "../../helpers/projects/projects";
import {
  manageEditArchitecture,
  manageDeleteArchitecture,
} from "../../helpers/architecture/architecture";

import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "../FileReader/FileReader";
import SidebarDetail from "../SidebarDetail/SidebarDetail";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

/** Componente que representa el item proyecto
 *  a ser añadido en el componente Sidebar
 */
const SidebarItem = ({ item, projectIndex }) => {
  const classes = useStyles();
  const { user, setSelectedProject, setReloadSidebar } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          id={item.name}
          className={classes.summary}
        >
          <Typography style={{ minWidth: 151 }}>{item.name}</Typography>
        </AccordionSummary>

        <SidebarDetail item={item} projectIndex={projectIndex} />

        <AccordionActions>
          <div>
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
                  manageEditProject(
                    user,
                    item.name,
                    projectIndex,
                    setSelectedProject,
                    setReloadSidebar
                  );
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
          </div>
        </AccordionActions>
      </Accordion>
      {open ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          projectIndex={projectIndex}
          type={"Arquitectura"}
        />
      ) : null}
    </div>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles({
  root: {
    width: "95%",
    margin: "auto",
    marginBottom: "15px",
  },
  accordion: {
    backgroundColor: "var(--background)",
  },

  summary: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SidebarItem;
