import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAddRoom = () => {
    // Add room logic
    console.log("Add room");
  };

  const handleAddHotel = () => {
    // Add hotel logic
    console.log("Add hotel");
  };

  const handleViewReservations = () => {
    // View reservations logic
    console.log("View reservations");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" fullWidth onClick={handleAddRoom}>
            Add Room
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" fullWidth onClick={handleAddHotel}>
            Add Hotel
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" fullWidth onClick={handleViewReservations}>
            View Reservations
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPanel;
