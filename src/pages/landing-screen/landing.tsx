import React from 'react';
import styles from "./landing.module.scss";
import {TopBar} from '../../components/top-bar/top-bar';
import {SearchBar} from '../../components/search-bar/search-bar';
import SlideHotels from '../../components/slide-hotels/slide-hotels';
import {Footer}  from '../../components/footer/footer';

const MostRecommended = [
  {
    hotels: [
      {
        name: "Hotel 1",
        image: "src/assets/images/hotel.png",
        description: "Description for Hotel 1",
        likes: 15,
        comments: 3,
      },
      {
        name: "Hotel 2",
        image: "src/assets/images/hotel.png",
        description: "Description for Hotel 2",
        likes: 20,
        comments: 2,
      },
      {
        name: "Hotel 3",
        image: "src/assets/images/hotel.png",
        description: "Description for Hotel 3",
        likes: 5,
        comments: 5,
      },
      {
        name: "Hotel 4",
        image: "src/assets/images/hotel.png",
        description: "Description for Hotel 4",
        likes: 12,
        comments: 1,
      },
      {
        name: "Hotel 5",
        image: "src/assets/images/hotel.png",
        description: "Description for Hotel 5",
        likes: 3,
        comments: 14,
      },
    ],
  },
];

function Landing() {
  return (
    <div className={styles.container}>
      <TopBar/>
      <div className={styles.content}>
        <SearchBar/>
        <div className={styles.middle}>
        <h1>Featured Hotels</h1>
        <SlideHotels slides={MostRecommended} />
        <h1>Nearby Hotels</h1>
        <SlideHotels slides={MostRecommended} />
        </div>
        
      </div>
      <div className={styles.footer}>
          <Footer/>
      </div>
    </div>
  );
}

export default Landing;
