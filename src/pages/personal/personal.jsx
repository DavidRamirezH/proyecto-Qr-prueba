// Personal.js
import React, { useEffect, useState } from "react";
import { db , storage } from "../../components/conexion/conexion";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import "./personal.css";
import { eliminarUsuarioPorEmail } from "../../components/conexion/users";

const Personal = () => {
  const [empleados, setEmpleados] = useState({});
  const [expandedRoles, setExpandedRoles] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "personal de trabajo"));
      const empleadosArray = [];

      querySnapshot.forEach((doc) => {
        empleadosArray.push({ id: doc.id, ...doc.data() });
      });

      setEmpleados(agruparPorRol(empleadosArray));
    } catch (error) {
      console.error("Error al obtener los empleados: ", error);
    }
  };

  const agruparPorRol = (empleadosArray) => {
    const agrupados = {};

    // Agrupar empleados por rol
    empleadosArray.forEach((empleado) => {
      if (!agrupados[empleado.rol]) {
        agrupados[empleado.rol] = [];
      }
      agrupados[empleado.rol].push(empleado);
    });

    return agrupados;
  };

  const toggleRol = (rol) => {
    setExpandedRoles((prevRoles) =>
      prevRoles.includes(rol)
        ? prevRoles.filter((r) => r !== rol)
        : [...prevRoles, rol]
    );
  };

  const eliminarUsuario = async (id, email, contraseña, fotoURL) => {
    try {
      const confirmarEliminacion = window.confirm("¿Seguro que quieres eliminar este usuario?");
      if (!confirmarEliminacion) {
        return;
      }

      // Eliminar el usuario de Firestore
      await deleteDoc(doc(db, "personal de trabajo", id));

      // Eliminar la autenticación del usuario
      await eliminarUsuarioAutenticacion(email, contraseña);

      // Eliminar la imagen del personal en Firebase Storage
      await eliminarFotoPersonal(fotoURL);

      obtenerEmpleados();
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    }
  };

  const eliminarUsuarioAutenticacion = async (email, contraseña) => {
    try {
      // Suponiendo que ya has implementado eliminarUsuarioPorEmail en tu authModule
      await eliminarUsuarioPorEmail(email, contraseña);
      console.log("Usuario eliminado de la autenticación correctamente");
    } catch (error) {
      console.error("Error al eliminar la autenticación del usuario: ", error);
    }
  };

  const eliminarFotoPersonal = async (fotoURL) => {
    try {
      // Eliminar la imagen de Firebase Storage
      const fotoRef = ref(storage, fotoURL);
      await deleteObject(fotoRef);

      console.log("Imagen del personal eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la imagen del personal: ", error);
    }
  };

  return (
    <div className="personal-container">
    <h2>Personal de Trabajo:</h2>
    {Object.entries(empleados).map(([rol, empleadosPorRol]) => (
      <div key={rol} className="rol-card">
        <div className="rol-header" onClick={() => toggleRol(rol)}>
          <h2>{rol}</h2>
          <p className="numeros-empleados">Número de Empleados: {empleadosPorRol.length}</p>
          <button>{expandedRoles.includes(rol) ? "Contraer" : "Desplegar"}</button>
        </div>
        {expandedRoles.includes(rol) && (
          <div className="empleados-list">
            {empleadosPorRol.length > 0 ? (
              empleadosPorRol.map((empleado) => (
                <div key={empleado.id} className="empleado-card">
                  <img src={empleado.foto ?? ""} alt="" />
                  <p><b> Nombre: </b> {empleado.nombre ?? ''} {empleado.apellido ?? ''}</p>
                  <hr />
                  <p><b> Correo: </b> {empleado.email ?? ''}</p>
                  <hr />
                  <p><b> Teléfono: </b> {empleado.telefono ?? ''}</p>
                  <button onClick={() => eliminarUsuario(empleado.id, empleado.email, empleado.contraseña, empleado.foto)}>
                    Eliminar Usuario
                  </button>
                  {/* Agrega más campos según la estructura de tu documento en Firestore */}
                </div>
              ))
            ) : (
              <p>No hay empleados actualmente en este rol.</p>
            )}
          </div>
        )}
      </div>
    ))}
    {Object.keys(empleados).length === 0 && (
      <p>No hay empleados actualmente.</p>
    )}
  </div>
  );
};

export default Personal;
