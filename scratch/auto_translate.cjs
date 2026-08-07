const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src', 'lib', 'translations.js');
let content = fs.readFileSync(file, 'utf-8');

// Parse the content dynamically to get the object
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
    es: 'Spanish', zh: 'Chinese (Simplified)', ru: 'Russian',
    th: 'Thai', hi: 'Hindi', ja: 'Japanese', ko: 'Korean',
    fr: 'French', de: 'German', it: 'Italian', no: 'Norwegian'
};

const CHUNK_SIZE = 40;

async function translateChunk(keys, langCode, langName) {
    const sourceObj = {};
    for (const k of keys) sourceObj[k] = enObj[k];
    
    const prompt = `You are a professional translator. Translate the values of the following JSON object from English to ${langName}. 
CRITICAL: You MUST return ONLY a raw, valid JSON object. Do not include markdown formatting like \`\`\`json. Ensure keys remain exactly the same.
JSON to translate:
${JSON.stringify(sourceObj, null, 2)}`;

    let retries = 3;
    while (retries > 0) {
        try {
            const res = await fetch(`https://text.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
            let text = await res.text();
            
            // Clean up possible markdown
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            if (start !== -1 && end !== -1) {
                text = text.substring(start, end + 1);
            }
            
            const parsed = JSON.parse(text);
            
            // Verify keys
            let valid = true;
            for (const k of keys) {
                if (typeof parsed[k] !== 'string') valid = false;
            }
            
            if (valid) return parsed;
        } catch (e) {
            console.log(`Error parsing response for ${langCode}, retrying... (${retries} left)`);
            retries--;
        }
    }
    return null;
}

async function run() {
    let hasChanges = false;

    for (const lang of Object.keys(LANG_MAP)) {
        const langObj = t[lang] || {};
        const langKeys = Object.keys(langObj);
        
        // Find missing keys
        const missing = enKeys.filter(k => !langKeys.includes(k) || langObj[k] === '...');
        if (missing.length === 0) continue;
        
        console.log(`Translating ${missing.length} keys for ${lang} (${LANG_MAP[lang]})...`);
        
        // Chunk missing keys
        for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
            const chunk = missing.slice(i, i + CHUNK_SIZE);
            console.log(`  - Chunk ${Math.floor(i/CHUNK_SIZE) + 1} (${chunk.length} keys)...`);
            
            const translated = await translateChunk(chunk, lang, LANG_MAP[lang]);
            if (translated) {
                for (const k of chunk) {
                    langObj[k] = translated[k];
                }
                hasChanges = true;
            } else {
                console.log(`Failed to translate chunk for ${lang}`);
            }
        }
    }

    if (hasChanges) {
        console.log('Writing back to translations.js...');
        
        // We will reconstruct the file perfectly by stringifying the object.
        // To preserve order and comments if possible, but actually we can just stringify and format it.
        // Wait, stringifying will remove comments.
        // Since the user wants a full reliable file, rebuilding it is safer.
        let output = `export const translations = {\n`;
        for (const lang of Object.keys(t)) {
            output += `    ${lang}: {\n`;
            for (const key of Object.keys(t[lang])) {
                let val = t[lang][key];
                if (typeof val === 'string') {
                    // escape backticks and interpolation
                    val = val.replace(/`/g, '\\`').replace(/\\n/g, '\n');
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
