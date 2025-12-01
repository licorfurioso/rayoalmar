import { useTranslation } from 'react-i18next';
import { Grid } from '../../components/Grid/Grid';
import { SectionReveal } from '../../components/SectionReveal/SectionReveal';
import type { ContentItem } from '../../types/content';
import sketchupDataRaw from '../../data/sketchup.json';
import styles from './Sketchup.module.css';

export const Sketchup = () => {
  const { t } = useTranslation('sections');

  // Type assertion and sort data by order property
  const sketchupData = sketchupDataRaw as ContentItem[];
  const sortedData = [...sketchupData].sort((a, b) => a.order - b.order);

  return (
    <section
      id="sketchup"
      className={styles.section}
      aria-label={t('sketchup')}
    >
      <SectionReveal>
        <div className={styles.content}>
          <h2>{t('sketchup')}</h2>
          <Grid data={sortedData} category="sketchup" />
        </div>
      </SectionReveal>
    </section>
  );
};
