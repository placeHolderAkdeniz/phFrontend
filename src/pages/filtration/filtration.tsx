import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './filtration.module.scss';
import RoomCard from '../../components/room-card/room-card';
import { Rooms } from '../../components/room-card/room-card';
import { TopBar } from '@/components/top-bar/top-bar';
import { Footer } from '@/components/footer/footer';
import { Slider, Checkbox, FormControlLabel } from '@mui/material';

const Filtration: React.FC = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      const params = new URLSearchParams(location.search);
      const city = params.get('city') || '';
      const checkInDate = params.get('checkInDate') || '';
      const checkOutDate = params.get('checkOutDate') || '';
      const adult = params.get('adult') || '1';
      const child = params.get('child') || '1';
      const priceMin = priceRange[0].toString();
      const priceMax = priceRange[1].toString();
      const features = selectedFeatures.join(',');

      try {
        const response = await fetch(`https://phbackend-m3r9.onrender.com/rooms/search-rooms?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&priceMax=${priceMax}&priceMin=${priceMin}&adult=${adult}&child=${child}&features=${features}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any[] = await response.json();
        console.log('Fetched filtered rooms:', data);

        const defaultImage = 'D:/phFrontend/src/assets/images/hotel.png';

        const filteredRooms: Rooms[] = data.map((room: any) => ({
          _id: room._id,
          title: room.title,
          adult: room.adult,
          child: room.child,
          doubleBed: room.doubleBed,
          singleBed: room.doubleBed,
          features: room.features,
          hotel: {
            _id: room.hotel._id,
            hotel_name: room.hotel.hotel_name,
            city: room.hotel.city,
          },
          image: room.image.length > 0 ? room.image : [defaultImage],
          price: room.price,
          totalCapacity: room.capacity,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        }));

        setRooms(filteredRooms);
      } catch (error) {
        console.error('Error fetching filtered rooms:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRooms();
  }, [location.search, priceRange, selectedFeatures]);

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const feature = event.target.name;
    setSelectedFeatures((prevFeatures) =>
      event.target.checked
        ? [...prevFeatures, feature]
        : prevFeatures.filter((f) => f !== feature)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <TopBar />
      </div>
      <div className={styles.content}>
        <h2>Search Results</h2>
          <div className={styles.main}>
            <div className={styles.filters}>
            <h3>Filters</h3>
              <div className={styles.slider}>
              
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  step={50}
                />
                <p>Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
              </div>
              <div className={styles.features}>
                <FormControlLabel
                  control={<Checkbox name="wifi" onChange={handleFeatureChange} />}
                  label="Wi-Fi"
                />
                <FormControlLabel
                  control={<Checkbox name="pool" onChange={handleFeatureChange} />}
                  label="Pool"
                />
                <FormControlLabel
                  control={<Checkbox name="breakfast" onChange={handleFeatureChange} />}
                  label="Breakfast"
                />
                <FormControlLabel
                  control={<Checkbox name="parking" onChange={handleFeatureChange} />}
                  label="Parking"
                />
              </div>
            </div>
            <div className={styles.results}>
              {rooms.length > 0 ? (
                rooms.map((room) => <RoomCard key={room._id} room={room} />)
              ) : (
                <div>No rooms found.</div>
              )}
            </div>
          </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Filtration;
