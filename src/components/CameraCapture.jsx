import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Camera, RefreshCw, Check, SwitchCamera, Timer, Zap, ZapOff, Grid3x3, Sparkles,
    Video, Image as ImageIcon, Download, FlipHorizontal, ZoomIn, Maximize2, Aperture,
    Square, Trash2, ChevronLeft, ChevronRight, RotateCw, RotateCcw, Crop, Type,
    Sun, Contrast, Droplet, Palette, Sliders, Smile, FlipVertical,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const FILTERS = [
    { id: 'none', label_vi: 'Gốc', label_en: 'Original', label_es: 'Original', label_zh: '原图', css: 'none' },
    { id: 'grayscale', label_vi: 'Đen trắng', label_en: 'B&W', label_es: 'B&N', label_zh: '黑白', css: 'grayscale(100%)' },
    { id: 'sepia', label_vi: 'Cổ điển', label_en: 'Sepia', label_es: 'Sepia', label_zh: '复古', css: 'sepia(80%)' },
    { id: 'vintage', label_vi: 'Hoài niệm', label_en: 'Vintage', label_es: 'Vintage', label_zh: '怀旧', css: 'sepia(50%) contrast(1.2) brightness(1.1) saturate(1.3)' },
    { id: 'cool', label_vi: 'Lạnh', label_en: 'Cool', label_es: 'Frío', label_zh: '冷色', css: 'hue-rotate(180deg) saturate(1.2)' },
    { id: 'warm', label_vi: 'Ấm', label_en: 'Warm', label_es: 'Cálido', label_zh: '暖色', css: 'sepia(30%) saturate(1.4) hue-rotate(-10deg)' },
    { id: 'dramatic', label_vi: 'Nghệ thuật', label_en: 'Dramatic', label_es: 'Dramático', label_zh: '艺术', css: 'contrast(1.4) saturate(1.5) brightness(0.95)' },
    { id: 'vivid', label_vi: 'Tươi sáng', label_en: 'Vivid', label_es: 'Vívido', label_zh: '鲜艳', css: 'saturate(1.6) contrast(1.1) brightness(1.05)' },
    { id: 'noir', label_vi: 'Noir', label_en: 'Noir', label_es: 'Noir', label_zh: '黑色', css: 'grayscale(100%) contrast(1.5) brightness(0.85)' },
    { id: 'dreamy', label_vi: 'Mộng mơ', label_en: 'Dreamy', label_es: 'Soñador', label_zh: '梦幻', css: 'blur(0.5px) brightness(1.1) saturate(1.2)' },
    { id: 'forest', label_vi: 'Rừng xanh', label_en: 'Forest', label_es: 'Bosque', label_zh: '森林', css: 'hue-rotate(60deg) saturate(1.3) brightness(1.05) contrast(1.1)' },
    { id: 'sunset', label_vi: 'Hoàng hôn', label_en: 'Sunset', label_es: 'Atardecer', label_zh: '日落', css: 'sepia(40%) saturate(1.5) hue-rotate(-20deg) brightness(1.1)' },
];

const TIMERS = [
    { seconds: 0, label: 'Off' },
    { seconds: 3, label: '3s' },
    { seconds: 5, label: '5s' },
    { seconds: 10, label: '10s' },
];

const ASPECT_RATIOS = [
    { id: '16:9', label: '16:9', icon: Maximize2 },
    { id: '4:3', label: '4:3', icon: Aperture },
    { id: '1:1', label: '1:1', icon: Square },
];

const STICKERS = ['🌸', '🌿', '🎋', '🍃', '✨', '🌟', '💫', '🦋', '🐝', '🌻', '🎨', '🪴', '🧺', '🍂', '🪷', '☀️', '🌙', '❤️', '😊', '👍', '🔥', '💎', '🌸', '🍀'];

const EDIT_TABS = [
    { id: 'filter', icon: Sparkles },
    { id: 'adjust', icon: Sliders },
    { id: 'rotate', icon: RotateCw },
    { id: 'sticker', icon: Smile },
    { id: 'text', icon: Type },
];

export default function CameraCapture({ onCapture, onClose }) {
    const { lang, t } = useLang();
    const tr = (vi, en, es, zh) => {
        const map = { vi, en, es, zh, ru: en, th: en, hi: en };
        return map[lang] || vi;
    };

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);

    // Camera state
    const [mode, setMode] = useState('photo');
    const [captured, setCaptured] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [recording, setRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [facingMode, setFacingMode] = useState('environment');
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [flash, setFlash] = useState(false);
    const [torchSupported, setTorchSupported] = useState(false);
    const [grid, setGrid] = useState(true);
    const [filter, setFilter] = useState('none');
    const [showFilters, setShowFilters] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [mirror, setMirror] = useState(true);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [gallery, setGallery] = useState([]);

    // Live adjustments (applied during preview + capture)
    const [brightness, setBrightness] = useState(1);
    const [contrast, setContrast] = useState(1);
    const [saturation, setSaturation] = useState(1);
    const [hue, setHue] = useState(0);
    const [exposure, setExposure] = useState(0);

    // Post-capture editing
    const [editTab, setEditTab] = useState('filter');
    const [editRotation, setEditRotation] = useState(0);
    const [editFlipH, setEditFlipH] = useState(false);
    const [editFlipV, setEditFlipV] = useState(false);
    const [editBrightness, setEditBrightness] = useState(1);
    const [editContrast, setEditContrast] = useState(1);
    const [editSaturation, setEditSaturation] = useState(1);
    const [editHue, setEditHue] = useState(0);
    const [stickers, setStickers] = useState([]);
    const [textOverlays, setTextOverlays] = useState([]);
    const [textInput, setTextInput] = useState('');

    const currentFilter = FILTERS.find(f => f.id === filter) || FILTERS[0];
    const fLabel = (f) => {
        const map = { vi: f.label_vi, en: f.label_en, es: f.label_es, zh: f.label_zh };
        return map[lang] || f.label_en;
    };

    // Build CSS filter string for live preview
    const liveFilter = [
        currentFilter.css !== 'none' ? currentFilter.css : '',
        `brightness(${brightness})`,
        `contrast(${contrast})`,
        `saturate(${saturation})`,
        hue !== 0 ? `hue-rotate(${hue}deg)` : '',
        exposure !== 0 ? `brightness(${1 + exposure * 0.5})` : '',
    ].filter(Boolean).join(' ');

    // Build CSS filter string for post-capture editing
    const editFilter = [
        currentFilter.css !== 'none' ? currentFilter.css : '',
        `brightness(${editBrightness})`,
        `contrast(${editContrast})`,
        `saturate(${editSaturation})`,
        editHue !== 0 ? `hue-rotate(${editHue}deg)` : '',
    ].filter(Boolean).join(' ');

    const editTransform = `rotate(${editRotation}deg) scaleX(${editFlipH ? -1 : 1}) scaleY(${editFlipV ? -1 : 1})`;

    const startCamera = async (fm = facingMode) => {
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        setError('');
        try {
            const constraints = {
                video: {
                    facingMode: fm, width: { ideal: 1280 }, height: { ideal: 720 },
                    ...(zoom !== 1 ? { advanced: [{ zoom }] } : {})
                },
                audio: mode === 'video',
            };
            const s = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = s;
            if (videoRef.current) videoRef.current.srcObject = s;
            const track = s.getVideoTracks()[0];
            const caps = track.getCapabilities?.();
            setTorchSupported(!!caps?.torch);
        } catch {
            setError(tr('Không thể truy cập camera.', 'Cannot access camera.', 'No se puede acceder a la cámara.', '无法访问摄像头。'));
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            streamRef.current?.getTracks().forEach(t => t.stop());
            if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            try {
                const track = streamRef.current?.getVideoTracks()[0];
                if (track && track.getCapabilities?.()?.zoom) track.applyConstraints({ advanced: [{ zoom }] });
            } catch { }
        }
    }, [zoom]);

    const toggleFlash = async () => {
        if (!streamRef.current || !torchSupported) return;
        const track = streamRef.current.getVideoTracks()[0];
        try {
            const next = !flash;
            await track.applyConstraints({ advanced: [{ torch: next }] });
            setFlash(next);
        } catch { }
    };

    const flipCamera = () => {
        const next = facingMode === 'environment' ? 'user' : 'environment';
        setFacingMode(next);
        setCaptured(null);
        setRecordedVideo(null);
        startCamera(next);
    };

    const getAspectStyle = () => {
        if (aspectRatio === '1:1') return { aspectRatio: '1 / 1' };
        if (aspectRatio === '4:3') return { aspectRatio: '4 / 3' };
        return { aspectRatio: '16 / 9' };
    };

    const doCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        const w = video.videoWidth, h = video.videoHeight;
        let cw = w, ch = h, sx = 0, sy = 0;
        if (aspectRatio === '1:1') { const s = Math.min(w, h); cw = ch = s; sx = (w - s) / 2; sy = (h - s) / 2; }
        else if (aspectRatio === '4:3') { ch = w * 3 / 4; if (ch > h) { ch = h; cw = h * 4 / 3; sx = (w - cw) / 2; } else sy = (h - ch) / 2; }
        canvas.width = cw; canvas.height = ch;
        const ctx = canvas.getContext('2d');
        ctx.filter = liveFilter;
        if (mirror && facingMode === 'user') { ctx.translate(cw, 0); ctx.scale(-1, 1); }
        ctx.drawImage(video, sx, sy, cw, ch, 0, 0, cw, ch);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCaptured(dataUrl);
        setGallery(prev => [...prev, dataUrl].slice(-8));
        streamRef.current?.getTracks().forEach(t => t.stop());
        // Reset live adjustments for editor
        setEditBrightness(1); setEditContrast(1); setEditSaturation(1); setEditHue(0);
        setEditRotation(0); setEditFlipH(false); setEditFlipV(false);
        setStickers([]); setTextOverlays([]);
    };

    const capture = () => {
        if (timer > 0) {
            setCountdown(timer);
            let count = timer;
            const interval = setInterval(() => {
                count--;
                setCountdown(count);
                if (count <= 0) { clearInterval(interval); doCapture(); setCountdown(0); }
            }, 1000);
        } else {
            doCapture();
        }
    };

    // Video recording
    const startRecording = () => {
        if (!streamRef.current) return;
        chunksRef.current = [];
        const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
        const recorder = new MediaRecorder(streamRef.current, { mimeType: mime });
        recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            setRecordedVideo(URL.createObjectURL(blob));
        };
        recorder.start();
        recorderRef.current = recorder;
        setRecording(true);
        setRecordTime(0);
    };

    const stopRecording = () => {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
        setRecording(false);
    };

    useEffect(() => {
        if (!recording) return;
        const t = setInterval(() => setRecordTime(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [recording]);

    const retake = () => {
        setCaptured(null);
        setRecordedVideo(null);
        startCamera();
    };

    // Render final edited image to canvas and confirm
    const confirm = () => {
        if (captured) {
            // Apply edits to canvas
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const isRotated = editRotation === 90 || editRotation === 270;
                canvas.width = isRotated ? img.height : img.width;
                canvas.height = isRotated ? img.width : img.height;
                const ctx = canvas.getContext('2d');
                ctx.filter = editFilter;
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(editRotation * Math.PI / 180);
                ctx.scale(editFlipH ? -1 : 1, editFlipV ? -1 : 1);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                ctx.restore();
                ctx.filter = 'none';

                // Draw stickers
                stickers.forEach(s => {
                    ctx.font = `${s.size}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(s.emoji, s.x * canvas.width, s.y * canvas.height);
                });
                // Draw text overlays
                textOverlays.forEach(to => {
                    ctx.font = `bold ${to.size}px sans-serif`;
                    ctx.fillStyle = to.color;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 4;
                    ctx.fillText(to.text, to.x * canvas.width, to.y * canvas.height);
                    ctx.shadowBlur = 0;
                });

                const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
                fetch(dataUrl).then(r => r.blob()).then(blob => {
                    const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
                    onCapture(file, dataUrl);
                    onClose();
                });
            };
            img.src = captured;
        } else if (recordedVideo) {
            fetch(recordedVideo).then(r => r.blob()).then(blob => {
                const file = new File([blob], 'camera-recording.webm', { type: 'video/webm' });
                onCapture(file, recordedVideo);
                onClose();
            });
        }
    };

    const addSticker = (emoji) => {
        setStickers(prev => [...prev, { emoji, x: 0.5, y: 0.5, size: 48 }]);
    };
    const moveSticker = (i, x, y) => {
        setStickers(prev => prev.map((s, idx) => idx === i ? { ...s, x, y } : s));
    };
    const removeSticker = (i) => setStickers(prev => prev.filter((_, idx) => idx !== i));

    const addText = () => {
        if (!textInput.trim()) return;
        setTextOverlays(prev => [...prev, { text: textInput, x: 0.5, y: 0.5, size: 32, color: '#ffffff' }]);
        setTextInput('');
    };
    const moveText = (i, x, y) => {
        setTextOverlays(prev => prev.map((t, idx) => idx === i ? { ...t, x, y } : t));
    };
    const removeText = (i) => setTextOverlays(prev => prev.filter((_, idx) => idx !== i));

    const hasResult = captured || recordedVideo;
    const isEditing = !!captured;

    const AdjustSlider = ({ icon: Icon, label, value, min, max, step, onChange, resetVal }) => (
        <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
                    <Icon className="w-3.5 h-3.5" /> {label}
                </span>
                <button onClick={() => onChange(resetVal)} className="text-white/40 text-xs hover:text-white">
                    {value !== resetVal ? tr('Reset', 'Reset', 'Reset', '重置') : ''}
                </button>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
                onChange={e => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary" />
        </div>
    );

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                className="relative w-[75vw] max-w-[900px] max-h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/80 flex-shrink-0">
                    <div className="flex items-center gap-2 text-white">
                        <Camera className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">
                            {isEditing ? tr('Chỉnh sửa ảnh', 'Edit Photo', 'Editar Foto', '编辑照片') : tr('Chụp ảnh & Quay video', 'Photo & Video', 'Foto y Video', '拍照和录像')}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        {!isEditing && (
                            <>
                                <button onClick={() => setMirror(!mirror)}
                                    className={`p-2 rounded-full transition-colors ${mirror ? 'bg-primary/30 text-primary' : 'bg-white/10 text-white/60'}`}>
                                    <FlipHorizontal className="w-4 h-4" />
                                </button>
                                <button onClick={() => setGrid(!grid)}
                                    className={`p-2 rounded-full transition-colors ${grid ? 'bg-primary/30 text-primary' : 'bg-white/10 text-white/60'}`}>
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                {torchSupported && (
                                    <button onClick={toggleFlash}
                                        className={`p-2 rounded-full transition-colors ${flash ? 'bg-yellow-500/30 text-yellow-400' : 'bg-white/10 text-white/60'}`}>
                                        {flash ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
                                    </button>
                                )}
                            </>
                        )}
                        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors">
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Mode switcher (only when not editing) */}
                {!hasResult && !error && (
                    <div className="flex justify-center gap-1 py-2 bg-black/60 flex-shrink-0">
                        <div className="flex bg-white/10 rounded-full p-1">
                            <button onClick={() => setMode('photo')}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'photo' ? 'bg-primary text-white' : 'text-white/60'}`}>
                                <ImageIcon className="w-3.5 h-3.5" /> {tr('Ảnh', 'Photo', 'Foto', '照片')}
                            </button>
                            <button onClick={() => setMode('video')}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'video' ? 'bg-red-500 text-white' : 'text-white/60'}`}>
                                <Video className="w-3.5 h-3.5" /> {tr('Video', 'Video', 'Video', '视频')}
                            </button>
                        </div>
                    </div>
                )}

                {/* Camera / Preview */}
                <div className="relative bg-gray-900 flex items-center justify-center flex-1 min-h-0" style={getAspectStyle()}>
                    {error ? (
                        <p className="text-white/70 text-sm px-6 text-center">{error}</p>
                    ) : recordedVideo ? (
                        <video src={recordedVideo} controls autoPlay loop className="w-full h-full object-cover" />
                    ) : captured ? (
                        <div className="relative w-full h-full overflow-hidden">
                            <img src={captured} alt="Captured" className="w-full h-full object-contain"
                                style={{ filter: editFilter, transform: editTransform }} />
                            {/* Stickers overlay */}
                            {stickers.map((s, i) => (
                                <div key={i} draggable
                                    onClick={() => removeSticker(i)}
                                    className="absolute cursor-pointer select-none"
                                    style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, transform: 'translate(-50%, -50%)', fontSize: s.size, filter: editFilter === 'none' ? 'none' : editFilter }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const move = (ev) => {
                                            const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                            moveSticker(i, (ev.clientX - rect.left) / rect.width, (ev.clientY - rect.top) / rect.height);
                                        };
                                        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                                        document.addEventListener('mousemove', move);
                                        document.addEventListener('mouseup', up);
                                    }}
                                >{s.emoji}</div>
                            ))}
                            {/* Text overlays */}
                            {textOverlays.map((to, i) => (
                                <div key={i} draggable
                                    onClick={() => removeText(i)}
                                    className="absolute cursor-pointer select-none font-bold"
                                    style={{ left: `${to.x * 100}%`, top: `${to.y * 100}%`, transform: 'translate(-50%, -50%)', fontSize: to.size, color: to.color, textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const move = (ev) => {
                                            const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                            moveText(i, (ev.clientX - rect.left) / rect.width, (ev.clientY - rect.top) / rect.height);
                                        };
                                        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                                        document.addEventListener('mousemove', move);
                                        document.addEventListener('mouseup', up);
                                    }}
                                >{to.text}</div>
                            ))}
                        </div>
                    ) : (
                        <video ref={videoRef} autoPlay playsInline muted
                            className="w-full h-full object-cover"
                            style={{ filter: liveFilter, transform: `${mirror && facingMode === 'user' ? 'scaleX(-1)' : 'none'} scale(${zoom})` }}
                        />
                    )}
                    {/* Grid overlay */}
                    {!hasResult && !error && grid && (
                        <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                            backgroundSize: '33.33% 33.33%'
                        }} />
                    )}
                    {/* Countdown */}
                    <AnimatePresence>
                        {countdown > 0 && (
                            <motion.div key={countdown} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-8xl font-black text-white drop-shadow-2xl">{countdown}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Recording indicator */}
                    {recording && (
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur text-white text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> {String(Math.floor(recordTime / 60)).padStart(2, '0')}:{String(recordTime % 60).padStart(2, '0')}
                        </div>
                    )}
                    {/* Filter badge */}
                    {filter !== 'none' && !hasResult && !error && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold">
                            ✨ {fLabel(currentFilter)}
                        </div>
                    )}
                    {/* Adjust badge */}
                    {(brightness !== 1 || contrast !== 1 || saturation !== 1 || hue !== 0 || exposure !== 0) && !hasResult && !error && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-violet-500/40 backdrop-blur text-white text-xs font-semibold">
                            <Sliders className="w-3 h-3 inline" />
                        </div>
                    )}
                    {/* Timer badge */}
                    {timer > 0 && !hasResult && !error && countdown === 0 && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-primary/40 backdrop-blur text-white text-xs font-semibold flex items-center gap-1">
                            <Timer className="w-3 h-3" /> {timer}s
                        </div>
                    )}
                    {/* Aspect ratio badge */}
                    {!hasResult && !error && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-white/70 text-xs font-medium">
                            {aspectRatio}
                        </div>
                    )}
                </div>

                {/* === EDITING PANEL (post-capture) === */}
                {isEditing && (
                    <div className="bg-black/80 flex-shrink-0">
                        {/* Edit tabs */}
                        <div className="flex justify-around px-2 py-2 border-b border-white/10">
                            {EDIT_TABS.map(tab => (
                                <button key={tab.id} onClick={() => setEditTab(tab.id)}
                                    className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${editTab === tab.id ? 'bg-primary/20 text-primary' : 'text-white/50 hover:text-white'}`}>
                                    <tab.icon className="w-4 h-4" />
                                    <span className="text-[10px] font-medium">
                                        {tab.id === 'filter' ? tr('Lọc', 'Filter', 'Filtro', '滤镜')
                                            : tab.id === 'adjust' ? tr('Chỉnh', 'Adjust', 'Ajustar', '调整')
                                                : tab.id === 'rotate' ? tr('Xoay', 'Rotate', 'Rotar', '旋转')
                                                    : tab.id === 'sticker' ? tr('Dán', 'Sticker', 'Pegatina', '贴纸')
                                                        : tr('Chữ', 'Text', 'Texto', '文字')}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Filter tab */}
                        {editTab === 'filter' && (
                            <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
                                {FILTERS.map(f => (
                                    <button key={f.id} onClick={() => setFilter(f.id)}
                                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f.id ? 'bg-primary text-white' : 'bg-white/10 text-white/70'}`}>
                                        {fLabel(f)}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Adjust tab */}
                        {editTab === 'adjust' && (
                            <div className="py-1 max-h-40 overflow-y-auto">
                                <AdjustSlider icon={Sun} label={tr('Độ sáng', 'Brightness', 'Brillo', '亮度')} value={editBrightness} min={0.3} max={1.8} step={0.05} onChange={setEditBrightness} resetVal={1} />
                                <AdjustSlider icon={Contrast} label={tr('Tương phản', 'Contrast', 'Contraste', '对比度')} value={editContrast} min={0.3} max={2} step={0.05} onChange={setEditContrast} resetVal={1} />
                                <AdjustSlider icon={Droplet} label={tr('Bão hòa', 'Saturation', 'Saturación', '饱和度')} value={editSaturation} min={0} max={2.5} step={0.05} onChange={setEditSaturation} resetVal={1} />
                                <AdjustSlider icon={Palette} label={tr('Sắc thái', 'Hue', 'Tono', '色调')} value={editHue} min={-180} max={180} step={5} onChange={setEditHue} resetVal={0} />
                            </div>
                        )}

                        {/* Rotate tab */}
                        {editTab === 'rotate' && (
                            <div className="flex justify-around px-4 py-4 gap-2">
                                <button onClick={() => setEditRotation(r => (r - 90 + 360) % 360)}
                                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                                    <RotateCcw className="w-5 h-5" />
                                    <span className="text-[10px]">{tr('Trái', 'Left', 'Izq', '左')}</span>
                                </button>
                                <button onClick={() => setEditRotation(r => (r + 90) % 360)}
                                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                                    <RotateCw className="w-5 h-5" />
                                    <span className="text-[10px]">{tr('Phải', 'Right', 'Der', '右')}</span>
                                </button>
                                <button onClick={() => setEditFlipH(!editFlipH)}
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${editFlipH ? 'bg-primary/30 text-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                    <FlipHorizontal className="w-5 h-5" />
                                    <span className="text-[10px]">{tr('Lật NG', 'Flip H', 'Voltear H', '水平翻转')}</span>
                                </button>
                                <button onClick={() => setEditFlipV(!editFlipV)}
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${editFlipV ? 'bg-primary/30 text-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                    <FlipVertical className="w-5 h-5" />
                                    <span className="text-[10px]">{tr('Lật Dọc', 'Flip V', 'Voltear V', '垂直翻转')}</span>
                                </button>
                            </div>
                        )}

                        {/* Sticker tab */}
                        {editTab === 'sticker' && (
                            <div className="px-4 py-3">
                                <p className="text-white/40 text-[10px] mb-2">{tr('Chọn sticker · Kéo để di chuyển · Click để xóa', 'Tap sticker · Drag to move · Click to delete', 'Toca · Arrastra · Click para borrar', '点击贴纸 · 拖动移动 · 点击删除')}</p>
                                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                                    {STICKERS.map((s, i) => (
                                        <button key={i} onClick={() => addSticker(s)}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-xl transition-colors">
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Text tab */}
                        {editTab === 'text' && (
                            <div className="px-4 py-3">
                                <div className="flex gap-2 mb-2">
                                    <input value={textInput} onChange={e => setTextInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addText()}
                                        placeholder={tr('Nhập chữ...', 'Type text...', 'Escribe...', '输入文字...')}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white text-sm outline-none border border-white/20 focus:border-primary" />
                                    <button onClick={addText}
                                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold">
                                        {tr('Thêm', 'Add', 'Añadir', '添加')}
                                    </button>
                                </div>
                                <p className="text-white/40 text-[10px]">{tr('Kéo để di chuyển · Click để xóa', 'Drag to move · Click to delete', 'Arrastra · Click para borrar', '拖动移动 · 点击删除')}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* === LIVE CAMERA CONTROLS === */}
                {!isEditing && !error && !hasResult && (
                    <>
                        {/* Zoom slider */}
                        <div className="px-4 py-2 bg-black/60 flex items-center gap-2 flex-shrink-0">
                            <ZoomIn className="w-3.5 h-3.5 text-white/40" />
                            <input type="range" min="1" max="3" step="0.1" value={zoom}
                                onChange={e => setZoom(parseFloat(e.target.value))}
                                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary" />
                            <span className="text-white/40 text-xs font-medium w-8 text-right">{zoom.toFixed(1)}x</span>
                        </div>

                        {/* Live adjustments strip */}
                        <AnimatePresence>
                            {showSettings && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-black/80 flex-shrink-0">
                                    <div className="py-1 max-h-44 overflow-y-auto">
                                        <AdjustSlider icon={Sun} label={tr('Độ sáng', 'Brightness', 'Brillo', '亮度')} value={brightness} min={0.3} max={1.8} step={0.05} onChange={setBrightness} resetVal={1} />
                                        <AdjustSlider icon={Contrast} label={tr('Tương phản', 'Contrast', 'Contraste', '对比度')} value={contrast} min={0.3} max={2} step={0.05} onChange={setContrast} resetVal={1} />
                                        <AdjustSlider icon={Droplet} label={tr('Bão hòa', 'Saturation', 'Saturación', '饱和度')} value={saturation} min={0} max={2.5} step={0.05} onChange={setSaturation} resetVal={1} />
                                        <AdjustSlider icon={Palette} label={tr('Sắc thái', 'Hue', 'Tono', '色调')} value={hue} min={-180} max={180} step={5} onChange={setHue} resetVal={0} />
                                        <AdjustSlider icon={Sun} label={tr('Phơi sáng', 'Exposure', 'Exposición', '曝光')} value={exposure} min={-1} max={1} step={0.1} onChange={setExposure} resetVal={0} />
                                        {/* Timer + aspect ratio */}
                                        <div className="flex items-center gap-2 px-4 py-2 mt-1 border-t border-white/10">
                                            <span className="text-white/60 text-xs">{tr('Hẹn giờ', 'Timer', 'Temporizador', '定时')}:</span>
                                            {TIMERS.map(t => (
                                                <button key={t.seconds} onClick={() => setTimer(t.seconds)}
                                                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${timer === t.seconds ? 'bg-primary text-white' : 'bg-white/10 text-white/70'}`}>
                                                    {t.seconds === 0 ? tr('Tắt', 'Off', 'Off', '关') : t.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2">
                                            <span className="text-white/60 text-xs">{tr('Tỉ lệ', 'Ratio', 'Proporción', '比例')}:</span>
                                            {ASPECT_RATIOS.map(a => (
                                                <button key={a.id} onClick={() => setAspectRatio(a.id)}
                                                    className={`flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${aspectRatio === a.id ? 'bg-primary text-white' : 'bg-white/10 text-white/70'}`}>
                                                    <a.icon className="w-3 h-3" /> {a.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Filter strip */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-black/80 flex-shrink-0">
                                    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
                                        {FILTERS.map(f => (
                                            <button key={f.id} onClick={() => { setFilter(f.id); setShowFilters(false); }}
                                                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f.id ? 'bg-primary text-white' : 'bg-white/10 text-white/70'}`}>
                                                {fLabel(f)}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}

                <canvas ref={canvasRef} className="hidden" />

                {/* Gallery thumbnails */}
                {gallery.length > 0 && !hasResult && (
                    <div className="flex gap-1.5 px-4 py-2 bg-black/40 overflow-x-auto scrollbar-hide flex-shrink-0">
                        {gallery.map((g, i) => (
                            <button key={i} onClick={() => { setCaptured(g); }}
                                className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity">
                                <img src={g} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Controls */}
                <div className="px-4 py-5 bg-black flex items-center justify-center gap-3 flex-shrink-0">
                    {isEditing ? (
                        <>
                            <button onClick={retake}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors">
                                <RefreshCw className="w-4 h-4" /> {tr('Chụp lại', 'Retake', 'Volver a tomar', '重拍')}
                            </button>
                            <button onClick={confirm}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all shadow-lg">
                                <Check className="w-4 h-4" /> {tr('Dùng ảnh', 'Use Photo', 'Usar Foto', '使用')}
                            </button>
                        </>
                    ) : !hasResult ? (
                        <>
                            <button onClick={() => setShowFilters(!showFilters)}
                                className={`p-3 rounded-full transition-colors ${showFilters || filter !== 'none' ? 'bg-primary/30 text-primary' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                <Sparkles className="w-5 h-5" />
                            </button>
                            <button onClick={() => setShowSettings(!showSettings)}
                                className={`p-3 rounded-full transition-colors ${showSettings || brightness !== 1 || contrast !== 1 || saturation !== 1 || hue !== 0 || timer > 0 ? 'bg-primary/30 text-primary' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                <Sliders className="w-5 h-5" />
                            </button>
                            {mode === 'photo' ? (
                                <button onClick={capture} disabled={countdown > 0}
                                    className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center shadow-2xl disabled:opacity-50">
                                    <div className="w-10 h-10 rounded-full bg-white" />
                                </button>
                            ) : (
                                <button onClick={recording ? stopRecording : startRecording} disabled={countdown > 0}
                                    className={`w-16 h-16 rounded-full border-4 transition-all flex items-center justify-center shadow-2xl disabled:opacity-50 ${recording ? 'border-red-500 bg-red-500/30' : 'border-white bg-white/20 hover:bg-white/30'}`}>
                                    {recording ? <Square className="w-6 h-6 text-red-400 fill-red-400" /> : <div className="w-8 h-8 rounded-full bg-red-500" />}
                                </button>
                            )}
                            <button onClick={flipCamera}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                                <SwitchCamera className="w-5 h-5" />
                            </button>
                            <div className="w-11 h-11" />
                        </>
                    ) : (
                        <>
                            <button onClick={retake}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors">
                                <RefreshCw className="w-4 h-4" /> {tr('Chụp lại', 'Retake', 'Volver a tomar', '重拍')}
                            </button>
                            <button onClick={confirm}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all shadow-lg">
                                <Check className="w-4 h-4" /> {tr('Dùng', 'Use', 'Usar', '使用')}
                            </button>
                        </>
                    )}
                </div>

                {!isEditing && (
                    <p className="text-center text-white/40 text-xs pb-3 flex-shrink-0">
                        {tr('AI sẽ dùng ảnh/video này làm cảm hứng tạo thiết kế', 'AI will use this as design inspiration', 'La IA usará esto como inspiración', 'AI将使用此作为设计灵感')}
                    </p>
                )}
            </motion.div>
        </div>
    );
}