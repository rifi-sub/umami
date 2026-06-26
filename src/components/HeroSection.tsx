import React, { useEffect, useRef } from 'react';
import { useImages } from '../context/ImagesContext';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  const { getImageById } = useImages();
  const heroImage = getImageById('hero');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection} id="hero">
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.reveal}`}>
          <div className={styles.titleWrapper}>
            <div className={styles.glowEffect}></div>
            <h1 className={styles.title}>
              poisonous scorpio <br />
              <span className={styles.accentText}>findom</span> • <span className={styles.accentText}>tattoo artist</span>
            </h1>
          </div>
          
          <p className={styles.subtitle}>Mi tiempo es caro. Mi control no tiene precio.</p>
          
          <p className={styles.description}>
            Soy Umami, tatuadora, modelo y artista independiente de Argentina. Entro en tu vida como veneno, estética y dominación financiera: rompo egos, vacío billeteras y convierto tus fantasías en obediencia pagada.
          </p>
          
          <div className={styles.buttonGroup}>
            <a href="#contacto" className={styles.primaryBtn}>
              Tributa ahora
            </a>
            <a href="#faq" className={styles.secondaryBtn}>
              Ver mis reglas <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
        
        <div className={`${styles.imageWrapper} ${styles.reveal}`} style={{ transitionDelay: '400ms' }}>
          <div className={styles.imageMask}>
            <img 
              src={heroImage?.link || ''} 
              alt={heroImage?.descripcion || 'Umami Hero'} 
              className={styles.image}
            />
          </div>
          <div className={styles.pulsingCircle}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
