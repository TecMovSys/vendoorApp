import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate
import './UserRegister.css';

function UserRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate(); // 👈 Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setIsSuccess(false);
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
        username,
        email,
        password,
        password2
      });

      setIsSuccess(true);
      setMessage('¡Usuario registrado con éxito! Redirigiendo...');

      // ✅ Esperar 1 segundo y redirigir a /login
      setTimeout(() => {
        navigate('/login');
      }, 1000);

      // Limpiar campos
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (error) {
      setIsSuccess(false);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const firstError = Object.values(errors)[0];
        setMessage(typeof firstError === 'string' ? firstError : firstError[0]);
      } else {
        setMessage('Error al registrar usuario');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombres "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && (
        <p className={isSuccess ? 'success' : 'error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default UserRegister;
