import React from "react";


const Header = ({busqueda, filtrarUsuario}) => {
  return (
    <div className="header">
      <div className="hero">
        <h1>Web de Usuarios</h1>
      </div>
      <div className="buscador">
      <h2>Buscar usuarios</h2>
      <input
          type="text"
          placeholder="Buscar usuario..."
          onChange={filtrarUsuario}
          value={busqueda}
        />
    </div>
      </div>
  );
};

export default Header;
