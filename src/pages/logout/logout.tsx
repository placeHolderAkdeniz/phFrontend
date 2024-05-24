import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logout işlemlerini burada gerçekleştirin, ardından ana sayfaya yönlendirin
    // Örnek olarak, yerel depolamadan token'ı kaldırın ve yönlendirin
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
