import React from 'react';
import { ImagesProvider } from './context/ImagesContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GoalSection from './components/GoalSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TattoosSection from './components/TattoosSection';
import GallerySection from './components/GallerySection';
import TributesSection from './components/TributesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <ImagesProvider>
      <div className="app">
        <Header />
        <main>
          <HeroSection />
          <GoalSection />
          <AboutSection />
          <ServicesSection />
          <TattoosSection />
          <GallerySection />
          <TributesSection />
          <TestimonialsSection />
          <FaqSection />
          <ContactSection />
        </main>
      </div>
    </ImagesProvider>
  );
};

export default App;
