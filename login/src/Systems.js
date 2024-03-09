import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import './Systems.css';

const Systems = () => {
  const location = useLocation();
  const { currentUser } = location.state || {};
  
  const [quotes, setQuotes] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchQuotes = async () => {
        try {
          console.log('Realizando solicitud a la API...');
          const response = await fetch('https://api.saldo.com.ar/json/rates/banco');
          if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos de la API:', data);
            setQuotes(data); // Actualiza el estado quotes con los datos recibidos
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
  
  console.log('Quotes:', quotes);
  console.log('Error:', error);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <MainLayout currentUser={currentUser} onLogout={handleLogout}>
      <div className="systems-container">
        <h1>Bienvenido</h1>
        {currentUser && (
          <div>
            <p>{`Bienvenido, ${currentUser}`}</p>
          </div>
        )}
        {Object.keys(quotes).length > 0 ? (
          <div>
            <h2 className="systems-heading">Cotizaciones de Activos</h2>
            <ul className="systems-list">
              {Object.entries(quotes).map(([key, value]) => (
                <li key={key} className="systems-list-item">
                  {key}: {value.ask} / {value.bid} {value.currency}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay cotizaciones disponibles.</p>
        )}
        {error && <p className="error-message">{error}</p>}
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </MainLayout>
  );
};
  
export default Systems;


