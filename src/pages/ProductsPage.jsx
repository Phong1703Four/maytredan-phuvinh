import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcoShopSection from '../components/EcoShopSection';
import { useLang } from '../context/LanguageContext';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function ProductsPage() {
    const { lang } = useLang();

    const backText = { vi: 'Về trang chủ', en: 'Back to home', es: 'Volver al inicio', zh: '返回首页', ru: 'На главную', th: 'กลับหน้าหลัก', hi: 'मुख्य पर वापस', ja: 'ホームに戻る', ko: '홈으로' }[lang] || 'Về trang chủ';

    return (
        <div className="pt-16">
            <div className="container mx-auto px-4 max-w-5xl py-4">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {backText}
                </Link>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <ErrorBoundary>
                    <EcoShopSection />
                </ErrorBoundary>
            </motion.div>
        </div>
    );
}