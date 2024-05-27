import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';

const AccountSettings = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      console.log('Setting user data from AuthContext...');
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <STopBar/>
      <h1>Account Settings</h1>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.email}</p>
      <p>Sex: {userData.sex}</p>
      <p>Phone Number: {userData.phone_number}</p>
      <p>Date of Birth: {userData.dob}</p>
      <p>City: {userData.city}</p>
      <p>Country: {userData.country}</p>
    </div>
  );
};

export default AccountSettings;
