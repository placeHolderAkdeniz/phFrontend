import React, { useEffect, useState } from 'react';
import styles from './search-bar.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, Paper } from '@mui/material';

interface SearchBarProps {
  onSearch: (criteria: { city: string; checkInDate: string; checkOutDate: string; personCount: number; price: number }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [locations, setLocations] = useState<{ city: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<{ city: string } | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [personCount, setPersonCount] = useState<number>(1);
  const [priceValue, setPriceValue] = useState<number>(1200);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://phbackend-m3r9.onrender.com/hotels');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: any[] = await response.json();

        const uniqueCities = Array.from(new Set(data.map(hotel => hotel.city)))
          .map(city => ({ city }));

        console.log("Fetched locations: ", uniqueCities);
        setLocations(uniqueCities);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearchClick = () => {
    if (selectedCity && checkInDate && checkOutDate && personCount && priceValue) {
      onSearch({
        city: selectedCity.city,
        checkInDate,
        checkOutDate,
        personCount,
        price: priceValue
      });
    } else {
      alert('Please fill in all search criteria.');
    }
  };

  return (
    <Box className={styles.container} sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid className={styles.content} container spacing={2}>

            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                options={locations}
                getOptionLabel={(option) => option.city}
                onChange={(event, value) => setSelectedCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    placeholder="Choose city"
                    fullWidth
                  />
                )}
              />
            </Grid>
          
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Check-In Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Check-Out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="# of People"
              value={personCount}
              onChange={(e) => setPersonCount(parseInt(e.target.value) || 1)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Price $"
              value={priceValue}
              onChange={(e) => setPriceValue(parseInt(e.target.value) || 1)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={styles.right}>
          <button  onClick={handleSearchClick}>
            <span>Search</span>
          </button>
          </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
