import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Crown, Sparkles, Gift, Zap, Shield, Star, ChevronDown, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import MembershipSignupModal from '../components/user/MembershipSignupModal';

const TIERS = [
    {
        id: 'starter',
        nameKey: 'membership.starter',
        priceKey: 'membership.starterPrice',
        icon: Zap,
        color: 'from-teal-500 to-cyan-600',
        border: 'border-teal-400/40',
        bg: 'bg-teal-50/50',
        text: 'text-teal-700',
        glow: 'shadow-teal-500/20',
        popular: false,
        benefits: ['membership.benefit1', 'membership.benefit2', 'membership.benefit3'],
    },
    {
        id: 'premium',
        nameKey: 'membership.premium',
        priceKey: 'membership.premiumPrice',
        icon: Star,
        color: 'from-violet-500 to-purple-600',
        border: 'border-violet-400/40',
        bg: 'bg-violet-50/50',
        text: 'text-violet-700',
        glow: 'shadow-violet-500/30',
        popular: true,
        benefits: ['membership.benefit4', 'membership.benefit5', 'membership.benefit6', 'membership.benefit3'],
    },
    {
        id: 'elite',
        nameKey: 'membership.elite',
        priceKey: 'membership.elitePrice',
        icon: Crown,
        color: 'from-amber-500 to-yellow-600',
        border: 'border-amber-400/60',
        bg: 'bg-amber-50/50',
        text: 'text-amber-700',
        glow: 'shadow-amber-500/40',
        popular: false,
        elite: true,
        benefits: ['membership.benefit7', 'membership.benefit8', 'membership.benefit9', 'membership.benefit10', 'membership.benefit11', 'membership.benefit12'],
    },
];

const COMPARISON_ROWS = [
    { label_vi: 'Giảm giá', label_en: 'Discount', starter: '5%', premium: '10%', elite: '15%' },
    { label_vi: 'Freeship', label_en: 'Free shipping', starter: '—', premium: '✓', elite: '✓' },
    { label_vi: 'Hệ số điểm', label_en: 'Points multiplier', starter: '1x', premium: '2x', elite: '3x' },
    { label_vi: 'Tư vấn thiết kế', label_en: 'Design consult', starter: '—', premium: '✓', elite: 'Riêng biệt' },
    { label_vi: 'Quà tặng hàng năm', label_en: 'Annual gift', starter: '—', premium: '—', elite: '✓' },
    { label_vi: 'Bảo hành', label_en: 'Warranty', starter: '12 tháng', premium: '24 tháng', elite: 'Trọn đời' },
    { label_vi: 'Ưu tiên sản xuất', label_en: 'Priority production', starter: '—', premium: '✓', elite: 'Cao nhất' },
];

const FAQS = [
    { qKey: 'membership.faq1', aKey: 'membership.faq1a' },
    { qKey: 'membership.faq2', aKey: 'membership.faq2a' },
    { qKey: 'membership.faq3', aKey: 'membership.faq3a' },
];

export default function MembershipPage() {
    const navigate = useNavigate();
    const { t, lang } = useLang();
    const [openFaq, setOpenFaq] = useState(0);
    const [selectedTier, setSelectedTier] = useState(null);
    const [signupTier, setSignupTier] = useState(null);

    const tr = (vi, en) => lang === 'vi' ? vi : en;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pb-20">
            {/* Top bar */}
            <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                    <ArrowLeft className="w-4 h-4" /> {t('membership.back')}
                </button>
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" /> {t('membership.title')}
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">DEMO</span>
                </h1>
            </div>

            {/* Hero */}
            <div className="relative overflow-hidden py-16 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-br from-amber-200/20 via-violet-200/10 to-teal-200/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" /> {t('membership.badge') || t('membership.title')}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
                            {t('membership.title')}
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">{t('membership.subtitle')}</p>
                    </motion.div>
                </div>
            </div>

            {/* Tier cards */}
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-3 gap-5 mb-16">
                    {TIERS.map((tier, i) => (
                        <motion.div key={tier.id}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative p-6 rounded-3xl border-2 ${tier.border} ${tier.bg} backdrop-blur-sm transition-all duration-300 ${tier.elite ? 'shadow-xl ' + tier.glow + ' animate-glow' : 'hover:shadow-lg ' + tier.glow}`}>
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold shadow-lg whitespace-nowrap">
                                    ⭐ {t('membership.recommended')}
                                </div>
                            )}
                            {tier.elite && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold shadow-lg whitespace-nowrap">
                                    👑 Heritage Elite
                                </div>
                            )}

                            <div className="text-center mb-6 mt-2">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg mx-auto mb-4`}>
                                    <tier.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className={`text-xl font-bold ${tier.text}`}>{t(tier.nameKey)}</h3>
                                <div className="flex items-baseline justify-center gap-1 mt-2">
                                    <span className="text-3xl font-black text-foreground">{t(tier.priceKey)}</span>
                                    <span className="text-sm text-muted-foreground">{t('membership.per3months')}</span>
                                </div>
                            </div>

                            <ul className="space-y-2.5 mb-6">
                                {tier.benefits.map((bk, bi) => (
                                    <li key={bi} className="flex items-start gap-2 text-sm text-foreground">
                                        <Check className={`w-4 h-4 ${tier.text} flex-shrink-0 mt-0.5`} />
                                        <span>{t(bk)}</span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={() => setSignupTier(tier.id)}
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                ${tier.elite
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg hover:shadow-amber-500/40'
                                        : tier.popular
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/40'
                                            : `bg-gradient-to-r ${tier.color} text-white hover:shadow-lg`}`}>
                                {t('membership.signup')} <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison table */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                    <h3 className="text-2xl font-bold text-center mb-6">{t('membership.compareTitle')}</h3>
                    <div className="overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary/50">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">{tr('Quyền lợi', 'Benefit')}</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-teal-600">{t('membership.starter')}</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-violet-600 bg-violet-50/30">{t('membership.premium')} ⭐</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-amber-600">{t('membership.elite')} 👑</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={i} className={i % 2 ? 'bg-secondary/20' : ''}>
                                        <td className="px-4 py-3 text-sm text-muted-foreground font-medium">{lang === 'vi' ? row.label_vi : row.label_en}</td>
                                        <td className="px-4 py-3 text-center text-sm text-foreground">{row.starter}</td>
                                        <td className="px-4 py-3 text-center text-sm text-foreground bg-violet-50/20 font-semibold">{row.premium}</td>
                                        <td className="px-4 py-3 text-center text-sm text-amber-700 font-bold">{row.elite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* FAQ */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-6">{t('membership.faqTitle')}</h3>
                    <div className="space-y-3">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    className="w-full flex items-center justify-between px-5 py-4 text-left">
                                    <span className="text-sm font-semibold text-foreground">{t(faq.qKey)}</span>
                                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                                        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{t(faq.aKey)}</p>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Payment area */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-card to-amber-50/30 border border-primary/20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{t('membership.paymentTitle')}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{tr('Thanh toán an toàn qua chuyển khoản, Momo, ZaloPay, VNPay', 'Secure payment via bank transfer, Momo, ZaloPay, VNPay')}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['🏦 Bank', '📱 Momo', '💚 ZaloPay', '💳 VNPay', '🍎 Apple Pay'].map((m, i) => (
                            <span key={i} className="px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground">{m}</span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {signupTier && (
                <MembershipSignupModal tier={signupTier} onClose={() => setSignupTier(null)} />
            )}
        </div>
    );
}