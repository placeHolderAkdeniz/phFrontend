import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './filtration.module.scss';
import RoomCard from '../../components/room-card/room-card';
import { Rooms } from '../../components/room-card/room-card';
import { TopBar } from '@/components/top-bar/top-bar';
import { Footer } from '@/components/footer/footer';
import { Slider, Checkbox, FormControlLabel, Button } from '@mui/material';
import useFetch from '../../hooks/useFetch';

const Filtration: React.FC = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const featureOptions = [
    "wifi",
    "pool",
    "gym",
    "Mini Fridge",
    "Jacuzzi",
    "Balcony",
    "Room Service",
    "Mini Bar",
    "Parent Bathroom",
    "Terrace",
    "Bathroom with Bathtub",
    "Garden View",
  ];

  const createFetchUrl = () => {
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    const checkInDate = params.get('checkInDate');
    const checkOutDate = params.get('checkOutDate');
    const adult = params.get('adult');
    const child = params.get('child');
    const priceMin = priceRange[0].toString();
    const priceMax = priceRange[1].toString();
    const features = selectedFeatures.join(',');

    const query: { [key: string]: string } = {};
    if (city) query.city = city;
    if (checkInDate) query.checkInDate = checkInDate;
    if (checkOutDate) query.checkOutDate = checkOutDate;
    if (adult) query.adult = adult;
    if (child) query.child = child;
    query.priceMin = priceMin;
    query.priceMax = priceMax;
    if (features) query.features = features;

    const queryString = new URLSearchParams(query).toString();
    return `https://phbackend-9rp2.onrender.com/rooms/search-rooms?${queryString}`;
  };

  const [fetchUrl, setFetchUrl] = useState(createFetchUrl());
  const { data, loading, error } = useFetch(fetchUrl);

  useEffect(() => {
    if (data) {
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
          average_star: room.hotel.average_star,
        },
        image: room.image.length < 0 ? room.image : [defaultImage],
        price: room.price,
        totalCapacity: room.capacity,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      }));

      setRooms(filteredRooms);
    }
  }, [data]);

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

  const handleSearch = () => {
    const newFetchUrl = createFetchUrl();
    setFetchUrl(newFetchUrl);
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
            <h4>Features</h4>
              {featureOptions.map((feature) => (
                <FormControlLabel
                  key={feature}
                  control={<Checkbox name={feature} onChange={handleFeatureChange} />}
                  label={feature}
                />
              ))}
            </div>
            <button onClick={handleSearch} >
              Search
            </button>
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
