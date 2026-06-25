import React, { useEffect, useRef } from 'react';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection: React.FC = () => {
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

  const testimonials = [
    {
      quote: "Pensé que iba a controlarme. Ahora trabajo horas extra solo para verla subir su meta.",
      author: "paypig anónimo"
    },
    {
      quote: "Nunca me habían humillado tanto ni me había gustado tanto pagar por ello.",
      author: "sph toy"
    },
    {
      quote: "Entré por curiosidad, me quedé por la forma en la que destroza mi ego con una sola frase.",
      author: "wallet slave"
    }
  ];

  return (
    <section ref={sectionRef} className={styles.section} id="testimonios">
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.kicker}>Testimonios</span>
          <h2 className={styles.heading}>Lo que dicen los que ya cayeron</h2>
          <p className={styles.intro}>
            No necesito tu opinión. Pero me gusta mostrarte cómo acaban los que se atrevieron antes que tú.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((test, idx) => (
            <div 
              key={idx} 
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className={styles.quoteIcon}>format_quote</div>
              <p className={styles.quote}>{test.quote}</p>
              <div className={styles.divider}></div>
              <span className={styles.author}>— {test.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
