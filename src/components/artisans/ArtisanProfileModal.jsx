import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Package, Award, MapPin, ChevronLeft, MessageSquare, ShoppingBag, CheckCircle } from 'lucide-react';
import { getArtisanProfile } from '../../lib/artisanProfiles';
import { useLang } from '../../context/LanguageContext';

export default function ArtisanProfileModal({ artisan, onClose, onOrder }) {
    const { lang, t } = useLang();
    const profile = getArtisanProfile(artisan.id);
    const styleLabel = profile[`style_${lang}`] || profile.style_en || profile.style;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl scrollbar-hide"
                onClick={e => e.stopPropagation()}
            >
                {/* Header with avatar and key stats */}
                <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 px-6 pt-6 pb-5 text-white overflow-hidden">
                    <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 hover:bg-white/30 transition-colors z-10">
                        <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl flex-shrink-0">
                            <img src={artisan.avatar_url} alt={artisan.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold flex items-center gap-2 flex-wrap">
                                {artisan.name}
                                {artisan.available && <span className="text-xs bg-green-400/30 px-2 py-0.5 rounded-full border border-green-300/50">● {t('artisan.available')}</span>}
                            </h2>
                            <p className="text-white/80 text-sm mt-0.5">{artisan.specialty}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-white/90 flex-wrap">
                                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-300 fill-yellow-300" /> {artisan.rating}</span>
                                <span className="flex items-center gap-1"><Award className="w-3 h-3" /> {artisan.experience_years} yrs</span>
                                <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {artisan.total_orders}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {artisan.turnaround_days}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 space-y-5">
                    {/* Bio */}
                    <div>
                        <h3 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" /> {t('artisan.bio')}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{artisan.bio}</p>
                    </div>

                    {/* Style */}
                    <div>
                        <h3 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">{t('artisan.style')}</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-sm font-semibold">{styleLabel}</span>
                            {artisan.skills?.map((s, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & turnaround */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                            <p className="text-xs text-green-600 font-bold uppercase mb-1">💰 {t('artisan.refPrice')}</p>
                            <p className="text-sm font-bold text-green-700">{artisan.price_per_item}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                            <p className="text-xs text-blue-600 font-bold uppercase mb-1">⏱ {t('artisan.turnaround')}</p>
                            <p className="text-sm font-bold text-blue-700">{artisan.turnaround_days}</p>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div>
                        <h3 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5" /> {t('artisan.portfolio')}
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {profile.portfolio.map((img, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                                    className="aspect-square rounded-xl overflow-hidden border border-violet-100 hover:scale-105 hover:shadow-md transition-all cursor-pointer">
                                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Customer reviews */}
                    <div>
                        <h3 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> {t('artisan.reviews')} ({profile.reviews.length})
                        </h3>
                        <div className="space-y-3">
                            {profile.reviews.map((r, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                    className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-700">{r.name}</span>
                                            <div className="flex">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <Star key={j} className={`w-3 h-3 ${j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{r.date}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer with order button */}
                <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100 flex gap-3">
                    <button onClick={onClose} className="px-4 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors">
                        {t('artisan.close')}
                    </button>
                    <button onClick={onOrder} disabled={!artisan.available}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all disabled:opacity-50">
                        {artisan.available ? <><ShoppingBag className="w-4 h-4" /> {t('artisan.orderBtn')}</> : <>{t('artisan.unavail')}</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}