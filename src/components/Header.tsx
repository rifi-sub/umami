import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>UMAMI</span>
        </div>
        
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>Sobre Mí</a>
          <a href="#servicios" className={styles.navLink}>Servicios</a>
          <a href="#galeria" className={styles.navLink}>Galería</a>
          <a href="#tributos" className={styles.ctaButton}>Tributar</a>
        </div>

        <button className={styles.mobileMenuBtn}>
          <span>☰</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
