import React, { useEffect, useState } from 'react';
import styles from './filtration.module.scss';
import { TopBar } from '../../components/top-bar/top-bar';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Footer } from '../../components/footer/footer';
import Pagination from '@mui/material/Pagination';


// Arayüz tanımı
interface Hotel {
  id: string;
  name: string;
  image: string;
  description: string;
  average_stars: number;
  comments: number;
}

interface Room {
  _id: string;
  hotel: {
    _id: string;
    hotel_name: string;
    city: string;
  };
  price: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

const Filtration: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);





  const handleSearch = (criteria: { city: string; checkInDate: string; checkOutDate: string; personCount: number }) => {
    
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <TopBar />
      </div>
      <div className={styles.content}>
        <SearchBar onSearch={handleSearch} />
        
        
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Filtration;
