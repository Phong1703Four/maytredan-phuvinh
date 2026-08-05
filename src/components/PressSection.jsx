import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Newspaper, ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const PRESS_DATA = {
    vi: [
        { source: 'VNEXPRESS', title: 'Làng nghề Phú Vinh — 400 năm giữ lửa nghề đan lát', date: '15/03/2024', href: 'https://vnexpress.net/lang-nghe-phu-vinh.html', category: 'heritage', color: 'text-blue-600 bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
        { source: 'BÁO NHÂN DÂN', title: 'Phú Vinh — Di sản mây tre đan được UNESCO vinh danh', date: '08/06/2024', href: 'https://nhandan.vn/phu-vinh-di-san-may-tre.html', category: 'heritage', color: 'text-red-600 bg-red-50 border-red-200', dot: 'bg-red-500' },
        { source: 'HÀ NỘI MỚI', title: 'Phú Vinh — Niềm tự hào thủ công mỹ nghệ Hà Nội', date: '09/01/2024', href: 'https://hanoimoi.vn/phu-vinh-niem-tu-hao.html', category: 'heritage', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
        { source: 'DÂN TRÍ', title: 'AI và mây tre đan: Hướng đi mới cho làng nghề truyền thống', date: '10/09/2024', href: 'https://dantri.com.vn/ai-may-tre-phu-vinh.html', category: 'innovation', color: 'text-purple-600 bg-purple-50 border-purple-200', dot: 'bg-purple-500' },
        { source: 'VTC NEWS', title: 'Phú Vinh ứng dụng công nghệ 3D để bảo tồn mẫu đan cổ', date: '05/11/2024', href: '#', category: 'innovation', color: 'text-indigo-600 bg-indigo-50 border-indigo-200', dot: 'bg-indigo-500' },
        { source: 'TUỔI TRẺ ONLINE', title: 'Nghệ nhân Phú Vinh đưa mây tre lên sàn quốc tế', date: '22/07/2024', href: 'https://tuoitre.vn/nghe-nhan-phu-vinh.html', category: 'export', color: 'text-orange-600 bg-orange-50 border-orange-200', dot: 'bg-orange-500' },
        { source: 'VIETNAM PLUS', title: 'Phú Vinh craft village conquers world markets', date: '20/01/2024', href: 'https://vietnamplus.vn/phu-vinh-craft-village.html', category: 'export', color: 'text-teal-600 bg-teal-50 border-teal-200', dot: 'bg-teal-500' },
        { source: 'BÁO ĐẦU TƯ', title: 'Xuất khẩu mây tre Phú Vinh đạt 3 tỷ đồng/năm', date: '18/10/2024', href: '#', category: 'export', color: 'text-cyan-600 bg-cyan-50 border-cyan-200', dot: 'bg-cyan-500' },
        { source: 'BÁO MÔI TRƯỜNG', title: 'Phú Vinh: Làng nghề xanh zero waste đầu tiên miền Bắc', date: '12/08/2024', href: '#', category: 'community', color: 'text-green-600 bg-green-50 border-green-200', dot: 'bg-green-500' },
        { source: 'PHÁP LUẬT TP.HCM', title: 'Dự án trồng 10.000 cây mây: Phú Vinh kiến tạo tương lai', date: '03/05/2024', href: '#', category: 'community', color: 'text-lime-600 bg-lime-50 border-lime-200', dot: 'bg-lime-500' },
        { source: 'GIÁO DỤC TP.HCM', title: 'Truyền nghề cho thế hệ trẻ: Phú Vinh mở lớp học miễn phí', date: '25/11/2024', href: '#', category: 'community', color: 'text-rose-600 bg-rose-50 border-rose-200', dot: 'bg-rose-500' },
    ],
    en: [
        { source: 'VNEXPRESS', title: 'Phú Vinh Village — 400 years of keeping the craft alive', date: '15/03/2024', href: 'https://vnexpress.net/lang-nghe-phu-vinh.html', category: 'heritage', color: 'text-blue-600 bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
        { source: 'NHÂN DÂN', title: 'Phú Vinh — Bamboo heritage recognized by UNESCO', date: '08/06/2024', href: 'https://nhandan.vn/phu-vinh-di-san-may-tre.html', category: 'heritage', color: 'text-red-600 bg-red-50 border-red-200', dot: 'bg-red-500' },
        { source: 'HÀ NỘI MỚI', title: 'Phú Vinh — Hanoi\'s craft pride', date: '09/01/2024', href: 'https://hanoimoi.vn/phu-vinh-niem-tu-hao.html', category: 'heritage', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
        { source: 'DÂN TRÍ', title: 'AI meets bamboo: A new direction for traditional crafts', date: '10/09/2024', href: 'https://dantri.com.vn/ai-may-tre-phu-vinh.html', category: 'innovation', color: 'text-purple-600 bg-purple-50 border-purple-200', dot: 'bg-purple-500' },
        { source: 'VTC NEWS', title: 'Phú Vinh uses 3D tech to preserve ancient weaving patterns', date: '05/11/2024', href: '#', category: 'innovation', color: 'text-indigo-600 bg-indigo-50 border-indigo-200', dot: 'bg-indigo-500' },
        { source: 'TUỔI TRẺ', title: 'Phú Vinh artisans take bamboo to global markets', date: '22/07/2024', href: 'https://tuoitre.vn/nghe-nhan-phu-vinh.html', category: 'export', color: 'text-orange-600 bg-orange-50 border-orange-200', dot: 'bg-orange-500' },
        { source: 'VIETNAM PLUS', title: 'Phú Vinh craft village conquers world markets', date: '20/01/2024', href: 'https://vietnamplus.vn/phu-vinh-craft-village.html', category: 'export', color: 'text-teal-600 bg-teal-50 border-teal-200', dot: 'bg-teal-500' },
        { source: 'INVESTMENT', title: 'Phú Vinh bamboo exports reach 3 billion VND/year', date: '18/10/2024', href: '#', category: 'export', color: 'text-cyan-600 bg-cyan-50 border-cyan-200', dot: 'bg-cyan-500' },
        { source: 'ENVIRONMENT', title: 'Phú Vinh: Northern Vietnam\'s first zero-waste craft village', date: '12/08/2024', href: '#', category: 'community', color: 'text-green-600 bg-green-50 border-green-200', dot: 'bg-green-500' },
        { source: 'LAW HCMC', title: '10,000 rattan trees project: Phú Vinh builds the future', date: '03/05/2024', href: '#', category: 'community', color: 'text-lime-600 bg-lime-50 border-lime-200', dot: 'bg-lime-500' },
        { source: 'EDUCATION', title: 'Passing skills to youth: Phú Vinh opens free classes', date: '25/11/2024', href: '#', category: 'community', color: 'text-rose-600 bg-rose-50 border-rose-200', dot: 'bg-rose-500' },
    ],
};

const CATEGORIES = [
    { id: 'all', icon: '📰' },
    { id: 'heritage', icon: '🏛️' },
    { id: 'innovation', icon: '🚀' },
    { id: 'export', icon: '🌏' },
    { id: 'community', icon: '🌱' },
];

export default function PressSection() {
    const { t, lang } = useLang();
    const [activeCat, setActiveCat] = useState('all');
    const data = PRESS_DATA[lang] || PRESS_DATA.vi;
    const filtered = activeCat === 'all' ? data : data.filter(p => p.category === activeCat);

    const catLabel = (catId) => {
        const map = { all: t('press.all'), heritage: t('press.heritage'), innovation: t('press.innovation'), export: t('press.export'), community: t('press.community') };
        return map[catId] || catId;
    };

    return (
        <section className="py-24 relative bg-gradient-to-b from-green-50/30 to-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Newspaper className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('press.title')}</h2>
                    </div>
                    <p className="text-muted-foreground max-w-xl mx-auto">{t('press.desc')}</p>
                </motion.div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {CATEGORIES.map(cat => (
                        <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
              ${activeCat === cat.id
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
                            <span>{cat.icon}</span>
                            <span>{catLabel(cat.id)}</span>
                        </button>
                    ))}
                </div>

                {/* News grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item, i) => (
                        <motion.a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer"
                            layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                            className={`group block p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.color}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">{item.source}</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="font-semibold text-sm leading-relaxed mb-3 group-hover:underline underline-offset-2">{item.title}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs opacity-60">{item.date}</span>
                                <span className="text-xs font-medium flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-3 h-3" /> {t('press.read')}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* News ticker */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-10 p-4 rounded-2xl bg-card border border-border overflow-hidden">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {t('press.news')}
                    </p>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
                        {data.slice(0, 6).map((item, i) => (
                            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                                className="flex-shrink-0 max-w-[200px] text-xs text-muted-foreground hover:text-primary transition-colors">
                                <span className="font-bold text-foreground/70">[{item.source}]</span> {item.title}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}