
import { createContext } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'es' | 'en';

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

export const AppContext = createContext<AppContextType>({
  theme: 'light',
  toggleTheme: () => {},
  language: 'es',
  toggleLanguage: () => {},
});
