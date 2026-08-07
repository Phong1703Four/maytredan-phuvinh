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
                <div className="w-full h-full px-4 lg:px-6 flex items-center justify-between gap-8">
                    {/* Zone 1: Logo */}
                    <div className="flex-1 flex items-center justify-start">
                        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                            <div className="w-9 h-9 rounded-xl border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:block leading-none">
                                <span className="text-[15px] font-semibold text-foreground tracking-tight block">Phú Vinh AI</span>
                                <span className="text-[10px] text-primary/60 mt-0.5 block">{t('nav.tagline')}</span>
                            </div>
                        </Link>
                    </div>

                    {/* Zone 2: Navigation — centered */}
                    <div className="hidden xl:flex items-center justify-center gap-5 xl:gap-8">
                        {NAV_LINKS.map(link => {
                            const active = isActive(link.to);
                            return (
                                <Link key={link.to} to={link.to} className={`relative py-2 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 group ${active ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}>
                                    <span className="flex items-center gap-2">
                                        {link.label}
                                        {link.demo && (
                                            <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 leading-none">DEMO</span>
                                        )}
                                    </span>
                                    <span className={`absolute -bottom-1.5 left-0 h-[3px] bg-primary rounded-full transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Zone 3: Utilities */}
                    <div className="flex-1 flex items-center justify-end gap-3 flex-shrink-0">
                        <Link to="/products" aria-label="Cart" className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 hidden sm:block">
                            <ShoppingCart className="w-[18px] h-[18px]" />
                        </Link>
                        <LanguageCenter />
                        <ThemeToggle />
                        <SettingsDropdown />
                        <UserMenu onOpenAuth={() => setAuthOpen(true)} />
                        <button className="xl:hidden p-2 rounded-xl text-muted-foreground hover:bg-accent transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                {mobileOpen && (
                    <div className="xl:hidden absolute top-[72px] left-0 right-0 bg-background/98 backdrop-blur-2xl border-b border-border/40 shadow-xl">
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