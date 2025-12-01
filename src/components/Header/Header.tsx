import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

interface HeaderProps {
  activeSection?: string;
}

export const Header = ({ activeSection }: HeaderProps) => {
  const { t } = useTranslation('navigation');

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Flor Guzman</div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="#photo-sessions"
                onClick={(e) => handleNavClick(e, 'photo-sessions')}
                className={
                  activeSection === 'photo-sessions' ? styles.active : ''
                }
              >
                {t('photoSessions')}
              </a>
            </li>
            <li>
              <a
                href="#shoots"
                onClick={(e) => handleNavClick(e, 'shoots')}
                className={activeSection === 'shoots' ? styles.active : ''}
              >
                {t('shoots')}
              </a>
            </li>
            <li>
              <a
                href="#sketchup"
                onClick={(e) => handleNavClick(e, 'sketchup')}
                className={activeSection === 'sketchup' ? styles.active : ''}
              >
                {t('sketchup')}
              </a>
            </li>
            <li>
              <a
                href="#about-me"
                onClick={(e) => handleNavClick(e, 'about-me')}
                className={activeSection === 'about-me' ? styles.active : ''}
              >
                {t('aboutMe')}
              </a>
            </li>
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
