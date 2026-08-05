import { IMAGES } from './images';

// 10 products per category × 4 categories = 40 products + 6 original = 46 total
export const PRODUCTS = [
    // ===== TOYS (10) =====
    {
        id: 1, name_vi: 'Chú Voi Mây Tre Mini', name_en: 'Mini Bamboo Elephant', name_es: 'Elefante Mini de Bambú', name_zh: '迷你竹象', artisan: 'Nghệ nhân Cao Quyết', price: 22000, rating: 4.8, sold: 820, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-orange-500 to-red-500', image: IMAGES.product1, category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '8 × 6 × 5 cm', craftTime: '2-3 giờ',
            care: { vi: 'Tránh tiếp xúc nước lâu. Lau sạch bằng khăn khô mềm.', en: 'Avoid prolonged water exposure. Wipe with a dry soft cloth.', es: 'Evita el contacto prolongado con agua.', zh: '避免长时间接触水。用干软布擦拭。' },
            story: { vi: 'Chú voi mây tre mini là biểu tượng của sự may mắn trong văn hóa Việt.', en: 'The mini bamboo elephant is a symbol of luck in Vietnamese culture.', es: 'El elefante mini de bambú es un símbolo de buena suerte.', zh: '迷你竹象是越南文化中幸运的象征。' },
            usage: { vi: 'Phù hợp làm đồ chơi trẻ em, quà tặng kỷ niệm.', en: 'Suitable as children\'s toys, commemorative gifts.', es: 'Adecuado como juguete infantil o regalo.', zh: '适合作为儿童玩具、纪念礼品。' }
        }
    },
    {
        id: 7, name_vi: 'Con Rồng Mây Tre', name_en: 'Bamboo Dragon', name_es: 'Dragón de Bambú', name_zh: '竹龙', artisan: 'Cao Quyết', price: 28000, rating: 4.9, sold: 410, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-blue-500 to-cyan-500', image: IMAGES.product1, category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '12 × 4 × 6 cm', craftTime: '3-4 giờ',
            care: { vi: 'Giữ khô ráo, tránh va đập mạnh.', en: 'Keep dry, avoid strong impacts.', es: 'Mantén seco, evita impactos fuertes.', zh: '保持干燥，避免强烈撞击。' },
            story: { vi: 'Con rồng mây tre thể hiện sự uy quyền và may mắn.', en: 'The bamboo dragon represents power and fortune.', es: 'El dragón de bambú representa poder y fortuna.', zh: '竹龙代表权威和好运。' },
            usage: { vi: 'Đồ chơi dân gian, trang trí năm mới.', en: 'Folk toy, New Year decoration.', es: 'Juguete folclórico, decoración de Año Nuevo.', zh: '民间玩具，新年装饰。' }
        }
    },
    {
        id: 8, name_vi: 'Ngựa Mây Nhồi Bông', name_en: 'Rattan Rocking Horse', name_es: 'Caballo de Ratán', name_zh: '藤摇马', artisan: 'Nguyễn San', price: 45000, rating: 4.7, sold: 280, badge: null, image: IMAGES.product1, category: 'toys', materials: ['rattan'],
        guide: {
            dimensions: '30 × 12 × 20 cm', craftTime: '5-6 giờ',
            care: { vi: 'Kiểm tra đinh ốc định kỳ. Lau bằng khăn ẩm.', en: 'Check screws regularly. Wipe with damp cloth.', es: 'Revisa los tornillos regularmente.', zh: '定期检查螺丝。用湿布擦拭。' },
            story: { vi: 'Ngựa mây truyền thống cho trẻ em Việt Nam.', en: 'Traditional rattan horse for Vietnamese children.', es: 'Caballo de ratán tradicional para niños.', zh: '越南儿童传统藤马。' },
            usage: { vi: 'Đồ chơi vận động cho trẻ 2-6 tuổi.', en: 'Active toy for ages 2-6.', es: 'Juguete activo para 2-6 años.', zh: '适合2-6岁儿童的运动玩具。' }
        }
    },
    {
        id: 9, name_vi: 'Bộ Đôi Gà Mây', name_en: 'Rattan Rooster Pair', name_es: 'Pareja de Gallos de Ratán', name_zh: '藤公鸡一对', artisan: 'Bùi Văn Tự', price: 24000, rating: 4.6, sold: 190, badge: null, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80', category: 'toys', materials: ['rattan'],
        guide: {
            dimensions: '10 × 5 × 8 cm', craftTime: '2-3 giờ',
            care: { vi: 'Tránh ẩm ướt.', en: 'Avoid moisture.', es: 'Evita la humedad.', zh: '避免潮湿。' },
            story: { vi: 'Đôi gà mây biểu tượng cho sự sung túc.', en: 'The rooster pair symbolizes prosperity.', es: 'La pareja de gallos simboliza prosperidad.', zh: '公鸡一对象征富足。' },
            usage: { vi: 'Trang trí Tết, quà tặng.', en: 'Tet decoration, gifts.', es: 'Decoración de Año Nuevo.', zh: '新年装饰，礼品。' }
        }
    },
    {
        id: 10, name_vi: 'Xe Đạp Tre Mini', name_en: 'Mini Bamboo Bicycle', name_es: 'Bicicleta Mini de Bambú', name_zh: '迷你竹自行车', artisan: 'Đông Hương', price: 26000, rating: 4.8, sold: 350, badge_vi: 'Độc đáo', badge_en: 'Unique', badge_es: 'Único', badge_zh: '独特', badgeColor: 'from-teal-500 to-green-500', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80', category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '14 × 3 × 8 cm', craftTime: '3-4 giờ',
            care: { vi: 'Tránh bẻ cong các nan tre.', en: 'Avoid bending bamboo slats.', es: 'Evita doblar las lamas de bambú.', zh: '避免弯曲竹条。' },
            story: { vi: 'Mô hình xe đạp tre tái hiện kỷ niệm đồng quê.', en: 'Bamboo bicycle model recreates countryside memories.', es: 'Modelo de bicicleta de bambú evoca recuerdos rurales.', zh: '竹自行车模型重现乡村记忆。' },
            usage: { vi: 'Đồ chơi, trang trí bàn làm việc.', en: 'Toy, desk decoration.', es: 'Juguete, decoración de escritorio.', zh: '玩具，桌面装饰。' }
        }
    },
    {
        id: 11, name_vi: 'Con Trâu Mây Tre', name_en: 'Bamboo Buffalo', name_es: 'Búfalo de Bambú', name_zh: '竹水牛', artisan: 'Ngọc Bích', price: 27000, rating: 4.7, sold: 220, badge: null, image: IMAGES.product6, category: 'toys', materials: ['bamboo', 'rattan'],
        guide: {
            dimensions: '10 × 4 × 6 cm', craftTime: '3 giờ',
            care: { vi: 'Lau khô, tránh nước.', en: 'Wipe dry, avoid water.', es: 'Limpiar en seco.', zh: '干擦，避免水。' },
            story: { vi: 'Con trâu là biểu tượng nông nghiệp Việt Nam.', en: 'The buffalo symbolizes Vietnamese agriculture.', es: 'El búfalo simboliza la agricultura vietnamita.', zh: '水牛是越南农业的象征。' },
            usage: { vi: 'Đồ chơi, quà lưu niệm.', en: 'Toy, souvenir.', es: 'Juguete, recuerdo.', zh: '玩具，纪念品。' }
        }
    },
    {
        id: 12, name_vi: 'Bồ Câu Mây Đôi', name_en: 'Rattan Dove Pair', name_es: 'Pareja de Palomas de Ratán', name_zh: '藤鸽子一对', artisan: 'Thu Mai', price: 21000, rating: 4.5, sold: 160, badge: null, image: IMAGES.product2, category: 'toys', materials: ['rattan'],
        guide: {
            dimensions: '8 × 3 × 5 cm', craftTime: '2 giờ',
            care: { vi: 'Giữ nơi thoáng mát.', en: 'Keep in ventilated area.', es: 'Guardar en lugar ventilado.', zh: '存放在通风处。' },
            story: { vi: 'Bồ câu mây biểu tượng hòa bình.', en: 'Rattan doves symbolize peace.', es: 'Las palomas de ratán simbolizan paz.', zh: '藤鸽象征和平。' },
            usage: { vi: 'Đồ chơi, trang trí.', en: 'Toy, decoration.', es: 'Juguete, decoración.', zh: '玩具，装饰。' }
        }
    },
    {
        id: 13, name_vi: 'Tôm Mây Tre Đồ Chơi', name_en: 'Bamboo Shrimp Toy', name_es: 'Camarón de Bambú', name_zh: '竹虾玩具', artisan: 'Cao Quyết', price: 19000, rating: 4.4, sold: 140, badge: null, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80', category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '10 × 3 × 4 cm', craftTime: '1.5 giờ',
            care: { vi: 'Tránh đè nặng.', en: 'Avoid heavy pressure.', es: 'Evita presión pesada.', zh: '避免重压。' },
            story: { vi: 'Tôm mây là đồ chơi dân gian truyền thống.', en: 'Rattan shrimp is a traditional folk toy.', es: 'El camarón de ratán es un juguete folclórico.', zh: '藤虾是传统民间玩具。' },
            usage: { vi: 'Đồ chơi dân gian.', en: 'Folk toy.', es: 'Juguete folclórico.', zh: '民间玩具。' }
        }
    },
    {
        id: 14, name_vi: 'Bướm Mây Tre Bay', name_en: 'Bamboo Butterfly', name_es: 'Mariposa de Bambú', name_zh: '竹蝴蝶', artisan: 'Đông Hương', price: 18000, rating: 4.6, sold: 310, badge: null, image: IMAGES.product4, category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '12 × 2 × 8 cm', craftTime: '1.5 giờ',
            care: { vi: 'Tránh gãy cánh.', en: 'Avoid breaking wings.', es: 'Evita romper las alas.', zh: '避免折断翅膀。' },
            story: { vi: 'Bướm mây tre có thể bay bằng cơ cấu tre.', en: 'Bamboo butterfly can fly via bamboo mechanism.', es: 'La mariposa de bambú puede volar.', zh: '竹蝴蝶可通过竹机关飞行。' },
            usage: { vi: 'Đồ chơi dân gian, trang trí.', en: 'Folk toy, decoration.', es: 'Juguete folclórico, decoración.', zh: '民间玩具，装饰。' }
        }
    },
    {
        id: 15, name_vi: 'Cá Chép Mây Hóa Rồng', name_en: 'Rattan Carp Dragon', name_es: 'Carpa de Ratán', name_zh: '藤鲤鱼化龙', artisan: 'Bùi Văn Tự', price: 30000, rating: 4.9, sold: 180, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', category: 'toys', materials: ['rattan'],
        guide: {
            dimensions: '15 × 5 × 10 cm', craftTime: '4-5 giờ',
            care: { vi: 'Tránh va đập, giữ khô.', en: 'Avoid impact, keep dry.', es: 'Evita impactos, mantén seco.', zh: '避免撞击，保持干燥。' },
            story: { vi: 'Cá chép hóa rồng biểu tượng sự nỗ lực thành công.', en: 'Carp turning into dragon symbolizes success through effort.', es: 'La carpa que se transforma en dragón simboliza el éxito.', zh: '鲤鱼化龙象征通过努力获得成功。' },
            usage: { vi: 'Quà tặng tri ân, trang trí.', en: 'Appreciation gift, decoration.', es: 'Regalo de agradecimiento.', zh: '感谢礼物，装饰。' }
        }
    },

    // ===== DECOR (10) =====
    {
        id: 2, name_vi: 'Giỏ Hoa Trang Trí Nhỏ', name_en: 'Mini Flower Basket', name_es: 'Cesta de Flores Mini', name_zh: '迷你花篮', artisan: 'Nghệ nhân Nguyễn San', price: 20000, rating: 4.7, sold: 1200, badge: null, image: IMAGES.product2, category: 'decor', materials: ['rattan', 'reed'],
        guide: {
            dimensions: '10 × 8 × 6 cm', craftTime: '1.5-2 giờ',
            care: { vi: 'Giữ khô ráo. Không để ngoài trời mưa.', en: 'Keep dry. Do not leave outdoors.', es: 'Mantén seco.', zh: '保持干燥。' },
            story: { vi: 'Giỏ hoa nhỏ được đan bằng kỹ thuật đan nong truyền thống.', en: 'The mini flower basket uses traditional ring-weave.', es: 'La cesta de flores mini usa tejido tradicional.', zh: '迷你花篮使用传统环形编织技法。' },
            usage: { vi: 'Đựng hoa khô, trang trí bàn trà.', en: 'Hold dried flowers, decorate.', es: 'Para flores secas.', zh: '放干花，装饰。' }
        }
    },
    {
        id: 4, name_vi: 'Chim Phượng Mây Treo Tường', name_en: 'Wall Phoenix Ornament', name_es: 'Colgante de Fénix', name_zh: '墙上凤凰装饰', artisan: 'Bùi Văn Tự', price: 24000, rating: 4.9, sold: 368, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-purple-500 to-violet-600', image: IMAGES.product4, category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: '15 × 10 × 3 cm', craftTime: '4-5 giờ',
            care: { vi: 'Lau bụi định kỳ.', en: 'Dust regularly.', es: 'Quita el polvo regularmente.', zh: '定期除尘。' },
            story: { vi: 'Chim phượng mây biểu tượng sự phú quý.', en: 'The rattan phoenix symbolizes prosperity.', es: 'El fénix de ratán simboliza prosperidad.', zh: '藤凤凰象征富贵。' },
            usage: { vi: 'Treo tường trang trí phòng khách.', en: 'Wall decoration for living room.', es: 'Decoración de pared.', zh: '客厅墙面装饰。' }
        }
    },
    {
        id: 5, name_vi: 'Khung Ảnh Tre Mini 10x15', name_en: 'Mini Bamboo Photo Frame', name_es: 'Marco de Fotos Mini', name_zh: '迷你竹相框', artisan: 'Đông Hương', price: 21000, rating: 4.9, sold: 984, badge: null, image: IMAGES.product5, category: 'decor', materials: ['bamboo'],
        guide: {
            dimensions: '12 × 17 cm', craftTime: '1.5-2 giờ',
            care: { vi: 'Tránh ánh nắng trực tiếp.', en: 'Avoid direct sunlight.', es: 'Evita la luz solar directa.', zh: '避免阳光直射。' },
            story: { vi: 'Khung ảnh tre với thiết kế tối giản.', en: 'Minimalist bamboo photo frame.', es: 'Marco de fotos minimalista.', zh: '简约竹相框。' },
            usage: { vi: 'Đặt ảnh gia đình trên bàn.', en: 'Display family photos.', es: 'Mostrar fotos de familia.', zh: '展示家庭照片。' }
        }
    },
    {
        id: 16, name_vi: 'Đèn Mây Tre Trang Trí', name_en: 'Rattan Pendant Lamp', name_es: 'Lámpara Colgante de Ratán', name_zh: '藤吊灯', artisan: 'Thu Mai', price: 35000, rating: 4.8, sold: 290, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-amber-500 to-orange-500', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø20 × 18 cm', craftTime: '5-6 giờ',
            care: { vi: 'Lau bụi bằng cọ mềm. Tránh nhiệt độ cao.', en: 'Dust with soft brush. Avoid high heat.', es: 'Limpiar con cepillo suave.', zh: '用软刷除尘。避免高温。' },
            story: { vi: 'Đèn mây tạo ánh sáng ấm cúng, thân thiện môi trường.', en: 'Rattan lamp creates warm, eco-friendly lighting.', es: 'Lámpara de ratán crea luz cálida.', zh: '藤灯营造温馨环保的光线。' },
            usage: { vi: 'Trang trí phòng khách, phòng ăn.', en: 'Living room, dining room decor.', es: 'Decoración de sala.', zh: '客厅、餐厅装饰。' }
        }
    },
    {
        id: 17, name_vi: 'Gương Mặt Trời Mây', name_en: 'Rattan Sun Mirror', name_es: 'Espejo Sol de Ratán', name_zh: '藤太阳镜', artisan: 'Bùi Văn Tự', price: 38000, rating: 4.9, sold: 210, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-yellow-500 to-amber-500', image: IMAGES.product4, category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø25 × 3 cm', craftTime: '4-5 giờ',
            care: { vi: 'Lau kính bằng khăn mềm.', en: 'Clean glass with soft cloth.', es: 'Limpiar el cristal con paño suave.', zh: '用软布擦拭镜面。' },
            story: { vi: 'Gương mặt trời mang năng lượng tích cực cho không gian.', en: 'Sun mirror brings positive energy.', es: 'El espejo sol trae energía positiva.', zh: '太阳镜为空间带来正能量。' },
            usage: { vi: 'Trang trí phòng khách, phòng ngủ.', en: 'Living room, bedroom decor.', es: 'Decoración de sala, dormitorio.', zh: '客厅、卧室装饰。' }
        }
    },
    {
        id: 18, name_vi: 'Tranh Treo Tường Mây Đan', name_en: 'Rattan Wall Art', name_es: 'Arte de Pared de Ratán', name_zh: '藤墙画', artisan: 'Nguyễn San', price: 33000, rating: 4.7, sold: 150, badge: null, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80', category: 'decor', materials: ['rattan', 'bamboo'],
        guide: {
            dimensions: '30 × 40 × 2 cm', craftTime: '6-8 giờ',
            care: { vi: 'Lau bụi nhẹ nhàng.', en: 'Dust gently.', es: 'Quitar el polvo suavemente.', zh: '轻轻除尘。' },
            story: { vi: 'Tranh mây đan là nghệ thuật độc bản.', en: 'Rattan wall art is unique artistry.', es: 'El arte de ratán es única.', zh: '藤编画是独特的艺术。' },
            usage: { vi: 'Trang trí tường phòng khách.', en: 'Living room wall decor.', es: 'Decoración de pared.', zh: '客厅墙面装饰。' }
        }
    },
    {
        id: 19, name_vi: 'Lồng Đèn Hội Tre', name_en: 'Bamboo Festival Lantern', name_es: 'Linterna de Festival de Bambú', name_zh: '竹节庆灯笼', artisan: 'Cao Quyết', price: 25000, rating: 4.6, sold: 340, badge: null, image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=400&q=80', category: 'decor', materials: ['bamboo'],
        guide: {
            dimensions: 'Ø15 × 20 cm', craftTime: '3-4 giờ',
            care: { vi: 'Tránh lửa trực tiếp.', en: 'Avoid direct flame.', es: 'Evita llama directa.', zh: '避免直接火焰。' },
            story: { vi: 'Lồng đèn tre truyền thống cho lễ hội.', en: 'Traditional bamboo lantern for festivals.', es: 'Linterna tradicional de bambú.', zh: '传统竹制节庆灯笼。' },
            usage: { vi: 'Trang trí lễ hội, trung thu.', en: 'Festival, Mid-Autumn decoration.', es: 'Decoración de festival.', zh: '节庆、中秋装饰。' }
        }
    },
    {
        id: 20, name_vi: 'Hoa Sen Mây Trang Trí', name_en: 'Rattan Lotus Flower', name_es: 'Flor de Loto de Ratán', name_zh: '藤莲花', artisan: 'Thu Mai', price: 22000, rating: 4.8, sold: 270, badge: null, image: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø12 × 5 cm', craftTime: '2-3 giờ',
            care: { vi: 'Lau bụi nhẹ.', en: 'Dust gently.', es: 'Quitar el polvo suavemente.', zh: '轻轻除尘。' },
            story: { vi: 'Hoa sen mây biểu tượng sự thanh tao.', en: 'Rattan lotus symbolizes purity.', es: 'El loto de ratán simboliza pureza.', zh: '藤莲象征高洁。' },
            usage: { vi: 'Trang trí bàn thờ, phòng khách.', en: 'Altar, living room decor.', es: 'Decoración de altar.', zh: '佛堂、客厅装饰。' }
        }
    },
    {
        id: 21, name_vi: 'Giỏ Treo Tường Boho', name_en: 'Boho Wall Basket', name_es: 'Cesta Boho de Pared', name_zh: '波西米亚挂篮', artisan: 'Ngọc Bích', price: 27000, rating: 4.7, sold: 200, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø25 × 5 cm', craftTime: '3-4 giờ',
            care: { vi: 'Tránh ẩm ướt.', en: 'Avoid moisture.', es: 'Evita la humedad.', zh: '避免潮湿。' },
            story: { vi: 'Giỏ treo tường phong cách Boho hiện đại.', en: 'Boho-style wall basket.', es: 'Cesta de pared estilo Boho.', zh: '波西米亚风格挂篮。' },
            usage: { vi: 'Trang trí tường, đựng đồ nhỏ.', en: 'Wall decor, small storage.', es: 'Decoración de pared.', zh: '墙面装饰，小物收纳。' }
        }
    },
    {
        id: 22, name_vi: 'Dreamcatcher Mây Tre', name_en: 'Bamboo Dreamcatcher', name_es: 'Atrapa Sueños de Bambú', name_zh: '竹捕梦网', artisan: 'Đông Hương', price: 23000, rating: 4.5, sold: 180, badge: null, image: 'https://images.unsplash.com/photo-1635776062764-e025521e3df3?w=400&q=80', category: 'decor', materials: ['bamboo', 'rattan'],
        guide: {
            dimensions: 'Ø15 × 40 cm', craftTime: '3 giờ',
            care: { vi: 'Tránh kéo mạnh dây.', en: 'Avoid pulling strings hard.', es: 'Evita tirar fuerte de los hilos.', zh: '避免用力拉扯绳子。' },
            story: { vi: 'Dreamcatcher tre mang ý nghĩa bảo vệ giấc ngủ.', en: 'Bamboo dreamcatcher protects sleep.', es: 'El atrapa sueños protege el sueño.', zh: '竹捕梦网保护睡眠。' },
            usage: { vi: 'Treo phòng ngủ.', en: 'Hang in bedroom.', es: 'Colgar en dormitorio.', zh: '挂在卧室。' }
        }
    },

    // ===== OFFICE (10) =====
    {
        id: 3, name_vi: 'Hộp Đựng Bút Tre Đan', name_en: 'Bamboo Pen Holder', name_es: 'Portalápices de Bambú', name_zh: '竹笔筒', artisan: 'Cô Thu Mai', price: 25000, rating: 4.7, sold: 640, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-blue-500 to-cyan-500', image: IMAGES.product3, category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '6 × 6 × 10 cm', craftTime: '2-3 giờ',
            care: { vi: 'Tránh độ ẩm cao.', en: 'Avoid high humidity.', es: 'Evita alta humedad.', zh: '避免高湿。' },
            story: { vi: 'Hộp đựng bút tre đan với kỹ thuật đan nan dày.', en: 'Bamboo pen holder with dense slat weaving.', es: 'Portalápices con tejido denso.', zh: '竹笔筒采用密织技法。' },
            usage: { vi: 'Đựng bút, dụng cụ văn phòng.', en: 'Hold pens, office supplies.', es: 'Para bolígrafos.', zh: '放笔、办公用品。' }
        }
    },
    {
        id: 23, name_vi: 'Khay Giấy Note Tre', name_en: 'Bamboo Note Tray', name_es: 'Bandeja de Notas de Bambú', name_zh: '竹便签盘', artisan: 'Đông Hương', price: 19000, rating: 4.5, sold: 320, badge: null, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '15 × 10 × 2 cm', craftTime: '2 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Limpiar en seco.', zh: '干擦。' },
            story: { vi: 'Khay giấy note tre tiện lợi cho bàn làm việc.', en: 'Convenient bamboo note tray for desk.', es: 'Bandeja práctica de bambú.', zh: '便利的竹便签盘。' },
            usage: { vi: 'Đựng giấy note, kẹp tăm.', en: 'Hold notes, clips.', es: 'Para notas, clips.', zh: '放便签、回形针。' }
        }
    },
    {
        id: 24, name_vi: 'Đế Lót Ly Mây Đan', name_en: 'Rattan Coaster Set', name_es: 'Set de Posavasos de Ratán', name_zh: '藤杯垫套装', artisan: 'Ngọc Bích', price: 18000, rating: 4.6, sold: 450, badge: null, image: IMAGES.product3, category: 'office', materials: ['rattan'],
        guide: {
            dimensions: 'Ø10 × 0.5 cm (4 cái)', craftTime: '2 giờ',
            care: { vi: 'Lau khô sau khi dùng.', en: 'Wipe dry after use.', es: 'Secar después de usar.', zh: '使用后擦干。' },
            story: { vi: 'Đế ly mây bảo vệ bàn và thêm thẩm mỹ.', en: 'Rattan coasters protect desk and add aesthetics.', es: 'Posavasos de ratán protegen la mesa.', zh: '藤杯垫保护桌面并增添美感。' },
            usage: { vi: 'Lót ly, tách trên bàn làm việc.', en: 'Under cups at desk.', es: 'Bajo tazas en el escritorio.', zh: '办公桌上的杯垫。' }
        }
    },
    {
        id: 25, name_vi: 'Hộp Đựng Card Visit Tre', name_en: 'Bamboo Card Box', name_es: 'Caja de Tarjetas de Bambú', name_zh: '竹名片盒', artisan: 'Thu Mai', price: 23000, rating: 4.7, sold: 280, badge: null, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '10 × 6 × 3 cm', craftTime: '2-3 giờ',
            care: { vi: 'Tránh ẩm.', en: 'Avoid moisture.', es: 'Evita la humedad.', zh: '避免潮湿。' },
            story: { vi: 'Hộp danh thiếp tre sang trọng cho doanh nhân.', en: 'Elegant bamboo card box for professionals.', es: 'Caja elegante de bambú.', zh: '优雅的竹名片盒。' },
            usage: { vi: 'Đựng card visit, thẻ.', en: 'Hold business cards.', es: 'Para tarjetas de visita.', zh: '放名片、卡片。' }
        }
    },
    {
        id: 26, name_vi: 'Organizer Bàn Tre Đan', name_en: 'Bamboo Desk Organizer', name_es: 'Organizador de Bambú', name_zh: '竹桌面收纳架', artisan: 'Đông Hương', price: 32000, rating: 4.8, sold: 190, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-emerald-500 to-green-500', image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '20 × 10 × 12 cm', craftTime: '4-5 giờ',
            care: { vi: 'Lau khô mềm.', en: 'Wipe with dry soft cloth.', es: 'Limpiar con paño seco.', zh: '用干软布擦拭。' },
            story: { vi: 'Organizer đa năng giúp gọn gàng bàn làm việc.', en: 'Multi-functional organizer for a tidy desk.', es: 'Organizador multifuncional.', zh: '多功能收纳架。' },
            usage: { vi: 'Đựng bút, giấy, đồ văn phòng.', en: 'Hold pens, paper, supplies.', es: 'Para bolígrafos, papel.', zh: '放笔、纸、办公用品。' }
        }
    },
    {
        id: 27, name_vi: 'Khung Ghi Chú Tre Mini', name_en: 'Bamboo Memo Board', name_es: 'Tablero de Notas de Bambú', name_zh: '竹备忘板', artisan: 'Ngọc Bích', price: 26000, rating: 4.6, sold: 170, badge: null, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '25 × 20 × 2 cm', craftTime: '3 giờ',
            care: { vi: 'Tránh nước.', en: 'Avoid water.', es: 'Evita el agua.', zh: '避免水。' },
            story: { vi: 'Khung ghi chú tre thay thế bảng nhựa.', en: 'Bamboo memo board replaces plastic boards.', es: 'Tablero de bambú reemplaza plástico.', zh: '竹备忘板替代塑料板。' },
            usage: { vi: 'Ghi chú, nhắc việc tại văn phòng.', en: 'Notes, reminders at office.', es: 'Notas, recordatorios.', zh: '办公备忘、提醒。' }
        }
    },
    {
        id: 28, name_vi: 'Túi Đựng Bút Mây Dài', name_en: 'Rattan Pen Roll', name_es: 'Estuche de Ratán', name_zh: '藤笔卷袋', artisan: 'Thu Mai', price: 24000, rating: 4.7, sold: 220, badge: null, image: IMAGES.product3, category: 'office', materials: ['rattan'],
        guide: {
            dimensions: '20 × 8 cm (cuộn)', craftTime: '3 giờ',
            care: { vi: 'Tránh gấp nếp.', en: 'Avoid creasing.', es: 'Evitar arrugas.', zh: '避免折痕。' },
            story: { vi: 'Túi bút mây cuộn tiện mang theo.', en: 'Portable rattan pen roll.', es: 'Estuche de ratán portátil.', zh: '便携藤笔卷袋。' },
            usage: { vi: 'Đựng bút, cọ vẽ.', en: 'Hold pens, brushes.', es: 'Para bolígrafos, pinceles.', zh: '放笔、画笔。' }
        }
    },
    {
        id: 29, name_vi: 'Giá Đỡ Điện Thoại Tre', name_en: 'Bamboo Phone Stand', name_es: 'Soporte de Bambú', name_zh: '竹手机支架', artisan: 'Đông Hương', price: 21000, rating: 4.8, sold: 560, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-teal-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '12 × 8 × 10 cm', craftTime: '2 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Limpiar en seco.', zh: '干擦。' },
            story: { vi: 'Giá điện thoại tre tự nhiên, thân thiện môi trường.', en: 'Natural bamboo phone stand, eco-friendly.', es: 'Soporte natural de bambú.', zh: '天然竹手机支架。' },
            usage: { vi: 'Đỡ điện thoại, máy tính bảng trên bàn.', en: 'Hold phone, tablet on desk.', es: 'Soporte para móvil, tablet.', zh: '桌面手机、平板支架。' }
        }
    },
    {
        id: 30, name_vi: 'Hộp Đựng File Tre', name_en: 'Bamboo File Box', name_es: 'Caja de Archivos de Bambú', name_zh: '竹文件盒', artisan: 'Thu Mai', price: 34000, rating: 4.6, sold: 130, badge: null, image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '30 × 10 × 20 cm', craftTime: '5-6 giờ',
            care: { vi: 'Tránh nặng quá tải.', en: 'Avoid overloading.', es: 'Evita sobrecargar.', zh: '避免超载。' },
            story: { vi: 'Hộp file tre đan cho văn phòng xanh.', en: 'Bamboo file box for green office.', es: 'Caja de archivos de bambú.', zh: '竹文件盒。' },
            usage: { vi: 'Đựng hồ sơ, tài liệu.', en: 'Hold files, documents.', es: 'Para archivos, documentos.', zh: '放档案、文件。' }
        }
    },
    {
        id: 31, name_vi: 'Đèn Bàn Tre Đan Mini', name_en: 'Mini Bamboo Desk Lamp', name_es: 'Lámpara de Escritorio de Bambú', name_zh: '迷你竹台灯', artisan: 'Bùi Văn Tự', price: 36000, rating: 4.9, sold: 160, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '15 × 15 × 25 cm', craftTime: '5-6 giờ',
            care: { vi: 'Tránh nước, lau khô.', en: 'Avoid water, wipe dry.', es: 'Evita el agua.', zh: '避免水，干擦。' },
            story: { vi: 'Đèn bàn tre tạo không gian làm việc ấm áp.', en: 'Bamboo desk lamp creates warm workspace.', es: 'Lámpara de bambú crea ambiente cálido.', zh: '竹台灯营造温暖工作空间。' },
            usage: { vi: 'Chiếu sáng bàn làm việc.', en: 'Desk lighting.', es: 'Iluminación de escritorio.', zh: '桌面照明。' }
        }
    },

    // ===== HOME (10) =====
    {
        id: 6, name_vi: 'Rổ Tre Đan Nhỏ Đựng Đồ', name_en: 'Mini Bamboo Basket', name_es: 'Cesta Mini de Bambú', name_zh: '迷你竹篮', artisan: 'Ngọc Bích', price: 23000, rating: 5, sold: 553, badge_vi: 'Yêu thích', badge_en: 'Favorite', badge_es: 'Favorito', badge_zh: '喜爱', badgeColor: 'from-pink-500 to-rose-500', image: IMAGES.product6, category: 'home', materials: ['bamboo', 'rattan'],
        guide: {
            dimensions: '12 × 8 × 6 cm', craftTime: '2-3 giờ',
            care: { vi: 'Tránh ngâm nước lâu.', en: 'Avoid soaking in water.', es: 'Evita sumergir en agua.', zh: '避免浸泡水中。' },
            story: { vi: 'Rổ tre đan nhỏ với kỹ thuật đan nong đôi.', en: 'Mini bamboo basket with double-ring weave.', es: 'Cesta con tejido de doble anillo.', zh: '迷你竹篮采用双环编织。' },
            usage: { vi: 'Đựng trái cây, đồ nhỏ.', en: 'Hold fruits, small items.', es: 'Para frutas, objetos.', zh: '放水果、小物。' }
        }
    },
    {
        id: 32, name_vi: 'Khay Đựng Trái Cây Mây', name_en: 'Rattan Fruit Tray', name_es: 'Bandeja de Frutas de Ratán', name_zh: '藤水果盘', artisan: 'Nguyễn San', price: 29000, rating: 4.8, sold: 380, badge: null, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: 'Ø28 × 6 cm', craftTime: '4 giờ',
            care: { vi: 'Lau khô sau khi rửa trái cây.', en: 'Wipe dry after washing fruit.', es: 'Secar después de lavar fruta.', zh: '洗水果后擦干。' },
            story: { vi: 'Khay đựng trái cây mây cho bàn ăn thêm đẹp.', en: 'Rattan fruit tray beautifies dining table.', es: 'Bandeja de ratán embellece la mesa.', zh: '藤水果盘美化餐桌。' },
            usage: { vi: 'Đựng trái cây trên bàn ăn.', en: 'Hold fruit on dining table.', es: 'Para frutas en la mesa.', zh: '餐桌上放水果。' }
        }
    },
    {
        id: 33, name_vi: 'Rổ Rửa Mây Tre Xâu', name_en: 'Bamboo Washing Basket', name_es: 'Cesta de Lavado de Bambú', name_zh: '竹洗菜篮', artisan: 'Ngọc Bích', price: 27000, rating: 4.7, sold: 290, badge: null, image: IMAGES.product2, category: 'home', materials: ['bamboo'],
        guide: {
            dimensions: 'Ø22 × 12 cm', craftTime: '3-4 giờ',
            care: { vi: 'Phơi khô sau khi dùng.', en: 'Air dry after use.', es: 'Secar al aire después de usar.', zh: '使用后晾干。' },
            story: { vi: 'Rổ rửa tre đan thoát nước nhanh.', en: 'Bamboo washing basket drains quickly.', es: 'Cesta de bambú drena rápido.', zh: '竹洗菜篮快速沥水。' },
            usage: { vi: 'Rửa rau, trái cây.', en: 'Wash vegetables, fruits.', es: 'Lavar verduras, frutas.', zh: '洗蔬菜、水果。' }
        }
    },
    {
        id: 34, name_vi: 'Hộp Đựng Đồ Mây Nắp Đậy', name_en: 'Rattan Storage Box', name_es: 'Caja de Almacenamiento de Ratán', name_zh: '藤收纳盒', artisan: 'Thu Mai', price: 31000, rating: 4.6, sold: 210, badge: null, image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '20 × 15 × 10 cm', craftTime: '4-5 giờ',
            care: { vi: 'Lau khô, tránh ẩm.', en: 'Wipe dry, avoid moisture.', es: 'Secar, evitar humedad.', zh: '干擦，避免潮湿。' },
            story: { vi: 'Hộp đựng mây có nắp cho phòng khách gọn gàng.', en: 'Rattan storage box with lid for tidy living room.', es: 'Caja de ratán con tapa.', zh: '带盖藤收纳盒。' },
            usage: { vi: 'Đựng đồ lặt vặt, remote.', en: 'Hold small items, remote.', es: 'Para objetos pequeños.', zh: '放杂物、遥控器。' }
        }
    },
    {
        id: 35, name_vi: 'Giỏ Đựng Quần Áo Mây Lớn', name_en: 'Large Rattan Laundry Basket', name_es: 'Cesta Grande de Ropa de Ratán', name_zh: '大藤洗衣篮', artisan: 'Nguyễn San', price: 42000, rating: 4.8, sold: 320, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-amber-500 to-orange-500', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: 'Ø35 × 45 cm', craftTime: '6-8 giờ',
            care: { vi: 'Phơi khô định kỳ.', en: 'Air dry periodically.', es: 'Secar al aire periódicamente.', zh: '定期晾干。' },
            story: { vi: 'Giỏ quần áo mây lớn, bền và đẹp.', en: 'Large rattan laundry basket, durable and beautiful.', es: 'Cesta grande de ratán, duradera.', zh: '大藤洗衣篮，耐用美观。' },
            usage: { vi: 'Đựng quần áo bẩn, chăn mền.', en: 'Hold dirty laundry, blankets.', es: 'Para ropa sucia, mantas.', zh: '放脏衣服、毯子。' }
        }
    },
    {
        id: 36, name_vi: 'Thảm Tre Đan Đặt Bàn', name_en: 'Bamboo Table Mat', name_es: 'Individual de Bambú', name_zh: '竹桌垫', artisan: 'Đông Hương', price: 20000, rating: 4.5, sold: 410, badge: null, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80', category: 'home', materials: ['bamboo'],
        guide: {
            dimensions: '30 × 20 × 0.5 cm', craftTime: '2 giờ',
            care: { vi: 'Lau khô sau khi dùng.', en: 'Wipe dry after use.', es: 'Secar después de usar.', zh: '使用后擦干。' },
            story: { vi: 'Thảm tre bảo vệ bàn, tạo vẻ đẹp tự nhiên.', en: 'Bamboo mat protects table, adds natural beauty.', es: 'Individual de bambú protege la mesa.', zh: '竹垫保护桌面，增添自然美。' },
            usage: { vi: 'Lót đĩa, nồi nóng trên bàn ăn.', en: 'Under plates, hot pots.', es: 'Bajo platos, ollas calientes.', zh: '垫盘子、热锅。' }
        }
    },
    {
        id: 37, name_vi: 'Bình Hoa Mây Tre Cao', name_en: 'Tall Rattan Vase', name_es: 'Jarrón Alto de Ratán', name_zh: '高藤花瓶', artisan: 'Bùi Văn Tự', price: 33000, rating: 4.7, sold: 180, badge: null, image: IMAGES.product6, category: 'home', materials: ['rattan', 'bamboo'],
        guide: {
            dimensions: 'Ø12 × 30 cm', craftTime: '4-5 giờ',
            care: { vi: 'Tránh nước bên trong.', en: 'Avoid water inside.', es: 'Evita agua en el interior.', zh: '内部避免水。' },
            story: { vi: 'Bình hoa mây cao cho hoa khô, hoa lụa.', en: 'Tall rattan vase for dried, silk flowers.', es: 'Jarrón alto de ratán para flores secas.', zh: '高藤花瓶适合干花、绢花。' },
            usage: { vi: 'Cắm hoa khô trang trí phòng khách.', en: 'Hold dried flowers in living room.', es: 'Para flores secas en la sala.', zh: '客厅插干花。' }
        }
    },
    {
        id: 38, name_vi: 'Giỏ Picnic Mây Có Quai', name_en: 'Rattan Picnic Basket', name_es: 'Cesta de Picnic de Ratán', name_zh: '藤野餐篮', artisan: 'Ngọc Bích', price: 39000, rating: 4.9, sold: 250, badge_vi: 'Yêu thích', badge_en: 'Favorite', badge_es: 'Favorito', badge_zh: '喜爱', badgeColor: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '35 × 25 × 20 cm', craftTime: '6 giờ',
            care: { vi: 'Tránh để ngoài trời mưa.', en: 'Avoid leaving in rain.', es: 'Evita dejar bajo la lluvia.', zh: '避免淋雨。' },
            story: { vi: 'Giỏ picnic mây có quai xách tiện lợi.', en: 'Rattan picnic basket with handle.', es: 'Cesta de picnic con asa.', zh: '带手柄的藤野餐篮。' },
            usage: { vi: 'Đựng đồ ăn dã ngoại.', en: 'Hold picnic food.', es: 'Para comida de picnic.', zh: '放野餐食物。' }
        }
    },
    {
        id: 39, name_vi: 'Chổi Quét Nan Tre Mini', name_en: 'Mini Bamboo Broom', name_es: 'Escoba Mini de Bambú', name_zh: '迷你竹扫帚', artisan: 'Cao Quyết', price: 17000, rating: 4.4, sold: 140, badge: null, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80', category: 'home', materials: ['bamboo'],
        guide: {
            dimensions: '40 × 10 cm', craftTime: '1.5 giờ',
            care: { vi: 'Phơi khô sau khi dùng.', en: 'Air dry after use.', es: 'Secar al aire después de usar.', zh: '使用后晾干。' },
            story: { vi: 'Chổi nan tre truyền thống cho góc nhà sạch sẽ.', en: 'Traditional bamboo broom for clean corners.', es: 'Escoba tradicional de bambú.', zh: '传统竹扫帚。' },
            usage: { vi: 'Quét bàn, kệ, góc nhà.', en: 'Sweep desk, shelf, corners.', es: 'Barrer mesa, estante, esquinas.', zh: '扫桌面、架子、角落。' }
        }
    },
    {
        id: 40, name_vi: 'Giỏ Đựng Gia Vị Mây', name_en: 'Rattan Spice Basket', name_es: 'Cesta de Especias de Ratán', name_zh: '藤调料篮', artisan: 'Thu Mai', price: 26000, rating: 4.6, sold: 200, badge: null, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '18 × 12 × 8 cm', craftTime: '3 giờ',
            care: { vi: 'Lau khô, tránh dầu mỡ.', en: 'Wipe dry, avoid grease.', es: 'Secar, evitar grasa.', zh: '干擦，避免油污。' },
            story: { vi: 'Giỏ gia vị mây cho bếp thêm gọn gàng.', en: 'Rattan spice basket for tidy kitchen.', es: 'Cesta de especias para cocina ordenada.', zh: '藤调料篮让厨房更整洁。' },
            usage: { vi: 'Đựng gia vị, tỏi, hành.', en: 'Hold spices, garlic, onions.', es: 'Para especias, ajo, cebolla.', zh: '放调料、蒜、葱。' }
        }
    },

    // ===== 20 NEW PRODUCTS (ID 41-60) =====
    {
        id: 41, name_vi: 'Ghế Mây Tre Thiết Kế', name_en: 'Designer Rattan Chair', name_es: 'Silla Diseño de Ratán', name_zh: '设计款藤椅', artisan: 'Bùi Văn Tự', price: 48000, rating: 4.9, sold: 95, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: '55 × 60 × 75 cm', craftTime: '8-10 giờ',
            care: { vi: 'Tránh vật nặng lên trên.', en: 'Avoid heavy objects on top.', es: 'Evitar objetos pesados.', zh: '避免重物放置。' },
            story: { vi: 'Ghế mây thiết kế hiện đại, phối nội thất Đông Dương.', en: 'Modern rattan chair, Indochine interior style.', es: 'Silla moderna estilo indochina.', zh: '现代设计藤椅，东洋风格。' },
            usage: { vi: 'Ghế thư giãn phòng khách.', en: 'Living room lounge chair.', es: 'Silla de sala.', zh: '客厅休闲椅。' }
        }
    },
    {
        id: 42, name_vi: 'Túi Xách Mây Tre Boho', name_en: 'Boho Rattan Handbag', name_es: 'Bolso Boho de Ratán', name_zh: '波西藤手提包', artisan: 'Thu Mai', price: 36000, rating: 4.8, sold: 310, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: '25 × 30 × 12 cm', craftTime: '5-6 giờ',
            care: { vi: 'Tránh nước, lau khô.', en: 'Avoid water, wipe dry.', es: 'Evitar agua.', zh: '避免水。' },
            story: { vi: 'Túi mây Boho thời trang, thân thiện môi trường.', en: 'Eco-friendly Boho rattan bag.', es: 'Bolso Boho ecológico.', zh: '环保波西藤包。' },
            usage: { vi: 'Túi xách đi chơi, dạo phố.', en: 'Casual handbag.', es: 'Bolso casual.', zh: '休闲手提包。' }
        }
    },
    {
        id: 43, name_vi: 'Đèn Hồng Ngoại Mây Tre', name_en: 'Rattan Himalayan Lamp', name_es: 'Lámpara Himalaya de Ratán', name_zh: '藤喜马拉雅灯', artisan: 'Đông Hương', price: 42000, rating: 4.9, sold: 140, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-amber-500 to-yellow-500', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø25 × 30 cm', craftTime: '6-7 giờ',
            care: { vi: 'Lau bằng khăn ẩm.', en: 'Wipe with damp cloth.', es: 'Limpiar con paño húmedo.', zh: '用湿布擦拭。' },
            story: { vi: 'Đèn mây tre phát sáng ấm, tạo không gian thiền.', en: 'Warm rattan lamp for zen atmosphere.', es: 'Luz cálida para ambiente zen.', zh: '温暖藤灯营造禅意空间。' },
            usage: { vi: 'Đèn ngủ, đèn trang trí.', en: 'Night lamp, decor.', es: 'Lámpara nocturna.', zh: '夜灯、装饰灯。' }
        }
    },
    {
        id: 44, name_vi: 'Khay Phục Vụ Mây Tròn', name_en: 'Round Rattan Serving Tray', name_es: 'Bandeja Redonda de Ratán', name_zh: '藤圆形托盘', artisan: 'Nguyễn San', price: 24000, rating: 4.7, sold: 420, badge: null, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: 'Ø38 × 4 cm', craftTime: '3-4 giờ',
            care: { vi: 'Lau khô sau khi dùng.', en: 'Wipe dry after use.', es: 'Secar después de usar.', zh: '使用后擦干。' },
            story: { vi: 'Khay mây tròn phục vụ trà, ăn nhẹ.', en: 'Round rattan tray for tea, snacks.', es: 'Bandeja para té, snacks.', zh: '藤托盘用于茶点。' },
            usage: { vi: 'Khay phục vụ bàn ăn.', en: 'Serving tray.', es: 'Bandeja de servir.', zh: '上菜托盘。' }
        }
    },
    {
        id: 45, name_vi: 'Giỏ Đựng Khăn Mây Tre', name_en: 'Rattan Towel Basket', name_es: 'Cesta de Toallas de Ratán', name_zh: '藤毛巾篮', artisan: 'Ngọc Bích', price: 31000, rating: 4.6, sold: 180, badge: null, image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '30 × 30 × 25 cm', craftTime: '5 giờ',
            care: { vi: 'Tránh ẩm liên tục.', en: 'Avoid constant moisture.', es: 'Evitar humedad constante.', zh: '避免持续潮湿。' },
            story: { vi: 'Giỏ khăn mây cho phòng tắm gọn gàng.', en: 'Rattan towel basket for tidy bathroom.', es: 'Cesta de toallas para baño.', zh: '藤毛巾篮让浴室整洁。' },
            usage: { vi: 'Đựng khăn tắm, đồ vệ sinh.', en: 'Hold towels, toiletries.', es: 'Para toallas.', zh: '放毛巾、洗漱用品。' }
        }
    },
    {
        id: 46, name_vi: 'Thú Nhồi Bông Mây Tre', name_en: 'Rattan Plush Toy', name_es: 'Peluche de Ratán', name_zh: '藤毛绒玩具', artisan: 'Cao Quyết', price: 19000, rating: 4.5, sold: 250, badge: null, image: IMAGES.product1, category: 'toys', materials: ['rattan'],
        guide: {
            dimensions: '12 × 8 × 10 cm', craftTime: '2 giờ',
            care: { vi: 'Giữ khô.', en: 'Keep dry.', es: 'Mantener seco.', zh: '保持干燥。' },
            story: { vi: 'Thú nhồi bông mây tre an toàn cho trẻ em.', en: 'Safe rattan plush toy for kids.', es: 'Peluche seguro para niños.', zh: '安全藤毛绒玩具。' },
            usage: { vi: 'Đồ chơi trẻ em.', en: "Children's toy.", es: 'Juguete infantil.', zh: '儿童玩具。' }
        }
    },
    {
        id: 47, name_vi: 'Khung Gương Mây Hoa', name_en: 'Rattan Flower Mirror', name_es: 'Espejo Flor de Ratán', name_zh: '藤花镜', artisan: 'Bùi Văn Tự', price: 44000, rating: 4.9, sold: 120, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-yellow-500 to-amber-500', image: IMAGES.product4, category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø40 × 3 cm', craftTime: '6-8 giờ',
            care: { vi: 'Lau kính bằng khăn mềm.', en: 'Clean glass with soft cloth.', es: 'Limpiar cristal.', zh: '用软布擦拭镜面。' },
            story: { vi: 'Gương hoa mây đan thủ công tinh xảo.', en: 'Handcrafted rattan flower mirror.', es: 'Espejo floral artesanal.', zh: '手工编织藤花镜。' },
            usage: { vi: 'Trang trí phòng ngủ, hành lang.', en: 'Bedroom, hallway decor.', es: 'Decoración de dormitorio.', zh: '卧室、走廊装饰。' }
        }
    },
    {
        id: 48, name_vi: 'Hộp Đựng Trà Mây', name_en: 'Rattan Tea Box', name_es: 'Caja de Té de Ratán', name_zh: '藤茶叶盒', artisan: 'Thu Mai', price: 29000, rating: 4.8, sold: 230, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-teal-500 to-green-500', image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '25 × 18 × 10 cm', craftTime: '4-5 giờ',
            care: { vi: 'Tránh ẩm.', en: 'Avoid moisture.', es: 'Evitar humedad.', zh: '避免潮湿。' },
            story: { vi: 'Hộp trà mây giữ hương trà tự nhiên.', en: 'Rattan tea box preserves tea aroma.', es: 'Caja de té de ratán.', zh: '藤茶叶盒保持茶香。' },
            usage: { vi: 'Đựng trà, quà tặng.', en: 'Hold tea, gifts.', es: 'Para té, regalos.', zh: '放茶叶、礼品。' }
        }
    },
    {
        id: 49, name_vi: 'Đồ Chơi Xếp Hình Tre', name_en: 'Bamboo Puzzle Toy', name_es: 'Rompecabezas de Bambú', name_zh: '竹拼图玩具', artisan: 'Đông Hương', price: 17000, rating: 4.6, sold: 340, badge: null, image: IMAGES.product1, category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '15 × 15 × 2 cm', craftTime: '2 giờ',
            care: { vi: 'Giữ khô.', en: 'Keep dry.', es: 'Mantener seco.', zh: '保持干燥。' },
            story: { vi: 'Xếp hình tre phát triển tư duy trẻ.', en: 'Bamboo puzzle develops children thinking.', es: 'Rompecabezas desarrolla pensamiento.', zh: '竹拼图发展儿童思维。' },
            usage: { vi: 'Đồ chơi giáo dục.', en: 'Educational toy.', es: 'Juguete educativo.', zh: '益智玩具。' }
        }
    },
    {
        id: 50, name_vi: 'Giỏ Giày Mây Phong Cách', name_en: 'Rattan Shoe Basket', name_es: 'Cesta de Zapatos de Ratán', name_zh: '藤鞋篮', artisan: 'Nguyễn San', price: 27000, rating: 4.5, sold: 160, badge: null, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80', category: 'home', materials: ['rattan'],
        guide: {
            dimensions: '35 × 25 × 20 cm', craftTime: '4 giờ',
            care: { vi: 'Phơi khô định kỳ.', en: 'Air dry periodically.', es: 'Secar periódicamente.', zh: '定期晾干。' },
            story: { vi: 'Giỏ giày mây gọn gàng phòng ra vào.', en: 'Rattan shoe basket for entryway.', es: 'Cesta de zapatos para entrada.', zh: '藤鞋篮让玄关整洁。' },
            usage: { vi: 'Đựng giày dép tại cửa.', en: 'Hold shoes at entry.', es: 'Para zapatos en entrada.', zh: '门口放鞋。' }
        }
    },
    {
        id: 51, name_vi: 'Đèn Thả Mây Tròn', name_en: 'Round Rattan Pendant', name_es: 'Lámpara Redonda de Ratán', name_zh: '藤圆形吊灯', artisan: 'Thu Mai', price: 39000, rating: 4.8, sold: 175, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-amber-500 to-orange-500', image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: 'Ø35 × 25 cm', craftTime: '6 giờ',
            care: { vi: 'Lau bụi bằng cọ mềm.', en: 'Dust with soft brush.', es: 'Limpiar con cepillo.', zh: '用软刷除尘。' },
            story: { vi: 'Đèn thả mây tròn tạo ánh sáng khuếch tán.', en: 'Diffused lighting from round pendant.', es: 'Luz difusa.', zh: '藤吊灯营造漫射光。' },
            usage: { vi: 'Trang trí phòng ăn, quán cafe.', en: 'Dining, cafe decor.', es: 'Decoración de comedor.', zh: '餐厅、咖啡馆装饰。' }
        }
    },
    {
        id: 52, name_vi: 'Kệ Sách Mini Tre Đan', name_en: 'Mini Bamboo Bookshelf', name_es: 'Estantería Mini de Bambú', name_zh: '迷你竹书架', artisan: 'Đông Hương', price: 45000, rating: 4.7, sold: 110, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-blue-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=400&q=80', category: 'office', materials: ['bamboo'],
        guide: {
            dimensions: '40 × 25 × 80 cm', craftTime: '8-10 giờ',
            care: { vi: 'Tránh quá tải.', en: 'Avoid overloading.', es: 'Evita sobrecargar.', zh: '避免超载。' },
            story: { vi: 'Kệ sách tre mini cho góc đọc sách.', en: 'Mini bamboo bookshelf for reading nook.', es: 'Estantería para rincón de lectura.', zh: '迷你竹书架。' },
            usage: { vi: 'Đựng sách, đồ trang trí.', en: 'Hold books, decor.', es: 'Para libros.', zh: '放书、装饰品。' }
        }
    },
    {
        id: 53, name_vi: 'Thảm Mây Treo Tường', name_en: 'Rattan Wall Tapestry', name_es: 'Tapiz de Pared de Ratán', name_zh: '藤挂毯', artisan: 'Bùi Văn Tự', price: 38000, rating: 4.8, sold: 85, badge: null, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: '60 × 90 × 3 cm', craftTime: '10-12 giờ',
            care: { vi: 'Lau bụi nhẹ.', en: 'Dust gently.', es: 'Quitar polvo suavemente.', zh: '轻轻除尘。' },
            story: { vi: 'Thảm mây treo tường nghệ thuật đan tay.', en: 'Handwoven rattan wall tapestry art.', es: 'Arte tejido a mano.', zh: '手工编织藤挂毯。' },
            usage: { vi: 'Trang trí tường phòng khách.', en: 'Living room wall art.', es: 'Arte de pared.', zh: '客厅墙面装饰。' }
        }
    },
    {
        id: 54, name_vi: 'Hộp Đựng Trang Sức Mây', name_en: 'Rattan Jewelry Box', name_es: 'Caja de Joyas de Ratán', name_zh: '藤首饰盒', artisan: 'Thu Mai', price: 25000, rating: 4.7, sold: 290, badge: null, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', category: 'decor', materials: ['rattan'],
        guide: {
            dimensions: '15 × 15 × 8 cm', craftTime: '3-4 giờ',
            care: { vi: 'Tránh nước.', en: 'Avoid water.', es: 'Evitar agua.', zh: '避免水。' },
            story: { vi: 'Hộp trang sức mây đan tinh xảo.', en: 'Delicate woven jewelry box.', es: 'Caja de joyas delicada.', zh: '精致藤首饰盒。' },
            usage: { vi: 'Đựng trang sức, đồ nhỏ.', en: 'Hold jewelry, small items.', es: 'Para joyas.', zh: '放首饰、小物。' }
        }
    },
    {
        id: 55, name_vi: 'Gió Đàn Tre Cho Trẻ', name_en: 'Bamboo Wind Chime', name_es: 'Carillón de Bambú', name_zh: '竹风铃', artisan: 'Cao Quyết', price: 20000, rating: 4.6, sold: 380, badge_vi: 'Yêu thích', badge_en: 'Favorite', badge_es: 'Favorito', badge_zh: '喜爱', badgeColor: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80', category: 'decor', materials: ['bamboo'],
        guide: {
            dimensions: 'Ø8 × 40 cm', craftTime: '2-3 giờ',
            care: { vi: 'Phơi khô sau mưa.', en: 'Dry after rain.', es: 'Secar tras lluvia.', zh: '雨后晾干。' },
            story: { vi: 'Gió đàn tre âm thanh tự nhiên, thư giãn.', en: 'Natural bamboo wind chime sounds.', es: 'Sonido natural de bambú.', zh: '竹风铃自然音色。' },
            usage: { vi: 'Treo ban công, cửa sổ.', en: 'Hang on balcony, window.', es: 'Colgar en balcón.', zh: '挂在阳台、窗边。' }
        }
    },
    {
        id: 56, name_vi: 'Rổ Trái Cây Tre Cao', name_en: 'Tall Bamboo Fruit Basket', name_es: 'Cesta Alta de Bambú', name_zh: '高竹水果篮', artisan: 'Ngọc Bích', price: 28000, rating: 4.7, sold: 340, badge: null, image: IMAGES.product2, category: 'home', materials: ['bamboo'],
        guide: {
            dimensions: 'Ø25 × 30 cm', craftTime: '4 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Rổ trái cây tre cao nhiều tầng.', en: 'Multi-tier bamboo fruit basket.', es: 'Cesta de bambú multi-nivel.', zh: '多层竹水果篮。' },
            usage: { vi: 'Đựng trái cây trên bàn.', en: 'Hold fruit on table.', es: 'Para frutas.', zh: '桌上放水果。' }
        }
    },
    {
        id: 57, name_vi: 'Khay Đựng Bút Mây', name_en: 'Rattan Pen Tray', name_es: 'Bandeja de Bolígrafos de Ratán', name_zh: '藤笔托盘', artisan: 'Đông Hương', price: 18000, rating: 4.5, sold: 410, badge: null, image: IMAGES.product3, category: 'office', materials: ['rattan'],
        guide: {
            dimensions: '20 × 8 × 3 cm', craftTime: '2 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Khay bút mây gọn gàng bàn làm việc.', en: 'Neat rattan pen tray for desk.', es: 'Bandeja para escritorio.', zh: '藤笔托盘让桌面整洁。' },
            usage: { vi: 'Đựng bút, kẹp ghim.', en: 'Hold pens, clips.', es: 'Para bolígrafos.', zh: '放笔、回形针。' }
        }
    },
    {
        id: 58, name_vi: 'Đồ Chơi Con Mèo Tre', name_en: 'Bamboo Cat Toy', name_es: 'Juguete Gato de Bambú', name_zh: '竹猫玩具', artisan: 'Đông Hương', price: 15000, rating: 4.4, sold: 280, badge: null, image: IMAGES.product4, category: 'toys', materials: ['bamboo'],
        guide: {
            dimensions: '8 × 6 × 5 cm', craftTime: '1.5 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Đồ chơi mèo tre an toàn, tự nhiên.', en: 'Natural safe bamboo cat toy.', es: 'Juguete natural para gatos.', zh: '安全天然竹猫玩具。' },
            usage: { vi: 'Đồ chơi cho mèo cảnh.', en: 'Toy for pet cats.', es: 'Juguete para gatos.', zh: '宠物猫玩具。' }
        }
    },
    {
        id: 59, name_vi: 'Bình Hoa Tre Đan Dáng Cao', name_en: 'Tall Bamboo Woven Vase', name_es: 'Jarrón Alto de Bambú', name_zh: '高竹编织花瓶', artisan: 'Bùi Văn Tự', price: 35000, rating: 4.8, sold: 95, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-purple-500 to-violet-600', image: IMAGES.product6, category: 'decor', materials: ['bamboo'],
        guide: {
            dimensions: 'Ø15 × 40 cm', craftTime: '6-8 giờ',
            care: { vi: 'Tránh nước bên trong.', en: 'Avoid water inside.', es: 'Evitar agua interior.', zh: '内部避免水。' },
            story: { vi: 'Bình hoa tre đan dáng cao thanh lịch.', en: 'Elegant tall bamboo woven vase.', es: 'Jarrón elegante de bambú.', zh: '优雅高竹编织花瓶。' },
            usage: { vi: 'Cắm hoa khô, hoa lụa.', en: 'Hold dried, silk flowers.', es: 'Para flores secas.', zh: '插干花、绢花。' }
        }
    },
    {
        id: 60, name_vi: 'Set 4 Đế Lót Ly Mây', name_en: 'Set of 4 Rattan Coasters', name_es: 'Set de 4 Posavasos de Ratán', name_zh: '藤杯垫4件套', artisan: 'Ngọc Bích', price: 22000, rating: 4.6, sold: 520, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-emerald-500 to-green-500', image: IMAGES.product3, category: 'office', materials: ['rattan'],
        guide: {
            dimensions: 'Ø10 × 0.5 cm (4 cái)', craftTime: '3 giờ',
            care: { vi: 'Lau khô sau khi dùng.', en: 'Wipe dry after use.', es: 'Secar después de usar.', zh: '使用后擦干。' },
            story: { vi: 'Set 4 đế ly mây đan đồng bộ, quà tặng tuyệt vời.', en: 'Matching set of 4 rattan coasters, great gift.', es: 'Set de 4 posavasos, gran regalo.', zh: '4件套藤杯垫，绝佳礼品。' },
            usage: { vi: 'Lót ly trà, cafe.', en: 'Under tea, coffee cups.', es: 'Bajo tazas.', zh: '垫茶杯、咖啡杯。' }
        }
    },

    // ===== CHARMS & KEYCHAINS (20) =====
    {
        id: 61, name_vi: 'Charm Cây Tre Mini', name_en: 'Mini Bamboo Charm', name_es: 'Charm de Bambú Mini', name_zh: '迷你竹幸运符', artisan: 'Đông Hương', price: 12000, rating: 4.8, sold: 640, badge_vi: 'Bán chạy', badge_en: 'Best seller', badge_es: 'Más vendido', badge_zh: '热销', badgeColor: 'from-emerald-500 to-green-500', image: IMAGES.product5, category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '3 × 1 × 0.5 cm', craftTime: '45 phút',
            care: { vi: 'Tránh nước, lau khô.', en: 'Avoid water, wipe dry.', es: 'Evita agua.', zh: '避免水。' },
            story: { vi: 'Charm cây tre biểu tượng sức sống mãnh liệt.', en: 'Bamboo charm symbolizes resilience.', es: 'Charm de bambú simboliza resiliencia.', zh: '竹幸运符象征坚韧。' },
            usage: { vi: 'Treo chìa khóa, điện thoại, balo.', en: 'Keychain, phone, bag charm.', es: 'Llavero, teléfono.', zh: '钥匙扣、手机挂件。' }
        }
    },
    {
        id: 62, name_vi: 'Móc Khóa Nón Lá Mây', name_en: 'Rattan Conical Hat Keychain', name_es: 'Llavero Sombrero de Ratán', name_zh: '藤斗笠钥匙扣', artisan: 'Thu Mai', price: 14000, rating: 4.9, sold: 520, badge_vi: 'Mới', badge_en: 'New', badge_es: 'Nuevo', badge_zh: '新品', badgeColor: 'from-blue-500 to-cyan-500', image: IMAGES.product4, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '4 × 4 × 2 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh va đập.', en: 'Avoid impact.', es: 'Evita golpes.', zh: '避免撞击。' },
            story: { vi: 'Nón lá mây thu nhỏ — biểu tượng văn hóa Việt.', en: 'Mini rattan conical hat — Vietnamese icon.', es: 'Sombrero mini de ratán.', zh: '迷你藤斗笠。' },
            usage: { vi: 'Móc khóa, quà lưu niệm.', en: 'Keychain, souvenir.', es: 'Llavero, recuerdo.', zh: '钥匙扣，纪念品。' }
        }
    },
    {
        id: 63, name_vi: 'Charm Hoa Sen Mây Tre', name_en: 'Lotus Bamboo Charm', name_es: 'Charm de Loto de Bambú', name_zh: '竹莲花幸运符', artisan: 'Bùi Văn Tự', price: 15000, rating: 4.9, sold: 410, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-pink-500 to-rose-500', image: IMAGES.product2, category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '3.5 × 3.5 × 1 cm', craftTime: '1 giờ',
            care: { vi: 'Giữ khô ráo.', en: 'Keep dry.', es: 'Mantén seco.', zh: '保持干燥。' },
            story: { vi: 'Hoa sen mây — sự thanh tịnh, thuần khiết.', en: 'Rattan lotus — purity and peace.', es: 'Loto de ratán — pureza.', zh: '藤莲花 — 纯洁。' },
            usage: { vi: 'Charm túi xách, quà tặng.', en: 'Bag charm, gift.', es: 'Adorno de bolso.', zh: '包饰，礼品。' }
        }
    },
    {
        id: 64, name_vi: 'Móc Khóa Trống Đồng Mây', name_en: 'Rattan Bronze Drum Keychain', name_es: 'Llavero Tambor de Ratán', name_zh: '藤铜鼓钥匙扣', artisan: 'Cao Quyết', price: 16000, rating: 4.7, sold: 280, badge: null, image: IMAGES.product3, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: 'Ø4 × 1 cm', craftTime: '1.5 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Trống đồng mây gợi nhớ văn hóa Đông Sơn.', en: 'Rattan drum recalls Dong Son culture.', es: 'Tambor de ratán, cultura Dong Son.', zh: '藤鼓呼应东山文化。' },
            usage: { vi: 'Móc khóa, trang trí.', en: 'Keychain, decor.', es: 'Llavero, decoración.', zh: '钥匙扣，装饰。' }
        }
    },
    {
        id: 65, name_vi: 'Charm Cá Chép Mây', name_en: 'Rattan Carp Charm', name_es: 'Charm de Carpa de Ratán', name_zh: '藤鲤鱼幸运符', artisan: 'Nguyễn San', price: 13000, rating: 4.6, sold: 350, badge: null, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '4 × 1.5 × 1 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh nước.', en: 'Avoid water.', es: 'Evita agua.', zh: '避免水。' },
            story: { vi: 'Cá chép mây biểu tượng may mắn, phát tài.', en: 'Rattan carp symbolizes luck, prosperity.', es: 'Carpa de ratán, suerte.', zh: '藤鲤鱼象征好运。' },
            usage: { vi: 'Charm, móc khóa.', en: 'Charm, keychain.', es: 'Charm, llavero.', zh: '幸运符，钥匙扣。' }
        }
    },
    {
        id: 66, name_vi: 'Móc Khóa Lá Tre Đan', name_en: 'Woven Bamboo Leaf Keychain', name_es: 'Llavero Hoja de Bambú', name_zh: '竹叶编织钥匙扣', artisan: 'Đông Hương', price: 10000, rating: 4.5, sold: 480, badge: null, image: IMAGES.product4, category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '5 × 2 × 0.5 cm', craftTime: '45 phút',
            care: { vi: 'Tránh gãy.', en: 'Avoid breaking.', es: 'Evita romper.', zh: '避免折断。' },
            story: { vi: 'Lá tre đan mảnh, tự nhiên.', en: 'Delicate woven bamboo leaf.', es: 'Hoja de bambú tejida.', zh: '精致竹叶编织。' },
            usage: { vi: 'Móc khóa, bookmark.', en: 'Keychain, bookmark.', es: 'Llavero, marcapáginas.', zh: '钥匙扣，书签。' }
        }
    },
    {
        id: 67, name_vi: 'Charm Gấu Trúc Mây', name_en: 'Rattan Panda Charm', name_es: 'Charm de Panda de Ratán', name_zh: '藤熊猫幸运符', artisan: 'Thu Mai', price: 17000, rating: 4.8, sold: 390, badge_vi: 'Đáng yêu', badge_en: 'Cute', badge_es: 'Lindo', badge_zh: '可爱', badgeColor: 'from-slate-400 to-slate-600', image: IMAGES.product1, category: 'charms', materials: ['rattan', 'bamboo'],
        guide: {
            dimensions: '3 × 3 × 1.5 cm', craftTime: '1.5 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Gấu trúc mây — món quà dễ thương cho mọi lứa tuổi.', en: 'Rattan panda — adorable for all ages.', es: 'Panda de ratán, adorable.', zh: '藤熊猫 — 老少皆宜。' },
            usage: { vi: 'Charm, quà tặng trẻ em.', en: 'Charm, kids gift.', es: 'Charm, regalo infantil.', zh: '幸运符，儿童礼品。' }
        }
    },
    {
        id: 68, name_vi: 'Móc Khóa Mèo May Mắn', name_en: 'Lucky Cat Keychain', name_es: 'Llavero Gato de la Suerte', name_zh: '幸运猫钥匙扣', artisan: 'Ngọc Bích', price: 14000, rating: 4.7, sold: 360, badge: null, image: IMAGES.product4, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '3 × 2.5 × 1 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh ẩm.', en: 'Avoid moisture.', es: 'Evita humedad.', zh: '避免潮湿。' },
            story: { vi: 'Mèo may mắn mây mang tài lộc.', en: 'Lucky rattan cat brings fortune.', es: 'Gato de la suerte de ratán.', zh: '藤幸运猫招财。' },
            usage: { vi: 'Móc khóa, treo xe.', en: 'Keychain, car charm.', es: 'Llavero, colgante de auto.', zh: '钥匙扣，车饰。' }
        }
    },
    {
        id: 69, name_vi: 'Charm Chữ Phúc Mây', name_en: 'Rattan "Phuc" Charm', name_es: 'Charm "Phuc" de Ratán', name_zh: '藤"福"字幸运符', artisan: 'Bùi Văn Tự', price: 18000, rating: 4.9, sold: 220, badge_vi: 'Cao cấp', badge_en: 'Premium', badge_es: 'Premium', badge_zh: '高级', badgeColor: 'from-red-500 to-rose-600', image: IMAGES.product5, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '3.5 × 3.5 × 0.5 cm', craftTime: '2 giờ',
            care: { vi: 'Tránh nước.', en: 'Avoid water.', es: 'Evita agua.', zh: '避免水。' },
            story: { vi: 'Chữ Phúc mây — phúc đức, bình an.', en: 'Rattan "Phuc" — blessing, peace.', es: '"Phuc" de ratán — bendición.', zh: '藤"福"字 — 福气。' },
            usage: { vi: 'Charm, quà Tết.', en: 'Charm, New Year gift.', es: 'Charm, regalo.', zh: '幸运符，新年礼品。' }
        }
    },
    {
        id: 70, name_vi: 'Móc Khóa Trái Tim Mây', name_en: 'Rattan Heart Keychain', name_es: 'Llavero Corazón de Ratán', name_zh: '藤心形钥匙扣', artisan: 'Đông Hương', price: 11000, rating: 4.6, sold: 540, badge: null, image: IMAGES.product2, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '3 × 3 × 1 cm', craftTime: '45 phút',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Trái tim mây — quà tặng lãng mạn.', en: 'Rattan heart — romantic gift.', es: 'Corazón de ratán, regalo romántico.', zh: '藤心 — 浪漫礼物。' },
            usage: { vi: 'Móc khóa, charm tình yêu.', en: 'Keychain, love charm.', es: 'Llavero, amor.', zh: '钥匙扣，爱情饰物。' }
        }
    },
    {
        id: 71, name_vi: 'Charm Ngôi Sao Tre', name_en: 'Bamboo Star Charm', name_es: 'Charm Estrella de Bambú', name_zh: '竹星幸运符', artisan: 'Cao Quyết', price: 10000, rating: 4.5, sold: 300, badge: null, image: IMAGES.product4, category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '2.5 × 2.5 × 0.5 cm', craftTime: '30 phút',
            care: { vi: 'Tránh gãy cạnh.', en: 'Avoid breaking edges.', es: 'Evita romper bordes.', zh: '避免折边。' },
            story: { vi: 'Ngôi sao tre — ước mơ, hy vọng.', en: 'Bamboo star — dreams, hope.', es: 'Estrella de bambú — esperanza.', zh: '竹星 — 梦想希望。' },
            usage: { vi: 'Charm, trang trí.', en: 'Charm, decor.', es: 'Charm, decoración.', zh: '幸运符，装饰。' }
        }
    },
    {
        id: 72, name_vi: 'Móc Khóa Hình Việt Nam Mây', name_en: 'Vietnam Map Rattan Keychain', name_es: 'Llavero Mapa Vietnam de Ratán', name_zh: '藤越南地图钥匙扣', artisan: 'Nguyễn San', price: 20000, rating: 4.9, sold: 180, badge_vi: 'Độc đáo', badge_en: 'Unique', badge_es: 'Único', badge_zh: '独特', badgeColor: 'from-red-500 to-amber-500', image: IMAGES.product3, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '5 × 3 × 0.5 cm', craftTime: '2.5 giờ',
            care: { vi: 'Tránh nước, giữ khô.', en: 'Avoid water, keep dry.', es: 'Evita agua.', zh: '避免水。' },
            story: { vi: 'Bản đồ Việt Nam mây — niềm tự hào quê hương.', en: 'Rattan Vietnam map — homeland pride.', es: 'Mapa de Vietnam de ratán.', zh: '藤越南地图 — 家国情怀。' },
            usage: { vi: 'Móc khóa, quà đối ngoại.', en: 'Keychain, diplomatic gift.', es: 'Llavero, regalo.', zh: '钥匙扣，外事礼品。' }
        }
    },
    {
        id: 73, name_vi: 'Móc Khóa Tên Khắc Theo Yêu Cầu', name_en: 'Custom Name Keychain', name_es: 'Llavero Nombre Personalizado', name_zh: '定制名字钥匙扣', artisan: 'Bùi Văn Tự', price: 25000, rating: 5.0, sold: 150, badge_vi: 'Độc quyền', badge_en: 'Custom', badge_es: 'Personalizado', badge_zh: '定制', badgeColor: 'from-violet-500 to-purple-600', image: IMAGES.product5, category: 'charms', materials: ['bamboo', 'rattan'],
        guide: {
            dimensions: 'Tùy chỉnh', craftTime: '3-4 giờ',
            care: { vi: 'Tránh nước.', en: 'Avoid water.', es: 'Evita agua.', zh: '避免水。' },
            story: { vi: 'Khắc tên theo yêu cầu — món quà mang dấu ấn cá nhân.', en: 'Custom engraved name — personal gift.', es: 'Nombre grabado, regalo personal.', zh: '刻字定制 — 专属礼物。' },
            usage: { vi: 'Quà tặng cá nhân, kỷ niệm.', en: 'Personal, memorial gift.', es: 'Regalo personal.', zh: '个人礼品，纪念。' }
        }
    },
    {
        id: 74, name_vi: 'Charm Cung Hoàng Đạo Mây', name_en: 'Zodiac Rattan Charm', name_es: 'Charm Zodiac de Ratán', name_zh: '藤星座幸运符', artisan: 'Thu Mai', price: 16000, rating: 4.7, sold: 260, badge_vi: 'Phong cách', badge_en: 'Trendy', badge_es: 'Tendencia', badge_zh: '潮流', badgeColor: 'from-indigo-500 to-blue-600', image: IMAGES.product4, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: 'Ø3 × 0.5 cm', craftTime: '1.5 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Charm 12 cung hoàng đạo mây — cá tính riêng.', en: 'Rattan zodiac charm — personal style.', es: 'Charm zodiac de ratán.', zh: '藤星座幸运符。' },
            usage: { vi: 'Charm, quà sinh nhật.', en: 'Charm, birthday gift.', es: 'Charm, regalo.', zh: '幸运符，生日礼。' }
        }
    },
    {
        id: 75, name_vi: 'Móc Khóa Động Vật Mây (Bộ 6)', name_en: 'Animal Rattan Keychain Set (6)', name_es: 'Set Llavero Animales (6)', name_zh: '藤动物钥匙扣套装(6)', artisan: 'Đông Hương', price: 55000, rating: 4.9, sold: 120, badge_vi: 'Bộ tiết kiệm', badge_en: 'Set deal', badge_es: 'Set', badge_zh: '套装', badgeColor: 'from-teal-500 to-green-500', image: IMAGES.product1, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '6 × 3 cm mỗi cái', craftTime: '6 giờ',
            care: { vi: 'Giữ khô.', en: 'Keep dry.', es: 'Mantén seco.', zh: '保持干燥。' },
            story: { vi: 'Bộ 6 động vật mây — gà, vịt, cá, voi, trâu, chó.', en: 'Set of 6 animals: chicken, duck, fish, elephant, buffalo, dog.', es: 'Set de 6 animales.', zh: '6件动物套装。' },
            usage: { vi: 'Quà tặng, sưu tầm.', en: 'Gift, collectible.', es: 'Regalo, colección.', zh: '礼品，收藏。' }
        }
    },
    {
        id: 76, name_vi: 'Mini Giỏ Mây Móc Khóa', name_en: 'Mini Rattan Basket Keychain', name_es: 'Mini Cesta Llavero', name_zh: '迷你藤篮钥匙扣', artisan: 'Ngọc Bích', price: 13000, rating: 4.6, sold: 310, badge: null, image: IMAGES.product2, category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: '3 × 2.5 × 2 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh đè nặng.', en: 'Avoid heavy pressure.', es: 'Evita presión.', zh: '避免重压。' },
            story: { vi: 'Mini giỏ mây đan tinh xảo, có quai xách.', en: 'Mini woven basket with handle.', es: 'Mini cesta de ratán.', zh: '迷你藤编篮。' },
            usage: { vi: 'Móc khóa, đựng đồ nhỏ.', en: 'Keychain, hold tiny items.', es: 'Llavero, objetos.', zh: '钥匙扣，装小物。' }
        }
    },
    {
        id: 77, name_vi: 'Móc Khóa Mini Xe Đạp Tre', name_en: 'Mini Bamboo Bike Keychain', name_es: 'Llavero Bici Mini de Bambú', name_zh: '迷你竹自行车钥匙扣', artisan: 'Cao Quyết', price: 15000, rating: 4.7, sold: 270, badge: null, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80', category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '4 × 2 × 1 cm', craftTime: '1.5 giờ',
            care: { vi: 'Tránh bẻ nan.', en: 'Avoid bending slats.', es: 'Evita doblar.', zh: '避免弯折。' },
            story: { vi: 'Mini xe đạp tre gợi nhớ quê hương.', en: 'Mini bamboo bike evokes homeland.', es: 'Mini bici de bambú.', zh: '迷你竹自行车。' },
            usage: { vi: 'Móc khóa, trang trí.', en: 'Keychain, decor.', es: 'Llavero, decoración.', zh: '钥匙扣，装饰。' }
        }
    },
    {
        id: 78, name_vi: 'Móc Khóa Nhà Cổ Mây', name_en: 'Rattan Ancient House Keychain', name_es: 'Llavero Casa Antigua de Ratán', name_zh: '藤古屋钥匙扣', artisan: 'Bùi Văn Tự', price: 19000, rating: 4.8, sold: 200, badge: null, image: IMAGES.product6, category: 'charms', materials: ['rattan', 'bamboo'],
        guide: {
            dimensions: '4 × 3 × 1.5 cm', craftTime: '2 giờ',
            care: { vi: 'Lau khô.', en: 'Wipe dry.', es: 'Secar.', zh: '擦干。' },
            story: { vi: 'Nhà cổ mây tái hiện kiến trúc làng quê Bắc Bộ.', en: 'Rattan ancient house recreates Northern village architecture.', es: 'Casa antigua de ratán.', zh: '藤古屋重现北越建筑。' },
            usage: { vi: 'Móc khóa, quà lưu niệm.', en: 'Keychain, souvenir.', es: 'Llavero, recuerdo.', zh: '钥匙扣，纪念。' }
        }
    },
    {
        id: 79, name_vi: 'Móc Khóa Đèn Lồng Mini Mây', name_en: 'Mini Rattan Lantern Keychain', name_es: 'Llavero Linterna Mini de Ratán', name_zh: '迷你藤灯笼钥匙扣', artisan: 'Thu Mai', price: 14000, rating: 4.6, sold: 340, badge: null, image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=400&q=80', category: 'charms', materials: ['rattan'],
        guide: {
            dimensions: 'Ø3 × 4 cm', craftTime: '1.5 giờ',
            care: { vi: 'Tránh lửa.', en: 'Avoid flame.', es: 'Evita fuego.', zh: '避免火。' },
            story: { vi: 'Đèn lồng mini mây — không khí lễ hội.', en: 'Mini rattan lantern — festive vibe.', es: 'Linterna mini de ratán.', zh: '迷你藤灯笼。' },
            usage: { vi: 'Móc khóa, trang trí Tết.', en: 'Keychain, Tet decor.', es: 'Llavero, decoración.', zh: '钥匙扣，新年装饰。' }
        }
    },
    {
        id: 80, name_vi: 'Móc Khóa Mini Bình Hoa Tre', name_en: 'Mini Bamboo Vase Keychain', name_es: 'Llavero Jarrón Mini de Bambú', name_zh: '迷你竹花瓶钥匙扣', artisan: 'Đông Hương', price: 12000, rating: 4.5, sold: 290, badge: null, image: IMAGES.product6, category: 'charms', materials: ['bamboo'],
        guide: {
            dimensions: '3 × 1.5 × 1 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh nước trong bình.', en: 'Avoid water inside.', es: 'Evita agua interior.', zh: '内部避免水。' },
            story: { vi: 'Mini bình hoa tre — thanh lịch, nhỏ gọn.', en: 'Mini bamboo vase — elegant, compact.', es: 'Mini jarrón de bambú.', zh: '迷你竹花瓶。' },
            usage: { vi: 'Móc khóa, cắm hoa khô mini.', en: 'Keychain, hold dried flowers.', es: 'Llavero, flores secas.', zh: '钥匙扣，插干花。' }
        }
    },
];