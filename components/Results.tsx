
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ChartBarIcon } from './icons/Icons';

interface ProgressBarProps {
  label: string;
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-secondary dark:text-gray-200">{label}</span>
            <span className="text-sm font-medium text-primary dark:text-accent">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div className="bg-primary dark:bg-accent h-4 rounded-full" style={{ width: `${value}%` }}></div>
        </div>
    </div>
);


const Results: React.FC = () => {
  const t = useTranslations();
  
  return (
    <section id="results" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
            <ChartBarIcon className="h-12 w-12 mx-auto text-primary"/>
            <h2 className="text-3xl font-bold text-secondary dark:text-white mt-4">{t.resultsTitle}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{t.resultsSubtitle}</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
            {t.results.map((item, index) => (
                <ProgressBar key={index} label={item.label} value={item.value} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
