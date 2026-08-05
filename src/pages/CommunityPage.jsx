import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Plus, Heart, MessageCircle, Flag, Share2, Search, Image as ImageIcon,
    X, Send, Sparkles, Eye, TrendingUp, Bookmark, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuthUser } from '../context/AuthUserContext';
import { useLang } from '../context/LanguageContext';
import { moderateContent, checkRateLimit, logModeration } from '../lib/contentModeration';

const CT = {
    vi: { title: 'Cộng Đồng Phú Vinh', subtitle: 'Nơi chia sẻ đam mê mây tre đan', back: 'Về trang chủ', newPost: 'Viết Bài', ph: 'Bạn muốn chia sẻ gì hôm nay?', searchPh: 'Tìm theo chủ đề hoặc #hashtag...', all: 'Tất cả', showcase: 'Khoe Sản Phẩm', tutorial: 'Kinh Nghiệm', question: 'Hỏi Đáp', review: 'Đánh Giá', story: 'Câu Chuyện', idea: 'Ý Tưởng', post: 'Đăng Bài', cancel: 'Hủy', postTitle: 'Tiêu đề', postContent: 'Nội dung', postCategory: 'Chủ đề', tags: 'Tags (phân cách bằng dấu phẩy)', addImages: 'Thêm ảnh', noPosts: 'Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!', flagged: 'Nội dung không phù hợp', flaggedMsg: 'Nội dung chứa từ ngữ không phù hợp. Vui lòng chỉnh sửa.', like: 'Thích', comment: 'Bình luận', report: 'Báo cáo', save: 'Lưu', share: 'Chia sẻ', loginPrompt: 'Vui lòng đăng nhập để tham gia cộng đồng', sendCmt: 'Gửi', cmtPh: 'Viết bình luận...', reported: 'Đã báo cáo', cmtCount: 'bình luận', trending: 'Thịnh hành', newest: 'Mới nhất', postSuccess: 'Đã đăng bài thành công!', uploadHint: 'Tối đa 4 ảnh', close: 'Đóng', reporting: 'Bạn đang báo cáo bài viết này', reportReason: 'Lý do báo cáo', reportSpam: 'Spam', reportOffensive: 'Thô tục', reportOther: 'Khác', reportSubmit: 'Gửi báo cáo', reportSuccess: 'Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét.' },
    en: { title: 'Phú Vinh Community', subtitle: 'Share your passion for bamboo & rattan', back: 'Back to home', newPost: 'New Post', ph: 'What would you like to share today?', searchPh: 'Search by topic or #hashtag...', all: 'All', showcase: 'Showcase', tutorial: 'Tips', question: 'Q&A', review: 'Reviews', story: 'Stories', idea: 'Ideas', post: 'Post', cancel: 'Cancel', postTitle: 'Title', postContent: 'Content', postCategory: 'Category', tags: 'Tags (comma separated)', addImages: 'Add Photos', noPosts: 'No posts yet. Be the first to share!', flagged: 'Inappropriate', flaggedMsg: 'Content contains inappropriate language. Please edit.', like: 'Like', comment: 'Comment', report: 'Report', save: 'Save', share: 'Share', loginPrompt: 'Please log in to join the community', sendCmt: 'Send', cmtPh: 'Write a comment...', reported: 'Reported', cmtCount: 'comments', trending: 'Trending', newest: 'Newest', postSuccess: 'Posted successfully!', uploadHint: 'Up to 4 photos', close: 'Close', reporting: 'You are reporting this post', reportReason: 'Report reason', reportSpam: 'Spam', reportOffensive: 'Offensive', reportOther: 'Other', reportSubmit: 'Submit report', reportSuccess: 'Thank you for reporting. We will review it.' },
    es: { title: 'Comunidad Phú Vinh', subtitle: 'Comparte tu pasión por el bambú y ratán', back: 'Volver al inicio', newPost: 'Publicar', ph: '¿Qué quieres compartir hoy?', searchPh: 'Buscar por tema o #hashtag...', all: 'Todos', showcase: 'Mostrar', tutorial: 'Consejos', question: 'Preguntas', review: 'Reseñas', story: 'Historias', idea: 'Ideas', post: 'Publicar', cancel: 'Cancelar', postTitle: 'Título', postContent: 'Contenido', postCategory: 'Categoría', tags: 'Etiquetas (separadas por coma)', addImages: 'Añadir fotos', noPosts: 'Sin publicaciones. ¡Sé el primero!', flagged: 'Inapropiado', flaggedMsg: 'Contenido inapropiado. Por favor edita.', like: 'Me gusta', comment: 'Comentar', report: 'Reportar', save: 'Guardar', share: 'Compartir', loginPrompt: 'Inicia sesión para unirte', sendCmt: 'Enviar', cmtPh: 'Escribe un comentario...', reported: 'Reportado', cmtCount: 'comentarios', trending: 'Tendencias', newest: 'Reciente', postSuccess: 'Publicado con éxito!', uploadHint: 'Hasta 4 fotos', close: 'Cerrar', reporting: 'Estás reportando esta publicación', reportReason: 'Motivo', reportSpam: 'Spam', reportOffensive: 'Ofensivo', reportOther: 'Otro', reportSubmit: 'Enviar reporte', reportSuccess: 'Gracias por reportar. Lo revisaremos.' },
    zh: { title: '富荣社区', subtitle: '分享竹藤编织的热情', back: '返回首页', newPost: '发帖', ph: '今天想分享什么？', searchPh: '按主题或#标签搜索...', all: '全部', showcase: '作品展示', tutorial: '经验技巧', question: '问答', review: '评价', story: '故事', idea: '创意', post: '发布', cancel: '取消', postTitle: '标题', postContent: '内容', postCategory: '分类', tags: '标签（逗号分隔）', addImages: '添加图片', noPosts: '还没有帖子。成为第一个分享的人！', flagged: '不当内容', flaggedMsg: '内容含有不当用语，请修改。', like: '赞', comment: '评论', report: '举报', save: '收藏', share: '分享', loginPrompt: '请登录加入社区', sendCmt: '发送', cmtPh: '写评论...', reported: '已举报', cmtCount: '评论', trending: '热门', newest: '最新', postSuccess: '发布成功！', uploadHint: '最多4张图片', close: '关闭', reporting: '您正在举报此帖', reportReason: '举报原因', reportSpam: '垃圾', reportOffensive: '冒犯', reportOther: '其他', reportSubmit: '提交举报', reportSuccess: '感谢举报，我们将审核。' },
    ru: { title: 'Сообщество Phú Vinh', subtitle: 'Делитесь страстью к бамбуку и ротану', back: 'На главную', newPost: 'Опубликовать', ph: 'Что хотите поделиться?', searchPh: 'Поиск по теме или #хэштегу...', all: 'Все', showcase: 'Витрина', tutorial: 'Советы', question: 'Вопросы', review: 'Отзывы', story: 'Истории', idea: 'Идеи', post: 'Опубликовать', cancel: 'Отмена', postTitle: 'Заголовок', postContent: 'Содержание', postCategory: 'Категория', tags: 'Теги (через запятую)', addImages: 'Добавить фото', noPosts: 'Пока нет публикаций. Будьте первым!', flagged: 'Неподобающий', flaggedMsg: 'Неподходящий контент. Отредактируйте.', like: 'Нравится', comment: 'Комментарий', report: 'Пожаловаться', save: 'Сохранить', share: 'Поделиться', loginPrompt: 'Войдите, чтобы присоединиться', sendCmt: 'Отправить', cmtPh: 'Напишите комментарий...', reported: 'Жалоба отправлена', cmtCount: 'комментариев', trending: 'Популярное', newest: 'Новые', postSuccess: 'Опубликовано!', uploadHint: 'До 4 фото', close: 'Закрыть', reporting: 'Вы жалуетесь на эту публикацию', reportReason: 'Причина', reportSpam: 'Спам', reportOffensive: 'Оскорбительно', reportOther: 'Другое', reportSubmit: 'Отправить', reportSuccess: 'Спасибо за жалобу. Мы рассмотрим.' },
    th: { title: 'ชุมชน Phú Vinh', subtitle: 'แบ่งปันความหลงใหลในไม้ไผ่และหวาย', back: 'กลับหน้าหลัก', newPost: 'โพสต์', ph: 'อยากแบ่งปันอะไรวันนี้?', searchPh: 'ค้นหาตามหัวข้อหรือ#แฮชแท็ก...', all: 'ทั้งหมด', showcase: 'ผลงาน', tutorial: 'เคล็ดลับ', question: 'ถามตอบ', review: 'รีวิว', story: 'เรื่องราว', idea: 'ไอเดีย', post: 'โพสต์', cancel: 'ยกเลิก', postTitle: 'หัวข้อ', postContent: 'เนื้อหา', postCategory: 'หมวดหมู่', tags: 'แท็ก (คั่นด้วยจุลภาค)', addImages: 'เพิ่มรูป', noPosts: 'ยังไม่มีโพสต์ เป็นคนแรกที่แบ่งปัน!', flagged: 'ไม่เหมาะสม', flaggedMsg: 'เนื้อหาไม่เหมาะสม กรุณาแก้ไข', like: 'ถูกใจ', comment: 'ความคิดเห็น', report: 'รายงาน', save: 'บันทึก', share: 'แชร์', loginPrompt: 'กรุณาเข้าสู่ระบบ', sendCmt: 'ส่ง', cmtPh: 'เขียนความคิดเห็น...', reported: 'รายงานแล้ว', cmtCount: 'ความคิดเห็น', trending: 'ยอดนิยม', newest: 'ใหม่ล่าสุด', postSuccess: 'โพสต์สำเร็จ!', uploadHint: 'สูงสุด 4 รูป', close: 'ปิด', reporting: 'คุณกำลังรายงานโพสต์นี้', reportReason: 'เหตุผล', reportSpam: 'สแปม', reportOffensive: 'ไม่สุภาพ', reportOther: 'อื่นๆ', reportSubmit: 'ส่งรายงาน', reportSuccess: 'ขอบคุณที่รายงาน' },
    hi: { title: 'Phú Vinh समुदाय', subtitle: 'बांस और बेंत का जुनून साझा करें', back: 'मुख्य पर वापस', newPost: 'पोस्ट लिखें', ph: 'आज क्या साझा करना चाहते हैं?', searchPh: 'विषय या #हैशटैग खोजें...', all: 'सभी', showcase: 'प्रदर्शन', tutorial: 'सुझाव', question: 'प्रश्न', review: 'समीक्षा', story: 'कहानी', idea: 'विचार', post: 'पोस्ट', cancel: 'रद्द', postTitle: 'शीर्षक', postContent: 'सामग्री', postCategory: 'श्रेणी', tags: 'टैग (अल्पविराम से अलग)', addImages: 'फोटो जोड़ें', noPosts: 'अभी कोई पोस्ट नहीं। पहले बनें!', flagged: 'अनुपयुक्त', flaggedMsg: 'अनुपयुक्त सामग्री। कृपया संपादित करें।', like: 'पसंद', comment: 'टिप्पणी', report: 'रिपोर्ट', save: 'सहेजें', share: 'साझा', loginPrompt: 'कृपया लॉगिन करें', sendCmt: 'भेजें', cmtPh: 'टिप्पणी लिखें...', reported: 'रिपोर्ट किया', cmtCount: 'टिप्पणियाँ', trending: 'ट्रेंडिंग', newest: 'नवीनतम', postSuccess: 'पोस्ट सफल!', uploadHint: 'अधिकतम 4 फोटो', close: 'बंद', reporting: 'आप इस पोस्ट की रिपोर्ट कर रहे हैं', reportReason: 'कारण', reportSpam: 'स्पैम', reportOffensive: 'आपत्तिजनक', reportOther: 'अन्य', reportSubmit: 'रिपोर्ट भेजें', reportSuccess: 'रिपोर्ट के लिए धन्यवाद' },
    ja: { title: 'Phú Vinh コミュニティ', subtitle: '竹藤工芸の情熱をシェア', back: 'ホームに戻る', newPost: '投稿', ph: '今日何をシェアしますか？', searchPh: 'トピックや#ハッシュタグで検索...', all: 'すべて', showcase: '作品', tutorial: 'コツ', question: '質問', review: 'レビュー', story: 'ストーリー', idea: 'アイデア', post: '投稿', cancel: 'キャンセル', postTitle: 'タイトル', postContent: '内容', postCategory: 'カテゴリ', tags: 'タグ（カンマ区切り）', addImages: '写真を追加', noPosts: 'まだ投稿がありません。最初にシェアしよう！', flagged: '不適切', flaggedMsg: '不適切な内容です。編集してください。', like: 'いいね', comment: 'コメント', report: '通報', save: '保存', share: '共有', loginPrompt: 'ログインしてください', sendCmt: '送信', cmtPh: 'コメントを書く...', reported: '通報済み', cmtCount: 'コメント', trending: 'トレンド', newest: '新着', postSuccess: '投稿成功！', uploadHint: '最大4枚', close: '閉じる', reporting: 'この投稿を通報しています', reportReason: '理由', reportSpam: 'スパム', reportOffensive: '攻撃的', reportOther: 'その他', reportSubmit: '送信', reportSuccess: '通報ありがとうございます' },
    ko: { title: 'Phú Vinh 커뮤니티', subtitle: '대나무와 등나무의 열정을 공유하세요', back: '홈으로', newPost: '게시', ph: '오늘 무엇을 공유하시겠어요?', searchPh: '주제 또는 #해시태그 검색...', all: '전체', showcase: '작품', tutorial: '팁', question: '질문', review: '리뷰', story: '스토리', idea: '아이디어', post: '게시', cancel: '취소', postTitle: '제목', postContent: '내용', postCategory: '카테고리', tags: '태그 (쉼표로 구분)', addImages: '사진 추가', noPosts: '아직 게시물이 없습니다. 첫 번째로 공유하세요!', flagged: '부적절', flaggedMsg: '부적절한 내용입니다. 수정해 주세요.', like: '좋아요', comment: '댓글', report: '신고', save: '저장', share: '공유', loginPrompt: '로그인하세요', sendCmt: '전송', cmtPh: '댓글 작성...', reported: '신고됨', cmtCount: '댓글', trending: '인기', newest: '최신', postSuccess: '게시 성공!', uploadHint: '최대 4장', close: '닫기', reporting: '이 게시물을 신고합니다', reportReason: '사유', reportSpam: '스팸', reportOffensive: '모욕적', reportOther: '기타', reportSubmit: '신고', reportSuccess: '신고 감사합니다' },
};

const CATS = ['all', 'showcase', 'tutorial', 'question', 'review', 'story', 'idea'];
const CAT_ICONS = { showcase: '🎨', tutorial: '💡', question: '❓', review: '⭐', story: '📖', idea: '✨' };

export default function CommunityPage() {
    const navigate = useNavigate();
    const authCtx = useAuthUser() || {};
    const { lang } = useLang();
    const user = authCtx?.user;
    const userProfile = authCtx?.userProfile;
    const tx = CT[lang] || CT.vi;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCat, setActiveCat] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showReport, setShowReport] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'showcase', tags: '', images: [] });
    const [postError, setPostError] = useState('');
    const [posting, setPosting] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});

    const loadPosts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await base44.entities.CommunityPost.list('-created_date', 50);
            setPosts((data || []).filter(p => p.status === 'active'));
        } catch {
            setPosts([]);
        }
        setLoading(false);
    }, []);

    useEffect(() => { loadPosts(); }, [loadPosts]);

    const handleCreate = async () => {
        setPostError('');
        if (!user) { setPostError(tx.loginPrompt); return; }

        // Content moderation
        const titleCheck = moderateContent(newPost.title);
        if (!titleCheck.passed) {
            setPostError(lang === 'vi' ? titleCheck.message : titleCheck.messageEn);
            logModeration('block_title', newPost.title, titleCheck.reason);
            return;
        }
        const contentCheck = moderateContent(newPost.content);
        if (!contentCheck.passed) {
            setPostError(lang === 'vi' ? contentCheck.message : contentCheck.messageEn);
            logModeration('block_content', newPost.content, contentCheck.reason);
            return;
        }

        // Rate limiting
        const rateCheck = checkRateLimit(user.email);
        if (!rateCheck.allowed) {
            setPostError(lang === 'vi' ? rateCheck.message : rateCheck.messageEn);
            return;
        }

        setPosting(true);
        try {
            const tags = newPost.tags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
            const post = await base44.entities.CommunityPost.create({
                title: newPost.title.trim(),
                content: newPost.content.trim(),
                author_name: userProfile?.full_name || user.full_name || 'Anonymous',
                author_email: user.email,
                author_avatar: userProfile?.avatar_url || '',
                images: newPost.images,
                category: newPost.category,
                tags,
                likes: [],
                like_count: 0,
                comments: [],
                comment_count: 0,
                reports: 0,
                status: 'active',
                moderation_flagged: false,
            });
            setPosts(prev => [post, ...prev]);
            setNewPost({ title: '', content: '', category: 'showcase', tags: '', images: [] });
            setShowCreate(false);
        } catch {
            setPostError(tx.flagged);
        }
        setPosting(false);
    };

    const handleLike = async (post) => {
        if (!user) return;
        const liked = (post.likes || []).includes(user.email);
        const newLikes = liked
            ? (post.likes || []).filter(e => e !== user.email)
            : [...(post.likes || []), user.email];
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: newLikes, like_count: newLikes.length } : p));
        try { await base44.entities.CommunityPost.update(post.id, { likes: newLikes, like_count: newLikes.length }); } catch { }
    };

    const handleComment = async (post, text) => {
        if (!user || !text.trim()) return;
        const cmtCheck = moderateContent(text);
        if (!cmtCheck.passed) { logModeration('block_comment', text, cmtCheck.reason); return; }
        const cmt = { id: Date.now().toString(), author_name: userProfile?.full_name || user.full_name || 'User', author_email: user.email, text: text.trim(), created_date: new Date().toISOString() };
        const newComments = [...(post.comments || []), cmt];
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, comments: newComments, comment_count: newComments.length } : p));
        try { await base44.entities.CommunityPost.update(post.id, { comments: newComments, comment_count: newComments.length }); } catch { }
    };

    const handleReport = async (post, reason) => {
        try { await base44.entities.CommunityPost.update(post.id, { reports: (post.reports || 0) + 1 }); } catch { }
        logModeration('report', post.title, reason);
        setShowReport(null);
    };

    const handleImageUpload = async (files) => {
        if (!files || files.length === 0) return;
        const remaining = 4 - newPost.images.length;
        const toUpload = Array.from(files).slice(0, remaining);
        const urls = [];
        for (const file of toUpload) {
            try {
                const res = await base44.integrations.Core.UploadFile({ file });
                if (res?.file_url) urls.push(res.file_url);
            } catch { }
        }
        setNewPost(p => ({ ...p, images: [...p.images, ...urls] }));
    };

    // Filter and sort
    let filtered = posts;
    if (activeCat !== 'all') filtered = filtered.filter(p => p.category === activeCat);
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().replace(/^#/, '');
        filtered = filtered.filter(p =>
            (p.title || '').toLowerCase().includes(q) ||
            (p.content || '').toLowerCase().includes(q) ||
            (p.tags || []).some(t => t.toLowerCase().includes(q))
        );
    }
    if (sortBy === 'trending') filtered = [...filtered].sort((a, b) => (b.like_count || 0) - (a.like_count || 0));

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pb-20">
            {/* Top bar */}
            <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted hover:bg-accent transition-colors text-sm font-semibold flex-shrink-0">
                    <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">{tx.back}</span>
                </button>
                <h1 className="font-bold text-lg flex items-center gap-2 truncate">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="truncate">{tx.title}</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 flex-shrink-0">DEMO</span>
                </h1>
            </div>

            <div className="container mx-auto max-w-3xl px-4 mt-4 space-y-4">
                {/* Search + New Post */}
                <div className="flex gap-3 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={tx.searchPh}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    {user && (
                        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg transition-all flex-shrink-0">
                            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">{tx.newPost}</span>
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {CATS.map(cat => (
                        <button key={cat} onClick={() => setActiveCat(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5
              ${activeCat === cat ? 'bg-primary text-white' : 'bg-card border border-border text-muted-foreground hover:border-primary/40'}`}>
                            {cat !== 'all' && CAT_ICONS[cat]} {tx[cat]}
                        </button>
                    ))}
                    <div className="flex-shrink-0 w-px bg-border mx-1" />
                    <button onClick={() => setSortBy('newest')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${sortBy === 'newest' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>
                        {tx.newest}
                    </button>
                    <button onClick={() => setSortBy('trending')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${sortBy === 'trending' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>
                        🔥 {tx.trending}
                    </button>
                </div>

                {/* Posts */}
                {loading ? (
                    <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <Sparkles className="w-12 h-12 text-primary/20 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">{tx.noPosts}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filtered.map((post, i) => (
                                <PostCard key={post.id} post={post} tx={tx} lang={lang} user={user} userProfile={userProfile}
                                    onLike={() => handleLike(post)} onComment={(text) => handleComment(post, text)}
                                    onReport={() => setShowReport(post)} expanded={!!expandedComments[post.id]}
                                    toggleExpand={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))} index={i} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Create post modal */}
            <AnimatePresence>
                {showCreate && (
                    <CreatePostModal tx={tx} newPost={newPost} setNewPost={setNewPost} onCancel={() => setShowCreate(false)}
                        onSubmit={handleCreate} posting={posting} error={postError} onImageUpload={handleImageUpload} />
                )}
            </AnimatePresence>

            {/* Report modal */}
            <AnimatePresence>
                {showReport && (
                    <ReportModal post={showReport} tx={tx} onClose={() => setShowReport(null)} onSubmit={(reason) => handleReport(showReport, reason)} />
                )}
            </AnimatePresence>

            {!user && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow-lg cursor-pointer" onClick={() => navigate('/')}>
                    {tx.loginPrompt}
                </div>
            )}
        </div>
    );
}

function PostCard({ post, tx, lang, user, userProfile, onLike, onComment, onReport, expanded, toggleExpand, index }) {
    const [commentText, setCommentText] = useState('');
    const liked = user && (post.likes || []).includes(user.email);
    const timeAgo = (d) => {
        if (!d) return '';
        const diff = Date.now() - new Date(d).getTime();
        const min = Math.floor(diff / 60000), hr = Math.floor(min / 60), day = Math.floor(hr / 24);
        if (lang === 'vi') return day > 0 ? `${day} ngày trước` : hr > 0 ? `${hr} giờ trước` : min > 0 ? `${min} phút trước` : 'Vừa xong';
        return day > 0 ? `${day}d ago` : hr > 0 ? `${hr}h ago` : min > 0 ? `${min}m ago` : 'Just now';
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 pb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-amber-400/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {post.author_avatar ? <img src={post.author_avatar} alt="" className="w-full h-full rounded-full object-cover" /> : (post.author_name || '?')[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{post.author_name}</p>
                    <p className="text-xs text-muted-foreground">{CAT_ICONS[post.category]} {tx[post.category]} · {timeAgo(post.created_date)}</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
                <h3 className="font-bold text-foreground mb-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.tags.map((t, ti) => <span key={ti} className="text-xs text-primary font-medium">#{t}</span>)}
                    </div>
                )}
            </div>

            {/* Images */}
            {post.images?.length > 0 && (
                <div className={`grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.slice(0, 4).map((img, ii) => (
                        <img key={ii} src={img} alt="" className="w-full object-cover max-h-72 hover:scale-105 transition-transform cursor-pointer" />
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1 p-2 border-t border-border">
                <button onClick={onLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${liked ? 'text-rose-500' : 'text-muted-foreground hover:bg-muted'}`}>
                    <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} /> {post.like_count || 0}
                </button>
                <button onClick={toggleExpand} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
                    <MessageCircle className="w-4 h-4" /> {post.comment_count || 0} {tx.cmtCount}
                </button>
                <button onClick={onReport} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-muted transition-colors ml-auto">
                    <Flag className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Comments */}
            {expanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                    {(post.comments || []).map((c, ci) => (
                        <div key={ci} className="flex gap-2">
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                                {(c.author_name || '?')[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 bg-muted/50 rounded-xl px-3 py-2">
                                <p className="text-xs font-bold text-foreground">{c.author_name}</p>
                                <p className="text-sm text-muted-foreground">{c.text}</p>
                            </div>
                        </div>
                    ))}
                    {user && (
                        <div className="flex gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-amber-400/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                {(userProfile?.full_name || user.full_name || '?')[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 flex gap-2">
                                <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={tx.cmtPh}
                                    onKeyDown={e => { if (e.key === 'Enter') { onComment(commentText); setCommentText(''); } }}
                                    className="flex-1 px-3 py-1.5 rounded-xl border border-border text-sm outline-none focus:border-primary" />
                                <button onClick={() => { onComment(commentText); setCommentText(''); }} className="px-3 py-1.5 rounded-xl bg-primary text-white text-sm font-bold">
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}

function CreatePostModal({ tx, newPost, setNewPost, onCancel, onSubmit, posting, error, onImageUpload }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onCancel}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-primary to-emerald-600 px-5 py-3 text-white flex items-center justify-between flex-shrink-0">
                    <h2 className="font-bold flex items-center gap-2"><Plus className="w-5 h-5" /> {tx.newPost}</h2>
                    <button onClick={onCancel} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30"><X className="w-4 h-4" /></button>
                </div>
                <div className="overflow-y-auto flex-1 p-5 space-y-4">
                    {error && <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}</div>}
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">{tx.postTitle}</label>
                        <input value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">{tx.postContent}</label>
                        <textarea value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} rows={5}
                            placeholder={tx.ph}
                            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">{tx.postCategory}</label>
                        <div className="flex flex-wrap gap-2">
                            {CATS.filter(c => c !== 'all').map(cat => (
                                <button key={cat} onClick={() => setNewPost(p => ({ ...p, category: cat }))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${newPost.category === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground border border-border'}`}>
                                    {CAT_ICONS[cat]} {tx[cat]}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">{tx.tags}</label>
                        <input value={newPost.tags} onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))} placeholder="#mâytre, #phúvinh..."
                            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">{tx.addImages} <span className="text-muted-foreground/60">({tx.uploadHint})</span></label>
                        <div className="flex gap-2 flex-wrap">
                            {newPost.images.map((img, i) => (
                                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => setNewPost(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
                                </div>
                            ))}
                            {newPost.images.length < 4 && (
                                <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-primary flex items-center justify-center cursor-pointer transition-colors">
                                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={e => onImageUpload(e.target.files)} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t border-border flex gap-3 flex-shrink-0">
                    <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted">{tx.cancel}</button>
                    <button onClick={onSubmit} disabled={posting || !newPost.title.trim() || !newPost.content.trim()}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold disabled:opacity-50 hover:shadow-lg transition-all">
                        {posting ? '...' : tx.post}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ReportModal({ post, tx, onClose, onSubmit }) {
    const [reason, setReason] = useState('spam');
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className="relative w-full max-w-sm bg-card rounded-3xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-4"><Flag className="w-5 h-5 text-rose-500" /><h2 className="font-bold">{tx.reporting}</h2></div>
                <p className="text-xs text-muted-foreground mb-3">{tx.reportReason}:</p>
                <div className="space-y-2 mb-4">
                    {[{ v: 'spam', l: tx.reportSpam }, { v: 'offensive', l: tx.reportOffensive }, { v: 'other', l: tx.reportOther }].map(r => (
                        <button key={r.v} onClick={() => setReason(r.v)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${reason === r.v ? 'bg-primary/10 border-2 border-primary text-primary' : 'bg-muted border-2 border-transparent'}`}>
                            {r.l}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-muted-foreground">{tx.cancel}</button>
                    <button onClick={() => onSubmit(reason)} className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-bold hover:shadow-lg">{tx.reportSubmit}</button>
                </div>
            </motion.div>
        </motion.div>
    );
}