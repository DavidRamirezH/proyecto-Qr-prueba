// EditarConcierto.js
import React, { useEffect, useState } from "react";
import { db, storage } from "../../components/conexion/conexion";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import "./EliminarConcierto.css"; // No olvides crear el archivo CSS correspondiente si es necesario

const EliminarConcierto = () => {
  const [conciertos, setConciertos] = useState([]);

  useEffect(() => {
    obtenerDatosConciertos();
  }, []);

  const obtenerDatosConciertos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "conciertos"));
      const conciertosArray = [];

      querySnapshot.forEach((doc) => {
        conciertosArray.push({ id: doc.id, ...doc.data() });
      });

      setConciertos(conciertosArray);
    } catch (error) {
      console.error("Error al obtener los conciertos: ", error);
    }
  };

  const eliminarConcierto = async (id, fotoBannerURL, mapaDelLugarURL) => {
    try {
      const confirmarEliminacion = window.confirm("¿Seguro que quieres eliminar este concierto?");
      if (!confirmarEliminacion) {
        return;
      }

      // Eliminar el concierto de Firestore
      await deleteDoc(doc(db, "conciertos", id));

      // Eliminar las imágenes asociadas del almacenamiento de Firebase
      await eliminarImagenStorage(fotoBannerURL);
      await eliminarImagenStorage(mapaDelLugarURL);

      obtenerDatosConciertos();
    } catch (error) {
      console.error("Error al eliminar el concierto: ", error);
    }
  };

  const eliminarImagenStorage = async (imagenURL) => {
    try {
      // Eliminar la imagen del almacenamiento de Firebase
      const imagenRef = ref(storage, imagenURL);
      await deleteObject(imagenRef);

      console.log("Imagen eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la imagen: ", error);
    }
  };

  return (
    <div className="editar-concierto-container">
      <h2>Eliminar Conciertos:</h2>
      <div className="contenedor-card">
      {conciertos.map((concierto) => (
        <div key={concierto.id} className="concierto-card">
          <img src={concierto.fotoBanner} alt="" />
          <h3>{concierto.nombreConcierto}</h3>
          <p><b>Fecha:</b> {concierto.fecha} <br /> <b>Hora: </b>{concierto.hora} </p>
          {/* Agrega más campos según la estructura de tu documento en Firestore */}
          <button onClick={() => eliminarConcierto(concierto.id, concierto.fotoBanner, concierto.mapaDelLugar)}>
            Eliminar Concierto
          </button>
        </div>
      ))}
      {conciertos.length === 0 && (
        <p>No hay conciertos actualmente.</p>
      )}
      </div>
    </div>
  );
};

export default EliminarConcierto;
