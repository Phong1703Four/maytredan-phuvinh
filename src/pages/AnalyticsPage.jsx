import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, Package, ShoppingCart, Eye, Users, Activity } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../context/LanguageContext';

export default function AnalyticsPage() {
    const navigate = useNavigate();
    const { t, lang } = useLang();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ orders: [], reviews: [], products: [] });

    useEffect(() => {
        (async () => {
            try {
                const me = await base44.auth.me();
                if (me?.role !== 'admin') { setIsAdmin(false); setLoading(false); return; }
                setIsAdmin(true);
                const [orders, reviews] = await Promise.all([
                    base44.entities.Order.list('-created_date', 100).catch(() => []),
                    base44.entities.Review.list('-created_date', 50).catch(() => []),
                ]);
                setStats({ orders: orders || [], reviews: reviews || [] });
            } catch {
                setIsAdmin(false);
            }
            setLoading(false);
        })();
    }, []);

    const tr = (vi, en) => lang === 'vi' ? vi : en;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    if (!isAdmin) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
            <p className="text-muted-foreground">{tr('Bạn không có quyền truy cập trang này.', 'You do not have access to this page.')}</p>
            <button onClick={() => navigate('/')} className="px-4 py-2 rounded-xl bg-primary text-white font-semibold">{t('membership.back')}</button>
        </div>
    );

    const totalRevenue = stats.orders.reduce((s, o) => s + (o.total_price || 0), 0);
    const totalOrders = stats.orders.length;
    const pendingOrders = stats.orders.filter(o => o.status === 'pending').length;
    const totalReviews = stats.reviews.length;
    const avgRating = stats.reviews.length > 0 ? (stats.reviews.reduce((s, r) => s + (r.rating || 0), 0) / stats.reviews.length).toFixed(1) : '—';

    // Product interest from order items
    const productInterest = {};
    stats.orders.forEach(o => {
        (o.items || []).forEach(item => {
            const name = item.name || 'Unknown';
            if (!productInterest[name]) productInterest[name] = { count: 0, revenue: 0 };
            productInterest[name].count += item.qty || 1;
            productInterest[name].revenue += (item.price || 0) * (item.qty || 1);
        });
    });
    const topProducts = Object.entries(productInterest).sort((a, b) => b[1].count - a[1].count).slice(0, 10);
    const maxCount = topProducts.length > 0 ? topProducts[0][1].count : 1;

    const fmt = (n) => (n || 0).toLocaleString('vi-VN') + 'đ';

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pb-20">
            <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold">
                    <ArrowLeft className="w-4 h-4" /> {t('membership.back')}
                </button>
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> {tr('Phân Tích & Thống Kê', 'Analytics Dashboard')}
                </h1>
            </div>

            <div className="container mx-auto max-w-4xl px-4 mt-6 space-y-6">
                {/* Google Analytics notice */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                        📊 Google Analytics 4: {tr('Đã tích hợp. Thay thế GA_MEASUREMENT_ID trong src/lib/analytics.js bằng ID GA4 của bạn.', 'Integrated. Replace GA_MEASUREMENT_ID in src/lib/analytics.js with your GA4 ID.')}
                    </p>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: ShoppingCart, label: tr('Đơn hàng', 'Orders'), value: totalOrders, color: 'text-primary' },
                        { icon: TrendingUp, label: tr('Doanh thu', 'Revenue'), value: fmt(totalRevenue), color: 'text-emerald-600' },
                        { icon: Activity, label: tr('Chờ xử lý', 'Pending'), value: pendingOrders, color: 'text-amber-600' },
                        { icon: Eye, label: tr('Đánh giá', 'Reviews'), value: totalReviews, color: 'text-violet-600' },
                    ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-5 rounded-2xl bg-card border border-border shadow-sm">
                            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                            <p className="text-2xl font-bold text-foreground">{s.value}</p>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Top products by interest */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> {tr('Sản phẩm được quan tâm nhất', 'Top Products by Interest')}</h3>
                    {topProducts.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">{tr('Chưa có dữ liệu đơn hàng.', 'No order data yet.')}</p>
                    ) : (
                        <div className="space-y-3">
                            {topProducts.map(([name, data], i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-muted-foreground w-6">#{i + 1}</span>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-foreground truncate">{name}</span>
                                            <span className="text-muted-foreground text-xs">{data.count}× · {fmt(data.revenue)}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${(data.count / maxCount) * 100}%` }} transition={{ delay: i * 0.05 }}
                                                className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Recent orders */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-primary" /> {tr('Đơn hàng gần đây', 'Recent Orders')}</h3>
                    {stats.orders.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">{tr('Chưa có đơn hàng nào.', 'No orders yet.')}</p>
                    ) : (
                        <div className="space-y-2">
                            {stats.orders.slice(0, 10).map(o => (
                                <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 text-sm">
                                    <div>
                                        <p className="font-medium text-foreground">{o.customer_name}</p>
                                        <p className="text-xs text-muted-foreground">{(o.items || []).length} {tr('sản phẩm', 'items')} · {o.customer_phone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-primary">{fmt(o.total_price)}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                            {o.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}