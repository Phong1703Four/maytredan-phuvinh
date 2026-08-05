import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Rocket, Home as HomeIcon, Award, Leaf, ExternalLink, X, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const STORIES_DATA = {
    vi: [
        { tag: 'NGHỆ NHÂN', icon: User, title: 'Bàn Tay Ma Thuật Của Cụ Bảy', desc: 'Hơn 60 năm gắn bó với nghề, cụ Bảy là nghệ nhân duy nhất còn giữ được kỹ thuật đan họa tiết rồng phượng tinh xảo trên mâm mây.', full: 'Cụ Nguyễn Văn Bảy, sinh năm 1938, đã bắt đầu học đan từ năm 8 tuổi dưới sự hướng dẫn của người cha. Trải qua hơn 60 năm, đôi tay cụ đã tạo ra hàng nghìn tác phẩm độc đáo, trong đó có bộ mâm rồng phượng 12 con được trưng bày tại Bảo tàng Dân tộc học Việt Nam. Kỹ thuật đan họa tiết của cụ được đánh giá là tinh xảo nhất làng Phú Vinh — mỗi chiếc mâm mất tới 3 tháng để hoàn thành với hơn 40,000 nút đan. Năm 2018, cụ được Nhà nước phong tặng danh hiệu Nghệ nhân Ưu tú.', link: 'https://baotangdantochoc.vn', linkLabel: 'Xem tại Bảo tàng Dân tộc học', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', tagColor: 'text-amber-600 bg-amber-100' },
        { tag: 'LỊCH SỬ', icon: BookOpen, title: 'Từ Vật Dụng Lên Cung Đình', desc: 'Vào thế kỷ 18, những sản phẩm mây tre đan Phú Vinh tinh xảo đến mức được dâng lên làm cống phẩm cho vua chúa.', full: 'Theo sử sách ghi lại, vào thời vua Lê Hiển Tông (thế kỷ 18), các quan địa phương đã tiến cống lên triều đình những chiếc hộp đựng đồ, khay trà và mâm bồng làm từ mây tre Phú Vinh. Vua ngự lãm rất hài lòng, ban thưởng và ra lệnh làng nghề phải cung cấp định kỳ cho nội cung. Đây là giai đoạn hoàng kim đầu tiên của làng nghề, khi nghề đan không còn chỉ là mưu sinh mà trở thành nghệ thuật được triều đình bảo trợ.', link: 'https://hanoimoi.vn', linkLabel: 'Đọc trên Hà Nội Mới', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', tagColor: 'text-emerald-700 bg-emerald-100' },
        { tag: 'THẾ HỆ MỚI', icon: Rocket, title: 'Người Trẻ Đưa Phú Vinh Lên Amazon', desc: 'Thế hệ 9x Phú Vinh không chỉ kế thừa kỹ thuật mà còn ứng dụng công nghệ số, đưa sản phẩm chinh phục thị trường Mỹ, châu Âu.', full: 'Nguyễn Minh Quân, sinh năm 1995, tốt nghiệp đại học Thương mại rồi trở về làng thay vì ở lại thành phố. Anh thành lập Phú Vinh Craft Export với mô hình bán hàng trực tuyến trên Amazon và Etsy. Chỉ sau 2 năm, doanh thu xuất khẩu của nhóm anh đạt 3 tỷ đồng/năm, đưa sản phẩm đến tay khách hàng tại 28 quốc gia.', link: 'https://vnexpress.net', linkLabel: 'Xem bài trên VnExpress', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', tagColor: 'text-blue-600 bg-blue-100' },
        { tag: 'GIA ĐÌNH', icon: HomeIcon, title: 'Truyền Nghề Dưới Nếp Nhà Xưa', desc: 'Ở Phú Vinh, trẻ em 5-6 tuổi đã biết phụ ông bà tuốt nan. Nghề đan được truyền lại tự nhiên như hơi thở qua từng thế hệ.', full: 'Gia đình bà Trần Thị Hoa là một trong những gia đình 5 thế hệ làm nghề đan tại Phú Vinh. Từ cụ nội đến con gái út 7 tuổi, mỗi người đều thành thạo ít nhất một công đoạn. Bà Hoa kể: "Không ai dạy chúng tôi chính thức cả. Trẻ em nhìn bố mẹ làm rồi tự bắt chước, đến lúc nào đó thì biết tự làm thôi."', link: 'https://tuoitre.vn', linkLabel: 'Đọc trên Tuổi Trẻ', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', tagColor: 'text-rose-600 bg-rose-100' },
        { tag: 'VINH DANH', icon: Award, title: 'Hành Trình Đến Với UNESCO', desc: 'Những nỗ lực bảo tồn không mệt mỏi đã giúp làng nghề được công nhận và chú ý bởi các tổ chức di sản quốc tế.', full: 'Năm 2019, Phú Vinh được UNESCO đưa vào danh sách các làng nghề thủ công truyền thống tiêu biểu của Đông Nam Á cần được bảo tồn và phát huy. Để đạt được điều này, UBND huyện Chương Mỹ cùng Hội Nghệ nhân Phú Vinh đã phải xây dựng hồ sơ trong 4 năm, ghi chép và số hóa hơn 200 kỹ thuật đan truyền thống.', link: 'https://nhandan.vn', linkLabel: 'Xem trên Báo Nhân Dân', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', tagColor: 'text-purple-600 bg-purple-100' },
        { tag: 'SINH THÁI', icon: Leaf, title: 'Bảo Tồn Vùng Nguyên Liệu', desc: 'Không chỉ đan lát, người dân Phú Vinh còn tiên phong trong việc trồng và bảo tồn các giống song mây quý hiếm.', full: 'Trước tình trạng nguồn nguyên liệu ngày càng khan hiếm, năm 2020 một nhóm nghệ nhân Phú Vinh đã hợp tác với Viện Sinh thái và Tài nguyên Sinh vật thành lập vườn ươm song mây đầu tiên của Việt Nam ngay tại chân làng. Dự án "Xanh Phú Vinh" hiện đã trồng được hơn 15,000 cây song mây trên diện tích 5 hecta.', link: 'https://baovemoitruong.vn', linkLabel: 'Đọc thêm về dự án Xanh', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', tagColor: 'text-teal-600 bg-teal-100' },
    ],
    en: [
        { tag: 'ARTISAN', icon: User, title: 'The Magic Hands of Master Bảy', desc: 'With over 60 years in the craft, Master Bảy is the only artisan who still masters the intricate dragon-phoenix weaving technique on rattan trays.', full: 'Nguyễn Văn Bảy, born in 1938, began weaving at age 8 under his father\'s guidance. Over 60 years, his hands have created thousands of unique works, including a set of 12 dragon-phoenix trays displayed at the Vietnam Museum of Ethnology. His decorative weaving is considered the finest in Phú Vinh — each tray takes up to 3 months with over 40,000 knots. In 2018, he was awarded the title of Meritorious Artisan.', link: 'https://baotangdantochoc.vn', linkLabel: 'View at Museum of Ethnology', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', tagColor: 'text-amber-600 bg-amber-100' },
        { tag: 'HISTORY', icon: BookOpen, title: 'From Utility to Royal Tribute', desc: 'In the 18th century, Phú Vinh\'s bamboo products were so exquisite they were offered as tribute to the emperors.', full: 'Historical records show that during the reign of Emperor Lê Hiển Tông (18th century), local officials presented Phú Vinh bamboo boxes, tea trays, and serving plates to the royal court. The emperor was delighted and ordered the village to supply the inner court regularly. This was the first golden age of the craft village.', link: 'https://hanoimoi.vn', linkLabel: 'Read on Hà Nội Mới', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', tagColor: 'text-emerald-700 bg-emerald-100' },
        { tag: 'NEW GEN', icon: Rocket, title: 'Youth Takes Phú Vinh to Amazon', desc: 'Gen Z Phú Vinh youth not only inherit techniques but apply digital technology, conquering US and European markets.', full: 'Nguyễn Minh Quân, born 1995, graduated from university and returned to the village instead of staying in the city. He founded Phú Vinh Craft Export, selling on Amazon and Etsy. In just 2 years, his team\'s export revenue reached 3 billion VND/year, bringing products to customers in 28 countries.', link: 'https://vnexpress.net', linkLabel: 'Read on VnExpress', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', tagColor: 'text-blue-600 bg-blue-100' },
        { tag: 'FAMILY', icon: HomeIcon, title: 'Passing Down the Craft at Home', desc: 'In Phú Vinh, children aged 5-6 already help strip bamboo. The craft is passed down naturally, like breathing, through generations.', full: 'The family of Mrs. Trần Thị Hoa is one of five-generation weaving families in Phú Vinh. From great-grandmother to the 7-year-old daughter, everyone masters at least one step. Mrs. Hoa says: "No one formally teaches us. Children watch their parents and imitate, and at some point, they just know how to do it."', link: 'https://tuoitre.vn', linkLabel: 'Read on Tuổi Trẻ', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', tagColor: 'text-rose-600 bg-rose-100' },
        { tag: 'HONOR', icon: Award, title: 'Journey to UNESCO', desc: 'Relentless conservation efforts have earned the village recognition from international heritage organizations.', full: 'In 2019, Phú Vinh was added to UNESCO\'s list of representative traditional craft villages of Southeast Asia needing preservation. To achieve this, the district government and Phú Vinh Artisans Association spent 4 years building the dossier, documenting and digitizing over 200 traditional weaving techniques.', link: 'https://nhandan.vn', linkLabel: 'View on Nhân Dân', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', tagColor: 'text-purple-600 bg-purple-100' },
        { tag: 'ECOLOGY', icon: Leaf, title: 'Conserving Raw Material Sources', desc: 'Beyond weaving, Phú Vinh residents pioneer the cultivation and conservation of rare rattan varieties.', full: 'Faced with increasingly scarce raw materials, in 2020 a group of Phú Vinh artisans partnered with the Institute of Ecology and Biological Resources to establish Vietnam\'s first rattan nursery at the foot of the village. The "Green Phú Vinh" project has planted over 15,000 rattan plants on 5 hectares.', link: 'https://baovemoitruong.vn', linkLabel: 'Read about the Green project', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', tagColor: 'text-teal-600 bg-teal-100' },
    ],
};

export default function StoriesSection() {
    const { t, lang } = useLang();
    const STORIES = STORIES_DATA[lang] || STORIES_DATA.vi;
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="stories" className="py-24 relative bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <p className="text-center text-muted-foreground italic mb-3">{t('stories.quote')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4">{t('stories.title')}</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-emerald-400 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {STORIES.map((story, i) => {
                        const Icon = story.icon;
                        const isOpen = expanded === i;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -4 }}
                                className={`group rounded-2xl border transition-all duration-300 overflow-hidden
                ${isOpen ? `${story.bg} ${story.border} shadow-xl` : 'bg-card border-border hover:border-primary/30 hover:shadow-lg'}`}>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${story.tagColor}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${story.tagColor}`}>{story.tag}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{story.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{story.desc}</p>
                                    {isOpen && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3 pt-3 border-t border-current/10 space-y-3 overflow-hidden">
                                            <p className="text-sm text-foreground/80 leading-relaxed">{story.full}</p>
                                            <a href={story.link} target="_blank" rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${story.color} hover:underline`}>
                                                <ExternalLink className="w-3.5 h-3.5" /> {story.linkLabel}
                                            </a>
                                        </motion.div>
                                    )}
                                    <button onClick={() => setExpanded(isOpen ? null : i)}
                                        className={`flex items-center gap-1 text-sm font-medium transition-all mt-3 ${story.color}`}>
                                        {isOpen ? <><X className="w-3.5 h-3.5" /> {t('stories.collapse')}</> : <><ChevronRight className="w-3.5 h-3.5" /> {t('stories.readMore')}</>}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}