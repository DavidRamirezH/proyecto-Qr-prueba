import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/conexion/conexion";
import "./vistaConcierto.css";
import location from "../../assets/svg/location.svg";
import carShop from "../../assets/svg/carShop.svg";
import calendario from "../../assets/svg/calendario.svg";
import reloj from "../../assets/svg/reloj.svg";

const VistaConcierto = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({
    fotoBanner: null,
    nombreConcierto: '',
    ubicacionConcierto: '',
    fecha: '',
    hora: '',
    boletos: '',
    descripcion: '',
    mapaDelLugar: null,
    zonas: [],
  });

  const InfoConcierto = async (id) => {
    console.log(id);
    const docRef = doc(db, "conciertos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setInfo(docSnap.data());
      window.scrollTo({ top: 0 });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    InfoConcierto(id);
  }, [id]);

  return (
    <section>
    <img className="banner-concierto" src={info?.fotoBanner} alt="banner" />
    <div className="titulo">
      <h2>{info?.nombreConcierto}</h2>
    </div>
    <div className="info">
      <div>
        <h3><img src={location} alt="" /> {info?.ubicacionConcierto}</h3>
        <h3><img src={calendario} alt="" /> {info?.fecha}</h3>
        <h3><img src={reloj} alt="" /> {info?.hora}</h3>
      </div>
      <div>
        <button className="btn-comprar"><img src={carShop} alt="" /> ¡Comprar Ticket!</button>
      </div>
    </div>
    <hr className="hr" />
    <img className="mapa-lugar" src={info?.mapaDelLugar} alt="mapa de lugar" />
    <div className="descripcion-concierto" dangerouslySetInnerHTML={{ __html: info?.descripcion }} />
  </section>
  );
};

export default VistaConcierto;
