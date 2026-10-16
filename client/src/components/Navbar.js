import React, { useState, useEffect } from 'react';
import logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import './navbar.css';
import { IoMdLogIn } from "react-icons/io";
import { RiCloseLine, RiArrowRightSLine, RiMapPin2Line, RiPhoneFill } from "react-icons/ri";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Check if the current route matches
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.toLowerCase() === path.toLowerCase();
    };

    // Close menu and scroll smoothly to top
    const handleNavClick = () => {
        setIsMenuOpen(false);
        navigator.vibrate(50);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Listen to scroll to adjust navbar shadow / elevation
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Handle escape key and window resize
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 992 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/About' },
        { label: 'Services', path: '/Services' },
        { label: 'Projects', path: '/Project' },
        { label: 'Packages', path: '/Package' },
        { label: 'Contact', path: '/Contact' }
    ];

    return (
        <>
            <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
                <nav className="navbar-container navbar" aria-label="Main Navigation">
                    {/* Brand Logo */}
                    <Link to="/" onClick={handleNavClick} className="navbar-logo" aria-label="Sufi Construction Home">
                        <img src={logo} alt="Sufi Construction Logo" className="navbar-logo-img logo-img" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="desktop-nav nav-links">
                        <ul className="desktop-nav-list flex">
                            {navItems.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <li key={item.path} className={`desktop-nav-item ${active ? 'active text-primary' : ''}`}>
                                        <Link
                                            to={item.path}
                                            onClick={handleNavClick}
                                            className="desktop-nav-link nav-link"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="navbar-cta-group">
                        <Link to="/Contact" onClick={handleNavClick} className="navbar-cta-btn">
                            <span>Enquire Now</span>
                        </Link>

                        <Link to="/admin-login" onClick={handleNavClick} className="navbar-cta-btn">
                            <span>
                                <IoMdLogIn style={{ fontSize: "1.6rem", color: "var(--primary-900)" }} />
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button (Hamburger) */}
                    <button
                        type="button"
                        className={`mobile-toggle-btn ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </nav>
            </header>

            {/* Mobile Backdrop Overlay */}
            <div
                className={`mobile-nav-backdrop ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Navigation Drawer Sheet */}
            <aside
                className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}
                aria-label="Mobile Navigation Menu"
                aria-hidden={!isMenuOpen}
            >
                {/* Drawer Header */}
                <div className="mobile-drawer-header">
                    <Link to="/" onClick={handleNavClick} aria-label="Sufi Construction Home">
                        <img src={logo} alt="Sufi Construction" className="mobile-drawer-logo" />
                    </Link>
                    <button
                        type="button"
                        className="mobile-drawer-close"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <RiCloseLine />
                    </button>
                </div>

                {/* Drawer Navigation Links */}
                <div className="mobile-drawer-body">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={handleNavClick}
                                className={`mobile-nav-link ${active ? 'active' : ''}`}
                            >
                                <span>{item.label}</span>
                                <RiArrowRightSLine className="mobile-nav-link-chevron" />
                            </Link>
                        );
                    })}
                </div>

                {/* Drawer Footer with Quick Contact */}
                <div className="mobile-drawer-footer">
                    <a href="tel:+919130630632" className="mobile-quick-call">
                        <div className="mobile-quick-call-icon">
                            <RiPhoneFill />
                        </div>
                        <div className="mobile-quick-call-text">
                            <span className="mobile-quick-call-label">Call Directly</span>
                            <span className="mobile-quick-call-val">+91 91306 30632</span>
                        </div>
                    </a>

                    <Link to="/Contact" onClick={handleNavClick} className="mobile-drawer-btn">
                        Get a Free Quote
                    </Link>

                    <div className="mobile-location-tag">
                        <RiMapPin2Line /> Jalgaon, Maharashtra
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
