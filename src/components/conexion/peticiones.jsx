import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from './conexion';
import Encabezado from '../encabezado/encabezado';

// base de datos informacion de usuario
const DatosUSer = async (formulario, userID) => {
  try {
    const docRef = await setDoc(doc(db, "users", `${userID}`), formulario);
    localStorage.setItem("token", userID)
    console.log(docRef.toString());
  } catch (e) {
    console.error("Error adding document: ", e);
  }
} 
export { DatosUSer }

// mostrar infoUser
const InfoUser = async () => {
  const id = localStorage.getItem("token")

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("rol", docSnap.data().rol);
    // Cambié esta línea para no llamar directamente a Encabezado
    return docSnap.data().rol;
  } else {
    console.log("No such document!");
    return null;
  }
}

export { InfoUser }

// almacenamiento de conciertos
const Conciertos = async (formulario, nombreConcierto) => {
  try {
    const conciertoDocRef = doc(db, "conciertos", `${formulario.fecha} ${nombreConcierto}`);
    
    // Usar setDoc para crear o actualizar el documento
    await setDoc(conciertoDocRef, formulario);

    // Obtener el ID del documento
    const conciertoId = conciertoDocRef.id;

    if(conciertoId){
      window.location.href = "/"
    }    
    console.log("Documento creado/actualizado con éxito. ID:", conciertoId);
    // Puedes retornar el ID si es necesario
    return conciertoId;
  } catch (e) {
    console.error("Error al agregar/actualizar el documento: ", e);
    throw e; // Re-lanzar el error para manejarlo en el nivel superior si es necesario
  }
};

export { Conciertos };
