import { useRef, useEffect } from 'react';

// Refined palette — muted, premium
const GREEN = '#2ECC71';
const GOLD = '#F4C430';
const GOLD_L = '#FFD54F';

// Natural easing
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function SplashCanvas({ phase = 0, exiting = false }) {
    const canvasRef = useRef(null);
    const phaseRef = useRef(phase);
    const exitRef = useRef(exiting);

    useEffect(() => { phaseRef.current = phase; }, [phase]);
    useEffect(() => { exitRef.current = exiting; }, [exiting]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, dpr;
        let animId;
        let t = 0;

        let stars = [], dust = [], fireflies = [], leaves = [], waves = [], waveParticles = [];
        let bambooLayers = [], globePts = [], hudRings = [];
        let exitProgress = 0;
        let cameraOffsetX = 0;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles();
        }

        function initParticles() {
            const isMobile = w < 768;

            // Stars — reduced ~40%, subtle twinkle
            const starCount = isMobile ? 160 : 360;
            stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                r: Math.random() * 1.2 + 0.2,
                tw: Math.random() * Math.PI * 2,
                tws: 0.006 + Math.random() * 0.02,
                layer: Math.random(),
            }));

            // Dust — reduced ~40%, very subtle
            const dustCount = isMobile ? 120 : 300;
            dust = Array.from({ length: dustCount }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.04,
                r: 0.3 + Math.random() * 0.6,
                a: 0.06 + Math.random() * 0.18,
                tw: Math.random() * Math.PI * 2,
            }));

            // Fireflies — reduced ~40%, softer
            const ffCount = isMobile ? 16 : 36;
            fireflies = Array.from({ length: ffCount }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
                r: 0.8 + Math.random() * 1.8,
                color: Math.random() > 0.5 ? GREEN : GOLD,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.025,
                driftAngle: Math.random() * Math.PI * 2,
                driftSpeed: 0.003 + Math.random() * 0.007,
            }));

            // Bamboo — natural, gentle sway, fewer leaves
            bambooLayers = [];
            const layers = [
                { depth: 0.3, count: isMobile ? 2 : 3, opacity: 0.10, width: 1.2, maxHeight: 0.32 },
                { depth: 0.6, count: isMobile ? 2 : 2, opacity: 0.18, width: 2, maxHeight: 0.46 },
                { depth: 1.0, count: isMobile ? 2 : 3, opacity: 0.28, width: 3, maxHeight: 0.6 },
            ];
            layers.forEach((layer) => {
                for (let side = 0; side < 2; side++) {
                    for (let i = 0; i < layer.count; i++) {
                        const xOff = 14 + i * (38 / layer.count) + Math.random() * 16;
                        bambooLayers.push({
                            x: side === 0 ? xOff : w - xOff,
                            side, depth: layer.depth, opacity: layer.opacity,
                            maxHeight: h * (layer.maxHeight + Math.random() * 0.1),
                            sway: Math.random() * Math.PI * 2,
                            swaySpeed: 0.0012 + Math.random() * 0.0018 * layer.depth,
                            segments: 7 + Math.floor(Math.random() * 4),
                            width: layer.width + Math.random() * 0.8,
                            hue: Math.random() > 0.75 ? GOLD : GREEN,
                        });
                    }
                }
            });

            // Leaves — reduced ~40%, gentle fall, reasonable size
            const leafCount = isMobile ? 8 : 22;
            leaves = Array.from({ length: leafCount }, () => ({
                x: Math.random() * w, y: -20 - Math.random() * h * 0.4,
                vx: (Math.random() - 0.5) * 0.25, vy: 0.2 + Math.random() * 0.35,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.012,
                size: 2.5 + Math.random() * 4,
                sway: Math.random() * Math.PI * 2,
                swayAmp: 0.2 + Math.random() * 0.35,
                color: Math.random() > 0.85 ? GOLD_L : GREEN,
                opacity: 0.12 + Math.random() * 0.16,
            }));

            // Energy waves — fewer, thinner, slower, softer
            const waveCount = isMobile ? 4 : 6;
            waves = Array.from({ length: waveCount }, (_, i) => ({
                y: h * 0.35 + (i - waveCount / 2) * 28,
                amp: 8 + Math.random() * 18,
                freq: 0.0015 + Math.random() * 0.003,
                speed: 0.2 + Math.random() * 0.6,
                offset: Math.random() * Math.PI * 2,
                color: i % 2 === 0 ? GREEN : GOLD,
                opacity: 0.04 + Math.random() * 0.07,
                width: 0.5 + Math.random() * 0.7,
            }));

            waveParticles = [];
            const wpCount = isMobile ? 50 : 150;
            for (let i = 0; i < wpCount; i++) {
                const waveIdx = Math.floor(Math.random() * waveCount);
                waveParticles.push({
                    waveIdx,
                    progress: Math.random(),
                    speed: 0.0006 + Math.random() * 0.0016,
                    size: 0.5 + Math.random() * 1,
                    color: waves[waveIdx].color,
                    opacity: 0.2 + Math.random() * 0.35,
                });
            }

            // Globe — 13% smaller, fewer points for crispness
            const ptCount = isMobile ? 110 : 220;
            globePts = [];
            const golden = Math.PI * (3 - Math.sqrt(5));
            for (let i = 0; i < ptCount; i++) {
                const y = 1 - (i / (ptCount - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const theta = golden * i;
                globePts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
            }

            hudRings = Array.from({ length: 3 }, (_, i) => ({
                radius: 1.25 + i * 0.28,
                tilt: 0.12 + i * 0.04,
                rotSpeed: 0.0003 + Math.random() * 0.0006 * (i % 2 ? 1 : -1),
                offset: Math.random() * Math.PI * 2,
                opacity: 0.06 + Math.random() * 0.04,
                color: i % 2 === 0 ? GREEN : GOLD,
            }));
        }

        function drawStars() {
            const ex = exitRef.current;
            const cx = w / 2, cy = h * 0.4;
            stars.forEach(s => {
                s.tw += s.tws;
                if (ex) { s.x += (cx - s.x) * 0.04; s.y += (cy - s.y) * 0.04; }
                const parX = cameraOffsetX * s.layer * 0.4;
                const a = 0.15 + Math.sin(s.tw) * 0.2 + 0.25;
                ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.5})`;
                ctx.beginPath();
                ctx.arc(s.x + parX, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawDust() {
            const ex = exitRef.current;
            dust.forEach(d => {
                if (!ex) {
                    d.x += d.vx; d.y += d.vy; d.tw += 0.015;
                    if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
                    if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
                }
                const a = d.a * (0.5 + Math.sin(d.tw) * 0.5);
                ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawBamboo(p) {
            if (p < 1) return;
            const grow = easeOutExpo(Math.min(1, (p - 0.3) / 0.7));
            const ex = exitRef.current;
            const fade = ex ? Math.max(0, 1 - exitProgress) : 1;
            const sorted = [...bambooLayers].sort((a, b) => a.depth - b.depth);

            sorted.forEach(b => {
                const bh = b.maxHeight * grow;
                // Gentle, natural sway — easeInOutSine curve, low amplitude
                const swayAmp = 2 + b.depth * 2.5;
                const swayPhase = easeInOutSine((Math.sin(t * b.swaySpeed + b.sway) + 1) / 2);
                const swayX = (swayPhase - 0.5) * 2 * swayAmp;
                const parX = cameraOffsetX * b.depth * 1.2;
                const col = b.hue === GOLD ? '244, 196, 48' : '46, 204, 113';
                const opacity = b.opacity * fade;

                ctx.strokeStyle = `rgba(${col}, ${opacity})`;
                ctx.lineWidth = b.width;
                ctx.lineCap = 'round';
                const segH = bh / b.segments;
                const points = [];
                for (let s = 0; s <= b.segments; s++) {
                    const r = s / b.segments;
                    const xSway = swayX * r; // tip sways more
                    points.push({ x: b.x + parX + xSway, y: h - s * segH });
                }

                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let s = 1; s < points.length; s++) {
                    const cpx = (points[s - 1].x + points[s].x) / 2;
                    const cpy = (points[s - 1].y + points[s].y) / 2;
                    ctx.quadraticCurveTo(points[s - 1].x, points[s - 1].y, cpx, cpy);
                }
                ctx.stroke();

                // Nodes
                for (let s = 1; s < points.length - 1; s++) {
                    ctx.fillStyle = `rgba(${col}, ${opacity * 0.4})`;
                    ctx.beginPath();
                    ctx.arc(points[s].x, points[s].y, b.width * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Leaves at top — natural angle, gentle flutter
                if (b.depth > 0.4 && grow > 0.5) {
                    const la = (grow - 0.5) * 2 * fade;
                    const topX = points[points.length - 1].x;
                    const topY = points[points.length - 1].y;
                    const leafCount = b.depth > 0.7 ? 3 : 2;
                    for (let l = 0; l < leafCount; l++) {
                        const baseAng = (l / leafCount) * 0.8 - 0.4;
                        const dir = b.side === 0 ? 1 : -1;
                        const ang = baseAng * dir + Math.sin(t * 0.005 + b.sway + l) * 0.08;
                        const lLen = 8 + b.depth * 6;
                        const lx = topX + Math.cos(ang - Math.PI / 2 * 0 + (dir > 0 ? 0.3 : Math.PI - 0.3)) * lLen;
                        const ly = topY - lLen * 0.6 + Math.sin(ang) * lLen * 0.3;
                        ctx.fillStyle = `rgba(${col}, ${la * 0.3})`;
                        ctx.save();
                        ctx.translate(lx, ly);
                        ctx.rotate(ang + Math.sin(t * 0.006 + l + b.sway) * 0.1);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 6 + b.depth * 2, 1.8 + b.depth * 0.5, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            });
        }

        function drawLeaves(p) {
            if (p < 1) return;
            const ex = exitRef.current;
            const fade = ex ? Math.max(0, 1 - exitProgress) : 1;
            leaves.forEach(l => {
                if (!ex) {
                    l.x += l.vx + Math.sin(t * 0.005 + l.sway) * l.swayAmp;
                    l.y += l.vy;
                    l.rot += l.rotSpeed;
                    if (l.y > h + 20) { l.y = -20; l.x = Math.random() * w; }
                }
                const col = l.color === GOLD_L ? '255, 213, 79' : '46, 204, 113';
                ctx.save();
                ctx.translate(l.x, l.y);
                ctx.rotate(l.rot);
                ctx.fillStyle = `rgba(${col}, ${l.opacity * fade})`;
                ctx.beginPath();
                ctx.ellipse(0, 0, l.size, l.size * 0.35, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        function drawFireflies() {
            const ex = exitRef.current;
            const cx = w / 2, cy = h * 0.4;
            fireflies.forEach(f => {
                if (ex) { f.x += (cx - f.x) * 0.06; f.y += (cy - f.y) * 0.06; }
                else {
                    f.driftAngle += f.driftSpeed;
                    f.x += f.vx + Math.cos(f.driftAngle) * 0.3;
                    f.y += f.vy + Math.sin(f.driftAngle) * 0.2;
                    if (f.x < -10) f.x = w + 10; if (f.x > w + 10) f.x = -10;
                    if (f.y < -10) f.y = h + 10; if (f.y > h + 10) f.y = -10;
                }
                f.pulse += f.pulseSpeed;
                const a = 0.15 + Math.sin(f.pulse) * 0.3 + 0.3;
                const col = f.color === GREEN ? '46, 204, 113' : '244, 196, 48';
                ctx.fillStyle = `rgba(${col}, ${a})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = f.color;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        }

        function drawWaves(p) {
            if (p < 2) return;
            const ex = exitRef.current;
            const fade = ex ? Math.max(0, 1 - exitProgress * 1.5) : easeInOutSine(Math.min(1, (p - 1) / 1.5));
            const parX = cameraOffsetX * 0.2;

            waves.forEach((wv) => {
                const col = wv.color === GREEN ? '46, 204, 113' : '244, 196, 48';
                ctx.strokeStyle = `rgba(${col}, ${wv.opacity * fade})`;
                ctx.lineWidth = wv.width;
                ctx.beginPath();
                for (let x = 0; x <= w + 10; x += 5) {
                    const y = wv.y + Math.sin(x * wv.freq + t * 0.008 * wv.speed + wv.offset) * wv.amp;
                    if (x === 0) ctx.moveTo(x + parX, y); else ctx.lineTo(x + parX, y);
                }
                ctx.stroke();
            });

            waveParticles.forEach(wp => {
                const wv = waves[wp.waveIdx];
                if (!wv) return;
                wp.progress += wp.speed;
                if (wp.progress > 1) wp.progress = 0;
                const x = wp.progress * w + parX;
                const y = wv.y + Math.sin(x * wv.freq + t * 0.008 * wv.speed + wv.offset) * wv.amp;
                const col = wp.color === GREEN ? '46, 204, 113' : '244, 196, 48';
                ctx.fillStyle = `rgba(${col}, ${wp.opacity * fade})`;
                ctx.beginPath();
                ctx.arc(x, y, wp.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawGlobe(p) {
            if (p < 3) return;
            const ex = exitRef.current;
            const fade = ex ? Math.max(0, 1 - exitProgress) : easeOutExpo(Math.min(1, (p - 2) / 1.5));
            const cx = w / 2 + cameraOffsetX * 0.15;
            const cy = h * 0.74;
            // 13% smaller
            const baseR = Math.min(w, h) * 0.078;
            const r = baseR * (1 + Math.sin(t * 0.0015) * 0.02);
            // Slower rotation
            const rot = t * 0.0015;

            // Subtle outer glow — reduced
            const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
            glowGrad.addColorStop(0, `rgba(46, 204, 113, ${0.06 * fade})`);
            glowGrad.addColorStop(1, 'rgba(46, 204, 113, 0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2);
            ctx.fill();

            // HUD rings
            hudRings.forEach(hr => {
                const rr = r * hr.radius;
                const rotAng = t * hr.rotSpeed + hr.offset;
                ctx.strokeStyle = hr.color === GREEN ? `rgba(46, 204, 113, ${hr.opacity * fade})` : `rgba(244, 196, 48, ${hr.opacity * fade})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.ellipse(cx, cy, rr, rr * hr.tilt, rotAng, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Point cloud — crisp, no heavy glow
            const cosR = Math.cos(rot), sinR = Math.sin(rot);
            const projected = globePts.map(pt => {
                const x = pt.x * cosR + pt.z * sinR;
                const z = -pt.x * sinR + pt.z * cosR;
                return { px: cx + x * r, py: cy + pt.y * r, z };
            });

            // Mesh connections — very subtle
            ctx.strokeStyle = `rgba(46, 204, 113, ${0.03 * fade})`;
            ctx.lineWidth = 0.3;
            for (let i = 0; i < projected.length; i++) {
                if (projected[i].z < -0.3) continue;
                for (let j = i + 1; j < Math.min(i + 4, projected.length); j++) {
                    if (projected[j].z < -0.3) continue;
                    const dx = projected[i].px - projected[j].px;
                    const dy = projected[i].py - projected[j].py;
                    if (Math.sqrt(dx * dx + dy * dy) < r * 0.25) {
                        ctx.beginPath();
                        ctx.moveTo(projected[i].px, projected[i].py);
                        ctx.lineTo(projected[j].px, projected[j].py);
                        ctx.stroke();
                    }
                }
            }

            // Points — sharp, minimal glow
            projected.forEach(pt => {
                if (pt.z < -0.3) return;
                const depthA = (pt.z + 0.3) / 1.3;
                const a = (0.35 + depthA * 0.4) * fade;
                const sz = 0.8 + depthA * 1;
                ctx.fillStyle = pt.z > 0 ? `rgba(244, 196, 48, ${a})` : `rgba(46, 204, 113, ${a * 0.5})`;
                ctx.beginPath();
                ctx.arc(pt.px, pt.py, sz, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function loop() {
            t += 1;
            const p = phaseRef.current;
            if (exitRef.current) exitProgress += 0.012;

            cameraOffsetX = Math.sin(t * 0.0004) * 5;

            // Fade trail — slightly stronger for cleaner look
            ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
            ctx.fillRect(0, 0, w, h);

            drawStars();
            drawDust();
            drawBamboo(p);
            drawLeaves(p);
            drawWaves(p);
            drawFireflies();
            drawGlobe(p);

            animId = requestAnimationFrame(loop);
        }

        resize();
        window.addEventListener('resize', resize);
        loop();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}