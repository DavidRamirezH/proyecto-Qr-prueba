// app.js

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/footer/footer";
import Encabezado from "./components/encabezado/encabezado";
// actualizado
export default function App() {
  return(
    <BrowserRouter>
      <Encabezado></Encabezado>
      <Footer></Footer>
    </BrowserRouter>  
  )
}
