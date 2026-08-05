import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, X, Palette, RefreshCw, Sparkles, Ruler, Grid, Paintbrush } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const STYLES = [
    { label: 'Boho', emoji: '🌿' },
    { label: 'Luxury', emoji: '✨' },
    { label: 'Zen', emoji: '🎋' },
    { label: 'Modern', emoji: '🏙️' },
    { label: 'Royal', emoji: '👑' },
    { label: 'Rustic', emoji: '🪵' },
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

export default function AIDesignEditor({ design, onRegenerate, loading }) {
    const { lang, t } = useLang();
    const [open, setOpen] = useState(false);
    const [promptEdit, setPromptEdit] = useState(design?.prompt || '');
    const [style, setStyle] = useState(design?.style || null);
    const [size, setSize] = useState(design?.size || 'medium');
    const [pattern, setPattern] = useState(design?.pattern || null);
    const [finish, setFinish] = useState(design?.finish || null);
    const [materials, setMaterials] = useState([]);
    const [accentColor, setAccentColor] = useState(null);

    const SIZES = lang === 'vi' ? SIZES_VI : SIZES_EN;
    const PATTERNS = lang === 'vi' ? PATTERNS_VI : PATTERNS_EN;
    const FINISHES = lang === 'vi' ? FINISHES_VI : FINISHES_EN;
    const MATERIALS = lang === 'vi' ? MATERIALS_VI : MATERIALS_EN;

    const toggleMaterial = (m) => {
        setMaterials(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
    };

    const handleApply = () => {
        let newPrompt = promptEdit || design?.prompt || '';
        if (style) newPrompt += ` Phong cách: ${style}.`;
        const sizeObj = SIZES.find(s => s.k === size);
        if (sizeObj) newPrompt += ` Kích thước: ${sizeObj.l}.`;
        if (pattern) newPrompt += ` Kiểu đan: ${pattern}.`;
        if (finish) newPrompt += ` Hoàn thiện: ${finish}.`;
        if (materials.length) newPrompt += ` Vật liệu: ${materials.join(', ')}.`;
        if (accentColor) newPrompt += ` Màu nhấn: ${accentColor}.`;
        onRegenerate({ prompt: newPrompt, style, size, pattern, finish });
        setOpen(false);
    };

    if (!open) {
        return (
            <button onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-50 border border-violet-300 text-violet-700 text-sm font-semibold hover:bg-violet-100 transition-all">
                <Edit3 className="w-4 h-4" /> {t('ai.editor')}
            </button>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="rounded-2xl border-2 border-violet-200 bg-violet-50/50 overflow-hidden">
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-violet-700 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4" /> {t('ai.editor')}
                    </h4>
                    <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-violet-100 transition-colors">
                        <X className="w-4 h-4 text-violet-400" />
                    </button>
                </div>

                {/* Prompt editor */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1 block">{t('ai.desc')}</label>
                    <textarea value={promptEdit} onChange={e => setPromptEdit(e.target.value)} rows={2}
                        placeholder={lang === 'vi' ? 'Chỉnh sửa mô tả sản phẩm...' : 'Edit product description...'}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-violet-200 text-sm outline-none focus:border-violet-400 transition-colors resize-none" />
                </div>

                {/* Size selector */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 flex items-center gap-1"><Ruler className="w-3 h-3" /> {t('ai.size')}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {SIZES.map(s => (
                            <button key={s.k} onClick={() => setSize(s.k)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${size === s.k ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white border-cyan-200 text-cyan-600 hover:bg-cyan-50'}`}>
                                {s.l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Style switcher */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 block">{lang === 'vi' ? 'Phong cách' : 'Style'}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {STYLES.map(s => (
                            <button key={s.label} onClick={() => setStyle(style === s.label ? null : s.label)}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${style === s.label ? 'bg-violet-500 text-white border-violet-500' : 'bg-white border-violet-200 text-violet-600 hover:bg-violet-100'}`}>
                                <span>{s.emoji}</span> {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pattern selector */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 flex items-center gap-1"><Grid className="w-3 h-3" /> {t('ai.pattern')}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {PATTERNS.map(p => (
                            <button key={p.k} onClick={() => setPattern(pattern === p.k ? null : p.k)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${pattern === p.k ? 'bg-teal-500 text-white border-teal-500' : 'bg-white border-teal-200 text-teal-600 hover:bg-teal-50'}`}>
                                {p.l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Finish selector */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 flex items-center gap-1"><Paintbrush className="w-3 h-3" /> {t('ai.finish')}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {FINISHES.map(f => (
                            <button key={f.k} onClick={() => setFinish(finish === f.k ? null : f.k)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${finish === f.k ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-rose-200 text-rose-600 hover:bg-rose-50'}`}>
                                {f.l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Material selector */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 block">{t('ai.materials')}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {MATERIALS.map(m => (
                            <button key={m} onClick={() => toggleMaterial(m)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${materials.includes(m) ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-amber-200 text-amber-600 hover:bg-amber-50'}`}>
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accent color picker */}
                <div>
                    <label className="text-xs font-semibold text-violet-600 mb-1.5 flex items-center gap-1"><Palette className="w-3 h-3" /> {lang === 'vi' ? 'Màu nhấn' : 'Accent color'}</label>
                    <div className="flex flex-wrap gap-1.5">
                        {COLOR_SWATCHES.map(c => (
                            <button key={c} onClick={() => setAccentColor(accentColor === c ? null : c)}
                                className={`w-7 h-7 rounded-lg border-2 transition-all ${accentColor === c ? 'border-violet-500 scale-110 ring-2 ring-violet-200' : 'border-gray-200'}`}
                                style={{ backgroundColor: c }} />
                        ))}
                        {accentColor && (
                            <button onClick={() => setAccentColor(null)} className="px-2 rounded-lg bg-red-50 border border-red-200 text-red-500 text-xs"><X className="w-3 h-3" /></button>
                        )}
                    </div>
                </div>

                {/* Apply button */}
                <button onClick={handleApply} disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-bold hover:shadow-lg disabled:opacity-50 transition-all">
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? (lang === 'vi' ? 'Đang tạo...' : 'Generating...') : t('ai.apply')}
                </button>
            </div>
        </motion.div>
    );
}