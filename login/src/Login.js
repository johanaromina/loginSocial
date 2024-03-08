import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = async (e) => {
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
        // Inicio de sesión exitoso, redirigir al usuario a la página de activos
        navigate('/systems');
      } else {
        // Error en el inicio de sesión, mostrar mensaje de error
        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Iniciar Sesión</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="email" style={styles.label}>Correo Electrónico:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} style={styles.input} required />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>Contraseña:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} style={styles.input} required />
        </div>
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
};

export default Login;

