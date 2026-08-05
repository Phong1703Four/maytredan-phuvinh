import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved ? saved === 'dark' : prefersDark;
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
        >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}