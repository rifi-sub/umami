import React, { useEffect, useRef, useState } from 'react';
import styles from './TributesSection.module.css';
import { socialLinks } from '../utils/socialLinks';
import { buildUrl } from '../utils/buildUrl';
import { useToast } from '../context/ToastContext';

const TributesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInstagramRef, setIsInstagramRef] = useState(false);
  const { showToast } = useToast();

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

  const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>, type: string) => {
    e.preventDefault();
    let textToCopy = '';
    let message = '';
    if (type === 'paypal') {
      textToCopy = 'umami@example.com'; // Dummy paypal email
      message = 'Email de PayPal copiado al portapapeles';
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(message, 'success');
    }).catch(() => {
      showToast('Error al copiar al portapapeles', 'error');
    });
  };

  const ofPrimaryUrl = buildUrl(socialLinks.onlyfansMain);
  const throneUrl = buildUrl(socialLinks.throne);

  // We conditionally include Fansly, OF, Throne if not from IG
  const tributeMethods = [
    ...(isInstagramRef ? [] : [
      {
        id: 'onlyfans',
        name: "OnlyFans",
        description: "Mi plataforma principal. Entra y obedece.",
        link: ofPrimaryUrl,
        isCopy: false
      },
      {
        id: 'throne',
        name: "Throne Wishlist",
        description: "Cómprame regalos. Financia mis caprichos directamente.",
        link: throneUrl,
        isCopy: false
      },
      {
        id: 'fansly',
        name: "Fansly",
        description: "Desbloquea contenido en mi reino privado.",
        link: fanslyUrl,
        isCopy: false
      }
    ]),
    {
      id: 'paypal',
      name: "CashApp / PayPal",
      description: "Métodos directos. Solicita los datos por DM si eres digno.",
      link: "#",
      isCopy: true
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
                30$ is my tribute. Si no alcanzas eso, ni me mires.
              </p>
            </div>
          </div>
          
          <div className={`${styles.methodsColumn} ${styles.reveal}`} style={{ transitionDelay: '200ms' }}>
            <h3 className={styles.methodsHeading}>Métodos de tributo</h3>
            <p className={styles.methodsText}>
              Elige una de las opciones de tributo. Envía el tributo, guarda la captura y solo entonces te acercas a mis DMs.
            </p>
            
            <div className={styles.methodsList}>
              {tributeMethods.map((method) => (
                <div key={method.id} className={styles.methodCard}>
                  <div className={styles.methodInfo}>
                    <h4 className={styles.methodName}>{method.name}</h4>
                    <p className={styles.methodDesc}>{method.description}</p>
                  </div>
                  <a 
                    href={method.link} 
                    className={styles.methodLink}
                    target={method.isCopy ? undefined : "_blank"}
                    rel={method.isCopy ? undefined : "noopener noreferrer"}
                    onClick={method.isCopy ? (e) => handleCopy(e, method.id) : undefined}
                  >
                    <span className={styles.icon}>{method.isCopy ? 'content_copy' : 'arrow_forward'}</span>
                  </a>
                </div>
              ))}
            </div>
            
            <div className={styles.reminder}>
              <p>Mi objetivo base es 4.000 USD mensuales para financiar mi alquiler, mi estudio de tattoo y mi vida. Tu único propósito es acercarme a esa meta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TributesSection;
