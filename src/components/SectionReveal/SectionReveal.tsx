import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './SectionReveal.module.css';

interface SectionRevealProps {
  children: React.ReactNode;
}

export const SectionReveal = ({ children }: SectionRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`${styles.sectionReveal} ${isVisible ? styles.revealed : ''}`}
    >
      {children}
    </div>
  );
};
