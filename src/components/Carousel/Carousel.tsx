import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { CarouselProps } from '../../types/content';
import styles from './Carousel.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Carousel = ({ data, category = 'Gallery' }: CarouselProps) => {
  return (
    <div className={styles.carouselContainer} role="region" aria-label={`${category} carousel`}>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className={styles.swiper}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className={styles.image}
              />
            </div>
            <div className={styles.caption}>
              <h3 className={styles.title}>{item.title}</h3>
              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

