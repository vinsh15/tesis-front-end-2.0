import React from 'react';
import './Loader.css'

/** Componente que representa el loader de carga */
const Loader = () => {
    return (
    <div className="loading show">
        <div className="spin"></div>
    </div>
    );
}

export default Loader;