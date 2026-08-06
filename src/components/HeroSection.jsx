import { useState, useEffect, useRef } from 'react';
import { Sparkles, WandSparkles, Palette, Layers, Cpu, Eye, Maximize2, Download, RotateCcw, Camera, LayoutGrid, MessageSquare, X, Loader2, RefreshCw, ImageIcon, Upload, Users, Video } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../context/LanguageContext';
import ArtisanOrderModal from './artisans/ArtisanOrderModal';
import CameraCapture from './CameraCapture';
import AIDesignEditor from './AIDesignEditor';
import DesignStudio from './DesignStudio';

const FEATURES = [
    { icon: WandSparkles, labelKey: 'hero.feat1', color: 'from-violet-500 to-purple-700', descKey: 'hero.feat1d' },
    { icon: Palette, labelKey: 'hero.feat2', color: 'from-pink-500 to-rose-600', descKey: 'hero.feat2d' },
    { icon: Layers, labelKey: 'hero.feat3', color: 'from-cyan-500 to-blue-600', descKey: 'hero.feat3d' },
    { icon: Cpu, labelKey: 'hero.feat4', color: 'from-amber-500 to-orange-600', descKey: 'hero.feat4d' },
    { icon: Eye, labelKey: 'hero.feat5', color: 'from-teal-500 to-emerald-600', descKey: 'hero.feat5d' },
    { icon: Maximize2, labelKey: 'hero.feat6', color: 'from-indigo-500 to-violet-600', descKey: 'hero.feat6d' },
    { icon: Download, labelKey: 'hero.feat7', color: 'from-green-500 to-emerald-700', descKey: 'hero.feat7d' },
    { icon: RotateCcw, labelKey: 'hero.feat8', color: 'from-rose-500 to-pink-700', descKey: 'hero.feat8d' },
];

const SUGGESTIONS = [
    { icon: '🪑', text: 'Ghế lười tổ chim kiểu Nhật', style: 'Wabi-sabi' },
    { icon: '🪷', text: 'Đèn chùm hoa sen Boho', style: 'Bohemian' },
    { icon: '👜', text: 'Túi xách mây mix da bò', style: 'Luxury' },
    { icon: '🎋', text: 'Xích đu giọt nước hiện đại', style: 'Modern' },
    { icon: '☀️', text: 'Gương mặt trời tia nắng', style: 'Boho' },
    { icon: '🍵', text: 'Bàn trà truyền thống Á Đông', style: 'Zen' },
];

const STYLE_PRESETS = [
    { key: 'boho', emoji: '🌿', bg: 'from-amber-100 to-orange-50', border: 'border-amber-300', text: 'text-amber-700' },
    { key: 'luxury', emoji: '✨', bg: 'from-yellow-100 to-amber-50', border: 'border-yellow-300', text: 'text-yellow-700' },
    { key: 'zen', emoji: '🎋', bg: 'from-teal-100 to-green-50', border: 'border-teal-300', text: 'text-teal-700' },
    { key: 'modern', emoji: '🏙️', bg: 'from-blue-100 to-cyan-50', border: 'border-blue-300', text: 'text-blue-700' },
    { key: 'royal', emoji: '👑', bg: 'from-purple-100 to-violet-50', border: 'border-purple-300', text: 'text-purple-700' },
    { key: 'rustic', emoji: '🪵', bg: 'from-stone-100 to-amber-50', border: 'border-stone-300', text: 'text-stone-700' },
];

const SAMPLE_RESULTS = [
    { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', label: 'Ghế Boho Sen' },
    { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', label: 'Đèn Mây Nghệ Thuật' },
    { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80', label: 'Nội Thất Tre' },
];

export default function HeroSection() {
    const { t, lang } = useLang();
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [activeFeature, setActiveFeature] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [generatedDesc, setGeneratedDesc] = useState(null);
    const [colorPalette, setColorPalette] = useState(null);
    const [sampleIdx, setSampleIdx] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [artisanModalOpen, setArtisanModalOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('medium');
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [selectedFinish, setSelectedFinish] = useState(null);
    const [designStudioOpen, setDesignStudioOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const t = setInterval(() => setSampleIdx(i => (i + 1) % SAMPLE_RESULTS.length), 3000);
        return () => clearInterval(t);
    }, []);

    const handleCameraCapture = async (file, localUrl) => {
        setUploading(true);
        setUploadedImage(localUrl);
        const res = await base44.integrations.Core.UploadFile({ file });
        setUploadedImageUrl(res.file_url);
        setUploading(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const localUrl = URL.createObjectURL(file);
        setUploadedImage(localUrl);
        try {
            const res = await base44.integrations.Core.UploadFile({ file });
            setUploadedImageUrl(res.file_url);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim() && !uploadedImageUrl) return;
        setGenerating(true);
        setGeneratedImage(null);
        setGeneratedDesc(null);
        setColorPalette(null);
        const styleNote = selectedStyle ? ` Phong cách: ${selectedStyle}.` : '';
        const sizeNote = selectedSize ? ` Kích thước: ${selectedSize === 'small' ? 'nhỏ (15-20cm)' : selectedSize === 'medium' ? 'vừa (25-35cm)' : 'lớn (40-60cm)'}.` : '';
        const patternNote = selectedPattern ? ` Kiểu đan: ${selectedPattern}.` : '';
        const finishNote = selectedFinish ? ` Hoàn thiện: ${selectedFinish}.` : '';
        const imageNote = uploadedImageUrl ? ' Tham khảo ảnh đính kèm để lấy cảm hứng thiết kế.' : '';
        const fullPrompt = `Bạn là chuyên gia thiết kế sản phẩm mây tre đan Phú Vinh, Việt Nam. Tạo một mô tả thiết kế chi tiết, bảng màu gợi ý và ước lượng nguyên liệu + giá cả chi tiết cho sản phẩm: "${prompt || 'sản phẩm mây tre đan'}".${styleNote}${sizeNote}${patternNote}${finishNote}${imageNote} Trả lời JSON với: description (mô tả thiết kế 3-4 câu bằng tiếng Việt), colorPalette (mảng 5 hex màu), materials (mảng 3 vật liệu chính), technique (kỹ thuật đan), materialEstimate (object chứa: items là mảng các {name, weight_kg, length_m, quantity, unit, price_per_kg_vnd (giá mỗi kg nguyên liệu tính bằng VNĐ, VD mây 80.000đ/kg, tre 50.000đ/kg, giang 30.000đ/kg, song 120.000đ/kg), item_cost_vnd (tổng chi phí vật liệu này = weight_kg * price_per_kg_vnd)}, total_weight_kg, estimated_hours, difficulty, total_material_cost_vnd (tổng chi phí nguyên liệu), labor_cost_vnd (chi phí nhân công = estimated_hours * 50.000đ/giờ), total_estimated_cost_vnd (tổng = nguyên liệu + nhân công)).`;
        // Generate image using Pollinations AI
        const safePrompt = encodeURIComponent(`Beautiful handwoven Vietnamese rattan bamboo craft product: ${prompt || 'decorative basket'}. ${selectedStyle ? selectedStyle + ' style.' : ''} Phu Vinh village artisan craftsmanship, intricate weave pattern, bright natural light, white background, luxury product photography, high detail, 4k quality`);
        const imgUrl = `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&nologo=true`;

        // Mock LLM response with dynamic details
        const mockDesc = {
            description: `Sản phẩm "${prompt || 'Giỏ mây tre đan'}" được thiết kế thủ công tinh xảo, mang hơi hướng ${selectedStyle || 'truyền thống'}. Sự kết hợp hoàn hảo giữa kỹ thuật đan lát đặc trưng của làng nghề Phú Vinh và vẻ đẹp tự nhiên của chất liệu mang đến không gian sang trọng, tinh tế.`,
            colorPalette: ['#f8e5c0', '#d4a373', '#8b5a2b', '#5c4033', '#e9edc9'],
            materials: ['Mây rừng tự nhiên', 'Tre già', 'Sợi dù'],
            technique: `Kỹ thuật đan ${selectedPattern || 'truyền thống'} với độ hoàn thiện ${selectedFinish || 'tự nhiên'} cao cấp.`,
            materialEstimate: {
                items: [
                    { name: 'Mây rừng', weight_kg: 1.5, length_m: 200, quantity: 1, unit: 'cuộn', price_per_kg_vnd: 80000, item_cost_vnd: 120000 },
                    { name: 'Tre nứa', weight_kg: 0.5, length_m: 50, quantity: 1, unit: 'bó', price_per_kg_vnd: 50000, item_cost_vnd: 25000 }
                ],
                total_weight_kg: 2,
                estimated_hours: 12,
                difficulty: 'Trung bình - Cao',
                total_material_cost_vnd: 145000,
                labor_cost_vnd: 600000,
                total_estimated_cost_vnd: 745000
            }
        };

        // Preload image to avoid broken icon while downloading
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            setGeneratedImage(imgUrl);
            setGeneratedDesc(mockDesc);
            setColorPalette(mockDesc.colorPalette);
            setGenerating(false);
        };
        img.onerror = () => {
            // Fallback if Pollinations fails
            setGeneratedImage('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80');
            setGeneratedDesc(mockDesc);
            setColorPalette(mockDesc.colorPalette);
            setGenerating(false);
        };
    };

    const handleSuggestion = (s) => {
        setPrompt(s.text);
        setSelectedStyle(s.style);
    };

    return (
        <>
            {cameraOpen && <CameraCapture onCapture={handleCameraCapture} onClose={() => setCameraOpen(false)} />}
            {artisanModalOpen && (
                <ArtisanOrderModal
                    designData={{ prompt, imageUrl: generatedImage, description: generatedDesc?.description }}
                    onClose={() => setArtisanModalOpen(false)}
                />
            )}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50/30">
                {/* Soft background blobs */}
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-200/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 z-10 text-center flex flex-col items-center max-w-4xl w-full">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary mb-5">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide">{t('hero.badge')}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 px-2">
                        {t('hero.title1')}{' '}
                        <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent italic font-serif block sm:inline">
                            {t('hero.title2')}
                        </span>{' '}
                        <span className="block sm:inline">{t('hero.title3')}</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 font-medium mb-6 max-w-xl px-2">
                        {t('hero.desc')}
                    </p>

                    {/* Feature grid — scrollable on mobile */}
                    <div className="flex gap-3 mb-6 overflow-x-auto w-full justify-start sm:justify-center pb-1 px-2 sm:flex-wrap sm:overflow-visible scrollbar-hide">
                        {FEATURES.map((feat, i) => (
                            <button key={i} onClick={() => setActiveFeature(activeFeature === i ? null : i)}
                                className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all duration-300 ${activeFeature === i ? 'scale-110' : 'opacity-80 hover:opacity-100'}`}>
                                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border
                ${activeFeature === i
                                        ? `bg-gradient-to-br ${feat.color} border-transparent shadow-lg`
                                        : 'bg-white border-green-200 shadow-sm group-hover:border-primary/40'}`}>
                                    <feat.icon className={`w-5 h-5 ${activeFeature === i ? 'text-white' : 'text-primary'}`} />
                                </div>
                                <span className={`text-xs font-medium transition-colors whitespace-nowrap ${activeFeature === i ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                                    {t(feat.labelKey)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {activeFeature !== null && (
                        <div className="mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                            ✨ {t(FEATURES[activeFeature].descKey)}
                        </div>
                    )}

                    {/* Style presets */}
                    <div className="flex flex-wrap justify-center gap-2 mb-5 px-2">
                        {STYLE_PRESETS.map((s) => (
                            <button key={s.key} onClick={() => setSelectedStyle(selectedStyle === s.key ? null : s.key)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 bg-gradient-to-r ${s.bg} ${s.border} ${s.text}
              ${selectedStyle === s.key ? 'scale-105 shadow-md ring-2 ring-primary/30' : 'hover:shadow-sm'}`}>
                                <span>{s.emoji}</span>
                                <span>{t('style.' + s.key)}</span>
                            </button>
                        ))}
                    </div>

                    {/* Size & Pattern & Finish selectors */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-green-200 shadow-sm">
                            <span className="text-xs font-semibold text-gray-500 mr-1">{t('ai.size')}</span>
                            {[{ k: 'small', l: t('ai.small') }, { k: 'medium', l: t('ai.medium') }, { k: 'large', l: t('ai.large') }].map(s => (
                                <button key={s.k} onClick={() => setSelectedSize(s.k)}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${selectedSize === s.k ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>
                                    {s.l}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-green-200 shadow-sm">
                            <span className="text-xs font-semibold text-gray-500 mr-1">{t('ai.pattern')}</span>
                            {(lang === 'vi'
                                ? [{ k: 'Đan xương cá', l: 'Xương cá' }, { k: 'Đan mắt cáo', l: 'Mắt cáo' }, { k: 'Đan nong', l: 'Nong' }, { k: 'Đan nan', l: 'Nan' }]
                                : lang === 'es'
                                    ? [{ k: 'Espina de pescado', l: 'Espina' }, { k: 'Calado', l: 'Calado' }, { k: 'Anillo', l: 'Anillo' }, { k: 'Listones', l: 'Listones' }]
                                    : lang === 'zh'
                                        ? [{ k: '人字编', l: '人字' }, { k: '镂空编', l: '镂空' }, { k: '环编', l: '环' }, { k: '条编', l: '条' }]
                                        : lang === 'ru'
                                            ? [{ k: 'Ёлочка', l: 'Ёлочка' }, { k: 'Ажурное', l: 'Ажурное' }, { k: 'Кольцо', l: 'Кольцо' }, { k: 'Планки', l: 'Планки' }]
                                            : [{ k: 'Herringbone', l: 'Herringbone' }, { k: 'Openwork', l: 'Openwork' }, { k: 'Ring weave', l: 'Ring' }, { k: 'Slats', l: 'Slats' }]
                            ).map(p => (
                                <button key={p.k} onClick={() => setSelectedPattern(selectedPattern === p.k ? null : p.k)}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${selectedPattern === p.k ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>
                                    {p.l}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-green-200 shadow-sm">
                            <span className="text-xs font-semibold text-gray-500 mr-1">{t('ai.finish')}</span>
                            {(lang === 'vi'
                                ? [{ k: 'Tự nhiên', l: 'Tự nhiên' }, { k: 'Nhuộm màu', l: 'Nhuộm' }, { k: 'Sơn mài', l: 'Sơn mài' }]
                                : lang === 'es'
                                    ? [{ k: 'Natural', l: 'Natural' }, { k: 'Teñido', l: 'Teñido' }, { k: 'Laca', l: 'Laca' }]
                                    : lang === 'zh'
                                        ? [{ k: '天然', l: '天然' }, { k: '染色', l: '染色' }, { k: '漆器', l: '漆器' }]
                                        : lang === 'ru'
                                            ? [{ k: 'Натуральный', l: 'Натур.' }, { k: 'Окрашенный', l: 'Окраш.' }, { k: 'Лак', l: 'Лак' }]
                                            : [{ k: 'Natural', l: 'Natural' }, { k: 'Dyed', l: 'Dyed' }, { k: 'Lacquer', l: 'Lacquer' }]
                            ).map(f => (
                                <button key={f.k} onClick={() => setSelectedFinish(selectedFinish === f.k ? null : f.k)}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${selectedFinish === f.k ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}>
                                    {f.l}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Upload preview */}
                    {uploadedImage && (
                        <div className="relative mb-3 w-full max-w-xs">
                            <img src={uploadedImage} alt="Ảnh tham khảo" className="w-full h-32 object-cover rounded-xl border-2 border-primary/40 shadow-md" />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded-full font-semibold">
                                {uploading ? '⏳ ' + t('splash.loading') : '✓ ' + t('ai.refImage')}
                            </div>
                            <button onClick={() => { setUploadedImage(null); setUploadedImageUrl(null); }}
                                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    {/* Input bar */}
                    <div className="w-full max-w-2xl bg-white border-2 border-green-200 rounded-2xl p-2 flex items-center gap-1 sm:gap-2 mb-4 shadow-lg shadow-green-100">
                        {/* Camera / Upload buttons */}
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        <button onClick={() => fileInputRef.current?.click()}
                            title="Tải ảnh từ máy"
                            className={`p-2 rounded-xl transition-all flex-shrink-0 ${uploadedImage ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-primary hover:bg-green-50'}`}>
                            <Upload className="w-4 h-4" />
                        </button>
                        <button onClick={() => setCameraOpen(true)}
                            title="Chụp ảnh bằng camera"
                            className="p-2 text-gray-500 hover:text-primary hover:bg-green-50 rounded-xl transition-colors flex-shrink-0">
                            <Video className="w-4 h-4" />
                        </button>
                        <input value={prompt} onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                            type="text"
                            placeholder={uploadedImage ? t('hero.placeholder') : t('hero.placeholder')}
                            className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 text-sm outline-none px-1 min-w-0 font-medium"
                        />
                        {prompt && (
                            <button onClick={() => setPrompt('')} className="p-1 text-gray-400 hover:text-gray-700 flex-shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <button onClick={handleGenerate} disabled={generating || (!prompt.trim() && !uploadedImageUrl)}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-emerald-600 text-white px-3 sm:px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all text-xs sm:text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0">
                            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            <span className="hidden sm:inline">{generating ? t('hero.generating') : t('hero.generate')}</span>
                            <span className="sm:hidden">{generating ? '...' : t('hero.generate')}</span>
                        </button>
                    </div>

                    {/* Upload hint */}
                    <p className="text-xs text-gray-500 mb-5 flex items-center gap-1.5">
                        <Camera className="w-3 h-3 text-primary" />
                        {t('ai.hint')}
                    </p>

                    {/* Suggestions */}
                    <div className="text-center mb-8 w-full">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">{t('hero.suggestions')}</p>
                        <div className="flex flex-wrap justify-center gap-2 px-2">
                            {SUGGESTIONS.map((s, i) => (
                                <button key={i} onClick={() => handleSuggestion(s)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 text-sm font-medium text-gray-700 hover:text-primary hover:border-primary/40 hover:bg-green-50 transition-all duration-200 shadow-sm">
                                    <span>{s.icon}</span>
                                    <span className="hidden sm:inline">{s.text}</span>
                                    <span className="sm:hidden">{s.text.split(' ').slice(0, 2).join(' ')}</span>
                                    <span className="text-xs text-primary/60 font-normal">· {s.style}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Result panel */}
                    {(generating || generatedImage) && (
                        <div className="w-full max-w-3xl rounded-2xl border-2 border-green-200 bg-white overflow-hidden shadow-2xl shadow-green-100 mb-8">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-green-100 bg-gradient-to-r from-primary/10 to-transparent">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs text-gray-600 font-medium ml-2 truncate">{t('ai.result')} · {prompt || t('ai.refImage')}</span>
                                {generatedImage && (
                                    <a href={generatedImage} download className="ml-auto p-1.5 text-gray-500 hover:text-primary transition-colors">
                                        <Download className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-0">
                                <div className="aspect-square bg-green-50 flex items-center justify-center relative overflow-hidden">
                                    {generating && !generatedImage && (
                                        <div className="flex flex-col items-center gap-3 text-gray-500">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                                <Sparkles className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
                                            </div>
                                            <p className="text-sm font-medium animate-pulse">{t('ai.generating')}</p>
                                        </div>
                                    )}
                                    {generatedImage && (
                                        <img src={generatedImage} alt="AI Generated" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="p-5 space-y-4">
                                    {generating && !generatedDesc && (
                                        <div className="space-y-2 animate-pulse">
                                            {[80, 60, 90, 50].map((w, i) => (
                                                <div key={i} className="h-3 bg-green-100 rounded" style={{ width: `${w}%` }} />
                                            ))}
                                        </div>
                                    )}
                                    {generatedDesc && (
                                        <>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                                                    <Sparkles className="w-3 h-3" /> {t('ai.desc')}
                                                </h4>
                                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{generatedDesc.description}</p>
                                            </div>
                                            {generatedDesc.materials && (
                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">🪵 {t('ai.materials')}</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {generatedDesc.materials.map((m, i) => (
                                                            <span key={i} className="px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-700 font-medium">{m}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {generatedDesc.technique && (
                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">🎨 {t('ai.technique')}</h4>
                                                    <p className="text-xs text-gray-700 font-medium">{generatedDesc.technique}</p>
                                                </div>
                                            )}
                                            {generatedDesc?.materialEstimate && (
                                                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                                                        📦 {t('ai.estimate')}
                                                    </h4>
                                                    <div className="space-y-1.5">
                                                        {generatedDesc.materialEstimate.items?.map((m, i) => (
                                                            <div key={i} className="flex items-center justify-between text-xs">
                                                                <span className="text-gray-700 font-medium">{m.name}</span>
                                                                <span className="text-gray-500">
                                                                    {m.weight_kg > 0 && `${m.weight_kg}kg`}
                                                                    {m.price_per_kg_vnd > 0 && ` @ ${m.price_per_kg_vnd.toLocaleString('vi-VN')}đ/kg`}
                                                                    {m.item_cost_vnd > 0 && ` → ${(m.item_cost_vnd).toLocaleString('vi-VN')}đ`}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-between text-xs font-bold">
                                                        <span className="text-emerald-700">{t('ai.totalWeight')}: {generatedDesc.materialEstimate.total_weight_kg}kg</span>
                                                        <span className="text-emerald-700">⏱ {t('ai.estTime')}: {generatedDesc.materialEstimate.estimated_hours}h</span>
                                                    </div>
                                                    {generatedDesc.materialEstimate.difficulty && (
                                                        <div className="mt-1 text-xs text-gray-500">{t('ai.difficulty')}: {generatedDesc.materialEstimate.difficulty}</div>
                                                    )}
                                                    {generatedDesc.materialEstimate.total_estimated_cost_vnd > 0 && (
                                                        <div className="mt-2 pt-2 border-t border-emerald-200 space-y-1">
                                                            {generatedDesc.materialEstimate.total_material_cost_vnd > 0 && (
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="text-gray-600">{t('ai.materialCost') || 'Chi phí nguyên liệu'}</span>
                                                                    <span className="text-emerald-700 font-semibold">{generatedDesc.materialEstimate.total_material_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                                </div>
                                                            )}
                                                            {generatedDesc.materialEstimate.labor_cost_vnd > 0 && (
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="text-gray-600">{t('ai.laborCost') || 'Chi phí nhân công'}</span>
                                                                    <span className="text-emerald-700 font-semibold">{generatedDesc.materialEstimate.labor_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-between text-sm font-bold pt-1 border-t border-emerald-200">
                                                                <span className="text-emerald-700">{t('ai.totalCost') || 'Tổng chi phí dự kiến'}</span>
                                                                <span className="text-emerald-600 text-base">{generatedDesc.materialEstimate.total_estimated_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {colorPalette && (
                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2">🎨 {t('ai.colorPalette')}</h4>
                                                    <div className="flex gap-2">
                                                        {colorPalette.map((hex, i) => (
                                                            <div key={i} title={hex} className="flex-1 h-8 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                                                                style={{ backgroundColor: hex }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <button onClick={() => setDesignStudioOpen(true)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all mb-2">
                                                <Palette className="w-4 h-4" /> {t('ai.studio')}
                                            </button>
                                            <AIDesignEditor
                                                design={{ prompt, colorPalette, style: selectedStyle, size: selectedSize, pattern: selectedPattern, finish: selectedFinish }}
                                                onRegenerate={(settings) => {
                                                    if (settings.prompt) setPrompt(settings.prompt);
                                                    if (settings.style) setSelectedStyle(settings.style);
                                                    if (settings.size) setSelectedSize(settings.size);
                                                    if (settings.pattern) setSelectedPattern(settings.pattern);
                                                    if (settings.finish) setSelectedFinish(settings.finish);
                                                    setTimeout(() => handleGenerate(), 100);
                                                }}
                                                loading={generating}
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={handleGenerate}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-all">
                                                    <RefreshCw className="w-3.5 h-3.5" /> {t('ai.regenerate')}
                                                </button>
                                                <button onClick={() => setArtisanModalOpen(true)}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all shadow-md">
                                                    <Users className="w-3.5 h-3.5" /> {t('ai.orderArtisan')}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sample gallery when idle */}
                    {!generatedImage && !generating && (
                        <div className="w-full max-w-2xl relative h-40 sm:h-48 mb-4 rounded-2xl overflow-hidden border-2 border-green-100 shadow-sm">
                            {SAMPLE_RESULTS.map((r, i) => (
                                <img key={i} src={r.src} alt={r.label}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === sampleIdx ? 'opacity-40' : 'opacity-0'}`} />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent flex items-end justify-center pb-4">
                                <p className="text-xs text-gray-600 font-semibold flex items-center gap-2">
                                    <ImageIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
                                    {t('ai.startHint')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {designStudioOpen && (
                <DesignStudio
                    design={{ prompt, colorPalette, style: selectedStyle, size: selectedSize, pattern: selectedPattern, finish: selectedFinish }}
                    generatedImage={generatedImage}
                    generatedDesc={generatedDesc}
                    onRegenerate={(settings) => {
                        if (settings.prompt) setPrompt(settings.prompt);
                        if (settings.style) setSelectedStyle(settings.style);
                        if (settings.size) setSelectedSize(settings.size);
                        if (settings.pattern) setSelectedPattern(settings.pattern);
                        if (settings.finish) setSelectedFinish(settings.finish);
                        setTimeout(() => handleGenerate(), 100);
                    }}
                    onClose={() => setDesignStudioOpen(false)}
                    loading={generating}
                />
            )}
        </>
    );
}