import { useState } from 'react';
import type { ContentItem } from '../../types/content';
import { SkeletonImage } from '../SkeletonImage/SkeletonImage';
import styles from './Grid.module.css';

interface GridProps {
  data: ContentItem[];
  category?: string;
}

export const Grid = ({ data, category }: GridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string | number) => {
    setLoadedImages((prev) => new Set(prev).add(String(id)));
  };

  return (
    <div className={styles.grid} role="list" aria-label={`${category} gallery`}>
      {data.map((item) => (
        <div key={item.id} className={styles.gridItem} role="listitem">
          <div className={styles.imageWrapper}>
            {!loadedImages.has(String(item.id)) && <SkeletonImage />}
            <img
              src={item.imageUrl}
              alt={item.title}
              className={styles.image}
              loading="lazy"
              onLoad={() => handleImageLoad(item.id)}
              style={{
                display: loadedImages.has(String(item.id)) ? 'block' : 'none',
              }}
            />
          </div>
          {item.title && <h3 className={styles.title}>{item.title}</h3>}
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}
          {item.date && <time className={styles.date}>{item.date}</time>}
        </div>
      ))}
    </div>
  );
};

