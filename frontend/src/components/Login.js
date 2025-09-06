import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        email,
        password,
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      // Opcional: si tu backend no devuelve username ni email, puedes quitar estas líneas
      if (response.data.username) {
        localStorage.setItem('username', response.data.username);
      }
      if (response.data.email) {
        localStorage.setItem('email', response.data.email);
      }

      setMessage('✅ ¡Inicio de sesión exitoso!');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage('❌ Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {message && <p className="login-message">{message}</p>}

      <p className="register-link">
        ¿No tienes cuenta? <Link to="/register">Crear una cuenta</Link>
      </p>
    </div>
  );
}

export default Login;

