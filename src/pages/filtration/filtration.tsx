import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './filtration.module.scss';
import RoomCard from '../../components/room-card/room-card';
import { Rooms } from '../../components/room-card/room-card';
import { TopBar } from '@/components/top-bar/top-bar';
import { Footer } from '@/components/footer/footer';

const Filtration: React.FC = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      const params = new URLSearchParams(location.search);
      const city = params.get('city') || '';
      const checkInDate = params.get('checkInDate') || '';
      const checkOutDate = params.get('checkOutDate') || '';
      const personCount = params.get('personCount') || '1';
      const price = params.get('price') || '1200';

      try {
        const response = await fetch(`https://phbackend-m3r9.onrender.com/rooms/search-rooms?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personCount=${personCount}&price=${price}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any[] = await response.json();
        console.log('Fetched filtered rooms:', data);
        console.log("search criteria", localStorage.getItem('searchCriteria'));

        const defaultImage = 'D:/phFrontend/src/assets/images/hotel.png';

        const filteredRooms: Rooms[] = data.map((room: any) => ({
          _id: room._id,
          hotel: {
            _id: room.hotel._id,
            hotel_name: room.hotel.hotel_name,
            city: room.hotel.city,
          },
          image: room.image.length > 0 ? room.image : [defaultImage],
          price: room.price,
          capacity: room.capacity,
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
  }, [location.search]);

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
        <div className={styles.results}>
          {rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <div>No rooms found.</div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Filtration;
