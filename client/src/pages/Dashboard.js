import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import Logo from '../assets/Logo.png';
const Dashboard = () => {
    return (
        <div>
            <section className='dashboard-container'>
                <div className='left-navbar'>
                    <ul>
                        <li>
                            <img src={Logo} alt='logo' height={150} width={150} />
                        </li>
                        <li>Projects</li>
                        <li>Reports</li>
                        <li>Expenses</li>
                        <li>Invoices</li>
                        <li>Profile</li>
                        <li>Logout</li>
                    </ul>
                </div>
                <div className='right-panel'>
                    <div className='right-panel-header'>
                        <div className='manageProjects'>
                            <p>Manage Projects</p>
                        </div>
                        <div className='viewProjects'>
                            <p>View Projects</p>
                            <div className='projectList'>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;