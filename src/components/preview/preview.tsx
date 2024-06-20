import * as React from 'react';
import { useState } from 'react';
import { Hotel } from '../hotel-card/hotel-card';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import styles from './preview.module.scss';

interface PreviewProps {
  hotel: Hotel;
}

const Preview: React.FC<PreviewProps> = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [personCount, setPersonCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleReservation = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const hotelId = localStorage.getItem('hotelId');
      const response = await fetch('https://phbackend-m3r9.onrender.com/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hotelId,
          checkInDate,
          checkOutDate,
          personCount,
          price,
        }),
      });
      console.log(token);

      const result = await response.json();

      if (response.ok) {
        setMessage('Reservation created successfully.');
      } else {
        setMessage(result.message || 'Please Login for making reservation.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container} sx={{ p: 3 }}>
      <Paper elevation={3}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={hotel.image[0]}
            alt={`${hotel.name} image`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Hotel Name: {hotel.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Location: {hotel.city} / {hotel.country}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description: {hotel.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Average Stars: {hotel.average_stars}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Hygiene: {hotel.hygiene_star}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Safety: {hotel.safety_star}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Transportation: {hotel.transportation_star}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
      <Box mt={3}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Make a Reservation
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Check-In Date"
                InputLabelProps={{ shrink: true }}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Check-Out Date"
                InputLabelProps={{ shrink: true }}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Person Count"
                value={personCount}
                onChange={(e) => setPersonCount(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleReservation}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Reserve'}
              </Button>
            </Grid>
            {message && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {message}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Preview;
