import React, { useContext, useState, useEffect } from "react";

import Sidebar from "../../components/SideBar/Sidebar";

import AuthContext from "../../auth/context/context";
import { googleAuth, getProjects } from "../../firebase/googleAuth";


/** Componente que representa la página
 *  principal de navegación
 */
function Home() {
  const [drawerItems, setDrawerItems] = React.useState();
  const [load, setLoad] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  /**
   * Llamar a google auth para establecer ususario
   */
  const login = async () => {
    let drawer = await googleAuth(setUser);
    setDrawerItems(drawer);
    setLoad(false);
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /**
   * Cambiar estado de usuario e iniciar sesion
   */
  async function changeState() {
    login();
  }

  /**
   * Actualizar arreglo de proyectos
   */
  const getProject = async () => {
    let elements = await getProjects(user, setUser);
    setDrawerItems(elements);
    console.log(elements, "Elements");
  };

  /**
   * Llamar a la actualizacion de proyectos
   */
  async function get() {
    getProject();
  }

  useEffect(() => {
    setLoad(false);
    if (user) {
      get();
    }
  }, [user]);

  return (
    <>
      <Sidebar
        items={drawerItems}
        user={user}
        login={changeState}
        logout={logout}
        loader={load}
      />
      {user ? <h1 style={{ marginLeft: "40%" }}>Home Page</h1> : null}
    </>
  );
}

export default Home;
