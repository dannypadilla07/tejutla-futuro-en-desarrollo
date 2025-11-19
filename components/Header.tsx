
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslations } from '../hooks/useTranslations';
import { LogoIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from './icons/Icons';

interface HeaderProps {
    onOpenSurvey: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSurvey }) => {
    const { theme, toggleTheme, language, toggleLanguage } = useContext(AppContext);
    const t = useTranslations();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about', text: t.navAbout },
        { href: '#sections', text: t.navSections },
        { href: '#feedback', text: t.navFeedback },
        { href: '#results', text: t.navResults },
        { href: '#faq', text: t.navFAQ },
        { href: '#contact', text: t.navContact },
    ];

    return (
        <header className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-3">
                    <LogoIcon className="h-10 w-10 text-primary" />
                    <span className="text-xl font-bold text-secondary dark:text-white hidden sm:block">{t.siteTitle}</span>
                </a>

                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors">{link.text}</a>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={onOpenSurvey} className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow">
                        {t.heroCTA}
                    </button>
                    <button onClick={toggleLanguage} className="text-secondary dark:text-gray-300 font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {t.navLang}
                    </button>
                    <button onClick={toggleTheme} aria-label="Toggle theme" className="text-secondary dark:text-gray-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                    </button>
                    <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-dark-bg py-4 px-6 absolute w-full shadow-lg">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent" onClick={() => setIsMenuOpen(false)}>{link.text}</a>
                    ))}
                     <button onClick={() => { onOpenSurvey(); setIsMenuOpen(false); }} className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow">
                        {t.heroCTA}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
