import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

/** Componente que representa la barra  de navegación */
const NavbarItem = ({
  icon,
  title,
  onClick
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        className={classes.button}
        startIcon={icon}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: "9rem",
    textTransform: "none !important",
    color: "var(--background) !important",
    border: "1px solid var(--background) !important",
    padding: "5px 10px !important",
    cursor: "pointer !important",
    margin: "5px",
  },
}));

export default NavbarItem;
