import * as React from 'react';
import styles from "./hotel-card.module.scss";
import { Button } from 'semantic-ui-react'

interface HotelCardProps {
  name: string;
  image: string;
  description: string;
  likes:number;
  comments:number;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, image, description, likes, comments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardClass}>
        <img className={styles.media} src={image} alt={name} />
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <button>Like: {likes}</button>
          <button>Comment: {comments}</button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
