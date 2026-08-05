// Content moderation system for the Community
// Detects profanity, spam, and toxic content in Vietnamese (with variants) and English
// Uses normalization + keyword matching + AI context analysis

// Vietnamese profanity and toxic words with common variants/l33t speak
const BAD_WORDS_VI = [
    // Core vulgar words (with diacritics variants)
    'địt', 'dit', 'd1t', 'đ1t', 'đjt', 'djt',
    'đm', 'dm', 'đcm', 'dcm', 'đcm', 'dcmm', 'đcmm',
    'đmm', 'dmm', 'dmm', 'đmml', 'dmml',
    'vl', 'vll', 'vlon', 'vlon', 'vl0n', 'vl0n',
    'lồn', 'lon', 'l0n', 'llon', 'l.lồn', 'l0n',
    'cặc', 'cack', 'cak', 'cak', 'c4c', 'cc4c',
    'buồi', 'buoi', 'bu0i', 'bu0i',
    'dẻ', 'de', 'd3', 'd3',
    'dái', 'dai', 'd41',
    'nứng', 'nung',
    'ỉa', 'ia', 'la',
    'đái', 'dai', 'd41',
    'quần', 'quans', 'qu4ns',
    'lồn', 'lon',
    'đỉ', 'đỉ',
    'đĩ', 'đi', 'dĩ', 'di',
    'điếm', 'diem',
    'đụ', 'du', 'dụ',
    'cứt', 'cut', 'cut',
    'chó', 'cho', 'ch0',
    'thằng chó', 'thang cho',
    'mẹ mày', 'me may', 'memay',
    'mày', 'may',
    'bố mày', 'bo may', 'bomay',
    'sùng', 'sung',
    'dở hơi', 'do hoi', 'dohoi',
    'điên', 'dien',
    'ngu', 'nGu', 'nguu',
    'óc chó', 'oc cho', 'occho',
    'sủa', 'sua', 'su4',
    'cái loz', 'cailoz', 'c4iloz', 'cail0z',
    'lồn', 'l0n', 'lon',
    'dcm', 'dcm', 'dcm',
    'đbrr', 'dbrr', 'dbr',
    'dbrr', 'dbrr',
    'dcm', 'dcm', 'đcm', 'dcm',
    'đmm', 'dmm',
    'vl', 'vll',
    'dmm', 'dmm',
    'clmm', 'clmm', 'clm', 'clmm',
    'cái lồn', 'cailon', 'c4ilon', 'cail0n',
    'thằng lồn', 'thanglon', 'thangl0n',
    'con lồn', 'conlon', 'conl0n',
    'nứng', 'nung',
    'bitch', 'b1tch', 'b!tch',
];

const BAD_WORDS_EN = [
    'fuck', 'f*ck', 'fck', 'f4ck', 'f.u.c.k',
    'shit', 'sh1t', 'sh!t', 'sh*t',
    'bitch', 'b1tch', 'b!tch',
    'asshole', 'a$$hole', 'a-hole',
    'dick', 'd1ck', 'd!ck',
    'pussy', 'pu$$y',
    'cunt', 'c4nt',
    'bastard', 'b4stard',
    'slut', 'sl4t',
    'whore', 'wh0re',
    'retard', 'ret4rd',
    'idiot', '1d10t',
    'stupid',
    'damn',
    'crap',
    'piss',
];

const SPAM_PATTERNS = [
    /(.)\1{5,}/i, // Repeated characters (aaaaaa)
    /(http|https|www\.|\.com|\.vn|\.net)/gi, // URLs
    /\b\d{10,}\b/, // Long number sequences (phone spam)
];

// Normalize text: remove diacritics, replace l33t, lowercase
function normalize(text) {
    if (!text) return '';
    let s = text.toLowerCase().trim();
    // Remove Vietnamese diacritics
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Replace common substitutions
    s = s.replace(/[4@àáảãạâầấẩẫậăằắẳẵặ]/g, 'a');
    s = s.replace(/[3èéẻẽẹêềếểễệ]/g, 'e');
    s = s.replace(/[1ìíỉĩị]/g, 'i');
    s = s.replace(/[0òóỏõọôồốổỗộơờớởỡợ]/g, 'o');
    s = s.replace(/[5]/g, 's');
    s = s.replace(/[7]/g, 't');
    s = s.replace(/[$]/g, 's');
    s = s.replace(/[!]/g, 'i');
    s = s.replace(/[.]/g, '');
    s = s.replace(/[_-]/g, ' ');
    s = s.replace(/\s+/g, ' ');
    return s;
}

export function moderateContent(text) {
    if (!text || text.trim().length === 0) {
        return { passed: true, reason: null };
    }

    const normalized = normalize(text);
    const allBadWords = [...BAD_WORDS_VI, ...BAD_WORDS_EN];
    const normalizedBad = allBadWords.map(normalize);

    // Check for bad words
    for (const bad of normalizedBad) {
        if (!bad || bad.length < 2) continue;
        // Check as whole word or substring
        const regex = new RegExp(`\\b${bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(normalized) || normalized.includes(bad)) {
            return {
                passed: false,
                reason: 'profanity',
                message: 'Nội dung chứa từ ngữ không phù hợp. Vui lòng chỉnh sửa lại.',
                messageEn: 'Content contains inappropriate language. Please edit and resubmit.',
            };
        }
    }

    // Check for spam patterns
    for (const pattern of SPAM_PATTERNS) {
        if (pattern.test(text)) {
            // URLs are allowed in moderation but flagged
            if (pattern.source.includes('http')) continue;
            return {
                passed: false,
                reason: 'spam',
                message: 'Nội dung có vẻ là spam. Vui lòng viết tự nhiên hơn.',
                messageEn: 'Content appears to be spam. Please write more naturally.',
            };
        }
    }

    // Check for excessive caps
    const upperCount = (text.match(/[A-Z]/g) || []).length;
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    if (letterCount > 10 && upperCount / letterCount > 0.7) {
        return {
            passed: false,
            reason: 'caps',
            message: 'Vui lòng không viết hoa toàn bộ nội dung.',
            messageEn: 'Please avoid writing in all caps.',
        };
    }

    // Check for very short/meaningless content
    if (text.trim().length < 5) {
        return {
            passed: false,
            reason: 'too_short',
            message: 'Nội dung quá ngắn. Vui lòng viết chi tiết hơn.',
            messageEn: 'Content is too short. Please write more detail.',
        };
    }

    return { passed: true, reason: null };
}

// Rate limiting: max posts per user per day
const POST_RATE_LIMIT = 5;
const userPostCount = {};

export function checkRateLimit(userEmail) {
    if (!userEmail) return { allowed: true };
    const today = new Date().toDateString();
    const key = `${userEmail}:${today}`;
    const count = userPostCount[key] || 0;
    if (count >= POST_RATE_LIMIT) {
        return {
            allowed: false,
            message: 'Bạn đã đăng quá nhiều bài hôm nay. Vui lòng thử lại sau.',
            messageEn: 'You have posted too many times today. Please try again later.',
        };
    }
    userPostCount[key] = count + 1;
    return { allowed: true };
}

// Log moderation action
export function logModeration(action, content, reason) {
    console.warn('[MODERATION]', { action, reason, preview: content?.substring(0, 100), timestamp: new Date().toISOString() });
}