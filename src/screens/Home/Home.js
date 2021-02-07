import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar';

const dummydata = ["Grafo 1", "Grafo 2", "Grafo 3"];

/** Componente que representa la página 
 *  principal de navegación
 */
function Home() {
    const [drawerItems, setDrawerItems] = React.useState(dummydata);

    return (
        <>
            <Sidebar items={drawerItems}/>
            <h1>Home Page</h1>
        </>
    );
}

export default Home;
