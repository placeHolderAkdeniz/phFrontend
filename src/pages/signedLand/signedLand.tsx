import styles from './signedLand.module.scss'
import React, { useEffect, useState } from 'react';
import {STopBar} from '../../components/signed-in-compenents/s-top-bar/s-top-bar';
import {SearchBar} from '../../components/search-bar/search-bar';
import SlideHotels from '../../components/slide-hotels/slide-hotels';
import {Footer}  from '../../components/footer/footer';


interface Hotel {
  name: string;
  image: string;
  description: string;
  comments: number;
  average_stars: number;
}

const SignedLand: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          image: hotel.image.name , 
          description: hotel.hotel_desc,
          comments: hotel.comments.length,
          average_stars: hotel.average_star || 0
        }));

        const topHotels = fetchedHotels.sort((a: Hotel, b: Hotel) => b.average_stars - a.average_stars).slice(0, 8);
        console.log('Top hotels:', topHotels);

        setHotels(topHotels);
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className={styles.container}>
      <STopBar/>
      <div className={styles.content}>
        <SearchBar/>
        <div className={styles.middle}>
          <h1>Featured Hotels</h1>
          <SlideHotels hotels={hotels} />
          
        </div>
        
      </div>
      <div className={styles.footer} >
          <Footer/>
      </div>
    </div>
  )
}
export default SignedLand;
