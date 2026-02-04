import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
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

// Response interceptor - handle errors and silent refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 (Unauthorized) and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 1. Call the refresh endpoint to get a new access token
                // Use a separate axios instance or absolute path to avoid interceptor loops
                const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });

                if (response.data.success && response.data.accessToken) {
                    const newToken = response.data.accessToken;

                    // 2. Sync the new token to localStorage
                    localStorage.setItem('token', newToken);

                    // 3. Update the original request's header and retry it
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // 4. Refresh failed (RT expired) - Clean up and go to home/login
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Only redirect if not already on the landing page
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
