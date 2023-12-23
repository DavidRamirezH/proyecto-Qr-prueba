import { Conciertos } from "./peticiones";
import { storage } from "./conexion";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Almacenar imágenes
const DataImg = async (formulario, setFormulario) => {
  try {
    const bannerRef = ref(storage, `banners/${formulario.fecha} ${formulario.nombreConcierto}`);
    const mapaRef = ref(storage, `mapas/${formulario.fecha} ${formulario.nombreConcierto}`);

    // Subir la imagen del banner a Firebase Storage
    await uploadBytes(bannerRef, formulario.fotoBanner, {
      contentType: formulario.fotoBanner.type,
    });

    // Subir la imagen del mapa a Firebase Storage
    await uploadBytes(mapaRef, formulario.mapaDelLugar, {
      contentType: formulario.mapaDelLugar.type,
    });

    // Obtener las URLs de descarga de las imágenes
    const bannerDownloadURL = await getDownloadURL(bannerRef);
    const mapaDownloadURL = await getDownloadURL(mapaRef);

    // Asignar las URLs de descarga al formulario
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      fotoBanner: bannerDownloadURL,
      mapaDelLugar: mapaDownloadURL,
    }));

    // Lógica adicional si es necesario antes de llamar a Conciertos
    // ...

    // Luego, puedes realizar la lógica para almacenar otros datos, como conciertos, si es necesario
    await Conciertos({
      ...formulario,
      fotoBanner: bannerDownloadURL,
      mapaDelLugar: mapaDownloadURL,
    }, formulario.nombreConcierto);

    console.log("Imágenes subidas exitosamente");
  } catch (error) {
    console.error("Error al subir las imágenes o realizar otras operaciones:", error.message);
    // Puedes agregar más lógica para manejar el error según tus necesidades
  }
};

export { DataImg };
