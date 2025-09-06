import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const isAuthenticated = !!localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="left-group">
          <div className="brand">VendoorApp</div>
          <Link to="/" className="inicio-link">Inicio</Link>
          <Link to="/comprar" className="nav-link">Mis reservas</Link>
          <Link to="/vender" className="nav-link">Vender</Link>
        </div>

        <div className="right-group">
          {isAuthenticated ? (
            <>
              <Link to="/perfil" className="welcome-message">Hola, {username}</Link>
              <button onClick={handleLogout} className="logout-button">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-button">Iniciar Sesión</Link>
              <Link to="/register" className="auth-button register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
