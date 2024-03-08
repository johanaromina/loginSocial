import React from 'react';


const MainLayout = ({ children, currentUser, onLogout }) => {
  return (
    <div style={styles.container}>
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
  },
  main: {
    flex: 1,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    borderLeft: '5px solid #4caf50', // Color verde
  },
};

export default MainLayout;
