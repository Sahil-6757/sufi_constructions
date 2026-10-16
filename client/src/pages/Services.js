import React from 'react';
import { Link } from 'react-router-dom';
import './services.css';

const servicesData = [
    {
        id: 1,
        title: "Building Construction",
        category: "Residential & Commercial",
        description: "Complete turnkey construction solutions from site preparation, foundation engineering, and structural framing to architectural finishing.",
        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        features: [
            "RCC Framed Earthquake-Resistant Structure",
            "Grade-A Certified Cement & TMT Steel",
            "Comprehensive Turnkey Management"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14" />
                <path d="M9 9h1M9 13h1M9 17h1M17 11h1M17 15h1" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Villa & House Construction",
        category: "Luxury Living",
        description: "Bespoke custom villas, bungalows, and private residences crafted with contemporary aesthetics, premium interiors, and smart living spaces.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        features: [
            "Personalized 3D Elevation & Floor Plans",
            "Vastu-Compliant & Energy-Efficient Layouts",
            "Luxury Finishes, Landscaping & Automation"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Apartment Buildings",
        category: "Multi-Storey Residential",
        description: "High-density residential towers and gated communities engineered for optimal space utilization, structural longevity, and community lifestyle.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        features: [
            "Advanced Multi-Level Structural Auditing",
            "Modern Lift Wells, Fire Systems & Utilities",
            "Underground Parking & Reinforced Basements"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="9" y1="6" x2="9.01" y2="6" />
                <line x1="15" y1="6" x2="15.01" y2="6" />
                <line x1="9" y1="10" x2="9.01" y2="10" />
                <line x1="15" y1="10" x2="15.01" y2="10" />
                <line x1="9" y1="14" x2="9.01" y2="14" />
                <line x1="15" y1="14" x2="15.01" y2="14" />
                <path d="M10 22v-4h4v4" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Commercial Buildings",
        category: "Retail & Corporate",
        description: "Retail centers, corporate office parks, and commercial plazas planned for maximum commercial footfall, modern glass facades, and business prestige.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        features: [
            "Curtain Wall Glass & Structural Glazing",
            "High-Traffic Commercial Flooring & HVAC",
            "Regulatory Approvals & Commercial Compliance"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
            </svg>
        )
    },
    {
        id: 5,
        title: "Factory & Industrial Buildings",
        category: "Industrial Infrastructure",
        description: "Heavy-duty manufacturing plants, pre-engineered buildings (PEB), and logistics warehouses engineered for durability, safety, and heavy machinery.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        features: [
            "Heavy Load-Bearing Concrete Flooring",
            "Pre-Engineered Steel Sheds & Wide Spans",
            "Industrial Loading Bays & Ventilation"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M17 18h1" />
                <path d="M12 18h1" />
                <path d="M7 18h1" />
            </svg>
        )
    },
    {
        id: 6,
        title: "Renovation & Remodeling",
        category: "Restoration & Modernization",
        description: "Transform existing buildings into contemporary masterpieces with structural retrofitting, interior redesigns, facade modernization, and expansions.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        features: [
            "Structural Strengthening & Retrofitting",
            "Interior & Exterior Facade Upgrades",
            "Minimal Disruption & Clean Site Protocol"
        ],
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        )
    }
];

const whyChooseFeatures = [
    {
        id: 1,
        title: "Certified Quality Assurance",
        description: "Unwavering commitment to premium grade materials, laboratory concrete testing, and strict IS/ISO building code compliance.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Guaranteed On-Time Delivery",
        description: "Milestone-driven project management with strict schedule tracking, weekly progress reports, and zero unexcused delays.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Experienced Technical Team",
        description: "Licensed civil engineers, chartered architects, and seasoned project directors with decades of proven ground experience.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        id: 4,
        title: "100% Transparent Pricing",
        description: "Itemized bills of quantities (BOQ) with zero hidden charges, transparent material breakdowns, and stage-wise payments.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        )
    },
    {
        id: 5,
        title: "End-to-End Turnkey Execution",
        description: "From architectural blueprints and municipal sanctioning to structural execution, interior styling, and final key handover.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        )
    },
    {
        id: 6,
        title: "Post-Handover Warranty",
        description: "Comprehensive structural warranty and ongoing maintenance support to protect your long-term real estate investment.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    }
];

const Services = () => {
    return (
        <div className="services-page-wrapper">
            {/* Hero Section */}
            <section className="services-hero-section">
                <div className="services-hero-content">
                    <div className="services-badge">

                        <span>Comprehensive Civil & Architectural Solutions</span>
                    </div>

                    <h1 className="services-hero-title">
                        Our Building Services Built on <span className="text-gold-highlight">Quality & Precision</span>
                    </h1>

                    <p className="services-hero-subtitle">
                        From modern residential villas and multi-storey apartments to high-tech commercial hubs
                        and industrial facilities—we engineer enduring spaces tailored to your vision.
                    </p>

                    <div className="services-hero-actions">
                        <Link to="/Contact" className="btn-brand-primary">
                            <span>Request Free Consultation</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                        <Link to="/Package" className="btn-brand-outline">
                            <span>Explore Packages</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Capabilities Strip */}
            <section className="services-trust-strip">
                <div className="trust-strip-container">
                    <div className="trust-items-grid">
                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="trust-title">Turnkey Contracting</h5>
                                <p className="trust-sub">From concept to keys</p>
                            </div>
                        </div>

                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                    <polyline points="2 17 12 22 22 17" />
                                    <polyline points="2 12 12 17 22 12" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="trust-title">3D BIM Modeling</h5>
                                <p className="trust-sub">Precision architectural planning</p>
                            </div>
                        </div>

                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 14 14" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="trust-title">On-Time Delivery</h5>
                                <p className="trust-sub">Milestone-tracked execution</p>
                            </div>
                        </div>

                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="trust-title">Certified Materials</h5>
                                <p className="trust-sub">100% Grade-A steel & cement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Cards Grid */}
            <section className="services-grid-section">
                <div className="services-container">
                    <div className="services-section-header">
                        <span className="services-section-tag">OUR SPECIALIZATIONS</span>
                        <h2 className="services-section-title">What We Build For You</h2>
                        <p className="services-section-desc">
                            Every project is handled with rigorous architectural standards, personalized project management,
                            and our signature commitment to transparency and durability.
                        </p>
                    </div>

                    <div className="services-cards-grid">
                        {servicesData.map((service) => (
                            <div key={service.id} className="service-card">
                                <div className="service-card-image-wrap">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="service-card-img"
                                    />
                                    <div className="service-card-overlay" />
                                </div>

                                <div className="service-card-body">
                                    <div className="service-title-wrap">
                                        <div className="service-icon-circle">
                                            {service.icon}
                                        </div>
                                        <h3 className="service-card-title">{service.title}</h3>
                                    </div>

                                    <p className="service-card-desc">{service.description}</p>

                                    <ul className="service-features-list">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="service-feature-item">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="service-card-action">
                                        <Link to="/Contact" className="service-inquire-link">
                                            <span>Inquire About This Service</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Sufi Construction Section */}
            <section className="why-choose-section">
                <div className="services-container">
                    <div className="services-section-header">
                        <span className="services-section-tag">THE SUFI ADVANTAGE</span>
                        <h2 className="services-section-title">Why Choose Sufi Construction?</h2>
                        <p className="services-section-desc">
                            We stand apart through our client-first ethos, unmatched engineering discipline,
                            and completely transparent project communication.
                        </p>
                    </div>

                    <div className="features-grid">
                        {whyChooseFeatures.map((feat) => (
                            <div key={feat.id} className="feature-card">
                                <div className="feature-icon-wrapper">
                                    {feat.icon}
                                </div>
                                <div className="feature-content">
                                    <h4>{feat.title}</h4>
                                    <p>{feat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Call To Action */}
            <section className="services-cta-section">
                <div className="services-cta-container">
                    <span className="services-cta-tag">START YOUR CONSTRUCTION TODAY</span>
                    <h2 className="services-cta-title">Ready to Discuss Your Next Construction Project?</h2>
                    <p className="services-cta-desc">
                        Get in touch with our team of chartered civil engineers and architects for a free
                        site assessment, customized project blueprint, and itemized cost estimation.
                    </p>
                    <div className="services-cta-buttons">
                        <Link to="/Contact" className="btn-cta-gold">
                            <span>Book Free Site Consultation</span>
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

export default Services;