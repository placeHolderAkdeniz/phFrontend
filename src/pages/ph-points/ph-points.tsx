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
    label: 'Silver',
  },
  gold: {
    color: '#FFD700',
    label: 'Gold',
  },
  emerald: {
    color: '#50C878',
    label: 'Emerald',
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
                value={userData.userPoint}
                step={1}
                marks min={0}
                max={30}
                disabled
                sx={{ color: membershipInfo[userData.userType].color }}
              />
        <div className={styles.decl}>
          <h4>What is pH loyalty points?</h4>
          <p>Users with loyalty points wield greater influence over the star ratings of the places they review, thereby enhancing the credibility of their feedback. Our hotel booking app will accentuate user experiences by implementing a rating system tied to loyalty points for those who consistently engage with the platform. This system will showcase the reviews of these esteemed users in a dedicated section within hotel reviews, amplifying their impact on hotel star ratings. 
            By basing the rating system on loyalty points, we aim to bolster platform credibility by incentivizing users who actively share their experiences or have prior stays. Comments will undergo filtration within this framework to furnish users with more dependable information, thereby deterring fraudulent reviews. Consequently, fellow users seeking insights into hotels can make more informed decisions by placing greater trust in the authentic reviews of these distinguished users</p>
        </div>
        <Box className={styles.cardContainer}>
          {['silver', 'gold', 'emerald'].map((type) => (
            <div
              key={type}
              className={`${styles.card} ${styles[type]} ${membershipType === type ? styles.active : ''}`}
            >
              <span></span>
              <div className={styles.content}>{membershipInfo[type].label}</div>
              
              <div className={styles.info}>
                 {membershipType === type ? 'Your Member is '+ membershipInfo[type].label : ''}
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
