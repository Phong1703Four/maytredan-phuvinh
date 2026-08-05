import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Gift, Copy, CheckCircle2, Coins, Clock, Info, Sparkles, ChevronRight } from 'lucide-react';
import { TIERS, VOUCHER_CODES, REDEEMABLE_VOUCHERS, getPoints, getNextTier } from '../../lib/membership';
import { useAuthUser } from '../../context/AuthUserContext';

export default function MyVouchersModal({ onClose }) {
    const authCtx = useAuthUser() || {};
    const userProfile = authCtx?.userProfile;
    const tier = userProfile?.membership_tier || 'bronze';
    const tierInfo = TIERS[tier];
    const totalSpent = userProfile?.total_spent || 0;
    const points = getPoints(totalSpent, tier);
    const tierVouchers = tierInfo?.vouchers || [];
    const redeemedVouchers = (userProfile?.vouchers || []).map(v => (typeof v === 'string' ? v : v.code));
    const allVouchers = [...tierVouchers, ...redeemedVouchers.filter(c => !tierVouchers.includes(c))];
    const [copied, setCopied] = useState('');

    const copy = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(''), 2000);
    };

    const nextTier = getNextTier(tier);
    const nextTierInfo = nextTier ? TIERS[nextTier] : null;
    const upcomingVouchers = nextTierInfo?.vouchers?.filter(c => !allVouchers.includes(c)) || [];

    return (
        <motion.div
            className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative w-full max-w-md bg-white dark:bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-white" />
                        <h2 className="text-white font-bold">Voucher Của Tôi</h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-5 space-y-4">
                    {/* Tier + points summary */}
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${tierInfo.bg} border ${tierInfo.border}`}>
                        <span className="text-2xl">{tierInfo.emoji}</span>
                        <div className="flex-1">
                            <p className={`text-sm font-bold ${tierInfo.text}`}>Hạng {tierInfo.name}</p>
                            <p className="text-xs text-muted-foreground">Tổng {userProfile?.total_orders || 0} đơn hàng</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-100 border border-yellow-300">
                            <Coins className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs font-bold text-yellow-700">{points}</span>
                        </div>
                    </div>

                    {/* Active vouchers */}
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" /> Voucher đang có ({allVouchers.length})
                        </p>
                        {allVouchers.length === 0 ? (
                            <div className="text-center py-6 space-y-2">
                                <Gift className="w-10 h-10 text-gray-200 mx-auto" />
                                <p className="text-sm text-gray-400">Chưa có voucher. Mua thêm để lên hạng nhận ưu đãi!</p>
                                <p className="text-xs text-primary">🥈Bạc (3 đơn) · 🥇Vàng (8 đơn) · 💎KimCương (20 đơn)</p>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {allVouchers.map((code, i) => {
                                    const v = VOUCHER_CODES[code];
                                    if (!v) return null;
                                    const isRedeemed = redeemedVouchers.includes(code) && !tierVouchers.includes(code);
                                    return (
                                        <motion.div key={code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                            className="relative flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50">
                                            {isRedeemed && (
                                                <span className="absolute -top-2 right-3 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">Đã đổi điểm</span>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-bold text-amber-700 text-base tracking-widest">{code}</p>
                                                <p className="text-xs text-amber-600">{v?.label || 'Giảm giá đặc biệt'}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{v?.desc}</p>
                                            </div>
                                            <button onClick={() => copy(code)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                        ${copied === code ? 'bg-green-500 text-white' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                                                {copied === code ? <><CheckCircle2 className="w-3 h-3" /> Đã sao!</> : <><Copy className="w-3 h-3" /> Sao chép</>}
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Upcoming vouchers (next tier preview) */}
                    {upcomingVouchers.length > 0 && (
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <p className="text-xs font-bold text-muted-foreground">Sắp có khi lên {nextTierInfo.emoji} {nextTierInfo.name}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {upcomingVouchers.map(code => (
                                    <span key={code} className="px-2.5 py-1 rounded-lg bg-card border border-border text-xs text-muted-foreground font-mono">
                                        {code}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Usage tip */}
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-600">
                            Nhập mã voucher tại bước thanh hàng để áp dụng giảm giá. Mỗi mã chỉ dùng 1 lần cho 1 đơn hàng.
                        </p>
                    </div>

                    {/* CTA to membership */}
                    <div className="text-center pt-1">
                        <p className="text-xs text-muted-foreground">Muốn nhiều voucher hơn?</p>
                        <p className="text-xs text-primary font-semibold mt-0.5">Xem "Hạng thành viên" để đổi điểm lấy voucher ✨</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}