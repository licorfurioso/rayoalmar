import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher} role="group" aria-label="Language switcher">
      <button
        onClick={() => changeLanguage('en')}
        className={`${styles.languageButton} ${currentLanguage === 'en' ? styles.active : ''}`}
        aria-current={currentLanguage === 'en' ? 'true' : 'false'}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={styles.separator} aria-hidden="true">|</span>
      <button
        onClick={() => changeLanguage('es')}
        className={`${styles.languageButton} ${currentLanguage === 'es' ? styles.active : ''}`}
        aria-current={currentLanguage === 'es' ? 'true' : 'false'}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};

