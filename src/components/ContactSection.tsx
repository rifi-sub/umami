import React, { useEffect, useRef, useState } from 'react';
import styles from './ContactSection.module.css';
import { socialLinks } from '../utils/socialLinks';
import { buildUrl } from '../utils/buildUrl';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInstagramRef, setIsInstagramRef] = useState(false);

  useEffect(() => {
    // Basic protection check for Instagram
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

  const xUrl = buildUrl(socialLinks.x);
  const fanslyUrl = buildUrl(socialLinks.fansly);
  const telegramUrl = buildUrl(socialLinks.telegram);
  const onlyfansVipUrl = buildUrl(socialLinks.onlyfansVip);
  const onlyfansMainUrl = buildUrl(socialLinks.onlyfansMain);
  const throneUrl = buildUrl(socialLinks.throne);
  const instagramUrl = buildUrl(socialLinks.instagram);

  return (
    <section ref={sectionRef} className={styles.section} id="contacto">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={`${styles.textColumn} ${styles.reveal}`}>
            <span className={styles.kicker}>Contacto & Redes</span>
            <h2 className={styles.heading}>Si quieres acercarte, paga</h2>
            <p className={styles.intro}>
              No “aplicas” para servirme. Me demuestras con dinero que mereces mi atención. El orden es: tributo → captura → DM respetuoso. Cualquier otro orden termina en bloqueo.
            </p>
          </div>
          
          <div className={`${styles.linksColumn} ${styles.reveal}`} style={{ transitionDelay: '200ms' }}>
            <a href={xUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>alternate_email</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{socialLinks.x.label}</span>
                <span className={styles.cardValue}>{socialLinks.x.handle}</span>
              </div>
            </a>
            
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>send</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{socialLinks.telegram.label}</span>
                <span className={styles.cardValue}>{socialLinks.telegram.handle}</span>
              </div>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>photo_camera</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{socialLinks.instagram.label}</span>
                <span className={styles.cardValue}>{socialLinks.instagram.handle}</span>
              </div>
            </a>

            {!isInstagramRef && (
              <>
                <a href={fanslyUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>lock</span>
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>{socialLinks.fansly.label}</span>
                    <span className={styles.cardValue}>{socialLinks.fansly.handle}</span>
                  </div>
                </a>

                <a href={onlyfansMainUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>diamond</span>
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>{socialLinks.onlyfansMain.label}</span>
                    <span className={styles.cardValue}>@{socialLinks.onlyfansMain.handle}</span>
                  </div>
                </a>

                <a href={onlyfansVipUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>star</span>
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardLabel}>{socialLinks.onlyfansVip.label}</span>
                    <span className={styles.cardValue}>@{socialLinks.onlyfansVip.handle}</span>
                  </div>
                </a>
              </>
            )}

            <a href={throneUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>redeem</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{socialLinks.throne.label}</span>
                <span className={styles.cardValue}>Wishlist</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>UMAMI</span>
            <div className={styles.footerDivider}></div>
            <span className={styles.footerRole}>Findom & Tattoo Artist</span>
          </div>
          <p className={styles.footerNote}>
            Todo lo que haces aquí es voluntario. Todo lo que sientes después es tu problema.
          </p>
          <div className={styles.footerLinks}>
            <a href={instagramUrl} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={xUrl} className={styles.footerLink} target="_blank" rel="noopener noreferrer">X</a>
            <a href={telegramUrl} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Telegram</a>
            {!isInstagramRef && <a href={fanslyUrl} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Fansly</a>}
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
