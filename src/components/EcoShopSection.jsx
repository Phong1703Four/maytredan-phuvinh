import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Star, Heart, Eye, X, Plus, Minus, Trash2, ShoppingBag, Check, Filter, Search, BookOpen, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import CheckoutModal from './shop/CheckoutModal';
import ProductReviews from './shop/ProductReviews';
import ProductGuideModal from './shop/ProductGuideModal';
import { PRODUCTS } from '../lib/shopProducts';
import { trackProductView, trackAddToCart, trackCheckout } from '../lib/analytics';

const fmt = (n) => n.toLocaleString('vi-VN') + 'đ';

function SortDropdown({ value, onChange, t }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const options = [
        { v: 'popular', l: t('shop.sortPopular') },
        { v: 'priceLow', l: t('shop.sortPriceLow') },
        { v: 'priceHigh', l: t('shop.sortPriceHigh') },
        { v: 'rating', l: t('shop.sortRating') }
    ];
    const current = options.find(o => o.v === value);

    return (
        <div ref={ref} className="relative z-40">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 bg-transparent text-xs font-bold text-foreground outline-none cursor-pointer"
            >
                {current?.l}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-border/60 bg-card shadow-xl overflow-hidden p-1 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-200">
                    {options.map(o => (
                        <button
                            key={o.v}
                            onClick={() => { onChange(o.v); setOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-all duration-200 ${value === o.v ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                        >
                            {o.l}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function EcoShopSection() {
    const { t, lang } = useLang();
    const [favorites, setFavorites] = useState(new Set());
    const [cart, setCart] = useState([]);
    const [added, setAdded] = useState(new Set());
    const [cartOpen, setCartOpen] = useState(false);
    const [quickView, setQuickView] = useState(null);
    const [category, setCategory] = useState('all');
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [materialFilter, setMaterialFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [guideProduct, setGuideProduct] = useState(null);
    const clearCart = () => setCart([]);

    const CATEGORIES = [
        { id: 'all', label: t('shop.all') },
        { id: 'toys', label: t('shop.toys') },
        { id: 'decor', label: t('shop.decor') },
        { id: 'office', label: t('shop.office') },
        { id: 'home', label: t('shop.home') },
        { id: 'charms', label: t('shop.charms') },
    ];

    const pName = (p) => p[`name_${lang}`] || p.name_en;
    const pBadge = (p) => p.badge ? (p[`badge_${lang}`] || p.badge_en) : null;
    const catLabel = (catId) => CATEGORIES.find(c => c.id === catId)?.label || catId;

    const filtered = PRODUCTS
        .filter(p => category === 'all' || p.category === category)
        .filter(p => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return p.name_vi.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q) || (p.name_es || '').toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q);
        })
        .filter(p => {
            if (priceFilter === 'all') return true;
            if (priceFilter === 'under30') return p.price < 30000;
            if (priceFilter === '30to50') return p.price >= 30000 && p.price <= 50000;
            if (priceFilter === 'above50') return p.price > 50000;
            return true;
        })
        .filter(p => materialFilter === 'all' || p.materials?.includes(materialFilter))
        .sort((a, b) => {
            if (sortBy === 'priceLow') return a.price - b.price;
            if (sortBy === 'priceHigh') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.sold - a.sold;
        });

    const toggleFav = (id) => setFavorites(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const addToCart = (product) => {
        trackAddToCart(product);
        setCart(prev => {
            const ex = prev.find(i => i.id === product.id);
            if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
        setAdded(prev => new Set([...prev, product.id]));
        setTimeout(() => setAdded(prev => { const n = new Set(prev); n.delete(product.id); return n; }), 1800);
        setCartOpen(true);
        setTimeout(() => setCartOpen(false), 3000);
    };

    const openQuickView = (product) => {
        trackProductView(product);
        setQuickView(product);
    };

    const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    return (
        <section id="shop" className="py-24 relative bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-primary/70 mb-3">{t('shop.badge')}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2">
                        <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">{t('shop.title')}</span>
                        <span className="text-foreground">{t('shop.titleAccent')}</span>
                    </h2>
                    <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
                        {t('shop.desc')} <span className="text-primary font-bold">20.000đ – 25.000đ</span>
                    </p>
                </motion.div>

                <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    {CATEGORIES.map(cat => (
                        <button key={cat.id} onClick={() => setCategory(cat.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${category === cat.id ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto mb-6 space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder={t('shop.search')}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-card border border-border">
                            <span className="text-xs font-semibold text-muted-foreground mr-1">{t('shop.priceRange')}:</span>
                            {[
                                { k: 'all', l: t('shop.allPrices') },
                                { k: 'under30', l: t('shop.priceUnder30') },
                                { k: '30to50', l: t('shop.price30to50') },
                                { k: 'above50', l: t('shop.priceAbove50') },
                            ].map(p => (
                                <button key={p.k} onClick={() => setPriceFilter(p.k)}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${priceFilter === p.k ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary'}`}>
                                    {p.l}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-card border border-border">
                            <span className="text-xs font-semibold text-muted-foreground mr-1">{t('shop.material')}:</span>
                            {[
                                { k: 'all', l: t('shop.allMaterials') },
                                { k: 'bamboo', l: t('shop.mat.bamboo') },
                                { k: 'rattan', l: t('shop.mat.rattan') },
                                { k: 'reed', l: t('shop.mat.reed') },
                            ].map(m => (
                                <button key={m.k} onClick={() => setMaterialFilter(m.k)}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${materialFilter === m.k ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary'}`}>
                                    {m.l}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-card border border-border ml-auto">
                            <span className="text-xs font-semibold text-muted-foreground mr-1">{t('shop.sort')}:</span>
                            <SortDropdown value={sortBy} onChange={setSortBy} t={t} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{filtered.length} {t('shop.results')}</p>
                        {(searchQuery || priceFilter !== 'all' || materialFilter !== 'all' || sortBy !== 'popular') && (
                            <button onClick={() => { setSearchQuery(''); setPriceFilter('all'); setMaterialFilter('all'); setSortBy('popular'); }}
                                className="text-xs text-primary font-semibold hover:underline">
                                {t('shop.clearFilters')} ✕
                            </button>
                        )}
                    </div>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-3">🔍</div>
                        <p className="text-muted-foreground font-medium">{t('shop.noResults')}</p>
                    </div>
                )}

                {cartCount > 0 && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setCartOpen(!cartOpen)}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:-translate-y-1">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="font-semibold">{cartCount} {t('shop.items')}</span>
                            <span className="text-sm text-white/80">· {fmt(total)}</span>
                        </motion.button>
                    </div>
                )}

                {cartOpen && cart.length > 0 && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end" onClick={() => setCartOpen(false)}>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                        <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
                            className="relative w-full max-w-md h-[80vh] md:h-screen bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden rounded-t-2xl md:rounded-none" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
                                <h3 className="font-bold text-foreground flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-primary" /> {t('shop.cart')} ({cartCount})
                                </h3>
                                <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                                        <img src={item.image} alt={pName(item)} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{pName(item)}</p>
                                            <p className="text-xs text-muted-foreground">{item.artisan}</p>
                                            <p className="text-sm text-primary font-bold mt-1">{fmt(item.price)}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-1 bg-background rounded-lg p-1 border border-border">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors">
                                                    {item.qty === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3" />}
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-5 border-t border-border space-y-3 bg-card">
                                <div className="flex justify-between text-foreground font-bold text-lg">
                                    <span>{t('shop.total')}</span>
                                    <span className="text-primary">{fmt(total)}</span>
                                </div>
                                <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                                    {t('shop.checkout')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filtered.map((product, idx) => (
                        <motion.div key={product.id}
                            layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08, duration: 0.4 }}
                            whileHover={{ y: -6 }}
                            className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                            <div className="relative aspect-square overflow-hidden">
                                {pBadge(product) && (
                                    <span className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r ${product.badgeColor} text-xs text-white font-semibold shadow-lg`}>
                                        {pBadge(product)}
                                    </span>
                                )}
                                <img src={product.image} alt={pName(product)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 gap-2">
                                    <button onClick={() => toggleFav(product.id)}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white text-xs hover:bg-red-500/30 transition-all">
                                        <Heart className={`w-3.5 h-3.5 ${favorites.has(product.id) ? 'fill-red-400 text-red-400' : ''}`} />
                                        {favorites.has(product.id) ? t('shop.faved') : t('shop.fav')}
                                    </button>
                                    <button onClick={() => setQuickView(product)}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white text-xs hover:bg-primary/30 transition-all">
                                        <Eye className="w-3.5 h-3.5" /> {t('shop.quickView')}
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-xs text-primary/70 font-medium">{catLabel(product.category)}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground my-1">
                                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}</div>
                                    <span className="text-yellow-500">{product.rating}</span>
                                    <span>· {t('shop.sold')} {product.sold}</span>
                                </div>
                                <h3 className="font-bold text-foreground mb-1 text-sm leading-snug">{pName(product)}</h3>
                                <p className="text-xs text-muted-foreground mb-3">{product.artisan}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-primary font-bold text-base">{fmt(product.price)}</p>
                                    <button onClick={() => addToCart(product)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300
                    ${added.has(product.id) ? 'bg-emerald-100 border border-emerald-300 text-emerald-700' : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white hover:shadow-md'}`}>
                                        {added.has(product.id) ? <><Check className="w-3.5 h-3.5" /> {t('shop.added')}</> : <><ShoppingCart className="w-3.5 h-3.5" /> {t('shop.addToCart')}</>}
                                    </button>
                                </div>
                                <ProductReviews productId={product.id} productName={pName(product)} />
                                <button onClick={() => setGuideProduct(product)}
                                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-all">
                                    <BookOpen className="w-3.5 h-3.5" /> {t('shop.guideBtn')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {checkoutOpen && cart.length > 0 && (
                <CheckoutModal cart={cart} onClose={() => setCheckoutOpen(false)} onSuccess={clearCart} />
            )}

            {quickView && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setQuickView(null)}>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="relative w-full max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-muted hover:bg-accent transition-colors"><X className="w-4 h-4" /></button>
                        <div className="grid md:grid-cols-2">
                            <img src={quickView.image} alt={pName(quickView)} className="w-full aspect-square object-cover" />
                            <div className="p-6 flex flex-col justify-center gap-4">
                                <div>
                                    <p className="text-xs text-primary/70 uppercase tracking-wider mb-1">{catLabel(quickView.category)} · {quickView.artisan}</p>
                                    <h3 className="text-xl font-bold text-foreground">{pName(quickView)}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(quickView.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}</div>
                                    <span className="text-sm text-muted-foreground">({quickView.sold} {t('shop.sold')})</span>
                                </div>
                                <p className="text-2xl font-bold text-primary">{fmt(quickView.price)}</p>
                                <div className="flex gap-3">
                                    <button onClick={() => toggleFav(quickView.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all
                    ${favorites.has(quickView.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}>
                                        <Heart className={`w-4 h-4 ${favorites.has(quickView.id) ? 'fill-red-400' : ''}`} />
                                        {favorites.has(quickView.id) ? t('shop.faved') : t('shop.fav')}
                                    </button>
                                    <button onClick={() => { addToCart(quickView); setQuickView(null); }}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                                        <ShoppingCart className="w-4 h-4" /> {t('shop.addToCart')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {guideProduct && (
                <ProductGuideModal product={guideProduct} onClose={() => setGuideProduct(null)} />
            )}
        </section>
    );
}