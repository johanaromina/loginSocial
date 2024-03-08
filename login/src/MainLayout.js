// MainLayout.js
import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children, currentUser, onLogout }) => {
  return (
    <div>
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default MainLayout;
