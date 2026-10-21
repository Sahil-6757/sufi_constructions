import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getStoredToken, clearAuthData, setAuthData } from '../config/api';
import Logo from '../assets/Logo.png';
import './protectedRoute.css';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [authStatus, setAuthStatus] = useState('checking'); // 'checking' | 'authenticated' | 'unauthenticated'

    useEffect(() => {
        let isMounted = true;
        const verifyToken = async () => {
            const token = getStoredToken();
            if (!token) {
                if (isMounted) setAuthStatus('unauthenticated');
                return;
            }

            try {
                // Verify with backend
                const response = await axios.get(`${API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (isMounted) {
                    if (response.data && response.data.success) {
                        // Refresh stored user data if changed
                        if (response.data.user) {
                            setAuthData(token, response.data.user);
                        }
                        setAuthStatus('authenticated');
                    } else {
                        clearAuthData();
                        setAuthStatus('unauthenticated');
                    }
                }
            } catch (error) {
                console.error("JWT Verification failed:", error.response?.data?.message || error.message);
                clearAuthData();
                if (isMounted) setAuthStatus('unauthenticated');
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
    }, []);

    if (authStatus === 'checking') {
        return (
            <div className="auth-verification-screen">
                <div className="auth-verification-card">
                    <img src={Logo} alt="Sufi Construction Logo" className="auth-logo-pulse" />
                    <div className="auth-spinner-ring"></div>
                    <h2 className="auth-verifying-title">Verifying Admin Access</h2>
                    <p className="auth-verifying-sub">Checking secure JWT cryptographic credentials...</p>
                </div>
            </div>
        );
    }

    if (authStatus === 'unauthenticated') {
        return <Navigate to="/admin-login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
