import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

const VALUES_DATA = {
    vi: [
        { emoji: '🌿', title: '100% Tự Nhiên', desc: 'Nguyên liệu thuần tự nhiên, phân hủy sinh học, không vi nhựa. Mỗi sợi mây đều có thể trả về với đất mẹ.', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'Sinh thái' },
        { emoji: '✋', title: 'Tinh Hoa Nghệ Nhân', desc: 'Mỗi sản phẩm là độc bản, mang dấu ấn bàn tay người thợ. Không có hai sản phẩm nào giống hệt nhau.', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Thủ công' },
        { emoji: '🌱', title: 'Thuận Tự Nhiên', desc: 'Quy trình xử lý không hóa chất độc hại. Nước thải được lọc qua hệ thống sinh học trước khi hoàn trả tự nhiên.', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Sạch' },
        { emoji: '🤖', title: 'AI Tiên Phong', desc: 'Kết hợp công nghệ để đa dạng hóa mẫu mã mà không đánh mất hồn cốt truyền thống. AI học từ 10,000+ mẫu đan Phú Vinh.', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Đổi mới' },
        { emoji: '🌏', title: 'Carbon Trung Lập', desc: 'Chúng tôi đo lường và bù đắp toàn bộ lượng carbon phát thải trong chuỗi sản xuất và vận chuyển quốc tế.', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'Khí hậu' },
        { emoji: '👥', title: 'Phát Triển Cộng Đồng', desc: '80% doanh thu được tái đầu tư vào làng nghề: đào tạo thế hệ trẻ, nâng cấp xưởng sản xuất và học bổng con em nghệ nhân.', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Xã hội' },
        { emoji: '♻️', title: 'Kinh Tế Tuần Hoàn', desc: 'Phế phẩm mây tre được tái chế thành phân bón hữu cơ hoặc nguyên liệu thô cho sản phẩm phụ. Gần như zero waste.', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'Tái chế' },
        { emoji: '🏆', title: 'Chứng Nhận Quốc Tế', desc: 'Sản phẩm đạt chứng nhận FSC (Quản lý rừng bền vững), OEKO-TEX và các tiêu chuẩn xuất khẩu khắt khe nhất châu Âu.', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'Chứng nhận' },
    ],
    en: [
        { emoji: '🌿', title: '100% Natural', desc: 'Pure natural materials, biodegradable, microplastic-free. Every rattan fiber can return to the earth.', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'Eco' },
        { emoji: '✋', title: 'Artisan Essence', desc: 'Each product is unique, bearing the maker\'s touch. No two pieces are exactly alike.', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Handmade' },
        { emoji: '🌱', title: 'Nature-Friendly', desc: 'No toxic chemicals in processing. Wastewater is filtered through biological systems before returning to nature.', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Clean' },
        { emoji: '🤖', title: 'AI Pioneer', desc: 'Combining technology to diversify designs without losing traditional soul. AI trained on 10,000+ Phú Vinh patterns.', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Innovation' },
        { emoji: '🌏', title: 'Carbon Neutral', desc: 'We measure and offset all carbon emissions across production and international shipping.', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'Climate' },
        { emoji: '👥', title: 'Community Development', desc: '80% of revenue is reinvested in the village: youth training, workshop upgrades, and artisan scholarships.', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Social' },
        { emoji: '♻️', title: 'Circular Economy', desc: 'Bamboo waste is recycled into organic fertilizer or raw material for by-products. Nearly zero waste.', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'Recycle' },
        { emoji: '🏆', title: 'International Certification', desc: 'Products certified FSC (sustainable forestry), OEKO-TEX, and the strictest European export standards.', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'Certified' },
    ],
    es: [
        { emoji: '🌿', title: '100% Natural', desc: 'Materiales naturales puros, biodegradables, sin microplásticos. Cada fibra puede volver a la tierra.', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'Eco' },
        { emoji: '✋', title: 'Esencia Artesanal', desc: 'Cada producto es único, con el toque del artesano. No hay dos piezas iguales.', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Hecho a mano' },
        { emoji: '🌱', title: 'Respetuoso con la Naturaleza', desc: 'Sin químicos tóxicos. Las aguas residuales se filtran con sistemas biológicos antes de retornar a la naturaleza.', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Limpio' },
        { emoji: '🤖', title: 'Pionero en IA', desc: 'Tecnología para diversificar diseños sin perder el alma tradicional. IA entrenada con 10.000+ patrones de Phú Vinh.', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Innovación' },
        { emoji: '🌏', title: 'Neutro en Carbono', desc: 'Medimos y compensamos todas las emisiones de carbono en producción y envío internacional.', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'Clima' },
        { emoji: '👥', title: 'Desarrollo Comunitario', desc: 'El 80% de los ingresos se reinvierte en el pueblo: formación de jóvenes, mejoras de talleres y becas.', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Social' },
        { emoji: '♻️', title: 'Economía Circular', desc: 'Los residuos de bambú se reciclan en fertilizante orgánico o materia prima. Casi cero residuos.', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'Reciclar' },
        { emoji: '🏆', title: 'Certificación Internacional', desc: 'Productos certificados FSC, OEKO-TEX y los estándares de exportación más estrictos de Europa.', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'Certificado' },
    ],
    zh: [
        { emoji: '🌿', title: '100% 天然', desc: '纯天然材料，可生物降解，无微塑料。每根藤条都能回归大地。', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: '生态' },
        { emoji: '✋', title: '工匠精华', desc: '每件产品都是独一无二的，带有制作者的印记。没有两件完全相同。', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: '手工' },
        { emoji: '🌱', title: '自然友好', desc: '加工过程无有毒化学物质。废水通过生物系统过滤后回归自然。', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: '清洁' },
        { emoji: '🤖', title: 'AI先锋', desc: '结合技术多样化设计而不失传统灵魂。AI学习了10,000+富荣图案。', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: '创新' },
        { emoji: '🌏', title: '碳中和', desc: '我们衡量并抵消生产和国际运输中的所有碳排放。', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: '气候' },
        { emoji: '👥', title: '社区发展', desc: '80%的收入再投资于村庄：青年培训、工坊升级和工匠奖学金。', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: '社会' },
        { emoji: '♻️', title: '循环经济', desc: '竹废料被回收成有机肥料或副产品原料。接近零废弃。', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: '回收' },
        { emoji: '🏆', title: '国际认证', desc: '产品获得FSC（可持续林业）、OEKO-TEX和最严格的欧洲出口标准认证。', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: '认证' },
    ],
    ru: [
        { emoji: '🌿', title: '100% Натурально', desc: 'Чистые натуральные материалы, биоразлагаемые, без микропластика. Каждое волокно возвращается в землю.', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'Эко' },
        { emoji: '✋', title: 'Душа мастера', desc: 'Каждое изделие уникально, несёт отпечаток рук мастера. Нет двух одинаковых.', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Ручная работа' },
        { emoji: '🌱', title: 'Дружелюбный к природе', desc: 'Без токсичных химикатов. Сточные воды фильтруются биологическими системами.', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Чисто' },
        { emoji: '🤖', title: 'AI-пионер', desc: 'Технологии для разнообразия дизайна без потери традиций. AI обучен на 10 000+ узоров Phú Vinh.', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Инновации' },
        { emoji: '🌏', title: 'Углеродная нейтральность', desc: 'Измеряем и компенсируем все выбросы углерода в производстве и международной доставке.', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'Климат' },
        { emoji: '👥', title: 'Развитие сообщества', desc: '80% доходов реинвестируется в деревню: обучение молодёжи, модернизация мастерских, стипендии.', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Социальное' },
        { emoji: '♻️', title: 'Циркулярная экономика', desc: 'Бамбуковые отходы перерабатываются в удобрения или сырьё. Почти ноль отходов.', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'Переработка' },
        { emoji: '🏆', title: 'Международная сертификация', desc: 'Сертификаты FSC, OEKO-TEX и строжайшие европейские стандарты экспорта.', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'Сертификат' },
    ],
    th: [
        { emoji: '🌿', title: '100% ธรรมชาติ', desc: 'วัสดุธรรมชาติบริสุทธิ์ ย่อยสลายได้ ไม่มีไมโครพลาสติก เส้นใยหวายทุกเส้นสามารถกลับสู่ดินได้', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'อิคอ' },
        { emoji: '✋', title: 'สุนยางช่างฝีมือ', desc: 'ทุกชิ้นไม่ซ้ำแบบ มีรอยสัมผัสของช่าง ไม่มีสองชิ้นที่เหมือนกัน', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'ทำมือ' },
        { emoji: '🌱', title: 'เป็นมิตรกับธรรมชาติ', desc: 'ไม่มีสารเคมีพิษ น้ำเสียผ่านการกรองชีวภาพก่อนกลับสู่ธรรมชาติ', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'สะอาด' },
        { emoji: '🤖', title: 'AI ผู้บุกเบิก', desc: 'ผสานเทคโนโลยีเพื่อหลากหลายดีไซน์โดยไม่สูญเสียจิตวิญญาณดั้งเดิม AI เรียนรู้จาก 10,000+ ลวดลาย', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'นวัตกรรม' },
        { emoji: '🌏', title: 'สมดุลคาร์บอน', desc: 'เราวัดและชดเชยคาร์บอนทั้งหมดในการผลิตและการขนส่งระหว่างประเทศ', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'สภาพอากาศ' },
        { emoji: '👥', title: 'พัฒนาชุมชน', desc: '80% ของรายได้ลงทุนกลับหมู่บ้าน: ฝึกอบรมเยาวชน อัพเกรดเวิร์กชอป และทุนการศึกษา', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'สังคม' },
        { emoji: '♻️', title: 'เศรษฐกิจหมุนเวียน', desc: 'เศษไม้ไผ่ถูกรีไซเคิลเป็นปุ๋ยอินทรีย์หรือวัตถุดิบ เกือบไม่มีขยะ', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'รีไซเคิล' },
        { emoji: '🏆', title: 'การรับรองระดับสากล', desc: 'ได้รับการรับรอง FSC, OEKO-TEX และมาตรฐานส่งออกยุโรปที่เข้มงวดที่สุด', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'รับรอง' },
    ],
    hi: [
        { emoji: '🌿', title: '100% प्राकृतिक', desc: 'शुद्ध प्राकृतिक सामग्री, बायोडिग्रेडेबल, माइक्रोप्लास्टिक मुक्त। हर बेंत तंतु पृथ्वी में लौट सकता है।', color: 'from-green-500 to-emerald-600', border: 'border-green-500/30', bg: 'bg-green-500/10', tag: 'पर्यावरण' },
        { emoji: '✋', title: 'कारीगर सार', desc: 'हर उत्पाद अद्वितीय है, कारीगर की छाप लिए। कोई दो समान नहीं।', color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'हस्तनिर्मित' },
        { emoji: '🌱', title: 'प्रकृति-अनुकूल', desc: 'प्रसंस्करण में कोई विषाक्त रसायन नहीं। अपशिष्ट जल जैविक प्रणालियों से फ़िल्टर होता है।', color: 'from-teal-500 to-cyan-600', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'स्वच्छ' },
        { emoji: '🤖', title: 'AI अग्रगामी', desc: 'पारंपरिक आत्मा खोए बिना डिज़ाइन विविधता के लिए प्रौद्योगिकी। AI 10,000+ पैटर्न पर प्रशिक्षित।', color: 'from-violet-500 to-purple-600', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'नवाचार' },
        { emoji: '🌏', title: 'कार्बन तटस्थ', desc: 'हम उत्पादन और अंतरराष्ट्रीय शिपिंग में सभी कार्बन उत्सर्जन को मापते और ऑफ़सेट करते हैं।', color: 'from-sky-500 to-blue-600', border: 'border-sky-500/30', bg: 'bg-sky-500/10', tag: 'जलवायु' },
        { emoji: '👥', title: 'सामुदायिक विकास', desc: '80% राजस्व गाँव में पुनर्निवेशित: युवा प्रशिक्षण, वर्कशॉप अपग्रेड, और कारीगर छात्रवृत्ति।', color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'सामाजिक' },
        { emoji: '♻️', title: 'परिपत्र अर्थव्यवस्था', desc: 'बांस अपशिष्ट को जैविक उर्वरक या कच्चे माल में रीसायकल किया जाता है। लगभग शून्य अपशिष्ट।', color: 'from-lime-500 to-green-600', border: 'border-lime-500/30', bg: 'bg-lime-500/10', tag: 'रीसायकल' },
        { emoji: '🏆', title: 'अंतर्राष्ट्रीय प्रमाणन', desc: 'FSC, OEKO-TEX और सबसे कठोर यूरोपीय निर्यात मानकों का प्रमाणन।', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', tag: 'प्रमाणित' },
    ],
};

const STATS = [
    { value: '95%', label_vi: 'Vật liệu tái tạo', label_en: 'Recycled materials', label_es: 'Materiales reciclados', label_zh: '回收材料', label_ru: 'Переработанные материалы', label_th: 'วัสดุรีไซเคิล', label_hi: 'रीसायकल सामग्री', color: 'text-green-400' },
    { value: '0', label_vi: 'Hóa chất độc hại', label_en: 'Toxic chemicals', label_es: 'Químicos tóxicos', label_zh: '有毒化学物质', label_ru: 'Токсичные химикаты', label_th: 'สารเคมีพิษ', label_hi: 'विषाक्त रसायन', color: 'text-teal-400' },
    { value: '400+', label_vi: 'Nghệ nhân hỗ trợ', label_en: 'Artisans supported', label_es: 'Artesanos apoyados', label_zh: '受助工匠', label_ru: 'Мастеров поддержано', label_th: 'ช่างที่ได้รับการสนับสนุน', label_hi: 'समर्थित कारीगर', color: 'text-amber-400' },
    { value: '50+', label_vi: 'Quốc gia xuất khẩu', label_en: 'Export countries', label_es: 'Países de exportación', label_zh: '出口国家', label_ru: 'Стран экспорта', label_th: 'ประเทศส่งออก', label_hi: 'निर्यात देश', color: 'text-violet-400' },
];

export default function ValuesSection() {
    const { t, lang } = useLang();
    const VALUES = VALUES_DATA[lang] || VALUES_DATA.vi;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[200px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-primary/70 mb-3">{t('values.badge')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
                        {t('values.title')}{' '}
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('values.titleAccent')}</span>
                    </h2>
                    <p className="text-center text-muted-foreground max-w-xl mx-auto">{t('values.desc')}</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-2xl bg-secondary/30 border border-border/30">
                    {STATS.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="text-center">
                            <div className={`text-3xl md:text-4xl font-black ${s.color}`}>{s.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">{s[`label_${lang}`] || s.label_en}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {VALUES.map((val, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={`group p-5 rounded-2xl border ${val.border} ${val.bg} hover:shadow-xl transition-all duration-300`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-2xl">{val.emoji}</span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${val.border} text-muted-foreground`}>{val.tag}</span>
                            </div>
                            <h3 className="font-bold text-foreground mb-2 text-sm">{val.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}