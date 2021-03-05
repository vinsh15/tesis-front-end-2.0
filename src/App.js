import React, { useEffect, useState } from "react";
import { GlobalStyle } from "./styles/Global";
import "./App.css";
import "./styles/Theme/variables.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home/Home";

import AuthContext from "./auth/context/context";

/** Componente que contiene todas las rutas
 *  de navegación en la aplicación
 */
function App() {
  const [user, setUser] = useState();
  const [selectedProject, setSelectedProject] = useState();
  /**
   * Restaurar usuario si ya se ha iniciado sesión
   */
  const restoreUser = () => {
    const tempUser = localStorage.getItem("user");
    if (tempUser) setUser(JSON.parse(tempUser));
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <>
      <GlobalStyle />
      <AuthContext.Provider value={{ user, setUser, selectedProject, setSelectedProject }}>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
