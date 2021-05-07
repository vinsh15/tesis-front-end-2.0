import React from "react";
import './NavbarItem.css'

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


/** 
 * Componente que representa un 
 * elemento del Navbar 
*/
const NavbarItem = ({
  icon,
  title,
  aria_controls,
  aria_haspopup,
  onClick
}) => {
  const classes = useStyles();

  return (
      <Button
        size="small"
        variant="outlined"
        aria-controls={aria_controls}
        aria-haspopup={aria_haspopup}
        className={classes.button}
        startIcon={icon}
        onClick={onClick}
      >
        <p className="buttonText">{title}</p>
      </Button>
  );
}

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none !important",
    color: "var(--background) !important",
    border: "1px solid var(--background) !important",
    padding: "5px 10px !important",
    cursor: "pointer !important",
    margin: "5px",
  },
}));

export default NavbarItem;
