import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import HotelCard from "../hotel-card/hotel-card";
import styles from './slide-hotel.module.scss';
import {Hotel} from '../hotel-card/hotel-card';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


interface SlideHotelsProps {
  hotels: Hotel[];
}

const SlideHotels: React.FC<SlideHotelsProps> = ({ hotels = [] }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const maxSteps = Math.ceil(hotels.length / 4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleMouseEnter = () => {
    setAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1, flexDirection: 'column' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents={autoPlay}
        interval={10000}
        autoplay={false}
      >
        {[...Array(maxSteps)].map((_, index) => (
          <div key={`slide-${index}`} className={styles.centerContainer}>
            {hotels.slice(index * 4, (index + 1) * 4).map((hotel, hotelIndex) => (
              <div key={`hotel-${index}-${hotelIndex}`} className={styles.hotelCard}>
                <HotelCard
                  name={hotel.name}
                  image={hotel.image}
                  description={hotel.description}
                  average_stars={hotel.average_stars}
                  hygiene_star={hotel.hygiene_star}
                  safety_star={hotel.safety_star}
                  transportation_star={hotel.transportation_star}
                  city={hotel.city}
                  country={hotel.country}
                />
              </div>
            ))}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{display:"flex", justifyItems:"center",}}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default SlideHotels;