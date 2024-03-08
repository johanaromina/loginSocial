import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
  const navStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '10px',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const welcomeTextStyle = {
    marginRight: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div style={navStyle}>
      <nav>
        <ul>
          <li>
            <Link to="/systems" style={linkStyle}>Systems</Link>
          </li>
          {/* Agrega más elementos de navegación según sea necesario */}
        </ul>
      </nav>
      {currentUser && (
        <div style={userInfoStyle}>
          <span style={welcomeTextStyle}>Bienvenido, {currentUser}</span>
          <button onClick={handleLogout} style={buttonStyle}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;


