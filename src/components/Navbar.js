import React from 'react';
import logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className='navbar'>
            <div className='logo' >
                <Link to="/">
                    <img src={logo} alt="logo" className='logo-img' />
                </Link>
            </div>
            <div className='nav-links'>
                <ul className='flex'>
                    <li className={location.pathname === '/' ? 'text-primary' : ''}>
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Home</Link>
                    </li>
                    <li className={location.pathname === '/About' ? 'text-primary' : ''}>
                        <Link to="/About" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>About</Link>
                    </li>
                    <li className={location.pathname === '/Services' ? 'text-primary' : ''}>
                        <Link to="/Services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Services</Link>
                    </li>
                    <li className={location.pathname === '/Project' ? 'text-primary' : ''}>
                        <Link to="/Project" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Project</Link>
                    </li>
                    <li className={location.pathname === '/Contact' ? 'text-primary' : ''}>
                        <Link to="/Contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Contact</Link>
                    </li>
                    <li className={location.pathname === '/Package' ? 'text-primary' : ''}>
                        <Link to="/Package" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='nav-link'>Package</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

