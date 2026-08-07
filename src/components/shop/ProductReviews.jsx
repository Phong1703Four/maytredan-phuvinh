import { useState, useEffect } from 'react';
import { Star, Send, Loader2, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuthUser } from '../../context/AuthUserContext';
import { useLang } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductReviews({ productId, productName }) {
    const { user, userProfile } = useAuthUser() || {};
    const { lang } = useLang();
    const tr = (vi, en, es) => lang === 'vi' ? vi : lang === 'es' ? es : en;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!base44.entities.Review) {
            setLoading(false);
            return;
        }
        base44.entities.Review.filter({ product_id: productId }, '-created_date', 20)
            .then(setReviews).catch(() => setReviews([])).finally(() => setLoading(false));
    }, [productId]);

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        setSubmitting(true);
        if (!base44.entities.Review) {
            setSubmitting(false);
            return;
        }
        try {
            const review = await base44.entities.Review.create({
                product_id: productId,
                product_name: productName,
                reviewer_name: userProfile?.full_name || user?.email?.split('@')[0] || tr('Khách', 'Guest', 'Invitado'),
                reviewer_email: user?.email || '',
                rating,
                comment: comment.trim(),
            });
            setReviews(prev => [review, ...prev]);
            setComment('');
            setRating(5);
            setShowForm(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

    return (
        <div className="mt-4 border-t border-green-100 pt-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-gray-700">{tr('Đánh giá', 'Reviews', 'Reseñas')} ({reviews.length})</span>
                    {avg && <span className="text-xs text-yellow-500 font-bold flex items-center gap-0.5"><Star className="w-3 h-3 fill-yellow-400" />{avg}</span>}
                </div>
                <button onClick={() => setShowForm(!showForm)}
                    className="text-xs font-semibold text-primary hover:underline transition-all">
                    {showForm ? tr('Đóng', 'Close', 'Cerrar') : `+ ${tr('Viết đánh giá', 'Write review', 'Escribir reseña')}`}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden">
                        <div className="bg-green-50 rounded-xl p-3 mb-3 space-y-2 border border-green-100">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <button key={s} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(s)}>
                                        <Star className={`w-5 h-5 transition-colors ${s <= (hovered || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    </button>
                                ))}
                            </div>
                            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2}
                                placeholder={tr('Chia sẻ cảm nhận của bạn về sản phẩm...', 'Share your thoughts about this product...', 'Comparte tu opinión sobre este producto...')}
                                className="w-full px-3 py-2 rounded-xl border border-green-200 text-sm outline-none focus:border-primary resize-none bg-white" />
                            <button onClick={handleSubmit} disabled={!comment.trim() || submitting}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold disabled:opacity-50 hover:bg-primary/90 transition-all">
                                {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                {tr('Gửi đánh giá', 'Submit review', 'Enviar reseña')}
                            </button>
                        </div>
                    </motion.div>
                )}
                {success && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-2">
                        ✅ {tr('Cảm ơn bạn đã đánh giá!', 'Thank you for your review!', '¡Gracias por tu reseña!')}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {loading && <div className="text-xs text-gray-400 text-center py-2"><Loader2 className="w-4 h-4 animate-spin inline" /></div>}
                {!loading && reviews.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">{tr('Chưa có đánh giá nào. Hãy là người đầu tiên! 🌟', 'No reviews yet. Be the first! 🌟', '¡Aún no hay reseñas. ¡Sé el primero! 🌟')}</p>
                )}
                {reviews.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gray-700">{r.reviewer_name}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}