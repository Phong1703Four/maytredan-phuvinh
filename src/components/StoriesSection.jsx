import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Rocket, Home as HomeIcon, Award, Leaf, ExternalLink, X, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const STORIES = [
    { key: 'story1', icon: User, link: 'https://baotangdantochoc.vn', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', tagColor: 'text-amber-600 bg-amber-100' },
    { key: 'story2', icon: BookOpen, link: 'https://hanoimoi.vn', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', tagColor: 'text-emerald-700 bg-emerald-100' },
    { key: 'story3', icon: Rocket, link: 'https://vnexpress.net', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', tagColor: 'text-blue-600 bg-blue-100' },
    { key: 'story4', icon: HomeIcon, link: 'https://tuoitre.vn', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', tagColor: 'text-rose-600 bg-rose-100' },
    { key: 'story5', icon: Award, link: 'https://nhandan.vn', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', tagColor: 'text-purple-600 bg-purple-100' },
    { key: 'story6', icon: Leaf, link: 'https://baovemoitruong.vn', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', tagColor: 'text-teal-600 bg-teal-100' }
];

export default function StoriesSection() {
    const { t } = useLang();
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="stories" className="py-24 relative bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <p className="text-center text-muted-foreground italic mb-3">{t('stories.quote')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4">{t('stories.title')}</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-emerald-400 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {STORIES.map((story, i) => {
                        const Icon = story.icon;
                        const isOpen = expanded === i;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -4 }}
                                className={`group rounded-2xl border transition-all duration-300 overflow-hidden
                ${isOpen ? `${story.bg} ${story.border} shadow-xl` : 'bg-card border-border hover:border-primary/30 hover:shadow-lg'}`}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${story.tagColor}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${story.tagColor}`}>{t(`${story.key}.tag`)}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{t(`${story.key}.title`)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t(`${story.key}.desc`)}</p>
                                    {isOpen && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3 pt-3 border-t border-current/10 space-y-3 overflow-hidden">
                                            <p className="text-sm text-foreground/80 leading-relaxed">{t(`${story.key}.full`)}</p>
                                            <a href={story.link} target="_blank" rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${story.color} hover:underline`}>
                                                <ExternalLink className="w-3.5 h-3.5" /> {t(`${story.key}.link`)}
                                            </a>
                                        </motion.div>
                                    )}
                                    <button onClick={() => setExpanded(isOpen ? null : i)}
                                        className={`flex items-center gap-1 text-sm font-medium transition-all mt-3 ${story.color}`}>
                                        {isOpen ? <><X className="w-3.5 h-3.5" /> {t('stories.collapse')}</> : <><ChevronRight className="w-3.5 h-3.5" /> {t('stories.readMore')}</>}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}