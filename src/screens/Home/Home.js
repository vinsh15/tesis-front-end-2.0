import React, { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";

const dummydata = ["Proyecto 1", "Proyecto 2", "Proyecto 3"];

/** Componente que representa la página
 *  principal de navegación
 */
function Home() {
  const [drawerItems, setDrawerItems] = React.useState(dummydata);
  const [user, setUsuario] = useState(false);

  async function changeState() {
    console.log("usuario true");
    setUsuario(true);
  }

  return (
    <>
      <Sidebar items={drawerItems} user={user} state={changeState} />
      {user ? <h1 style={{marginLeft: "40%",}}>Home Page</h1> : null}
    </>
  );
}

export default Home;
