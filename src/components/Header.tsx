import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>UMAMI</span>
        </div>
        
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <a href="#about" className={styles.navLink} onClick={closeMobileMenu}>Sobre Mí</a>
          <a href="#servicios" className={styles.navLink} onClick={closeMobileMenu}>Servicios</a>
          <a href="#galeria" className={styles.navLink} onClick={closeMobileMenu}>Galería</a>
          <a href="#contacto" className={styles.ctaButton} onClick={closeMobileMenu}>Tributar</a>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <span>{isMobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
