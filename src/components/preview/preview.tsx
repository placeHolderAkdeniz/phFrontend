import * as React from 'react';
import { useState } from 'react';
import { Hotel } from '../hotel-card/hotel-card';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Divider,
  CardMedia,
} from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './preview.module.scss';
import useFetch from '@/hooks/useFetch';
import { SearchBar } from '../search-bar/search-bar';
import { useNavigate } from 'react-router-dom';

interface PreviewProps {
  hotel: Hotel;
}

const Preview: React.FC<PreviewProps> = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const renderStars = (count: number) => {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <StarIcon key={index} style={{ color: '#FFD700' }} />
        ))}
      </>
    );
  };

  const handleReservation = async () => {
    const token = localStorage.getItem('token');
    const hotel = localStorage.getItem('hotelId');
    const roomId =localStorage.getItem('roomId');

    if (!token) {
      setMessage('Please login to make a reservation.');
      return;
    }

    setLoading(true);
    setMessage('');

    const requestBody = {
      hotel,
      roomId,
      checkInDate,
      checkOutDate,
    };
    try {
      const response = await axios.post(
        'https://phbackend-9rp2.onrender.com/bookings',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Reservation created successfully.');
      } else {
        setMessage('Reservation failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during reservation:', err);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (criteria: { city: string; checkInDate: string; checkOutDate: string; adult: number; child: number }) => {
    // Arama kriterlerini URL parametrelerine ekleyerek Filtration sayfasına yönlendiriyoruz
    navigate(`/filtration?city=${encodeURIComponent(criteria.city)}&checkInDate=${criteria.checkInDate}&checkOutDate=${criteria.checkOutDate}&adult=${criteria.adult}&child=${criteria.child}`);
  };
  // Slick slider ayarları
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed:4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className={styles.container} sx={{ p: 3 }}>
        <Card sx={{borderRadius:"15px"}}>
          <Slider {...settings}>
            {hotel.image.map((imgSrc, index) => (
              <CardMedia
                key={index}
                component="img"
                height="500"
                image={imgSrc}
                alt={`${hotel.name} image ${index + 1}`}
              />
            ))}
          </Slider>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px', height:"fit-content"}}>
            <Typography variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {hotel.name} <div style={{ display: 'flex', alignItems: 'center' }}><LocationOnOutlinedIcon /> {hotel.city} / {hotel.country}</div>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {hotel.description}
            </Typography>
            <Divider textAlign="left"></Divider>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              Average Stars: {renderStars(Math.round(hotel.average_stars))}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              Hygiene: {renderStars(Math.round(hotel.hygiene_star))}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              Safety: {renderStars(Math.round(hotel.safety_star))}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              Transportation: {renderStars(Math.round(hotel.transportation_star))}
            </Typography>
          </CardContent>
        </Card>
      

      <Box mt={3} sx={{width:"100%"}}>
          <Typography variant="h6" component="div" gutterBottom>
            Search a Reservation
          </Typography>
          <SearchBar onSearch={handleSearch} />
            {message && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {message}
                </Typography>
              </Grid>
            )}
      </Box>
    </Box>
  );
};

export default Preview;
