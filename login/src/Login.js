import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.saldo.com.ar/bridge/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Actualizar el estado de isLoggedIn a true después del inicio de sesión exitoso
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/systems');
        console.log('Redirigiendo a /systems después del inicio de sesión exitoso');
      } else {
        const data = await response.json();
        setError(data.message || 'Credenciales inválidas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión con correo y contraseña:', error);
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      // Lógica para iniciar sesión con Facebook
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      setError('Error al iniciar sesión con Facebook. Por favor, inténtalo de nuevo.');
    }
  };

  const handleExploreWithoutLogin = () => {
    navigate('/systems');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleEmailPasswordLogin}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <button id="login-facebook-button" onClick={handleLoginWithFacebook}>Iniciar sesión con Facebook</button>
      <button id="explore-button" onClick={handleExploreWithoutLogin}>Explorar sin iniciar sesión</button>
    </div>
  );
};

export default Login;



