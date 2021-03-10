import React, { useContext, useState, useEffect } from "react";
import './Home.css';

import Sidebar from "../../components/SideBar/Sidebar";

import Swal from "sweetalert2";

import AppContext from "../../auth/context/context";
import { googleAuth, getProjects } from "../../firebase/googleAuth";


/** Componente que representa la página
 *  principal de navegación
 */
function Home() {
  const [drawerItems, setDrawerItems] = useState();
  const [load, setLoad] = useState(true);
  const { user, setUser, reloadSidebar, selectedProject, setSelectedProject } = useContext(AppContext);
  
  /**
   * Llamar a google auth para establecer ususario
   */
  const login = async () => {
    let drawer = await googleAuth(setUser);
    setDrawerItems(drawer);
    setLoad(false);
  };

  /**
   * Mensaje de confirmación para cerrar sesión
   */
  const logout = () => {
    Swal.fire({
      text: '¿Seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--success)',
      cancelButtonColor: 'var(--error)',
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedProject();
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
  };

  /**
   * Llamar a la actualizacion de proyectos
   */
  async function get() {
    getProject();
  }

  useEffect(() => {
    setLoad(false);
    if (user || reloadSidebar) {
      setLoad(true);
      get();
    }
  }, [user, reloadSidebar]);


  return (
    <>
      <Sidebar
        items={drawerItems}
        login={changeState}
        logout={logout}
        loader={load}
      />
      {selectedProject ? <h1 style={{ marginLeft: "40%" }}>{selectedProject.versionName}</h1> : null}
    </>
  );
}

export default Home;
