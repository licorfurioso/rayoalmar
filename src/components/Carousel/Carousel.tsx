import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { CarouselProps } from '../../types/content';
import { SkeletonImage } from '../SkeletonImage/SkeletonImage';
import styles from './Carousel.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Carousel = ({ data, category = 'Gallery' }: CarouselProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageUrl));
  };

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
              {!loadedImages.has(item.imageUrl) && (
                <SkeletonImage className={styles.skeleton} />
              )}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className={`${styles.image} ${loadedImages.has(item.imageUrl) ? styles.loaded : styles.loading}`}
                onLoad={() => handleImageLoad(item.imageUrl)}
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

