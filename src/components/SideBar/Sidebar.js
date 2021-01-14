import React from 'react';
import PropTypes from "prop-types";
import { Drawer, ListItem, ListItemText, List } from "@material-ui/core";

/** Componente que representa la barra lateral de navegación */
function Sidebar({ items }) {
    return (
        <Drawer
            anchor="right"
            variant="permanent"
        >
            <List>
                {
                    items.map((text, index) => {
                        return (
                            <ListItem button key={index}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Drawer>
    );
}

Sidebar.propTypes ={
    items: PropTypes.array
}

export default Sidebar;
