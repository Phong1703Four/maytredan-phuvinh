export default function handler(req, res) {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const VITE_BASE_URL = process.env.VITE_BASE_URL || `https://${req.headers.host}`;
    const REDIRECT_URI = `${VITE_BASE_URL}/api/auth/google/callback`;

    if (!GOOGLE_CLIENT_ID) {
        // Redirect back to the frontend with an error query parameter instead of showing raw JSON
        return res.redirect('/?error=missing_google_env');
    }

    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

    res.redirect(authUrl);
}
