import React from "react";
import Slider from "react-slick";
import styles from "./slide-hotel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HotelCard from "../hotel-card/hotel-card";

type Slide = {
  hotels: { name: string; image: string; description: string; likes: number; comments: number; }[];
};

const SlideHotels: React.FC<{ slides: Slide[] }> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: slides.length > 1, // Sadece bir slayt yoksa sonsuz döngüyü devre dışı bırak
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div className={styles.sliderContainer} key={`slide-${index}`}>
          <div className={styles.slickSlider}>
            <div className={styles.slickList}>
              {slide.hotels.map((hotel, hotelIndex) => (
                <HotelCard
                  key={`hotel-${index}-${hotelIndex}`}
                  name={hotel.name}
                  image={hotel.image}
                  description={hotel.description}
                  likes={hotel.likes}
                  comments={hotel.comments}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SlideHotels;
