import React, { useEffect, useRef } from 'react';
import { useImages } from '../context/ImagesContext';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
  const { getImageById } = useImages();
  const aboutImage = getImageById('portrait');
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

  const columns = [
    {
      title: "Poisonous Scorpio",
      text: "Soy Umami (@goddessumami), poisonous scorpio, Findom Goddess y manipuladora profesional. Toxic & untouchable. No busco atención: la exijo y la cobro."
    },
    {
      title: "Tatuadora & Artista",
      text: "Soy tatuadora y artista independiente. Mis manos marcan cuerpos, mi mente marca billeteras. Tus tributos financian mi estudio, mi tinta y mis viajes, no tus caprichos."
    },
    {
      title: "Idiomas",
      text: "Atiendo en esp/eng. Si no puedes expresarte correctamente en ninguno, ya empiezas por debajo. Aprende a hablar o acepta tu lugar como billetera con patas."
    }
  ];

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={`${styles.imageColumn} ${styles.reveal}`}>
            <div className={styles.imageMask}>
               <img 
                 src={aboutImage?.link || ''} 
                 alt="Umami Portrait" 
                 className={styles.image}
               />
            </div>
          </div>
          
          <div className={`${styles.textColumn} ${styles.reveal}`} style={{ transitionDelay: '200ms' }}>
            <span className={styles.kicker}>Quién es Umami</span>
            <h2 className={styles.heading}>
              Poisonous <br/> Scorpio.
            </h2>
            <div className={styles.divider}></div>
            
            <div className={styles.grid}>
              {columns.map((col, idx) => (
                <div key={idx} className={styles.block}>
                  <h3 className={styles.blockTitle}>{col.title}</h3>
                  <p className={styles.blockText}>{col.text}</p>
                </div>
              ))}
            </div>
            
            <div className={styles.tags}>
              <span className={styles.tag}>Findom</span>
              <span className={styles.tag}>Tattoo Artist</span>
              <span className={styles.tag}>Goddess</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
