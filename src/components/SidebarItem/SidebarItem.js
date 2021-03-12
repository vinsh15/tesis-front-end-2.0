import React, { useState } from "react";
import "./SidebarItem.css";

import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "../FileReader/FileReader";
import SidebarDetail from "../SidebarDetail/SidebarDetail";
import Typography from "@material-ui/core/Typography";


/** Componente que representa el item proyecto
 *  a ser añadido en el componente Sidebar
 */
const SidebarItem = ({
  item,
  projectIndex
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          id={item.name}
        >
          <Typography>{item.name}</Typography>
        </AccordionSummary>

        <SidebarDetail 
          item={item} 
          projectIndex={projectIndex}
        />
        
        <Divider className="dividerItem"/>
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
            type={'Arquitectura'}
          />
        ) : null}
    </div>
  );
}

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles({
  root: {
    width: "95%",
    margin: "auto",
    marginBottom: "15px",
  },
  accordion: {
    backgroundColor: 'var(--background)'
  } 
});

export default SidebarItem;
