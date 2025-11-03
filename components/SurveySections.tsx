
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { CheckCircleIcon } from './icons/Icons';

interface SurveySectionsProps {
  onOpenSurvey: () => void;
}

const SurveySections: React.FC<SurveySectionsProps> = ({ onOpenSurvey }) => {
  const t = useTranslations();
  
  return (
    <section id="sections" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary dark:text-white">{t.sectionsTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.sections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2">
              <div className="bg-primary/10 dark:bg-accent/10 p-4 rounded-full mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-primary dark:text-accent"/>
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white">{section.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{section.desc}</p>
              <button onClick={onOpenSurvey} className="mt-6 bg-accent text-secondary font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
                {t.sectionCTA}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurveySections;
