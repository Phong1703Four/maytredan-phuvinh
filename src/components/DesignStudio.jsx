import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, Download, Users, Ruler, Grid, Paintbrush, Palette, Sparkles, ZoomIn, ZoomOut, Image as ImageIcon, Package, Box, Coins } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import Product3DViewer from './Product3DViewer';

const STYLES = [
    { label: 'Boho', emoji: '🌿' }, { label: 'Luxury', emoji: '✨' }, { label: 'Zen', emoji: '🎋' },
    { label: 'Modern', emoji: '🏙️' }, { label: 'Royal', emoji: '👑' }, { label: 'Rustic', emoji: '🪵' },
];

const SIZES_VI = [{ k: 'small', l: 'Nhỏ (15-20cm)' }, { k: 'medium', l: 'Vừa (25-35cm)' }, { k: 'large', l: 'Lớn (40-60cm)' }];
const SIZES_EN = [{ k: 'small', l: 'Small (15-20cm)' }, { k: 'medium', l: 'Medium (25-35cm)' }, { k: 'large', l: 'Large (40-60cm)' }];

const PATTERNS_VI = [{ k: 'Đan xương cá', l: 'Xương cá' }, { k: 'Đan mắt cáo', l: 'Mắt cáo' }, { k: 'Đan nong', l: 'Nong' }, { k: 'Đan nan', l: 'Nan' }];
const PATTERNS_EN = [{ k: 'Herringbone', l: 'Herringbone' }, { k: 'Openwork', l: 'Openwork' }, { k: 'Ring weave', l: 'Ring' }, { k: 'Slats', l: 'Slats' }];

const FINISHES_VI = [{ k: 'Tự nhiên', l: 'Tự nhiên' }, { k: 'Nhuộm màu', l: 'Nhuộm' }, { k: 'Sơn mài', l: 'Sơn mài' }];
const FINISHES_EN = [{ k: 'Natural', l: 'Natural' }, { k: 'Dyed', l: 'Dyed' }, { k: 'Lacquer', l: 'Lacquer' }];

const MATERIALS_VI = ['Mây', 'Tre', 'Nứa', 'Giang', 'Song', 'Tre nhuộm'];
const MATERIALS_EN = ['Rattan', 'Bamboo', 'Cane', 'Reed', 'Calamus', 'Dyed bamboo'];

const COLOR_SWATCHES = ['#8B4513', '#D2691E', '#DEB887', '#F5DEB3', '#A0522D', '#6B8E23', '#556B2F', '#DAA520', '#CD853F', '#FFFFFF'];

const TABS_VI = [{ k: 'design', l: 'Thiết kế', icon: Palette }, { k: 'materials', l: 'Vật liệu', icon: Package }, { k: 'colors', l: 'Màu sắc', icon: Sparkles }, { k: '3d', l: '3D', icon: Box }, { k: 'pricing', l: 'Chi phí', icon: Coins }];
const TABS_EN = [{ k: 'design', l: 'Design', icon: Palette }, { k: 'materials', l: 'Materials', icon: Package }, { k: 'colors', l: 'Colors', icon: Sparkles }, { k: '3d', l: '3D', icon: Box }, { k: 'pricing', l: 'Pricing', icon: Coins }];

export default function DesignStudio({ design, generatedImage, generatedDesc, onRegenerate, onClose, loading }) {
    const { lang, t } = useLang();
    const [activeTab, setActiveTab] = useState('design');
    const [promptEdit, setPromptEdit] = useState(design?.prompt || '');
    const [style, setStyle] = useState(design?.style || null);
    const [size, setSize] = useState(design?.size || 'medium');
    const [pattern, setPattern] = useState(design?.pattern || null);
    const [finish, setFinish] = useState(design?.finish || null);
    const [materials, setMaterials] = useState([]);
    const [accentColor, setAccentColor] = useState(null);
    const [zoom, setZoom] = useState(1);

    const SIZES = lang === 'vi' ? SIZES_VI : SIZES_EN;
    const PATTERNS = lang === 'vi' ? PATTERNS_VI : PATTERNS_EN;
    const FINISHES = lang === 'vi' ? FINISHES_VI : FINISHES_EN;
    const MATERIALS = lang === 'vi' ? MATERIALS_VI : MATERIALS_EN;
    const TABS = lang === 'vi' ? TABS_VI : TABS_EN;

    const toggleMaterial = (m) => setMaterials(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

    const handleApply = () => {
        let newPrompt = promptEdit || '';
        if (style) newPrompt += ` Phong cách: ${style}.`;
        const sz = SIZES.find(s => s.k === size);
        if (sz) newPrompt += ` Kích thước: ${sz.l}.`;
        if (pattern) newPrompt += ` Kiểu đan: ${pattern}.`;
        if (finish) newPrompt += ` Hoàn thiện: ${finish}.`;
        if (materials.length) newPrompt += ` Vật liệu: ${materials.join(', ')}.`;
        if (accentColor) newPrompt += ` Màu nhấn: ${accentColor}.`;
        onRegenerate({ prompt: newPrompt, style, size, pattern, finish });
    };

    return (
        <motion.div className="fixed inset-0 z-[500] flex flex-col bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative w-full h-full max-w-7xl mx-auto bg-card rounded-none md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center"><Palette className="w-5 h-5" /></div>
                        <div>
                            <h2 className="font-bold text-base leading-tight">Design Studio</h2>
                            <p className="text-white/70 text-xs">{lang === 'vi' ? 'Chỉnh sửa thiết kế chi tiết' : 'Detailed design editor'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {generatedImage && (
                            <a href={generatedImage} download className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors">
                                <Download className="w-3.5 h-3.5" /> {t('studio.download')}
                            </a>
                        )}
                        <button onClick={onClose} className="p-2 rounded-xl bg-white/20 hover:bg-red-500/60 transition-colors"><X className="w-4 h-4 text-white" /></button>
                    </div>
                </div>

                {/* Left: Image preview */}
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-muted/50 to-background p-4 pt-16 md:pt-4 min-h-0">
                    {generatedImage ? (
                        <>
                            <div className="relative max-w-full max-h-full overflow-hidden rounded-2xl shadow-2xl">
                                <img src={generatedImage} alt="Design" className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain"
                                    style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }} />
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <button onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                                    className="p-2 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"><ZoomOut className="w-4 h-4" /></button>
                                <span className="text-sm font-semibold text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
                                <button onClick={() => setZoom(z => Math.min(3, +(z + 0.1).toFixed(2)))}
                                    className="p-2 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"><ZoomIn className="w-4 h-4" /></button>
                                <button onClick={() => setZoom(1)}
                                    className="px-3 py-2 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors text-xs font-medium text-muted-foreground">{lang === 'vi' ? 'Vừa' : 'Fit'}</button>
                            </div>
                            {generatedDesc?.description && (
                                <p className="text-xs text-muted-foreground text-center mt-3 max-w-md leading-relaxed">{generatedDesc.description}</p>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">{lang === 'vi' ? 'Chưa có hình ảnh. Hãy tạo thiết kế trước.' : 'No image yet. Generate a design first.'}</p>
                        </div>
                    )}
                </div>

                {/* Right: Editing controls */}
                <div className="w-full md:w-96 flex flex-col bg-card border-l border-border max-h-[50vh] md:max-h-none">
                    {/* Tabs */}
                    <div className="flex border-b border-border pt-14 md:pt-0 flex-shrink-0">
                        {TABS.map(tab => (
                            <button key={tab.k} onClick={() => setActiveTab(tab.k)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-colors ${activeTab === tab.k ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50/50' : 'text-muted-foreground hover:text-foreground'}`}>
                                <tab.icon className="w-3.5 h-3.5" /> {tab.l}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activeTab === 'design' && (
                            <>
                                <div>
                                    <label className="text-xs font-bold text-violet-600 mb-1.5 block">{t('ai.desc')}</label>
                                    <textarea value={promptEdit} onChange={e => setPromptEdit(e.target.value)} rows={3}
                                        placeholder={lang === 'vi' ? 'Mô tả sản phẩm...' : 'Product description...'}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-violet-200 text-sm outline-none focus:border-violet-400 resize-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-violet-600 mb-2 block">{lang === 'vi' ? 'Phong cách' : 'Style'}</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {STYLES.map(s => (
                                            <button key={s.label} onClick={() => setStyle(style === s.label ? null : s.label)}
                                                className={`flex flex-col items-center gap-1 py-2 rounded-xl border text-xs font-semibold transition-all ${style === s.label ? 'bg-violet-500 text-white border-violet-500' : 'bg-background border-violet-200 text-violet-600 hover:bg-violet-50'}`}>
                                                <span className="text-lg">{s.emoji}</span> {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-cyan-600 mb-2 flex items-center gap-1"><Ruler className="w-3 h-3" /> {t('ai.size')}</label>
                                    <div className="flex gap-2">
                                        {SIZES.map(s => (
                                            <button key={s.k} onClick={() => setSize(s.k)}
                                                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${size === s.k ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-background border-cyan-200 text-cyan-600 hover:bg-cyan-50'}`}>{s.l}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-teal-600 mb-2 flex items-center gap-1"><Grid className="w-3 h-3" /> {t('ai.pattern')}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PATTERNS.map(p => (
                                            <button key={p.k} onClick={() => setPattern(pattern === p.k ? null : p.k)}
                                                className={`py-2 rounded-xl border text-xs font-semibold transition-all ${pattern === p.k ? 'bg-teal-500 text-white border-teal-500' : 'bg-background border-teal-200 text-teal-600 hover:bg-teal-50'}`}>{p.l}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-rose-600 mb-2 flex items-center gap-1"><Paintbrush className="w-3 h-3" /> {t('ai.finish')}</label>
                                    <div className="flex gap-2">
                                        {FINISHES.map(f => (
                                            <button key={f.k} onClick={() => setFinish(finish === f.k ? null : f.k)}
                                                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${finish === f.k ? 'bg-rose-500 text-white border-rose-500' : 'bg-background border-rose-200 text-rose-600 hover:bg-rose-50'}`}>{f.l}</button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'materials' && (
                            <>
                                <div>
                                    <label className="text-xs font-bold text-amber-600 mb-2 block">{t('ai.materials')}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {MATERIALS.map(m => (
                                            <button key={m} onClick={() => toggleMaterial(m)}
                                                className={`py-2 rounded-xl border text-xs font-semibold transition-all ${materials.includes(m) ? 'bg-amber-500 text-white border-amber-500' : 'bg-background border-amber-200 text-amber-600 hover:bg-amber-50'}`}>{m}</button>
                                        ))}
                                    </div>
                                </div>
                                {generatedDesc?.materialEstimate && (
                                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <h4 className="text-xs font-bold text-emerald-600 mb-2 flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> {t('ai.estimate')}</h4>
                                        <div className="space-y-1.5">
                                            {generatedDesc.materialEstimate.items?.map((m, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs">
                                                    <span className="text-foreground font-medium">{m.name}</span>
                                                    <span className="text-muted-foreground">
                                                        {m.quantity > 0 && `${m.quantity} ${m.unit || (lang === 'vi' ? 'cái' : 'pcs')}`}
                                                        {m.weight_kg > 0 && ` · ${m.weight_kg}kg`}
                                                        {m.length_m > 0 && ` · ${m.length_m}m`}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-between text-xs font-bold">
                                            <span className="text-emerald-700">{t('ai.totalWeight')}: {generatedDesc.materialEstimate.total_weight_kg}kg</span>
                                            <span className="text-emerald-700">⏱ {generatedDesc.materialEstimate.estimated_hours}h</span>
                                        </div>
                                    </div>
                                )}
                                {generatedDesc?.technique && (
                                    <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                                        <h4 className="text-xs font-bold text-teal-600 mb-1">🎨 {t('ai.technique')}</h4>
                                        <p className="text-xs text-foreground font-medium">{generatedDesc.technique}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'colors' && (
                            <>
                                {generatedDesc?.colorPalette && (
                                    <div>
                                        <label className="text-xs font-bold text-violet-600 mb-2 block">{lang === 'vi' ? 'Bảng màu AI' : 'AI Color Palette'}</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {generatedDesc.colorPalette.map((hex, i) => (
                                                <div key={i} className="aspect-square rounded-xl border-2 border-border shadow-sm cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: hex }} title={hex}>
                                                    <span className="text-[8px] text-white/0 hover:text-white/80 flex items-center justify-center h-full font-bold">{hex}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs font-bold text-violet-600 mb-2 flex items-center gap-1"><Palette className="w-3 h-3" /> {lang === 'vi' ? 'Màu nhấn' : 'Accent color'}</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {COLOR_SWATCHES.map(c => (
                                            <button key={c} onClick={() => setAccentColor(accentColor === c ? null : c)}
                                                className={`aspect-square rounded-xl border-2 transition-all ${accentColor === c ? 'border-violet-500 scale-110 ring-2 ring-violet-200' : 'border-border'}`}
                                                style={{ backgroundColor: c }} />
                                        ))}
                                    </div>
                                </div>
                                {accentColor && (
                                    <button onClick={() => setAccentColor(null)} className="text-xs text-red-500 font-medium">{lang === 'vi' ? '✕ Bỏ chọn màu nhấn' : '✕ Clear accent color'}</button>
                                )}
                            </>
                        )}

                        {activeTab === '3d' && (
                            <>
                                {generatedImage ? (
                                    <div className="space-y-3">
                                        <Product3DViewer image={generatedImage} />
                                        <div className="p-3 rounded-xl bg-violet-50 border border-violet-200">
                                            <p className="text-xs text-violet-600 leading-relaxed">
                                                {lang === 'vi'
                                                    ? '🎯 Xoay bằng cách kéo chuột hoặc vuốt trên màn hình. Nhấn Rotate để tự động xoay.'
                                                    : '🎯 Drag to rotate or swipe on mobile. Click Rotate for auto-spin.'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground py-12">
                                        <Box className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">{lang === 'vi' ? 'Chưa có hình ảnh để xem 3D.' : 'No image to view in 3D.'}</p>
                                        <p className="text-xs mt-1">{lang === 'vi' ? 'Hãy tạo thiết kế trước.' : 'Generate a design first.'}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'pricing' && (
                            <>
                                {generatedDesc?.materialEstimate ? (
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                            <h4 className="text-xs font-bold text-emerald-600 mb-2 flex items-center gap-1.5">
                                                <Package className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Bảng giá nguyên liệu' : 'Material Cost Breakdown'}
                                            </h4>
                                            <div className="space-y-2">
                                                {generatedDesc.materialEstimate.items?.map((m, i) => (
                                                    <div key={i} className="p-2 rounded-lg bg-white/50 border border-emerald-100">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="font-semibold text-gray-700">{m.name}</span>
                                                            {m.item_cost_vnd > 0 && <span className="text-emerald-700 font-bold">{m.item_cost_vnd.toLocaleString('vi-VN')}đ</span>}
                                                        </div>
                                                        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
                                                            <span>{m.weight_kg > 0 && `${m.weight_kg}kg`}{m.length_m > 0 && ` · ${m.length_m}m`}{m.quantity > 0 && ` · ${m.quantity} ${m.unit || (lang === 'vi' ? 'cái' : 'pcs')}`}</span>
                                                            {m.price_per_kg_vnd > 0 && <span>@ {m.price_per_kg_vnd.toLocaleString('vi-VN')}đ/kg</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
                                            {generatedDesc.materialEstimate.total_material_cost_vnd > 0 && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Chi phí nguyên liệu' : 'Material cost'}</span>
                                                    <span className="font-bold text-emerald-700">{generatedDesc.materialEstimate.total_material_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                </div>
                                            )}
                                            {generatedDesc.materialEstimate.labor_cost_vnd > 0 && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-1.5">⏱ {lang === 'vi' ? 'Chi phí nhân công' : 'Labor cost'} ({generatedDesc.materialEstimate.estimated_hours}h)</span>
                                                    <span className="font-bold text-emerald-700">{generatedDesc.materialEstimate.labor_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                </div>
                                            )}
                                            {generatedDesc.materialEstimate.total_estimated_cost_vnd > 0 && (
                                                <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-emerald-200">
                                                    <span className="text-emerald-700">{lang === 'vi' ? 'TỔNG DỰ KIẾN' : 'TOTAL ESTIMATE'}</span>
                                                    <span className="text-emerald-600 text-lg">{generatedDesc.materialEstimate.total_estimated_cost_vnd.toLocaleString('vi-VN')}đ</span>
                                                </div>
                                            )}
                                        </div>
                                        {generatedDesc.materialEstimate.difficulty && (
                                            <div className="p-2 rounded-lg bg-violet-50 border border-violet-200 text-xs text-violet-700">
                                                <span className="font-bold">{lang === 'vi' ? 'Độ khó' : 'Difficulty'}: </span>
                                                {generatedDesc.materialEstimate.difficulty}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground py-12">
                                        <Coins className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">{lang === 'vi' ? 'Tạo thiết kế để xem ước tính chi phí.' : 'Generate a design to see cost estimate.'}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Bottom actions */}
                    <div className="p-4 border-t border-border space-y-2 flex-shrink-0">
                        <button onClick={handleApply} disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-bold hover:shadow-lg disabled:opacity-50 transition-all">
                            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {loading ? (lang === 'vi' ? 'Đang tạo...' : 'Generating...') : t('ai.apply')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}