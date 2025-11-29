import { Carousel } from '../../components/Carousel/Carousel';
import type { ContentItem } from '../../types/content';
import shootsDataRaw from '../../data/shoots.json';
import styles from './Shoots.module.css';

export const Shoots = () => {
  // Type assertion and sort data by order property
  const shootsData = shootsDataRaw as ContentItem[];
  const sortedData = [...shootsData].sort((a, b) => a.order - b.order);

  return (
    <section id="shoots" className={styles.section} aria-label="Shoots">
      <div className={styles.content}>
        <h2>Shoots</h2>
        <Carousel data={sortedData} category="Shoots" />
      </div>
    </section>
  );
};
