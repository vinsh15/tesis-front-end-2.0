import React, { useContext, useState, useEffect } from "react";
import './Home.css';

import Sidebar from "../../components/SideBar/Sidebar";

import Swal from "sweetalert2";

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
    Swal.fire({
      text: '¿Seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--success)',
      cancelButtonColor: 'var(--error)',
      confirmButtonText: 'Si, seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoad(true);
        localStorage.removeItem("user");
        setUser(null);
        setLoad(false);
      }
      
    })
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
    setLoad(false);
    console.log(elements, "Elements");
  };

  /**
   * Llamar a la actualizacion de proyectos
   */
  async function get() {
    getProject();
  }

  useEffect(() => {
    if (user) {
      setLoad(true);
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
