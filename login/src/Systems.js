import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from './MainLayout'; // Importa el componente MainLayout

const Systems = ({ currentUser }) => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://api.saldo.com.ar/json/rates/banco');
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error('Error al obtener las cotizaciones:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        setError('Error al obtener las cotizaciones. Por favor, inténtalo de nuevo.');
      }
    };

    fetchQuotes();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    // Utiliza MainLayout como contenedor alrededor del contenido específico de la página
    <MainLayout currentUser={currentUser} onLogout={handleLogout}>
      <div>
        <h1>Bienvenido</h1>
        {currentUser && (
          <div>
            <p>{`Bienvenido, ${currentUser}`}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
        {!currentUser && (
          <div>
            <p>Iniciar Sesión</p>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        )}
        {error && <p>{error}</p>}
        {quotes.length > 0 && (
          <div>
            <h2>Cotizaciones de Activos</h2>
            <ul>
              {quotes.map((quote, index) => (
                <li key={index}>
                  {quote.asset}: {quote.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Systems;

