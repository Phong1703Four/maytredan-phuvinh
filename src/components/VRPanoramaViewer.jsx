import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Move, ZoomIn, ZoomOut, Compass, Hand, Maximize2, RotateCcw } from 'lucide-react';

export default function VRPanoramaViewer({ spot, onClose }) {
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const offsetRef = useRef(0);
    const dragData = useRef({ startX: 0, startOffset: 0 });
    const velocityRef = useRef(0);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const momentumRef = useRef(null);
    const autoPanRef = useRef(null);

    useEffect(() => { offsetRef.current = offset; }, [offset]);

    // Momentum animation after drag release
    const startMomentum = () => {
        const animate = () => {
            if (Math.abs(velocityRef.current) < 0.05) {
                velocityRef.current = 0;
                return;
            }
            offsetRef.current += velocityRef.current;
            setOffset(offsetRef.current);
            velocityRef.current *= 0.95;
            momentumRef.current = requestAnimationFrame(animate);
        };
        momentumRef.current = requestAnimationFrame(animate);
    };

    const stopMomentum = () => {
        if (momentumRef.current) {
            cancelAnimationFrame(momentumRef.current);
            momentumRef.current = null;
        }
    };

    // Auto-pan when idle (no drag, no momentum)
    useEffect(() => {
        if (dragging || !loaded) return;
        autoPanRef.current = setInterval(() => {
            if (Math.abs(velocityRef.current) < 0.05) {
                offsetRef.current += 0.4;
                setOffset(offsetRef.current);
            }
        }, 16);
        return () => clearInterval(autoPanRef.current);
    }, [dragging, loaded]);

    // Drag handlers
    useEffect(() => {
        if (!dragging) return;
        stopMomentum();

        const onMove = (e) => {
            if (e.cancelable) e.preventDefault();
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const now = performance.now();
            const dt = now - lastTimeRef.current;
            if (dt > 0) {
                velocityRef.current = ((x - lastXRef.current) / dt) * 16;
            }
            lastXRef.current = x;
            lastTimeRef.current = now;
            const delta = x - dragData.current.startX;
            offsetRef.current = dragData.current.startOffset + delta;
            setOffset(offsetRef.current);
        };

        const onUp = () => {
            setDragging(false);
            if (Math.abs(velocityRef.current) > 0.5) {
                startMomentum();
            }
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [dragging]);

    useEffect(() => {
        return () => {
            stopMomentum();
            if (autoPanRef.current) clearInterval(autoPanRef.current);
        };
    }, []);

    const toggleFullscreen = () => {
        const elem = containerRef.current;
        if (!document.fullscreenElement) {
            elem?.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const resetView = () => {
        stopMomentum();
        velocityRef.current = 0;
        offsetRef.current = 0;
        setOffset(0);
        setZoom(1);
    };

    const startDrag = (e) => {
        stopMomentum();
        velocityRef.current = 0;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        dragData.current = { startX: x, startOffset: offsetRef.current };
        lastXRef.current = x;
        lastTimeRef.current = performance.now();
        setDragging(true);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
                ref={containerRef}
            >
                <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">{spot.emoji}</div>
                        <div>
                            <h3 className="font-bold text-base">{spot.name}</h3>
                            <p className="text-white/60 text-xs flex items-center gap-1">
                                <Hand className="w-3 h-3" /> {dragging ? 'Đang xoay 360°...' : `${spot.subtitle} · Kéo để xoay`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setZoom(z => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors" aria-label="Zoom in">
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <button onClick={() => setZoom(z => Math.max(1, +(z - 0.25).toFixed(2)))}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors" aria-label="Zoom out">
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <button onClick={resetView}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors" aria-label="Reset view">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button onClick={toggleFullscreen}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors" aria-label="Fullscreen">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                        <button onClick={onClose}
                            className="p-2 rounded-lg bg-white/15 backdrop-blur text-white hover:bg-red-500/60 transition-colors" aria-label="Close">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div
                    className={`relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-gray-900 ${dragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
                    style={{
                        backgroundImage: `url(${spot.image})`,
                        backgroundSize: `auto ${zoom * 100}%`,
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: `${-offset}px center`,
                    }}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
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
                    <img src={spot.image} alt="" className="hidden" onLoad={() => setLoaded(true)} />

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white text-xs">
                        <Compass className={`w-3.5 h-3.5 ${dragging ? 'animate-spin' : 'animate-pulse'}`} />
                        <span>{dragging ? 'Đang xoay...' : 'Kéo để khám phá 360°'}</span>
                    </div>

                    {loaded && (
                        <div className="absolute bottom-4 right-4 z-10 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-white/70 text-[10px] font-medium">
                            🔍 {Math.round(zoom * 100)}%
                        </div>
                    )}

                    {loaded && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                            <div className="w-14 h-14 rounded-full glass flex flex-col items-center justify-center relative">
                                <Compass className="w-6 h-6 text-white" style={{ transform: `rotate(${(offset * 0.3) % 360}deg)`, transition: 'transform 0.1s ease-out' }} />
                                <span className="absolute top-0.5 text-[8px] text-white/60 font-bold">N</span>
                            </div>
                        </div>
                    )}

                    {!dragging && loaded && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 px-2 py-1 rounded-full bg-black/40 backdrop-blur text-white/60 text-[10px]">
                            ↻ Auto
                        </div>
                    )}

                    {!dragging && loaded && Math.abs(offset) < 50 && (
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm bg-white/10">
                                <Move className="w-7 h-7 text-white" />
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="px-5 py-4 bg-gradient-to-r from-primary via-emerald-600 to-teal-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
                    <div className="relative flex items-start gap-3">
                        <Compass className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
                        <p className="text-sm leading-relaxed">{spot.description}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}