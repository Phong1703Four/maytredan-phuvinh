// Supplementary artisan profile data — portfolio images, reviews, styles
// Merged with ARTISANS from artisans.js by artisan ID

const P_IMG = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`;

// Reliable Unsplash craft/bamboo/rattan photo IDs
const CRAFT_IMAGES = [
    '1567767292278-a4f302f37dcc',
    '1610798477967-1e6bc10c5e84',
    '1598030334017-9c5d61e8e3a4',
    '1578500494198-406f6cbf9203',
    '1555041469-a586c61ea9bc',
    '1540518614846-7eded433c457',
    '1493809842364-78817add7ffb',
    '1567538096630-e0c55bd6374c',
    '1598300042247-d088f8ab9873',
    '1538688525198-9b88f6f53126',
    '1611652022435-66e5c4c3e3e3',
    '1566150905458-1bf1fc3f4e6e',
    '1584917865442-de89df76afd3',
    '1591561954557-26941169149e',
    '1513506003901-1e6a229e2d15',
    '1565814329452-e1efa11c5b89',
    '1606744824163-985d376605aa',
    '1591375275623-2b41367f3c6e',
    '1612198858969-6c1c9e0f5c82',
    '1585032226651-9c5d61c5e8e3',
];

function getCraftImages(start, count) {
    return Array.from({ length: count }, (_, i) => P_IMG(CRAFT_IMAGES[(start + i) % CRAFT_IMAGES.length]));
}

const REVIEW_POOL = {
    a1: [
        { name: 'Trần Minh T.', rating: 5, date: '2024-12-15', comment: 'Sản phẩm tinh xảo, từng nan mây đều đều tăm tắp. Đúng chất bậc thầy!' },
        { name: 'Lê Quỳnh N.', rating: 5, date: '2024-11-20', comment: 'Ông Tài đan giỏ quấn cực đẹp, hoa văn cổ truyền rất độc đáo. Sẽ ủng hộ tiếp!' },
        { name: 'Nguyễn Hùng V.', rating: 4, date: '2024-10-05', comment: 'Chất lượng rất tốt, chỉ tiếc là thời gian chờ hơi lâu do ông bận nhiều đơn.' },
    ],
    a2: [
        { name: 'Phạm Thảo M.', rating: 5, date: '2025-01-10', comment: 'Giỏ hoa Boho đẹp xuất sắc, đặt trong phòng khách rất hợp. Kỹ thuật đan mượt mà!' },
        { name: 'Võ Anh D.', rating: 5, date: '2024-12-28', comment: 'Chị Hoa rất tâm huyết, tư vấn nhiệt tình. Đèn mây làm ra đúng ý mình.' },
    ],
    a3: [
        { name: 'Cty TNHH Nội thất A', rating: 5, date: '2024-12-01', comment: 'Bàn ghế mây xuất Nhật chất lượng cao, đúng tiêu chuẩn. Sẽ đặt hàng dài hạn.' },
        { name: 'Hoàng B.', rating: 4, date: '2024-11-15', comment: 'Sản phẩm chắc chắn, đóng gói cẩn thận. Thời gian giao hơi lâu nhưng đáng chờ.' },
    ],
    a4: [
        { name: 'Boutique Lan Hương', rating: 5, date: '2025-01-05', comment: 'Túi mây-da bò cao cấp, khách hàng phản hồi rất tốt. Tay nghề đỉnh!' },
        { name: 'Đặng Khánh H.', rating: 5, date: '2024-12-20', comment: 'Túi xách unique, không đụng hàng. Chất lượng đan quá đẹp.' },
    ],
    a5: [
        { name: 'Resort Sapa Mây', rating: 5, date: '2024-12-10', comment: 'Đèn chùm mây nghệ thuật tạo không gian ấm cúng, khách check-in rất nhiều!' },
        { name: 'Café Nhà Gỗ', rating: 5, date: '2024-11-30', comment: 'Mỗi chiếc đèn là tác phẩm độc bản. Anh Hùng rất sáng tạo.' },
    ],
    a6: [
        { name: 'Mẹ bé Mây', rating: 5, date: '2025-01-12', comment: 'Thú mây an toàn cho bé, không có cạnh sắc. Bé rất thích!' },
        { name: 'Shop Đồ chơi Xanh', rating: 5, date: '2024-12-15', comment: 'Sản phẩm đạt chuẩn an toàn quốc tế, bán rất chạy.' },
    ],
    a20: [
        { name: 'Nguyễn Mai P.', rating: 5, date: '2025-01-08', comment: 'Chú voi mây mini quá đáng yêu! Đặt cho bạn làm quà ai cũng thích.' },
        { name: 'Trần Đức A.', rating: 5, date: '2024-12-22', comment: 'Mô hình động vật sinh động, chi tiết tỉ mỉ. Best seller thật!' },
        { name: 'Lý Thanh T.', rating: 4, date: '2024-11-18', comment: 'Đẹp nhưng giá hơi cao so với size mini. Tuy nhiên chất lượng xứng đáng.' },
    ],
};

// Style labels
const STYLES = {
    a1: { vi: 'Truyền thống cổ', en: 'Traditional Heritage', es: 'Patrimonio Tradicional', zh: '传统传承', ru: 'Традиционное наследие', th: 'มรดกดั้งเดิม', hi: 'पारंपरिक विरासत' },
    a2: { vi: 'Boho Hiện đại', en: 'Modern Boho', es: 'Boho Moderno', zh: '现代波西米亚', ru: 'Современный бохо', th: 'โบโฮโมเดิร์น', hi: 'आधुनिक बोहो' },
    a3: { vi: 'Nội thất Xuất khẩu', en: 'Export Furniture', es: 'Mobiliario de Exportación', zh: '出口家具', ru: 'Экспортная мебель', th: 'เฟอร์นิเจอร์ส่งออก', hi: 'निर्यात फर्नीचर' },
    a4: { vi: 'Luxury Thời trang', en: 'Luxury Fashion', es: 'Moda de Lujo', zh: '奢华时尚', ru: 'Люкс-мода', th: 'แฟชั่นหรู', hi: 'लक्ज़री फैशन' },
    a5: { vi: 'Nghệ thuật Ánh sáng', en: 'Light Artistry', es: 'Arte de Luz', zh: '光影艺术', ru: 'Световое искусство', th: 'ศิลปะแสง', hi: 'प्रकाश कला' },
    a6: { vi: 'Đồ chơi An toàn', en: 'Safe Toys', es: 'Juguetes Seguros', zh: '安全玩具', ru: 'Безопасные игрушки', th: 'ของเล่นปลอดภัย', hi: 'सुरक्षित खिलौने' },
    a7: { vi: 'Gia dụng Cổ truyền', en: 'Heritage Tableware', es: 'Vajilla Patrimonial', zh: '传统家用品', ru: 'Традиционная утварь', th: 'เครื่องใช้มรดก', hi: 'विरासत बर्तन' },
    a8: { vi: 'Ngoài trời Bền bỉ', en: 'Outdoor Durable', es: 'Exterior Duradero', zh: '户外耐用', ru: 'Уличная мебель', th: 'กลางแจ้งทนทาน', hi: 'बाहरी मज़बूत' },
    a9: { vi: 'Đương đại Nghệ thuật', en: 'Contemporary Art', es: 'Arte Contemporáneo', zh: '当代艺术', ru: 'Современное искусство', th: 'ศิลปะร่วมสมัย', hi: 'समकालीन कला' },
    a10: { vi: 'Bí truyền Phục chế', en: 'Secret Restoration', es: 'Restauración Secreta', zh: '秘传修复', ru: 'Секретное ремесло', th: 'การอนุรักษ์ลับ', hi: 'गुप्त पुनर्स्थापन' },
    a11: { vi: 'Thời trang Biển', en: 'Beach Fashion', es: 'Moda Playera', zh: '海滩时尚', ru: 'Пляжная мода', th: 'แฟชั่นชายหาด', hi: 'बीच फैशन' },
    a12: { vi: 'Decor Resort', en: 'Resort Decor', es: 'Decor Resort', zh: '度假装饰', ru: 'Курортный декор', th: 'เดคอร์รีสอร์ท', hi: 'रिसॉर्ट डेकोर' },
    a13: { vi: 'Quà tặng Doanh nghiệp', en: 'Corporate Gifts', es: 'Regalos Corporativos', zh: '企业礼品', ru: 'Корпоративные подарки', th: 'ของขวัญองค์กร', hi: 'कॉर्पोरेट उपहार' },
    a14: { vi: 'Industrial Boho', en: 'Industrial Boho', es: 'Industrial Boho', zh: '工业波西', ru: 'Индустриальный бохо', th: 'อินดัสเทรียล โบโฮ', hi: 'औद्योगिक बोहो' },
    a15: { vi: 'Thờ cúng Truyền thống', en: 'Ritual Heritage', es: 'Ritual Tradicional', zh: '传统祭祀', ru: 'Ритуальное наследие', th: 'พิธีกรรมดั้งเดิม', hi: 'अनुष्ठान विरासत' },
    a16: { vi: 'Zen Thiền', en: 'Zen Meditation', es: 'Zen Meditación', zh: '禅修', ru: 'Дзен-медитация', th: 'เซนสมาธิ', hi: 'ज़ेन ध्यान' },
    a17: { vi: 'Trà đạo Nhật', en: 'Japanese Tea Ceremony', es: 'Ceremonia del Té', zh: '日式茶道', ru: 'Японская чайная', th: 'พิธีชาญี่ปุ่น', hi: 'जापानी चाय समारोह' },
    a18: { vi: 'OEM Xuất khẩu', en: 'OEM Export', es: 'OEM Exportación', zh: 'OEM出口', ru: 'OEM-экспорт', th: 'OEM ส่งออก', hi: 'OEM निर्यात' },
    a19: { vi: 'Hoa Sen Nghệ thuật', en: 'Lotus Art', es: 'Arte de Loto', zh: '莲花艺术', ru: 'Искусство лотоса', th: 'ศิลปะดอกบัว', hi: 'कमल कला' },
    a20: { vi: 'Mô hình Động vật', en: 'Animal Models', es: 'Modelos de Animales', zh: '动物模型', ru: 'Модели животных', th: 'โมเดลสัตว์', hi: 'जानवर मॉडल' },
    a21: { vi: 'Lồng đèn Lễ hội', en: 'Festival Lanterns', es: 'Faroles Festivos', zh: '节日灯笼', ru: 'Праздничные фонари', th: 'โคมไฟเทศกาล', hi: 'त्योहार लालटेन' },
    a22: { vi: 'Nội thất Phòng ngủ', en: 'Bedroom Furniture', es: 'Mobiliario Dormitorio', zh: '卧室家具', ru: 'Спальная мебель', th: 'เฟอร์นิเจอร์ห้องนอน', hi: 'बेडरूम फर्नीचर' },
    a23: { vi: 'Trang sức Cao cấp', en: 'Fine Jewelry', es: 'Joyería Fina', zh: '高级珠宝', ru: 'Ювелирные изделия', th: 'เครื่องประดับหรู', hi: 'उत्कृष्ट आभूषण' },
    a24: { vi: 'Thuyền Rồng', en: 'Dragon Boats', es: 'Barcos Dragón', zh: '龙舟', ru: 'Драконьи лодки', th: 'เรือมังกร', hi: 'ड्रैगन बोट' },
    a25: { vi: 'Gia dụng Truyền thống', en: 'Traditional Utility', es: 'Utilidad Tradicional', zh: '传统日用', ru: 'Традиционная утварь', th: 'เครื่องใช้ดั้งเดิม', hi: 'पारंपरिक उपयोगिता' },
    a26: { vi: '3D & AI Design', en: '3D & AI Design', es: 'Diseño 3D e IA', zh: '3D与AI设计', ru: '3D и AI-дизайн', th: 'ดีไซน์ 3D และ AI', hi: '3D और AI डिज़ाइन' },
    a27: { vi: 'Quạt Nghệ thuật Á Đông', en: 'Oriental Fan Art', es: 'Arte de Abanico Oriental', zh: '东方扇艺', ru: 'Восточное искусство вееров', th: 'ศิลปะพัดตะวันออก', hi: 'पूर्वी पंखा कला' },
};

export const ARTISAN_PROFILES = {};

// Generate profiles for all artisans
for (let i = 1; i <= 27; i++) {
    const id = `a${i}`;
    ARTISAN_PROFILES[id] = {
        style: STYLES[id]?.vi || 'Đa phong cách',
        style_en: STYLES[id]?.en || 'Versatile',
        style_es: STYLES[id]?.es || 'Versátil',
        style_zh: STYLES[id]?.zh || '多风格',
        style_ru: STYLES[id]?.ru || 'Универсальный',
        style_th: STYLES[id]?.th || 'หลากสไตล์',
        style_hi: STYLES[id]?.hi || 'बहु-शैली',
        portfolio: getCraftImages(i * 3, 4),
        reviews: REVIEW_POOL[id] || [
            { name: 'Khách hàng VIP', rating: 5, date: '2024-12-01', comment: 'Sản phẩm chất lượng cao, đúng tiêu chuẩn làng nghề Phú Vinh.' },
        ],
    };
}

export const getArtisanProfile = (id) => {
    return ARTISAN_PROFILES[id] || {
        style: 'Đa phong cách',
        style_en: 'Versatile',
        style_es: 'Versátil',
        style_zh: '多风格',
        style_ru: 'Универсальный',
        style_th: 'หลากสไตล์',
        style_hi: 'बहु-शैली',
        portfolio: getCraftImages(0, 4),
        reviews: [
            { name: 'Khách hàng VIP', rating: 5, date: '2024-12-01', comment: 'Sản phẩm chất lượng cao, đúng tiêu chuẩn làng nghề Phú Vinh.' },
        ],
    };
};