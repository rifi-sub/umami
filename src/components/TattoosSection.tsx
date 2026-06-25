import React, { useEffect, useRef } from 'react';
import { useImages } from '../context/ImagesContext';
import styles from './TattoosSection.module.css';

const TattoosSection: React.FC = () => {
  const { getImagesByTag } = useImages();
  const tattooImages = getImagesByTag('tattoo').slice(0, 3);
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
    <section ref={sectionRef} className={styles.section} id="tattoos">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={`${styles.textColumn} ${styles.reveal}`}>
            <span className={styles.kicker}>Tatuadora & Artista</span>
            <h2 className={styles.heading}>Marco Cuerpos.</h2>
            <div className={styles.divider}></div>
            
            <p className={styles.intro}>
              Además de romper egos, marco cuerpos. Mi arte existe en piel, papel y pantalla.
            </p>
            
            <div className={styles.contentBlocks}>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Mi estilo</h3>
                <p className={styles.blockText}>
                  Mi línea mezcla lo sensual, lo fetichista y lo oscuro. Lo que tus fantasías no se atreven a decir, yo lo dibujo en tu piel.
                </p>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Citas de tattoo</h3>
                <p className={styles.blockText}>
                  Para consultas de tatuajes, sigue las instrucciones de contacto de abajo. Sé claro con zona, tamaño y estilo. No contesto a vagos ni a indecisos.
                </p>
              </div>
            </div>
            
            <a href="#contacto" className={styles.ctaBtn}>
              Pedir cita de Tattoo
            </a>
          </div>
          
          <div className={styles.galleryColumn}>
            {tattooImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`${styles.imageWrapper} ${styles.reveal}`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <img src={img.link} alt={img.descripcion} className={styles.image} />
                <div className={styles.imageOverlay}>
                  <span className={styles.icon}>add</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TattoosSection;
