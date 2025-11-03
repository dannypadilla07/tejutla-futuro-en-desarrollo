
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { InfoIcon } from './icons/Icons';

const About: React.FC = () => {
    const t = useTranslations();
    return (
        <section id="about" className="py-16 bg-white dark:bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <InfoIcon className="h-12 w-12 mx-auto text-primary"/>
                    <h2 className="text-3xl font-bold text-secondary dark:text-white mt-4">{t.aboutTitle}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {t.aboutText}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
