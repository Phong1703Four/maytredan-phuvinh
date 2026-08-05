import { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthUserContext = createContext(null);

export function AuthUserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        setLoading(true);
        try {
            const isAuth = await base44.auth.isAuthenticated();
            if (!isAuth) { setUser(null); setUserProfile(null); setLoading(false); return; }
            const me = await base44.auth.me();
            setUser(me);
            const profiles = await base44.entities.UserProfile.filter({ user_email: me.email });
            setUserProfile(profiles.length > 0 ? profiles[0] : null);
        } catch {
            setUser(null);
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUser(); }, []);

    const logout = async () => {
        try { await base44.auth.logout(); } catch { }
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