import React from 'react';
import styles from "./hotel-card.module.scss";
import StarIcon from '@mui/icons-material/Star';

export interface Hotel {
  _id: string;
  name: string;
  image: string[];
  description: string;
  average_stars: number;
  hygiene_star: number;
  safety_star: number;
  transportation_star: number;
  city: string;
  country:string;
  onClick?: (id: string) => void;
}

const HotelCard: React.FC<Hotel> = ({ _id, name, image, description, average_stars, city, country, onClick }) => {

  const renderStars = (count: number) => {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <StarIcon key={index} style={{ color: '#FFD700' }} />
        ))}
      </>
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick(_id);
      
      localStorage.setItem('hotelId',_id);
      console.log("hotelcard id: ", _id, localStorage.getItem('hotelId'));
    }
  };

  return (
    <div className={styles.container} onClick={handleClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.cardClass}>
        <img className={styles.media} src={image[0]} alt={name} />
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <div>{renderStars(Math.round(average_stars))}</div>
          <div className={styles.location}>{city}/{country}</div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
