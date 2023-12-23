import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import "./home.css";
import { Link } from "react-router-dom";
import { db } from "../../components/conexion/conexion";

export default function Home() {
  const [conciertos, setConciertos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const concertsPerPage = 10;
  const maxPageNumbersToShow = 5;

  useEffect(() => {
    datosConciertos();
  }, []);

  const datosConciertos = async () => {
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

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = conciertos.slice(indexOfFirstConcert, indexOfLastConcert);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 0);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(conciertos.length / concertsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const totalPages = Math.ceil(conciertos.length / concertsPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  return (
    <>
      {currentConcerts.map((concierto) => (
        <Link to={`/concierto/${concierto.id}`} key={concierto.id} className="banner-home">
          <img src={concierto.fotoBanner} alt="" />
          <div className="info-banner-home">
            <h2>{concierto.nombreConcierto}</h2>
            <h3>{concierto.fecha}</h3>
            <h4>{concierto.ubicacionConcierto}</h4>
          </div>
        </Link>
      ))}

      <div className="nav-conciertos">
        <button className="button" onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <button
            key={startPage + index}
            onClick={() => paginate(startPage + index)}
            className={currentPage === startPage + index ? "active index" : "index"}
          >
            {startPage + index}
          </button>
        ))}

        <button className="button" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
