import React, { useContext } from 'react';
import Sidebar from '../../components/SideBar/Sidebar';

import AuthContext from "../../auth/context/context";
import googleAuth from "../../firebase/googleAuth";

const dummydata = [
    {
      proyecto: {
        id: "proyecto1Id",
        name: "Proyecto 1",
        arquitecturas: [
          {
            
              id: "arquitectura1Id",
              name: "Arquitectura 1",
              elements:{
                  nodes: [{id:"nodo1"}],
                  edges: [{id:"edge1"}],
              
              } 
          },
          {
            
              id: "arquitectura2Id",
              name: "Arquitectura 1",
              elements:{
                  nodes: [{id:"nodo1"}],
                  edges: [{id:"edge1"}],
              
              } 
          }
        ]
      }
    }
  ];
  

/** Componente que representa la página
 *  principal de navegación
 */
function Home() {
  const [drawerItems, setDrawerItems] = React.useState(dummydata);
  const [user, setUsuario] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    /**
     * Hacer inicio de sesión
     */
    const login = async () => {
        await googleAuth(setUser);
    }

    /**
     * Cerrar sesión
     */
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

  async function changeState() {
    console.log(dummydata);
    setUsuario(true);
  }

  return (
    <>
      <Sidebar items={drawerItems} user={user} state={changeState} />
      {user ? <h1 style={{ marginLeft: "40%" }}>Home Page</h1> : null}
    </>
  );
}

export default Home;
