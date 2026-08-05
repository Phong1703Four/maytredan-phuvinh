import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { Languages, Check, ChevronDown } from 'lucide-react';

const LANGS = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', short: 'VI' },
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
    { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
    { code: 'zh', label: '中文', flag: '🇨🇳', short: 'ZH' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'RU' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭', short: 'TH' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', short: 'HI' },
    { code: 'ja', label: '日本語', flag: '🇯🇵', short: 'JA' },
    { code: 'ko', label: '한국어', flag: '🇰🇷', short: 'KO' },
];

export default function LanguageToggle() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const current = LANGS.find(l => l.code === lang) || LANGS[0];

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle language"
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all text-sm font-bold"
            >
                <Languages className="w-4 h-4" />
                <span className="text-base leading-none">{current.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div
                    className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 origin-top-right"
                    style={{ animation: 'fadeInUp 0.15s ease-out' }}
                >
                    {LANGS.map(l => (
                        <button
                            key={l.code}
                            onClick={() => { setLang(l.code); setOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-accent transition-colors ${lang === l.code ? 'text-primary font-bold bg-primary/5' : 'text-foreground'
                                }`}
                        >
                            <span className="text-base">{l.flag}</span>
                            <span>{l.label}</span>
                            {lang === l.code && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}