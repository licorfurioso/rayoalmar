import ReactPlayer from 'react-player';
import type { VideoPlayerProps } from '../../types/content';
import styles from './VideoPlayer.module.css';

export const VideoPlayer = ({
  videoUrl,
  title,
  description,
}: VideoPlayerProps) => {
  return (
    <div className={styles.playerContainer} aria-label={`Video: ${title}`}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          {...{
            url: videoUrl,
            controls: true,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {(title || description) && (
        <div className={styles.caption}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
    </div>
  );
};
