import { Grid } from '../../components/Grid/Grid';
import type { ContentItem } from '../../types/content';
import sketchupDataRaw from '../../data/sketchup.json';
import styles from './Sketchup.module.css';

export const Sketchup = () => {
  // Type assertion and sort data by order property
  const sketchupData = sketchupDataRaw as ContentItem[];
  const sortedData = [...sketchupData].sort((a, b) => a.order - b.order);

  return (
    <section
      id="sketchup"
      className={styles.section}
      aria-label="Sketchup Drawings"
    >
      <div className={styles.content}>
        <h2>Sketchup</h2>
        <Grid data={sortedData} category="Sketchup" />
      </div>
    </section>
  );
};
