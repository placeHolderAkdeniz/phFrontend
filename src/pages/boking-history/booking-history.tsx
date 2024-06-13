import React, { useEffect, useState } from 'react';
import { useAuth, User } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import styles from './booking-history.module.scss';
import RoomCard from '@/components/room-card/room-card';

const BookingHistory = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);


  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.content}>
        <h2>Booking History</h2>
        <RoomCard/>
        
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      
    </div>
  );
};

export default BookingHistory;
