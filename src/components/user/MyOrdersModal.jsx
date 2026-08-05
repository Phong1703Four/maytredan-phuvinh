import { useState, useEffect } from 'react';
import { X, ShoppingBag, Loader2, Package, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuthUser } from '../../context/AuthUserContext';
import { motion } from 'framer-motion';

const fmt = (n) => n?.toLocaleString('vi-VN') + 'đ';
const STATUS = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    confirmed: { label: 'Đã xác nhận', icon: CheckCircle2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    delivered: { label: 'Đã giao', icon: CheckCircle2, color: 'text-green-600 bg-green-50 border-green-200' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
};

export default function MyOrdersModal({ onClose }) {
    const { user } = useAuthUser() || {};
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) { setLoading(false); return; }
        base44.entities.Order.filter({ customer_email: user.email }, '-created_date', 50)
            .then(setOrders).finally(() => setLoading(false));
    }, [user]);

    return (
        <motion.div
            className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col"
                onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-primary to-emerald-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-white" />
                        <h2 className="text-white font-bold">Đơn Hàng Của Tôi</h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"><X className="w-4 h-4 text-white" /></button>
                </div>

                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                    {loading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}
                    {!loading && orders.length === 0 && (
                        <div className="text-center py-10 space-y-2">
                            <Package className="w-12 h-12 text-gray-200 mx-auto" />
                            <p className="text-gray-400 text-sm">Bạn chưa có đơn hàng nào.</p>
                        </div>
                    )}
                    {orders.map((order, i) => {
                        const st = STATUS[order.status] || STATUS.pending;
                        const Icon = st.icon;
                        return (
                            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="border border-gray-100 rounded-2xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400">#{(order.id || '').slice(-8).toUpperCase()}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.created_date).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${st.color}`}>
                                        <Icon className="w-3 h-3" />{st.label}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {(order.items || []).map((item, j) => (
                                        <div key={j} className="flex justify-between text-xs text-gray-600">
                                            <span>{item.name} x{item.qty}</span>
                                            <span className="font-medium">{fmt(item.price * item.qty)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">{order.customer_address}</span>
                                    <span className="text-sm font-bold text-primary">{fmt(order.total_price)}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}