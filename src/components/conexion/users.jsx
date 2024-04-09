// login
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getIdToken, deleteUser} from "firebase/auth";
import { Auth } from "./conexion";
import { DatosUSer } from "./peticiones";

const registroUser = async (formulario)=>{
    createUserWithEmailAndPassword(Auth, formulario.email, formulario.contraseña)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const userID = user.uid
        console.log(userID);
        DatosUSer(formulario, userID)
        window.location.href = "/"
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
    });
}
// login
const singIn = async (email, password) => {
    let datos = false;
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("token", user.uid);
      console.log(user);
      window.location.href = "/"
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      datos = true;
  
      const mensajeDiv = document.getElementById("mensajeDiv");
      if (mensajeDiv) {
        mensajeDiv.innerHTML = `<p>usuario y/o contraseña invalidos</p>`;
        mensajeDiv.style.display = "block";
  
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
          mensajeDiv.style.display = "none";
        }, 3000);
      }
    }
  };



const eliminarUsuarioPorEmail = async (email, contraseña) => {
  try {
    await signInWithEmailAndPassword(Auth, email, contraseña);
    await deleteUser(Auth.currentUser);

    console.log("Usuario eliminado de la autenticación correctamente");
    return { success: true, message: "Usuario eliminado de la autenticación correctamente" };
  } catch (error) {
    console.error("Error al eliminar usuario de la autenticación: ", error);
    return { success: false, message: error.message };
  }
};  

export {registroUser , singIn, eliminarUsuarioPorEmail}
