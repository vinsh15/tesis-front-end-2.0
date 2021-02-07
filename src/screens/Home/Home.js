import React, { useContext } from 'react';
import Sidebar from '../../components/SideBar/Sidebar';

import AuthContext from "../../auth/context/context";
import googleAuth from "../../firebase/googleAuth";

const dummydata = ["Grafo 1", "Grafo 2", "Grafo 3"];

/** Componente que representa la página 
 *  principal de navegación
 */
function Home() {
    const [drawerItems, setDrawerItems] = React.useState(dummydata);
    const { user, setUser } = useContext(AuthContext);

    /**
     * Hacer inicio de sesión
     */
    const login = async () => {
        const projects = await googleAuth(setUser);
    }

    /**
     * Cerrar sesión
     */
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <>
            <Sidebar items={drawerItems}/>
            <h1 onClick={login}>Home Page</h1>
        </>
    );
}

export default Home;
