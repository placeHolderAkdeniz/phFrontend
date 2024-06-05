import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import styles from './acc-settings.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    } as User));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user data logic
    console.log('User data saved:', userData);
  };

  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.content}>
        <h2>Account Settings</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600 }}>
          <TextField
            label="First Name"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Sex"
            name="sex"
            value={userData.sex}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Date of Birth"
            name="dob"
            value={userData.dob}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <button type='submit'><span>Save Changes</span></button>
        </Box>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default AccountSettings;
