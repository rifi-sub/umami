import React, { useEffect, useRef, useState } from 'react';
import styles from './TributesSection.module.css';
import { socialLinks } from '../utils/socialLinks';
import { buildUrl } from '../utils/buildUrl';

const TributesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInstagramRef, setIsInstagramRef] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsInstagramRef(document.referrer.toLowerCase().includes("instagram.com"));
    }

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

  const fanslyUrl = buildUrl(socialLinks.fansly);

  // We conditionally include Fansly if not from IG
  const tributeMethods = [
    ...(isInstagramRef ? [] : [{
      name: "Fansly",
      description: "Tributa y desbloquea contenido en mi reino privado.",
      link: fanslyUrl
    }]),
    {
      name: "CashApp / PayPal",
      description: "Métodos directos. Solicita los datos por DM si eres digno.",
      link: "#"
    },
    {
      name: "Crypto",
      description: "Envía USDT o BTC. El anonimato tiene su precio.",
      link: "#"
    }
  ];

  return (
    <section ref={sectionRef} className={styles.section} id="tributos">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={`${styles.textColumn} ${styles.reveal}`}>
            <span className={styles.kicker}>Tributos & Pagos</span>
            <h2 className={styles.heading}>
              Tributa primero. <br />
              <span className={styles.accentText}>Luego respira.</span>
            </h2>
            
            <p className={styles.intro}>
              No hay chats gratis, no hay pruebas, no hay “¿podemos hablar primero?”. Esto es findom: primero abres la cartera, luego abres la boca.
            </p>

            <div className={styles.minimumBox}>
              <h3 className={styles.minimumHeading}>Tributo mínimo</h3>
              <p className={styles.minimumText}>
                30$ is my tribute. Si no alcanzas eso, no me alcances a mí.
              </p>
            </div>
          </div>
          
          <div className={`${styles.methodsColumn} ${styles.reveal}`} style={{ transitionDelay: '200ms' }}>
            <h3 className={styles.methodsHeading}>Métodos de tributo</h3>
            <p className={styles.methodsText}>
              Elige una de las opciones de tributo. Envía el tributo, guarda la captura y solo entonces te acercas a mis DMs.
            </p>
            
            <div className={styles.methodsList}>
              {tributeMethods.map((method, idx) => (
                <div key={idx} className={styles.methodCard}>
                  <div className={styles.methodInfo}>
                    <h4 className={styles.methodName}>{method.name}</h4>
                    <p className={styles.methodDesc}>{method.description}</p>
                  </div>
                  <a href={method.link} className={styles.methodLink}>
                    <span className={styles.icon}>arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
            
            <div className={styles.reminder}>
              <p>Mi objetivo base está entre 600–800 USD mensuales. No preguntes “¿cuánto es suficiente?”. Pregunta cuánto puedes aguantar antes de romperte.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TributesSection;
