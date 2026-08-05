import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MapPin, Navigation, Compass, Play, X, Loader2, Camera, Maximize2, RotateCcw } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

// Real Phú Vinh village locations with actual coordinates
const VR_SPOTS = [
    {
        id: 1, name_vi: 'Cổng Làng Phú Vinh', name_en: 'Village Gate', name_es: 'Puerta del Pueblo', name_zh: '村庄大门', name_ru: 'Ворота деревни',
        subtitle_vi: 'Cổng vào làng nghề', subtitle_en: 'Village entrance gate',
        emoji: '🚪', lat: 20.8795, lng: 105.6532,
        image: 'https://images.unsplash.com/photo-1753939846442-bc1691f70c5f?w=2400&q=80',
        desc_vi: 'Cổng làng truyền thống với kiến trúc gỗ lim, nơi bắt đầu hành trình khám phá 400 năm lịch sử đan lát mây tre Phú Vinh.',
        desc_en: 'Traditional village gate with ironwood architecture, the starting point of a 400-year journey through Phú Vinh\'s bamboo weaving heritage.',
        desc_es: 'Puerta tradicional del pueblo con arquitectura de madera, el punto de partida de un viaje de 400 años por el patrimonio textil de bambú de Phú Vinh.',
        desc_zh: '传统村庄大门，铁木建筑，是探索富荣400年竹藤编织传承之旅的起点。',
        desc_ru: 'Традиционные ворота деревни с железным деревом — начало 400-летнего путешествия по бамбуковому наследию Phú Vinh.',
        hasStreetView: true,
    },
    {
        id: 2, name_vi: 'Xưởng Đan Nghệ Nhân', name_en: 'Weaving Workshop', name_es: 'Taller de Tejido', name_zh: '编织工坊', name_ru: 'Мастерская плетения',
        subtitle_vi: 'Nơi nghệ nhân làm việc', subtitle_en: 'Where artisans work',
        emoji: '🧺', lat: 20.8801, lng: 105.6541,
        image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=2400&q=80',
        desc_vi: 'Nghệ nhân đang thực hiện kỹ thuật đan xương cá tinh xảo — mỗi sợi mây đều được chọn lọc và xử lý thủ công.',
        desc_en: 'Artisans performing the intricate herringbone weave — every rattan fiber is carefully selected and hand-processed.',
        desc_es: 'Artesanos realizando el intrincado tejido de espina de pescado — cada fibra de ratán se selecciona y procesa a mano.',
        desc_zh: '工匠正在进行精细的人字编织 — 每根藤条都经过精心挑选和手工处理。',
        desc_ru: 'Мастера выполняют сложное плетение «ёлочка» — каждое волокно ротанга отбирается и обрабатывается вручную.',
        hasStreetView: true,
    },
    {
        id: 3, name_vi: 'Showroom Sản Phẩm', name_en: 'Product Showroom', name_es: 'Showroom de Productos', name_zh: '产品展示厅', name_ru: 'Шоурум продуктов',
        subtitle_vi: 'Trưng bày sản phẩm', subtitle_en: 'Product display',
        emoji: '🏺', lat: 20.8788, lng: 105.6525,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=2400&q=80',
        desc_vi: 'Trưng bày hàng trăm sản phẩm từ rổ, rá, giỏ đến đồ trang trí cao cấp — những kiệt tác được xuất khẩu đi 50+ quốc gia.',
        desc_en: 'Displaying hundreds of products from baskets to premium decor — masterpieces exported to 50+ countries.',
        desc_es: 'Exhibiendo cientos de productos desde cestas hasta decoración premium — obras maestras exportadas a más de 50 países.',
        desc_zh: '展示数百种产品，从篮子到高级装饰 — 出口至50多个国家的杰作。',
        desc_ru: 'Сотни изделий — от корзин до премиального декора — шедевры, экспортируемые в 50+ стран.',
        hasStreetView: true,
    },
    {
        id: 4, name_vi: 'Vườn Tre Nguyên Liệu', name_en: 'Bamboo Garden', name_es: 'Jardín de Bambú', name_zh: '原料竹林', name_ru: 'Бамбуковый сад',
        subtitle_vi: 'Vườn nguyên liệu', subtitle_en: 'Raw material garden',
        emoji: '🎋', lat: 20.8812, lng: 105.6558,
        image: 'https://images.unsplash.com/photo-1777958337331-4631084d67a5?w=2400&q=80',
        desc_vi: 'Vườn tre mây cung cấp nguyên liệu tự nhiên — nguồn sống của cả làng nghề, được trồng và chăm sóc bền vững.',
        desc_en: 'Bamboo and rattan garden providing natural materials — the village\'s lifeblood, sustainably grown and maintained.',
        desc_es: 'Jardín de bambú y ratán que proporciona materiales naturales — el sustento del pueblo, cultivado de forma sostenible.',
        desc_zh: '竹藤花园提供天然材料 — 村庄的生命线，可持续种植和维护。',
        desc_ru: 'Бамбуковый сад с ротангом — источник природных материалов, жизнь деревни, выращиваемый устойчиво.',
        hasStreetView: true,
    },
    {
        id: 5, name_vi: 'Chợ Làng Phú Vinh', name_en: 'Village Market', name_es: 'Mercado del Pueblo', name_zh: '村庄市场', name_ru: 'Деревенский рынок',
        subtitle_vi: 'Chợ địa phương', subtitle_en: 'Local market',
        emoji: '🏪', lat: 20.8799, lng: 105.6538,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=2400&q=80',
        desc_vi: 'Chợ làng Phú Vinh — nơi giao thương sản phẩm mây tre đan và nông sản địa phương, nhịp sống đời thường của người dân.',
        desc_en: 'Phú Vinh village market — where bamboo crafts and local produce are traded, the daily rhythm of village life.',
        desc_es: 'Mercado del pueblo de Phú Vinh — donde se comercian artesanías de bambú y productos locales.',
        desc_zh: '富荣村市场 — 竹藤工艺品和当地农产品的交易场所，村民的日常生活。',
        desc_ru: 'Деревенский рынок Phú Vinh — место торговли бамбуковыми изделиями и местными продуктами.',
        hasStreetView: true,
    },
    {
        id: 6, name_vi: 'Đình Làng Phú Vinh', name_en: 'Village Communal House', name_es: 'Casa Comunal del Pueblo', name_zh: '村庄公祠', name_ru: 'Общинный дом деревни',
        subtitle_vi: 'Di tích văn hóa', subtitle_en: 'Cultural heritage',
        emoji: '⛩️', lat: 20.8793, lng: 105.6535,
        image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad63628?w=2400&q=80',
        desc_vi: 'Đình làng Phú Vinh — di tích văn hóa tâm linh, nơi lưu giữ hương hỏa và tổ chức lễ hội truyền thống của làng nghề.',
        desc_en: 'Phú Vinh communal house — spiritual cultural heritage, preserving ancestral worship and hosting traditional village festivals.',
        desc_es: 'Casa comunal de Phú Vinh — patrimonio espiritual, preservando el culto ancestral y festivales tradicionales.',
        desc_zh: '富荣公祠 — 精神文化遗产，保存祖先祭祀和举办传统村节。',
        desc_ru: 'Общинный дом Phú Vinh — духовное наследие, сохраняющее культ предков и традиционные праздники.',
        hasStreetView: true,
    },
];

export default function VRMapSection() {
    const { t, lang } = useLang();
    const [activeSpot, setActiveSpot] = useState(null);
    const [selectedSpotId, setSelectedSpotId] = useState(null);
    const [spotLoading, setSpotLoading] = useState(null);
    const [streetViewMode, setStreetViewMode] = useState(false);
    const [streetViewError, setStreetViewError] = useState(false);
    const iframeRef = useRef(null);

    const spotName = (s) => s[`name_${lang}`] || s.name_en;
    const spotDesc = (s) => s[`desc_${lang}`] || s.desc_en;
    const spotSubtitle = (s) => s[`subtitle_${lang}`] || s.subtitle_en;

    // Sync: clicking a spot in the list selects it on the map
    const handleSpotClick = useCallback((spot) => {
        setSelectedSpotId(spot.id);
        setSpotLoading(spot.id);
        setStreetViewError(false);
        // Open VR viewer after brief loading
        setTimeout(() => {
            setSpotLoading(null);
            setActiveSpot(spot);
        }, 500);
    }, []);

    // Build Street View embed URL
    const getStreetViewUrl = (spot) => {
        return `https://www.google.com/maps/embed?pb=!1m5!1m4!1i0!2i0!3i0!4i0!6m2!1m1!1s!2m2!1s${spot.lat}!2s${spot.lng}!3m2!1sen!2sus!4m2!1sen!2sus`;
    };

    const mapSrc = `https://maps.google.com/maps?q=Phu%20Vinh%20village%20Chuong%20My%20Hanoi&t=&z=14&ie=UTF8&iwloc=&output=embed`;

    // Simple fallback: use Google Maps Street View embed via iframe with location params
    const getStreetViewEmbed = (spot) => {
        return `https://maps.google.com/maps?q=${spot.lat},${spot.lng}&z=16&layer=c&cbll=${spot.lat},${spot.lng}&cbp=11,0,,0,0&output=embed`;
    };

    return (
        <section id="vr-tour" className="py-24 relative bg-gradient-to-b from-emerald-50/40 via-background to-background overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-4">
                        <Compass className="w-3.5 h-3.5" /> {t('vr.badge')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                        {t('vr.title')} <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('vr.titleAccent')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t('vr.desc')}</p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {/* Map */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        className="lg:col-span-3 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/10 bg-card">
                        <div className="px-5 py-3 bg-gradient-to-r from-primary/10 to-transparent border-b border-border/50 flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-foreground">{t('vr.location')}</span>
                            <span className="ml-auto text-xs text-muted-foreground">20.88°N, 105.65°E</span>
                        </div>
                        <div className="relative aspect-video sm:aspect-[4/3]">
                            <iframe title="Phú Vinh Village Map" src={mapSrc}
                                className="absolute inset-0 w-full h-full grayscale-[20%]" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            {/* Spot markers overlay */}
                            {VR_SPOTS.map(spot => (
                                <button key={spot.id}
                                    onClick={() => handleSpotClick(spot)}
                                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all hover:scale-125 ${selectedSpotId === spot.id ? 'bg-primary text-white ring-4 ring-primary/30 scale-125 z-20' : 'bg-white/90 text-primary border-2 border-primary/40 z-10'}`}
                                    style={{ left: `${15 + (spot.id - 1) * 12}%`, top: `${35 + (spot.id % 3) * 15}%` }}>
                                    {spot.emoji}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Spot list (synced with map) */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{t('vr.spots')} ({VR_SPOTS.length})</h3>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto space-y-2 scrollbar-hide pr-1">
                            {VR_SPOTS.map((spot, i) => (
                                <motion.button key={spot.id}
                                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    onClick={() => handleSpotClick(spot)}
                                    className={`group w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${selectedSpotId === spot.id ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-border hover:border-primary/40 bg-card'}`}>
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                        {spotLoading === spot.id ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                            </div>
                                        ) : (
                                            <img src={spot.image} alt={spotName(spot)} loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        )}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play className="w-4 h-4 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-base">{spot.emoji}</span>
                                            <h4 className={`font-bold text-sm truncate ${selectedSpotId === spot.id ? 'text-primary' : 'text-foreground'}`}>{spotName(spot)}</h4>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{spotSubtitle(spot)}</p>
                                    </div>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 flex items-center gap-1 ${selectedSpotId === spot.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                                        <Camera className="w-2.5 h-2.5" /> 360°
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { icon: MapPin, value: String(VR_SPOTS.length), label: t('vr.stats1') },
                        { icon: Compass, value: '360°', label: t('vr.stats2') },
                        { icon: Eye, value: 'HD', label: t('vr.stats3') },
                        { icon: Navigation, value: '35km', label: t('vr.stats4') },
                    ].map((s, i) => (
                        <div key={i} className="text-center p-4 rounded-2xl bg-card border border-border">
                            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-xl font-bold text-foreground">{s.value}</p>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* VR Viewer Modal */}
            <AnimatePresence>
                {activeSpot && (
                    <motion.div
                        className="fixed inset-0 z-[400] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => { setActiveSpot(null); setStreetViewMode(false); }}>
                        <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                            className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}>
                            {/* Header */}
                            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent px-5 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">{activeSpot.emoji}</div>
                                    <div>
                                        <h3 className="font-bold text-base">{spotName(activeSpot)}</h3>
                                        <p className="text-white/60 text-xs flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {activeSpot.lat.toFixed(4)}°N, {activeSpot.lng.toFixed(4)}°E
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setStreetViewMode(!streetViewMode)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold backdrop-blur transition-colors flex items-center gap-1.5 ${streetViewMode ? 'bg-primary text-white' : 'bg-white/15 text-white hover:bg-white/25'}`}>
                                        <Camera className="w-3.5 h-3.5" /> {streetViewMode ? 'Panorama' : 'Street View'}
                                    </button>
                                    <button onClick={() => { setActiveSpot(null); setStreetViewMode(false); }}
                                        className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-red-500/60 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Viewer */}
                            <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-gray-900">
                                {streetViewMode ? (
                                    // Google Street View iframe
                                    streetViewError ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/60">
                                            <Camera className="w-12 h-12 opacity-30" />
                                            <p className="text-sm">{lang === 'vi' ? 'Street View chưa có tại địa điểm này' : 'Street View not available at this location'}</p>
                                            <button onClick={() => setStreetViewMode(false)} className="px-4 py-2 rounded-xl bg-white/15 text-white text-sm font-semibold hover:bg-white/25">{lang === 'vi' ? 'Xem ảnh panorama' : 'View panorama'}</button>
                                        </div>
                                    ) : (
                                        <iframe
                                            title={`Street View: ${spotName(activeSpot)}`}
                                            src={getStreetViewEmbed(activeSpot)}
                                            className="absolute inset-0 w-full h-full"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            referrerPolicy="no-referrer-when-downgrade"
                                            onError={() => setStreetViewError(true)}
                                        />
                                    )
                                ) : (
                                    // Panorama image viewer
                                    <PanoramaImage image={activeSpot.image} name={spotName(activeSpot)} desc={spotDesc(activeSpot)} />
                                )}
                            </div>

                            {/* Description */}
                            <div className="px-5 py-4 bg-gradient-to-r from-primary via-emerald-600 to-teal-600 text-white relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
                                <div className="relative flex items-start gap-3">
                                    <Compass className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
                                    <p className="text-sm leading-relaxed">{spotDesc(activeSpot)}</p>
                                </div>
                            </div>

                            {/* Spot navigation dots */}
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {VR_SPOTS.map(s => (
                                    <button key={s.id} onClick={() => { handleSpotClick(s); setStreetViewMode(false); }}
                                        className={`w-2 h-2 rounded-full transition-all ${s.id === activeSpot.id ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'}`} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// Inline panorama image viewer with drag-to-pan
function PanoramaImage({ image, name, desc }) {
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const offsetRef = useRef(0);
    const dragData = useRef({ startX: 0, startOffset: 0 });

    const startDrag = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        dragData.current = { startX: x, startOffset: offsetRef.current };
        setDragging(true);
    };

    const onMove = (e) => {
        if (!dragging) return;
        if (e.cancelable) e.preventDefault();
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        offsetRef.current = dragData.current.startOffset + (x - dragData.current.startX);
        setOffset(offsetRef.current);
    };

    const endDrag = () => setDragging(false);

    return (
        <div
            className={`relative w-full h-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `auto ${zoom * 100}%`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${-offset}px center`,
            }}
            onMouseDown={startDrag} onMouseMove={onMove} onMouseUp={endDrag} onMouseLeave={endDrag}
            onTouchStart={startDrag} onTouchMove={onMove} onTouchEnd={endDrag}
        >
            {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 border-r-green-400/50 animate-spin" />
                        <Compass className="absolute inset-0 m-auto w-6 h-6 text-white/60 animate-pulse" />
                    </div>
                    <p className="text-white/50 text-xs font-medium animate-pulse">Loading 360°...</p>
                </div>
            )}
            <img src={image} alt="" className="hidden" onLoad={() => setLoaded(true)} />

            {/* Controls */}
            {loaded && (
                <>
                    <div className="absolute top-16 right-4 z-10 flex flex-col gap-1.5">
                        <button onClick={() => setZoom(z => Math.min(2.5, +(z + 0.25).toFixed(2)))} className="p-2 rounded-lg bg-black/50 backdrop-blur text-white hover:bg-black/70">+</button>
                        <button onClick={() => setZoom(z => Math.max(1, +(z - 0.25).toFixed(2)))} className="p-2 rounded-lg bg-black/50 backdrop-blur text-white hover:bg-black/70">−</button>
                        <button onClick={() => { setOffset(0); setZoom(1); offsetRef.current = 0; }} className="p-2 rounded-lg bg-black/50 backdrop-blur text-white hover:bg-black/70"><RotateCcw className="w-4 h-4" /></button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white text-xs">
                        <Compass className={`w-3.5 h-3.5 ${dragging ? 'animate-spin' : 'animate-pulse'}`} />
                        <span>{dragging ? (document.documentElement.lang === 'vi' ? 'Đang xoay...' : 'Rotating...') : (document.documentElement.lang === 'vi' ? 'Kéo để khám phá 360°' : 'Drag to explore 360°')}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 z-10 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-white/70 text-[10px] font-medium">
                        🔍 {Math.round(zoom * 100)}%
                    </div>
                </>
            )}
        </div>
    );
}