import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // Include cookies in requests
});

// Request interceptor - add token to headers if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token
            const currentPath = window.location.pathname;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Only redirect if we're not already on login/signup/landing page
            // and if this is not a request that's expected to fail (like during initial auth check)
            if (!currentPath.includes('/login') && 
                !currentPath.includes('/signup') && 
                !currentPath.includes('/') &&
                error.config?.url !== '/auth/me') {
                // Use a small delay to avoid redirect loops
                setTimeout(() => {
                    if (!localStorage.getItem('token')) {
                        window.location.href = '/login';
                    }
                }, 100);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
