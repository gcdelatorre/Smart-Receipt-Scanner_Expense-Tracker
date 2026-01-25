import api from './api';

export const authService = {
    // Register a new user
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.data)); // User data is in .data
        }
        return response.data;
    },

    // Login user
    async login(emailOrUsername, password) {
        const response = await api.post('/auth/login', { emailOrUsername, password });
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.data)); // User data is in .data
        }
        return response.data;
    },

    // Logout user
    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    // Get current user
    async getCurrentUser() {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Change password
    async changePassword(oldPassword, newPassword) {
        const response = await api.put('/auth/change-password', { oldPassword, newPassword });
        return response.data;
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    // Get user from localStorage
    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};
