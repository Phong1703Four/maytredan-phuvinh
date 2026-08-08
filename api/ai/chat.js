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

    if (!process.env.GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { messages, lang, systemPrompt } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
        }

        const payload = {
            model: 'gemini-1.5-flash',
            stream: true,
            temperature: 0.7,
            max_tokens: 500,
            messages: [
                {
                    role: 'system',
                    content: `Bạn là trợ lý AI thông minh của nền tảng kỹ thuật số hệ sinh thái Phú Vinh AI. 
                    Nhiệm vụ cốt lõi của bạn là kết nối các nghệ nhân làng nghề truyền thống Phú Vinh với những bản thiết kế tùy chỉnh bằng AI. 
                    Hãy tư vấn cho khách hàng một cách thân thiện, truyền cảm hứng và đầy tự hào về các sản phẩm thủ công mỹ nghệ, kỹ thuật đan lát, và giá trị văn hóa của vật liệu tự nhiên (mây, tre, giang).
                    Hãy đưa ra những câu trả lời chuyên nghiệp, giúp người dùng hiểu rõ sự kết hợp hoàn hảo giữa thiết kế AI hiện đại và đôi bàn tay khéo léo của nghệ nhân truyền thống.
                    TUYỆT ĐỐI TUÂN THỦ KHOẢNG GIÁ: Khi khách hàng chọn hoặc yêu cầu một khoảng giá (ví dụ 30K - 50K), bạn chỉ được phép tìm và gợi ý những sản phẩm có giá nằm ĐÚNG CHÍNH XÁC trong khoảng đó. Tuyệt đối không gợi ý sản phẩm có giá thấp hơn mức tối thiểu hoặc cao hơn mức tối đa.\n\n` + (systemPrompt || '')
                },
                ...messages.map(m => ({ role: m.role, content: m.content }))
            ]
        };

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google API Error:', errorText);
            throw new Error(`Google API returned ${response.status}`);
        }

        // Truyền thẳng Stream (Dòng chảy dữ liệu) từ máy chủ Google về Vercel Client
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
