import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Check, Search, X, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import FlagIcon from './FlagIcon';

const LANGS = [
    { code: 'vi', native: 'Tiếng Việt', en: 'Vietnamese', short: 'VI' },
    { code: 'en', native: 'English', en: 'English', short: 'EN' },
    { code: 'es', native: 'Español', en: 'Spanish', short: 'ES' },
    { code: 'fr', native: 'Français', en: 'French', short: 'FR' },
    { code: 'de', native: 'Deutsch', en: 'German', short: 'DE' },
    { code: 'it', native: 'Italiano', en: 'Italian', short: 'IT' },
    { code: 'no', native: 'Norsk', en: 'Norwegian', short: 'NO' },
    { code: 'zh', native: '中文（简体）', en: 'Chinese', short: 'ZH' },
    { code: 'ja', native: '日本語', en: 'Japanese', short: 'JA' },
    { code: 'ko', native: '한국어', en: 'Korean', short: 'KO' },
    { code: 'th', native: 'ไทย', en: 'Thai', short: 'TH' },
    { code: 'hi', native: 'हिन्दी', en: 'Hindi', short: 'HI' },
    { code: 'ru', native: 'Русский', en: 'Russian', short: 'RU' },
];

export default function LanguageCenter() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [focusIdx, setFocusIdx] = useState(0);
    const searchRef = useRef(null);
    const listRef = useRef(null);

    const current = useMemo(() => LANGS.find(l => l.code === lang) || LANGS[0], [lang]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return LANGS;
        return LANGS.filter(l =>
            l.native.toLowerCase().includes(q) ||
            l.en.toLowerCase().includes(q) ||
            l.short.toLowerCase().includes(q)
        );
    }, [query]);

    useEffect(() => { setFocusIdx(0); }, [query, open]);

    useEffect(() => {
        if (open) {
            setQuery('');
            setTimeout(() => searchRef.current?.focus(), 200);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') { setOpen(false); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIdx(i => Math.min(i + 1, filtered.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIdx(i => Math.max(i - 1, 0)); }
            if (e.key === 'Enter' && filtered[focusIdx]) { e.preventDefault(); selectLang(filtered[focusIdx].code); }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, filtered, focusIdx]);

    // Scroll focused item into view
    useEffect(() => {
        if (!open || !listRef.current) return;
        const el = listRef.current.querySelector(`[data-idx="${focusIdx}"]`);
        el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, [focusIdx, open]);

    const selectLang = (code) => {
        setLang(code);
        setTimeout(() => setOpen(false), 180);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label="Language Center"
                className="flex items-center gap-1.5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
            >
                <Languages className="w-[18px] h-[18px]" />
                <span className="text-xs font-bold leading-none hidden sm:block">{current.short}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
                        onClick={() => setOpen(false)}
                    >
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md bg-card/95 backdrop-blur-2xl rounded-3xl border border-border/60 shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-5 pt-5 pb-3 border-b border-border/40">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" />
                                        Language Center
                                    </h2>
                                    <button onClick={() => setOpen(false)} className="p-1.5 rounded-xl hover:bg-accent text-muted-foreground transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        ref={searchRef}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search language…"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/60 border border-border/50 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
                                {filtered.length === 0 ? (
                                    <p className="text-center text-sm text-muted-foreground py-8">No language found</p>
                                ) : (
                                    filtered.map((l, i) => {
                                        const active = l.code === lang;
                                        return (
                                            <button
                                                key={l.code}
                                                data-idx={i}
                                                onClick={() => selectLang(l.code)}
                                                onMouseEnter={() => setFocusIdx(i)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200
                          ${active ? 'bg-primary/10 ring-1 ring-primary/30' : focusIdx === i ? 'bg-accent' : 'hover:bg-accent/60'}`}
                                            >
                                                <div className="w-9 h-6 rounded-md overflow-hidden flex-shrink-0 shadow-sm" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
                                                    <FlagIcon code={l.code} className="w-full h-full" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground truncate">{l.native}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{l.en}</p>
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground/60 px-1.5 py-0.5 rounded bg-muted">{l.short}</span>
                                                {active && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="px-5 py-2.5 border-t border-border/40 text-[10px] text-muted-foreground/60 text-center">
                                ↑ ↓ to navigate · Enter to select · Esc to close
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}