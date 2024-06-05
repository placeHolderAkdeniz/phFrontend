import React from 'react';
import styles from "./hotel-card.module.scss";
import StarIcon from '@mui/icons-material/Star';

interface HotelCardProps {
  name: string;
  image: string;
  description: string;
  average_stars: number;
  comments: number;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, image, description, average_stars, comments }) => {
  const handleCommentsClick = () => {
    console.log('Yorum sayfasına yönlendiriliyor...');
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
          <button onClick={handleCommentsClick}>Comments: {comments}</button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;