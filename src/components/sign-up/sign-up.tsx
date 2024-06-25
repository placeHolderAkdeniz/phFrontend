import * as React from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, Checkbox, Tooltip, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import styles from './sign-up.module.scss';
import InfoIcon from '@mui/icons-material/Info';

export function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
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
      const response = await axios.post('https://phbackend-9rp2.onrender.com/users', {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        phone_number: phoneNumber,
        dob: dob,
        city: city,
        country: country,
        isAdmin: isAdmin,
      });

      console.log(response);

      setSnackbarMessage("Sign up successful!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setSex('');
      setPhoneNumber('');
      setDob('');
      setCity('');
      setCountry('');
      setIsAdmin(false);
      handleClose();
    } catch (error) {
      setSnackbarMessage("Sign up failed. Please try again.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
        <Box className={styles.modalContainer} 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width:'400px',
          height:'fit-content',
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

          <Box className={styles.formControl} sx={{gap:"10px"}} >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          
          <Box className={styles.formControl}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className={styles.formControl} sx={{gap:"10px"}}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton
              //       aria-label="toggle password visibility"
              //       onClick={handleClickShowPassword}
              //       onMouseDown={handleMouseDownPassword}
              //       edge="end"
              //     >
              //       {showPassword ? <VisibilityOff /> : <Visibility />}
              //     </IconButton>
              //   </InputAdornment>
              // }
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          
          <Box className={styles.formControl}>
            <TextField
              label="Sex"
              variant="outlined"
              fullWidth
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
          </Box>
          <Box className={styles.formControl}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Box className={styles.formControl}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Box>
          <Box className={styles.formControl} sx={{gap:"10px"}}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Box>
          
          <Box className={styles.formControl}>
            <div className={styles.admin}>
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <Typography variant="body1">
              Admin User
              <Tooltip title="If you select this option, you will have the ability to create and manage hotels.">
                <IconButton className={styles.infoIcon}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            
            </div>
            
          </Box>

          <div className={styles.bottom}>
            <Button onClick={handleSignUp}>Sign Up</Button>
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
