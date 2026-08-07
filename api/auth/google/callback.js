import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).json({ error: 'No authorization code provided' });
    }

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const VITE_BASE_URL = process.env.VITE_BASE_URL || `https://${req.headers.host}`;
    const REDIRECT_URI = `${VITE_BASE_URL}/api/auth/google/callback`;
    const JWT_SECRET = process.env.JWT_SECRET || process.env.GOOGLE_CLIENT_SECRET || 'fallback-secret-for-dev';

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        return res.status(500).json({ error: 'Missing Google OAuth credentials in environment' });
    }

    try {
        // 1. Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok) {
            console.error('Google token exchange error:', tokenData);
            return res.redirect('/?error=google_auth_failed');
        }

        // 2. Fetch user info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });

        const userData = await userResponse.json();
        
        if (!userResponse.ok) {
            console.error('Google user info error:', userData);
            return res.redirect('/?error=google_user_failed');
        }

        // 3. Create a JWT for our application session
        const sessionToken = jwt.sign(
            {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                provider: 'google'
            },
            JWT_SECRET,
            { expiresIn: '7d' } // Persist session for 7 days
        );

        // 4. Set HttpOnly cookie for security, but also a JS-readable cookie for the frontend to know they are logged in
        const isProd = process.env.NODE_ENV === 'production';
        res.setHeader('Set-Cookie', [
            `google_session=${sessionToken}; Path=/; Max-Age=604800; SameSite=Lax${isProd ? '; Secure' : ''}`
        ]);

        // 5. Redirect back to home
        res.redirect('/');
    } catch (error) {
        console.error('OAuth Callback Error:', error);
        res.redirect('/?error=server_error');
    }
}
