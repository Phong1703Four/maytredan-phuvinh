// Google Analytics 4 + Base44 Analytics integration
// Track page views, product views, cart actions, and custom events

import { base44 } from '@/api/base44Client';

let gaInitialized = false;
let gaId = null;

// GA4 Measurement ID — replace with your actual ID in index.html
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export function initGA() {
    if (gaInitialized || typeof window === 'undefined') return;
    // GA4 is loaded via index.html script tags
    if (typeof window.gtag === 'function') {
        gaInitialized = true;
        gaId = GA_MEASUREMENT_ID;
    }
}

// Track a page view
export function trackPageView(path) {
    initGA();
    if (typeof window.gtag === 'function' && gaId && gaId !== 'G-XXXXXXXXXX') {
        window.gtag('config', gaId, { page_path: path || window.location.pathname });
    }
    try {
        base44.analytics?.track?.({ eventName: 'page_view', properties: { path: path || window.location.pathname } });
    } catch { }
}

// Track a product view
export function trackProductView(product) {
    initGA();
    if (typeof window.gtag === 'function' && gaId && gaId !== 'G-XXXXXXXXXX') {
        window.gtag('event', 'view_item', {
            items: [{ item_id: product.id, item_name: product.name_en || product.name_vi, price: product.price, item_category: product.category }],
        });
    }
    try {
        base44.analytics?.track?.({ eventName: 'product_view', properties: { product_id: product.id, product_name: product.name_en || product.name_vi, category: product.category, price: product.price } });
    } catch { }
}

// Track add to cart
export function trackAddToCart(product, qty = 1) {
    initGA();
    if (typeof window.gtag === 'function' && gaId && gaId !== 'G-XXXXXXXXXX') {
        window.gtag('event', 'add_to_cart', {
            items: [{ item_id: product.id, item_name: product.name_en || product.name_vi, price: product.price, quantity: qty }],
        });
    }
    try {
        base44.analytics?.track?.({ eventName: 'add_to_cart', properties: { product_id: product.id, product_name: product.name_en || product.name_vi, price: product.price, qty } });
    } catch { }
}

// Track checkout / order placed
export function trackCheckout(total, itemCount) {
    initGA();
    if (typeof window.gtag === 'function' && gaId && gaId !== 'G-XXXXXXXXXX') {
        window.gtag('event', 'purchase', { value: total, currency: 'VND', items: itemCount });
    }
    try {
        base44.analytics?.track?.({ eventName: 'checkout', properties: { total, item_count: itemCount } });
    } catch { }
}

// Track custom event
export function trackEvent(eventName, properties = {}) {
    initGA();
    if (typeof window.gtag === 'function' && gaId && gaId !== 'G-XXXXXXXXXX') {
        window.gtag('event', eventName, properties);
    }
    try {
        base44.analytics?.track?.({ eventName, properties });
    } catch { }
}