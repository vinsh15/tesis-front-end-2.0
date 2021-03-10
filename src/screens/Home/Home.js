import React, { useContext, useState, useEffect } from "react";
import './Home.css';

import Sidebar from "../../components/SideBar/Sidebar";

import Swal from "sweetalert2";

import AppContext from "../../auth/context/context";
import { googleAuth } from "../../firebase/googleAuth";
import { postLogin } from "../../api/login/login";


/** Componente que representa la página
 *  principal de navegación
 */
function Home() {
  const [drawerItems, setDrawerItems] = useState();
  const [item, setItem] = useState();
  const [load, setLoad] = useState(true);
  const { user, setUser } = useContext(AppContext);
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
    let elements = await postLogin(user, setUser);
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
    if (user) {
      setLoad(true);
      get();
    }
  }, [user]);


  const setProject = (itemSelected) => {   
    setItem(itemSelected)
  }

  //useEffect(() => {
    //console.log(item, "selected!!!")
  //}, [item]);

  return (
    <>
      <Sidebar
        item={item}
        items={drawerItems}
        setItem={setProject}
        user={user}
        login={changeState}
        logout={logout}
        loader={load}
      />
      {item ? <h1 style={{ marginLeft: "40%" }}>{item}</h1> : null}
    </>
  );
}

export default Home;
