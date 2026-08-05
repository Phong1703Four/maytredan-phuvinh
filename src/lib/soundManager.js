// Traditional Vietnamese-inspired sound effects using Web Audio API
// No external audio files needed — all sounds synthesized in-browser

let audioCtx = null;
let soundEnabled = true;
let soundVolume = 0.5;
let musicEnabled = false;
let musicVolume = 0.3;
let initialized = false;
let ambientNodes = [];
let masterGainRef = null;
let musicLoopTimer = null;

const STORAGE_KEY = 'phuvinh_sound_enabled';
const VOL_KEY = 'phuvinh_sound_volume';
const MUSIC_KEY = 'phuvinh_music_enabled';
const MUSIC_VOL_KEY = 'phuvinh_music_volume';

try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) soundEnabled = saved === 'true';
    const sv = localStorage.getItem(VOL_KEY);
    if (sv !== null) soundVolume = parseFloat(sv);
    const me = localStorage.getItem(MUSIC_KEY);
    if (me !== null) musicEnabled = me === 'true';
    const mv = localStorage.getItem(MUSIC_VOL_KEY);
    if (mv !== null) musicVolume = parseFloat(mv);
} catch (e) { }

const getCtx = () => {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });
    return audioCtx;
};

export const initSound = () => {
    if (initialized) return;
    initialized = true;
    getCtx();
    if (musicEnabled) startAmbientMusic();
};

export const setSoundEnabled = (v) => { soundEnabled = v; try { localStorage.setItem(STORAGE_KEY, String(v)); } catch (e) { } };
export const isSoundEnabled = () => soundEnabled;
export const setSoundVolume = (v) => { soundVolume = Math.max(0, Math.min(1, v)); try { localStorage.setItem(VOL_KEY, String(soundVolume)); } catch (e) { } };
export const getSoundVolume = () => soundVolume;

export const setMusicEnabled = (v) => {
    musicEnabled = v;
    try { localStorage.setItem(MUSIC_KEY, String(v)); } catch (e) { }
    if (v) startAmbientMusic();
    else stopAmbientMusic();
};
export const isMusicEnabled = () => musicEnabled;

export const setMusicVolume = (v) => {
    musicVolume = Math.max(0, Math.min(1, v));
    try { localStorage.setItem(MUSIC_VOL_KEY, String(musicVolume)); } catch (e) { }
    // Only control the master gain, NOT individual node gains
    if (masterGainRef) {
        try { masterGainRef.gain.setValueAtTime(musicVolume, getCtx()?.currentTime || 0); } catch (e) { }
    }
};
export const getMusicVolume = () => musicVolume;

export const playClick = () => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(660, t);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);
        gain.gain.setValueAtTime(0.12 * soundVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(t); osc.stop(t + 0.1);
    } catch (e) { }
};

export const playTransition = () => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
        const t = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + i * 0.025);
            gain.gain.setValueAtTime(0, t + i * 0.025);
            gain.gain.linearRampToValueAtTime(0.07 * soundVolume, t + i * 0.025 + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5 + i * 0.025);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(t + i * 0.025); osc.stop(t + 0.6 + i * 0.025);
        });
    } catch (e) { }
};

export const playSuccess = () => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
        const t = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + i * 0.08);
            gain.gain.setValueAtTime(0, t + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.08 * soundVolume, t + i * 0.08 + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.35);
        });
    } catch (e) { }
};

// === Healing ambient music ===
// Soft warm pad with gentle reverb + sparse pentatonic melody
export const startAmbientMusic = () => {
    const ctx = getCtx();
    if (!ctx) return;
    stopAmbientMusic();
    ambientNodes = [];

    try {
        // Master gain — THE ONLY volume control
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(musicVolume, ctx.currentTime);
        masterGainRef = masterGain;

        // Lowpass filter to soften all tones
        const lpFilter = ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.setValueAtTime(800, ctx.currentTime);
        lpFilter.Q.setValueAtTime(0.5, ctx.currentTime);
        masterGain.connect(lpFilter);
        lpFilter.connect(ctx.destination);

        // Simple reverb: delay + feedback
        const delay = ctx.createDelay(2);
        delay.delayTime.setValueAtTime(0.45, ctx.currentTime);
        const feedback = ctx.createGain();
        feedback.gain.setValueAtTime(0.3, ctx.currentTime);
        const reverbGain = ctx.createGain();
        reverbGain.gain.setValueAtTime(0.35, ctx.currentTime);
        lpFilter.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(reverbGain);
        reverbGain.connect(ctx.destination);

        // --- Warm drone pad (triangle waves, very low freq) ---
        const droneFreqs = [55, 82.41, 110]; // A1, E2, A2
        droneFreqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            lfo.frequency.setValueAtTime(0.04 + i * 0.012, ctx.currentTime);
            lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
            const baseVol = [0.05, 0.03, 0.02][i];
            gain.gain.setValueAtTime(baseVol, ctx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            lfo.start();
            ambientNodes.push({ osc, lfo });
        });

        // --- Sparse pentatonic melody ---
        const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
        const playMelodyNote = () => {
            if (!musicEnabled || !masterGainRef) return;
            const ctx2 = getCtx();
            if (!ctx2) return;
            const t = ctx2.currentTime;
            const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
            // Main note
            const osc = ctx2.createOscillator();
            const gain = ctx2.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.03, t + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 5);
            osc.connect(gain);
            gain.connect(masterGainRef);
            osc.start(t);
            osc.stop(t + 5.5);
            // Soft harmonic
            const osc2 = ctx2.createOscillator();
            const gain2 = ctx2.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(freq * 2, t);
            gain2.gain.setValueAtTime(0, t);
            gain2.gain.linearRampToValueAtTime(0.01, t + 0.4);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + 3.5);
            osc2.connect(gain2);
            gain2.connect(masterGainRef);
            osc2.start(t);
            osc2.stop(t + 4);
            // Schedule next note
            musicLoopTimer = setTimeout(playMelodyNote, 4000 + Math.random() * 5000);
        };
        musicLoopTimer = setTimeout(playMelodyNote, 2000);
    } catch (e) { }
};

export const stopAmbientMusic = () => {
    if (musicLoopTimer) { clearTimeout(musicLoopTimer); musicLoopTimer = null; }
    ambientNodes.forEach(n => {
        try { if (n.osc) n.osc.stop(); if (n.lfo) n.lfo.stop(); } catch (e) { }
    });
    ambientNodes = [];
    masterGainRef = null;
};