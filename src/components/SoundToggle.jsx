import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../lib/soundManager';

export default function SoundToggle() {
    const [enabled, setEnabled] = useState(isSoundEnabled());

    useEffect(() => {
        setEnabled(isSoundEnabled());
    }, []);

    const toggle = () => {
        const newVal = !enabled;
        setSoundEnabled(newVal);
        setEnabled(newVal);
    };

    return (
        <button
            onClick={toggle}
            title={enabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className={`fixed bottom-6 left-20 z-50 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${enabled
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-400/50 hover:shadow-emerald-500/40'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/40'
                }`}
        >
            {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
    );
}