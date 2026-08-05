import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';
import ThemeToggle from './ThemeToggle';
import LanguageCenter from './LanguageCenter';
import SettingsDropdown from './SettingsDropdown';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const { t } = useLang();
    const location = useLocation();

    const NAV_LINKS = [
        { label: t('nav.home'), to: '/' },
        { label: t('nav.shop'), to: '/products' },
        { label: t('nav.village'), to: '/village' },
        { label: t('nav.membership'), to: '/membership', demo: true },
        { label: t('nav.community'), to: '/community', demo: true },
        { label: t('nav.support'), to: '/support' },
        { label: t('nav.tutorial'), to: '/tutorial' },
    ];

    const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-background/75 backdrop-blur-xl border-b border-border/40 shadow-sm">
                <div className="max-w-[1400px] mx-auto h-full px-5 lg:px-8 flex items-center justify-between gap-6">
                    {/* Zone 1: Logo */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" />
                                <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
                            </svg>
                        </div>
                        <div className="hidden sm:block leading-none">
                            <span className="text-[15px] font-semibold text-foreground tracking-tight block">Phú Vinh AI</span>
                            <span className="text-[10px] text-primary/60 mt-0.5 block">{t('nav.tagline')}</span>
                        </div>
                    </Link>

                    {/* Zone 2: Navigation — centered */}
                    <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                        {NAV_LINKS.map(link => {
                            const active = isActive(link.to);
                            return (
                                <Link key={link.to} to={link.to} className="relative px-4 xl:px-5 py-2 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group">
                                    <span className="flex items-center gap-1.5">
                                        {link.label}
                                        {link.demo && (
                                            <span className="px-1 py-px text-[8px] font-bold rounded bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 leading-none">DEMO</span>
                                        )}
                                    </span>
                                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-all duration-300 ${active ? 'w-5' : 'w-0 group-hover:w-4'}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Zone 3: Utilities */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Link to="/products" aria-label="Cart" className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 hidden sm:block">
                            <ShoppingCart className="w-[18px] h-[18px]" />
                        </Link>
                        <LanguageCenter />
                        <ThemeToggle />
                        <SettingsDropdown />
                        <UserMenu onOpenAuth={() => setAuthOpen(true)} />
                        <button className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-accent transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                {mobileOpen && (
                    <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-background/98 backdrop-blur-2xl border-b border-border/40 shadow-xl">
                        <div className="px-5 py-4 space-y-1">
                            {NAV_LINKS.map(link => {
                                const active = isActive(link.to);
                                return (
                                    <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-2 px-3 py-3 text-[15px] font-medium rounded-xl transition-colors ${active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-accent'}`}>
                                        {link.label}
                                        {link.demo && <span className="px-1 py-px text-[8px] font-bold rounded bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 leading-none">DEMO</span>}
                                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </>
    );
}