import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL, setAuthData, getStoredToken } from '../config/api';
import logo from '../assets/Logo.png';
import './login.css';
import {
    RiUser3Line,
    RiLockPasswordLine,
    RiEyeLine,
    RiEyeOffLine,
    RiShieldCheckLine,
    RiErrorWarningLine,
    RiArrowRightLine
} from 'react-icons/ri';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    // Check if already authenticated or session expired message
    useEffect(() => {
        // Check for session expired query or state
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('expired') === 'true' || location.state?.error) {
            setInfoMessage(location.state?.error || 'Your admin session expired. Please sign in again.');
        }

        const existingToken = getStoredToken();
        if (existingToken) {
            axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${existingToken}` }
            })
            .then(res => {
                if (res.data?.success) {
                    navigate('/dashboard', { replace: true });
                }
            })
            .catch(() => {
                // Token invalid, remain on login page
            });
        }
    }, [location, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setInfoMessage('');

        if (!user.username.trim() || !user.password.trim()) {
            setErrorMessage("Please enter both username/email and password.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                username: user.username.trim(),
                password: user.password
            });

            if (res.data && res.data.success) {
                // Store JWT token and user profile
                setAuthData(res.data.token, res.data.user);

                // Redirect to target or dashboard
                const redirectPath = location.state?.from?.pathname || '/dashboard';
                navigate(redirectPath, { replace: true });
            } else {
                setErrorMessage(res.data?.message || "Invalid credentials provided.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const msg = err.response?.data?.message || "Login failed. Please check your credentials and server connection.";
            setErrorMessage(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                {/* Left decorative brand panel */}
                <div className="login-brand-panel">
                    <img src={logo} alt="Sufi Construction Logo" className="login-brand-logo" />
                    <h2 className="login-brand-title">SUFI CONSTRUCTION</h2>
                    <p className="login-brand-tagline">Excellence in Civil & Architectural Engineering</p>
                    <div className="login-security-badge">
                        <RiShieldCheckLine size={18} />
                        <span>256-Bit Encrypted JWT Authentication</span>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="login-form-panel">
                    <div className="login-form-header">
                        <h1 className="login-title">Admin Portal</h1>
                        <p className="login-subtitle">Sign in to manage projects, testimonials, and media.</p>
                    </div>

                    {infoMessage && (
                        <div className="login-alert-banner alert-info">
                            <RiErrorWarningLine size={18} className="alert-icon" />
                            <span>{infoMessage}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="login-alert-banner alert-error">
                            <RiErrorWarningLine size={18} className="alert-icon" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="login-field-group">
                            <label className="login-field-label">Username or Email</label>
                            <div className="login-input-box">
                                <RiUser3Line className="input-adornment-icon" />
                                <input
                                    type="text"
                                    id="admin-username"
                                    placeholder="Enter username or email"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    className="login-input-field"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field-group">
                            <label className="login-field-label">Password</label>
                            <div className="login-input-box">
                                <RiLockPasswordLine className="input-adornment-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="admin-password"
                                    placeholder="Enter secure password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="login-input-field"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            id="admin-login-submit"
                            className={`login-action-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="btn-loading-flex">
                                    <span className="btn-spinner"></span>
                                    <span>Verifying Credentials...</span>
                                </span>
                            ) : (
                                <span className="btn-text-flex">
                                    <span>Access Dashboard</span>
                                    <RiArrowRightLine size={18} />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="login-footer-meta">
                        <span>Protected by Sufi Construction SecShield</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;