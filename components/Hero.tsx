
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface HeroProps {
  onOpenSurvey: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenSurvey }) => {
  const t = useTranslations();

  return (
    <section className="bg-light-bg dark:bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-secondary dark:text-white">
          {t.heroTitle}: <span className="text-primary">{t.siteTitle}</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.heroDescription}</p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={onOpenSurvey}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            {t.heroCTA}
          </button>
          <a
            href="#sections"
            className="bg-transparent border-2 border-secondary dark:border-white text-secondary dark:text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-secondary transition-colors"
          >
            {t.heroSecondaryCTA}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
