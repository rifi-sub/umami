import React, { useEffect, useRef } from 'react';
import { useImages } from '../context/ImagesContext';
import styles from './ServicesSection.module.css';

const ServicesSection: React.FC = () => {
  const { getImageById } = useImages();
  const bgImage = getImageById('services_bg');
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
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "💸",
      title: "Findom",
      subtitle: "El placer de perder el control.",
      text: "Tu dinero es la única forma honesta que tienes de decirme que me adoras. Me interesa la dominación financiera real: tributos, tareas económicas, drenaje progresivo."
    },
    {
      icon: "🎧",
      title: "JOI",
      subtitle: "La obediencia convertida en deseo.",
      text: "Te masturbo con órdenes y tiempos, no con caricias. Cada instrucción te recuerda que tu placer depende de mi voz, mi humor y lo generoso que fuiste."
    },
    {
      icon: "📏",
      title: "SPH",
      subtitle: "La humillación como espejo del placer.",
      text: "Tu tamaño no es secreto, es material. Te confronto con lo pequeño que eres hasta que entiendes que tu única función es pagar y agradecer."
    },
    {
      icon: "👣",
      title: "Foot Worship",
      subtitle: "La devoción empieza en el suelo.",
      text: "Mis pies no se miran, se adoran. Cada tributo es una reverencia: pagas por ver, por imaginar, por rogar y, si te lo permito, por volver a hacerlo."
    },
    {
      icon: "🔥",
      title: "Body Worship",
      subtitle: "El arte de adorar lo que te domina.",
      text: "Mi cuerpo es un altar. No existe igualdad, solo tu necesidad de adorarlo y mi placer viendo hasta dónde caes para conseguirlo."
    },
    {
      icon: "⛓",
      title: "Control & Castigo",
      subtitle: "La calma antes de tu rendición.",
      text: "Órdenes, rutinas, objetivos económicos y castigos cuando fallas. Si quieres estructura, te la doy. Cada falta se paga caro."
    },
    {
      icon: "🎙",
      title: "Audios dominantes",
      subtitle: "Su voz no se escucha, se obedece.",
      text: "Creo audios personalizados con tus fetiches, tus debilidades y tus culpas. Los escuchas con una mano en la billetera."
    }
  ];

  return (
    <section ref={sectionRef} className={styles.section} id="servicios">
      <div className={styles.bgWrapper}>
        <div className={styles.bgOverlay}></div>
        {bgImage && (
          <img src={bgImage.link} alt="Background" className={styles.bgImage} />
        )}
      </div>

      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.kicker}>Dinámicas</span>
          <h2 className={styles.heading}>Formas de servirme</h2>
          <p className={styles.intro}>
            No vendo “packs”. Vendo control, humillación y estructura. Esto es lo que puedes encontrar conmigo si sabes pagar el precio.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${(idx % 3) * 150}ms` }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <span className={styles.cardSubtitle}>{service.subtitle}</span>
              <p className={styles.cardText}>{service.text}</p>
              <div className={styles.cardLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
