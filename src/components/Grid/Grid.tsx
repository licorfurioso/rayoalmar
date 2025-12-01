import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ContentItem } from '../../types/content';
import { SkeletonImage } from '../SkeletonImage/SkeletonImage';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Grid.module.css';

interface GridProps {
  data: ContentItem[];
  category?: string;
}

interface GridItemWrapperProps {
  children: React.ReactNode;
  index: number;
}

const GridItemWrapper = ({ children, index }: GridItemWrapperProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.gridItemWrapper} ${isVisible ? styles.revealed : ''}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {children}
    </div>
  );
};

export const Grid = ({ data, category }: GridProps) => {
  const { t } = useTranslation('content');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string | number) => {
    setLoadedImages((prev) => new Set(prev).add(String(id)));
  };

  const handleImageError = (id: string | number) => {
    setErrorImages((prev) => new Set(prev).add(String(id)));
    setLoadedImages((prev) => new Set(prev).add(String(id))); // Mark as "loaded" to hide skeleton
    console.error(`Failed to load image for item: ${id}`);
  };

  return (
    <div className={styles.grid} role="list" aria-label={`${category} gallery`}>
      {data.map((item, index) => {
        // Get translated title and description, fallback to original if translation missing
        const translatedTitle = category ? t(`${category}.${item.id}.title`, item.title) : item.title;
        const translatedDescription = category ? t(`${category}.${item.id}.description`, item.description || '') : item.description;

        return (
          <GridItemWrapper key={item.id} index={index}>
            <div className={styles.gridItem} role="listitem">
            <div className={styles.imageWrapper}>
              {!loadedImages.has(String(item.id)) && <SkeletonImage />}
              {!errorImages.has(String(item.id)) ? (
                <img
                  src={item.imageUrl}
                  alt={translatedTitle}
                  className={styles.image}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                  onError={() => handleImageError(item.id)}
                  style={{
                    display: loadedImages.has(String(item.id)) ? 'block' : 'none',
                  }}
                />
              ) : (
                <div className={styles.errorPlaceholder} role="img" aria-label={`Image not available: ${translatedTitle}`}>
                  <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className={styles.errorText}>Image unavailable</span>
                </div>
              )}
            </div>
            {translatedTitle && <h3 className={styles.title}>{translatedTitle}</h3>}
            {translatedDescription && (
              <p className={styles.description}>{translatedDescription}</p>
            )}
            {item.date && <time className={styles.date}>{item.date}</time>}
            </div>
          </GridItemWrapper>
        );
      })}
    </div>
  );
};

