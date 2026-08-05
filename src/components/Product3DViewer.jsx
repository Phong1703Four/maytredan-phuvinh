import { useRef, useState, useEffect } from 'react';
import { RotateCw, Pause, Play, Box, Eye } from 'lucide-react';

// CSS 3D transform-based product viewer — rotates the AI image in 3D space
// Lightweight, no WebGL needed. Gives a 3D showcase feel.

export default function Product3DViewer({ image, autoRotate = true, speed = 8 }) {
    const [rotating, setRotating] = useState(autoRotate);
    const [angle, setAngle] = useState(0);
    const [dragStart, setDragStart] = useState(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!rotating) return;
        let last = performance.now();
        const tick = (now) => {
            const delta = (now - last) / 1000;
            last = now;
            setAngle(a => (a + delta * (360 / speed)) % 360);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [rotating, speed]);

    const handleDragStart = (e) => {
        setRotating(false);
        setDragStart({ x: e.clientX || e.touches?.[0]?.clientX, angle });
    };
    const handleDragMove = (e) => {
        if (!dragStart) return;
        const x = e.clientX || e.touches?.[0]?.clientX;
        const delta = x - dragStart.x;
        setAngle(dragStart.angle + delta * 0.8);
    };
    const handleDragEnd = () => setDragStart(null);

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 border border-violet-200"
                style={{ perspective: '1200px', cursor: 'grab' }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15), transparent 70%)',
                    }}
                />
                {/* Reflective floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-violet-100/50 to-transparent pointer-events-none" />

                {/* 3D rotating card */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${angle}deg)`,
                        transition: dragStart ? 'none' : 'transform 0.1s linear',
                    }}
                >
                    {/* Front face — main image */}
                    <div
                        className="relative rounded-2xl shadow-2xl overflow-hidden"
                        style={{
                            transform: 'translateZ(20px)',
                            width: '70%',
                            height: '70%',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <img src={image} alt="3D Product" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                    </div>
                    {/* Back face — mirror with subtle tint */}
                    <div
                        className="absolute rounded-2xl shadow-2xl overflow-hidden"
                        style={{
                            transform: 'rotateY(180deg) translateZ(20px)',
                            width: '70%',
                            height: '70%',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <img src={image} alt="3D Product Back" className="w-full h-full object-cover scale-x-[-1] opacity-90" />
                        <div className="absolute inset-0 bg-violet-500/10" />
                    </div>
                    {/* Side faces for depth illusion */}
                    <div className="absolute rounded-l-lg bg-gradient-to-r from-violet-200 to-violet-100" style={{ width: '40px', height: '70%', left: '15%', transform: 'rotateY(90deg) translateZ(-35%)' }} />
                    <div className="absolute rounded-r-lg bg-gradient-to-l from-violet-200 to-violet-100" style={{ width: '40px', height: '70%', right: '15%', transform: 'rotateY(-90deg) translateZ(-35%)' }} />
                </div>

                {/* Info badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-violet-200 text-violet-600 text-xs font-bold">
                    <Box className="w-3 h-3" /> 3D Preview
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setRotating(r => !r)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-600 text-xs font-semibold hover:bg-violet-100 transition-colors"
                >
                    {rotating ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Rotate</>}
                </button>
                <button
                    onClick={() => { setRotating(false); setAngle(0); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-600 text-xs font-semibold hover:bg-violet-100 transition-colors"
                >
                    <RotateCw className="w-3.5 h-3.5" /> Reset
                </button>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Drag to rotate · {Math.round(angle)}°
                </span>
            </div>
        </div>
    );
}