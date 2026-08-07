import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';
import { createAxiosClient } from '@base44/sdk/dist/utils/axios-client';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

    useEffect(() => {
        checkAppState();
    }, []);

    const checkAppState = async () => {
        try {
            setIsLoadingPublicSettings(true);
            setAuthError(null);

            // First, check app public settings (with token if available)
            // This will tell us if auth is required, user not registered, etc.
            const appClient = createAxiosClient({
                baseURL: `/api/apps/public`,
                headers: {
                    'X-App-Id': appParams.appId
                },
                token: appParams.token, // Include token if available
                interceptResponses: true
            });

            try {
                const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
                setAppPublicSettings(publicSettings);

                // If we got the app public settings successfully, check if user is authenticated
                if (appParams.token) {
                    await checkUserAuth();
                } else {
                    setIsLoadingAuth(false);
                    setIsAuthenticated(false);
                }
                setIsLoadingPublicSettings(false);
            } catch (appError) {
                console.error('App state check failed:', appError);

                // Handle app-level errors
                if (appError.status === 403 && appError.data?.extra_data?.reason) {
                    const reason = appError.data.extra_data.reason;
                    if (reason === 'auth_required') {
                        setAuthError({
                            type: 'auth_required',
                            message: 'Authentication required'
                        });
                    } else if (reason === 'user_not_registered') {
                        setAuthError({
                            type: 'user_not_registered',
                            message: 'User not registered for this app'
                        });
                    } else {
                        setAuthError({
                            type: reason,
                            message: appError.message
                        });
                    }
                } else {
                    setAuthError({
                        type: 'unknown',
                        message: appError.message || 'Failed to load app'
                    });
                }
                setIsLoadingPublicSettings(false);
                setIsLoadingAuth(false);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setAuthError({
                type: 'unknown',
                message: error.message || 'An unexpected error occurred'
            });
            setIsLoadingPublicSettings(false);
            setIsLoadingAuth(false);
        }
    };

    const checkUserAuth = async () => {
        // First check Google Auth
        const googleToken = Cookies.get('google_session');
        if (googleToken) {
            try {
                const decodedUser = jwtDecode(googleToken);
                // Map Google user to look like base44 user structure
                const gUser = {
                    id: decodedUser.id || decodedUser.sub,
                    email: decodedUser.email,
                    full_name: decodedUser.name,
                    avatar: decodedUser.picture,
                    isGoogle: true
                };
                setUser(gUser);
                setIsAuthenticated(true);
                setIsLoadingAuth(false);
                
                // Optional: Auto-create in base44 UserProfile if we have a token for base44
                try {
                    const profiles = await base44.entities.UserProfile.filter({ user_email: gUser.email });
                    if (profiles.length === 0) {
                        await base44.entities.UserProfile.create({
                            user_email: gUser.email,
                            full_name: gUser.full_name,
                            membership_tier: 'silver',
                            total_orders: 0,
                            total_spent: 0,
                        });
                    }
                } catch (e) {
                    console.log('Could not auto-create UserProfile in base44 (maybe missing perm)', e);
                }
                
                return;
            } catch (e) {
                console.error('Invalid google session token', e);
                Cookies.remove('google_session');
            }
        }

        try {
            // Now check if the user is authenticated via base44
            setIsLoadingAuth(true);
            const currentUser = await base44.auth.me();
            setUser(currentUser);
            setIsAuthenticated(true);
            setIsLoadingAuth(false);
        } catch (error) {
            console.error('User auth check failed:', error);
            setIsLoadingAuth(false);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = (shouldRedirect = true) => {
        setUser(null);
        setIsAuthenticated(false);
        
        // Remove Google Session
        Cookies.remove('google_session');

        if (shouldRedirect) {
            // Use the SDK's logout method which handles token cleanup and redirect
            base44.auth.logout(window.location.href);
        } else {
            // Just remove the token without redirect
            base44.auth.logout();
        }
    };

    const navigateToLogin = () => {
        // First try Google Login, if not fallback to base44 login
        window.location.href = '/api/auth/google';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoadingAuth,
            isLoadingPublicSettings,
            authError,
            appPublicSettings,
            logout,
            navigateToLogin,
            checkAppState
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
