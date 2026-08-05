import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Scissors, Wrench, Grid3x3, BookOpen, Video, Lightbulb, ChevronDown, Clock, Star, Package } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const DATA = {
    vi: {
        title: 'Hướng Dẫn Chế Tác Mây Tre Đan',
        desc: 'Học nghề đan lát Phú Vinh từ cơ bản đến nâng cao — từng bước chi tiết',
        sections: {
            materials: { title: 'Nguyên Liệu', desc: 'Các loại nguyên liệu chính trong đan lát Phú Vinh' },
            tools: { title: 'Công Cụ', desc: 'Dụng cụ cần thiết cho người đan' },
            techniques: { title: 'Kỹ Thuật Đan', desc: 'Các kiểu đan phổ biến' },
            projects: { title: 'Dự Án Thực Hành', desc: 'Thực hành từ dễ đến khó' },
            videos: { title: 'Video Hướng Dẫn', desc: 'Học qua video từ nghệ nhân' },
            tips: { title: 'Mẹo & Bí Quyết', desc: 'Kinh nghiệm từ nghề nghiệp' },
        },
        materials: [
            { name: 'Mây', emoji: '🌿', desc: 'Sợi dẻo dai, dễ uốn cong. Dùng cho đan nong, đan chi tiết tinh xảo. Mây rừng Hà Tây là loại tốt nhất.', color: 'from-green-500 to-emerald-600' },
            { name: 'Tre', emoji: '🎋', desc: 'Cứng và chắc, dùng cho nan đan, khung sườn. Tre luồng Phù Vinh nổi tiếng dẻo và bền.', color: 'from-amber-500 to-yellow-600' },
            { name: 'Nứa', emoji: '🫚', desc: 'Dẻo trung bình, dai hơn tre. Dùng cho đan chi tiết, nọng vành.', color: 'from-stone-500 to-amber-600' },
            { name: 'Giang', emoji: '🌾', desc: 'Mềm và dễ uốn, dùng cho đan nền, đan kín. Thường phơi khô trước khi dùng.', color: 'from-lime-500 to-green-600' },
            { name: 'Song', emoji: '🪴', desc: 'Dẻo dai, dai hơn mây. Dùng cho đan tinh xảo, sản phẩm cao cấp.', color: 'from-teal-500 to-cyan-600' },
        ],
        tools: [
            { name: 'Dao splitting', emoji: '🔪', desc: 'Dao mỏng lưỡi cong, dùng chẻ tre mây thành nan' },
            { name: 'Kéo lớn', emoji: '✂️', desc: 'Cắt nan, tỉa biên sản phẩm' },
            { name: 'Kẹp gỗ', emoji: '🗜️', desc: 'Kẹp cố định nan khi đan, giữ tension' },
            { name: 'Chậu nước', emoji: '🪣', desc: 'Ngâm mây tre cho mềm trước khi đan' },
            { name: 'Thước gỗ', emoji: '📏', desc: 'Đo kích thước nan, đảm bảo đều nhau' },
            { name: 'Cọ sơn', emoji: '🖌️', desc: 'Phủ sơn mài hoặc sơn bảo vệ' },
        ],
        techniques: [
            { name: 'Đan xương cá', emoji: '🐟', desc: 'Nan đan chéo nhau tạo hình xương cá, đẹp và chắc', difficulty: 'Trung bình' },
            { name: 'Đan mắt cáo', emoji: '🔶', desc: 'Tạo lỗ hổng hình thoi, trang trí và thông thoáng', difficulty: 'Khó' },
            { name: 'Đan nong', emoji: '⭕', desc: 'Đan vòng tròn đồng tâm, nền tảng cơ bản', difficulty: 'Dễ' },
            { name: 'Đan nan', emoji: '➡️', desc: 'Nan song song, đơn giản nhất cho người mới', difficulty: 'Dễ' },
            { name: 'Đan giỏ', emoji: '🧺', desc: 'Kết hợp nong và nan, tạo hình giỏ đựng', difficulty: 'Trung bình' },
            { name: 'Đan tượng', emoji: '🐘', desc: 'Đan 3D tạo hình động vật, cao cấp nhất', difficulty: 'Rất khó' },
        ],
        projects: [
            {
                level: 'Cơ Bản', color: 'from-green-500 to-emerald-600', emoji: '🟢',
                name: 'Đế Lót Ly Mây', time: '2 giờ', materials: '0.2kg mây, 10 nan tre',
                steps: [
                    { t: 'Chuẩn bị nguyên liệu', d: 'Ngâm mây trong nước 30 phút cho mềm. Chẻ tre thành nan rộng 5mm.' },
                    { t: 'Tạo nền', d: 'Đan nan tre song song cách nhau 1cm. Dùng mây đan ngang qua các nan.' },
                    { t: 'Đan nong', d: 'Bắt đầu từ tâm, đan vòng tròn đồng tâm outward đến kích thước mong muốn.' },
                    { t: 'Tỉa và hoàn thiện', d: 'Cắt dư nan, vuốt nhẹ bề mặt. Phủ lớp sơn mỏng bảo vệ.' },
                ],
            },
            {
                level: 'Trung Cấp', color: 'from-amber-500 to-orange-600', emoji: '🟡',
                name: 'Giỏ Đựng Đồ Nhỏ', time: '5 giờ', materials: '0.5kg mây, 20 nan tre, 1 vành sắt',
                steps: [
                    { t: 'Làm đáy', d: 'Đan nong hình tròn đường kính 15cm làm đáy giỏ.' },
                    { t: 'Đan vách', d: 'Uốn nan lên vuông góc với đáy. Đan xương cá lên cao 12cm.' },
                    { t: 'Gắn vành', d: 'Uốn vành sắt thành vòng, bọc mây quanh vành. Gắn vành vào miệng giỏ.' },
                    { t: 'Làm quai', d: 'Tết 3 sợi mây thành dây, gắn 2 đầu vào miệng giỏ.' },
                    { t: 'Hoàn thiện', d: 'Tỉa dư, chà nhám nhẹ, phủ sơn bảo vệ. Để khô 2 giờ.' },
                ],
            },
            {
                level: 'Nâng Cao', color: 'from-rose-500 to-pink-600', emoji: '🔴',
                name: 'Chú Voi Mây Tre', time: '15 giờ', materials: '1.2kg mây, 30 nan tre, 0.3kg song',
                steps: [
                    { t: 'Khung sườn', d: 'Uốn tre thành khung hình voi: thân, 4 chân, đầu, tai, vòi. Buộc cố định bằng mây.' },
                    { t: 'Đan thân', d: 'Đan mây quanh khung thân theo kỹ thuật đan nong, từ bụng lên lưng.' },
                    { t: 'Đan chân', d: 'Đan từng chân riêng, bắt đầu từ bàn chân lên đến bụng. Chân phải chắc để chịu重量.' },
                    { t: 'Đan đầu và vòi', d: 'Đan đầu hình oval, vòi uốn cong. Dùng song đan chi tiết mắt, tai.' },
                    { t: 'Làm đuôi và tai', d: 'Tết mây thành dây làm đuôi. Đan tai hình lá, gắn 2 bên đầu.' },
                    { t: 'Hoàn thiện', d: 'Tỉa toàn bộ dư, chà nhám, phủ sơn mài. Vẽ mắt đen. Để khô 24 giờ.' },
                ],
            },
        ],
        videos: [
            { id: 'MW-88Rn9A_0', title: 'Hướng dẫn đan mây tre cơ bản cho người mới bắt đầu' },
            { id: 'FBmeBeAIFLQ', title: 'Một thế kỷ một tinh hoa - Kỹ thuật đan Phú Vinh' },
            { id: 'svgxjHARil8', title: 'Giữ lửa nghề mây tre đan - Hướng dẫn chi tiết' },
            { id: '_ciSTNrNJlw', title: 'Hành trình học đan tại làng Phú Vinh' },
        ],
        tips: [
            { emoji: '💧', t: 'Ngâm mây tre', d: 'Luôn ngâm nguyên liệu 30-60 phút trước khi đan để sợi mềm, dễ uốn, không gãy.' },
            { emoji: '🔪', t: 'Chẻ nan đều', d: 'Nan càng đều, sản phẩm càng đẹp. Dùng thước đo và dao mỏng lưỡi cong.' },
            { emoji: '💪', t: 'Tension vừa phải', d: 'Kéo nan vừa chặt, không quá lỏng (sản phẩm lỏng lẻo) cũng không quá chặt (nan gãy).' },
            { emoji: '☀️', t: 'Phơi khô tự nhiên', d: 'Sau khi đan, phơi sản phẩm trong bóng râm 2-3 ngày. Tránh nắng trực tiếp.' },
            { emoji: '🎨', t: 'Sơn bảo vệ', d: 'Phủ lớp sơn mỏng hoặc dầu thực vật để bảo vệ và tăng độ bền.' },
            { emoji: '🧹', t: 'Vệ sinh nhẹ nhàng', d: 'Lau bụi bằng khăn khô, không ngâm nước. Bảo quản nơi khô ráo.' },
        ],
    },
    en: {
        title: 'Bamboo & Rattan Crafting Tutorial',
        desc: 'Learn Phú Vinh weaving from beginner to advanced — detailed step-by-step',
        sections: {
            materials: { title: 'Materials', desc: 'Main materials used in Phú Vinh weaving' },
            tools: { title: 'Tools', desc: 'Essential tools for weavers' },
            techniques: { title: 'Weaving Techniques', desc: 'Common weaving patterns' },
            projects: { title: 'Practice Projects', desc: 'Hands-on from easy to hard' },
            videos: { title: 'Video Tutorials', desc: 'Learn from artisan videos' },
            tips: { title: 'Tips & Tricks', desc: 'Professional experience' },
        },
        materials: [
            { name: 'Rattan', emoji: '🌿', desc: 'Flexible, easy to bend. Used for ring weaving and fine details. Hà Tây forest rattan is the best.', color: 'from-green-500 to-emerald-600' },
            { name: 'Bamboo', emoji: '🎋', desc: 'Hard and sturdy, used for slats and frames. Phú Vinh bamboo is known for flexibility and durability.', color: 'from-amber-500 to-yellow-600' },
            { name: 'Cane', emoji: '🫚', desc: 'Medium flexibility, tougher than bamboo. Used for details and rim cores.', color: 'from-stone-500 to-amber-600' },
            { name: 'Reed', emoji: '🌾', desc: 'Soft and pliable, used for base weaving. Usually sun-dried before use.', color: 'from-lime-500 to-green-600' },
            { name: 'Calamus', emoji: '🪴', desc: 'Tough and durable, more resilient than rattan. Used for fine, premium products.', color: 'from-teal-500 to-cyan-600' },
        ],
        tools: [
            { name: 'Splitting knife', emoji: '🔪', desc: 'Thin curved blade for splitting bamboo into slats' },
            { name: 'Large scissors', emoji: '✂️', desc: 'Cut slats, trim product edges' },
            { name: 'Wooden clamps', emoji: '🗜️', desc: 'Hold slats in place while weaving, maintain tension' },
            { name: 'Water basin', emoji: '🪣', desc: 'Soak rattan/bamboo to soften before weaving' },
            { name: 'Wooden ruler', emoji: '📏', desc: 'Measure slat width for consistency' },
            { name: 'Paint brush', emoji: '🖌️', desc: 'Apply lacquer or protective finish' },
        ],
        techniques: [
            { name: 'Herringbone', emoji: '🐟', desc: 'Slats woven diagonally creating fishbone pattern, beautiful and sturdy', difficulty: 'Medium' },
            { name: 'Openwork', emoji: '🔶', desc: 'Creates diamond-shaped gaps, decorative and airy', difficulty: 'Hard' },
            { name: 'Ring weave', emoji: '⭕', desc: 'Concentric circles, the fundamental basic technique', difficulty: 'Easy' },
            { name: 'Slats', emoji: '➡️', desc: 'Parallel slats, simplest for beginners', difficulty: 'Easy' },
            { name: 'Basket weave', emoji: '🧺', desc: 'Combines rings and slats to form baskets', difficulty: 'Medium' },
            { name: 'Sculpture', emoji: '🐘', desc: '3D weaving for animal figures, the most advanced', difficulty: 'Very hard' },
        ],
        projects: [
            {
                level: 'Beginner', color: 'from-green-500 to-emerald-600', emoji: '🟢',
                name: 'Rattan Coaster', time: '2 hours', materials: '0.2kg rattan, 10 bamboo slats',
                steps: [
                    { t: 'Prepare materials', d: 'Soak rattan in water for 30 minutes to soften. Split bamboo into 5mm slats.' },
                    { t: 'Create base', d: 'Weave bamboo slats parallel, 1cm apart. Weave rattan across them.' },
                    { t: 'Ring weave', d: 'Start from center, weave concentric circles outward to desired size.' },
                    { t: 'Trim and finish', d: 'Cut excess slats, smooth the surface. Apply thin protective coat.' },
                ],
            },
            {
                level: 'Intermediate', color: 'from-amber-500 to-orange-600', emoji: '🟡',
                name: 'Small Storage Basket', time: '5 hours', materials: '0.5kg rattan, 20 bamboo slats, 1 wire rim',
                steps: [
                    { t: 'Make the base', d: 'Ring weave a 15cm diameter circle for the basket bottom.' },
                    { t: 'Weave walls', d: 'Bend slats perpendicular to base. Herringbone weave up 12cm.' },
                    { t: 'Attach rim', d: 'Bend wire into a ring, wrap with rattan. Attach to basket mouth.' },
                    { t: 'Make handle', d: 'Braid 3 rattan strands into a rope, attach to basket mouth.' },
                    { t: 'Finish', d: 'Trim excess, light sanding, apply protective finish. Dry 2 hours.' },
                ],
            },
            {
                level: 'Advanced', color: 'from-rose-500 to-pink-600', emoji: '🔴',
                name: 'Bamboo Elephant', time: '15 hours', materials: '1.2kg rattan, 30 bamboo slats, 0.3kg calamus',
                steps: [
                    { t: 'Frame skeleton', d: 'Bend bamboo into elephant frame: body, 4 legs, head, ears, trunk. Tie with rattan.' },
                    { t: 'Weave body', d: 'Ring weave rattan around body frame, from belly to back.' },
                    { t: 'Weave legs', d: 'Weave each leg separately, from foot to belly. Legs must be sturdy to bear weight.' },
                    { t: 'Weave head and trunk', d: 'Weave oval head, curved trunk. Use calamus for eyes and ears detail.' },
                    { t: 'Make tail and ears', d: 'Braid rattan for tail. Weave leaf-shaped ears, attach to head sides.' },
                    { t: 'Finish', d: 'Trim all excess, sand, apply lacquer. Paint eyes black. Dry 24 hours.' },
                ],
            },
        ],
        videos: [
            { id: 'MW-88Rn9A_0', title: 'Basic bamboo rattan weaving tutorial for beginners' },
            { id: 'FBmeBeAIFLQ', title: 'A Century of Excellence - Phú Vinh Techniques' },
            { id: 'svgxjHARil8', title: 'Keeping the Craft Alive - Detailed Tutorial' },
            { id: '_ciSTNrNJlw', title: 'Journey of Learning at Phú Vinh Village' },
        ],
        tips: [
            { emoji: '💧', t: 'Soak materials', d: 'Always soak materials 30-60 minutes before weaving to make fibers soft, pliable, and break-resistant.' },
            { emoji: '🔪', t: 'Even slats', d: 'The more even the slats, the more beautiful the product. Use a ruler and thin curved knife.' },
            { emoji: '💪', t: 'Proper tension', d: 'Pull slats snugly — not too loose (flimsy product) nor too tight (broken slats).' },
            { emoji: '☀️', t: 'Natural drying', d: 'After weaving, dry in shade for 2-3 days. Avoid direct sunlight.' },
            { emoji: '🎨', t: 'Protective finish', d: 'Apply thin coat of lacquer or plant oil to protect and increase durability.' },
            { emoji: '🧹', t: 'Gentle cleaning', d: 'Dust with a dry cloth, do not soak in water. Store in a dry place.' },
        ],
    },
    es: {
        title: 'Tutorial de Elaboración de Bambú y Ratán',
        desc: 'Aprende el tejido de Phú Vinh de principiante a avanzado — paso a paso',
        sections: {
            materials: { title: 'Materiales', desc: 'Materiales principales en el tejido de Phú Vinh' },
            tools: { title: 'Herramientas', desc: 'Herramientas esenciales para tejedores' },
            techniques: { title: 'Técnicas de Tejido', desc: 'Patrones de tejido comunes' },
            projects: { title: 'Proyectos Prácticos', desc: 'Práctica de fácil a difícil' },
            videos: { title: 'Video Tutoriales', desc: 'Aprende con videos de artesanos' },
            tips: { title: 'Consejos y Trucos', desc: 'Experiencia profesional' },
        },
        materials: [
            { name: 'Ratán', emoji: '🌿', desc: 'Flexible, fácil de doblar. Para tejido de anillo y detalles finos.', color: 'from-green-500 to-emerald-600' },
            { name: 'Bambú', emoji: '🎋', desc: 'Duro y resistente, para listones y marcos. Bambú de Phú Vinh es flexible y duradero.', color: 'from-amber-500 to-yellow-600' },
            { name: 'Caña', emoji: '🫚', desc: 'Flexibilidad media, más resistente que el bambú. Para detalles y bordes.', color: 'from-stone-500 to-amber-600' },
            { name: 'Junco', emoji: '🌾', desc: 'Suave y maleable, para tejido de base. Secado al sol antes de usar.', color: 'from-lime-500 to-green-600' },
            { name: 'Calamo', emoji: '🪴', desc: 'Resistente y duradero. Para productos finos y premium.', color: 'from-teal-500 to-cyan-600' },
        ],
        tools: [
            { name: 'Cuchillo de partir', emoji: '🔪', desc: 'Hoja curva fina para partir bambú en listones' },
            { name: 'Tijeras grandes', emoji: '✂️', desc: 'Cortar listones, recortar bordes' },
            { name: 'Abrazaderas de madera', emoji: '🗜️', desc: 'Sostener listones al tejer, mantener tensión' },
            { name: 'Cuenco de agua', emoji: '🪣', desc: 'Remojar ratán/bambú para ablandar' },
            { name: 'Regla de madera', emoji: '📏', desc: 'Medir ancho de listones' },
            { name: 'Pincel', emoji: '🖌️', desc: 'Aplicar laca o acabado protector' },
        ],
        techniques: [
            { name: 'Espina de pescado', emoji: '🐟', desc: 'Listones diagonales creando patrón de espina, hermoso y resistente', difficulty: 'Medio' },
            { name: 'Calado', emoji: '🔶', desc: 'Crea huecos en forma de diamante, decorativo y ventilado', difficulty: 'Difícil' },
            { name: 'Anillo', emoji: '⭕', desc: 'Círculos concéntricos, técnica básica fundamental', difficulty: 'Fácil' },
            { name: 'Listones', emoji: '➡️', desc: 'Listones paralelos, lo más simple para principiantes', difficulty: 'Fácil' },
            { name: 'Cesta', emoji: '🧺', desc: 'Combina anillos y listones para formar cestas', difficulty: 'Medio' },
            { name: 'Escultura', emoji: '🐘', desc: 'Tejido 3D para figuras de animales, lo más avanzado', difficulty: 'Muy difícil' },
        ],
        projects: [
            {
                level: 'Principiante', color: 'from-green-500 to-emerald-600', emoji: '🟢',
                name: 'Posavasos de Ratán', time: '2 horas', materials: '0.2kg ratán, 10 listones de bambú',
                steps: [
                    { t: 'Preparar materiales', d: 'Remoja ratán en agua 30 minutos. Parte bambú en listones de 5mm.' },
                    { t: 'Crear base', d: 'Teje listones paralelos a 1cm. Teje ratán a través.' },
                    { t: 'Tejido de anillo', d: 'Comienza del centro, teje círculos concéntricos hacia afuera.' },
                    { t: 'Recortar y acabar', d: 'Corta exceso, alisa superficie. Aplica capa protectora fina.' },
                ],
            },
            {
                level: 'Intermedio', color: 'from-amber-500 to-orange-600', emoji: '🟡',
                name: 'Cesta Pequeña', time: '5 horas', materials: '0.5kg ratán, 20 listones bambú, 1 aro de alambre',
                steps: [
                    { t: 'Hacer la base', d: 'Teje un círculo de 15cm de diámetro para la base.' },
                    { t: 'Tejer paredes', d: 'Dobla listones perpendicular. Teje espina de pescado 12cm hacia arriba.' },
                    { t: 'Adjuntar borde', d: 'Dobla alambre en círculo, envuelve con ratán. Pega a la boca.' },
                    { t: 'Hacer asa', d: 'Trenza 3 ratanes, sujeta a la boca de la cesta.' },
                    { t: 'Acabar', d: 'Recorta, lija, aplica acabado. Seca 2 horas.' },
                ],
            },
            {
                level: 'Avanzado', color: 'from-rose-500 to-pink-600', emoji: '🔴',
                name: 'Elefante de Bambú', time: '15 horas', materials: '1.2kg ratán, 30 listones bambú, 0.3kg calamo',
                steps: [
                    { t: 'Esqueleto', d: 'Dobla bambú en marco de elefante: cuerpo, 4 patas, cabeza, orejas, trompa. Ata con ratán.' },
                    { t: 'Tejer cuerpo', d: 'Teje ratán alrededor del marco, de vientre a lomo.' },
                    { t: 'Tejer patas', d: 'Teje cada pata, del pie al vientre. Deben ser resistentes.' },
                    { t: 'Cabeza y trompa', d: 'Teje cabeza oval, trompa curva. Usa calamo para ojos y orejas.' },
                    { t: 'Cola y orejas', d: 'Trenza ratán para cola. Teje orejas en forma de hoja.' },
                    { t: 'Acabar', d: 'Recorta, lija, aplica laca. Pinta ojos negros. Seca 24 horas.' },
                ],
            },
        ],
        videos: [
            { id: 'MW-88Rn9A_0', title: 'Tutorial básico de tejido de bambú para principiantes' },
            { id: 'FBmeBeAIFLQ', title: 'Un siglo de excelencia - Técnicas de Phú Vinh' },
            { id: 'svgxjHARil8', title: 'Mantener vivo el oficio - Tutorial detallado' },
            { id: '_ciSTNrNJlw', title: 'Viaje de aprendizaje en el pueblo de Phú Vinh' },
        ],
        tips: [
            { emoji: '💧', t: 'Remojar materiales', d: 'Remoja 30-60 minutos antes de tejer para ablandar fibras y evitar roturas.' },
            { emoji: '🔪', t: 'Listones uniformes', d: 'Cuanto más uniformes los listones, más hermoso el producto. Usa regla y cuchillo curvo.' },
            { emoji: '💪', t: 'Tensión adecuada', d: 'Tira firme — ni muy flojo (producto débil) ni muy apretado (rotura).' },
            { emoji: '☀️', t: 'Secado natural', d: 'Tras tejer, seca en sombra 2-3 días. Evita sol directo.' },
            { emoji: '🎨', t: 'Acabado protector', d: 'Aplica capa fina de laca o aceite vegetal para proteger y durar.' },
            { emoji: '🧹', t: 'Limpieza suave', d: 'Quita polvo con paño seco, no sumergir. Guarda en lugar seco.' },
        ],
    },
};

export default function TutorialPage() {
    const { lang, t } = useLang();
    const [openProject, setOpenProject] = useState(0);
    const d = DATA[lang] || DATA.vi;

    return (
        <div className="min-h-screen pt-16 pb-20">
            {/* Hero header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto px-4 max-w-4xl py-12 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> {t('support.back')}
                    </Link>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{d.title}</h1>
                            <p className="text-white/80 text-sm mt-1">{d.desc}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 60%)' }} />
            </div>

            <div className="container mx-auto px-4 max-w-4xl -mt-2 space-y-12">
                {/* Materials */}
                <section>
                    <SectionHeader icon={Leaf} title={d.sections.materials.title} desc={d.sections.materials.desc} color="text-green-600" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {d.materials.map((m, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                className="p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl mb-3`}>{m.emoji}</div>
                                <h3 className="font-bold text-foreground mb-1">{m.name}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tools */}
                <section>
                    <SectionHeader icon={Wrench} title={d.sections.tools.title} desc={d.sections.tools.desc} color="text-amber-600" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {d.tools.map((tool, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border">
                                <span className="text-2xl">{tool.emoji}</span>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-foreground">{tool.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">{tool.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Techniques */}
                <section>
                    <SectionHeader icon={Grid3x3} title={d.sections.techniques.title} desc={d.sections.techniques.desc} color="text-teal-600" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {d.techniques.map((tech, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                className="p-5 rounded-2xl bg-card border border-border hover:border-teal-400/40 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl">{tech.emoji}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${['Dễ', 'Easy', 'Fácil'].includes(tech.difficulty) ? 'bg-green-100 text-green-700' : ['Trung bình', 'Medium', 'Medio'].includes(tech.difficulty) ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{tech.difficulty}</span>
                                </div>
                                <h3 className="font-bold text-foreground mb-1">{tech.name}</h3>
                                <p className="text-xs text-muted-foreground">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <SectionHeader icon={Package} title={d.sections.projects.title} desc={d.sections.projects.desc} color="text-violet-600" />
                    <div className="space-y-3">
                        {d.projects.map((proj, i) => (
                            <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
                                <button onClick={() => setOpenProject(openProject === i ? -1 : i)}
                                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/50 transition-colors">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${proj.color} flex items-center justify-center text-xl flex-shrink-0`}>{proj.emoji}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-bold text-foreground">{proj.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold bg-gradient-to-r ${proj.color} text-white`}>{proj.level}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {proj.time}</span>
                                            <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {proj.materials}</span>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${openProject === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openProject === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="px-5 pb-5 space-y-3">
                                                {proj.steps.map((step, j) => (
                                                    <div key={j} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                                                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${proj.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{j + 1}</div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-foreground">{step.t}</h4>
                                                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.d}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Videos */}
                <section>
                    <SectionHeader icon={Video} title={d.sections.videos.title} desc={d.sections.videos.desc} color="text-red-500" />
                    <div className="grid sm:grid-cols-2 gap-4">
                        {d.videos.map((v, i) => (
                            <a key={i} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
                                className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all">
                                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full aspect-video object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Video className="w-5 h-5 text-white ml-0.5" />
                                        </div>
                                        <p className="text-sm text-white font-medium">{v.title}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Tips */}
                <section>
                    <SectionHeader icon={Lightbulb} title={d.sections.tips.title} desc={d.sections.tips.desc} color="text-yellow-500" />
                    <div className="grid sm:grid-cols-2 gap-3">
                        {d.tips.map((tip, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                                <span className="text-2xl">{tip.emoji}</span>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground">{tip.t}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tip.d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionHeader({ icon: Icon, title, desc, color }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h2 className="text-xl font-bold text-foreground">{title}</h2>
            </div>
            <p className="text-sm text-muted-foreground ml-13">{desc}</p>
        </div>
    );
}