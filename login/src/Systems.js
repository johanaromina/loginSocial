import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout'; // Importa el componente MainLayout

const Systems = () => {
  const location = useLocation();
  const { currentUser } = location.state || {};
  
  console.log('Usuario actual en Systems:', currentUser);  
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si currentUser está definido antes de cargar los datos
    if (currentUser) {
      const fetchQuotes = async () => {
        try {
          console.log('Realizando solicitud a la API...');
          const response = await fetch('https://api.saldo.com.ar/json/rates/banco');
          if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos de la API:', data);
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
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  console.log('Usuario actual:', currentUser); // Agregar este console.log para verificar currentUser
  console.log('Cotizaciones:', quotes);
  console.log('Error:', error);

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
            <p>A Systems</p>
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
