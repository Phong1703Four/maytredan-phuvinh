import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Phone, Lock, Loader2, KeyRound, Sparkles, Shield, Gift } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuthUser } from '../../context/AuthUserContext';
import { useLang } from '../../context/LanguageContext';

export default function AuthModal({ onClose }) {
    const { loadUser } = useAuthUser();
    const { lang } = useLang();
    const tr = (vi, en, es, zh, ru) => lang === 'vi' ? vi : lang === 'en' ? en : lang === 'es' ? es : lang === 'zh' ? zh : (ru || en);

    const [mode, setMode] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', confirm: '' });

    const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(''); };

    const validate = () => {
        if (!form.email.trim() || !form.password) return tr('Vui lòng điền đầy đủ thông tin.', 'Please fill in all fields.', 'Por favor completa todos los campos.', '请填写完整信息。', 'Пожалуйста, заполните все поля.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return tr('Email không hợp lệ.', 'Invalid email.', 'Email inválido.', '邮箱无效。', 'Неверный email.');
        if (form.password.length < 6) return tr('Mật khẩu phải ít nhất 6 ký tự.', 'Password must be at least 6 characters.', 'La contraseña debe tener al menos 6 caracteres.', '密码至少6个字符。', 'Пароль должен быть не менее 6 символов.');
        if (mode === 'register') {
            if (!form.full_name.trim()) return tr('Vui lòng nhập họ và tên.', 'Please enter your full name.', 'Por favor ingresa tu nombre.', '请输入姓名。', 'Пожалуйста, введите ваше имя.');
            if (!form.phone.trim()) return tr('Vui lòng nhập số điện thoại.', 'Please enter your phone number.', 'Por favor ingresa tu teléfono.', '请输入电话号码。', 'Пожалуйста, введите номер телефона.');
            if (!/^(0|\+84)[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) return tr('SĐT không hợp lệ (VD: 0912345678).', 'Invalid phone (e.g. 0912345678).', 'Teléfono inválido.', '电话号码无效。', 'Неверный телефон (напр. 0912345678).');
            if (form.password !== form.confirm) return tr('Mật khẩu xác nhận không khớp.', 'Passwords do not match.', 'Las contraseñas no coinciden.', '两次密码不一致。', 'Пароли не совпадают.');
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setLoading(true);
        try {
            if (mode === 'login') {
                await base44.auth.login(form.email, form.password);
            } else {
                await base44.auth.register(form.email, form.password, { full_name: form.full_name });
                await base44.entities.UserProfile.create({
                    user_email: form.email,
                    full_name: form.full_name,
                    phone: form.phone,
                    total_orders: 0, total_spent: 0, membership_tier: 'bronze', vouchers: [],
                });
            }
            if (typeof window !== 'undefined') window.localStorage.setItem('phuvinh_last_email', form.email);
            await loadUser();
            onClose();
        } catch (err) {
            const msg = (err?.message || '').toLowerCase();
            if (msg.includes('already') || msg.includes('exists')) setError(tr('Email đã được đăng ký.', 'Email already registered.', 'Email ya registrado.', '该邮箱已注册。', 'Email уже зарегистрирован.'));
            else if (msg.includes('invalid') || msg.includes('credential') || msg.includes('password')) setError(tr('Email hoặc mật khẩu không đúng.', 'Invalid email or password.', 'Email o contraseña incorrectos.', '邮箱或密码错误。', 'Неверный email или пароль.'));
            else setError(tr('Có lỗi xảy ra. Vui lòng thử lại.', 'An error occurred. Please try again.', 'Ocurrió un error. Inténtalo de nuevo.', '发生错误，请重试。', 'Произошла ошибка. Попробуйте снова.'));
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all";

    const L = {
        login: tr('Đăng Nhập', 'Sign In', 'Iniciar Sesión', '登录', 'Войти'),
        register: tr('Tạo Tài Khoản', 'Create Account', 'Crear Cuenta', '创建账户', 'Создать аккаунт'),
        signUp: tr('Đăng Ký', 'Sign Up', 'Registrarse', '注册', 'Регистрация'),
        memberBenefit: tr('Thành viên nhận nhiều ưu đãi hơn', 'Members get more benefits', 'Los miembros reciben más beneficios', '会员享受更多优惠', 'Участники получают больше преимуществ'),
        fullName: tr('Họ và tên *', 'Full name *', 'Nombre completo *', '姓名 *', 'Полное имя *'),
        email: tr('Email *', 'Email *', 'Email *', '邮箱 *', 'Email *'),
        phone: tr('Số điện thoại * (0912345678)', 'Phone * (0912345678)', 'Teléfono *', '电话 * (0912345678)', 'Телефон * (0912345678)'),
        password: tr('Mật khẩu * (≥6 ký tự)', 'Password * (≥6 chars)', 'Contraseña * (≥6 caracteres)', '密码 * (≥6个字符)', 'Пароль * (≥6 симв.)'),
        confirm: tr('Xác nhận mật khẩu *', 'Confirm password *', 'Confirmar contraseña *', '确认密码 *', 'Подтвердите пароль *'),
        benefits: tr('Quyền lợi thành viên', 'Member benefits', 'Beneficios de miembro', '会员权益', 'Привилегии участника'),
        or: tr('hoặc', 'or', 'o', '或', 'или'),
        google: tr('Tiếp tục với Google', 'Continue with Google', 'Continuar con Google', '使用Google继续', 'Продолжить с Google'),
        secure: tr('Thông tin được bảo mật tuyệt đối', 'Your data is fully protected', 'Tus datos están protegidos', '信息绝对安全', 'Ваши данные полностью защищены'),
        bronze: tr('Đồng', 'Bronze', 'Bronce', '铜', 'Бронза'),
        silver: tr('Bạc', 'Silver', 'Plata', '银', 'Серебро'),
        gold: tr('Vàng', 'Gold', 'Oro', '金', 'Золото'),
        diamond: tr('Kim Cương', 'Diamond', 'Diamante', '钻石', 'Алмаз'),
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="relative px-6 pt-6 pb-5 text-white overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #15803d 0%, #22c55e 50%, #15803d 100%)' }}>
                    <motion.div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                    <motion.div className="absolute -bottom-12 -left-4 w-24 h-24 rounded-full bg-white/5" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />

                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 hover:bg-white/30 transition-colors z-10">
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <motion.div
                            className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl backdrop-blur"
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            🎋
                        </motion.div>
                        <div>
                            <h2 className="text-xl font-bold">{mode === 'login' ? L.login : L.register}</h2>
                            <p className="text-white/75 text-xs flex items-center gap-1 mt-0.5">
                                <Gift className="w-3 h-3" /> {L.memberBenefit}
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-black/20 rounded-2xl p-1 relative z-10">
                        <motion.div
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-md"
                            animate={{ left: mode === 'login' ? '4px' : 'calc(50% + 0px)' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        />
                        {[
                            { m: 'login', icon: KeyRound, label: L.login },
                            { m: 'register', icon: Sparkles, label: L.signUp },
                        ].map(tab => (
                            <button
                                key={tab.m}
                                onClick={() => { setMode(tab.m); setError(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors relative z-10 ${mode === tab.m ? 'text-primary' : 'text-white/70'}`}
                            >
                                <tab.icon className="w-4 h-4" /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-3">
                    <AnimatePresence mode="wait">
                        {mode === 'register' && (
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder={L.fullName} value={form.full_name} onChange={e => set('full_name', e.target.value)} className={inputCls} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" placeholder={L.email} value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} />
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'register' && (
                            <motion.div className="relative" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="tel" placeholder={L.phone} value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPass ? 'text' : 'password'} placeholder={L.password} value={form.password} onChange={e => set('password', e.target.value)} className={inputCls + " pr-10"} />
                        <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'register' && (
                            <motion.div className="relative" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type={showPass ? 'text' : 'password'} placeholder={L.confirm} value={form.confirm} onChange={e => set('confirm', e.target.value)} className={inputCls} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                                ⚠️ {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {mode === 'register' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 text-xs space-y-1">
                            <p className="font-bold flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> {L.benefits}</p>
                            <p>🥉 {L.bronze} (0) → 🥈 {L.silver} (3, -5%) → 🥇 {L.gold} (8, -10%+freeship) → 💎 {L.diamond} (20, -15%)</p>
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === 'login'
                            ? <><KeyRound className="w-4 h-4" /> {L.login}</>
                            : <><Sparkles className="w-4 h-4" /> {L.register}</>}
                    </motion.button>

                    <div className="flex items-center gap-3 pt-1">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-medium">{L.or}</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button type="button" onClick={() => window.location.href = '/api/auth/google'}
                        className="w-full py-3 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-sm font-semibold text-gray-700">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {L.google}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 pt-2 text-xs text-gray-400">
                        <Shield className="w-3 h-3" /> {L.secure}
                    </div>
                </form>
            </motion.div>
        </div>
    );
}