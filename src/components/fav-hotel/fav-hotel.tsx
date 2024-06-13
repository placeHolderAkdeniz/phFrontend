import React from 'react';
import styles from "./fav-hotel.module.scss";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HotelCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  average_stars: number;
  onRemoveFavorite: (hotelId: string) => Promise<void>;
}

const FavoriteHotelCard: React.FC<HotelCardProps> = ({ id, name, image, description, average_stars, onRemoveFavorite }) => {
  

  const handleRemoveFavorite = async () => {
    await onRemoveFavorite(id);
  };

  const renderStars = (count: number) => {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <StarIcon key={index} style={{ color: '#FFD700' }} />
        ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardClass}>
        <img className={styles.media} src={"https://phbackend-m3r9.onrender.com/uploads/"+image} alt={name} />
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <div>{renderStars(Math.round(average_stars))}</div>
          <button className={styles.favoriteButton} onClick={handleRemoveFavorite}>
          <FavoriteIcon style={{ color: 'red' }} />
            </button>
        </div>
        
      </div>
    </div>
  );
}

export default FavoriteHotelCard;
