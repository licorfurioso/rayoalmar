import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ContentItem } from '../../types/content';
import { SkeletonImage } from '../SkeletonImage/SkeletonImage';
import styles from './Grid.module.css';

interface GridProps {
  data: ContentItem[];
  category?: string;
}

export const Grid = ({ data, category }: GridProps) => {
  const { t } = useTranslation('content');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string | number) => {
    setLoadedImages((prev) => new Set(prev).add(String(id)));
  };

  return (
    <div className={styles.grid} role="list" aria-label={`${category} gallery`}>
      {data.map((item) => {
        // Get translated title and description, fallback to original if translation missing
        const translatedTitle = category ? t(`${category}.${item.id}.title`, item.title) : item.title;
        const translatedDescription = category ? t(`${category}.${item.id}.description`, item.description || '') : item.description;

        return (
          <div key={item.id} className={styles.gridItem} role="listitem">
            <div className={styles.imageWrapper}>
              {!loadedImages.has(String(item.id)) && <SkeletonImage />}
              <img
                src={item.imageUrl}
                alt={translatedTitle}
                className={styles.image}
                loading="lazy"
                onLoad={() => handleImageLoad(item.id)}
                style={{
                  display: loadedImages.has(String(item.id)) ? 'block' : 'none',
                }}
              />
            </div>
            {translatedTitle && <h3 className={styles.title}>{translatedTitle}</h3>}
            {translatedDescription && (
              <p className={styles.description}>{translatedDescription}</p>
            )}
            {item.date && <time className={styles.date}>{item.date}</time>}
          </div>
        );
      })}
    </div>
  );
};

