const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/lib/shopProducts.js');
let content = fs.readFileSync(targetFile, 'utf8');

let newProducts = '';

const names = [
    'Móc Khóa Hồ Lô Mây',
    'Charm Cỏ 4 Lá Tre',
    'Móc Khóa Heo Đất Mây',
    'Charm Mặt Trăng Tre',
    'Móc Khóa Chuông Gió Mây',
    'Charm Rùa Con Mây',
    'Móc Khóa Chim Én Tre',
    'Charm Hoa Đào Mây',
    'Móc Khóa Bướm Tre',
    'Charm Ngựa Gỗ Mây',
    'Móc Khóa Nón Lá Cờ Đỏ',
    'Charm Mặt Trời Mây',
    'Móc Khóa Sao Biển Tre',
    'Charm Bông Tuyết Mây',
    'Móc Khóa Chiếc Cúp Tre',
    'Charm Khóa Vàng Mây',
    'Móc Khóa Lồng Đèn Đỏ Mây',
    'Charm Nơ Xinh Tre',
    'Móc Khóa Gấu Nâu Mây',
    'Charm Bánh Chưng Mây'
];

for (let i = 0; i < 20; i++) {
    const id = 81 + i;
    const name = names[i];
    newProducts += `    {
        id: ${id}, name_vi: '${name}', name_en: '${name} (English)', name_es: '${name} (Spanish)', name_zh: '${name} (Chinese)', artisan: 'Đông Hương', price: ${Math.floor(Math.random() * 20 + 10) * 1000}, rating: ${(Math.random() * 0.5 + 4.5).toFixed(1)}, sold: ${Math.floor(Math.random() * 500 + 100)}, badge: null, image: IMAGES.product${(i % 6) + 1}, category: 'charms', materials: ['bamboo', 'rattan'],
        guide: {
            dimensions: '3 × 3 × 1 cm', craftTime: '1 giờ',
            care: { vi: 'Tránh nước', en: 'Avoid water', es: 'Evita agua', zh: '防水' },
            story: { vi: '${name} thủ công.', en: 'Handcrafted charm.', es: 'Charm artesanal.', zh: '手工饰品。' },
            usage: { vi: 'Trang trí móc khóa.', en: 'Keychain decor.', es: 'Decoración.', zh: '钥匙扣装饰。' }
        }
    },\n`;
}

// Thay thế `];` ở cuối file bằng các sản phẩm mới + `];`
if (content.endsWith('];\n') || content.endsWith('];')) {
    content = content.replace(/\];?\s*$/, newProducts + '];\n');
} else if (content.includes('    }\n];')) {
    content = content.replace(/    }\n\];/, '    },\n' + newProducts + '];');
} else {
    // try replacing the last ];
    const lastBracketIndex = content.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        content = content.slice(0, lastBracketIndex) + ',\n' + newProducts + '];\n';
    }
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully appended 20 charms.');
