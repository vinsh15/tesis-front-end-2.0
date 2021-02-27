import React from "react";
import "./SidebarItem.css";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import Modal from "../FileReader/FileReader";
import SidebarDetail from "../SidebarDetail/SidebarDetail";

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

/** Componente que representa el item proyecto
 *  a ser añadido en el componente Sidebar
 */
function SidebarItem(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          id={props.item.name}
        >
          <Typography>{props.item.name}</Typography>
        </AccordionSummary>

        <SidebarDetail item={props.item} setItem={props.setItem}/>
        
        <Divider className="dividerItem"/>
        <AccordionActions>
          <Button size="small" variant="outlined" onClick={handleOpen}>
            Agregar arquitectura
          </Button>
        </AccordionActions>
      </Accordion>
      {open ? <Modal open={open} onClose={handleClose} /> : null}
    </div>
  );
}

export default SidebarItem;
