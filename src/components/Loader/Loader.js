import React from 'react';
import './Loader.css'

/** Componente que representa el loader */
function Loader(props) {
    return (
    <div className="loading show">
        <div className="spin"></div>
    </div>
    );
}

export default Loader;