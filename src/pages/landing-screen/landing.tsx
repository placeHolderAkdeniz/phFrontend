import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory yerine useNavigate kullanalım
import styles from './landing.module.scss';
import { TopBar } from '../../components/top-bar/top-bar';
import { SearchBar } from '../../components/search-bar/search-bar';
import SlideHotels from '../../components/slide-hotels/slide-hotels';
import { Footer } from '../../components/footer/footer';
import {Hotel} from '../../components/hotel-card/hotel-card';



const Landing: React.FC = () => {
  const [top_hotels, setTopHotels] = useState<Hotel[]>([]);
  const [safety_hotels, setSafetyHotels] = useState<Hotel[]>([]);
  const [hygienic_hotels, setHygienicHotels] = useState<Hotel[]>([]);
  const [reachable_hotels, setReachableHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://phbackend-m3r9.onrender.com/hotels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any[] = await response.json();
        console.log('Fetched hotels:', data);

        const fetchedHotels: Hotel[] = data.map((hotel: any) => ({
          name: hotel.hotel_name,
          image: hotel.image || 'default.jpg',
          description: hotel.hotel_desc,
          average_stars: hotel.average_star || 0,
          hygiene_star: hotel.hygiene_star,
          safety_star: hotel.safety_star,
          transportation_star: hotel.transportation_star,
          city: hotel.city,
          country: hotel.country
        }));

        const top_hotels = fetchedHotels
          .sort((a: Hotel, b: Hotel) => b.average_stars - a.average_stars)
          .slice(0, 8);
        console.log('Top hotels:', top_hotels);
        const safety_hotels = fetchedHotels
          .sort((a: Hotel, b: Hotel) => b.average_stars - a.average_stars)
          .slice(0, 8);
        console.log('Top safety hotels:', safety_hotels);
        const hygienic_hotels = fetchedHotels
          .sort((a: Hotel, b: Hotel) => b.average_stars - a.average_stars)
          .slice(0, 8);
        console.log('Top hygenic hotels:', hygienic_hotels);
        const reachable_hotels = fetchedHotels
          .sort((a: Hotel, b: Hotel) => b.average_stars - a.average_stars)
          .slice(0, 8);
        console.log('Top reachable hotels:', reachable_hotels);

        setTopHotels(top_hotels);
        setSafetyHotels(safety_hotels);
        setHygienicHotels(hygienic_hotels);
        setReachableHotels(reachable_hotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (criteria: { city: string; checkInDate: string; checkOutDate: string; personCount: number }) => {
    localStorage.setItem('searchCriteria', JSON.stringify(criteria));
    navigate(`/filtration?location=${encodeURIComponent(criteria.city)}&checkInDate=${criteria.checkInDate}&checkOutDate=${criteria.checkOutDate}&people=${criteria.personCount}`);
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
        <SearchBar onSearch={handleSearch} />
        <div className={styles.middle}>
          <h3>Featured Hotels</h3>
          <SlideHotels hotels={top_hotels} />
          <h3>Most Hygienic</h3>
          <SlideHotels hotels={hygienic_hotels} />
          <h3>Most Trusted</h3>
          <SlideHotels hotels={safety_hotels} />
          <h3>Easiest to reach</h3>
          <SlideHotels hotels={reachable_hotels} />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
