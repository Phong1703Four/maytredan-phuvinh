import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const STATS = [
    { value: 400, suffix: '+', label_vi: 'Năm Lịch Sử', label_en: 'Years of History', label_es: 'Años de Historia', label_zh: '年历史', label_ru: 'Лет истории', color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', emoji: '🏛️' },
    { value: 80, suffix: '%', label_vi: 'Hộ Dân Theo Nghề', label_en: 'Households in Craft', label_es: 'Hogares en el Oficio', label_zh: '从业家庭', label_ru: 'Семей в ремесле', color: 'from-emerald-400 to-green-500', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', emoji: '👨‍👩‍👧‍👦' },
    { value: 50, suffix: '+', label_vi: 'Quốc Gia Xuất Khẩu', label_en: 'Export Countries', label_es: 'Países de Exportación', label_zh: '出口国家', label_ru: 'Стран экспорта', color: 'from-sky-400 to-blue-500', glow: 'shadow-sky-500/30', border: 'border-sky-500/30', bg: 'bg-sky-500/10', emoji: '🌏' },
];

const VIDEOS = [
    { id: 'MW-88Rn9A_0', title_vi: 'Làng nghề mây tre đan Phú Vinh', title_en: 'Phú Vinh Bamboo & Rattan Village', title_es: 'Pueblo Artesanal de Bambú y Ratán Phú Vinh', title_zh: '富荣竹藤编织村', title_ru: 'Ремесленная деревня бамбука и ротанга Phú Vinh' },
    { id: 'FBmeBeAIFLQ', title_vi: 'Một thế kỷ, một tinh hoa', title_en: 'A Century, A Heritage', title_es: 'Un Siglo, Una Herencia', title_zh: '一个世纪，一种精华', title_ru: 'Век, наследие' },
    { id: 'Nsp_YtE8PZs', title_vi: 'Tinh hoa làng nghề | Chuyện Hà Nội', title_en: 'Craft Village Essence | Hanoi Stories', title_es: 'Esencia del Pueblo Artesanal | Historias de Hanói', title_zh: '工艺村精华 | 河内故事', title_ru: 'Суть ремесла | Истории Ханоя' },
    { id: 'svgxjHARil8', title_vi: 'Giữ lửa nghề Mây Tre Đan', title_en: 'Keeping the Craft Alive', title_es: 'Manteniendo Viva la Tradición', title_zh: '传承竹藤编织工艺', title_ru: 'Сохраняя ремесло живым' },
    { id: '_ciSTNrNJlw', title_vi: 'Hành trình tìm về làng Phú Vinh', title_en: 'Journey to Phú Vinh Village', title_es: 'Viaje al Pueblo de Phú Vinh', title_zh: '富荣村之旅', title_ru: 'Путешествие в деревню Phú Vinh' },
    { id: 'Kd_6-4yGMis', title_vi: 'Làng nghề mây tre đan thôn Phú Vinh', title_en: 'Phú Vinh Hamlet Craft Village', title_es: 'Pueblo Artesanal de Phú Vinh', title_zh: '富荣屯工艺村', title_ru: 'Ремесленная деревня Phú Vinh' },
];

function AnimatedCounter({ target, suffix, isVisible }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, step);
        return () => clearInterval(timer);
    }, [isVisible, target]);
    return <span>{count}{suffix}</span>;
}

const DECORATIONS = [
    { char: '🎋', size: 'text-4xl', pos: 'top-4 left-6', opacity: 0.12 },
    { char: '🪴', size: 'text-3xl', pos: 'top-16 right-10', opacity: 0.1 },
    { char: '🌿', size: 'text-2xl', pos: 'bottom-20 left-12', opacity: 0.15 },
    { char: '✦', size: 'text-lg', pos: 'top-32 left-1/3', opacity: 0.2 },
    { char: '✦', size: 'text-xs', pos: 'bottom-32 right-1/4', opacity: 0.15 },
    { char: '🍃', size: 'text-2xl', pos: 'top-1/2 right-6', opacity: 0.1 },
];

export default function VillageSection() {
    const { t, lang } = useLang();
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="village" className="py-24 relative overflow-hidden">
            {DECORATIONS.map((d, i) => (
                <div key={i} className={`absolute ${d.pos} ${d.size} pointer-events-none select-none animate-pulse`}
                    style={{ opacity: d.opacity, animationDelay: `${i * 0.7}s`, animationDuration: `${4 + i}s` }}>
                    {d.char}
                </div>
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(34,197,94,0.06),transparent)] pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary/70">{t('village.badge')}</span>
                </div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center text-foreground mb-3">
                    {t('village.title')}
                </motion.h2>
                <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="text-lg md:text-xl text-center text-primary mb-10">
                    {t('village.subtitle')}
                </motion.h3>

                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="space-y-6" ref={ref}>
                        <p className="text-muted-foreground leading-relaxed">{t('village.p1')}</p>
                        <p className="text-muted-foreground leading-relaxed">{t('village.p2')}</p>

                        <div className="grid grid-cols-3 gap-3 pt-4">
                            {STATS.map((stat, i) => (
                                <div key={i} className={`relative text-center p-4 rounded-2xl ${stat.bg} border ${stat.border} hover:shadow-lg ${stat.glow} transition-all duration-500 group overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-xl mb-1">{stat.emoji}</div>
                                    <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={visible} />
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 font-medium">{stat[`label_${lang}`] || stat.label_en}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                            <span className="text-primary/40 text-xs">✦</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="relative pb-4">
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10 rounded-3xl blur-xl pointer-events-none" />

                        <div className="relative rounded-2xl overflow-hidden border border-green-200 shadow-2xl shadow-green-200/30">
                            <img src="https://media.base44.com/images/public/69db5996fab5c53d588fe0df/f77cb6cae_image.png"
                                alt="Phú Vinh village" className="w-full h-72 sm:h-80 object-cover" />
                            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                {t('village.live')}
                            </div>
                        </div>

                        <div className="mt-5">
                            <a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noopener noreferrer"
                                className="group block relative rounded-2xl overflow-hidden border-2 border-green-200 shadow-xl shadow-green-100">
                                <img src={`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`} alt={activeVideo[`title_${lang}`] || activeVideo.title_en}
                                    className="w-full object-cover" style={{ aspectRatio: '16/9' }} />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <Play className="w-7 h-7 text-white ml-1 fill-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur w-fit">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                                    <span className="text-xs text-white font-medium truncate">{activeVideo[`title_${lang}`] || activeVideo.title_en}</span>
                                </div>
                            </a>
                        </div>

                        <div className="mt-4 mx-1">
                            <div className="relative px-6 py-4 rounded-2xl bg-card border-2 border-primary/30 shadow-lg shadow-primary/10">
                                <span className="absolute -top-4 left-4 text-5xl text-primary font-serif leading-none select-none">"</span>
                                <p className="text-base italic text-foreground font-semibold leading-snug pt-2">{t('village.quote')}</p>
                                <p className="text-sm text-primary font-bold mt-2">{t('village.artisan')}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Video Gallery */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 max-w-5xl mx-auto">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                            <Play className="w-5 h-5 text-red-500" /> {t('village.videos')}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{t('village.videosDesc')}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {VIDEOS.map((v) => (
                            <button key={v.id} onClick={() => setActiveVideo(v)}
                                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300
                ${activeVideo.id === v.id ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent hover:border-green-200 hover:scale-[1.01]'}`}>
                                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title_vi}
                                    className="w-full aspect-video object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                                    <p className="text-[10px] text-white font-medium leading-tight line-clamp-2">{v[`title_${lang}`] || v.title_en}</p>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-600/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-3.5 h-3.5 text-white ml-0.5 fill-white" />
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}