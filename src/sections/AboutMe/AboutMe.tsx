import { useTranslation } from 'react-i18next';
import styles from './AboutMe.module.css';

export const AboutMe = () => {
  const { t } = useTranslation('sections');

  return (
    <section id="about-me" className={styles.section} aria-label={t('aboutMe')}>
      <div className={styles.content}>
        <h2>{t('aboutMe')}</h2>
        <p>{t('aboutMeContent')}</p>
      </div>
    </section>
  );
};
