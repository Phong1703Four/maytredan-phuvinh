import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Lock, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../../context/LanguageContext';



const TIER_MAP = { starter: 'silver', premium: 'gold', elite: 'diamond' };
const TIER_LABEL = { starter: 'membership.starter', premium: 'membership.premium', elite: 'membership.elite' };
const TIER_PRICE = { starter: 'membership.starterPrice', premium: 'membership.premiumPrice', elite: 'membership.elitePrice' };

export default function MembershipSignupModal({ tier, onClose }) {
    const [status, setStatus] = useState('form'); // form | processing | success | needLogin

    const handleConfirm = async () => {
        setStatus('processing');
        try {
            const me = await base44.auth.me();
            if (!me) { setStatus('needLogin'); return; }

            const profiles = await base44.entities.UserProfile.filter({ user_email: me.email });
            const tierValue = TIER_MAP[tier] || 'silver';

            if (profiles.length > 0) {
                await base44.entities.UserProfile.update(profiles[0].id, { membership_tier: tierValue });
            } else {
                await base44.entities.UserProfile.create({
                    user_email: me.email,
                    full_name: me.full_name || '',
                    membership_tier: tierValue,
                    total_orders: 0,
                    total_spent: 0,
                });
            }
            setStatus('success');
        } catch (err) {
            console.error('Membership signup error:', err);
            setStatus('needLogin');
        }
    };

    const handleLogin = () => {
        base44.auth.redirectToLogin(window.location.pathname);
    };

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    className="relative w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10">
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {status === 'form' && (
                        <div className="p-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center mb-4">
                                <Sparkles className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{t('title')}</h3>
                            <p className="text-sm text-muted-foreground mb-6">{t('secure')}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <span className="text-sm text-muted-foreground">{t('tier')}</span>
                                    <span className="font-bold text-foreground">{t(TIER_LABEL[tier])}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <span className="text-sm text-muted-foreground">{t('price')}</span>
                                    <span className="font-bold text-primary text-lg">{t(TIER_PRICE[tier])} <span className="text-xs font-normal text-muted-foreground">{t('period')}</span></span>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-4 text-center">{t('methods')}</p>

                            <div className="flex gap-3">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                                    {t('cancel')}
                                </button>
                                <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                                    {t('confirm')}
                                    {t('membership.confirm')}
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'processing' && (
                        <div className="p-8 text-center flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                            <h3 className="text-lg font-bold text-foreground">{t('processing')}</h3>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="p-8 text-center flex flex-col items-center justify-center py-10">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{t('success')}</h3>
                            <p className="text-sm text-muted-foreground mb-6">{t('successDesc')}</p>
                            <button onClick={onClose} className="w-full py-3 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                                {t('close')}
                            </button>
                        </div>
                    )}

                    {status === 'needLogin' && (
                        <div className="p-8 text-center flex flex-col items-center justify-center py-10">
                            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{t('user.login')}</h3>
                            <p className="text-sm text-muted-foreground mb-6">{t('needLogin')}</p>
                            <div className="flex gap-3 w-full">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                                    {t('cancel')}
                                </button>
                                <button onClick={handleLogin} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
                                    {t('login')}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}