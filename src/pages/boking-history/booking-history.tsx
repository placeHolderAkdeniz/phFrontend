import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import styles from './booking-history.module.scss';
import BookCard, { Booking } from '@/components/booking-card/booking-card';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

const BookingHistory = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://phbackend-9rp2.onrender.com/users/my-bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.content}>
        <h2>Booking History</h2>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box className={styles.bookings}>
            {bookings.map((booking) => (
              <BookCard key={booking._id} booking={booking} />
            ))}
          </Box>
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default BookingHistory;
