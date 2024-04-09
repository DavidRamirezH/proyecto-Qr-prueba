import React, { useEffect, useState } from "react";
import Login from "../login/Login";
import Logo from "../logo/logo";
import "./encabezado.css";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Tickets from "../../pages/Tickets/tickets";
import Administrar from "../../pages/administrar/administrar";
import VistaConcierto from "../../pages/vistaConcierto/vistaConcierto";
import CrearPersonal from "../../pages/CrearPersonal/CrearUsuario";
import Personal from "../../pages/personal/personal";
import EliminarConcierto from "../../pages/ediar-concierto/EliminarConcierto";
import { InfoUser } from "../conexion/peticiones";

const Encabezado = (rol) => {
  console.log(rol);

  const [rolPerson,setRolPerson] = useState(rol)
  const [noLog, setNoLog] = useState(true);
  const [admin, setAdmin] = useState(true);
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // extraer si el roll de usuario
  useState(()=>{
    InfoUser()
  },[])
  // cambiar estado de rol
  if(rol){
    console.log(rol);
  }

  useEffect(() => {
    if (token) {
      setNoLog(false);
    } else {
      setNoLog(true);
    }
  }, [token]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const topMenu = () => {
    setMenuAbierto((prevMenuAbierto) => !prevMenuAbierto);
  };

  const handleCloseMenu = () => {
    setMenuAbierto(false);
  };

  const handleClick = async () => {
    setMostrarCarga(true);
    // Simular carga durante 5 segundos
    await new Promise((resolve) => setTimeout(resolve, 700));
    setMostrarCarga(false);

    // Desplazarse al top después de hacer clic en un enlace
    window.scrollTo({ top: 0 });

    // Cerrar el menú después de hacer clic en un enlace
    handleCloseMenu();
  };

  useEffect(() => {
    handleClick();
  }, [location.pathname]); // Solo actualiza cuando cambia la ruta

  return (
    <>
      {mostrarCarga && (
        <div className="mensaje-carga">
          <h2>Eventix</h2>
          <div className="rueda-carga"></div>
        </div>
      )}

      {noLog ? (
        <header className="login">
          <Logo></Logo>
          <Login></Login>
          <div className="mensaje" id="mensajeDiv"></div>
        </header>
      ) : (
        <header className="login">
          <Logo></Logo>
          <div className="nav-links">
            <Link to="/" onClick={handleClick}>
              Home
            </Link>
            <Link to="/Tickets" onClick={handleClick}>
              Mis entradas
            </Link>
            <Link to="/" onClick={handleClick}>
              Mi cuenta
            </Link>
            {admin ? (
              <div className="menu-container">
                <div className="menu-principal" onClick={toggleMenu}>
                  Administrar
                  <div className={`flecha ${menuAbierto ? "rotate" : ""}`}></div>
                </div>
                {menuAbierto && (
                  <ul className="menu-administrar">
                    <li>
                      <Link
                        to="/Administrar"
                        onClick={() => {
                          handleClick();
                          navigate("/Administrar");
                        }}
                      >
                        Nuevo Concierto
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/CrearPersonal"
                        onClick={() => {
                          handleClick();
                          navigate("/CrearPersonal");
                        }}
                      >
                        Crear Personal
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Eliminar Concierto"
                        onClick={() => {
                          handleClick();
                          navigate("/EliminarConcierto");
                        }}
                      >
                        Eliminar Conciertos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Personal"
                        onClick={() => {
                          handleClick();
                          navigate("/Personal");
                        }}
                      >
                        Personal de Eventix
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tickets" element={<Tickets />} />

        {/* admin */}
        <Route path="/concierto/:id" element={<VistaConcierto />} />

        {/* personal */}
        <Route path="/Administrar" element={<Administrar />} />
        <Route path="/CrearPersonal" element={<CrearPersonal />} />
        <Route path="/Personal" element={<Personal />} />
        <Route path="/Eliminar concierto" element={<EliminarConcierto />} />
      </Routes>
    </>
  );
};

export default Encabezado;
