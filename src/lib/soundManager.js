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
    if (bgMusicAudio) {
        try { bgMusicAudio.volume = musicVolume; } catch (e) { }
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
let bgMusicAudio = null;

export const startAmbientMusic = () => {
    if (!musicEnabled) return;
    
    try {
        if (!bgMusicAudio) {
            bgMusicAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
            bgMusicAudio.crossOrigin = 'anonymous';
            bgMusicAudio.loop = true;
        }
        bgMusicAudio.volume = musicVolume;
        
        // Browsers might block autoplay if no interaction happened
        const playPromise = bgMusicAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.warn("Auto-play was prevented by browser:", e);
                // Pause it so the state remains consistent
                bgMusicAudio.pause();
            });
        }
    } catch (e) {
        console.error("Failed to start ambient music:", e);
    }
};

export const stopAmbientMusic = () => {
    if (bgMusicAudio) {
        try {
            bgMusicAudio.pause();
        } catch (e) {
            console.error("Failed to stop ambient music:", e);
        }
    }
};