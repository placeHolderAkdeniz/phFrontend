import React from 'react';
import styles from './room-card.module.scss';

export interface Rooms {
  _id: string;
  title: string;
  price: number;
  adult: number;
  child: number;
  totalCapacity: number;
  doubleBed: number;
  singleBed: number;
  features: string[];
  image: string[];
  hotel: {
    _id: string;
    hotel_name: string;
    city: string;
  };
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
          <p>Title: {room.title}</p>
          <p>City: {room.hotel.city}</p>
          <p>Price: ${room.price}</p>
          <p>Adult: {room.adult}</p>
          <p>Child: {room.child}</p>
          <p>DoubleBed: {room.doubleBed}</p>
          <p>SingleBed: {room.singleBed}</p>
          <p>Capacity: {room.totalCapacity} person(s)</p>
          <div>
            <h4>Features:</h4>
            <ul>
              {room.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
