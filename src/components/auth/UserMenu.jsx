import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ShoppingBag, Gift, ChevronDown, Star } from 'lucide-react';
import { useAuthUser } from '../../context/AuthUserContext';
import { useLang } from '../../context/LanguageContext';
import { TIERS } from '../../lib/membership';
import MyOrdersModal from '../user/MyOrdersModal';

export default function UserMenu({ onOpenAuth }) {
    const navigate = useNavigate();
    const authCtx = useAuthUser();
    const { t } = useLang();
    const user = authCtx?.user;
    const userProfile = authCtx?.userProfile;
    const logout = authCtx?.logout || (() => { });
    const [open, setOpen] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    if (!user) {
        return (
            <button onClick={onOpenAuth}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                <User className="w-4 h-4" /> {t('user.login')}
            </button>
        );
    }

    const tier = userProfile?.membership_tier || 'bronze';
    const tierInfo = TIERS[tier];
    const totalOrders = userProfile?.total_orders || 0;

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-green-200 hover:border-primary/40 transition-all shadow-sm">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tierInfo.color} flex items-center justify-center text-sm`}>
                    {tierInfo.emoji}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[100px] truncate">
                    {userProfile?.full_name?.split(' ').pop() || user.email?.split('@')[0]}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-green-100 shadow-2xl overflow-hidden z-[100]">
                    <div className={`px-4 py-4 bg-gradient-to-r ${tierInfo.color} text-white`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">{tierInfo.emoji}</div>
                            <div>
                                <p className="font-bold text-sm">{userProfile?.full_name || user.email?.split('@')[0]}</p>
                                <p className="text-white/80 text-xs">{t('user.tier')} {tierInfo.name} · {totalOrders} {t('user.orders')}</p>
                            </div>
                        </div>
                        {tierInfo.discount > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t('user.discount')} {tierInfo.discount}%</span>
                                {tierInfo.freeship && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t('user.freeship')}</span>}
                            </div>
                        )}
                    </div>

                    <div className="p-2 space-y-0.5">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-sm text-gray-700 transition-colors"
                            onClick={() => { setOpen(false); setShowOrders(true); }}>
                            <ShoppingBag className="w-4 h-4 text-primary" /> {t('user.myOrders')}
                            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{userProfile?.total_orders || 0}</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-sm text-gray-700 transition-colors"
                            onClick={() => { setOpen(false); navigate('/vouchers'); }}>
                            <Gift className="w-4 h-4 text-amber-500" /> {t('user.myVouchers')}
                            {tierInfo.vouchers?.length > 0 && (
                                <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{tierInfo.vouchers.length}</span>
                            )}
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-sm text-gray-700 transition-colors"
                            onClick={() => { setOpen(false); navigate('/membership'); }}>
                            <Star className="w-4 h-4 text-yellow-500" /> {t('user.membership')}
                            <span className="ml-auto text-xs">{tierInfo.emoji}</span>
                        </button>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                        <button onClick={() => { logout(); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm text-red-500 transition-colors">
                            <LogOut className="w-4 h-4" /> {t('user.logout')}
                        </button>
                    </div>
                </div>
            )}

            {showOrders && <MyOrdersModal onClose={() => setShowOrders(false)} />}
        </div>
    );
}