// CrearPersonal.js
import React, { useState } from 'react';
import './CrearPersonal.css';
import { crearPersonal } from '../../components/conexion/crear-Personal';

export default function CrearPersonal() {
  const [formulario, setFormulario] = useState({
    foto: null,
    apellido: '',
    contraseña: '',
    email: '',
    fechaNacimiento: '',
    nombre: '',
    numeroDocumento: '',
    prefijoTelefono: '',
    rol: '',
    telefono: '',
    tipoDocumento: '',
  });

  const [loadingFoto, setLoadingFoto] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === 'foto' && files.length > 0) {
      const foto = files[0];
      setFormulario({
        ...formulario,
        [name]: foto,
      });

      setLoadingFoto(true);

      // Puedes agregar aquí lógica adicional, como subir la imagen al servidor
      // y actualizar el estado con la URL de la imagen después de la carga.
      // Aquí, se utiliza solo el objeto de imagen seleccionado localmente.
    } else {
      setFormulario({
        ...formulario,
        [name]: e.target.value,
      });
    }
  };

  const handleImageLoad = () => {
    setLoadingFoto(false);
  };

  const handleRemoveImage = () => {
    setFormulario({
      ...formulario,
      foto: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crearPersonal(formulario, setFormulario);

    // Agrega aquí la lógica para enviar los datos al servidor
  };

  return (
    <div className="crear-personal-container">
      <h2>Formulario de Creación de Personal</h2>
      <form className="crear-personal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          {loadingFoto && <div className="preloader">Cargando...</div>}
          <div className='contenedor-foto'>
            {formulario.foto && (
              <>
                <img
                  src={URL.createObjectURL(formulario.foto)}
                  alt="Foto de perfil"
                  className='foto-nuevo-personal'
                  onLoad={handleImageLoad}
                />
                <button type="button" onClick={handleRemoveImage}>
                  Eliminar Foto
                </button>
              </>
            )}
            {!formulario.foto && (
              <>
                <label htmlFor="foto-nuevo-usuario">Selecciona una foto</label>
                <input
                  type="file"
                  accept="image/*"
                  name="foto"
                  id='foto-nuevo-usuario'
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formulario.apellido}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formulario.contraseña}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formulario.fechaNacimiento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Número de Documento:</label>
          <input
            type="text"
            name="numeroDocumento"
            value={formulario.numeroDocumento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Prefijo de Teléfono:</label>
          <input
            type="text"
            name="prefijoTelefono"
            value={formulario.prefijoTelefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            value={formulario.rol}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Documento:</label>
          <input
            type="text"
            name="tipoDocumento"
            value={formulario.tipoDocumento}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
