import React, { useState, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Toast from './Toast';
import GeminiIdeaGenerator from './GeminiIdeaGenerator';
import { ChevronDownIcon } from './icons/Icons';

const OpenFeedback: React.FC = () => {
  const t = useTranslations();
  const [feedback, setFeedback] = useState('');
  const [consent, setConsent] = useState(false);
  const [category, setCategory] = useState('Suggestion');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const feedbackTextareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 500;
  
  const handleIdeaSelected = (idea: string) => {
    setFeedback(idea);
    setIsGeneratorOpen(false);
    if (feedbackTextareaRef.current) {
        feedbackTextareaRef.current.focus();
        feedbackTextareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
        setToastMessage(t.consentError);
        setStatus('error');
        return;
    }
    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/yourid", { // TODO: Replace with your Formspree ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          consent,
          category,
        }),
      });

      if (response.ok) {
        setFeedback('');
        setConsent(false);
        setCategory('Suggestion');
        setToastMessage(t.formSuccess);
        setStatus('success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setToastMessage(t.formError);
      setStatus('error');
    }
  };
  
  const feedbackCategories = [
      { id: 'suggestion', value: 'Suggestion', label: t.feedbackCategorySuggestion },
      { id: 'complaint', value: 'Complaint', label: t.feedbackCategoryComplaint },
      { id: 'praise', value: 'Praise', label: t.feedbackCategoryPraise },
  ];

  return (
    <section id="feedback" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary dark:text-white">{t.feedbackTitle}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.feedbackSubtitle}</p>
        </div>
        
        <div className="max-w-2xl mx-auto my-8 bg-light-bg dark:bg-dark-bg rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <button 
                onClick={() => setIsGeneratorOpen(!isGeneratorOpen)}
                aria-expanded={isGeneratorOpen}
                className="w-full p-4 font-bold text-lg text-secondary dark:text-white cursor-pointer select-none flex items-center justify-between text-left"
            >
                <span>{t.geminiPromptTitle}</span>
                <ChevronDownIcon className={`h-6 w-6 text-primary transition-transform transform ${isGeneratorOpen ? 'rotate-180' : ''}`} />
            </button>
            {isGeneratorOpen && (
                <div className="p-4 pt-0">
                  <GeminiIdeaGenerator onIdeaSelected={handleIdeaSelected} />
                </div>
            )}
        </div>

        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.feedbackCategoryLabel}</label>
            <fieldset className="mt-2">
                <legend className="sr-only">Feedback category</legend>
                <div className="flex flex-wrap gap-y-2 gap-x-4">
                    {feedbackCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                            <input
                                id={cat.id}
                                name="feedback-category"
                                type="radio"
                                value={cat.value}
                                checked={category === cat.value}
                                onChange={(e) => setCategory(e.target.value)}
                                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <label htmlFor={cat.id} className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                                {cat.label}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
          </div>
          <div>
            <label htmlFor="feedback-textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.feedbackLabel}</label>
            <div className="relative mt-1">
              <textarea
                ref={feedbackTextareaRef}
                id="feedback-textarea"
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t.feedbackPlaceholder}
                className="block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-4 pr-16"
                required
                maxLength={MAX_CHARS}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400 select-none">
                {feedback.length}/{MAX_CHARS}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700 dark:text-gray-300">{t.consentLabel}</label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-secondary hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400"
            >
              {status === 'submitting' ? 'Enviando...' : t.feedbackSubmit}
            </button>
          </div>
        </form>
      </div>
      {(status === 'success' || status === 'error') && (
          <Toast message={toastMessage} type={status} onClose={() => setStatus('idle')} />
      )}
    </section>
  );
};

export default OpenFeedback;