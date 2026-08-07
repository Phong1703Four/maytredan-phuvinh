const fs = require('fs');
const path = require('path');
const https = require('https');

const file = path.join(process.cwd(), 'src', 'lib', 'translations.js');
let content = fs.readFileSync(file, 'utf-8');

const evalStr = content.replace('export const translations =', 'global.translations =');
try {
    eval(evalStr);
} catch (e) {
    console.error('Eval error:', e);
    process.exit(1);
}

const t = global.translations;
const enObj = t.en;
const enKeys = Object.keys(enObj);

const LANG_MAP = {
    es: 'es', zh: 'zh-CN', ru: 'ru',
    th: 'th', hi: 'hi', ja: 'ja', ko: 'ko',
    fr: 'fr', de: 'de', it: 'it', no: 'no'
};

async function translateText(text, targetLang) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const translated = json[0].map(item => item[0]).join('');
                    resolve(translated);
                } catch (e) {
                    resolve(text); // fallback to english if fails
                }
            });
        }).on('error', (e) => resolve(text));
    });
}

// Batch parallel requests
async function translateBatch(keys, langCode) {
    const results = {};
    const promises = keys.map(async (k) => {
        const text = enObj[k];
        if (!text || text.trim() === '') {
            results[k] = text;
            return;
        }
        const translated = await translateText(text, langCode);
        results[k] = translated;
    });
    await Promise.all(promises);
    return results;
}

async function run() {
    let hasChanges = false;

    for (const lang of Object.keys(LANG_MAP)) {
        const langCode = LANG_MAP[lang];
        const langObj = t[lang] || {};
        const langKeys = Object.keys(langObj);
        
        // Find missing keys
        const missing = enKeys.filter(k => !langKeys.includes(k) || langObj[k] === '...');
        if (missing.length === 0) continue;
        
        console.log(`Translating ${missing.length} keys for ${lang} (${langCode})...`);
        
        // Translate in chunks of 50 to avoid rate limits
        for (let i = 0; i < missing.length; i += 50) {
            const chunk = missing.slice(i, i + 50);
            console.log(`  - Chunk ${Math.floor(i/50) + 1}...`);
            const translatedMap = await translateBatch(chunk, langCode);
            for (const k of chunk) {
                langObj[k] = translatedMap[k];
            }
            hasChanges = true;
            // sleep 500ms
            await new Promise(r => setTimeout(r, 500));
        }
    }

    if (hasChanges) {
        console.log('Writing back to translations.js...');
        
        let output = `export const translations = {\n`;
        for (const lang of Object.keys(t)) {
            output += `    ${lang}: {\n`;
            for (const key of Object.keys(t[lang])) {
                let val = t[lang][key];
                if (typeof val === 'string') {
                    // escape backticks and interpolation
                    val = val.replace(/`/g, '\\`').replace(/\\n/g, '\n').replace(/\\/g, '\\\\');
                    
                    // Actually we need to ensure valid string template literal
                    val = val.replace(/\\\`/g, '\\`'); // avoid double escape if we just did it
                }
                output += `        '${key}': \`${val}\`,\n`;
            }
            output += `    },\n`;
        }
        output += `};\n`;
        
        fs.writeFileSync(file, output, 'utf-8');
        console.log('Successfully updated translations.js!');
    } else {
        console.log('No changes were made.');
    }
}

run();
