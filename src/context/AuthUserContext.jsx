import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthUserContext = createContext(null);

export function AuthUserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        setLoading(true);
        try {
            const googleToken = Cookies.get('google_session');
            if (googleToken) {
                let decoded = null;
                try {
                    decoded = jwtDecode(googleToken);
                } catch (e) {
                    Cookies.remove('google_session');
                }

                if (decoded) {
                    const gUser = { 
                        id: decoded.id || decoded.sub,
                        email: decoded.email, 
                        full_name: decoded.name,
                        avatar: decoded.picture, 
                        isGoogle: true 
                    };
                    setUser(gUser);
                    
                    try {
                        const profiles = await base44.entities.UserProfile.filter({ user_email: decoded.email });
                        if (profiles.length > 0) {
                            setUserProfile(profiles[0]);
                        } else {
                            const newProfile = await base44.entities.UserProfile.create({
                                user_email: decoded.email,
                                full_name: decoded.name,
                                membership_tier: 'silver',
                                total_orders: 0,
                                total_spent: 0,
                            });
                            setUserProfile(newProfile);
                        }
                    } catch (e) {
                        // If base44 is not authenticated or fails, we mock the profile for the UI
                        setUserProfile({
                            user_email: decoded.email,
                            full_name: decoded.name,
                            membership_tier: 'silver',
                            total_orders: 0,
                            total_spent: 0,
                        });
                    }
                    
                    setLoading(false);
                    return;
                }
            }

            const isAuth = await base44.auth.isAuthenticated();
            if (!isAuth) { setUser(null); setUserProfile(null); return; }
            const me = await base44.auth.me();
            setUser(me);
            
            // Ultra-robust email fallback to ensure we ALWAYS find the profile
            const cachedEmail = typeof window !== 'undefined' ? window.localStorage.getItem('phuvinh_last_email') : null;
            const targetEmail = me.email || me.email_address || me.username || cachedEmail;
            
            if (targetEmail) {
                const profiles = await base44.entities.UserProfile.filter({ user_email: targetEmail });
                setUserProfile(profiles.length > 0 ? profiles[0] : null);
            } else {
                setUserProfile(null);
            }
        } catch {
            setUser(null);
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUser(); }, []);

    const logout = async () => {
        // Remove local storage tokens manually to avoid SDK redirecting to /api/apps/auth/logout
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('base44_access_token');
            window.localStorage.removeItem('token');
        }
        Cookies.remove('google_session');
        setUser(null);
        setUserProfile(null);
    };

    const refreshProfile = async (email) => {
        const targetEmail = email || user?.email;
        if (!targetEmail) return;
        const profiles = await base44.entities.UserProfile.filter({ user_email: targetEmail });
        if (profiles.length > 0) setUserProfile(profiles[0]);
    };

    return (
        <AuthUserContext.Provider value={{ user, userProfile, loading, logout, refreshProfile, loadUser }}>
            {children}
        </AuthUserContext.Provider>
    );
}

export const useAuthUser = () => useContext(AuthUserContext);