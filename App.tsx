
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import SurveySections from './components/SurveySections';
import OpenFeedback from './components/OpenFeedback';
import Results from './components/Results';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { AppContext, Language, Theme } from './context/AppContext';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('es');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || browserTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => (prevLang === 'es' ? 'en' : 'es'));
  }, []);

  const openSurveyModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeSurveyModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      <div className="flex flex-col min-h-screen">
        <Header onOpenSurvey={openSurveyModal} />
        <main className="flex-grow">
          <Hero onOpenSurvey={openSurveyModal} />
          <About />
          <SurveySections onOpenSurvey={openSurveyModal} />
          <OpenFeedback />
          <Results />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeSurveyModal}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc_--pACLAw-9J2A-Z2kXJ3wD8F_8G8X9X9Y9Z9z9z9z9z9z9/viewform?embedded=true"
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="rounded-lg"
        >
          Cargando…
        </iframe>
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
          Nota: El formulario es un ejemplo. Reemplaza la URL en App.tsx.
        </p>
      </Modal>
    </AppContext.Provider>
  );
}

export default App;
