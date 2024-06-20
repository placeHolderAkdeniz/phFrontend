import React from 'react';
import styles from './room-card.module.scss';

export interface Rooms {
  _id: string;
  hotel: {
    _id: string;
    hotel_name: string;
    city: string;
  };
  image: string[];
  price: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

interface RoomCardProps {
  room: Rooms;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardClass}>
        <img className={styles.media} src={room.image[0]} alt={room.hotel.hotel_name} />
        <div className={styles.content}>
          <h3>{room.hotel.hotel_name}</h3>
          <p>City: {room.hotel.city}</p>
          <p>Price: ${room.price}</p>
          <p>Capacity: {room.capacity} person(s)</p>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
