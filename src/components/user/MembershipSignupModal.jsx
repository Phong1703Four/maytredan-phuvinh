import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Lock, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../../context/LanguageContext';

const TEXT = {
    vi: { title: 'Xác Nhận Đăng Ký', tier: 'Gói thành viên', price: 'Giá', period: '/ 3 tháng', confirm: 'Xác Nhận Thanh Toán', cancel: 'Hủy', processing: 'Đang xử lý...', success: 'Đăng Ký Thành Công!', successDesc: 'Gói thành viên của bạn đã được kích hoạt. Tận hưởng đặc quyền!', close: 'Đóng', needLogin: 'Vui lòng đăng nhập để đăng ký gói thành viên', login: 'Đăng Nhập', secure: 'Thanh toán an toàn · Bảo mật 100%', methods: 'Chấp nhận: Chuyển khoản · Momo · ZaloPay · VNPay' },
    en: { title: 'Confirm Subscription', tier: 'Membership Plan', price: 'Price', period: '/ 3 months', confirm: 'Confirm Payment', cancel: 'Cancel', processing: 'Processing...', success: 'Subscription Successful!', successDesc: 'Your membership has been activated. Enjoy your privileges!', close: 'Close', needLogin: 'Please login to subscribe to a membership plan', login: 'Login', secure: 'Secure payment · 100% protected', methods: 'Accepted: Bank transfer · Momo · ZaloPay · VNPay' },
    es: { title: 'Confirmar Suscripción', tier: 'Plan de Membresía', price: 'Precio', period: '/ 3 meses', confirm: 'Confirmar Pago', cancel: 'Cancelar', processing: 'Procesando...', success: '¡Suscripción Exitosa!', successDesc: 'Tu membresía ha sido activada. ¡Disfruta tus privilegios!', close: 'Cerrar', needLogin: 'Inicia sesión para suscribirte', login: 'Iniciar Sesión', secure: 'Pago seguro · 100% protegido', methods: 'Aceptado: Transferencia · Momo · ZaloPay · VNPay' },
    zh: { title: '确认订阅', tier: '会员方案', price: '价格', period: '/ 3个月', confirm: '确认付款', cancel: '取消', processing: '处理中...', success: '订阅成功！', successDesc: '您的会员已激活，请享受特权！', close: '关闭', needLogin: '请登录以订阅会员方案', login: '登录', secure: '安全支付 · 100%保护', methods: '支持: 银行转账 · Momo · ZaloPay · VNPay' },
    ru: { title: 'Подтвердить Подписку', tier: 'План Членства', price: 'Цена', period: '/ 3 месяца', confirm: 'Подтвердить Оплату', cancel: 'Отмена', processing: 'Обработка...', success: 'Подписка Успешна!', successDesc: 'Ваше членство активировано. Наслаждайтесь привилегиями!', close: 'Закрыть', needLogin: 'Войдите, чтобы подписаться', login: 'Войти', secure: 'Безопасная оплата · 100% защита', methods: 'Принимается: Перевод · Momo · ZaloPay · VNPay' },
    th: { title: 'ยืนยันการสมัคร', tier: 'แพ็กเกจสมาชิก', price: 'ราคา', period: '/ 3 เดือน', confirm: 'ยืนยันการชำระ', cancel: 'ยกเลิก', processing: 'กำลังดำเนินการ...', success: 'สมัครสำเร็จ!', successDesc: 'สมาชิกของคุณถูกเปิดใช้งานแล้ว', close: 'ปิด', needLogin: 'กรุณาเข้าสู่ระบบเพื่อสมัคร', login: 'เข้าสู่ระบบ', secure: 'ชำระเงินปลอดภัย · 100%', methods: 'รับ: โอนเงิน · Momo · ZaloPay · VNPay' },
    hi: { title: 'सदस्यता की पुष्टि करें', tier: 'सदस्यता योजना', price: 'मूल्य', period: '/ 3 माह', confirm: 'भुगतान की पुष्टि करें', cancel: 'रद्द करें', processing: 'प्रसंस्करण...', success: 'सदस्यता सफल!', successDesc: 'आपकी सदस्यता सक्रिय हो गई है', close: 'बंद करें', needLogin: 'कृपया सदस्यता के लिए लॉगिन करें', login: 'लॉगिन', secure: 'सुरक्षित भुगतान · 100% सुरक्षित', methods: 'स्वीकृत: बैंक ट्रांसफर · Momo · ZaloPay · VNPay' },
    ja: { title: 'サブスクリプション確認', tier: 'メンバーシッププラン', price: '価格', period: '/ 3ヶ月', confirm: '支払い確認', cancel: 'キャンセル', processing: '処理中...', success: '登録成功！', successDesc: 'メンバーシップが有効化されました', close: '閉じる', needLogin: 'サブスクリプションにはログインが必要です', login: 'ログイン', secure: '安全な決済 · 100%保護', methods: '対応: 銀行振込 · Momo · ZaloPay · VNPay' },
    ko: { title: '구독 확인', tier: '멤버십 플랜', price: '가격', period: '/ 3개월', confirm: '결제 확인', cancel: '취소', processing: '처리 중...', success: '구독 성공!', successDesc: '멤버십이 활성화되었습니다', close: '닫기', needLogin: '구독하려면 로그인하세요', login: '로그인', secure: '안전한 결제 · 100% 보호', methods: '지원: 계좌이체 · Momo · ZaloPay · VNPay' },
};

const TIER_MAP = { starter: 'silver', premium: 'gold', elite: 'diamond' };
const TIER_LABEL = { starter: 'membership.starter', premium: 'membership.premium', elite: 'membership.elite' };
const TIER_PRICE = { starter: 'membership.starterPrice', premium: 'membership.premiumPrice', elite: 'membership.elitePrice' };

export default function MembershipSignupModal({ tier, onClose }) {
    const { t, lang } = useLang();
    const [status, setStatus] = useState('form'); // form | processing | success | needLogin
    const tx = TEXT[lang] || TEXT.vi;

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
                            <h3 className="text-xl font-bold mb-1">{tx.title}</h3>
                            <p className="text-sm text-muted-foreground mb-6">{tx.secure}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <span className="text-sm text-muted-foreground">{tx.tier}</span>
                                    <span className="font-bold text-foreground">{t(TIER_LABEL[tier])}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                    <span className="text-sm text-muted-foreground">{tx.price}</span>
                                    <span className="font-bold text-primary text-lg">{t(TIER_PRICE[tier])} <span className="text-xs font-normal text-muted-foreground">{tx.period}</span></span>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-4 text-center">{tx.methods}</p>

                            <div className="flex gap-3">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                                    {tx.cancel}
                                </button>
                                <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                                    {tx.confirm}
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'processing' && (
                        <div className="p-12 text-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                            <p className="text-sm font-medium text-muted-foreground">{tx.processing}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="p-8 text-center">
                            <motion.div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mx-auto mb-4"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                                <Check className="w-8 h-8 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{tx.success}</h3>
                            <p className="text-sm text-muted-foreground mb-6">{tx.successDesc}</p>
                            <button onClick={onClose} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg transition-all">
                                {tx.close}
                            </button>
                        </div>
                    )}

                    {status === 'needLogin' && (
                        <div className="p-8 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-7 h-7 text-amber-600" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">{tx.needLogin}</p>
                            <div className="flex gap-3">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                                    {tx.cancel}
                                </button>
                                <button onClick={handleLogin} className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:shadow-lg transition-all">
                                    {tx.login}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}