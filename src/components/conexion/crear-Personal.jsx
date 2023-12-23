// auth
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { Auth } from "./conexion";

// firestore
import { setDoc, doc } from "firebase/firestore";
import { db } from "./conexion";
import { storage } from "./conexion";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const crearPersonal = async (formulario) => {
  // Validar si el correo electrónico ya está registrado
  const signInMethods = await fetchSignInMethodsForEmail(Auth, formulario.email);

  if (signInMethods.length > 0) {
    // El correo electrónico ya está registrado
    console.error("El correo electrónico ya está registrado.");
    // Agrega lógica adicional o devuelve un mensaje de error según tus necesidades
    return {
      success: false,
      message: "El correo electrónico ya está registrado",
    };
  }

  try {
    // El correo electrónico no está registrado, proceder con la creación del usuario
    const userCredential = await createUserWithEmailAndPassword(Auth, formulario.email, formulario.contraseña);

    // Usuario registrado con éxito
    const user = userCredential.user;
    const userID = user.uid;

    // Obtener la URL de descarga de la imagen del personal
    const fotoDownloadURL = await personalImg(formulario, userID);

    // Registrar la información en Firestore
    await personalTrabajo({ ...formulario, foto: fotoDownloadURL }, userID);

    console.log("Usuario creado correctamente");
    return {
      success: true,
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Envío registro info
const personalTrabajo = async (formulario, userID) => {
  try {
    // Almacena todos los datos del formulario en Firestore
    const docRef = await setDoc(doc(db, "personal de trabajo", `${userID}`), formulario);

    location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Almacenar imágenes y obtener la URL de descarga
const personalImg = async (formulario, userID) => {
  try {
    const FotoPersonal = ref(storage, `personal-foto/${formulario.nombre} ${formulario.apellido}`);

    // Subir la imagen del personal a Firebase Storage
    await uploadBytes(FotoPersonal, formulario.foto, {
      contentType: formulario.foto.type,
    });

    // Obtener la URL de descarga de la imagen
    const fotoDownloadURL = await getDownloadURL(FotoPersonal);

    console.log("Imagen subida exitosamente:", fotoDownloadURL);

    return fotoDownloadURL;
  } catch (error) {
    console.error("Error al subir la imagen:", error.message);
    throw error;
  }
};

export { crearPersonal };
