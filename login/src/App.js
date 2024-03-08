// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Systems from './Systems';
import Navbar from './Navbar';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={currentUser ? <Navbar currentUser={currentUser} onLogout={handleLogout} /> : null}
        />
        <Route
          path="/systems"
          element={currentUser ? <Systems /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
