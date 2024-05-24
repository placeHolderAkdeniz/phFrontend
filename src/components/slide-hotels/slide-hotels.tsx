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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SlideHotels: React.FC<{ slides: { hotels: { name: string; image: string; description: string; likes: number; comments: number; }[] }[] }> = ({ slides }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const maxSteps = Math.ceil(slides.length / 4);

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
    <Box sx={{ maxWidth: "500", flexGrow: 1}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents={autoPlay}
        interval={10000}
        autoplay={autoPlay}
      >
        {[...Array(maxSteps)].map((_, index) => (
          <div key={`slide-${index}`} style={{ display: 'flex' }} className={styles.bir}>
            {slides.slice(index * 4, (index + 1) * 4).map((slide, slideIndex) => (
              <div key={`hotel-group-${index}-${slideIndex}`} style={{ flex: 1 }}>
                {slide.hotels.map((hotel, hotelIndex) => (
                  <div key={`hotel-${index}-${slideIndex}-${hotelIndex}`} style={{ marginBottom: 16 }}>
                    <HotelCard
                      name={hotel.name}
                      image={hotel.image}
                      description={hotel.description}
                      likes={hotel.likes}
                      comments={hotel.comments}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{ float: 'right' }}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{ float: 'left' }}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default SlideHotels;
