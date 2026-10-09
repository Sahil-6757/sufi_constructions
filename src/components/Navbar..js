import React from 'react';
import logo from "../assets/Logo.png"
const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='logo' >
                <img src={logo} alt="logo" className='logo-img' />
            </div>
            <div className='nav-links'>
                <ul className='flex'>
                    <li className='text-primary'>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Project</li>
                    <li>Contact</li>
                    <li>Package</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
