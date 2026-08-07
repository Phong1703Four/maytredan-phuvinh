import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Copy, CheckCircle2, Coins, Clock, Info, Sparkles, Crown, ChevronRight, Snowflake, ShoppingBag } from 'lucide-react';
import { TIERS, VOUCHER_CODES, getPoints, getNextTier } from '../lib/membership';
import { useAuthUser } from '../context/AuthUserContext';
import { useLang } from '../context/LanguageContext';

const VT = {
    vi: { activeTitle: 'Voucher đang có', empty: 'Chưa có voucher. Mua thêm để lên hạng nhận ưu đâi!', tierHint: '🥈Bạc (3 đơn) · 🥇Vàng (8 đơn) · 💎Kim Cương (20 đơn)', redeemed: 'Đã đổi điểm', special: 'Giảm giá đặc biệt', copied: 'Đã sao!', copy: 'Sao chép', upcoming: 'Sắp có khi lên', usageTip: 'Nhập mã voucher tại bước thanh toán để áp dụng giảm giá. Mỗi mã chỉ dùng 1 lần cho 1 đơn hàng.', wantMore: 'Muốn nhiều voucher hơn?', redeemHint: 'Đổi điểm tích lũy lấy voucher hoặc lên hạng để nhận ưu đãi mới', viewTier: 'Xem hạng thành viên', orders: 'đơn', spent: 'đã chi', points: 'điểm tích lũy', voucher: 'Voucher' },
    en: { activeTitle: 'Active vouchers', empty: 'No vouchers yet. Buy more to upgrade and get perks!', tierHint: '🥈Silver (3 orders) · 🥇Gold (8 orders) · 💎Diamond (20 orders)', redeemed: 'Redeemed', special: 'Special discount', copied: 'Copied!', copy: 'Copy', upcoming: 'Available at', usageTip: 'Enter the voucher code at checkout to apply the discount. Each code can be used once per order.', wantMore: 'Want more vouchers?', redeemHint: 'Redeem points for vouchers or upgrade your tier for new perks', viewTier: 'View membership tier', orders: 'orders', spent: 'spent', points: 'loyalty points', voucher: 'Voucher' },
    es: { activeTitle: 'Cupones activos', empty: 'Sin cupones. ¡Compra más para subir de nivel!', tierHint: '🥈Plata (3 pedidos) · 🥇Oro (8 pedidos) · 💎Diamante (20 pedidos)', redeemed: 'Canjeado', special: 'Descuento especial', copied: '¡Copiado!', copy: 'Copiar', upcoming: 'Disponible al subir a', usageTip: 'Introduce el código del cupón en el pago para aplicar el descuento. Cada código se usa una vez por pedido.', wantMore: '¿Quieres más cupones?', redeemHint: 'Canjea puntos por cupones o sube de nivel para nuevas ofertas', viewTier: 'Ver nivel de membresía', orders: 'pedidos', spent: 'gastado', points: 'puntos de fidelidad', voucher: 'Cupón' },
    zh: { activeTitle: '可用优惠券', empty: '暂无优惠券。购买更多以升级获取优惠！', tierHint: '🥈银 (3单) · 🥇金 (8单) · 💎钻石 (20单)', redeemed: '已兑换', special: '特别折扣', copied: '已复制！', copy: '复制', upcoming: '升级后可用', usageTip: '在结账时输入优惠券代码以应用折扣。每个代码每单限用一次。', wantMore: '想要更多优惠券？', redeemHint: '兑换积分获取优惠券或升级等级获取新优惠', viewTier: '查看会员等级', orders: '单', spent: '已消费', points: '积分', voucher: '优惠券' },
    ru: { activeTitle: 'Активные купоны', empty: 'Нет купонов. Покупайте больше, чтобы повысить уровень!', tierHint: '🥈Серебро (3 заказа) · 🥇Золото (8 заказов) · 💎Алмаз (20 заказов)', redeemed: 'Обменян', special: 'Специальная скидка', copied: 'Скопировано!', copy: 'Копировать', upcoming: 'Доступно при повышении до', usageTip: 'Введите код купона при оплате для применения скидки. Каждый код используется один раз за заказ.', wantMore: 'Хотите больше купонов?', redeemHint: 'Обменяйте баллы на купоны или повысьте уровень для новых привилегий', viewTier: 'Уровень членства', orders: 'заказов', spent: 'потрачено', points: 'баллов', voucher: 'Купон' },
    th: { activeTitle: 'คูปองที่ใช้ได้', empty: 'ยังไม่มีคูปอง ซื้อเพิ่มเพื่ออัปเกรด!', tierHint: '🥈เงิน (3 คำสั่ง) · 🥇ทอง (8 คำสั่ง) · 💎เพชร (20 คำสั่ง)', redeemed: 'แลกแล้ว', special: 'ส่วนลดพิเศษ', copied: 'คัดลอกแล้ว!', copy: 'คัดลอก', upcoming: 'จะได้รับเมื่ออัปเกรดเป็น', usageTip: 'กรอกรหัสคูปองที่ขั้นตอนชำระเงิน แต่ละรหัสใช้ได้ 1 ครั้งต่อ 1 คำสั่งซื้อ', wantMore: 'ต้องการคูปองเพิ่ม?', redeemHint: 'แลกคะแนนเป็นคูปองหรืออัปเกรดเพื่อรับสิทธิพิเศษ', viewTier: 'ดูระดับสมาชิก', orders: 'คำสั่ง', spent: 'ใช้จ่าย', points: 'คะแนนสะสม', voucher: 'คูปอง' },
    hi: { activeTitle: 'सक्रिय कूपन', empty: 'अभी कूपन नहीं। और खरीदें और अपग्रेड करें!', tierHint: '🥈चांदी (3 ऑर्डर) · 🥇सोना (8 ऑर्डर) · 💎हीरा (20 ऑर्डर)', redeemed: 'भुनाया', special: 'विशेष छूट', copied: 'कॉपी हुआ!', copy: 'कॉपी', upcoming: 'अपग्रेड पर उपलब्ध', usageTip: 'चेकआउट पर कूपन कोड दर्ज करें। प्रत्येक कोड प्रति ऑर्डर एक बार।', wantMore: 'और कूपन चाहिए?', redeemHint: 'पॉइंट भुनाएं या अपग्रेड करें', viewTier: 'सदस्यता स्तर देखें', orders: 'ऑर्डर', spent: 'खर्च', points: 'लॉयल्टी पॉइंट', voucher: 'कूपन' },
    ja: { activeTitle: '利用可能なクーポン', empty: 'クーポンがありません。もっと買ってランクアップ！', tierHint: '🥈シルバー (3注文) · 🥇ゴールド (8注文) · 💎ダイヤ (20注文)', redeemed: '交換済み', special: '特別割引', copied: 'コピー済み!', copy: 'コピー', upcoming: 'ランクアップで利用可能', usageTip: 'お支払い時にクーポンコードを入力。各コードは1注文1回限り。', wantMore: 'もっとクーポンが欲しい？', redeemHint: 'ポイント交換またはランクアップで新特典', viewTier: '会員ランクを見る', orders: '注文', spent: '消費', points: 'ポイント', voucher: 'クーポン' },
    ko: { activeTitle: '활성 쿠폰', empty: '쿠폰이 없습니다. 더 구매하여 업그레이드하세요!', tierHint: '🥈실버 (3주문) · 🥇골드 (8주문) · 💎다이아 (20주문)', redeemed: '교환됨', special: '특별 할인', copied: '복사됨!', copy: '복사', upcoming: '업그레이드 시 사용 가능', usageTip: '결제 시 쿠폰 코드 입력. 각 코드는 주문당 1회.', wantMore: '쿠폰이 더 필요하세요?', redeemHint: '포인트 교환 또는 등급 업그레이드', viewTier: '멤버십 등급 보기', orders: '주문', spent: '소비', points: '포인트', voucher: '쿠폰' },
};

export default function VouchersPage() {
    const navigate = useNavigate();
    const { t, lang } = useLang();
    const tx = VT[lang] || VT.vi;
    const authCtx = useAuthUser() || {};
    const userProfile = authCtx?.userProfile;
    const user = authCtx?.user;
    const userName = userProfile?.full_name || user?.full_name || user?.name || user?.email?.split('@')[0] || t('user.guest') || 'Guest';
    const tier = userProfile?.membership_tier || 'bronze';
    const tierInfo = TIERS[tier];
    const totalSpent = userProfile?.total_spent || 0;
    const points = getPoints(totalSpent, tier);
    const totalOrders = userProfile?.total_orders || 0;
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

    const WINTER_GIFTS = [
        { icon: '🎁', text: t('voucher.winterGift1') },
        { icon: '🚚', text: t('voucher.winterGift2') },
        { icon: '✨', text: t('voucher.winterGift3') },
        { icon: '⭐', text: t('voucher.winterGift4') },
    ];
    const SNOW = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 4 + Math.random() * 8,
    }));

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Top bar */}
            <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                    <ArrowLeft className="w-4 h-4" /> {t('membership.back')}
                </button>
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-500" /> {t('user.myVouchers')}
                </h1>
                <button onClick={() => navigate('/membership')} className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                    <Crown className="w-4 h-4" /> {t('user.membership')} <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Hero */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-4 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="container mx-auto max-w-3xl relative">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl shadow-xl">
                            {tierInfo.emoji}
                        </div>
                        <div>
                            <p className="text-white/90 text-lg font-bold mb-0.5">{userName}</p>
                            <p className="text-white/70 text-xs uppercase tracking-wider">{t('user.tier')} {tierInfo.name}</p>
                            <p className="text-3xl font-black mt-1">{allVouchers.length} {tx.voucher}</p>
                            <p className="text-white/80 text-sm">{totalOrders} {tx.orders} · {totalSpent?.toLocaleString('vi-VN')}đ {tx.spent}</p>
                        </div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur">
                        <Coins className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold">{points} {tx.points}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-3xl px-4 mt-6 space-y-6">
                {/* Winter Event Banner */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden border-2 border-blue-200/50 shadow-2xl shadow-blue-500/20">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                    {/* Snow animation */}
                    {SNOW.map(s => (
                        <motion.div key={s.id}
                            className="absolute text-white/70 pointer-events-none"
                            style={{ left: `${s.left}%`, fontSize: s.size }}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 300, opacity: [0, 1, 0] }}
                            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'linear' }}>
                            ❄
                        </motion.div>
                    ))}
                    {/* Content */}
                    <div className="relative z-10 p-5 sm:p-6 text-white">
                        <div className="flex items-start gap-3 mb-3">
                            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                                className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                                <Snowflake className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                                <p className="text-white/70 text-[10px] uppercase tracking-wider font-bold">{t('voucher.winterCode')}</p>
                                <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                                    {t('voucher.winterTitle')} 🎄
                                </h3>
                                <p className="text-white/80 text-sm mt-0.5">{t('voucher.winterDesc')}</p>
                            </div>
                        </div>
                        {/* Gift grid */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            {WINTER_GIFTS.map((g, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.1 }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20">
                                    <span className="text-lg">{g.icon}</span>
                                    <span className="text-xs font-semibold text-white/90">{g.text}</span>
                                </motion.div>
                            ))}
                        </div>
                        {/* CTA */}
                        <button onClick={() => navigate('/products')}
                            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-lg">
                            <ShoppingBag className="w-4 h-4" /> {t('voucher.winterShop')}
                        </button>
                    </div>
                </motion.div>

                {/* Active vouchers */}
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> {tx.activeTitle} ({allVouchers.length})
                    </p>
                    {allVouchers.length === 0 ? (
                        <div className="text-center py-10 space-y-2 rounded-2xl border border-dashed border-border">
                            <Gift className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                            <p className="text-sm text-muted-foreground">{tx.empty}</p>
                            <p className="text-xs text-primary">{tx.tierHint}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {allVouchers.map((code, i) => {
                                const v = VOUCHER_CODES[code];
                                if (!v) return null;
                                const isRedeemed = redeemedVouchers.includes(code) && !tierVouchers.includes(code);
                                return (
                                    <motion.div key={code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                        className="relative flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50">
                                        {isRedeemed && (
                                            <span className="absolute -top-2 right-3 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">{tx.redeemed}</span>
                                        )}
                                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <Gift className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-amber-700 text-base tracking-widest">{code}</p>
                                            <p className="text-xs text-amber-600">{v?.label || tx.special}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{v?.desc}</p>
                                        </div>
                                        <button onClick={() => copy(code)}
                                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0
                      ${copied === code ? 'bg-green-500 text-white' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                                            {copied === code ? <><CheckCircle2 className="w-3.5 h-3.5" /> {tx.copied}</> : <><Copy className="w-3.5 h-3.5" /> {tx.copy}</>}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Upcoming vouchers */}
                {upcomingVouchers.length > 0 && (
                    <div className="p-5 rounded-2xl bg-muted/50 border border-border">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <p className="text-xs font-bold text-muted-foreground">{tx.upcoming} {nextTierInfo.emoji} {nextTierInfo.name}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {upcomingVouchers.map(code => {
                                const v = VOUCHER_CODES[code];
                                return (
                                    <span key={code} className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground font-mono">
                                        {code} · {v?.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Usage tip */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600 leading-relaxed">
                        {tx.usageTip}
                    </p>
                </div>

                {/* CTA */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-emerald-500/5 border border-primary/20 text-center">
                    <p className="text-sm font-bold text-foreground mb-1">{tx.wantMore}</p>
                    <p className="text-xs text-muted-foreground mb-3">{tx.redeemHint}</p>
                    <button onClick={() => navigate('/membership')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:shadow-lg transition-all">
                        <Crown className="w-4 h-4" /> {tx.viewTier} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}