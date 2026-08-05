export const TIERS = {
    bronze: {
        name: 'Đồng', emoji: '🥉',
        color: 'from-amber-600 to-yellow-700',
        bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700',
        minOrders: 0, minSpent: 0, discount: 0, freeship: false, vouchers: [],
        points_per_1000: 1,
        benefits: ['Thành viên cơ bản', 'Đặt hàng online', 'Tích điểm 1x'],
    },
    silver: {
        name: 'Bạc', emoji: '🥈',
        color: 'from-slate-400 to-gray-500',
        bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-600',
        minOrders: 3, minSpent: 60000, discount: 5, freeship: false, vouchers: ['SILVER5'],
        points_per_1000: 2,
        benefits: ['Giảm 5% toàn đơn', 'Tích điểm 2x', 'Ưu tiên hỗ trợ', 'Voucher sinh nhật'],
    },
    gold: {
        name: 'Vàng', emoji: '🥇',
        color: 'from-yellow-400 to-amber-500',
        bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700',
        minOrders: 8, minSpent: 200000, discount: 10, freeship: true, vouchers: ['GOLD10', 'FREESHIP'],
        points_per_1000: 3,
        benefits: ['Giảm 10% toàn đơn', 'Freeship toàn quốc', 'Tích điểm 3x', 'Voucher độc quyền', 'Quà tặng năm mới'],
    },
    diamond: {
        name: 'Kim Cương', emoji: '💎',
        color: 'from-cyan-400 to-blue-500',
        bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700',
        minOrders: 20, minSpent: 500000, discount: 15, freeship: true, vouchers: ['DIAMOND15', 'FREESHIP', 'VIP20'],
        points_per_1000: 5,
        benefits: ['Giảm 15% toàn đơn', 'Freeship toàn quốc', 'Tích điểm 5x', 'Thiết kế AI miễn phí', 'Nghệ nhân riêng', 'Hỗ trợ 24/7'],
    },
};

export const VOUCHER_CODES = {
    SILVER5: { discount: 5, type: 'percent', label: 'Giảm 5%', points_cost: 0, desc: 'Giảm 5% tổng đơn hàng', min_spend: 0 },
    GOLD10: { discount: 10, type: 'percent', label: 'Giảm 10%', points_cost: 0, desc: 'Giảm 10% tổng đơn hàng', min_spend: 0 },
    DIAMOND15: { discount: 15, type: 'percent', label: 'Giảm 15%', points_cost: 0, desc: 'Giảm 15% tổng đơn hàng', min_spend: 0 },
    VIP20: { discount: 20, type: 'percent', label: 'Giảm 20% VIP', points_cost: 0, desc: 'Giảm 20% cho thành viên VIP', min_spend: 0 },
    FREESHIP: { discount: 15000, type: 'fixed', label: 'Miễn phí ship', points_cost: 0, desc: 'Miễn phí vận chuyển', min_spend: 0 },
    // Redeemable via points
    WELCOME10: { discount: 10000, type: 'fixed', label: 'Giảm 10.000đ', points_cost: 50, desc: 'Giảm 10.000đ cho đơn từ 50.000đ', min_spend: 50000 },
    WEEKEND5: { discount: 5, type: 'percent', label: 'Giảm 5% Cuối tuần', points_cost: 30, desc: 'Giảm 5% cho đơn cuối tuần', min_spend: 20000 },
    SUMMER15: { discount: 15, type: 'percent', label: 'Giảm 15% Mùa Hè', points_cost: 100, desc: 'Giảm 15% mùa hè sôi động', min_spend: 100000 },
    BIG50: { discount: 50000, type: 'fixed', label: 'Giảm 50.000đ', points_cost: 200, desc: 'Giảm 50.000đ cho đơn lớn', min_spend: 300000 },
};

export const REDEEMABLE_VOUCHERS = ['WELCOME10', 'WEEKEND5', 'SUMMER15', 'BIG50'];

export function getTierByOrders(n) {
    if (n >= 20) return 'diamond';
    if (n >= 8) return 'gold';
    if (n >= 3) return 'silver';
    return 'bronze';
}

export function getNextTier(current) {
    const order = ['bronze', 'silver', 'gold', 'diamond'];
    const idx = order.indexOf(current);
    return idx < order.length - 1 ? order[idx + 1] : null;
}

export function getPoints(totalSpent, tier) {
    const tierInfo = TIERS[tier] || TIERS.bronze;
    return Math.floor((totalSpent || 0) / 1000) * tierInfo.points_per_1000;
}