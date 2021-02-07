import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import SidebarDetail from '../SidebarDetail/SidebarDetail';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/** Componente que representa el item
 *  a ser añadido en el componente Sidebar
 */

const useStyles = makeStyles({
  root: {
    width: "95%",
    margin: 'auto',
    marginBottom: '15px'
  },
});

function SidebarItem(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id={props.item.proyecto.id}
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={props.item.proyecto.name}
          />
        </AccordionSummary>
        <SidebarDetail item={props.item.proyecto}/>
      </Accordion>
    </div>
  );
}

export default SidebarItem;
