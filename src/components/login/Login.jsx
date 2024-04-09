import React, { useState} from 'react';
// import { datos } from '../../config/conexion/peticiones';
import { registroUser } from '../conexion/users';
import { singIn } from '../conexion/users';
import "./login.css"
import cerrar from "../../assets/svg/cerrar.svg";

export default function Login(){
    const [formulario, setFormulario] = useState({
        // Define la estructura de tu formulario aquí
        email: '',
        password: ''
      });
      const handleInputChange = (e) => {
        setFormulario({
          ...formulario,
          [e.target.name]: e.target.value
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // datos(formulario); // Llama a la función datos con el formulario actual
        singIn(formulario.email, formulario.password)

      };

      // login
      const [loginVisible, setLoginVisible]= useState(true)

      const MostrarLogin = () =>{
        if(loginVisible){
          setLoginVisible(false)
        }else{
          setLoginVisible(true)
        }
      }

      // formulario
      const [visible, setVisible]= useState(false)

      const menuRegistro = () =>{
        if(visible){
          setVisible(false)
        }else{
          setVisible(true)
        }
      }
      const [formularioRegistro, setFormularioRegistro] = useState({
        nombre: '',
        apellido: '',
        email: '',
        tipoDocumento: '', // Cambiado a un campo de selección
        numeroDocumento: '',
        telefono: '',
        prefijoTelefono: '', // Cambiado a un campo de selección
        fechaNacimiento: '', // Cambiado a un campo de fecha
        contraseña: '',
        rol:"user",
      });
    
      const handleInputChangeRegistro = (e) => {
        setFormularioRegistro({
          ...formularioRegistro,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleGuardarRegistro = (e) => {
        e.preventDefault();
        registroUser(formularioRegistro)
        // Puedes agregar la lógica para guardar los datos aquí, por ejemplo, llamando a una función de registro
        // registro(formulario);
      };

      return (
        <>
        <div className='cont-login'>
          <h3 className='mostrar-modal' onClick={MostrarLogin}>Ingresar</h3>
          <form onSubmit={handleSubmit} className={ loginVisible?`form-login` : "form-login mostrar-Login"}>
            <h2>Ingresa Tus Datos</h2>
            <label>
              Correo:
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={handleInputChange}
                placeholder=''
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={formulario.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <button className='btn-login' type="submit">Ingresar</button>
            <p type="butto" className='btn-registro' onClick={menuRegistro}>Registrarse</p>
          </form>
        </div>
          {/* registro */}

        <section className="fondo-registro" style={{display:`${visible ? "block" : "none"}`}}>
          <form className="cuadro-registro" onSubmit={handleGuardarRegistro}>
            <img className='btn-cerrar' src={cerrar} onClick={menuRegistro} alt="" />
            <h2>Crear nueva cuenta</h2>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={formularioRegistro.nombre}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Apellido:
              <input
                type="text"
                name="apellido"
                value={formularioRegistro.apellido}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formularioRegistro.email}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Contraseña:
              <input
                type="password"
                name="contraseña"
                value={formularioRegistro.contraseña}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Tipo de Documento:
              <select
                name="tipoDocumento"
                value={formularioRegistro.tipoDocumento}
                onChange={handleInputChangeRegistro}
                required
              >
                <option value="" disabled>Seleccionar</option>
                <option value="NIT">Cedula de Identidad</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </label>
            <br />
            <label>
              Número de Documento:
              <input
                type="text"
                name="numeroDocumento"
                value={formularioRegistro.numeroDocumento}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Teléfono:
              <input
                type="text"
                name="telefono"
                value={formularioRegistro.telefono}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <label>
              Fecha de Nacimiento:
              <input
                type="date"
                name="fechaNacimiento"
                value={formularioRegistro.fechaNacimiento}
                onChange={handleInputChangeRegistro}
                required
              />
            </label>
            <br />
            <button className='btn-registro btn-envio-info' type="submit">Registrar usuario!</button>
          </form>
        </section>
        </>
    );
}