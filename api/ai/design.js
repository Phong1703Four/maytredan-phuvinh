export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    try {
        const { prompt, style, pattern, finish } = await req.json();

        // Ép các từ khóa tiếng Anh mạnh để AI không vẽ người và tập trung vào đồ thủ công
        const styleNote = style ? `Style: ${style}.` : '';
        const patternNote = pattern ? `Weave: ${pattern}.` : '';
        const finishNote = finish ? `Finish: ${finish}.` : '';

        const englishPrompt = `Authentic Vietnamese bamboo and rattan handicraft product, design requirement: ${prompt}. ${styleNote} ${patternNote} ${finishNote}
        Product photography, studio lighting, clean background, 4k resolution, high details. 
        Absolutely NO humans, NO people, NO faces, NO girls. Pure still life handmade object.`;
        
        // Tạo link ảnh tĩnh trực tiếp từ Pollinations (Miễn phí không giới hạn)
        const seed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(englishPrompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;

        const mockDesc = {
            description: `Bản thiết kế "${prompt || 'Giỏ mây tre đan'}" độc bản. Sản phẩm được tạo ra bằng trí tuệ nhân tạo, tập trung vào vẻ đẹp của chất liệu mây tre tự nhiên và kỹ thuật đan thủ công truyền thống.`,
            colorPalette: ['#f8e5c0', '#d4a373', '#8b5a2b', '#5c4033', '#e9edc9'],
            materials: ['Mây rừng tự nhiên', 'Tre già'],
            technique: `Kỹ thuật đan ${pattern || 'truyền thống'} với bề mặt ${finish || 'tự nhiên'}.`,
            materialEstimate: {
                items: [
                    { name: 'Mây rừng', weight_kg: 1.5, length_m: 200, quantity: 1, unit: 'cuộn', price_per_kg_vnd: 80000, item_cost_vnd: 120000 }
                ],
                total_weight_kg: 1.5,
                estimated_hours: 10,
                difficulty: 'Trung bình',
                total_material_cost_vnd: 120000,
                labor_cost_vnd: 500000,
                total_estimated_cost_vnd: 620000
            }
        };

        // Trả kết quả về ngay lập tức
        return new Response(JSON.stringify({ imageUrl, specs: mockDesc }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Image generation failed' }), { status: 500 });
    }
}
