import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf, Compass, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ValuesSection from '../components/ValuesSection';
import { useLang } from '../context/LanguageContext';

export default function Home() {
    const { t, lang } = useLang();

    const tr = (vi, en, es, zh, ru, th, hi) => {
        if (lang === 'vi') return vi;
        if (lang === 'en') return en;
        if (lang === 'es') return es;
        if (lang === 'zh') return zh;
        if (lang === 'ru') return ru;
        if (lang === 'th') return th;
        if (lang === 'hi') return hi;
        return vi;
    };

    const CARDS = [
        {
            icon: ShoppingBag,
            title: tr('Sản Phẩm', 'Products', 'Productos', '产品', 'Товары', 'สินค้า', 'उत्पाद'),
            desc: tr('Đồ chơi & trang trí mây tre đan handmade', 'Handmade bamboo toys & decor', 'Juguetes y decoración de bambú hechos a mano', '手工竹藤玩具与装饰', 'Игрушки и декор из бамбука ручной работы', 'ของเล่นและของตกแต่งไม้ไผ่หวายทำมือ', 'हस्तनिर्मित बांस खिलौने और सजावट'),
            to: '/products',
            color: 'from-emerald-500 to-green-600',
            glow: 'shadow-emerald-500/30',
        },
        {
            icon: Leaf,
            title: tr('Làng Nghề', 'Village', 'Pueblo', '村庄', 'Деревня', 'หมู่บ้าน', 'गाँव'),
            desc: tr('400 năm di sản đan lát Phú Vinh', '400 years of weaving heritage', '400 años de patrimonio artesanal', '400年富荣编织传承', '400 лет ремесленного наследия', 'มรดกการถัก 400 ปีของ Phú Vinh', 'Phú Vinh की 400 वर्षीय बुनाई विरासत'),
            to: '/village',
            color: 'from-amber-500 to-orange-600',
            glow: 'shadow-amber-500/30',
        },
        {
            icon: Compass,
            title: tr('VR Tour 360°', 'VR Tour 360°', 'Tour VR 360°', 'VR全景', 'VR-тур 360°', 'ทัวร์ VR 360°', 'VR टूर 360°'),
            desc: tr('Khám phá làng nghề thực tế ảo', 'Explore the village in VR', 'Explora el pueblo en realidad virtual', '虚拟现实探索村庄', 'Исследуйте деревню в VR', 'สำรวจหมู่บ้านใน VR', 'VR में गाँव का अन्वेषण करें'),
            to: '/village',
            color: 'from-sky-500 to-blue-600',
            glow: 'shadow-sky-500/30',
        },
        {
            icon: HelpCircle,
            title: tr('Hỗ Trợ', 'Support', 'Soporte', '支持', 'Поддержка', 'ช่วยเหลือ', 'सहायता'),
            desc: tr('Chính sách, bảo hành, FAQ', 'Policies, warranty, FAQ', 'Políticas, garantía, preguntas frecuentes', '政策、保修、常见问题', 'Политики, гарантия, FAQ', 'นโยบาย การรับประกัน คำถามที่พบบ่อย', 'नीतियाँ, वारंटी, FAQ'),
            to: '/support',
            color: 'from-violet-500 to-purple-600',
            glow: 'shadow-violet-500/30',
        },
        {
            icon: BookOpen,
            title: tr('Hướng Dẫn', 'Tutorial', 'Tutorial', '教程', 'Учебник', 'บทเรียน', 'ट्यूटोरियल'),
            desc: tr('Học đan mây tre từ cơ bản đến nâng cao', 'Learn weaving from basic to advanced', 'Aprende tejido de básico a avanzado', '从基础到进阶学习编织', 'Обучение плетению от основ до продвинутого', 'เรียนรู้การถักตั้งแต่พื้นฐานถึงขั้นสูง', 'बुनाई सीखें बेसिक से एडवांस्ड तक'),
            to: '/tutorial',
            color: 'from-teal-500 to-cyan-600',
            glow: 'shadow-teal-500/30',
        },
    ];

    return (
        <>
            <HeroSection />

            {/* Navigation cards */}
            <section className="py-16 bg-gradient-to-b from-background to-primary/5">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            {tr('Khám Phá Phú Vinh', 'Explore Phú Vinh', 'Explora Phú Vinh', '探索富荣', 'Откройте Phú Vinh', 'สำรวจ Phú Vinh', 'Phú Vinh का अन्वेषण करें')}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {tr('Chọn một mục để bắt đầu hành trình', 'Choose a section to begin your journey', 'Elige una sección para comenzar tu viaje', '选择一个部分开始您的旅程', 'Выберите раздел для начала', 'เลือกหัวข้อเพื่อเริ่มการเดินทาง', 'यात्रा शुरू करने के लिए एक अनुभाग चुनें')}
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CARDS.map((card, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                                <Link to={card.to} className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 group h-full relative overflow-hidden">
                                    <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-4`}>
                                        <card.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{card.desc}</p>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                        {tr('Xem ngay', 'Explore', 'Explorar', '探索', 'Открыть', 'ดูเลย', 'देखें')} <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ValuesSection />
        </>
    );
}