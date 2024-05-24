import React from 'react';
import { useAuth } from '../../AuthContext';

const Favorites = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Favorites</h1>
      {user ? (
        <div>
          <p>Welcome, {user.first_name} {user.last_name}!</p>
          <ul>
            {user.favorites.map((favorite: any) => (
              <li key={favorite._id}>{favorite.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to view your favorite items.</p>
      )}
    </div>
  );
};

export default Favorites;
