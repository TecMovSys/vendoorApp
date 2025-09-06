import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';

function Perfil() {
  const [perfil, setPerfil] = useState({
    username: '',
    email: '',
    nombre_negocio: '',
    descripcion: '',
    rubro: '',
    provincia: '',
    canton: '',
    horario: '',
    contacto: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (!token) {
      setMensaje('⚠️ Debes iniciar sesión para acceder al perfil.');
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    axios.get('http://localhost:8000/api/accounts/perfil/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const data = res.data;
      setPerfil({
        username: data.username || '',
        email: data.email || '',
        nombre_negocio: data.nombre_negocio || '',
        descripcion: data.descripcion || '',
        rubro: data.rubro || '',
        provincia: data.provincia || '',
        canton: data.canton || '',
        horario: data.horario || '',
        contacto: data.contacto || ''
      });
    })
    .catch(err => {
      console.error('Error al obtener el perfil:', err);
      if (err.response?.status === 401) {
        setMensaje('❌ No autorizado. Tu sesión puede haber expirado.');
        setIsAuthenticated(false);
      } else {
        setMensaje('⚠️ No se pudo cargar el perfil. Puede que aún no esté creado.');
      }
    });
  }, [token]);

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMensaje('❌ No tienes permiso para hacer cambios.');
      return;
    }

    const payload = {
      nombre_negocio: perfil.nombre_negocio,
      descripcion: perfil.descripcion,
      rubro: perfil.rubro,
      provincia: perfil.provincia,
      canton: perfil.canton,
      horario: perfil.horario,
      contacto: perfil.contacto
    };

    try {
      await axios.put('http://localhost:8000/api/accounts/perfil/', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('✅ Perfil actualizado correctamente.');
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await axios.post('http://localhost:8000/api/accounts/perfil/', payload, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMensaje('✅ Perfil creado correctamente.');
        } catch (postErr) {
          console.error('Error al crear el perfil:', postErr);
          setMensaje('❌ Error al crear el perfil.');
        }
      } else {
        console.error('Error al actualizar el perfil:', err);
        setMensaje('❌ Error al actualizar el perfil.');
      }
    }
  };

  return (
    <div className="perfil-container">
      <h2>🧾 Mi Perfil de Negocio</h2>

      {!isAuthenticated ? (
        <p className="mensaje error">{mensaje}</p>
      ) : (
        <form onSubmit={handleSubmit} className="perfil-form">
          <label>👤 Usuario</label>
          <input type="text" name="username" value={perfil.username} disabled />

          <label>📧 Email</label>
          <input type="text" name="email" value={perfil.email} disabled />

          <label>🏪 Nombre del negocio</label>
          <input type="text" name="nombre_negocio" value={perfil.nombre_negocio} onChange={handleChange} />

          <label>📄 Descripción</label>
          <textarea name="descripcion" value={perfil.descripcion} onChange={handleChange}></textarea>

          <label>📂 Rubro</label>
          <input type="text" name="rubro" value={perfil.rubro} onChange={handleChange} />

          <label>🌍 Provincia</label>
          <input type="text" name="provincia" value={perfil.provincia} onChange={handleChange} />

          <label>🏙️ Cantón</label>
          <input type="text" name="canton" value={perfil.canton} onChange={handleChange} />

          <label>🕒 Horario</label>
          <input type="text" name="horario" value={perfil.horario} onChange={handleChange} />

          <label>📞 Teléfono / WhatsApp</label>
          <input type="text" name="contacto" value={perfil.contacto} onChange={handleChange} />

          <button type="submit">💾 Guardar cambios</button>
        </form>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Perfil;
