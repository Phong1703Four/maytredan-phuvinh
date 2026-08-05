// High-quality SVG flag icons — no emoji. viewBox 0 0 60 40, rounded.
export default function FlagIcon({ code, className = '' }) {
    const props = { className, viewBox: '0 0 60 40', preserveAspectRatio: 'none' };
    const clip = <clipPath id={`r-${code}`}><rect width="60" height="40" rx="6" /></clipPath>;

    switch (code) {
        case 'vi':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#DA251D" /><path d="M30 9.5l5.5 16.9-14.4-10.5h17.8L24.5 26.4z" fill="#FFFF00" /></g></svg>);
        case 'en':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#012169" /><path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="6" /><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" /><path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="10" /><path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="6" /></g></svg>);
        case 'es':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#AA151B" /><rect y="10" width="60" height="20" fill="#F1BF00" /></g></svg>);
        case 'fr':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="20" height="40" x="0" fill="#0055A4" /><rect width="20" height="40" x="20" fill="#fff" /><rect width="20" height="40" x="40" fill="#EF4135" /></g></svg>);
        case 'de':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="13.3" fill="#000" /><rect y="13.3" width="60" height="13.4" fill="#DD0000" /><rect y="26.7" width="60" height="13.3" fill="#FFCE00" /></g></svg>);
        case 'it':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="20" height="40" x="0" fill="#009246" /><rect width="20" height="40" x="20" fill="#fff" /><rect width="20" height="40" x="40" fill="#CE2B37" /></g></svg>);
        case 'no':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#EF2B2D" /><rect x="18" width="8" height="40" fill="#fff" /><rect y="16" width="60" height="8" fill="#fff" /><rect x="20" width="4" height="40" fill="#002868" /><rect y="18" width="60" height="4" fill="#002868" /></g></svg>);
        case 'zh':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#DE2910" /><path d="M10 7l1.8 5.5-4.7-3.4h5.8l-4.7 3.4z" fill="#FFDE00" /><path d="M18 4l.5 2-2-1 3 .5-2.5 1.2z" fill="#FFDE00" /><path d="M20 9l.4 1.8-1.5-1.3 2.4.6-1.7 1z" fill="#FFDE00" /><path d="M19 15l.4 1.8-1.5-1.3 2.4.6-1.7 1z" fill="#FFDE00" /><path d="M15 19l.4 1.8-1.5-1.3 2.4.6-1.7 1z" fill="#FFDE00" /></g></svg>);
        case 'ja':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#fff" /><circle cx="30" cy="20" r="10" fill="#BC002D" /></g></svg>);
        case 'ko':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="40" fill="#fff" /><circle cx="30" cy="20" r="8" fill="#CD2E3A" /><path d="M30 12a8 8 0 0 1 0 16 4 8 0 0 0 0-16z" fill="#0047A0" /></g></svg>);
        case 'th':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="6.6" fill="#ED1C24" /><rect y="6.6" width="60" height="6.7" fill="#fff" /><rect y="13.3" width="60" height="13.4" fill="#241D4F" /><rect y="26.7" width="60" height="6.7" fill="#fff" /><rect y="33.4" width="60" height="6.6" fill="#ED1C24" /></g></svg>);
        case 'hi':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="13.3" fill="#FF9933" /><rect y="13.3" width="60" height="13.4" fill="#fff" /><rect y="26.7" width="60" height="13.3" fill="#138808" /><circle cx="30" cy="20" r="3.5" fill="none" stroke="#000080" strokeWidth="1" /></g></svg>);
        case 'ru':
            return (<svg {...props}><g clipPath={`url(#r-${code})`}>{clip}<rect width="60" height="13.3" fill="#fff" /><rect y="13.3" width="60" height="13.4" fill="#0039A6" /><rect y="26.7" width="60" height="13.3" fill="#D52B1E" /></g></svg>);
        default:
            return (<svg {...props}><rect width="60" height="40" rx="6" fill="#e5e7eb" /></svg>);
    }
}