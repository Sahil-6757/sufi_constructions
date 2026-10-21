import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || process.env.API_URL || 'http://localhost:5000';

export const TOKEN_KEY = 'sufi_auth_token';
export const USER_KEY = 'sufi_auth_user';

// Auth local storage helpers
export const getStoredToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const getStoredUser = () => {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const setAuthData = (token, user) => {
    try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
        console.error("Error setting auth storage:", e);
    }
};

export const clearAuthData = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (e) {
        console.error("Error clearing auth storage:", e);
    }
};

// Global Axios Request Interceptor: Attach JWT Bearer token to all outgoing requests
axios.interceptors.request.use(
    (config) => {
        const token = getStoredToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);

// Global Axios Response Interceptor: Catch 401 Unauthorized errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const path = window.location.pathname.toLowerCase();
            if (path.includes('/dashboard')) {
                clearAuthData();
                window.location.href = '/admin-login?expired=true';
            }
        }
        return Promise.reject(error);
    }
);

export default API_URL;
