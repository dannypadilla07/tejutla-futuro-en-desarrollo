
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Toast from './Toast';

const OpenFeedback: React.FC = () => {
  const t = useTranslations();
  const [feedback, setFeedback] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
        setToastMessage("Debes aceptar los términos.");
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
        }),
      });

      if (response.ok) {
        setFeedback('');
        setConsent(false);
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

  return (
    <section id="feedback" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary dark:text-white">{t.feedbackTitle}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.feedbackSubtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto">
          <div>
            <label htmlFor="feedback-textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.feedbackLabel}</label>
            <textarea
              id="feedback-textarea"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t.feedbackPlaceholder}
              className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-4"
              required
            />
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
