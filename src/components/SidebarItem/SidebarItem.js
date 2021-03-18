import React, { useState, useContext } from "react";
import AppContext from "../../auth/context/context";
import "./SidebarItem.css";
import {
  manageEditProject,
  manageDeleteProject,
} from "../../helpers/projects/projects";

import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "../FileReader/FileReader";
import SidebarDetail from "../SidebarDetail/SidebarDetail";
import Typography from "@material-ui/core/Typography";

/** Componente que representa el item proyecto
 *  a ser añadido en el componente Sidebar
 */
const SidebarItem = ({ item, projectIndex }) => {
  const classes = useStyles();
  const { user, setSelectedProject, setReloadSidebar } = useContext(AppContext);
  const [open, setOpen] = useState(false);

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
          <IconButton
            aria-label="open edit"
            className={classes.icon}
            onClick={() =>
              manageEditProject(
                user,
                item.name,
                projectIndex,
                setSelectedProject,
                setReloadSidebar
              )
            }
          >
            <EditIcon className={classes.icon} />
          </IconButton>
          <IconButton
            aria-label="open delete"
            className={classes.icon}
            onClick={() =>
              manageDeleteProject(
                user,
                item.name,
                projectIndex,
                setSelectedProject,
                setReloadSidebar
              )
            }
          >
            <DeleteIcon
              className={classes.icon}
              style={{ color: "var(--error)" }}
            />
          </IconButton>
        </AccordionSummary>

        <SidebarDetail item={item} projectIndex={projectIndex} />

        <Divider className="dividerItem" />
        <AccordionActions>
          <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
            Agregar Arquitectura
          </Button>
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
  icon: {
    color: "var(--primaryDark)",
    paddingRight: 0,
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    width: "1.5rem",
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
