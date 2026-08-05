import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from './ChatbotWidget';
import SplashIntro from './SplashIntro';
import PageTransition from './PageTransition';
import { initSound, playClick, playTransition } from '../lib/soundManager';

export default function Layout() {
    const [splashDone, setSplashDone] = useState(false);
    const location = useLocation();
    const prevPath = useRef(location.pathname);

    // Initialize audio context on first user interaction (browser policy)
    useEffect(() => {
        initSound();
        const handler = () => initSound();
        document.addEventListener('click', handler, { once: true });
        document.addEventListener('touchstart', handler, { once: true });
        return () => {
            document.removeEventListener('click', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, []);

    // Play transition sound when route changes
    useEffect(() => {
        if (prevPath.current !== location.pathname) {
            playTransition();
            prevPath.current = location.pathname;
        }
    }, [location.pathname]);

    // Global click sound — plays on any button/link click
    useEffect(() => {
        const handler = (e) => {
            const target = e.target.closest('button, a, [role="button"], [role="tab"], input[type="checkbox"], input[type="radio"]');
            if (target) playClick();
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans" style={{ scrollBehavior: 'smooth' }}>
            {!splashDone && <SplashIntro onFinish={() => setSplashDone(true)} />}
            <Navbar />
            <main className="flex-1 bg-background text-foreground">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </main>
            <Footer />
            <ChatbotWidget />
        </div>
    );
}