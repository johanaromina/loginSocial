import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Systems = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar el estado de inicio de sesión
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(userLoggedIn === 'true');
    };

    checkLoginStatus();

    // Obtener las cotizaciones de activos si el usuario está logueado
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
      }
    };

    if (!isLoggedIn) {
      navigate('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    } else {
      fetchQuotes();
    }
  }, [isLoggedIn, navigate]); // Se agregan las dependencias 'isLoggedIn' y 'navigate'

  return (
    <div>
      <h2>Cotizaciones de Activos</h2>
      <ul>
        {Object.entries(quotes).map(([asset, quote]) => (
          <li key={asset}>
            <strong>{asset}</strong>: 
            <ul>
              <li>Ask: {quote.ask}</li>
              <li>Bid: {quote.bid}</li>
              <li>Moneda: {quote.currency}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Systems;

