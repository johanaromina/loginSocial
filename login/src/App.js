import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Systems from './Systems';
import MainLayout from './MainLayout'; // Importa el componente MainLayout

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const checkAuthentication = () => {
        const userLoggedIn = localStorage.getItem('isLoggedIn');
        console.log('Valor de userLoggedIn:', userLoggedIn);
        setIsLoggedIn(userLoggedIn === 'true');
        console.log('Valor de isLoggedIn:', isLoggedIn);
      };
    
      checkAuthentication();
    }, [isLoggedIn]); // Elimina isLoggedIn del array de dependencias para que solo se ejecute una vez al montar el componente
  
    const handleLogout = () => {
      setCurrentUser(null);
      console.log('Valor de currentUser después del cierre de sesión:', currentUser); // Agrega esta línea para verificar currentUser
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    };
  
    return (
        <Router>
        {/* Envuelve todo en MainLayout */}
        <MainLayout currentUser={currentUser} onLogout={handleLogout}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/systems"
              element={isLoggedIn ? <Systems currentUser={currentUser} /> : <Navigate to="/login" />}
            />
          </Routes>
        </MainLayout>
      </Router>
      
    );
  };
  
  export default App;
  

