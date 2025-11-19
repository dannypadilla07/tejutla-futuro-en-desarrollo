import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Toast from './Toast';
import { MailIcon } from './icons/Icons';

const Contact: React.FC = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // TODO: Replace with your Formspree contact form ID
      const response = await fetch("https://formspree.io/f/your_contact_form_id", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setToastMessage(t.contactFormSuccess);
        setStatus('success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setToastMessage(t.contactFormError);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
            <MailIcon className="h-12 w-12 mx-auto text-primary"/>
            <h2 className="text-3xl font-bold text-secondary dark:text-white mt-4">{t.contactTitle}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.contactSubtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactNameLabel}</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contactNamePlaceholder}
              className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-3"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactEmailLabel}</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contactEmailPlaceholder}
              className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-3"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactSubjectLabel}</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t.contactSubjectPlaceholder}
              className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-3"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactMessageLabel}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contactMessagePlaceholder}
              className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-3"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 transition-colors"
            >
              {status === 'submitting' ? 'Enviando...' : t.contactSubmit}
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

export default Contact;
