import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AssetDetail = ({ asset }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <h2>{asset.name}</h2>
      <p>Symbol: {asset.symbol}</p>
      {!isCollapsed && (
        <div>
          <p>Precio: {asset.price}</p>
          {/* Mostrar más detalles del activo si es necesario */}
        </div>
      )}
      <button onClick={toggleCollapse}>
        {isCollapsed ? 'Expandir' : 'Colapsar'}
      </button>
      <Link to="/systems">Volver a la lista de activos</Link>
    </div>
  );
};

export default AssetDetail;


