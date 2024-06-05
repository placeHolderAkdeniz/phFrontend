import React from 'react';
import { Footer } from '@/components/footer/footer';
import { TopBar } from '@/components/top-bar/top-bar';
import styles from './hotel-page.module.scss';
import { Tabs, Tab } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import InfoIcon from '@mui/icons-material/Info';

export default function HotelPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    };
  return (
    <div className={styles.container}>
      <TopBar/>
      <div className={styles.content}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<PreviewIcon />} label="Overview" />
            <Tab icon={<InfoIcon />} label="Information" />
            <Tab icon={<RoomServiceIcon />} label="Services" />
        </Tabs>
        
      </div>
      <div className={styles.footer} >
          <Footer/>
      </div>
    </div>
  )
}
