import { useState } from 'react';
import { X, MapPin, Phone, Mail, User, Tag, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { TIERS, VOUCHER_CODES, getTierByOrders } from '../../lib/membership';
import { useAuthUser } from '../../context/AuthUserContext';
import { useLang } from '../../context/LanguageContext';
import { playSuccess } from '../../lib/soundManager';
import { trackCheckout } from '../../lib/analytics';

const TEXT = {
    vi: { title: 'Thông tin giao hàng', tier: 'Hạng', noOffer: 'Chưa có ưu đãi', freeship: 'Freeship', name: 'Họ và tên *', namePh: 'Nguyễn Văn A', phone: 'Số điện thoại *', phonePh: '0912345678', email: 'Email (nhận xác nhận)', emailPh: 'email@example.com', address: 'Địa chỉ giao hàng *', addressPh: 'Số nhà, đường, quận, thành phố', voucher: 'Mã voucher', voucherPh: 'Nhập mã...', apply: 'Áp dụng', vNotExist: 'Mã voucher không tồn tại.', vNotAllowed: 'Hạng thành viên của bạn chưa có voucher này.', vApplied: 'đã áp dụng!', note: 'Ghi chú', notePh: 'Yêu cầu đặc biệt...', errName: 'Vui lòng nhập họ tên.', errPhone: 'Vui lòng nhập số điện thoại.', errPhoneInvalid: 'Số điện thoại không hợp lệ (cần ít nhất 7 chữ số).', errAddress: 'Vui lòng nhập địa chỉ giao hàng.', errOrder: 'Có lỗi khi đặt hàng. Vui lòng thử lại.', subtotal: 'Tạm tính', shipping: 'Phí ship', discount: 'Giảm giá', total: 'Tổng cộng', free: 'Miễn phí 🎉', processing: 'Đang xử lý...', confirm: '🛍️ Xác Nhận Đặt Hàng', success: 'Đặt hàng thành công! 🎉', successDesc: 'Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.', emailSent: 'Email xác nhận đã gửi đến', continueShop: 'Tiếp tục mua sắm 🛍️', discountLabel: 'Giảm' },
    en: { title: 'Shipping Information', tier: 'Tier', noOffer: 'No offers', freeship: 'Free shipping', name: 'Full name *', namePh: 'John Doe', phone: 'Phone number *', phonePh: '0912345678', email: 'Email (for confirmation)', emailPh: 'email@example.com', address: 'Shipping address *', addressPh: 'House number, street, district, city', voucher: 'Voucher code', voucherPh: 'Enter code...', apply: 'Apply', vNotExist: 'Voucher code does not exist.', vNotAllowed: 'Your membership tier does not have this voucher.', vApplied: 'applied!', note: 'Note', notePh: 'Special requests...', errName: 'Please enter your name.', errPhone: 'Please enter your phone number.', errPhoneInvalid: 'Invalid phone number (at least 7 digits).', errAddress: 'Please enter your shipping address.', errOrder: 'Error placing order. Please try again.', subtotal: 'Subtotal', shipping: 'Shipping', discount: 'Discount', total: 'Total', free: 'Free 🎉', processing: 'Processing...', confirm: '🛍️ Confirm Order', success: 'Order Successful! 🎉', successDesc: 'We will contact you as soon as possible.', emailSent: 'Confirmation email sent to', continueShop: 'Continue Shopping 🛍️', discountLabel: 'Off' },
    es: { title: 'Información de Envío', tier: 'Nivel', noOffer: 'Sin ofertas', freeship: 'Envío gratis', name: 'Nombre completo *', namePh: 'Juan Pérez', phone: 'Número de teléfono *', phonePh: '0912345678', email: 'Email (para confirmación)', emailPh: 'email@example.com', address: 'Dirección de envío *', addressPh: 'Número, calle, distrito, ciudad', voucher: 'Código de cupón', voucherPh: 'Introducir código...', apply: 'Aplicar', vNotExist: 'El código del cupón no existe.', vNotAllowed: 'Tu nivel de membresía no tiene este cupón.', vApplied: 'aplicado!', note: 'Nota', notePh: 'Peticiones especiales...', errName: 'Por favor ingresa tu nombre.', errPhone: 'Por favor ingresa tu número de teléfono.', errPhoneInvalid: 'Número de teléfono inválido (mínimo 7 dígitos).', errAddress: 'Por favor ingresa tu dirección de envío.', errOrder: 'Error al realizar el pedido. Inténtalo de nuevo.', subtotal: 'Subtotal', shipping: 'Envío', discount: 'Descuento', total: 'Total', free: 'Gratis 🎉', processing: 'Procesando...', confirm: '🛍️ Confirmar Pedido', success: '¡Pedido Exitoso! 🎉', successDesc: 'Te contactaremos lo antes posible.', emailSent: 'Email de confirmación enviado a', continueShop: 'Seguir Comprando 🛍️', discountLabel: 'Desc.' },
    zh: { title: '配送信息', tier: '等级', noOffer: '无优惠', freeship: '免运费', name: '姓名 *', namePh: '张三', phone: '电话号码 *', phonePh: '0912345678', email: '邮箱（确认用）', emailPh: 'email@example.com', address: '配送地址 *', addressPh: '门牌号，街道，区，城市', voucher: '优惠券码', voucherPh: '输入代码...', apply: '应用', vNotExist: '优惠券码不存在。', vNotAllowed: '您的会员等级没有此优惠券。', vApplied: '已应用!', note: '备注', notePh: '特殊要求...', errName: '请输入您的姓名。', errPhone: '请输入您的电话号码。', errPhoneInvalid: '电话号码无效（至少7位数字）。', errAddress: '请输入您的配送地址。', errOrder: '下单出错，请重试。', subtotal: '小计', shipping: '运费', discount: '折扣', total: '总计', free: '免费 🎉', processing: '处理中...', confirm: '🛍️ 确认订单', success: '下单成功！🎉', successDesc: '我们将尽快联系您。', emailSent: '确认邮件已发送至', continueShop: '继续购物 🛍️', discountLabel: '减' },
    ru: { title: 'Информация о доставке', tier: 'Уровень', noOffer: 'Нет предложений', freeship: 'Бесплатная доставка', name: 'Полное имя *', namePh: 'Иван Иванов', phone: 'Номер телефона *', phonePh: '0912345678', email: 'Email (для подтверждения)', emailPh: 'email@example.com', address: 'Адрес доставки *', addressPh: 'Дом, улица, район, город', voucher: 'Код купона', voucherPh: 'Введите код...', apply: 'Применить', vNotExist: 'Код купона не существует.', vNotAllowed: 'Ваш уровень членства не имеет этого купона.', vApplied: 'применён!', note: 'Заметка', notePh: 'Особые пожелания...', errName: 'Пожалуйста, введите имя.', errPhone: 'Пожалуйста, введите номер телефона.', errPhoneInvalid: 'Неверный номер телефона (минимум 7 цифр).', errAddress: 'Пожалуйста, введите адрес доставки.', errOrder: 'Ошибка при заказе. Попробуйте снова.', subtotal: 'Подытог', shipping: 'Доставка', discount: 'Скидка', total: 'Итого', free: 'Бесплатно 🎉', processing: 'Обработка...', confirm: '🛍️ Подтвердить заказ', success: 'Заказ успешен! 🎉', successDesc: 'Мы свяжемся с вами как можно скорее.', emailSent: 'Письмо подтверждения отправлено на', continueShop: 'Продолжить покупки 🛍️', discountLabel: 'Скидка' },
    th: { title: 'ข้อมูลการจัดส่ง', tier: 'ระดับ', noOffer: 'ไม่มีข้อเสนอ', freeship: 'จัดส่งฟรี', name: 'ชื่อเต็ม *', namePh: 'สมชาย ใจดี', phone: 'เบอร์โทร *', phonePh: '0912345678', email: 'อีเมล (ยืนยัน)', emailPh: 'email@example.com', address: 'ที่อยู่จัดส่ง *', addressPh: 'บ้านเลขที่ ถนน แขวง เมือง', voucher: 'รหัสคูปอง', voucherPh: 'กรอกรหัส...', apply: 'ใช้', vNotExist: 'รหัสคูปองไม่มีอยู่', vNotAllowed: 'ระดับสมาชิกของคุณไม่มีคูปองนี้', vApplied: 'ใช้แล้ว!', note: 'หมายเหตุ', notePh: 'คำขอพิเศษ...', errName: 'กรุณากรอกชื่อ', errPhone: 'กรุณากรอกเบอร์โทร', errPhoneInvalid: 'เบอร์โทรไม่ถูกต้อง (อย่างน้อย 7 หลัก)', errAddress: 'กรุณากรอกที่อยู่จัดส่ง', errOrder: 'เกิดข้อผิดพลาด กรุณาลองใหม่', subtotal: 'รวมย่อย', shipping: 'ค่าจัดส่ง', discount: 'ส่วนลด', total: 'รวมทั้งหมด', free: 'ฟรี 🎉', processing: 'กำลังดำเนินการ...', confirm: '🛍️ ยืนยันคำสั่งซื้อ', success: 'สั่งซื้อสำเร็จ! 🎉', successDesc: 'เราจะติดต่อคุณโดยเร็วที่สุด', emailSent: 'อีเมลยืนยันส่งไปที่', continueShop: 'ซื้อของต่อ 🛍️', discountLabel: 'ลด' },
    hi: { title: 'शिपिंग जानकारी', tier: 'स्तर', noOffer: 'कोई ऑफर नहीं', freeship: 'मुफ्त शिपिंग', name: 'पूरा नाम *', namePh: 'राम शर्मा', phone: 'फ़ोन नंबर *', phonePh: '0912345678', email: 'ईमेल (पुष्टिकरण)', emailPh: 'email@example.com', address: 'शिपिंग पता *', addressPh: 'घर संख्या, गली, जिला, शहर', voucher: 'कूपन कोड', voucherPh: 'कोड दर्ज करें...', apply: 'लागू करें', vNotExist: 'कूपन कोड मौजूद नहीं है।', vNotAllowed: 'आपके सदस्यता स्तर में यह कूपन नहीं है।', vApplied: 'लागू!', note: 'नोट', notePh: 'विशेष अनुरोध...', errName: 'कृपया अपना नाम दर्ज करें।', errPhone: 'कृपया अपना फ़ोन नंबर दर्ज करें।', errPhoneInvalid: 'अमान्य फ़ोन नंबर (कम से कम 7 अंक)।', errAddress: 'कृपया अपना शिपिंग पता दर्ज करें।', errOrder: 'ऑर्डर में त्रुटि। पुनः प्रयास करें।', subtotal: 'उपकुल', shipping: 'शिपिंग', discount: 'छूट', total: 'कुल', free: 'मुफ्त 🎉', processing: 'प्रसंस्करण...', confirm: '🛍️ ऑर्डर की पुष्टि करें', success: 'ऑर्डर सफल! 🎉', successDesc: 'हम जल्द से जल्द आपसे संपर्क करेंगे।', emailSent: 'पुष्टिकरण ईमेल भेजा गया', continueShop: 'खरीदारी जारी रखें 🛍️', discountLabel: 'छूट' },
    ja: { title: '配送情報', tier: 'ランク', noOffer: 'オファーなし', freeship: '送料無料', name: '氏名 *', namePh: '山田太郎', phone: '電話番号 *', phonePh: '0912345678', email: 'メール（確認用）', emailPh: 'email@example.com', address: '配送先住所 *', addressPh: '番地、通り、区、市', voucher: 'バウチャーコード', voucherPh: 'コード入力...', apply: '適用', vNotExist: 'バウチャーコードが存在しません。', vNotAllowed: '会員ランクにこのバウチャーはありません。', vApplied: '適用済み!', note: 'メモ', notePh: '特別なリクエスト...', errName: '氏名を入力してください。', errPhone: '電話番号を入力してください。', errPhoneInvalid: '無効な電話番号（7桁以上）。', errAddress: '配送先住所を入力してください。', errOrder: '注文エラー。再試行してください。', subtotal: '小計', shipping: '配送料', discount: '割引', total: '合計', free: '無料 🎉', processing: '処理中...', confirm: '🛍️ 注文を確認', success: '注文成功！🎉', successDesc: 'できるだけ早くご連絡します。', emailSent: '確認メールを送信しました:', continueShop: '買い物を続ける 🛍️', discountLabel: '割引' },
    ko: { title: '배송 정보', tier: '등급', noOffer: '혜택 없음', freeship: '무료배송', name: '이름 *', namePh: '김철수', phone: '전화번호 *', phonePh: '0912345678', email: '이메일(확인용)', emailPh: 'email@example.com', address: '배송 주소 *', addressPh: '번지, 도로, 구, 도시', voucher: '바우처 코드', voucherPh: '코드 입력...', apply: '적용', vNotExist: '바우처 코드가 존재하지 않습니다.', vNotAllowed: '회원 등급에 이 바우처가 없습니다.', vApplied: '적용됨!', note: '메모', notePh: '특별 요청...', errName: '이름을 입력해 주세요.', errPhone: '전화번호를 입력해 주세요.', errPhoneInvalid: '잘못된 전화번호 (최소 7자리).', errAddress: '배송 주소를 입력해 주세요.', errOrder: '주문 오류. 다시 시도해 주세요.', subtotal: '소계', shipping: '배송비', discount: '할인', total: '합계', free: '무료 🎉', processing: '처리 중...', confirm: '🛍️ 주문 확인', success: '주문 성공! 🎉', successDesc: '최대한 빨리 연락드리겠습니다.', emailSent: '확인 이메일 발송:', continueShop: '쇼핑 계속 🛍️', discountLabel: '할인' },
};

const ADMIN_EMAIL = 'phongnqfhl32746@gmail.com';
const SHOP_NAME = 'Phú Vinh Shop';

export default function CheckoutModal({ cart, onClose, onSuccess }) {
    const authCtx = useAuthUser();
    const { lang } = useLang();
    const user = authCtx?.user;
    const userProfile = authCtx?.userProfile;
    const refreshProfile = authCtx?.refreshProfile || (() => { });
    const tx = TEXT[lang] || TEXT.vi;
    const fmt = (n) => n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') + (lang === 'vi' ? 'đ' : '₫');

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [voucherInput, setVoucherInput] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [voucherError, setVoucherError] = useState('');
    const [formError, setFormError] = useState('');
    const [form, setForm] = useState({
        name: userProfile?.full_name || '',
        phone: userProfile?.phone || '',
        email: user?.email || '',
        address: userProfile?.address || '',
        note: '',
    });

    const tier = userProfile?.membership_tier || 'bronze';
    const tierInfo = TIERS[tier];
    const validCart = Array.isArray(cart) ? cart : [];
    const subtotal = validCart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
    const shippingFee = tierInfo.freeship ? 0 : 15000;

    let discountAmount = 0;
    if (appliedVoucher) {
        const v = VOUCHER_CODES[appliedVoucher];
        discountAmount = v.type === 'percent' ? Math.round(subtotal * v.discount / 100) : v.discount;
    } else if (tierInfo.discount > 0) {
        discountAmount = Math.round(subtotal * tierInfo.discount / 100);
    }
    const total = subtotal + shippingFee - discountAmount;

    const applyVoucher = () => {
        setVoucherError('');
        const code = voucherInput.trim().toUpperCase();
        if (!code) return;
        if (!VOUCHER_CODES[code]) { setVoucherError(tx.vNotExist); return; }
        const allowed = tierInfo.vouchers || [];
        if (!allowed.includes(code)) { setVoucherError(tx.vNotAllowed); return; }
        setAppliedVoucher(code);
        setVoucherInput('');
    };

    const validate = () => {
        if (!form.name.trim()) return tx.errName;
        if (!form.phone.trim()) return tx.errPhone;
        if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) return tx.errPhoneInvalid;
        if (!form.address.trim()) return tx.errAddress;
        return null;
    };

    const handleOrder = async () => {
        setFormError('');
        const err = validate();
        if (err) { setFormError(err); return; }
        setLoading(true);
        try {
            const orderData = {
                customer_name: form.name,
                customer_email: form.email || '',
                customer_phone: form.phone,
                customer_address: form.address,
                items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
                total_price: total,
                original_price: subtotal,
                voucher_code: appliedVoucher || '',
                discount_amount: discountAmount,
                freeship: tierInfo.freeship,
                status: 'pending',
                order_type: 'shop',
                membership_tier: tier,
                note: form.note,
            };

            const order = await base44.entities.Order.create(orderData);
            const itemsList = cart.map(i => `• ${i.name} x${i.qty} = ${fmt(i.price * i.qty)}`).join('\n');

            await base44.integrations.Core.SendEmail({
                to: ADMIN_EMAIL,
                from_name: SHOP_NAME,
                subject: `[Phú Vinh] Đơn hàng mới #${(order.id || '').slice(-6).toUpperCase()} – ${form.name}`,
                body: `<h2 style="color:#16a34a">🛍️ ĐƠN HÀNG MỚI – PHÚ VINH SHOP</h2>
<table style="border-collapse:collapse;width:100%">
<tr><td style="padding:6px;color:#555"><b>Khách hàng:</b></td><td>${form.name}</td></tr>
<tr><td style="padding:6px;color:#555"><b>SĐT:</b></td><td>${form.phone}</td></tr>
<tr><td style="padding:6px;color:#555"><b>Email:</b></td><td>${form.email || '—'}</td></tr>
<tr><td style="padding:6px;color:#555"><b>Địa chỉ:</b></td><td>${form.address}</td></tr>
<tr><td style="padding:6px;color:#555"><b>Hạng:</b></td><td>${tierInfo.emoji} ${tierInfo.name}</td></tr>
</table>
<hr/>
<h3>Sản phẩm:</h3><pre style="background:#f9fafb;padding:12px;border-radius:8px">${itemsList}</pre>
<hr/>
<p>Tạm tính: <b>${fmt(subtotal)}</b></p>
<p>Ship: <b>${shippingFee === 0 ? 'Miễn phí 🎉' : fmt(shippingFee)}</b></p>
${discountAmount > 0 ? `<p>Giảm giá: <b>-${fmt(discountAmount)}</b>${appliedVoucher ? ` (${appliedVoucher})` : ''}</p>` : ''}
<h2 style="color:#16a34a;font-size:22px">TỔNG: ${fmt(total)}</h2>
${form.note ? `<p><i>Ghi chú: ${form.note}</i></p>` : ''}
<p style="color:#999;font-size:11px">ID: ${order.id || ''}</p>`,
            });

            if (form.email) {
                await base44.integrations.Core.SendEmail({
                    to: form.email,
                    from_name: SHOP_NAME,
                    subject: `[Phú Vinh] Xác nhận đơn hàng – ${form.name}`,
                    body: `<h2>✅ Đặt hàng thành công!</h2>
<p>Xin chào <b>${form.name}</b>, cảm ơn bạn đã mua sắm tại <b>Phú Vinh</b>.</p>
<h3>Đơn hàng của bạn:</h3>
<pre style="background:#f9fafb;padding:12px;border-radius:8px">${itemsList}</pre>
<p><b>Tổng: ${fmt(total)}</b></p>
<p>Chúng tôi sẽ liên hệ qua SĐT <b>${form.phone}</b> để xác nhận giao hàng.</p>
<p style="color:#16a34a;font-weight:bold">Làng nghề Phú Vinh 🎋</p>`,
                });
            }

            if (userProfile) {
                const newTotal = (userProfile.total_orders || 0) + 1;
                const newSpent = (userProfile.total_spent || 0) + total;
                await base44.entities.UserProfile.update(userProfile.id, {
                    total_orders: newTotal,
                    total_spent: newSpent,
                    membership_tier: getTierByOrders(newTotal),
                });
                await refreshProfile(user?.email);
            }

            playSuccess();
            trackCheckout(total, cart.length);
            setDone(true);
        } catch {
            setFormError(tx.errOrder);
        } finally {
            setLoading(false);
        }
    };

    if (done) return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center space-y-4" onClick={e => e.stopPropagation()}>
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{tx.success}</h3>
                <p className="text-gray-500 text-sm">{tx.successDesc}</p>
                {form.email && <p className="text-xs text-gray-400">{tx.emailSent} <b>{form.email}</b></p>}
                <button onClick={() => { onSuccess?.(); onClose(); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold">
                    {tx.continueShop}
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-primary to-emerald-600 px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5" />
                        <h2 className="font-bold">{tx.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"><X className="w-4 h-4" /></button>
                </div>

                <div className="overflow-y-auto flex-1 p-5 space-y-4">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${tierInfo.bg} border ${tierInfo.border}`}>
                        <span className="text-2xl">{tierInfo.emoji}</span>
                        <div>
                            <p className={`text-sm font-bold ${tierInfo.text}`}>{tx.tier} {tierInfo.name}</p>
                            <p className="text-xs text-gray-500">{tierInfo.discount > 0 ? `${tx.discountLabel} ${tierInfo.discount}%` : tx.noOffer}{tierInfo.freeship ? ` · ${tx.freeship}` : ''}</p>
                        </div>
                    </div>

                    {[
                        { icon: User, key: 'name', label: tx.name, type: 'text', ph: tx.namePh },
                        { icon: Phone, key: 'phone', label: tx.phone, type: 'tel', ph: tx.phonePh },
                        { icon: Mail, key: 'email', label: tx.email, type: 'email', ph: tx.emailPh },
                        { icon: MapPin, key: 'address', label: tx.address, type: 'text', ph: tx.addressPh },
                    ].map(({ icon: Icon, key, label, type, ph }) => (
                        <div key={key}>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                            <div className="relative">
                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type={type} value={form[key]} placeholder={ph}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                            </div>
                        </div>
                    ))}

                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">{tx.voucher}</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input value={voucherInput} onChange={e => setVoucherInput(e.target.value.toUpperCase())} placeholder={tx.voucherPh}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm" />
                            </div>
                            <button onClick={applyVoucher} className="px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all">{tx.apply}</button>
                        </div>
                        {voucherError && <p className="text-xs text-red-500 mt-1">{voucherError}</p>}
                        {appliedVoucher && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {appliedVoucher} {tx.vApplied}</p>}
                        {tierInfo.vouchers?.length > 0 && (
                            <div className="mt-2 flex gap-1.5 flex-wrap">
                                {tierInfo.vouchers.map(v => (
                                    <button key={v} onClick={() => { setAppliedVoucher(v); setVoucherInput(''); setVoucherError(''); }}
                                        className={`px-2 py-1 rounded-lg border text-xs font-medium transition-all ${appliedVoucher === v ? 'bg-primary text-white border-primary' : 'bg-green-50 border-green-200 text-green-700 hover:bg-primary/10'}`}>
                                        {v}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">{tx.note}</label>
                        <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder={tx.notePh} rows={2}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm resize-none" />
                    </div>

                    {formError && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">⚠️ {formError}</div>}
                </div>

                <div className="p-5 border-t border-gray-100 bg-gray-50 flex-shrink-0 space-y-3">
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-gray-600"><span>{tx.subtotal}</span><span>{fmt(subtotal)}</span></div>
                        <div className="flex justify-between text-gray-600"><span>{tx.shipping}</span><span>{shippingFee === 0 ? <span className="text-green-600 font-medium">{tx.free}</span> : fmt(shippingFee)}</span></div>
                        {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>{tx.discount}</span><span>-{fmt(discountAmount)}</span></div>}
                        <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200"><span>{tx.total}</span><span className="text-primary text-lg">{fmt(total)}</span></div>
                    </div>
                    <button onClick={handleOrder} disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {tx.processing}</> : tx.confirm}
                    </button>
                </div>
            </div>
        </div>
    );
}