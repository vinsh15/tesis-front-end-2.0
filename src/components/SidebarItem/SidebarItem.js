import React, { useState, useContext } from "react";
import AppContext from "../../auth/context/context";
import "./SidebarItem.css";

import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "../FileReader/FileReader";
import SidebarDetail from "../SidebarDetail/SidebarDetail";
import Typography from "@material-ui/core/Typography";

import Menu from "../Menu/Menu";

/** Componente que representa el item proyecto
 *  a ser añadido en el componente Sidebar
 */
const SidebarItem = ({ item, projectIndex }) => {
  const classes = useStyles();
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
        </AccordionSummary>
        <SidebarDetail item={item} projectIndex={projectIndex} />
        <AccordionActions>
          <Menu item={item} projectIndex={projectIndex} setOpen={setOpen} />
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
