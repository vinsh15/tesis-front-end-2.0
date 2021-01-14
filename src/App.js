import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screens/Home/Home";
import './App.css';

/** Componente que contiene todas las rutas
 *  de navegación en la aplicación
 */
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
