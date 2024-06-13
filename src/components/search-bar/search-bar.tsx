import React, { useEffect, useState } from 'react';
import styles from './search-bar.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DatePicker from '../date-picker/date-picker';

interface SearchBarProps {
  onSearch: (criteria: { city: string; checkInDate: string; checkOutDate: string; personCount: number }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [locations, setLocations] = useState<{ city: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<{ city: string } | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [personCount, setPersonCount] = useState<number>(1);
  const [priceValue, setPriceValue] = useState<number>(1);

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
    if (selectedCity && checkInDate && checkOutDate && personCount &&priceValue) {
      onSearch({
        city: selectedCity.city,
        checkInDate,
        checkOutDate,
        personCount,
      });
    } else {
      alert('Please fill in all search criteria.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Autocomplete
            options={locations}
            getOptionLabel={(option) => option.city}
            onChange={(event, value) => setSelectedCity(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                placeholder="Choose city"
              />
            )}
            style={{ width: 300 }}
          />
        </div>
        <div className={styles.mid}>
          <DatePicker/>
        </div>
        <div className={styles.right}>
          <TextField
            id="people-number"
            label="# of people"
            type="number"
            variant="outlined"
            value={personCount}
            onChange={(e) => setPersonCount(parseInt(e.target.value) || 1)}
          />
          <TextField
            id="price"
            label="Price $"
            type="number"
            variant="outlined"
            value={priceValue}
            onChange={(e) => setPriceValue(parseInt(e.target.value) || 1)}
          />
          <button onClick={handleSearchClick}>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
