import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button, Checkbox, Typography } from '@mui/material';
import styles from './sign-in.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

export function SignInModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false); 

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleSignIn = async () => {
    if (isSigningIn) { 
      return;
    }

    try {
      setIsSigningIn(true); 
      await login({ email, password });
      navigate('/signedLand');
    } catch (error) {
      console.error('Entry error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSigningIn(false); 
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Sign In</Button>
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
            width:'400px',
            height:'400px',
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
          <h2>Sign In</h2>
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
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <div className={styles.bottom}>
            <div className={styles.checkbox}>
                <Checkbox {...label} />
                <p>Remember Me!</p>
            </div>
            
            <Button sx={{backgroundImage: 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)', color:'white'}} onClick={handleSignIn}>Sign In</Button>
            <div className={styles.links}>
                <a href="">Forgot Password?</a>
                <div className={styles.right}>
                  <p>Dont have an account? </p> <a href="">Sign Up</a>
                </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
