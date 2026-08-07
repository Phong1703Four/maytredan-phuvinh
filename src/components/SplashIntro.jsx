import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SplashCanvas from './splash/SplashCanvas';

const TAGLINES = {
    vi: 'Mây Tre Đan Tinh Hoa', en: 'Bamboo Craft Essence', es: 'Esencia del Bambú Artesanal',
    zh: '竹藤编织精华', ru: 'Сущность бамбукового ремесла', th: 'สุนยางวิจิตรศิลป์ไม้ไผ่', hi: 'बांस शिल्प सार',
    ja: '竹藤工芸の真髄', ko: '대나무 공예 정수',
};
const ENTER = {
    vi: 'Khám Phá Ngay', en: 'Enter Now', es: 'Entrar Ahora', zh: '立即探索',
    ru: 'Войти', th: 'เข้าสำรวจ', hi: 'अभी प्रवेश करें', ja: '今すぐ探索', ko: '지금 입장',
};
const SKIP = {
    vi: 'Bỏ qua', en: 'Skip', es: 'Saltar', zh: '跳过', ru: 'Пропустить', th: 'ข้าม', hi: 'छोड़ें', ja: 'スキップ', ko: '건너뛰기',
};
const CALLOUTS = {
    heritage: { vi: 'Tinh Hoa Làng Nghề 400 Năm', en: '400 Years of Craft Heritage', es: '400 Años de Patrimonio Artesanal', zh: '400年工艺传承', ru: '400 Лет Ремесленного Наследия', th: '400 ปีมรดกหัตถกรรม', hi: '400 वर्षों की शिल्प विरासत', ja: '400年の工芸遺産', ko: '400년 공예 유산' },
    tech: { vi: 'Công Nghệ Thông Minh', en: 'Smart Technology', es: 'Tecnología Inteligente', zh: '智能科技', ru: 'Умные Технологии', th: 'เทคโนโลยีอัจฉริยะ', hi: 'स्मार्ट तकनीक', ja: 'スマートテクノロジー', ko: '스마트 기술' },
    tradition: { vi: 'Truyền Thống Vĩnh Cửu', en: 'Eternal Tradition', es: 'Tradición Eterna', zh: '永恒传统', ru: 'Вечная Традиция', th: 'ประเพณีนิรันดร์', hi: 'शाश्वत परंपरा', ja: '永遠の伝統', ko: '영원한 전통' },
    future: { vi: 'Kiến Tạo Tương Lai', en: 'Building the Future', es: 'Construyendo el Futuro', zh: '构建未来', ru: 'Создавая Будущее', th: 'สร้างสรรค์อนาคต', hi: 'भविष्य निर्माण', ja: '未来を創造', ko: '미래 창조' },
};

const G = '#2ECC71', GD = '#F4C430', GL = '#FFD54F', W = '#ffffff';

export default function SplashIntro({ onFinish }) {
    const { lang } = useLang();
    const [show, setShow] = useState(true);
    const [phase, setPhase] = useState(0);
    const [exiting, setExiting] = useState(false);
    const c = (obj) => obj[lang] || obj.vi;

    useEffect(() => {
        try {
            if (sessionStorage.getItem('splashShown')) { setShow(false); onFinish?.(); return; }
        } catch { }
        const timers = [
            setTimeout(() => setPhase(1), 300),
            setTimeout(() => setPhase(2), 1200),
            setTimeout(() => setPhase(3), 2200),
            setTimeout(() => setPhase(4), 3200),
            setTimeout(() => setPhase(5), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleEnter = () => {
        if (phase < 5 || exiting) return;
        setExiting(true);
        setPhase(6);
        try { sessionStorage.setItem('splashShown', '1'); } catch { }
        setTimeout(() => { setShow(false); setTimeout(() => onFinish?.(), 800); }, 1200);
    };

    const handleSkip = () => {
        if (exiting) return;
        setExiting(true);
        try { sessionStorage.setItem('splashShown', '1'); } catch { }
        setShow(false);
        setTimeout(() => onFinish?.(), 300);
    };

    const ready = phase >= 5;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: '#050505' }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(15px)', transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
                >
                    <SplashCanvas phase={phase} exiting={exiting} />

                    {/* Skip button */}
                    <button onClick={handleSkip}
                        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full text-white/40 hover:text-white/90 text-xs font-medium border border-white/10 hover:border-white/30 backdrop-blur-md transition-all">
                        {c(SKIP)} →
                    </button>

                    {/* Info callouts */}
                    <AnimatePresence>
                        {phase >= 4 && !exiting && (
                            <>
                                <motion.div className="absolute top-[16%] left-[6%] hidden sm:flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: G, boxShadow: `0 0 10px ${G}` }} />
                                    <span className="text-xs font-medium text-emerald-300/80 whitespace-nowrap">{c(CALLOUTS.heritage)}</span>
                                </motion.div>
                                <motion.div className="absolute top-[16%] right-[6%] hidden sm:flex items-center gap-2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
                                    <span className="text-xs font-medium text-amber-300/80 whitespace-nowrap">{c(CALLOUTS.tech)}</span>
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GD, boxShadow: `0 0 10px ${GD}` }} />
                                </motion.div>
                                <motion.div className="absolute bottom-[28%] left-[6%] hidden sm:flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: G, boxShadow: `0 0 10px ${G}` }} />
                                    <span className="text-xs font-medium text-emerald-300/80 whitespace-nowrap">{c(CALLOUTS.tradition)}</span>
                                </motion.div>
                                <motion.div className="absolute bottom-[28%] right-[6%] hidden sm:flex items-center gap-2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                                    <span className="text-xs font-medium text-amber-300/80 whitespace-nowrap">{c(CALLOUTS.future)}</span>
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GD, boxShadow: `0 0 10px ${GD}` }} />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* HUD rings behind logo */}
                    {phase >= 4 && (
                        <div className="absolute pointer-events-none" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <motion.div className="rounded-full border" style={{ width: 180, height: 180, borderColor: `${G}20` }}
                                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
                            <motion.div className="absolute rounded-full border" style={{ width: 240, height: 240, left: -30, top: -30, borderColor: `${GD}15` }}
                                animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
                        </div>
                    )}

                    {/* Logo */}
                    <div className="relative z-10 flex flex-col items-center px-4">
                        <motion.div className="relative mb-6"
                            initial={{ opacity: 0, scale: 0.3, y: 30, filter: 'blur(10px)' }}
                            animate={phase >= 4 ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                            <motion.div className="w-20 h-20 rounded-3xl flex items-center justify-center relative overflow-hidden"
                                style={{ background: `linear-gradient(135deg, ${G}20, ${GD}20)`, border: `1px solid ${GD}40`, boxShadow: `0 0 40px ${GD}30`, backdropFilter: 'blur(20px)' }}
                                animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                                <img src="/logo.png" alt="Phú Vinh AI Logo" className="w-full h-full object-cover" />
                            </motion.div>
                            <motion.div className="absolute inset-0 rounded-3xl"
                                style={{ boxShadow: `0 0 0 1px ${GD}30, 0 0 60px ${G}30` }}
                                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div>

                        <h1 className="text-4xl sm:text-6xl font-bold mb-3 tracking-tight flex items-center">
                            <motion.span style={{ color: W }}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
                                transition={{ delay: 0.3, duration: 0.5 }}>Phú Vinh</motion.span>
                            <motion.span className="ml-2" style={{ color: GD, textShadow: `0 0 20px ${GD}80` }}
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0, scale: phase >= 4 ? 1 : 0 }}
                                transition={{ delay: 0.6, type: 'spring', damping: 14 }}>AI</motion.span>
                        </h1>

                        <motion.p className="text-sm sm:text-lg font-medium tracking-[0.3em] mb-4" style={{ color: `${GD}B0` }}
                            initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 0.9 : 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                            {c(TAGLINES)}
                        </motion.p>

                        <motion.div className="flex items-center gap-3"
                            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0, scaleX: phase >= 4 ? 1 : 0 }}
                            transition={{ delay: 1, duration: 0.5 }}>
                            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${GD}50)` }} />
                            <span style={{ color: GD }}>✦</span>
                            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${GD}50, transparent)` }} />
                        </motion.div>
                    </div>

                    {/* Enter button */}
                    <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 z-10">
                        <AnimatePresence>
                            {ready && !exiting && (
                                <motion.button onClick={handleEnter}
                                    className="group flex items-center gap-3 px-10 py-4 rounded-full font-bold tracking-wide relative overflow-hidden"
                                    style={{ background: `linear-gradient(135deg, ${G} 0%, ${GD} 100%)`, boxShadow: `0 0 40px ${G}40, 0 0 60px ${GD}30`, color: W }}
                                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                    <span className="relative z-10">{c(ENTER)}</span>
                                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                        <ArrowRight className="w-5 h-5 relative z-10" />
                                    </motion.div>
                                    <motion.div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, ${W}30, transparent)` }}
                                        animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity }} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* White flash on exit */}
                    <AnimatePresence>
                        {exiting && (
                            <motion.div className="absolute inset-0 z-50 pointer-events-none" style={{ background: W }}
                                initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.6, 1] }} transition={{ duration: 1.2, times: [0, 0.5, 0.8, 1] }} />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}