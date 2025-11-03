
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../constants/i18n';

export const useTranslations = () => {
  const { language } = useContext(AppContext);
  return translations[language];
};
