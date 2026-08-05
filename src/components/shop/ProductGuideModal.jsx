import { motion } from 'framer-motion';
import { X, BookOpen, Clock, Ruler, Sparkles, Leaf, Package } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const fmt = (n) => n.toLocaleString('vi-VN') + 'đ';

const MATERIAL_ICONS = { bamboo: '🎋', rattan: '🌿', reed: '🌱' };

export default function ProductGuideModal({ product, onClose }) {
    const { t, lang } = useLang();

    const pName = () => lang === 'vi' ? product.name_vi : lang === 'en' ? product.name_en : lang === 'es' ? (product.name_es || product.name_en) : (product.name_zh || product.name_en);
    const guide = product.guide || {};
    const getText = (obj) => (obj ? (obj[lang] || obj.en || obj.vi || '') : '');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl scrollbar-hide"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative h-44 sm:h-52 overflow-hidden rounded-t-2xl">
                    <img src={product.image} alt={pName()} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur text-white hover:bg-red-500/60 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur border border-primary/30 text-primary text-xs font-bold mb-2">
                            <BookOpen className="w-3 h-3" /> {t('shop.guide')}
                        </span>
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{pName()}</h3>
                        <p className="text-sm text-white/80">{product.artisan}</p>
                    </div>
                </div>

                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                            <Ruler className="w-4 h-4 text-amber-600 mb-1" />
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase">{t('shop.dimensions')}</p>
                            <p className="text-sm font-bold text-foreground">{guide.dimensions || '—'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900">
                            <Clock className="w-4 h-4 text-teal-600 mb-1" />
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase">{t('shop.craftTime')}</p>
                            <p className="text-sm font-bold text-foreground">{guide.craftTime || '—'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900">
                            <Sparkles className="w-4 h-4 text-violet-600 mb-1" />
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase">{t('shop.sold')}</p>
                            <p className="text-sm font-bold text-foreground">{product.sold}</p>
                        </div>
                    </div>

                    {product.materials?.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                                <Package className="w-3.5 h-3.5" /> {t('shop.material')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {product.materials.map(m => (
                                    <span key={m} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                                        <span>{MATERIAL_ICONS[m] || '🌿'}</span>
                                        {t(`shop.mat.${m}`)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {getText(guide.story) && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                                <Leaf className="w-3.5 h-3.5" /> {t('shop.story')}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{getText(guide.story)}</p>
                        </div>
                    )}

                    {getText(guide.care) && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {t('shop.care')}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{getText(guide.care)}</p>
                        </div>
                    )}

                    {getText(guide.usage) && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> {t('shop.usageTips')}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{getText(guide.usage)}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">{t('shop.total')}</p>
                            <p className="text-xl font-bold text-primary">{fmt(product.price)}</p>
                        </div>
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg transition-all">
                            {t('shop.addToCart')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}