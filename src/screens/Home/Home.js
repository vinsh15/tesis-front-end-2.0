import React, { useState } from 'react';
import Sidebar from '../../components/SideBar/Sidebar';

const dummydata = ["Grafo 1", "Grafo 2", "Grafo 3"];

/** Componente que representa la página 
 *  principal de navegación
 */
function Home() {
    const [drawerItems, setDrawerItems] = React.useState(dummydata);
    const [usuario, setUsuario] = useState(false);
  
    async function prueba() {
      console.log("usuario true");
      setUsuario(true);
    }
  

    return (
        <>
            <Sidebar items={drawerItems} user="false" />
            <h1>Home Page</h1>
        </>
    );
}

export default Home;
