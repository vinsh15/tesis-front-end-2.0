import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import SidebarItem from "../SidebarItem/SidebarItem";
import LoginButton from "../LoginButton/LoginButton";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";
import Loader from "../Loader/Loader";

/** Componente que representa la barra lateral de navegación */

const drawerWidth = "35%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#18202C",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#18202C",
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#18202C",
    padding: theme.spacing(3),
  },
  title: {
    margin: 'auto',
    textAlign: 'center',
    width: "95%",
    color: 'white',
    letterSpacing: 1
}
}));

function Sidebar(props) {
  const classes = useStyles();

  function Logged(items) {
    
    return (
      <List>      
        {items.map((item,index) => {
          return <SidebarItem key={item.proyecto.id} item={item} index={index} />;
        })}
      </List>
    );
  }

  function unLogged() {
    return (
      <div className={classes.title}>
        <h1>Iniciar sesión</h1>
        <LoginButton login={props.login} />
      </div>
    );
  }


  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        
        { props.user ? Logged(props.items)  
        : unLogged()}
        
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array,
};

export default Sidebar;
