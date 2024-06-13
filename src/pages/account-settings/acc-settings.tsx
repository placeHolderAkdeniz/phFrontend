import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import styles from './acc-settings.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [updatedFields, setUpdatedFields] = useState<Partial<User>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (user) {
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

    setUpdatedFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://phbackend-m3r9.onrender.com/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
        setSnackbarMessage('User data updated successfully!');
        setSnackbarSeverity('success');
        // Güncellenen veriyi AuthContext'e geri yazmak istiyorsanız:
        // updateUser({...userData, ...updatedFields});
      } else {
        setSnackbarMessage('Failed to update user data.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
    }

    setOpenSnackbar(true);
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://phbackend-m3r9.onrender.com/users', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        setSnackbarMessage('Account deleted successfully.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      
        logout(); // Kullanıcıyı oturumu kapat
      } else {
        setSnackbarMessage('Failed to delete account.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }

    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.content}>
        <h2>Account Settings</h2>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600 }}>
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
        </Box>
        <div className={styles.buttons}>
        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
        <Button onClick={handleOpenDialog} variant="contained" color="error">
          Delete Account
        </Button>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountSettings;
