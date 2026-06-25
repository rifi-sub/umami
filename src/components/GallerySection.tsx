import React, { useEffect, useRef } from 'react';
import { useImages } from '../context/ImagesContext';
import styles from './GallerySection.module.css';

const GallerySection: React.FC = () => {
  const { getImagesByTag } = useImages();
  const galleryImages = getImagesByTag('galeria');
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
    <section ref={sectionRef} className={styles.section} id="galeria">
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.kicker}>Preview</span>
          <h2 className={styles.heading}>Tu nueva obsesión visual</h2>
          <p className={styles.intro}>
            Esto es solo un vistazo. El resto lo desbloqueas donde realmente se siente: en mis plataformas privadas y con tributos.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className={styles.imageWrapper}>
                <img src={img.link} alt={`Gallery ${idx}`} className={styles.image} />
              </div>
              <div className={styles.captionContainer}>
                <p className={styles.caption}>{img.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.actionContainer}>
          <a href="#tributos" className={`${styles.ctaBtn} ${styles.reveal}`}>
            Desbloquear más contenido
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
