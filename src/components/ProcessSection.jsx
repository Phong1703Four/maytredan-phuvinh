import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

const STEPS_DATA = {
    vi: [
        { num: 1, emoji: '🌿', title: 'Chọn & Thu Hoạch Nguyên Liệu', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'Nguồn gốc thiên nhiên', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Tuyển chọn song mây già 5 năm tuổi, thân tròn đều, vỏ bóng mịn. Chỉ 20% nguyên liệu vượt qua công đoạn kiểm định. Các vùng mây chất lượng cao được thu hoạch theo mùa, đảm bảo tái sinh và bảo tồn sinh thái.', detail: ['Mây 5+ năm tuổi', 'Kiểm định độ cứng', 'Thu hoạch bền vững', 'Nguồn gốc truy xuất'] },
        { num: 2, emoji: '💧', title: 'Xử Lý & Ngâm Ủ Truyền Thống', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'Bí quyết gia truyền', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Chẻ lạt, tuốt sợi mỏng đều, ngâm bùn ao từ 3–7 ngày để tạo màu sắc đặc trưng và chống mối mọt tự nhiên. Kỹ thuật xử lý khói tre tạo nên màu vàng đặc trưng của mây Phú Vinh.', detail: ['Ngâm bùn 3–7 ngày', 'Sấy khói tự nhiên', 'Không hóa chất', 'Kháng mối mọt 100%'] },
        { num: 3, emoji: '🤲', title: 'Đan Lát Thủ Công Tinh Xảo', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Trái tim của nghề', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Nghệ nhân đan tay 100% với hơn 50 kỹ thuật truyền thống: nong mốt, nong hai, đan xương cá, đan mắt cáo, họa tiết rồng phượng... Một chiếc ghế trung bình mất 3–5 ngày để hoàn thiện. Mỗi nút đan là một câu chuyện.', detail: ['50+ kỹ thuật đan', '100% thủ công', '3–5 ngày/sản phẩm', 'Độc bản không lặp'] },
        { num: 4, emoji: '🔥', title: 'Sấy Nhiệt & Định Hình', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Cố định & bảo tồn', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'Hun khói tự nhiên hoặc sấy nhiệt ở nhiệt độ chính xác để cố định phom dáng và tăng độ bền. Lớp sơn bảo vệ sinh học không độc hại được phủ 2–3 lớp, tạo bề mặt bóng đẹp và chống ẩm mốc.', detail: ['Sấy nhiệt chính xác', 'Sơn sinh học 3 lớp', 'Chống ẩm mốc', 'Bảo hành 2 năm'] },
        { num: 5, emoji: '✅', title: 'Kiểm Định Chất Lượng 3 Vòng', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Tiêu chuẩn quốc tế', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'Mỗi sản phẩm trải qua 3 vòng kiểm định nghiêm ngặt: kiểm tra kết cấu, kiểm tra độ hoàn thiện bề mặt, và kiểm tra tải trọng thực tế. Chỉ những sản phẩm đạt 100% tiêu chuẩn mới được đóng gói.', detail: ['3 vòng kiểm định', 'Test tải trọng thực', 'Chứng nhận ISO', 'QC thủ công'] },
        { num: 6, emoji: '📦', title: 'Đóng Gói & Giao Hàng Toàn Cầu', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Vươn ra thế giới', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'Đóng gói đặc biệt bằng vật liệu sinh học tái chế, chịu lực cho vận chuyển quốc tế đến 50+ quốc gia. Mỗi hộp kèm theo câu chuyện về nghệ nhân và hướng dẫn bảo quản chi tiết.', detail: ['Đóng gói sinh học', '50+ quốc gia', 'Theo dõi đơn hàng', 'Bảo hiểm vận chuyển'] },
    ],
    en: [
        { num: 1, emoji: '🌿', title: 'Select & Harvest Materials', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'Natural origin', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Selecting 5-year-old rattan, round stems, smooth bark. Only 20% of materials pass inspection. High-quality rattan is harvested seasonally, ensuring regeneration and ecological conservation.', detail: ['5+ year rattan', 'Hardness tested', 'Sustainable harvest', 'Traceable origin'] },
        { num: 2, emoji: '💧', title: 'Traditional Processing & Soaking', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'Family secret', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Splitting strips, thinning fibers evenly, soaking in pond mud for 3–7 days to create the characteristic color and natural pest resistance. Smoke-curing creates Phú Vinh\'s signature golden hue.', detail: ['Mud soak 3–7 days', 'Natural smoke cure', 'No chemicals', '100% pest resistant'] },
        { num: 3, emoji: '🤲', title: 'Intricate Hand Weaving', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Heart of the craft', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Artisans weave 100% by hand with 50+ traditional techniques: single ring, double ring, herringbone, openwork, dragon-phoenix motifs... An average chair takes 3–5 days. Every knot tells a story.', detail: ['50+ weave techniques', '100% handmade', '3–5 days/product', 'Unique, no repeats'] },
        { num: 4, emoji: '🔥', title: 'Heat Drying & Shaping', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Fix & preserve', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'Natural smoke-curing or precise heat drying to fix the shape and increase durability. A non-toxic biological protective coating is applied in 2–3 layers, creating a beautiful, moisture-resistant surface.', detail: ['Precise heat drying', '3-layer bio coating', 'Moisture resistant', '2-year warranty'] },
        { num: 5, emoji: '✅', title: '3-Round Quality Inspection', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'International standards', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'Each product undergoes 3 rigorous inspection rounds: structural check, surface finish check, and real load testing. Only products meeting 100% of standards are packaged.', detail: ['3 inspection rounds', 'Real load testing', 'ISO certified', 'Manual QC'] },
        { num: 6, emoji: '📦', title: 'Packaging & Global Shipping', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Reaching the world', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'Special packaging with recycled bio-materials, impact-resistant for international shipping to 50+ countries. Each box includes the artisan\'s story and detailed care instructions.', detail: ['Bio packaging', '50+ countries', 'Order tracking', 'Shipping insurance'] },
    ],
    es: [
        { num: 1, emoji: '🌿', title: 'Selección y Cosecha de Materiales', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'Origen natural', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Selección de ratán de 5 años, tallos redondos, corteza lisa. Solo 20% de los materiales pasan la inspección. El ratán de alta calidad se cosecha estacionalmente.', detail: ['Ratán 5+ años', 'Prueba de dureza', 'Cosecha sostenible', 'Origen rastreable'] },
        { num: 2, emoji: '💧', title: 'Procesado Tradicional y Remojo', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'Secreto familiar', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'División de tiras, adelgazado uniforme, remojo en barro 3-7 días para crear color característico y resistencia natural a plagas. El curado con humo crea el tono dorado de Phú Vinh.', detail: ['Remojo en barro 3-7 días', 'Curado con humo natural', 'Sin químicos', '100% antiplagas'] },
        { num: 3, emoji: '🤲', title: 'Tejido Manual Intrincado', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Corazón del oficio', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Los artesanos tejen 100% a mano con más de 50 técnicas tradicionales. Una silla promedio toma 3-5 días. Cada nudo cuenta una historia.', detail: ['50+ técnicas de tejido', '100% hecho a mano', '3-5 días/producto', 'Único, sin repeticiones'] },
        { num: 4, emoji: '🔥', title: 'Secado y Moldeado', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Fijar y conservar', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'Curado con humo natural o secado con calor preciso para fijar la forma y aumentar la durabilidad. Capa protectora biológica no tóxica en 2-3 capas.', detail: ['Secado de calor preciso', 'Capa bio de 3 capas', 'Resistente a la humedad', 'Garantía 2 años'] },
        { num: 5, emoji: '✅', title: 'Inspección de Calidad 3 Vueltas', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Estándares internacionales', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'Cada producto pasa 3 rondas de inspección: estructura, superficie y prueba de carga real. Solo los productos 100% conformes se empaquetan.', detail: ['3 rondas de inspección', 'Prueba de carga real', 'Certificado ISO', 'QC manual'] },
        { num: 6, emoji: '📦', title: 'Embalaje y Envío Global', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Alcanzando el mundo', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'Embalaje especial con biomateriales reciclados, resistente a impactos para envío internacional a más de 50 países.', detail: ['Embalaje bio', '50+ países', 'Seguimiento de pedidos', 'Seguro de envío'] },
    ],
    zh: [
        { num: 1, emoji: '🌿', title: '选材与收割', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: '天然来源', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: '精选5年藤条，茎圆匀称，皮光滑。仅20%原料通过检测。优质藤条按季节收割，确保再生和生态保护。', detail: ['5+年藤条', '硬度检测', '可持续收割', '可追溯来源'] },
        { num: 2, emoji: '💧', title: '传统处理与浸泡', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: '家传秘方', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: '劈篾、均匀削薄纤维，泥塘浸泡3-7天，形成特有色泽和天然防虫。烟熏工艺造就富荣藤特有的金黄色。', detail: ['泥浸3-7天', '天然烟熏', '无化学添加', '100%防虫'] },
        { num: 3, emoji: '🤲', title: '精细手工编织', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: '工艺之心', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: '工匠100%手工编织，50+传统技法：单环编、双环编、人字编、镂空编、龙凤纹...一把椅子平均3-5天完成。每个结都是一个故事。', detail: ['50+编织技法', '100%手工', '3-5天/件', '独一无二'] },
        { num: 4, emoji: '🔥', title: '烘干与定型', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: '固定与保存', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: '自然烟熏或精确热干以固定形状并增加耐久性。无毒生物保护涂层2-3层，美观防潮。', detail: ['精确热干', '3层生物涂层', '防潮', '2年保修'] },
        { num: 5, emoji: '✅', title: '三轮质量检验', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: '国际标准', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: '每件产品经过3轮严格检验：结构检查、表面检查、实载测试。只有100%达标的产品才包装。', detail: ['3轮检验', '实载测试', 'ISO认证', '手工质检'] },
        { num: 6, emoji: '📦', title: '包装与全球配送', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: '走向世界', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: '再生生物材料特殊包装，抗冲击，国际运输至50+国家。每箱附工匠故事和详细保养说明。', detail: ['生物包装', '50+国家', '订单跟踪', '运输保险'] },
    ],
    ru: [
        { num: 1, emoji: '🌿', title: 'Отбор и сбор материалов', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'Природное происхождение', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'Отбор 5-летнего ротанга, круглые стебли, гладкая кора. Только 20% материалов проходят проверку. Качественный ротанг собирают сезонно.', detail: ['Ротанг 5+ лет', 'Проверка твёрдости', 'Устойчивый сбор', 'Прослеживаемость'] },
        { num: 2, emoji: '💧', title: 'Традиционная обработка и замачивание', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'Семейный секрет', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Расщепление полос, равномерное утончение, замачивание в глине 3-7 дней для создания цвета и защиты от вредителей. Копчение создаёт золотистый оттенок Phú Vinh.', detail: ['Замачивание 3-7 дней', 'Природное копчение', 'Без химии', '100% защита'] },
        { num: 3, emoji: '🤲', title: 'Искусное ручное плетение', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'Сердце ремесла', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Мастера плетут 100% вручную с 50+ традиционными техниками. Средний стул — 3-5 дней. Каждый узел — история.', detail: ['50+ техник', '100% ручная работа', '3-5 дней/изделие', 'Уникально'] },
        { num: 4, emoji: '🔥', title: 'Сушка и формовка', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'Фиксация и сохранение', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'Копчение или точная сушка для фиксации формы и прочности. Нетоксичное биопокрытие в 2-3 слоя, защита от влаги.', detail: ['Точная сушка', '3-слойное биопокрытие', 'Влагостойкость', 'Гарантия 2 года'] },
        { num: 5, emoji: '✅', title: 'Трёхэтапный контроль качества', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'Международные стандарты', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'Каждое изделие проходит 3 проверки: конструкция, поверхность, реальная нагрузка. Только 100% соответствие.', detail: ['3 этапа проверки', 'Тест нагрузки', 'ISO сертификат', 'Ручной контроль'] },
        { num: 6, emoji: '📦', title: 'Упаковка и мировая доставка', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'Миру', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'Экологичная упаковка из переработанных материалов, ударопрочная для международной доставки в 50+ стран.', detail: ['Биоупаковка', '50+ стран', 'Отслеживание', 'Страховка'] },
    ],
    th: [
        { num: 1, emoji: '🌿', title: 'คัดเลือกและเก็บเกี่ยววัสดุ', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'แหล่งธรรมชาติ', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'คัดเลือกหวายอายุ 5 ปี ลำต้นกลมสม่ำเสมอ เปลือกเรียบ เฉพาะ 20% ของวัสดุผ่านการตรวจสอบ หวายคุณภาพสูงเก็บเกี่ยวตามฤดู', detail: ['หวาย 5+ ปี', 'ทดสอบความแข็ง', 'เก็บเกี่ยวยั่งยืน', 'ตรวจสอบได้'] },
        { num: 2, emoji: '💧', title: 'การแปรรูปและการแช่แบบดั้งเดิม', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'ความลับตระกูล', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'ฟันเสีน ทำเส้นให้บางสม่ำเสมอ แช่ในโคลน 3-7 วัน เพื่อสีที่โดดเด่นและป้องกันแมลงตามธรรมชาติ การรมควันสร้างสีทองอันเป็นเอกลักษณ์ของ Phú Vinh', detail: ['แช่โคลน 3-7 วัน', 'รมควันธรรมชาติ', 'ไม่มีสารเคมี', 'กันแมลง 100%'] },
        { num: 3, emoji: '🤲', title: 'การถักมือประณีต', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'หัวใจของงาน', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'ช่างฝีมือถักด้วยมือ 100% ด้วยเทคนิคดั้งเดิมกว่า 50 แบบ เก้าอี้เฉลี่ยใช้เวลา 3-5 วัน ทุกจุดถักคือเรื่องราว', detail: ['50+ เทคนิค', '100% มือ', '3-5 วัน/ชิ้น', 'ไม่ซ้ำแบบ'] },
        { num: 4, emoji: '🔥', title: 'การอบแห้งและการขึ้นรูป', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'ยึดรูปและรักษา', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'รมควันธรรมชาติหรืออบด้วยความร้อนที่แม่นยำ เพื่อยึดรูปทรงและเพิ่มความทนทาน สารเคลือบชีวภาพไม่เป็นพิษ 2-3 ชั้น', detail: ['อบอย่างแม่นยำ', 'เคลือบชีวภาพ 3 ชั้น', 'กันความชื้น', 'รับประกัน 2 ปี'] },
        { num: 5, emoji: '✅', title: 'ตรวจสอบคุณภาพ 3 รอบ', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'มาตรฐานสากล', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'ทุกชิ้นผ่านการตรวจสอบ 3 รอบ: โครงสร้าง พื้นผิว และทดสอบน้ำหนักจริง เฉพาะ 100% ผ่านเท่านั้นที่บรรจุ', detail: ['3 รอบตรวจ', 'ทดสอบน้ำหนัก', 'รับรอง ISO', 'QC มือ'] },
        { num: 6, emoji: '📦', title: 'บรรจุและจัดส่งทั่วโลก', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'สู่โลก', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'บรรจุภัณฑ์พิเศษจากวัสดุชีวภาพรีไซเคิล ทนแรงกระแทกส่งไป 50+ ประเทศ แต่ละกล่องมีเรื่องราวช่างและคู่มือดูแล', detail: ['บรรจุภัณฑ์ชีวภาพ', '50+ ประเทศ', 'ติดตามพัสดุ', 'ประกันการส่ง'] },
    ],
    hi: [
        { num: 1, emoji: '🌿', title: 'सामग्री चयन और कटाई', color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'प्राकृतिक स्रोत', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: '5 वर्ष के बेंत का चयन, गोल तने, चिकनी छाल। केवल 20% सामग्री निरीक्षण पास करती है। उच्च गुणवत्ता बेंत मौसमी कटाई से प्राप्त।', detail: ['5+ वर्ष बेंत', 'कठोरता परीक्षण', 'स्थायी कटाई', 'ट्रैक करने योग्य'] },
        { num: 2, emoji: '💧', title: 'पारंपरिक प्रसंस्करण और भिगोना', color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'पारिवारिक रहस्य', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'पट्टियां फाड़ना, रेशे समान रूप से पतले करना, कीचड़ में 3-7 दिन भिगोना, विशेष रंग और प्राकृतिक कीट प्रतिरोध के लिए। धुआं इलाज Phú Vinh का सुनहरा रंग बनाता है।', detail: ['कीचड़ 3-7 दिन', 'प्राकृतिक धुआं', 'रसायन मुक्त', '100% कीट प्रतिरोध'] },
        { num: 3, emoji: '🤲', title: 'जटिल हस्तनिर्मित बुनाई', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/30', bg: 'bg-amber-500/10', tag: 'शिल्प का हृदय', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'कारीगर 50+ पारंपरिक तकनीकों से 100% हाथ से बुनते हैं। औसत कुर्सी में 3-5 दिन लगते हैं। हर गाँठ एक कहानी कहती है।', detail: ['50+ बुनाई तकनीक', '100% हस्तनिर्मित', '3-5 दिन/उत्पाद', 'अद्वितीय'] },
        { num: 4, emoji: '🔥', title: 'सुखाना और आकार देना', color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/30', bg: 'bg-rose-500/10', tag: 'स्थिर करना', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'आकार स्थिर करने और टिकाऊपन बढ़ाने के लिए प्राकृतिक धुआं या सटीक गर्मी सुखाना। गैर-विषाक्त जैविक सुरक्षा 2-3 परतों में।', detail: ['सटीक सुखाना', '3-परत जैविक कोटिंग', 'नमी प्रतिरोधी', '2 वर्ष वारंटी'] },
        { num: 5, emoji: '✅', title: '3-चरण गुणवत्ता निरीक्षण', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/30', bg: 'bg-violet-500/10', tag: 'अंतर्राष्ट्रीय मानक', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', desc: 'प्रत्येक उत्पाद 3 कड़े निरीक्षण: संरचना, सतह, वास्तविक भार परीक्षण। केवल 100% अनुरूप उत्पाद पैक किए जाते हैं।', detail: ['3 निरीक्षण', 'वास्तविक भार परीक्षण', 'ISO प्रमाणित', 'मैनुअल QC'] },
        { num: 6, emoji: '📦', title: 'पैकेजिंग और वैश्विक शिपिंग', color: 'from-teal-500 to-emerald-600', glow: 'shadow-teal-500/30', border: 'border-teal-500/30', bg: 'bg-teal-500/10', tag: 'दुनिया तक', tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20', desc: 'रीसाइकल बायो सामग्री से विशेष पैकेजिंग, 50+ देशों के लिए अंतरराष्ट्रीय शिपिंग। प्रत्येक बॉक्स में कारीगर की कहानी और देखभाल गाइड।', detail: ['बायो पैकेजिंग', '50+ देश', 'ऑर्डर ट्रैकिंग', 'शिपिंग बीमा'] },
    ],
};

const Leaf = ({ style }) => (
    <div className="absolute pointer-events-none select-none text-xl animate-bounce"
        style={{ ...style, animationDuration: `${3 + Math.random() * 4}s`, animationDelay: `${Math.random() * 3}s` }}>
        🍃
    </div>
);

export default function ProcessSection() {
    const { t, lang } = useLang();
    const STEPS = STEPS_DATA[lang] || STEPS_DATA.vi;
    const [visible, setVisible] = useState(new Set());
    const refs = useRef([]);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        setLeaves(Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${5 + (i * 13) % 90}%`,
            top: `${(i * 17) % 80}%`,
            opacity: 0.15 + (i % 5) * 0.07,
        })));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) setVisible(prev => new Set([...prev, Number(e.target.dataset.idx)]));
            });
        }, { threshold: 0.2 });
        refs.current.forEach(r => r && observer.observe(r));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="process" className="py-24 relative overflow-hidden">
            {leaves.map(l => <Leaf key={l.id} style={{ left: l.left, top: l.top, opacity: l.opacity }} />)}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-primary/70 mb-3">{t('process.badge')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2">
                        {t('process.title')}{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">{t('process.titleAccent')}</span>
                    </h2>
                    <p className="text-center text-muted-foreground max-w-xl mx-auto">{t('process.desc')}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {STEPS.map((step, i) => (
                        <motion.div key={step.num} ref={el => refs.current[i] = el} data-idx={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className={`relative p-6 rounded-2xl border ${step.border} ${step.bg} backdrop-blur-sm transition-all duration-700 hover:shadow-xl ${step.glow} group`}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                    <span className="text-2xl">{step.emoji}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('process.step')} {step.num}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${step.tagColor}`}>{step.tag}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground leading-snug">{step.title}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {step.detail.map((d, di) => (
                                    <span key={di} className={`text-xs px-2.5 py-1 rounded-lg border ${step.border} bg-background/30 text-muted-foreground`}>✓ {d}</span>
                                ))}
                            </div>
                            <div className={`absolute bottom-4 right-5 text-6xl font-black opacity-5 bg-gradient-to-br ${step.color} bg-clip-text text-transparent select-none`}>{step.num}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}