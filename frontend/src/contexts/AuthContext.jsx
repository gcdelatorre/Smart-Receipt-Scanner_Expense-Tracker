import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token && authService.isAuthenticated()) {
                try {
                    const userFromStorage = authService.getUser();
                    if (userFromStorage) {
                        setUser(userFromStorage);
                        // Optionally verify token by fetching current user
                        try {
                            const response = await authService.getCurrentUser();
                            // Access the nested 'data' field from the response
                            // Also include budgetReset flag if present
                            setUser({ ...response.data, budgetReset: response.budgetReset });
                        } catch (error) {
                            // Token might be invalid, clear storage
                            authService.logout();
                        }
                    }
                } catch (error) {
                    console.error('Auth initialization error:', error);
                    authService.logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = useCallback(async (emailOrUsername, password) => {
        const response = await authService.login(emailOrUsername, password);
        // authService.login now returns response.data (the whole body)
        // We set the user to response.data (which is the user object because of the fix in authService)
        // Also capture budgetReset flag from response
        setUser({ ...response.data, budgetReset: response.budgetReset });
        return response;
    }, []);

    const register = useCallback(async (userData) => {
        const response = await authService.register(userData);
        setUser(response.data);
        return response;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
    }, []);

    const deleteAccount = useCallback(async () => {
        try {
            // 1. Tell the backend to nuke the data
            const response = await authService.deleteAccount();
            // 2. Wipe the frontend state immediately
            setUser(null);

            // 3. Clean up storage (Reuse your existing logic)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return response;
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error; 
        }
    }, []);

    const value = useMemo(() => ({
        user,
        setUser,
        login,
        register,
        logout,
        deleteAccount,
        isAuthenticated: !!user,
        loading
    }), [user, login, register, logout, loading]); 

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
