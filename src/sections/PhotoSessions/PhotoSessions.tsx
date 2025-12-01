import { Grid } from '../../components/Grid/Grid';
import type { ContentItem } from '../../types/content';
import photoSessionsDataRaw from '../../data/photoSessions.json';
import styles from './PhotoSessions.module.css';

export const PhotoSessions = () => {
  // Type assertion and sort data by order property
  const photoSessionsData = photoSessionsDataRaw as ContentItem[];
  const sortedData = [...photoSessionsData].sort((a, b) => a.order - b.order);

  return (
    <section
      id="photo-sessions"
      className={styles.section}
      aria-label="Photo Sessions"
    >
      <div className={styles.content}>
        <h2>Photo Sessions</h2>
        <Grid data={sortedData} category="Photo Sessions" />
      </div>
    </section>
  );
};
