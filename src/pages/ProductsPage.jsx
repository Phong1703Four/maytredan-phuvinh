import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcoShopSection from '../components/EcoShopSection';
import { useLang } from '../context/LanguageContext';

export default function ProductsPage() {
    const { lang } = useLang();

    return (
        <div className="pt-16">
            <div className="container mx-auto px-4 max-w-5xl py-4">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {lang === 'vi' ? 'Về trang chủ' : lang === 'en' ? 'Back to home' : lang === 'es' ? 'Volver al inicio' : '返回首页'}
                </Link>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <EcoShopSection />
            </motion.div>
        </div>
    );
}