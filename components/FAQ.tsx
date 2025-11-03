
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { QuestionMarkCircleIcon, ChevronDownIcon } from './icons/Icons';

const FAQItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-secondary dark:text-white">{q}</span>
                <ChevronDownIcon className={`h-6 w-6 text-primary transform transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-600 dark:text-gray-300">
                    <p>{a}</p>
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC = () => {
    const t = useTranslations();
    return (
        <section id="faq" className="py-20 bg-white dark:bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <QuestionMarkCircleIcon className="h-12 w-12 mx-auto text-primary"/>
                    <h2 className="text-3xl font-bold text-secondary dark:text-white mt-4">{t.faqTitle}</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    {t.faqs.map((faq, index) => (
                        <FAQItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
