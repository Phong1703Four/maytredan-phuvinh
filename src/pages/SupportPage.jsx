import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, RefreshCw, Shield, Sparkles, HelpCircle, ChevronDown, Phone, Mail, MapPin, Clock, LifeBuoy } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const POLICIES = {
    vi: {
        tabs: [
            {
                id: 'shipping', icon: Truck, title: 'Chính Sách Giao Hàng', short: 'Giao hàng', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700',
                sections: [
                    { h: 'Phạm vi giao hàng', p: 'Phú Vinh Shop giao hàng toàn quốc 63 tỉnh thành. Nội thành Hà Nội giao trong 1-2 ngày, các tỉnh khác 3-5 ngày làm việc.' },
                    { h: 'Phí ship', p: 'Phí ship nội thành HN: 15.000đ. Tỉnh xa: 25.000-40.000đ tùy khu vực. Thành viên Vàng (8+ đơn) và Kim Cương (20+ đơn) được MIỄN PHÍ SHIP toàn quốc.' },
                    { h: 'Giao hàng quốc tế', p: 'Sản phẩm Phú Vinh có mặt tại 50+ quốc gia. Phí ship quốc tế tính theo bảng giá của đơn vị vận chuyển. Thời gian 7-21 ngày tùy khu vực.' },
                    { h: 'Theo dõi đơn', p: 'Sau khi đặt hàng, bạn nhận email xác nhận kèm mã đơn. Liên hệ 0912 345 678 để tra cứu tình trạng giao hàng bất cứ lúc nào.' },
                ],
            },
            {
                id: 'returns', icon: RefreshCw, title: 'Đổi Trả', short: 'Đổi trả', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
                sections: [
                    { h: 'Chính sách 7 ngày', p: 'Bạn có thể đổi hoặc trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi từ nhà sản xuất.' },
                    { h: 'Điều kiện đổi trả', p: 'Sản phẩm còn nguyên trạng, không sử dụng, còn đầy đủ phụ kiện và bao bì. Lỗi do vận chuyển hoặc sản xuất sẽ được đổi miễn phí.' },
                    { h: 'Quy trình', p: '1. Liên hệ hotline 0912 345 678 để báo lỗi. 2. Gửi ảnh sản phẩm lỗi. 3. Shop gửi đơn vị lấy hàng tận nơi. 4. Đổi/trả trong 3-5 ngày.' },
                    { h: 'Hoàn tiền', p: 'Hoàn tiền 100% trong vòng 7 ngày làm việc nếu sản phẩm lỗi do nhà sản xuất. Chuyển khoản qua ngân hàng hoặc Zalo Pay.' },
                ],
            },
            {
                id: 'warranty', icon: Shield, title: 'Bảo Hành', short: 'Bảo hành', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',
                sections: [
                    { h: 'Bảo hành 12 tháng', p: 'Mọi sản phẩm mây tre đan Phú Vinh được bảo hành thủ công 12 tháng kể từ ngày mua. Bao gồm sửa chữa, thay thế chi tiết hỏng hóc.' },
                    { h: 'Điều kiện bảo hành', p: 'Bảo hành áp dụng cho lỗi kết cấu, đứt mây, bong sơn do sản xuất. Không bao gồm hư hỏng do sử dụng sai cách, ngâm nước, hoặc va đập mạnh.' },
                    { h: 'Cách yêu cầu', p: 'Liên hệ 0912 345 678 hoặc email contact@phuvinhmaytredan.vn kèm mã đơn và ảnh sản phẩm. Shop sẽ sắp xếp sửa chữa miễn phí.' },
                    { h: 'Bảo hành trọn đời', p: 'Thành viên Kim Cương (20+ đơn) được bảo hành trọn đời cho mọi sản phẩm đã mua — sửa chữa miễn phí không giới hạn thời gian.' },
                ],
            },
            {
                id: 'care', icon: Sparkles, title: 'Hướng Dẫn Bảo Quản', short: 'Bảo quản', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700',
                sections: [
                    { h: 'Giữ khô ráo', p: 'Tránh ngâm nước lâu hoặc để sản phẩm trong môi trường ẩm ướt. Nếu bị ướt, lau khô ngay bằng khăn mềm và phơi ở nơi thoáng mát.' },
                    { h: 'Tránh ánh nắng trực tiếp', p: 'Ánh nắng mặt trời kéo dài làm mây tre khô giòn và phai màu. Đặt sản phẩm ở nơi có ánh sáng dịu, tránh cửa sổ hướng tây.' },
                    { h: 'Vệ sinh', p: 'Lau bụi định kỳ bằng khăn khô hoặc bàn chải mềm. Không dùng hóa chất tẩy rửa. Có thể dùng máy hút bụi chế độ nhẹ để làm sạch kẽ đan.' },
                    { h: 'Bảo quản lâu dài', p: 'Nếu không sử dụng lâu, bọc sản phẩm trong túi vải thoáng khí, cho gói hút ẩm vào bên trong. Tránh đè nặng lên sản phẩm.' },
                ],
            },
            {
                id: 'faq', icon: HelpCircle, title: 'Câu Hỏi Thường Gặp', short: 'FAQ', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700',
                items: [
                    { q: 'Sản phẩm có phải handmade 100% không?', a: 'Đúng, 100% sản phẩm được đan tay bởi nghệ nhân Phú Vinh. Mỗi sản phẩm là độc bản, không có hai chiếc giống hệt nhau.' },
                    { q: 'Tôi có thể đặt thiết kế riêng không?', a: 'Có! Sử dụng công cụ AI Design trên trang chủ để tạo mẫu, sau đó đặt hàng với nghệ nhân. Hoặc liên hệ trực tiếp để được tư vấn.' },
                    { q: 'Thời gian giao hàng bao lâu?', a: 'Nội thành Hà Nội 1-2 ngày, tỉnh khác 3-5 ngày. Quốc tế 7-21 ngày tùy khu vực.' },
                    { q: 'Làm sao để lên hạng thành viên?', a: 'Đặt hàng tích lũy: 3 đơn lên Bạc, 8 đơn lên Vàng (freeship), 20 đơn lên Kim Cương (giảm 15% + bảo hành trọn đời).' },
                    { q: 'Sản phẩm có an toàn cho trẻ em không?', a: 'Có, nguyên liệu tự nhiên 100% (mây, tre), không hóa chất độc hại. Đạt chứng nhận OEKO-TEX an toàn cho trẻ em.' },
                    { q: 'Tôi có thể đổi trả không?', a: 'Có, đổi trả miễn phí trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất. Xem chi tiết tại mục Đổi Trả.' },
                ],
            },
        ],
    },
    en: {
        tabs: [
            {
                id: 'shipping', icon: Truck, title: 'Shipping Policy', short: 'Shipping', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700',
                sections: [
                    { h: 'Shipping Coverage', p: 'Phú Vinh Shop ships nationwide to all 63 provinces. Hanoi inner city 1-2 days, other provinces 3-5 business days.' },
                    { h: 'Shipping Fees', p: 'Hanoi: 15,000đ. Remote provinces: 25,000-40,000đ. Gold (8+ orders) and Diamond (20+ orders) members get FREE nationwide shipping.' },
                    { h: 'International Shipping', p: 'Phú Vinh products are available in 50+ countries. International shipping rates apply. Delivery 7-21 days depending on region.' },
                    { h: 'Order Tracking', p: 'After ordering, you receive a confirmation email with your order ID. Call 0912 345 678 to track your shipment anytime.' },
                ],
            },
            {
                id: 'returns', icon: RefreshCw, title: 'Returns', short: 'Returns', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
                sections: [
                    { h: '7-Day Policy', p: 'You can exchange or return products within 7 days of receipt if the product has a manufacturing defect.' },
                    { h: 'Return Conditions', p: 'Product must be in original condition, unused, with all accessories and packaging. Manufacturing or shipping defects are exchanged for free.' },
                    { h: 'Process', p: '1. Call 0912 345 678 to report. 2. Send photos of the defect. 3. We arrange pickup. 4. Exchange/return within 3-5 days.' },
                    { h: 'Refunds', p: '100% refund within 7 business days for manufacturing defects. Bank transfer or Zalo Pay.' },
                ],
            },
            {
                id: 'warranty', icon: Shield, title: 'Warranty', short: 'Warranty', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',
                sections: [
                    { h: '12-Month Warranty', p: 'All Phú Vinh bamboo products come with a 12-month craftsmanship warranty. Includes repair and replacement of damaged parts.' },
                    { h: 'Warranty Conditions', p: 'Covers structural defects, broken rattan, peeling finish. Does not cover damage from misuse, water immersion, or strong impact.' },
                    { h: 'How to Claim', p: 'Contact 0912 345 678 or email contact@phuvinhmaytredan.vn with your order ID and product photos. Free repair arranged.' },
                    { h: 'Lifetime Warranty', p: 'Diamond members (20+ orders) get lifetime warranty on all purchased products — free unlimited repairs.' },
                ],
            },
            {
                id: 'care', icon: Sparkles, title: 'Care Guide', short: 'Care', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700',
                sections: [
                    { h: 'Keep Dry', p: 'Avoid prolonged water immersion or humid environments. If wet, dry immediately with a soft cloth and air-dry in a cool place.' },
                    { h: 'Avoid Direct Sunlight', p: 'Prolonged sun exposure makes bamboo brittle and faded. Place in soft light, avoid west-facing windows.' },
                    { h: 'Cleaning', p: 'Dust regularly with a dry cloth or soft brush. No chemical cleaners. Use a vacuum on low setting for weave gaps.' },
                    { h: 'Long-term Storage', p: 'Wrap in breathable fabric with silica gel packets. Avoid stacking heavy items on top.' },
                ],
            },
            {
                id: 'faq', icon: HelpCircle, title: 'FAQ', short: 'FAQ', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700',
                items: [
                    { q: 'Are products 100% handmade?', a: 'Yes, 100% hand-woven by Phú Vinh artisans. Each piece is unique — no two are exactly alike.' },
                    { q: 'Can I order custom designs?', a: 'Yes! Use the AI Design tool on the homepage to create a design, then order with an artisan. Or contact us directly.' },
                    { q: 'How long is delivery?', a: 'Hanoi 1-2 days, other provinces 3-5 days. International 7-21 days depending on region.' },
                    { q: 'How do I upgrade my membership?', a: 'Accumulate orders: 3 for Silver, 8 for Gold (free shipping), 20 for Diamond (15% off + lifetime warranty).' },
                    { q: 'Are products safe for children?', a: 'Yes, 100% natural materials (rattan, bamboo), no toxic chemicals. OEKO-TEX certified safe for children.' },
                    { q: 'Can I return products?', a: 'Yes, free returns within 7 days for manufacturing defects. See the Returns section for details.' },
                ],
            },
        ],
    },
    es: {
        tabs: [
            {
                id: 'shipping', icon: Truck, title: 'Política de Envío', short: 'Envío', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700',
                sections: [
                    { h: 'Cobertura', p: 'Phú Vinh envía a las 63 provincias. Hanói 1-2 días, otras provincias 3-5 días laborables.' },
                    { h: 'Gastos', p: 'Hanói: 15.000đ. Provincias remotas: 25.000-40.000đ. Miembros Oro+ (8+ pedidos) tienen envío GRATIS.' },
                    { h: 'Internacional', p: 'Disponible en 50+ países. Entrega 7-21 días según región.' },
                    { h: 'Seguimiento', p: 'Recibirás email con ID de pedido. Llama al 0912 345 678 para rastrear.' },
                ],
            },
            {
                id: 'returns', icon: RefreshCw, title: 'Devoluciones', short: 'Devoluciones', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
                sections: [
                    { h: '7 días', p: 'Puedes cambiar o devolver en 7 días si hay defecto de fabricación.' },
                    { h: 'Condiciones', p: 'Producto en estado original, sin usar, con embalaje. Defectos de fabricación se cambian gratis.' },
                    { h: 'Proceso', p: '1. Llama 0912 345 678. 2. Envía fotos. 3. Recogida. 4. Cambio en 3-5 días.' },
                    { h: 'Reembolso', p: '100% en 7 días laborables por defectos. Transferencia o Zalo Pay.' },
                ],
            },
            {
                id: 'warranty', icon: Shield, title: 'Garantía', short: 'Garantía', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',
                sections: [
                    { h: '12 meses', p: 'Todos los productos tienen garantía de artesanía de 12 meses. Reparación y reemplazo incluidos.' },
                    { h: 'Condiciones', p: 'Cubre defectos estructurales, rotura de ratán. No cubre mal uso, agua o impactos.' },
                    { h: 'Reclamar', p: 'Contacta 0912 345 678 o email con ID de pedido y fotos. Reparación gratuita.' },
                    { h: 'De por vida', p: 'Miembros Diamante (20+ pedidos) tienen garantía de por vida — reparaciones ilimitadas.' },
                ],
            },
            {
                id: 'care', icon: Sparkles, title: 'Guía de Cuidado', short: 'Cuidado', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700',
                sections: [
                    { h: 'Mantener seco', p: 'Evita inmersión en agua. Si se moja, seca con paño suave y airea en lugar fresco.' },
                    { h: 'Evitar sol directo', p: 'El sol prolongado hace el bambú quebradizo. Coloca en luz suave, evita ventanas al oeste.' },
                    { h: 'Limpieza', p: 'Quita el polvo con paño seco o cepillo suave. Sin químicos. Aspiradora en modo bajo.' },
                    { h: 'Almacenamiento', p: 'Envuelve en tela transpirable con gel de sílice. Evita peso encima.' },
                ],
            },
            {
                id: 'faq', icon: HelpCircle, title: 'Preguntas Frecuentes', short: 'FAQ', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700',
                items: [
                    { q: '¿Son 100% hechos a mano?', a: 'Sí, 100% tejidos a mano por artesanos de Phú Vinh. Cada pieza es única.' },
                    { q: '¿Puedo personalizar?', a: '¡Sí! Usa Diseño IA en la página principal, luego pide con un artesano.' },
                    { q: '¿Tiempo de entrega?', a: 'Hanói 1-2 días, provincias 3-5 días. Internacional 7-21 días.' },
                    { q: '¿Cómo subo de nivel?', a: '3 pedidos: Plata. 8: Oro (envío gratis). 20: Diamante (15% descuento + garantía de por vida).' },
                    { q: '¿Seguros para niños?', a: 'Sí, 100% materiales naturales. Certificado OEKO-TEX.' },
                    { q: '¿Puedo devolver?', a: 'Sí, gratis en 7 días por defectos de fabricación.' },
                ],
            },
        ],
    },
};

const CONTACTS = {
    vi: [
        { icon: Phone, label: 'Hotline', value: '0912 345 678', color: 'text-blue-600' },
        { icon: Mail, label: 'Email', value: 'contact@phuvinhmaytredan.vn', color: 'text-green-600' },
        { icon: MapPin, label: 'Địa chỉ', value: 'Làng Phú Vinh, Chương Mỹ, Hà Nội', color: 'text-amber-600' },
        { icon: Clock, label: 'Giờ hỗ trợ', value: '8:00 – 21:00 hàng ngày', color: 'text-violet-600' },
    ],
    en: [
        { icon: Phone, label: 'Hotline', value: '0912 345 678', color: 'text-blue-600' },
        { icon: Mail, label: 'Email', value: 'contact@phuvinhmaytredan.vn', color: 'text-green-600' },
        { icon: MapPin, label: 'Address', value: 'Phú Vinh Village, Chương Mỹ, Hanoi', color: 'text-amber-600' },
        { icon: Clock, label: 'Support hours', value: '8:00 AM – 9:00 PM daily', color: 'text-violet-600' },
    ],
    es: [
        { icon: Phone, label: 'Hotline', value: '0912 345 678', color: 'text-blue-600' },
        { icon: Mail, label: 'Email', value: 'contact@phuvinhmaytredan.vn', color: 'text-green-600' },
        { icon: MapPin, label: 'Dirección', value: 'Pueblo Phú Vinh, Chương Mỹ, Hanói', color: 'text-amber-600' },
        { icon: Clock, label: 'Horas de soporte', value: '8:00 – 21:00 todos los días', color: 'text-violet-600' },
    ],
};

export default function SupportPage() {
    const { lang, t } = useLang();
    const [activeTab, setActiveTab] = useState('shipping');
    const [openFaq, setOpenFaq] = useState(0);
    const data = POLICIES[lang] || POLICIES.vi;
    const contacts = CONTACTS[lang] || CONTACTS.vi;
    const active = data.tabs.find(tab => tab.id === activeTab);

    return (
        <div className="min-h-screen pt-16 pb-20">
            {/* Hero header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-emerald-600 to-teal-700 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto px-4 max-w-3xl py-12 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> {t('support.back')}
                    </Link>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <LifeBuoy className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{t('support.title')}</h1>
                            <p className="text-white/80 text-sm mt-1">{t('support.desc')}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 60%)' }} />
            </div>

            <div className="container mx-auto px-4 max-w-3xl -mt-2">
                {/* Tab cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
                    {data.tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300
              ${activeTab === tab.id
                                    ? `${tab.bg} ${tab.border} ${tab.text} scale-105 shadow-lg`
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:shadow-md'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                ${activeTab === tab.id ? `bg-gradient-to-br ${tab.color} text-white` : 'bg-muted'}`}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold">{tab.short}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${active.text}`}>
                            <active.icon className="w-5 h-5" /> {active.title}
                        </h2>

                        {active.sections && (
                            <div className="space-y-3">
                                {active.sections.map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                        className={`p-5 rounded-2xl ${active.bg} border-l-4 ${active.border.replace('border-', 'border-l-')} bg-card`}>
                                        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                            <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${active.color} text-white text-xs flex items-center justify-center flex-shrink-0`}>{i + 1}</span>
                                            {s.h}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{s.p}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {active.items && (
                            <div className="space-y-2">
                                {active.items.map((item, i) => (
                                    <div key={i} className={`rounded-2xl bg-card border ${active.border} overflow-hidden`}>
                                        <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
                                            <span className="text-sm font-semibold text-foreground pr-4">{item.q}</span>
                                            <ChevronDown className={`w-4 h-4 ${active.text} flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === i && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden">
                                                    <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Contact cards */}
                <div className="mt-10">
                    <h3 className="text-lg font-bold text-foreground mb-4 text-center">{t('support.needHelp')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {contacts.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                                <c.icon className={`w-5 h-5 ${c.color} flex-shrink-0`} />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">{c.label}</p>
                                    <p className="text-sm font-semibold text-foreground truncate">{c.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}