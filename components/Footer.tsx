
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LogoIcon, ShareIcon, DownloadIcon } from './icons/Icons';

const Footer: React.FC = () => {
    const t = useTranslations();
    const [shareText, setShareText] = useState(t.share);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareText(t.copied);
        setTimeout(() => setShareText(t.share), 2000);
    };

    const handleDownload = () => {
        window.print();
    };

    return (
        <footer className="bg-secondary text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <LogoIcon className="h-12 w-12 text-accent" />
                            <span className="text-2xl font-bold">{t.siteTitle}</span>
                        </div>
                        <p className="text-gray-300">{t.footerContact}: (503) 1234-5678</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">{t.navSections}</h3>
                        <ul className="space-y-2 text-gray-300">
                            {t.sections.slice(0, 5).map(s => <li key={s.id}><a href="#sections" className="hover:text-accent">{s.title}</a></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Acciones</h3>
                        <div className="flex space-x-4">
                            <button onClick={handleShare} className="flex items-center space-x-2 bg-accent text-secondary px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                                <ShareIcon className="h-5 w-5"/>
                                <span>{shareText}</span>
                            </button>
                             <button onClick={handleDownload} className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                                <DownloadIcon className="h-5 w-5"/>
                                <span>{t.download}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-blue-800 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between">
                    <p>&copy; {new Date().getFullYear()} {t.siteTitle}. {t.footerCredits}</p>
                    <a href="#" className="hover:text-accent mt-2 md:mt-0">{t.footerPrivacy}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
