import { User, useAuth } from '@/AuthContext';
import React, { useEffect, useState } from 'react';
import styles from './ph-points.module.scss';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const PHPoint = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      console.log('Setting user data from AuthContext...');
      setUserData(user);
    }
  }, [user]);

  const getMembershipType = () => {
    return userData?.userType;
    
  };

  const membershipType = getMembershipType();

const membershipInfo: Record<string, { color: string; label: string }> = {
  silver: {
    color: '#C0C0C0',
    label: 'Silver Member',
  },
  gold: {
    color: '#FFD700',
    label: 'Gold Member',
  },
  emerald: {
    color: '#50C878',
    label: 'Emerald Member',
  },
};


  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.middle}>
        <h2>pH Point</h2>
        <Slider
                value={ 3}
                min={0}
                max={10}
                disabled
                sx={{ color: membershipInfo[userData.userType].color }}
              />
        <Box className={styles.cardContainer}>
          {['silver', 'gold', 'emerald'].map((type) => (
            <div
              key={type}
              className={`${styles.card} ${styles[type]} ${membershipType === type ? styles.active : ''}`}
            >
              <span></span>
              <div className={styles.content}>{membershipInfo[type].label}</div>
              
              <div className={styles.info}>
                {`You are a ${membershipType === type ? membershipInfo[type].label : ''}`}
              </div>
            </div>
          ))}
        </Box>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default PHPoint;
