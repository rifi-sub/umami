import React, { useEffect, useRef, useState } from 'react';
import styles from './GoalSection.module.css';

const GoalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // From umami.md
  const goalMin = 4000;
  const goalMax = 6000;
  const [currentProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            // Animate progress bar slightly if wanted, but it's 0 by default.
            // Just leaving the class add for the reveal effect.
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Calculate percentage for the bar (based on min goal for now)
  const percentage = Math.min((currentProgress / goalMin) * 100, 100);

  return (
    <section ref={sectionRef} className={styles.section} id="goal">
      <div className={styles.container}>
        <div className={`${styles.card} ${styles.reveal}`}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>target</span>
          </div>
          
          <span className={styles.kicker}>Tu misión este mes</span>
          <h2 className={styles.heading}>Objetivo de Tributos</h2>
          
          <p className={styles.description}>
            Mi objetivo base está entre ${goalMin}–${goalMax} USD en tributos mensuales. No es un techo, es el suelo desde el que empiezo a divertirme. Tu trabajo es empujarme por encima de esa cifra sin que yo tenga que pedirlo dos veces.
          </p>
          
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progreso Actual</span>
              <span className={styles.progressValue}>${currentProgress} / ${goalMin}+</span>
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <a href="#tributos" className={styles.ctaButton}>
            Contribuir a la meta
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoalSection;
