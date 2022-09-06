import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";

const MiApi = () => {
  //* Estado de API de forma dinamico
  const [usuarioDinamico, setUsuarioDinamico] = useState([]);
  //* Estado de API de forma estatica
  const [usuarioEstatico, setUsuarioEstatico] = useState([]);
  //* Estado para controlar lo que uno va escribiendo en la busqueda
  const [busqueda, setBusqueda] = useState("");

  console.log(usuarioEstatico);

  //* Función asincrona para renderizar la API res de usuarioDinamico, utilizando el metodo fetch
  const usuariosRender = async () => {
    try {
      const endpoint = "https://reqres.in/api/users?page=1";
      const response = await fetch(endpoint);
      let {data} = await response.json();
      setUsuarioDinamico(data);
      //* usando un metodo sort para ordenar los usuarioDinamico de manera inversa
      setUsuarioEstatico(data.sort((x, y) => y.id - x.id));
    } catch (error) {
      alert(error.message);
    }
  };

  //* Función de useEffect
  useEffect(() => {
    console.log("API siendo mostrada en pantalla");
    usuariosRender();
  }, []);

  //* Funcion para filtrar 
  const filtrarUsuario = (e) => {
    let valor_input = e.target.value;
    setBusqueda(e.target.value);

    let filtrarBusqueda = usuarioEstatico.filter((usuario) => {
      return (
        usuario.first_name.toLowerCase().includes(valor_input.toLowerCase()) ||
        usuario.last_name.toLowerCase().includes(valor_input.toLowerCase())
      );
    });

    //* Aqui actualizamos el estado dinamico que logramos filtrar
    setUsuarioDinamico(filtrarBusqueda);
  };

  return (
    <div className="mi-api">
      <Header busqueda={busqueda} filtrarUsuario={filtrarUsuario} />
      <h2>Lista de Usuarios</h2>

        <section className="section">
          {usuarioDinamico.map((usuario) => {
            return (
              <div key={usuario.id} className="card">
                <img
                  src={usuario.avatar}
                  alt="imagen de usuario"
                  className="card_img"
                />
                <p>Nombre: {usuario.first_name}</p>
                <p>Apellido: {usuario.last_name}</p>
                <p>Email: {usuario.email}</p>
                <button>Ver más</button>
              </div>
            );
          })}
        </section>
    </div>
  );
};

export default MiApi;
