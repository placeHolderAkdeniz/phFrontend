import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../../AuthContext';

const AccountSettings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account Settings</h1>
      {/* <p>Name: {user.first_name} {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone_number}</p> */}
    </div>
  );
};

export default AccountSettings;
