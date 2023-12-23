import React, { useState } from 'react';
import './administrar.css';
import { DataImg } from '../../components/conexion/almacenarImg';

export default function Administrar() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  const [formulario, setFormulario] = useState({
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

  const [fotoBannerPreview, setFotoBannerPreview] = useState(null);
  const [mapaDelLugarPreview, setMapaDelLugarPreview] = useState(null);

    const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Tratar saltos de línea y espaciados en la descripción
    const formattedValue = name === 'descripcion' ? value.replace(/\n/g, '<br />') : value;
  
    setFormulario({
      ...formulario,
      [name]: formattedValue,
    });
      

    if (name === 'fotoBanner') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFotoBannerPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFormulario({
          ...formulario,
          fotoBanner: file,
        });
      } else {
        setFotoBannerPreview(null);
      }
    }

    if (name === 'mapaDelLugar') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMapaDelLugarPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFormulario({
          ...formulario,
          mapaDelLugar: file,
        });
      } else {
        setMapaDelLugarPreview(null);
      }
    }
  };

  const handleZonaChange = (index, field, value) => {
    const nuevasZonas = [...formulario.zonas];
    nuevasZonas[index][field] = value;

    setFormulario({
      ...formulario,
      zonas: nuevasZonas,
    });
  };

  const agregarZona = () => {
    setFormulario({
      ...formulario,
      zonas: [...formulario.zonas, { nombre: '', precio: '', boletos: '' }],
    });
  };

  const eliminarZona = (index) => {
    const nuevasZonas = [...formulario.zonas];
    nuevasZonas.splice(index, 1);

    setFormulario({
      ...formulario,
      zonas: nuevasZonas,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    DataImg(formulario, setFormulario);
  };

  return (
    
    <section className="container">
     
      <h2 className="title">Administrar Concierto</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="fotoBanner" className="label">
            Foto o Imagen del Banner:
          </label>
          <input
            type="file"
            accept="image/*"
            name="fotoBanner"
            onChange={handleChange}
            className="input"
          />
          {fotoBannerPreview && (
            <div className="preview-container">
              <img
                src={fotoBannerPreview}
                alt="Preview Foto Banner"
                className="preview-image"
              />
              <div className="texto-superpuesto">
                <h2>{formulario.nombreConcierto}</h2>
                <p>{formulario.fecha}</p>
                <p>{formulario.ubicacionConcierto}</p>
              </div>
            </div>
          )}
          {!fotoBannerPreview && (
            <div className="preview-message">Vista de imagen previa</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="nombreConcierto" className="label">
            Nombre del Concierto:
          </label>
          <input
            type="text"
            name="nombreConcierto"
            value={formulario.nombreConcierto}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ubicacionConcierto" className="label">
            Ubicación del Concierto:
          </label>
          <input
            type="text"
            name="ubicacionConcierto"
            value={formulario.ubicacionConcierto}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha" className="label">
            Fecha:
          </label>
          <input
            type="date"
            name="fecha"
            value={formulario.fecha}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora" className="label">
            Hora:
          </label>
          <input
            type="time"
            name="hora"
            value={formulario.hora}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="boletos" className="label">
            Cantidad de Boletos
          </label>
          <input
            type="number"
            name="boletos"
            value={formulario.boletos}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion" className="label">
            Desripcion
          </label>
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            className="input textarea"
            cols="30" rows="10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mapaDelLugar" className="label">
            Mapa del lugar:
          </label>
          <input
            type="file"
            accept="image/*"
            name="mapaDelLugar"
            onChange={handleChange}
            className="input"
          />
          {mapaDelLugarPreview && (
            <div className="preview-container mapa">
              <img
                src={mapaDelLugarPreview}
                alt="Preview Mapa del Lugar"
                className="preview-image"
              />
            </div>
          )}
          {!mapaDelLugarPreview && (
            <div className="preview-message mapa">Vista de imagen previa</div>
          )}
        </div>

        <div className="form-group">
          <label className="label">Zonas del concierto:</label>
          <div className="zonas-container">
            {formulario.zonas.map((zona, index) => (
              <div key={index} className="zona-container">
                <input
                  type="text"
                  placeholder={`Zona ${index + 1}`}
                  value={zona.nombre}
                  onChange={(e) => handleZonaChange(index, 'nombre', e.target.value)}
                  className="input zona"
                />
                <input
                  type="text"
                  placeholder={`Precio ${index + 1}`}
                  value={zona.precio}
                  onChange={(e) => handleZonaChange(index, 'precio', e.target.value)}
                  className="input precio"
                />
                <input
                  type="number"
                  placeholder={`Boletos ${index + 1}`}
                  value={zona.boletos}
                  onChange={(e) => handleZonaChange(index, 'boletos', e.target.value)}
                  className="input boletos"
                />
                <button
                  type="button"
                  onClick={() => eliminarZona(index)}
                  className="button eliminar-zona"
                >
                  Eliminar Zona
                </button>
              </div>
            ))}
            <button type="button" onClick={agregarZona} className="button nueva-zona">
              Agregar Zona
            </button>
          </div>
        </div>

        <button type="submit" className="button nueva-zona">
          Enviar
        </button>
      </form>
    </section>
  );
}
