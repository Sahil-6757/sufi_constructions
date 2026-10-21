import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL, { getStoredUser, clearAuthData } from '../config/api';
import './dashboard.css';
import Logo from '../assets/Logo.png';
import ImageDeviceUploader, { resolveImageUrl } from '../components/ImageDeviceUploader';
import {
    RiDashboardLine,
    RiBuilding4Line,
    RiChatQuoteLine,
    RiLogoutBoxRLine,
    RiAddLine,
    RiEditLine,
    RiDeleteBin6Line,
    RiEyeLine,
    RiExternalLinkLine,
    RiSearchLine,
    RiCloseLine,
    RiStarFill,
    RiStarLine,
    RiCheckLine,
    RiRefreshLine,
    RiImageAddLine,
    RiMapPinLine,
    RiCalendarLine,
    RiRulerLine,
    RiToolsLine,
    RiShieldCheckLine,
    RiSparklingLine
} from 'react-icons/ri';

const PROJECT_IMAGE_PRESETS = [
    {
        label: 'Modern Waterfront Villa',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'High-Rise Tower',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'Commercial Glass Hub',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'Luxury Residence',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'Heritage Restoration',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'Industrial Logistics',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    }
];

const TESTIMONIAL_AVATAR_PRESETS = [
    {
        label: 'Client 1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
        label: 'Client 2',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    {
        label: 'Client 3',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
        label: 'Client 4',
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    {
        label: 'Client 5',
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    }
];

const initialProjectForm = {
    title: '',
    category: 'Residential',
    location: '',
    area: '',
    year: new Date().getFullYear().toString(),
    status: 'Completed',
    scope: '',
    structure: '',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    shortDesc: '',
    fullDesc: '',
    highlights: '',
    clientQuote: '',
    clientAuthor: ''
};

const initialTestimonialForm = {
    name: '',
    role: 'Client',
    project: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: '',
    rating: 5
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(() => getStoredUser());
    const [activeTab, setActiveTab] = useState('projects'); // 'overview' | 'projects' | 'testimonial'

    // Data lists
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loadingTestimonials, setLoadingTestimonials] = useState(false);

    // Filter & Search states
    const [projectSearch, setProjectSearch] = useState('');
    const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');
    const [testimonialSearch, setTestimonialSearch] = useState('');
    const [testimonialRatingFilter, setTestimonialRatingFilter] = useState('All');

    // Forms states
    const [projectForm, setProjectForm] = useState(initialProjectForm);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [isSavingProject, setIsSavingProject] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(true);

    const [testimonialForm, setTestimonialForm] = useState(initialTestimonialForm);
    const [editingTestimonialId, setEditingTestimonialId] = useState(null);
    const [isSavingTestimonial, setIsSavingTestimonial] = useState(false);
    const [showTestimonialForm, setShowTestimonialForm] = useState(true);

    // Toast alert state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // Modals
    const [deleteModal, setDeleteModal] = useState({ show: false, type: '', id: null, title: '' });
    const [previewProject, setPreviewProject] = useState(null);

    const showToastMessage = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 4000);
    };

    // Load projects from API
    const fetchProjects = async () => {
        setLoadingProjects(true);
        try {
            const res = await axios.get(`${API_URL}/api/projects`);
            if (res.data && res.data.success) {
                setProjects(res.data.data || []);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
            showToastMessage('Failed to fetch projects from server', 'error');
        } finally {
            setLoadingProjects(false);
        }
    };

    // Load testimonials from API
    const fetchTestimonials = async () => {
        setLoadingTestimonials(true);
        try {
            const res = await axios.get(`${API_URL}/api/testimonials`);
            if (res.data && res.data.success) {
                setTestimonials(res.data.data || []);
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            showToastMessage('Failed to fetch testimonials from server', 'error');
        } finally {
            setLoadingTestimonials(false);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchTestimonials();
    }, []);

    // Filtered Projects
    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesCat = projectCategoryFilter === 'All' || p.category?.toLowerCase() === projectCategoryFilter.toLowerCase();
            const q = projectSearch.toLowerCase().trim();
            const matchesQuery = !q ||
                p.title?.toLowerCase().includes(q) ||
                p.location?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.shortDesc?.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }, [projects, projectCategoryFilter, projectSearch]);

    // Filtered Testimonials
    const filteredTestimonials = useMemo(() => {
        return testimonials.filter(t => {
            const matchesRating = testimonialRatingFilter === 'All' || String(t.rating) === String(testimonialRatingFilter);
            const q = testimonialSearch.toLowerCase().trim();
            const matchesQuery = !q ||
                t.name?.toLowerCase().includes(q) ||
                t.role?.toLowerCase().includes(q) ||
                t.project?.toLowerCase().includes(q) ||
                t.text?.toLowerCase().includes(q);
            return matchesRating && matchesQuery;
        });
    }, [testimonials, testimonialRatingFilter, testimonialSearch]);

    // Overview Stats
    const stats = useMemo(() => {
        const totalP = projects.length;
        const completedP = projects.filter(p => p.status === 'Completed').length;
        const inProgressP = projects.filter(p => p.status === 'In Progress').length;
        const totalT = testimonials.length;
        const avgR = totalT > 0
            ? (testimonials.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / totalT).toFixed(1)
            : '5.0';
        return { totalP, completedP, inProgressP, totalT, avgR };
    }, [projects, testimonials]);

    // ==========================================
    // Project Form Handlers
    // ==========================================
    const handleProjectInputChange = (e) => {
        const { name, value } = e.target;
        setProjectForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        if (!projectForm.title || !projectForm.title.trim()) {
            showToastMessage('Please enter a Project Title', 'error');
            return;
        }

        setIsSavingProject(true);
        try {
            const payload = {
                ...projectForm,
                highlights: typeof projectForm.highlights === 'string'
                    ? projectForm.highlights.split('\n').map(h => h.trim()).filter(Boolean)
                    : projectForm.highlights
            };

            if (editingProjectId) {
                const res = await axios.put(`${API_URL}/api/projects/${editingProjectId}`, payload);
                if (res.data && res.data.success) {
                    showToastMessage('Project updated successfully!', 'success');
                    setProjects(prev => prev.map(p => p._id === editingProjectId ? res.data.data : p));
                    resetProjectForm();
                }
            } else {
                const res = await axios.post(`${API_URL}/api/projects`, payload);
                if (res.data && res.data.success) {
                    showToastMessage('New project added successfully!', 'success');
                    setProjects(prev => [res.data.data, ...prev]);
                    resetProjectForm();
                }
            }
        } catch (err) {
            console.error('Error saving project:', err);
            const msg = err.response?.data?.message || 'Failed to save project. Please check fields.';
            showToastMessage(msg, 'error');
        } finally {
            setIsSavingProject(false);
        }
    };

    const handleEditProjectClick = (project) => {
        setEditingProjectId(project._id);
        setProjectForm({
            title: project.title || '',
            category: project.category || 'Residential',
            location: project.location || '',
            area: project.area || '',
            year: project.year || new Date().getFullYear().toString(),
            status: project.status || 'Completed',
            scope: project.scope || '',
            structure: project.structure || '',
            image: project.image || '',
            shortDesc: project.shortDesc || '',
            fullDesc: project.fullDesc || '',
            highlights: Array.isArray(project.highlights) ? project.highlights.join('\n') : (project.highlights || ''),
            clientQuote: project.clientQuote || '',
            clientAuthor: project.clientAuthor || ''
        });
        setShowProjectForm(true);
        window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    const resetProjectForm = () => {
        setProjectForm(initialProjectForm);
        setEditingProjectId(null);
    };

    // ==========================================
    // Testimonial Form Handlers
    // ==========================================
    const handleTestimonialInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonialForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveTestimonial = async (e) => {
        e.preventDefault();
        if (!testimonialForm.name || !testimonialForm.name.trim()) {
            showToastMessage('Client Name is required', 'error');
            return;
        }
        if (!testimonialForm.text || !testimonialForm.text.trim()) {
            showToastMessage('Testimonial feedback text is required', 'error');
            return;
        }

        setIsSavingTestimonial(true);
        try {
            const payload = {
                ...testimonialForm,
                rating: Number(testimonialForm.rating) || 5
            };

            if (editingTestimonialId) {
                const res = await axios.put(`${API_URL}/api/testimonials/${editingTestimonialId}`, payload);
                if (res.data && res.data.success) {
                    showToastMessage('Testimonial updated successfully!', 'success');
                    setTestimonials(prev => prev.map(t => t._id === editingTestimonialId ? res.data.data : t));
                    resetTestimonialForm();
                }
            } else {
                const res = await axios.post(`${API_URL}/api/testimonials`, payload);
                if (res.data && res.data.success) {
                    showToastMessage('New testimonial added successfully!', 'success');
                    setTestimonials(prev => [res.data.data, ...prev]);
                    resetTestimonialForm();
                }
            }
        } catch (err) {
            console.error('Error saving testimonial:', err);
            const msg = err.response?.data?.message || 'Failed to save testimonial.';
            showToastMessage(msg, 'error');
        } finally {
            setIsSavingTestimonial(false);
        }
    };

    const handleEditTestimonialClick = (t) => {
        setEditingTestimonialId(t._id);
        setTestimonialForm({
            name: t.name || '',
            role: t.role || 'Client',
            project: t.project || '',
            avatar: t.avatar || '',
            text: t.text || '',
            rating: Number(t.rating) || 5
        });
        setShowTestimonialForm(true);
        window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    const resetTestimonialForm = () => {
        setTestimonialForm(initialTestimonialForm);
        setEditingTestimonialId(null);
    };

    // ==========================================
    // Delete Handlers
    // ==========================================
    const confirmDelete = async () => {
        const { type, id } = deleteModal;
        if (!id) return;

        try {
            if (type === 'project') {
                const res = await axios.delete(`${API_URL}/api/projects/${id}`);
                if (res.data && res.data.success) {
                    showToastMessage('Project deleted successfully', 'success');
                    setProjects(prev => prev.filter(p => p._id !== id));
                    if (editingProjectId === id) resetProjectForm();
                }
            } else if (type === 'testimonial') {
                const res = await axios.delete(`${API_URL}/api/testimonials/${id}`);
                if (res.data && res.data.success) {
                    showToastMessage('Testimonial deleted successfully', 'success');
                    setTestimonials(prev => prev.filter(t => t._id !== id));
                    if (editingTestimonialId === id) resetTestimonialForm();
                }
            }
        } catch (err) {
            console.error('Delete error:', err);
            showToastMessage('Failed to delete item', 'error');
        } finally {
            setDeleteModal({ show: false, type: '', id: null, title: '' });
        }
    };

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out of Sufi Admin Portal?")) {
            try {
                await axios.post(`${API_URL}/auth/logout`);
            } catch (err) {
                // Ignore logout network error
            } finally {
                clearAuthData();
                navigate('/admin-login', { replace: true });
            }
        }
    };

    return (
        <div className="sufi-dashboard-root">
            {/* Toast Notification Alert */}
            {toast.show && (
                <div className={`dashboard-toast toast-${toast.type}`}>
                    <div className="toast-icon">
                        {toast.type === 'success' ? <RiCheckLine size={20} /> : <RiShieldCheckLine size={20} />}
                    </div>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => setToast({ show: false, message: '', type: 'success' })}>
                        <RiCloseLine size={18} />
                    </button>
                </div>
            )}

            {/* Main Layout Container */}
            <section className="dashboard-container">
                {/* Left Sidebar */}
                <aside className="left-navbar">
                    <div className="sidebar-brand">
                        <img src={Logo} alt="Sufi Construction" className="sidebar-logo-img" />
                        <div className="sidebar-brand-text">
                            <h3>SUFI</h3>
                            <span>ADMIN PORTAL</span>
                        </div>
                    </div>

                    <div className="sidebar-section-label">MANAGEMENT</div>

                    <ul className="sidebar-menu">
                        <li
                            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <RiDashboardLine className="menu-icon" />
                            <span>Overview</span>
                        </li>

                        <li
                            className={`menu-item ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <RiBuilding4Line className="menu-icon" />
                            <span>Projects</span>
                            <span className="menu-count-badge">{projects.length}</span>
                        </li>

                        <li
                            className={`menu-item ${activeTab === 'testimonial' ? 'active' : ''}`}
                            onClick={() => setActiveTab('testimonial')}
                        >
                            <RiChatQuoteLine className="menu-icon" />
                            <span>Testimonials</span>
                            <span className="menu-count-badge">{testimonials.length}</span>
                        </li>
                    </ul>

                    <div className="sidebar-footer">
                        <div className="admin-profile-pill">
                            <div className="admin-avatar">
                                {(currentUser?.name || 'A')[0].toUpperCase()}
                            </div>
                            <div className="admin-info">
                                <span className="admin-title">{currentUser?.name || 'Administrator'}</span>
                                <span className="admin-status-dot">Online</span>
                            </div>
                        </div>

                        <button className="logout-btn" onClick={handleLogout} title="Logout">
                            <RiLogoutBoxRLine size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Right Panel */}
                <main className="right-panel">
                    {/* Top Navbar */}
                    <header className="dashboard-top-bar">
                        <div className="top-bar-left">
                            <h1 className="current-tab-title">
                                {activeTab === 'overview' && 'Executive Dashboard'}
                                {activeTab === 'projects' && 'Projects Management'}
                                {activeTab === 'testimonial' && 'Client Testimonials'}
                            </h1>
                            <p className="current-tab-sub">
                                {activeTab === 'overview' && 'Performance overview, key metrics, and fast management shortcuts'}
                                {activeTab === 'projects' && 'Publish, edit, and organize residential and commercial project showcases'}
                                {activeTab === 'testimonial' && 'Manage verified client reviews, star ratings, and testimonials'}
                            </p>
                        </div>

                        <div className="top-bar-right">
                            <div className="server-status-badge">
                                <span className="admin-status-dot">JWT Active</span>
                                <span>{currentUser?.email || currentUser?.name || 'Admin'}</span>
                            </div>
                            <button className="logout-btn" onClick={handleLogout} title="Sign out" style={{ padding: '6px 12px', fontSize: '12px' }}>
                                <RiLogoutBoxRLine size={15} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </header>

                    {/* Quick Metric Cards (Visible on Overview and helpful) */}
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-icon gold-bg">
                                <RiBuilding4Line size={24} />
                            </div>
                            <div className="metric-details">
                                <span className="metric-label">Total Projects</span>
                                <span className="metric-value">{stats.totalP}</span>
                                <span className="metric-sub">{stats.completedP} Completed • {stats.inProgressP} In Progress</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon bronze-bg">
                                <RiChatQuoteLine size={24} />
                            </div>
                            <div className="metric-details">
                                <span className="metric-label">Client Reviews</span>
                                <span className="metric-value">{stats.totalT}</span>
                                <span className="metric-sub">Verified Client Endorsements</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon star-bg">
                                <RiStarFill size={24} />
                            </div>
                            <div className="metric-details">
                                <span className="metric-label">Average Rating</span>
                                <span className="metric-value">{stats.avgR} / 5.0</span>
                                <span className="metric-sub">Client Satisfaction Score</span>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon shield-bg">
                                <RiSparklingLine size={24} />
                            </div>
                            <div className="metric-details">
                                <span className="metric-label">Civil Grade</span>
                                <span className="metric-value">A+ Quality</span>
                                <span className="metric-sub">ISO &amp; Structural Certified</span>
                            </div>
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* TAB: OVERVIEW */}
                    {/* ================================================== */}
                    {activeTab === 'overview' && (
                        <div className="overview-tab-content">
                            <div className="overview-quick-actions">
                                <div className="quick-action-card">
                                    <div className="action-card-info">
                                        <h3>Manage Portfolio Projects</h3>
                                        <p>Add new project highlights, specifications, images, and structural details.</p>
                                    </div>
                                    <button
                                        className="btn-accent-gold"
                                        onClick={() => {
                                            setActiveTab('projects');
                                            resetProjectForm();
                                            setShowProjectForm(true);
                                        }}
                                    >
                                        <RiAddLine size={18} />
                                        <span>Add New Project</span>
                                    </button>
                                </div>

                                <div className="quick-action-card">
                                    <div className="action-card-info">
                                        <h3>Manage Testimonials</h3>
                                        <p>Publish client testimonials, assign star ratings, and feature homeowner feedback.</p>
                                    </div>
                                    <button
                                        className="btn-accent-gold"
                                        onClick={() => {
                                            setActiveTab('testimonial');
                                            resetTestimonialForm();
                                            setShowTestimonialForm(true);
                                        }}
                                    >
                                        <RiAddLine size={18} />
                                        <span>Add New Testimonial</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Projects Preview */}
                            <div className="overview-split-section">
                                <div className="overview-panel-card">
                                    <div className="panel-card-header">
                                        <h3>Recent Saved Projects ({projects.length})</h3>
                                        <button className="view-all-link" onClick={() => setActiveTab('projects')}>
                                            View &amp; Edit All &rarr;
                                        </button>
                                    </div>
                                    <div className="overview-list">
                                        {projects.slice(0, 4).map(p => (
                                            <div key={p._id} className="overview-item">
                                                <img src={resolveImageUrl(p.image)} alt={p.title} className="overview-thumb" />
                                                <div className="overview-item-meta">
                                                    <h4>{p.title}</h4>
                                                    <span>{p.category} • {p.location || 'Mumbai'} • {p.status}</span>
                                                </div>
                                                <button
                                                    className="overview-action-btn"
                                                    onClick={() => {
                                                        setActiveTab('projects');
                                                        handleEditProjectClick(p);
                                                    }}
                                                >
                                                    <RiEditLine size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Testimonials Preview */}
                                <div className="overview-panel-card">
                                    <div className="panel-card-header">
                                        <h3>Recent Testimonials ({testimonials.length})</h3>
                                        <button className="view-all-link" onClick={() => setActiveTab('testimonial')}>
                                            View &amp; Edit All &rarr;
                                        </button>
                                    </div>
                                    <div className="overview-list">
                                        {testimonials.slice(0, 4).map(t => (
                                            <div key={t._id} className="overview-item">
                                                <img src={resolveImageUrl(t.avatar)} alt={t.name} className="overview-thumb rounded-circle" />
                                                <div className="overview-item-meta">
                                                    <h4>{t.name}</h4>
                                                    <span>{t.role} • ★ {t.rating}/5</span>
                                                    <p className="overview-snippet">"{t.text?.slice(0, 70)}..."</p>
                                                </div>
                                                <button
                                                    className="overview-action-btn"
                                                    onClick={() => {
                                                        setActiveTab('testimonial');
                                                        handleEditTestimonialClick(t);
                                                    }}
                                                >
                                                    <RiEditLine size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================================================== */}
                    {/* TAB: PROJECTS MANAGEMENT */}
                    {/* ================================================== */}
                    {activeTab === 'projects' && (
                        <div className="projects-tab-content">
                            {/* Form Header Action Bar */}
                            <div className="content-toolbar">
                                <div className="toolbar-left">
                                    <h2 className="section-heading">
                                        {editingProjectId ? 'Edit Project' : 'Add New Project'}
                                    </h2>
                                    <span className="section-badge">
                                        {editingProjectId ? 'Updating Existing Record' : 'Create & Publish to Website'}
                                    </span>
                                </div>
                                <div className="toolbar-right">
                                    <button
                                        type="button"
                                        className="btn-toggle-form"
                                        onClick={() => setShowProjectForm(prev => !prev)}
                                    >
                                        {showProjectForm ? 'Collapse Form' : '+ Open Project Form'}
                                    </button>
                                </div>
                            </div>

                            {/* PROJECT FORM */}
                            {showProjectForm && (
                                <div className="dashboard-card form-card">
                                    <form onSubmit={handleSaveProject} className="custom-dashboard-form">
                                        <div className="form-grid-row">
                                            {/* Project Title */}
                                            <div className="form-group span-2">
                                                <label>Project Title <span className="req">*</span></label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder="e.g. The Grand Crest Villa"
                                                    value={projectForm.title}
                                                    onChange={handleProjectInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Category */}
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select
                                                    name="category"
                                                    value={projectForm.category}
                                                    onChange={handleProjectInputChange}
                                                >
                                                    <option value="Residential">Residential</option>
                                                    <option value="Apartments">Apartments</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Renovations">Renovations</option>
                                                    <option value="Luxury Villas">Luxury Villas</option>
                                                    <option value="Infrastructure">Infrastructure</option>
                                                </select>
                                            </div>

                                            {/* Status */}
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select
                                                    name="status"
                                                    value={projectForm.status}
                                                    onChange={handleProjectInputChange}
                                                >
                                                    <option value="Completed">Completed</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Planning">Planning</option>
                                                </select>
                                            </div>

                                            {/* Location */}
                                            <div className="form-group">
                                                <label>Location</label>
                                                <div className="input-with-icon">
                                                    <RiMapPinLine className="field-icon" />
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        placeholder="e.g. Worli Sea Face, Mumbai"
                                                        value={projectForm.location}
                                                        onChange={handleProjectInputChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Area */}
                                            <div className="form-group">
                                                <label>Built-Up Area</label>
                                                <div className="input-with-icon">
                                                    <RiRulerLine className="field-icon" />
                                                    <input
                                                        type="text"
                                                        name="area"
                                                        placeholder="e.g. 7,200 Sq. Ft."
                                                        value={projectForm.area}
                                                        onChange={handleProjectInputChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Year */}
                                            <div className="form-group">
                                                <label>Completion Year</label>
                                                <div className="input-with-icon">
                                                    <RiCalendarLine className="field-icon" />
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        placeholder="e.g. 2024"
                                                        value={projectForm.year}
                                                        onChange={handleProjectInputChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Scope */}
                                            <div className="form-group">
                                                <label>Scope of Work</label>
                                                <input
                                                    type="text"
                                                    name="scope"
                                                    placeholder="e.g. Turnkey Civil &amp; Interiors"
                                                    value={projectForm.scope}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>

                                            {/* Structure */}
                                            <div className="form-group span-2">
                                                <label>Structural Specifications</label>
                                                <div className="input-with-icon">
                                                    <RiToolsLine className="field-icon" />
                                                    <input
                                                        type="text"
                                                        name="structure"
                                                        placeholder="e.g. RCC Earthquake-Resistant Frame, Fe-550D TMT Steel"
                                                        value={projectForm.structure}
                                                        onChange={handleProjectInputChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Project Cover Image with Device Upload & Presets */}
                                            <div className="form-group span-2">
                                                <ImageDeviceUploader
                                                    label="Project Cover Image"
                                                    subLabel="Upload high-res photo from your phone or PC, or choose from presets"
                                                    value={projectForm.image}
                                                    onChange={(newUrl) => setProjectForm(prev => ({ ...prev, image: newUrl }))}
                                                    presets={PROJECT_IMAGE_PRESETS}
                                                    variant="cover"
                                                    onToast={showToastMessage}
                                                />
                                            </div>

                                            {/* Short Description */}
                                            <div className="form-group span-2">
                                                <label>Short Description (Card Summary)</label>
                                                <input
                                                    type="text"
                                                    name="shortDesc"
                                                    placeholder="Brief 1-2 sentence overview shown in cards"
                                                    value={projectForm.shortDesc}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>

                                            {/* Full Description */}
                                            <div className="form-group span-2">
                                                <label>Full Architectural &amp; Civil Narrative</label>
                                                <textarea
                                                    rows={4}
                                                    name="fullDesc"
                                                    placeholder="Detailed description of the construction challenges, techniques, and final delivery..."
                                                    value={projectForm.fullDesc}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>

                                            {/* Key Highlights (one per line) */}
                                            <div className="form-group span-2">
                                                <label>Key Structural Highlights (Enter one bullet point per line)</label>
                                                <textarea
                                                    rows={3}
                                                    name="highlights"
                                                    placeholder="Heavy-duty marine grade Fe-550D TMT reinforcement&#10;Cantilevered 18-meter panoramic sea-view deck&#10;Integrated solar-ready rooftop & smart building automation"
                                                    value={projectForm.highlights}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>

                                            {/* Client Quote */}
                                            <div className="form-group">
                                                <label>Client Feedback Quote (Optional)</label>
                                                <input
                                                    type="text"
                                                    name="clientQuote"
                                                    placeholder="e.g. Sufi Construction delivered our dream home with zero compromises."
                                                    value={projectForm.clientQuote}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>

                                            {/* Client Quote Author */}
                                            <div className="form-group">
                                                <label>Client Author / Owner Name</label>
                                                <input
                                                    type="text"
                                                    name="clientAuthor"
                                                    placeholder="e.g. Farhan M. - Property Owner"
                                                    value={projectForm.clientAuthor}
                                                    onChange={handleProjectInputChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="form-actions-row">
                                            {editingProjectId && (
                                                <button
                                                    type="button"
                                                    className="btn-cancel"
                                                    onClick={resetProjectForm}
                                                >
                                                    Cancel Edit
                                                </button>
                                            )}
                                            <button
                                                type="submit"
                                                className="btn-submit-gold"
                                                disabled={isSavingProject}
                                            >
                                                {isSavingProject ? (
                                                    <span>Saving Project...</span>
                                                ) : (
                                                    <>
                                                        <RiCheckLine size={20} />
                                                        <span>{editingProjectId ? 'Update Project' : 'Publish Project'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* SAVED PROJECTS LISTING */}
                            <div className="saved-items-section">
                                <div className="saved-section-header">
                                    <div className="header-title-wrap">
                                        <h3>Saved Projects Catalog</h3>
                                        <span className="count-pill">{filteredProjects.length} Projects Found</span>
                                    </div>

                                    {/* Search & Filter Bar */}
                                    <div className="filters-wrapper">
                                        <div className="search-box">
                                            <RiSearchLine className="search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search by title, location, category..."
                                                value={projectSearch}
                                                onChange={(e) => setProjectSearch(e.target.value)}
                                            />
                                            {projectSearch && (
                                                <button className="clear-search" onClick={() => setProjectSearch('')}>
                                                    <RiCloseLine size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="category-chips">
                                            {['All', 'Residential', 'Apartments', 'Commercial', 'Industrial', 'Renovations'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    className={`chip-btn ${projectCategoryFilter === cat ? 'active' : ''}`}
                                                    onClick={() => setProjectCategoryFilter(cat)}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {loadingProjects ? (
                                    <div className="loading-state-card">
                                        <div className="spinner"></div>
                                        <p>Loading projects from database...</p>
                                    </div>
                                ) : filteredProjects.length === 0 ? (
                                    <div className="empty-state-card">
                                        <RiBuilding4Line size={48} className="empty-icon" />
                                        <h4>No Projects Found</h4>
                                        <p>No projects match your search query or category filter. Try clearing filters or create a new project above.</p>
                                        <button
                                            className="btn-accent-gold"
                                            onClick={() => {
                                                setProjectSearch('');
                                                setProjectCategoryFilter('All');
                                            }}
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="projects-cards-grid">
                                        {filteredProjects.map((item) => (
                                            <div key={item._id} className="project-admin-card">
                                                <div className="card-image-wrap">
                                                    <img
                                                        src={resolveImageUrl(item.image) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                                                        alt={item.title}
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                                                        }}
                                                    />
                                                    <span className={`status-pill pill-${(item.status || 'completed').toLowerCase().replace(' ', '-')}`}>
                                                        {item.status || 'Completed'}
                                                    </span>
                                                    <span className="category-pill">{item.category}</span>
                                                </div>

                                                <div className="card-body">
                                                    <h4 className="card-title">{item.title}</h4>

                                                    <div className="card-meta-row">
                                                        {item.location && (
                                                            <span className="meta-item">
                                                                <RiMapPinLine /> {item.location}
                                                            </span>
                                                        )}
                                                        {item.year && (
                                                            <span className="meta-item">
                                                                <RiCalendarLine /> {item.year}
                                                            </span>
                                                        )}
                                                        {item.area && (
                                                            <span className="meta-item">
                                                                <RiRulerLine /> {item.area}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="card-desc">
                                                        {item.shortDesc || item.fullDesc?.slice(0, 110) || 'High quality structural engineering and construction.'}
                                                    </p>

                                                    {/* Highlights tags */}
                                                    {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                                                        <div className="card-highlights-preview">
                                                            {item.highlights.slice(0, 2).map((hl, i) => (
                                                                <span key={i} className="hl-pill">✓ {hl}</span>
                                                            ))}
                                                            {item.highlights.length > 2 && (
                                                                <span className="hl-more">+{item.highlights.length - 2} more</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Card Actions */}
                                                    <div className="card-actions-bar">
                                                        <button
                                                            className="action-btn-view"
                                                            onClick={() => setPreviewProject(item)}
                                                            title="Preview Details"
                                                        >
                                                            <RiEyeLine size={16} />
                                                            <span>Details</span>
                                                        </button>
                                                        <button
                                                            className="action-btn-edit"
                                                            onClick={() => handleEditProjectClick(item)}
                                                            title="Edit Project"
                                                        >
                                                            <RiEditLine size={16} />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            className="action-btn-delete"
                                                            onClick={() => setDeleteModal({
                                                                show: true,
                                                                type: 'project',
                                                                id: item._id,
                                                                title: item.title
                                                            })}
                                                            title="Delete Project"
                                                        >
                                                            <RiDeleteBin6Line size={16} />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ================================================== */}
                    {/* TAB: TESTIMONIALS MANAGEMENT */}
                    {/* ================================================== */}
                    {activeTab === 'testimonial' && (
                        <div className="testimonials-tab-content">
                            {/* Toolbar */}
                            <div className="content-toolbar">
                                <div className="toolbar-left">
                                    <h2 className="section-heading">
                                        {editingTestimonialId ? 'Edit Testimonial' : 'Add Client Testimonial'}
                                    </h2>
                                    <span className="section-badge">
                                        {editingTestimonialId ? 'Updating Client Review' : 'Create & Feature on Home Page'}
                                    </span>
                                </div>
                                <div className="toolbar-right">
                                    <button
                                        type="button"
                                        className="btn-toggle-form"
                                        onClick={() => setShowTestimonialForm(prev => !prev)}
                                    >
                                        {showTestimonialForm ? 'Collapse Form' : '+ Open Review Form'}
                                    </button>
                                </div>
                            </div>

                            {/* TESTIMONIAL FORM */}
                            {showTestimonialForm && (
                                <div className="dashboard-card form-card">
                                    <form onSubmit={handleSaveTestimonial} className="custom-dashboard-form">
                                        <div className="form-grid-row">
                                            {/* Client Name */}
                                            <div className="form-group">
                                                <label>Client Full Name <span className="req">*</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="e.g. Ahmed Al-Mansoor"
                                                    value={testimonialForm.name}
                                                    onChange={handleTestimonialInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* Role */}
                                            <div className="form-group">
                                                <label>Role / Designation</label>
                                                <input
                                                    type="text"
                                                    name="role"
                                                    placeholder="e.g. Villa Owner, Green Valley"
                                                    value={testimonialForm.role}
                                                    onChange={handleTestimonialInputChange}
                                                />
                                            </div>

                                            {/* Associated Project */}
                                            <div className="form-group">
                                                <label>Associated Project Name</label>
                                                <input
                                                    type="text"
                                                    name="project"
                                                    placeholder="e.g. Luxury 5BHK Villa"
                                                    value={testimonialForm.project}
                                                    onChange={handleTestimonialInputChange}
                                                />
                                            </div>

                                            {/* Star Rating */}
                                            <div className="form-group">
                                                <label>Star Rating (1 - 5 Stars)</label>
                                                <div className="star-rating-selector">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            type="button"
                                                            key={star}
                                                            className={`star-choice-btn ${star <= Number(testimonialForm.rating) ? 'active' : ''}`}
                                                            onClick={() => setTestimonialForm(prev => ({ ...prev, rating: star }))}
                                                        >
                                                            {star <= Number(testimonialForm.rating) ? (
                                                                <RiStarFill size={22} />
                                                            ) : (
                                                                <RiStarLine size={22} />
                                                            )}
                                                        </button>
                                                    ))}
                                                    <span className="star-score-text">
                                                        {testimonialForm.rating} of 5 Stars
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Client Avatar Photo with Device Upload & Presets */}
                                            <div className="form-group span-2">
                                                <ImageDeviceUploader
                                                    label="Client Avatar Photo"
                                                    subLabel="Upload verified photo from your phone or PC, or pick a default avatar"
                                                    value={testimonialForm.avatar}
                                                    onChange={(newUrl) => setTestimonialForm(prev => ({ ...prev, avatar: newUrl }))}
                                                    presets={TESTIMONIAL_AVATAR_PRESETS}
                                                    variant="avatar"
                                                    onToast={showToastMessage}
                                                />
                                            </div>

                                            {/* Testimonial Review Text */}
                                            <div className="form-group span-2">
                                                <label>Testimonial Review &amp; Feedback <span className="req">*</span></label>
                                                <textarea
                                                    rows={4}
                                                    name="text"
                                                    placeholder="Describe the experience with Sufi Construction: structural quality, adherence to timelines, transparency, engineering standards..."
                                                    value={testimonialForm.text}
                                                    onChange={handleTestimonialInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="form-actions-row">
                                            {editingTestimonialId && (
                                                <button
                                                    type="button"
                                                    className="btn-cancel"
                                                    onClick={resetTestimonialForm}
                                                >
                                                    Cancel Edit
                                                </button>
                                            )}
                                            <button
                                                type="submit"
                                                className="btn-submit-gold"
                                                disabled={isSavingTestimonial}
                                            >
                                                {isSavingTestimonial ? (
                                                    <span>Saving Review...</span>
                                                ) : (
                                                    <>
                                                        <RiCheckLine size={20} />
                                                        <span>{editingTestimonialId ? 'Update Testimonial' : 'Publish Testimonial'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* SAVED TESTIMONIALS LISTING */}
                            <div className="saved-items-section">
                                <div className="saved-section-header">
                                    <div className="header-title-wrap">
                                        <h3>Client Reviews Directory</h3>
                                        <span className="count-pill">{filteredTestimonials.length} Testimonials Found</span>
                                    </div>

                                    {/* Search & Filter Bar */}
                                    <div className="filters-wrapper">
                                        <div className="search-box">
                                            <RiSearchLine className="search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search reviews by client, project, keyword..."
                                                value={testimonialSearch}
                                                onChange={(e) => setTestimonialSearch(e.target.value)}
                                            />
                                            {testimonialSearch && (
                                                <button className="clear-search" onClick={() => setTestimonialSearch('')}>
                                                    <RiCloseLine size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="category-chips">
                                            {['All', '5', '4', '3'].map((ratingVal) => (
                                                <button
                                                    key={ratingVal}
                                                    type="button"
                                                    className={`chip-btn ${testimonialRatingFilter === ratingVal ? 'active' : ''}`}
                                                    onClick={() => setTestimonialRatingFilter(ratingVal)}
                                                >
                                                    {ratingVal === 'All' ? 'All Ratings' : `★ ${ratingVal} Stars`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {loadingTestimonials ? (
                                    <div className="loading-state-card">
                                        <div className="spinner"></div>
                                        <p>Loading testimonials from database...</p>
                                    </div>
                                ) : filteredTestimonials.length === 0 ? (
                                    <div className="empty-state-card">
                                        <RiChatQuoteLine size={48} className="empty-icon" />
                                        <h4>No Testimonials Found</h4>
                                        <p>No testimonials match your filter. Add a new testimonial above to highlight client satisfaction!</p>
                                        <button
                                            className="btn-accent-gold"
                                            onClick={() => {
                                                setTestimonialSearch('');
                                                setTestimonialRatingFilter('All');
                                            }}
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="testimonials-cards-grid">
                                        {filteredTestimonials.map((item) => (
                                            <div key={item._id} className="testimonial-admin-card">
                                                <div className="testimonial-card-top">
                                                    <img
                                                        src={resolveImageUrl(item.avatar) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                                                        alt={item.name}
                                                        className="client-avatar-circle"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
                                                        }}
                                                    />
                                                    <div className="client-details">
                                                        <h4 className="client-name">{item.name}</h4>
                                                        <span className="client-role">{item.role || 'Valued Client'}</span>
                                                        {item.project && (
                                                            <span className="client-project-tag">
                                                                <RiBuilding4Line size={13} /> {item.project}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Rating stars */}
                                                <div className="stars-row">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < (Number(item.rating) || 5) ? 'star-filled' : 'star-empty'}>
                                                            ★
                                                        </span>
                                                    ))}
                                                    <span className="star-numeric">({item.rating || 5}.0)</span>
                                                </div>

                                                <p className="testimonial-quote-text">
                                                    "{item.text}"
                                                </p>

                                                {/* Actions */}
                                                <div className="card-actions-bar">
                                                    <button
                                                        className="action-btn-edit"
                                                        onClick={() => handleEditTestimonialClick(item)}
                                                        title="Edit Testimonial"
                                                    >
                                                        <RiEditLine size={16} />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        className="action-btn-delete"
                                                        onClick={() => setDeleteModal({
                                                            show: true,
                                                            type: 'testimonial',
                                                            id: item._id,
                                                            title: `${item.name}'s Review`
                                                        })}
                                                        title="Delete Testimonial"
                                                    >
                                                        <RiDeleteBin6Line size={16} />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </section>

            {/* DELETE CONFIRMATION MODAL */}
            {deleteModal.show && (
                <div className="modal-overlay" onClick={() => setDeleteModal({ show: false, type: '', id: null, title: '' })}>
                    <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon-badge danger">
                            <RiDeleteBin6Line size={28} />
                        </div>
                        <h3>Confirm Deletion</h3>
                        <p>
                            Are you sure you want to permanently delete <strong>{deleteModal.title}</strong>? This action cannot be reversed.
                        </p>
                        <div className="modal-buttons-row">
                            <button
                                className="btn-modal-cancel"
                                onClick={() => setDeleteModal({ show: false, type: '', id: null, title: '' })}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-modal-danger"
                                onClick={confirmDelete}
                            >
                                Yes, Delete Record
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PROJECT DETAIL PREVIEW MODAL */}
            {previewProject && (
                <div className="modal-overlay" onClick={() => setPreviewProject(null)}>
                    <div className="modal-dialog-box preview-modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="preview-close-btn" onClick={() => setPreviewProject(null)}>
                            <RiCloseLine size={24} />
                        </button>
                        <img
                            src={resolveImageUrl(previewProject.image)}
                            alt={previewProject.title}
                            className="preview-hero-img"
                        />
                        <div className="preview-content-body">
                            <div className="preview-badges-row">
                                <span className="category-pill">{previewProject.category}</span>
                                <span className="status-pill pill-completed">{previewProject.status}</span>
                                {previewProject.year && <span className="year-pill">{previewProject.year}</span>}
                            </div>
                            <h2>{previewProject.title}</h2>
                            <p className="preview-location"><RiMapPinLine /> {previewProject.location || 'Mumbai, Maharashtra'}</p>

                            <div className="preview-specs-grid">
                                <div><strong>Area:</strong> {previewProject.area || 'N/A'}</div>
                                <div><strong>Scope:</strong> {previewProject.scope || 'N/A'}</div>
                                <div className="span-2"><strong>Structure:</strong> {previewProject.structure || 'RCC Framed'}</div>
                            </div>

                            <p className="preview-full-text">
                                {previewProject.fullDesc || previewProject.shortDesc}
                            </p>

                            {Array.isArray(previewProject.highlights) && previewProject.highlights.length > 0 && (
                                <div className="preview-highlights">
                                    <h4>Key Engineering Highlights:</h4>
                                    <ul>
                                        {previewProject.highlights.map((hl, idx) => (
                                            <li key={idx}><RiCheckLine /> {hl}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {previewProject.clientQuote && (
                                <div className="preview-quote-box">
                                    <p>"{previewProject.clientQuote}"</p>
                                    <span>— {previewProject.clientAuthor || 'Client Feedback'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;