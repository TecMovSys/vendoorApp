import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopProductos.css';

function TopProductos() {
  const [productos, setProductos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(res => {
        const sorted = res.data
          .filter(p => p.is_available)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setProductos(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productos.length) % productos.length);
  };

  if (productos.length === 0) return null;

  const producto = productos[currentIndex];
  const phone = producto.whatsapp?.replace(/\D/g, '');
  const waLink = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(`Hola, estoy interesado en tu producto "${producto.name}"`)}` : null;

  return (
    <div className="top-carousel-container">
      <h2>🌟 Recomendaciones en base a la calidad del vendedor</h2>

      <div className="carousel-card">
        <button onClick={prevSlide} className="carousel-button">⬅️</button>

        <div className="carousel-content">
          {/* VENDEDOR */}
          <div className="carousel-vendor">
            <h4>👤 {producto.owner}</h4>
            {producto.perfil_negocio && (
              <>
                <p><strong>🏪</strong> {producto.perfil_negocio.nombre_negocio}</p>
                <p><strong>📍</strong> {producto.perfil_negocio.provincia}</p>
                <p><strong>🕒</strong> {producto.perfil_negocio.horario}</p>
              </>
            )}
            {waLink && (
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                📲 Contactar por WhatsApp
              </a>
            )}
          </div>

          {/* PRODUCTO */}
          <div className="carousel-product">
            {/* Imagen futura */}
            <div className="product-image-placeholder">
              📷 Imagen del producto (próximamente)
            </div>

            <div className="product-info">
              <h3>{producto.name}</h3>
              <p>{producto.description}</p>
              <p><strong>💰</strong> ${producto.price}</p>
              <p><strong>📦</strong> Stock: {producto.quantity}</p>
            </div>
          </div>
        </div>

        <button onClick={nextSlide} className="carousel-button">➡️</button>
      </div>

      <div className="carousel-indicators">
        {productos.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default TopProductos;
