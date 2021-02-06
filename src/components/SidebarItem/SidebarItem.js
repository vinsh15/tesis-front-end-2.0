import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
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
          key={props.index}
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id={props.index}
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={props.item}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The click event of the nested action will propagate up and expand
            the accordion unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SidebarItem;
