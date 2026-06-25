import React, { useState, useEffect } from 'react';
import styles from './AgeVerificationModal.module.css';

const AgeVerificationModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if user has already verified
    const isVerified = localStorage.getItem('umami_18plus_verified');
    
    if (!isVerified) {
      // Delay slightly for effect
      const timer = setTimeout(() => {
        setIsRendered(true);
        // Force reflow
        setTimeout(() => setIsVisible(true), 50);
        document.body.style.overflow = 'hidden'; // Lock scroll
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('umami_18plus_verified', 'true');
    setIsVisible(false);
    
    // Unlock scroll after fade out animation
    setTimeout(() => {
      setIsRendered(false);
      document.body.style.overflow = 'auto';
    }, 800);
  };

  const handleDecline = () => {
    // If they decline, redirect away or show a message.
    window.location.href = 'https://www.google.com';
  };

  if (!isRendered) return null;

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.modal}>
        <div className={styles.icon}>warning</div>
        <h2 className={styles.heading}>Acceso Restringido</h2>
        <p className={styles.text}>
          Este sitio web contiene material explícito y dinámicas de dominación financiera destinadas estrictamente para adultos. 
          Al continuar, confirmas que tienes 18 años o más y consientes interactuar bajo mis reglas.
        </p>
        
        <div className={styles.buttonGroup}>
          <button onClick={handleAccept} className={styles.acceptBtn}>
            Soy mayor de 18
          </button>
          <button onClick={handleDecline} className={styles.declineBtn}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
