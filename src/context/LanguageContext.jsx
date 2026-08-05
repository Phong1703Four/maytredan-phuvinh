import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try { return localStorage.getItem('lang') || 'vi'; }
        catch { return 'vi'; }
    });

    useEffect(() => {
        try { localStorage.setItem('lang', lang); } catch { }
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key) => translations[lang]?.[key] ?? (['fr', 'de', 'it', 'no'].includes(lang) ? translations.en[key] : translations.vi[key]) ?? key;
    const toggle = () => setLang(l => (l === 'vi' ? 'en' : l === 'en' ? 'es' : l === 'es' ? 'fr' : l === 'fr' ? 'de' : l === 'de' ? 'it' : l === 'it' ? 'no' : l === 'no' ? 'zh' : l === 'zh' ? 'ru' : l === 'ru' ? 'th' : l === 'th' ? 'hi' : l === 'hi' ? 'ja' : l === 'ja' ? 'ko' : 'vi'));

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLang = () => useContext(LanguageContext);