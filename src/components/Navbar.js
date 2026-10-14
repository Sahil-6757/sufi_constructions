import React from 'react';
import logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src={logo} alt="Sufi Construction Logo" className='logo-img' />
                </Link>
            </div>
            <div className='nav-links'>
                <ul className='flex'>
                    <li className={isActive('/') ? 'text-primary' : ''}>
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Home</Link>
                    </li>
                    <li className={isActive('/About') ? 'text-primary' : ''}>
                        <Link to="/About" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>About</Link>
                    </li>
                    <li className={isActive('/Services') ? 'text-primary' : ''}>
                        <Link to="/Services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Services</Link>
                    </li>
                    <li className={isActive('/Project') ? 'text-primary' : ''}>
                        <Link to="/Project" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Projects</Link>
                    </li>
                    <li className={isActive('/Package') ? 'text-primary' : ''}>
                        <Link to="/Package" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Packages</Link>
                    </li>
                    <li className={isActive('/Contact') ? 'text-primary' : ''}>
                        <Link to="/Contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
