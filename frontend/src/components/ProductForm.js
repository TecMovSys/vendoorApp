// src/components/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    whatsapp: '',
  });

  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si el token existe al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access'); // Corregido: 'access', no 'token'

    if (!token) {
      setMessage('❌ Debes iniciar sesión para publicar un producto.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/productos/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Producto publicado exitosamente.');
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        whatsapp: '',
      });
    } catch (error) {
      console.error('Error al publicar el producto:', error);
      setMessage('❌ Error al publicar el producto.');
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">📦 Publicar producto</h2>

      {!isAuthenticated ? (
        <p className="form-message error">❌ Debes iniciar sesión para publicar un producto.</p>
      ) : (
        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Cantidad disponible"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="Número de WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <button type="submit">Publicar producto</button>
        </form>
      )}

      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default ProductForm;
