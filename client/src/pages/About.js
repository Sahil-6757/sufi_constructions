import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

const statsData = [
    {
        number: "15+",
        label: "Years Of Excellence",
        desc: "Delivering architectural landmarks & civil trust"
    },
    {
        number: "250+",
        label: "Completed Projects",
        desc: "Residential, commercial & turnkey spaces"
    },
    {
        number: "99%",
        label: "Client Satisfaction",
        desc: "Unwavering commitment to quality & timeline"
    },
    {
        number: "50+",
        label: "Expert Engineers",
        desc: "Licensed architects, builders & planners"
    }
];

const coreValues = [
    {
        id: 1,
        title: "Structural Excellence",
        desc: "Zero compromise on engineering standards, foundation strength, and resilient construction practices.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14" />
                <path d="M9 9h1M9 13h1M9 17h1M17 11h1M17 15h1" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Radical Transparency",
        desc: "Clear itemized estimates, honest timelines, real-time stage updates, and zero hidden costs.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Sustainable Building",
        desc: "Green building principles, eco-efficient materials, and designs that reduce long-term environmental impact.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Rigorous Safety First",
        desc: "Strict adherence to international safety codes, protective protocols, and accident-free job sites.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        )
    },
    {
        id: 5,
        title: "Timely Handover",
        desc: "Modern project tracking and disciplined milestones guarantee on-time project completion without delays.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )
    },
    {
        id: 6,
        title: "Client-Centric Vision",
        desc: "Custom architectural solutions built closely around your lifestyle, functionality, and long-term investment.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }
];

const processSteps = [
    {
        step: "01",
        title: "Consultation & Blueprinting",
        desc: "We listen to your ideas, analyze site feasibility, and establish budget frameworks and timeline goals."
    },
    {
        step: "02",
        title: "Architectural & 3D Design",
        desc: "Detailed structural planning, 3D visualizations, and municipal approvals handled seamlessly."
    },
    {
        step: "03",
        title: "Precision Construction",
        desc: "Certified materials, rigorous daily site supervision, and milestone-by-milestone quality checks."
    },
    {
        step: "04",
        title: "Final Audit & Handover",
        desc: "Thorough multi-point quality inspections followed by key handover and post-occupancy support."
    }
];

const teamMembers = [
    {
        name: "Imamuddin",
        role: "Chairman & Founder",
        title: "Strategic Vision & Governance",
        bio: "Guiding landmark residential and commercial developments with an uncompromising focus on structural integrity and transparency.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Nizamuddin",
        role: "Chief Executive Officer",
        title: "Executive Leadership & Operations",
        bio: "Directs turnkey project execution, engineering innovation, client relationships, and sustainable growth at Sufi Construction.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Jhon",
        role: "General Manager",
        title: "Project Execution & Quality Control",
        bio: "Oversees site operations, structural auditing, contractor coordination, and on-schedule handovers.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    }
];

const About = () => {
    return (
        <div className="about-page-wrapper">
            {/* Hero Section */}
            <section className="about-hero-section">
                <div className="about-hero-content">
                    <div className="about-badge">

                        <span>About Sufi Construction</span>
                    </div>

                    <h1 className="about-hero-title">
                        Crafting Enduring Spaces With <span className="text-gold-highlight">Precision & Passion</span>
                    </h1>

                    <p className="about-hero-subtitle">
                        Our construction company aims to revolutionize the industry by providing efficiency,
                        transparency, and uncompromised quality in every aspect of building projects.
                    </p>

                    <div className="about-hero-actions">
                        <Link to="/Project" className="btn-brand-primary">
                            <span>Explore Our Work</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                        <Link to="/Contact" className="btn-brand-outline">
                            <span>Contact Our Team</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Key Stats Counter Strip */}
            <section className="about-stats-section">
                <div className="about-stats-container">
                    <div className="stats-grid">
                        {statsData.map((stat, idx) => (
                            <div key={idx} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                                <p className="stat-desc">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story / Who We Are Section */}
            <section className="about-story-section">
                <div className="about-section-container">
                    <div className="story-grid">
                        <div className="story-image-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                                alt="Sufi Construction Site Engineering"
                                className="story-main-img"
                            />
                            <div className="story-floating-card">
                                <div className="floating-icon-circle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="floating-card-title">15+ Years</h4>
                                    <p className="floating-card-sub">Of Architectural Distinction</p>
                                </div>
                            </div>
                        </div>

                        <div className="story-content-wrap">
                            <div className="section-tag">WHO WE ARE</div>
                            <h2 className="section-heading">
                                Pioneering Efficiency & Transparency Across Modern Construction
                            </h2>
                            <p className="section-lead-text">
                                We leverage innovative technologies and proven engineering processes to streamline operations,
                                improve communication, and deliver exceptional results.
                            </p>
                            <p className="section-paragraph">
                                At Sufi Construction, we believe that great structures begin with integrity. Every project we undertake—from
                                bespoke residential developments to commercial complexes and infrastructure—is backed by thorough planning,
                                rigorous material auditing, and a passionate team dedicated to redefining the construction experience.
                            </p>

                            <div className="story-features-list">
                                <div className="story-feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>100% Itemized Cost Transparency</span>
                                </div>
                                <div className="story-feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Certified Grade-A Materials</span>
                                </div>
                                <div className="story-feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Guaranteed Handover Timelines</span>
                                </div>
                                <div className="story-feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Comprehensive Architectural BIM</span>
                                </div>
                            </div>

                            <div>
                                <Link to="/Contact" className="btn-brand-primary">
                                    <span>Schedule Site Consultation</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="about-mission-vision-section">
                <div className="about-section-container">
                    <div className="section-header-center">
                        <div className="section-tag">OUR PURPOSE & HORIZON</div>
                        <h2 className="section-heading">Our Mission & Vision</h2>
                        <p className="section-paragraph" style={{ margin: 0 }}>
                            Guided by a relentless pursuit of excellence, our core foundation shapes every project we construct.
                        </p>
                    </div>

                    <div className="mission-vision-grid">
                        {/* Mission Card */}
                        <div className="mv-card">
                            <div className="mv-card-image-wrap">
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                                    alt="Our Mission - Construction Engineers"
                                    className="mv-card-image"
                                />
                                <div className="mv-card-image-overlay" />
                                <span className="mv-card-badge-pill">OUR MISSION</span>
                            </div>
                            <div className="mv-card-body">
                                <div className="mv-icon-title-wrap">
                                    <div className="mv-icon-box">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="6" />
                                            <circle cx="12" cy="12" r="2" />
                                        </svg>
                                    </div>
                                    <h3 className="mv-card-title">Our Mission</h3>
                                </div>
                                <p className="mv-card-text">
                                    Our mission is to deliver high-quality construction projects with utmost efficiency
                                    and transparency, exceeding client expectations while ensuring environmental
                                    sustainability and long-term societal benefits.
                                </p>
                                <div className="mv-pill-tags">
                                    <span className="mv-pill-tag">✦ High-Quality Craftsmanship</span>
                                    <span className="mv-pill-tag">✦ Total Transparency</span>
                                    <span className="mv-pill-tag">✦ Environmental Sustainability</span>
                                </div>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="mv-card">
                            <div className="mv-card-image-wrap">
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                                    alt="Our Vision - Modern Architecture Skyline"
                                    className="mv-card-image"
                                />
                                <div className="mv-card-image-overlay" />
                                <span className="mv-card-badge-pill">OUR VISION</span>
                            </div>
                            <div className="mv-card-body">
                                <div className="mv-icon-title-wrap">
                                    <div className="mv-icon-box">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                    <h3 className="mv-card-title">Our Vision</h3>
                                </div>
                                <p className="mv-card-text">
                                    We envision becoming a leading construction company globally, renowned for our commitment
                                    to efficiency, transparency, and delivering exceptional construction projects that
                                    positively impact communities and the environment.
                                </p>
                                <div className="mv-pill-tags">
                                    <span className="mv-pill-tag">✦ Global Standards</span>
                                    <span className="mv-pill-tag">✦ Community Impact</span>
                                    <span className="mv-pill-tag">✦ Architectural Innovation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="about-values-section">
                <div className="about-section-container">
                    <div className="section-header-center">
                        <div className="section-tag">OUR GUIDING PRINCIPLES</div>
                        <h2 className="section-heading">The Pillars That Define Us</h2>
                        <p className="section-paragraph" style={{ margin: 0 }}>
                            Every foundation we pour and every beam we place is backed by an unwavering code of values.
                        </p>
                    </div>

                    <div className="values-grid">
                        {coreValues.map((val) => (
                            <div key={val.id} className="value-card">
                                <div className="value-icon-wrapper">{val.icon}</div>
                                <h3 className="value-card-title">{val.title}</h3>
                                <p className="value-card-desc">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Construction Process / Methodology */}
            <section className="about-process-section">
                <div className="about-section-container">
                    <div className="section-header-center">
                        <div className="section-tag">HOW WE BUILD</div>
                        <h2 className="section-heading">Our Proven 4-Step Journey</h2>
                        <p className="section-paragraph" style={{ margin: 0 }}>
                            From the initial concept sketches to the grand handover, our structured workflow ensures complete peace of mind.
                        </p>
                    </div>

                    <div className="process-grid">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="process-step-card">
                                <div className="process-step-number">{step.step}</div>
                                <h3 className="process-step-title">{step.title}</h3>
                                <p className="process-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="about-team-section">
                <div className="about-section-container">
                    <div className="section-header-center">
                        <div className="section-tag">EXECUTIVE LEADERSHIP</div>
                        <h2 className="section-heading">Meet Our Leadership Team</h2>
                        <p className="section-paragraph" style={{ margin: 0 }}>
                            The experienced leaders directing engineering excellence, transparency, and client satisfaction at Sufi Construction.
                        </p>
                    </div>

                    <div className="team-grid">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="team-card">
                                <div className="team-image-wrapper">
                                    <img src={member.image} alt={member.name} className="team-img" />
                                    <span className="team-badge-role">{member.role}</span>
                                </div>
                                <div className="team-info">
                                    <h3 className="team-name">{member.name}</h3>
                                    <div className="team-title">{member.title}</div>
                                    <p className="team-bio">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Banner */}
            <section className="about-cta-section">
                <div className="cta-inner-container">
                    <span className="cta-tag">START YOUR CONSTRUCTION JOURNEY</span>
                    <h2 className="cta-title">Ready to Bring Your Vision to Life?</h2>
                    <p className="cta-desc">
                        Partner with Sufi Construction for residential, commercial, or institutional builds.
                        Get in touch today for transparent project consultations and engineering advisory.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/Contact" className="btn-cta-gold">
                            <span>Request Free Consultation</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                        <Link to="/Project" className="btn-cta-outline-light">
                            <span>View Completed Projects</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;