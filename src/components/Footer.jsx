import { Facebook, Youtube, Instagram, Twitter, Phone, Mail, MapPin, Clock, Heart, Leaf, ArrowUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const SOCIAL = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', color: 'from-blue-500 to-blue-700', hover: 'hover:shadow-blue-500/40' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com', color: 'from-red-500 to-red-700', hover: 'hover:shadow-red-500/40' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', color: 'from-pink-500 to-purple-600', hover: 'hover:shadow-pink-500/40' },
    { icon: Twitter, label: 'TikTok', href: 'https://tiktok.com', color: 'from-slate-400 to-slate-600', hover: 'hover:shadow-slate-400/40' },
];

export default function Footer() {
    const { t } = useLang();

    const PRODUCT_LINKS = [
        t('prod.chairs'), t('prod.lamps'), t('prod.bags'), t('prod.mirrors'), t('prod.boxes'), t('prod.new'),
    ];
    const VILLAGE_LINKS = [
        t('vil.history'), t('vil.artisans'), t('vil.process'), t('vil.stories'), t('vil.conservation'),
    ];
    const SUPPORT_LINKS = [
        { label: t('footer.shipping'), desc: t('footer.shipping.desc'), to: '/support' },
        { label: t('footer.returns'), desc: t('footer.returns.desc'), to: '/support' },
        { label: t('footer.warranty'), desc: t('footer.warranty.desc'), to: '/support' },
        { label: t('footer.care'), desc: t('footer.care.desc'), to: '/support' },
        { label: t('footer.faq'), desc: t('footer.faq.desc'), to: '/support' },
        { label: t('footer.privacy'), desc: t('footer.privacy.desc'), to: '/privacy' },
    ];

    return (
        <footer className="relative mt-16 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="bg-gradient-to-b from-secondary/60 to-background relative">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-5 gap-12 mb-16">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Leaf className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-foreground tracking-tight">Phú Vinh AI</span>
                                    <p className="text-xs text-primary/70 -mt-0.5">{t('nav.tagline')}</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">{t('footer.brand.desc')}</p>

                            <div className="flex gap-3">
                                {SOCIAL.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.hover} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                        <s.icon className="w-4 h-4 text-white" />
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    { icon: Phone, text: '0912 345 678', sub: t('footer.contact.phone') },
                                    { icon: Mail, text: 'contact@phuvinhmaytredan.vn', sub: null },
                                    { icon: MapPin, text: t('contact.address'), sub: null },
                                    { icon: Clock, text: t('footer.contact.hours'), sub: null },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-start gap-3 group">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <c.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{c.text}</p>
                                            {c.sub && <p className="text-xs text-primary/60">{c.sub}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                <span className="w-4 h-px bg-primary inline-block" />
                                {t('footer.products')}
                            </h4>
                            <ul className="space-y-2.5">
                                {PRODUCT_LINKS.map(link => (
                                    <li key={link}>
                                        <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                                            <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Village */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                <span className="w-4 h-px bg-primary inline-block" />
                                {t('footer.village')}
                            </h4>
                            <ul className="space-y-2.5">
                                {VILLAGE_LINKS.map(link => (
                                    <li key={link}>
                                        <Link to="/village" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                                            <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link to="/tutorial" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                                        <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                                        {t('vil.tutorial')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support — detailed */}
                        <div>
                            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                <span className="w-4 h-px bg-primary inline-block" />
                                {t('footer.support')}
                            </h4>
                            <ul className="space-y-2.5">
                                {SUPPORT_LINKS.map(link => (
                                    <li key={link.label}>
                                        {link.to ? (
                                            <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-1.5 group">
                                                <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3 mt-2 flex-shrink-0" />
                                                <span>
                                                    <span className="font-semibold text-foreground group-hover:text-primary block">{link.label}</span>
                                                    <span className="text-xs text-muted-foreground/70">{link.desc}</span>
                                                </span>
                                                <ChevronRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors mt-0.5 flex-shrink-0" />
                                            </Link>
                                        ) : (
                                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-1.5 group">
                                                <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3 mt-2 flex-shrink-0" />
                                                <span>
                                                    <span className="font-semibold text-foreground group-hover:text-primary block">{link.label}</span>
                                                    <span className="text-xs text-muted-foreground/70">{link.desc}</span>
                                                </span>
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/5 to-primary/10 border border-primary/20 p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-foreground mb-1">{t('footer.newsletter.title')}</h4>
                            <p className="text-sm text-muted-foreground">{t('footer.newsletter.desc')}</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input type="email" placeholder={t('footer.newsletter.placeholder')}
                                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-background/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors" />
                            <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                                {t('footer.newsletter.btn')}
                            </button>
                        </div>
                    </div>

                    {/* Slogan */}
                    <div className="text-center mb-6">
                        <p className="text-sm font-medium text-primary/80 italic tracking-wide">
                            "Mang Tre Đây - Ta Cùng Viết Tiếp Câu Chuyện - Mây Tre Đan!"
                        </p>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            {t('footer.rights')} <Heart className="w-3 h-3 text-red-400 fill-red-400" /> {t('footer.location')}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
                            <Link to="/support" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
                            <Link to="/" className="hover:text-primary transition-colors">{t('footer.sitemap')}</Link>
                        </div>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all hover:-translate-y-1">
                            <ArrowUp className="w-4 h-4 text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}