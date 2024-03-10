import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'; // Importar el método de inicio de sesión con Facebook
import firebaseApp from './firebaseConfig'; // Importar la configuración de Firebase

import { auth } from './firebaseConfig';
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
        localStorage.setItem('currentUser', email); // Guardar el usuario actual en localStorage
        console.log('Valor de email:', email); // Confirmar el valor de email en la consola
        navigate('/systems', { state: { currentUser: email } }); 
        console.log('Redirigiendo a /systems después del inicio de sesión exitoso');
        console.log('Valor de email en Login:', email); // Agregar este console.log para verificar email
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
      console.log('Iniciando sesión con Facebook...');
      console.log('Objeto firebaseApp:', firebaseApp); // Verificar el objeto firebaseApp
      console.log('Objeto auth:', auth); // Verificar el objeto auth
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Inicio de sesión exitoso:', result);
      navigate('/systems', { state: { currentUser: result.user.email } });
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      setError('Error al iniciar sesión con Facebook. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/payoneer-como-verificar-cuenta.png" alt="Logo" />
        </div>
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
        <button type="submit" className="submit-button">Iniciar sesión</button>
      </form>
      <button id="login-facebook-button" onClick={handleLoginWithFacebook}>Iniciar sesión con Facebook</button>
    </div>
    
    
  );
};

export default Login;
