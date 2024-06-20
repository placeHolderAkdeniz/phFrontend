import React from 'react';
import styles from './booking-card.module.scss';
import { Card, CardContent, Typography } from '@mui/material';
import {Hotel} from '../hotel-card/hotel-card';

export interface Booking {
  _id: string;
  room: {
    _id: string;
    hotel: string;
  };
  user: string;
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  updatedAt: string;
}

interface RoomCardProps {
  booking: Booking;
}

const BookCard: React.FC<RoomCardProps> = ({ booking }) => {
  const checkInDate = new Date(booking.checkInDate).toLocaleDateString();
  const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString();

  return (
    <Card className={styles.roomCard}>
      <CardContent>
        <Typography variant="h6">Booking ID: {booking._id}</Typography>
        <Typography variant="body1">Hotel ID: {booking.hotel.name}</Typography>
        <Typography variant="body1">Room ID: {booking.room._id}</Typography>
        <Typography variant="body1">Check-In: {checkInDate}</Typography>
        <Typography variant="body1">Check-Out: {checkOutDate}</Typography>
        <br />
        <Typography variant="body2" color="textSecondary">
          Created At: {new Date(booking.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
