import styles from './SkeletonImage.module.css';

interface SkeletonImageProps {
  className?: string;
}

export const SkeletonImage = ({ className }: SkeletonImageProps) => {
  return (
    <div className={`${styles.skeleton} ${className || ''}`}>
      <div className={styles.shimmer}></div>
    </div>
  );
};
