import * as React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        width:'400',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#3acbe1',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box sx={{ width: '300px', marginBottom: '20px' }}>
        <TextField label="Email" variant="outlined" fullWidth />
      </Box>
      <Box sx={{ width: '300px', marginBottom: '20px' }}>
        <TextField label="Password" variant="outlined" fullWidth type="password" />
      </Box>
      <Box sx={{ width: '300px', marginBottom: '20px' }}>
        <TextField label="Confirm Password" variant="outlined" fullWidth type="password" />
      </Box>
      <Button variant="contained" color="primary" sx={{ width: '300px' }}>
        Sign Up
      </Button>
    </Box>
      </Modal>
    </div>
  );
}
