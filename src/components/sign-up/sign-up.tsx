import * as React from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import styles from './sign-up.module.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#3acbe1',
  border: 'solid',
  p: 4,
};

export function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('https://phbackend-m3r9.onrender.com/users', {
        email: email,
        password: password
      });
      console.log(response);
            
      setSnackbarMessage("Sign up successful!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      handleClose();
    } catch (error) {
      setSnackbarMessage("Sign up failed. Please try again.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '400px',
            height: '400px',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '50px',
            backgroundColor: '#3acbe1',
            borderRadius: '10px',
            boxShadow: 'rgba(19, 147, 233, 0.788) 0 15px 30px -5px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <Box sx={{ width: '400px', marginBottom: '20px' }}>
            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ width: '400px', marginBottom: '20px' }}>
            <TextField 
              label="Password" 
              variant="outlined" 
              fullWidth 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ width: '400px', marginBottom: '20px' }}>
            <TextField 
              label="Confirm Password" 
              variant="outlined" 
              fullWidth 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          <div className={styles.bottom}>
          <button onClick={handleSignUp}> Sign Up</button>
          </div>
          
        </Box>
      </Modal>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
