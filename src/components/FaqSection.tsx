import React, { useEffect, useRef, useState } from 'react';
import styles from './FaqSection.module.css';

const FaqSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

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

  const faqItems = [
    {
      question: "¿Cómo te hablo por primera vez?",
      answer: "Tributa primero. Luego, y solo luego, me envías un DM con la captura del tributo y una presentación decente. Sin dinero, tu mensaje no existe."
    },
    {
      question: "¿Cuánto debería tributarte al mes?",
      answer: "Mi meta base está entre 600–800 USD mensuales. No es tu objetivo, es el mío. Tu objetivo es superarla y destacar entre el resto de perdedores."
    },
    {
      question: "¿Haces algo gratis?",
      answer: "No. Esto no es caridad. Si estás buscando gratis, estás en el lugar equivocado."
    },
    {
      question: "¿Aceptas límites?",
      answer: "Acepto límites claros, pero no acepto excusas. Nada ilegal, nada sin consentimiento, nada que no me excite."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.kicker}>Normas</span>
          <h2 className={styles.heading}>Reglas básicas para no hacer el ridículo</h2>
        </div>

        <div className={`${styles.accordion} ${styles.reveal}`} style={{ transitionDelay: '200ms' }}>
          {faqItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`${styles.accordionItem} ${openIndex === idx ? styles.active : ''}`}
            >
              <button 
                className={styles.accordionHeader} 
                onClick={() => toggleAccordion(idx)}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={styles.icon}>
                  {openIndex === idx ? 'remove' : 'add'}
                </span>
              </button>
              
              <div 
                className={styles.accordionContent}
                style={{ 
                  maxHeight: openIndex === idx ? '300px' : '0',
                  opacity: openIndex === idx ? 1 : 0
                }}
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
