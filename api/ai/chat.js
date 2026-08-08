import OpenAI from 'openai';

export const config = {
    runtime: 'edge',
};

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

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

        const response = await openai.chat.completions.create({
            model: 'gemini-1.5-flash', // Dùng model siêu tốc và miễn phí của Google
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
        });

        // Convert OpenAI stream to ReadableStream
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        const text = chunk.choices[0]?.delta?.content || '';
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
