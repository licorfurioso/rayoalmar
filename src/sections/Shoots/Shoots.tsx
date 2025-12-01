import { useTranslation } from 'react-i18next';
import { Grid } from '../../components/Grid/Grid';
import type { ContentItem } from '../../types/content';
import shootsDataRaw from '../../data/shoots.json';
import styles from './Shoots.module.css';

export const Shoots = () => {
  const { t } = useTranslation('sections');

  // Type assertion and sort data by order property
  const shootsData = shootsDataRaw as ContentItem[];
  const sortedData = [...shootsData].sort((a, b) => a.order - b.order);

  return (
    <section id="shoots" className={styles.section} aria-label={t('shoots')}>
      <div className={styles.content}>
        <h2>{t('shoots')}</h2>
        <Grid data={sortedData} category="shoots" />
      </div>
    </section>
  );
};
