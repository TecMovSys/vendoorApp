import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { useLocation } from 'react-router-dom';

function ProductList({ showOnlyUserProducts = false, excludeUserProducts = false }) {
  const [productos, setProductos] = useState([]);
  const [profileVisible, setProfileVisible] = useState(false);
  const [sellerInfo, setSellerInfo] = useState(null);
  const location = useLocation();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('access');
  const isVenderPage = location.pathname === '/vender';

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(res => {
        let disponibles = res.data;

        if (showOnlyUserProducts && username) {
          disponibles = disponibles.filter(p => p.owner === username);
        }

        if (excludeUserProducts && username) {
          disponibles = disponibles.filter(p => p.owner !== username);
        }

        setProductos(disponibles);
      })
      .catch(err => console.error(err));
  }, [showOnlyUserProducts, excludeUserProducts, username]);

  // 🔧 BLOQUE ACTUALIZADO:
  const fetchSellerProfile = async (sellerId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/perfil/${sellerId}/`);

      setSellerInfo(res.data);
      setProfileVisible(true);
    } catch (error) {
      console.error('Error al obtener perfil del comerciante:', error);
    }
  };

  const toggleDisponibilidad = async (producto) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/productos/${producto.id}/`,
        { is_available: !producto.is_available },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductos(prev =>
        prev.map(p => (p.id === producto.id ? { ...p, is_available: !p.is_available } : p))
      );
    } catch (err) {
      console.error('Error al actualizar el estado del producto:', err);
    }
  };

  const closeProfile = () => {
    setProfileVisible(false);
    setSellerInfo(null);
  };

  return (
    <div className="product-list-wrapper">
      {productos.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No hay productos disponibles en esta sección.
        </p>
      ) : (
        <div className="product-list-container">
          {productos.map(producto => {
            const phone = producto.whatsapp?.replace(/\D/g, '');
            const waLink = phone
              ? `https://wa.me/${phone}?text=${encodeURIComponent(`Hola, estoy interesado en tu producto "${producto.name}"`)}`
              : null;

            return (
              <div key={producto.id} className="product-card">
                <div className="product-title">{producto.name}</div>
                <div className="product-description">{producto.description}</div>
                <div className="product-price">💰 ${producto.price}</div>
                <div className="product-quantity">📦 Cantidad: {producto.quantity}</div>
                <div className="product-availability">
                  Estado: {producto.is_available ? '🟢 Disponible' : '🔴 Vendido'}
                </div>
                <div className="product-owner">👤 Publicado por: {producto.owner}</div>

                {producto.perfil_negocio && (
                  <div className="business-profile">
                    <p><strong>🏪 Negocio:</strong> {producto.perfil_negocio.nombre_negocio}</p>
                    <p><strong>📍 Provincia:</strong> {producto.perfil_negocio.provincia}</p>
                    <p><strong>🕒 Horario:</strong> {producto.perfil_negocio.horario}</p>
                  </div>
                )}

                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button"
                  >
                    📲 WhatsApp
                  </a>
                )}

                {isVenderPage && producto.owner === username && (
                  <button
                    className={`toggle-availability-btn ${producto.is_available ? 'available' : 'sold'}`}
                    onClick={() => toggleDisponibilidad(producto)}
                  >
                    {producto.is_available ? '🛑 Marcar como Vendido' : '✅ Marcar como Disponible'}
                  </button>
                )}

                {/* Mostrar botón solo si owner_id existe */}
                {producto.owner_id && (
                  <button
                    className="profile-button"
                    onClick={() => fetchSellerProfile(producto.owner_id)}
                  >
                    ℹ️ Ver comerciante
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {profileVisible && sellerInfo && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeProfile}>X</button>
            <h2>Perfil del Comerciante</h2>
            <p><strong>Nombre:</strong> {sellerInfo.username}</p>
            <p><strong>Email:</strong> {sellerInfo.email}</p>
            {sellerInfo.perfil_negocio && (
              <>
                <p><strong>Negocio:</strong> {sellerInfo.perfil_negocio.nombre_negocio}</p>
                <p><strong>Descripción:</strong> {sellerInfo.perfil_negocio.descripcion}</p>
                <p><strong>Provincia:</strong> {sellerInfo.perfil_negocio.provincia}</p>
                <p><strong>Horario:</strong> {sellerInfo.perfil_negocio.horario}</p>
                <p><strong>Contacto:</strong> {sellerInfo.perfil_negocio.contacto}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
