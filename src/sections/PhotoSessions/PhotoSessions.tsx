import { useTranslation } from 'react-i18next';
import { Grid } from '../../components/Grid/Grid';
import { SectionReveal } from '../../components/SectionReveal/SectionReveal';
import type { ContentItem } from '../../types/content';
import photoSessionsDataRaw from '../../data/photoSessions.json';
import styles from './PhotoSessions.module.css';

export const PhotoSessions = () => {
  const { t } = useTranslation('sections');

  // Type assertion and sort data by order property
  const photoSessionsData = photoSessionsDataRaw as ContentItem[];
  const sortedData = [...photoSessionsData].sort((a, b) => a.order - b.order);

  return (
    <section
      id="photo-sessions"
      className={styles.section}
      aria-label={t('photoSessions')}
    >
      <SectionReveal>
        <div className={styles.content}>
          <h2>{t('photoSessions')}</h2>
          <Grid data={sortedData} category="photoSessions" />
        </div>
      </SectionReveal>
    </section>
  );
};
