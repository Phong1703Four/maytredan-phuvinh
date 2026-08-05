import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, TrendingUp, Sparkles, Gift, Crown, Check, Coins, ChevronRight } from 'lucide-react';
import { TIERS, getPoints, REDEEMABLE_VOUCHERS, VOUCHER_CODES } from '../../lib/membership';
import { useAuthUser } from '../../context/AuthUserContext';
import { base44 } from '@/api/base44Client';

const TIER_KEYS = ['bronze', 'silver', 'gold', 'diamond'];

export default function MembershipModal({ onClose }) {
    const authCtx = useAuthUser() || {};
    const userProfile = authCtx?.userProfile;
    const refreshProfile = authCtx?.refreshProfile || (() => { });
    const user = authCtx?.user;
    const currentTier = userProfile?.membership_tier || 'bronze';
    const totalOrders = userProfile?.total_orders || 0;
    const totalSpent = userProfile?.total_spent || 0;
    const points = getPoints(totalSpent, currentTier);
    const redeemedVouchers = userProfile?.vouchers || [];

    const [tab, setTab] = useState('overview');
    const [redeeming, setRedeeming] = useState(null);

    const tierIdx = TIER_KEYS.indexOf(currentTier);
    const nextTierKey = TIER_KEYS[tierIdx + 1];
    const nextTierInfo = nextTierKey ? TIERS[nextTierKey] : null;
    const currentTierInfo = TIERS[currentTier];
    const ordersToNext = nextTierInfo ? nextTierInfo.minOrders - totalOrders : 0;
    const progress = nextTierInfo ? Math.min(100, (totalOrders / nextTierInfo.minOrders) * 100) : 100;

    const handleRedeem = async (code) => {
        const v = VOUCHER_CODES[code];
        if (points < v.points_cost) return;
        setRedeeming(code);
        try {
            const newVouchers = [...redeemedVouchers, { code, redeemed_date: new Date().toISOString() }];
            await base44.entities.UserProfile.update(userProfile.id, { vouchers: newVouchers });
            await refreshProfile(user?.email);
        } catch (e) {
            console.error(e);
        } finally {
            setRedeeming(null);
        }
    };

    const isRedeemed = (code) => redeemedVouchers.some(v => (typeof v === 'string' ? v === code : v.code === code));

    return (
        <motion.div
            className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative w-full max-w-lg bg-white dark:bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={`bg-gradient-to-r ${currentTierInfo.color} px-5 py-5 text-white flex-shrink-0`}>
                    <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors z-10">
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">{currentTierInfo.emoji}</div>
                        <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">Hạng thành viên</p>
                            <p className="text-2xl font-bold">{currentTierInfo.name}</p>
                            <p className="text-white/80 text-sm">{totalOrders} đơn · {totalSpent?.toLocaleString('vi-VN')}đ đã chi</p>
                        </div>
                    </div>
                    {/* Points badge */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 backdrop-blur w-fit">
                        <Coins className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm font-bold">{points} điểm tích lũy</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border flex-shrink-0">
                    {[
                        { id: 'overview', label: 'Tổng quan', icon: Star },
                        { id: 'benefits', label: 'Đặc quyền', icon: Crown },
                        { id: 'redeem', label: 'Đổi điểm', icon: Gift },
                    ].map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors ${tab === t.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                            <t.icon className="w-3.5 h-3.5" /> {t.label}
                        </button>
                    ))}
                </div>

                <div className="overflow-y-auto flex-1 p-5">
                    {tab === 'overview' && (
                        <div className="space-y-4">
                            {/* Progress to next tier */}
                            {nextTierInfo ? (
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-primary" />
                                        <p className="text-sm font-bold text-primary">
                                            Cần thêm {ordersToNext} đơn để lên {nextTierInfo.emoji} {nextTierInfo.name}
                                        </p>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className={`h-full bg-gradient-to-r ${nextTierInfo.color} rounded-full flex items-center justify-end pr-2`}>
                                            <span className="text-[10px] text-white font-bold">{Math.round(progress)}%</span>
                                        </motion.div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5">{totalOrders}/{nextTierInfo.minOrders} đơn hàng</p>
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 text-center">
                                    <Crown className="w-8 h-8 text-cyan-500 mx-auto mb-1" />
                                    <p className="text-sm font-bold text-cyan-700">Bạn đã đạt hạng cao nhất! 👑</p>
                                </div>
                            )}

                            {/* All tiers */}
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tất cả hạng thành viên</p>
                                {TIER_KEYS.map((key, i) => {
                                    const t = TIERS[key];
                                    const isActive = key === currentTier;
                                    const isPassed = i < tierIdx;
                                    return (
                                        <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                      ${isActive ? `${t.bg} ${t.border} shadow-sm` : isPassed ? 'bg-muted/50 border-border opacity-70' : 'bg-card border-border'}`}>
                                            <span className="text-xl">{t.emoji}</span>
                                            <div className="flex-1">
                                                <p className={`text-sm font-bold ${isActive ? t.text : 'text-foreground'}`}>{t.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {t.minOrders === 0 ? 'Mặc định' : `Từ ${t.minOrders} đơn`}
                                                    {t.discount > 0 ? ` · Giảm ${t.discount}%` : ''}
                                                    {t.freeship ? ' · Freeship' : ''}
                                                </p>
                                            </div>
                                            {isActive && <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-semibold">Hiện tại</span>}
                                            {isPassed && <Check className="w-4 h-4 text-green-500" />}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {tab === 'benefits' && (
                        <div className="space-y-3">
                            <div className={`p-4 rounded-2xl ${currentTierInfo.bg} border ${currentTierInfo.border} mb-3`}>
                                <p className={`text-sm font-bold ${currentTierInfo.text} flex items-center gap-2`}>
                                    <Crown className="w-4 h-4" /> Đặc quyền hạng {currentTierInfo.name}
                                </p>
                            </div>
                            {currentTierInfo.benefits.map((b, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm text-foreground font-medium">{b}</span>
                                </motion.div>
                            ))}
                            {/* Points multiplier */}
                            <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 mt-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Coins className="w-4 h-4 text-yellow-500" />
                                    <p className="text-sm font-bold text-yellow-700">Tích điểm {currentTierInfo.points_per_1000}x</p>
                                </div>
                                <p className="text-xs text-yellow-600">Mỗi 1.000đ chi tiêu = {currentTierInfo.points_per_1000} điểm</p>
                            </div>
                        </div>
                    )}

                    {tab === 'redeem' && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 border border-yellow-200">
                                <div className="flex items-center gap-2">
                                    <Coins className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-bold text-yellow-700">Điểm của bạn</span>
                                </div>
                                <span className="text-lg font-black text-yellow-600">{points}</span>
                            </div>
                            {REDEEMABLE_VOUCHERS.map(code => {
                                const v = VOUCHER_CODES[code];
                                const redeemed = isRedeemed(code);
                                const canRedeem = points >= v.points_cost && !redeemed;
                                return (
                                    <div key={code} className={`p-4 rounded-2xl border-2 ${redeemed ? 'border-green-300 bg-green-50' : 'border-dashed border-amber-300 bg-amber-50/50'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                <Gift className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-amber-800 text-sm">{code}</p>
                                                <p className="text-xs text-amber-600 mt-0.5">{v.label}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
                                                <p className="text-xs text-yellow-600 mt-1">Đổi: {v.points_cost} điểm · Tối thiểu {v.min_spend?.toLocaleString('vi-VN')}đ</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleRedeem(code)} disabled={!canRedeem}
                                            className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                      ${redeemed ? 'bg-green-500 text-white' : canRedeem ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                                            {redeeming === code ? 'Đang đổi...' : redeemed ? <><Check className="w-3.5 h-3.5" /> Đã đổi</> : canRedeem ? <><Sparkles className="w-3.5 h-3.5" /> Đổi ngay</> : `Cần ${v.points_cost} điểm`}
                                        </button>
                                    </div>
                                );
                            })}
                            <p className="text-xs text-muted-foreground text-center pt-2">Đổi điểm lấy voucher — voucher sẽ xuất hiện trong "Voucher của tôi"</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}