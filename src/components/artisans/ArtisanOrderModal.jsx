import { useState } from 'react';
import { X, Star, Clock, Package, Send, Loader2, CheckCircle2, ChevronLeft, Search, Eye, MessageSquare, ShoppingBag, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { ARTISANS } from '../../lib/artisans';
import { useAuthUser } from '../../context/AuthUserContext';
import { useLang } from '../../context/LanguageContext';
import ArtisanProfileModal from './ArtisanProfileModal';
import { playSuccess } from '../../lib/soundManager';

const ADMIN_EMAIL = 'phongnqfhl32746@gmail.com';
const SHOP_NAME = 'Phú Vinh Shop';

export default function ArtisanOrderModal({ designData, onClose }) {
    const { t } = useLang();
    const authCtx = useAuthUser();
    const user = authCtx?.user;
    const userProfile = authCtx?.userProfile;
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');
    const [profileArtisan, setProfileArtisan] = useState(null);
    const [form, setForm] = useState({
        name: userProfile?.full_name || '',
        phone: userProfile?.phone || '',
        email: user?.email || '',
        address: userProfile?.address || '',
        quantity: 1,
        budget: '',
        note: '',
    });

    const filtered = ARTISANS.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.specialty.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async () => {
        setError('');
        if (!form.name.trim() || !form.phone.trim()) { setError(t('artisan.fullName') + ' & ' + t('artisan.phone')); return; }
        setLoading(true);
        try {
            const order = await base44.entities.Order.create({
                customer_name: form.name,
                customer_email: form.email || '',
                customer_phone: form.phone,
                customer_address: form.address,
                items: [{ name: `Thiết kế custom: ${designData?.prompt || 'Theo thiết kế AI'}`, qty: form.quantity, price: 0 }],
                total_price: 0,
                original_price: 0,
                status: 'pending',
                order_type: 'custom_design',
                artisan_id: selected.id,
                artisan_name: selected.name,
                design_description: designData?.description || designData?.prompt || '',
                design_image_url: designData?.imageUrl || '',
                note: `Ngân sách: ${form.budget || 'Thỏa thuận'}. ${form.note}`,
            });

            await base44.integrations.Core.SendEmail({
                to: ADMIN_EMAIL,
                from_name: SHOP_NAME,
                subject: `[Phú Vinh] Đơn thiết kế AI mới – ${selected.name} – ${form.name}`,
                body: `<h2 style="color:#7c3aed">🎨 ĐƠN ĐẶT THIẾT KẾ AI MỚI</h2>
<h3>Nghệ nhân được chọn:</h3>
<p><b>${selected.name}</b> (${selected.age} tuổi) – ${selected.specialty}</p>
<p>Kinh nghiệm: ${selected.experience_years} năm | ⭐ ${selected.rating} | ${selected.total_orders} đơn hoàn thành</p>
<p>Giá tham khảo: ${selected.price_per_item} | Thời gian: ${selected.turnaround_days} ngày</p>
<hr/>
<h3>Thông tin khách hàng:</h3>
<p><b>Tên:</b> ${form.name} | <b>SĐT:</b> ${form.phone} | <b>Email:</b> ${form.email || '—'}</p>
<p><b>Địa chỉ:</b> ${form.address || 'Chưa cung cấp'}</p>
<hr/>
<h3>Thiết kế AI:</h3>
${designData?.imageUrl ? `<p><a href="${designData.imageUrl}">👆 Xem ảnh thiết kế</a></p><img src="${designData.imageUrl}" style="max-width:400px;border-radius:12px;margin:8px 0" />` : ''}
<p><b>Mô tả:</b> ${designData?.prompt || 'Xem ảnh đính kèm'}</p>
${designData?.description ? `<p><b>AI phân tích:</b> ${designData.description}</p>` : ''}
<p><b>Số lượng:</b> ${form.quantity} | <b>Ngân sách:</b> ${form.budget || 'Thỏa thuận'}</p>
${form.note ? `<p><b>Ghi chú:</b> ${form.note}</p>` : ''}
<p style="color:#999;font-size:11px">Order ID: ${order.id || ''}</p>`,
            });

            if (form.email) {
                await base44.integrations.Core.SendEmail({
                    to: form.email,
                    from_name: SHOP_NAME,
                    subject: `[Phú Vinh] Đã gửi đơn thiết kế đến ${selected.name}`,
                    body: `<h2>✅ Yêu cầu thiết kế đã được gửi!</h2>
<p>Xin chào <b>${form.name}</b>,</p>
<p>Yêu cầu của bạn đã được gửi đến nghệ nhân <b>${selected.name}</b>.</p>
<p>Thời gian hoàn thành dự kiến: <b>${selected.turnaround_days} ngày</b>.</p>
<p>Nghệ nhân sẽ liên hệ qua SĐT <b>${form.phone}</b>.</p>
<p style="color:#16a34a;font-weight:bold">Làng nghề Phú Vinh 🎋</p>`,
                });
            }

            playSuccess();
            setDone(true);
        } catch {
            setError(t('artisan.sending'));
        } finally {
            setLoading(false);
        }
    };

    if (done) return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center space-y-4" onClick={e => e.stopPropagation()}>
                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold">{t('artisan.sent')} {selected?.name}! 🎉</h3>
                <p className="text-sm text-gray-500">{t('artisan.sentDesc')} {selected?.turnaround_days} {t('artisan.sentDays')}</p>
                <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold">{t('artisan.closeBtn')}</button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {step === 2 && <button onClick={() => setStep(1)} className="p-1.5 rounded-lg bg-white/20"><ChevronLeft className="w-4 h-4" /></button>}
                        <span className="text-lg">🎨</span>
                        <div>
                            <h2 className="font-bold">{step === 1 ? t('artisan.choose') : t('artisan.orderInfo')}</h2>
                            <p className="text-white/70 text-xs">{ARTISANS.length} {t('artisan.count')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30"><X className="w-4 h-4" /></button>
                </div>

                {step === 1 && (
                    <div className="flex flex-col flex-1 overflow-hidden">
                        {designData?.imageUrl && (
                            <div className="mx-4 mt-3 p-3 rounded-xl bg-violet-50 border border-violet-200 flex items-center gap-3 flex-shrink-0">
                                <img src={designData.imageUrl} alt="Design" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-violet-700">{t('artisan.yourDesign')}</p>
                                    <p className="text-xs text-gray-500 truncate">{designData.prompt || 'Phú Vinh'}</p>
                                </div>
                            </div>
                        )}
                        <div className="px-4 pt-3 pb-2 flex-shrink-0">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('artisan.searchPh')}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 outline-none text-sm" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5">{filtered.filter(a => a.available).length} {t('artisan.available')}</p>
                        </div>
                        <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-2">
                            {filtered.map(a => (
                                <div key={a.id}
                                    className={`w-full p-4 rounded-2xl border transition-all ${a.available ? 'hover:border-violet-400 hover:shadow-md' : 'opacity-50 bg-gray-50 border-gray-200'}`}>
                                    <div className="flex items-start gap-3 cursor-pointer" onClick={() => setProfileArtisan(a)}>
                                        <img src={a.avatar_url} alt={a.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-bold text-sm text-gray-900">{a.name}</h3>
                                                <span className="text-xs text-gray-400">{a.age} tuổi</span>
                                                {!a.available && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t('artisan.busy')}</span>}
                                            </div>
                                            <p className="text-xs text-violet-600 font-medium mt-0.5">{a.specialty}</p>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{a.bio}</p>
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{a.rating}</span>
                                                <span className="flex items-center gap-1"><Award className="w-3 h-3" />{a.experience_years} năm KN</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.turnaround_days} ngày</span>
                                                <span className="flex items-center gap-1"><Package className="w-3 h-3" />{a.total_orders} đơn</span>
                                            </div>
                                            <p className="text-xs text-green-600 font-semibold mt-1">{a.price_per_item}</p>
                                        </div>
                                    </div>
                                    {a.available && (
                                        <button onClick={() => { setSelected(a); setStep(2); }}
                                            className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition-all">
                                            <ShoppingBag className="w-3.5 h-3.5" /> {t('artisan.orderWith')}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && selected && (
                    <div className="overflow-y-auto flex-1 p-5 space-y-4">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50 border border-violet-200">
                            <img src={selected.avatar_url} alt={selected.name} className="w-14 h-14 rounded-xl object-cover" />
                            <div>
                                <p className="font-bold text-sm">{selected.name}</p>
                                <p className="text-xs text-violet-600">{selected.specialty}</p>
                                <p className="text-xs text-gray-500 mt-1">⏱ Hoàn thành: {selected.turnaround_days} ngày | 💰 {selected.price_per_item}</p>
                            </div>
                        </div>

                        {[
                            { key: 'name', label: t('artisan.fullName'), type: 'text', ph: 'Nguyễn Văn A' },
                            { key: 'phone', label: t('artisan.phone'), type: 'tel', ph: '0912345678' },
                            { key: 'email', label: t('artisan.email'), type: 'email', ph: 'email@example.com' },
                            { key: 'address', label: t('artisan.address'), type: 'text', ph: '...' },
                            { key: 'budget', label: t('artisan.budget'), type: 'text', ph: '200.000đ – 500.000đ' },
                        ].map(({ key, label, type, ph }) => (
                            <div key={key}>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                                <input type={type} value={form[key]} placeholder={ph}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 outline-none text-sm" />
                            </div>
                        ))}

                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">{t('artisan.quantity')}</label>
                            <input type="number" min={1} value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 outline-none text-sm" />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">{t('artisan.note')}</label>
                            <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder={t('artisan.notePh')} rows={3}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 outline-none text-sm resize-none" />
                        </div>

                        {error && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">⚠️ {error}</div>}

                        <button onClick={handleSubmit} disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('artisan.sending')}</> : <><Send className="w-4 h-4" /> {t('artisan.send')}</>}
                        </button>
                    </div>
                )}
            </div>
            {profileArtisan && (
                <ArtisanProfileModal
                    artisan={profileArtisan}
                    onClose={() => setProfileArtisan(null)}
                    onOrder={() => { setSelected(profileArtisan); setProfileArtisan(null); setStep(2); }}
                />
            )}
        </div>
    );
}