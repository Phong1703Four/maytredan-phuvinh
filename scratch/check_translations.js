import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src', 'lib', 'translations.js');
const content = fs.readFileSync(file, 'utf-8');

// We need to parse the exported object.
// A simple way is to use regex or just eval it (since it's an object).
const evalStr = content.replace('export const translations =', 'global.translations =');
try {
    eval(evalStr);
    const t = global.translations;
    const enKeys = Object.keys(t.en);
    console.log('Total EN keys:', enKeys.length);
    
    for (const lang of Object.keys(t)) {
        if (lang === 'en') continue;
        const langKeys = Object.keys(t[lang]);
        const missing = enKeys.filter(k => !langKeys.includes(k) && !t[lang][k]);
        console.log(`Language ${lang} has ${langKeys.length} keys. Missing: ${missing.length}`);
    }
} catch (e) {
    console.error('Failed to parse:', e.message);
}
