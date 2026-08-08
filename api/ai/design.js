export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const body = await req.json();
        const { prompt, style, size, pattern, finish, imageUrl } = body;

        // Prompt Engineering Middleware
        const styleNote = style ? ` Style: ${style}.` : '';
        const patternNote = pattern ? ` Weave pattern: ${pattern}.` : '';
        const finishNote = finish ? ` Finish: ${finish}.` : '';
        
        let finalPrompt = `Tạo một bản thiết kế chân thực với yêu cầu: ${prompt || 'sản phẩm mây tre đan'}. ${styleNote} ${patternNote} ${finishNote} 
Yêu cầu bắt buộc: Sử dụng chất liệu tự nhiên (mây, tre, giang). Thể hiện rõ kỹ thuật đan lát thủ công tinh xảo. Hình ảnh chất lượng cao 4k, ánh sáng studio, phông nền đơn giản tôn lên vẻ đẹp sản phẩm. STRICTLY NO HUMANS, NO FACES.`;

        // 1. Generate Image using Gemini (Imagen 3)
        let generatedImageUrl = '';
        let base64Image = '';
        
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`;
            const imgRes = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [{ prompt: finalPrompt }],
                    parameters: { sampleCount: 1, aspectRatio: "1:1" }
                })
            });

            if (!imgRes.ok) {
                console.error("Gemini Image Error:", await imgRes.text());
                throw new Error("Failed to generate image from Gemini");
            }

            const imgData = await imgRes.json();
            if (imgData.predictions && imgData.predictions[0] && imgData.predictions[0].bytesBase64Encoded) {
                base64Image = imgData.predictions[0].bytesBase64Encoded;
                generatedImageUrl = `data:image/jpeg;base64,${base64Image}`;
            } else {
                throw new Error("Invalid response format from Gemini");
            }
        } catch (imgErr) {
            console.error("Imagen API failed, falling back to Pollinations for high-availability", imgErr);
            // Fallback for robustness
            const seed = Math.floor(Math.random() * 1000000);
            generatedImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
        }

        // 2. Generate Design Specs using Gemini Text Model (gemini-1.5-flash)
        let designSpecs = {
            description: `Sản phẩm "${prompt || 'Giỏ mây tre đan'}" được thiết kế thủ công tinh xảo, mang hơi hướng ${style || 'truyền thống'}. Sự kết hợp hoàn hảo giữa kỹ thuật đan lát đặc trưng và vẻ đẹp tự nhiên của chất liệu mang đến không gian sang trọng.`,
            colorPalette: ['#f8e5c0', '#d4a373', '#8b5a2b', '#5c4033', '#e9edc9'],
            materials: ['Mây rừng tự nhiên', 'Tre già'],
            technique: `Kỹ thuật đan ${pattern || 'truyền thống'} với độ hoàn thiện ${finish || 'tự nhiên'}.`,
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

        try {
            const txtUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
            const txtPrompt = `Bạn là chuyên gia thiết kế sản phẩm mây tre đan Phú Vinh, Việt Nam. Tạo một mô tả thiết kế chi tiết, bảng màu gợi ý và ước lượng nguyên liệu + giá cả chi tiết cho sản phẩm: "${prompt || 'sản phẩm mây tre đan'}".${styleNote}${patternNote}${finishNote} Trả lời CHỈ BẰNG JSON hợp lệ với cấu trúc sau (không bọc trong markdown code block):
{
  "description": "mô tả thiết kế 3-4 câu bằng tiếng Việt",
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
  "materials": ["vật liệu 1", "vật liệu 2"],
  "technique": "kỹ thuật đan",
  "materialEstimate": {
    "items": [
      { "name": "Mây rừng", "weight_kg": 1.5, "length_m": 200, "quantity": 1, "unit": "cuộn", "price_per_kg_vnd": 80000, "item_cost_vnd": 120000 }
    ],
    "total_weight_kg": 1.5,
    "estimated_hours": 12,
    "difficulty": "Trung bình - Cao",
    "total_material_cost_vnd": 120000,
    "labor_cost_vnd": 600000,
    "total_estimated_cost_vnd": 720000
  }
}`;
            const txtRes = await fetch(txtUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: txtPrompt }] }] })
            });
            if (txtRes.ok) {
                const txtData = await txtRes.json();
                const rawText = txtData.candidates[0].content.parts[0].text;
                const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
                designSpecs = JSON.parse(cleanJson);
            }
        } catch (txtErr) {
            console.error("Gemini Text Error, using fallback specs:", txtErr);
        }

        return new Response(JSON.stringify({
            imageUrl: generatedImageUrl,
            specs: designSpecs
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Design API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
