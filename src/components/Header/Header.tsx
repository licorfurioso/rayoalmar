import styles from './Header.module.css';

interface HeaderProps {
  activeSection?: string;
}

export const Header = ({ activeSection }: HeaderProps) => {
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
                Photo Sessions
              </a>
            </li>
            <li>
              <a
                href="#shoots"
                onClick={(e) => handleNavClick(e, 'shoots')}
                className={activeSection === 'shoots' ? styles.active : ''}
              >
                Shoots
              </a>
            </li>
            <li>
              <a
                href="#sketchup"
                onClick={(e) => handleNavClick(e, 'sketchup')}
                className={activeSection === 'sketchup' ? styles.active : ''}
              >
                Sketchup
              </a>
            </li>
            <li>
              <a
                href="#about-me"
                onClick={(e) => handleNavClick(e, 'about-me')}
                className={activeSection === 'about-me' ? styles.active : ''}
              >
                About Me
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
