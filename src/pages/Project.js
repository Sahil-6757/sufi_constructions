import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './project.css';
import {
    RiSearchLine,
    RiCloseLine,
    RiMapPin2Line,
    RiArrowRightLine,
    RiCheckboxCircleLine,
    RiBuilding2Line
} from 'react-icons/ri';

const projectsData = [
    {
        id: 1,
        title: "The Grand Crest Villa",
        category: "Residential",
        location: "Worli Sea Face, Mumbai",
        area: "7,200 Sq. Ft.",
        year: "2024",
        status: "Completed",
        scope: "Turnkey Civil & Interiors",
        structure: "RCC Earthquake-Resistant Frame",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "A bespoke 4-storey private waterfront villa with cantilevered terraces, rooftop infinity pool, and Italian marble finishes.",
        fullDesc: "Commissioned as a private architectural landmark, The Grand Crest Villa integrates state-of-the-art structural engineering with luxury coastal aesthetics. From deep piling foundation to reinforced shear walls designed for marine wind and saline exposure, our team delivered complete civil framing, premium soundproofing, thermal insulation, and custom acoustic ceiling works on an expedited 14-month schedule.",
        highlights: [
            "Heavy-duty marine grade Fe-550D TMT reinforcement",
            "Cantilevered 18-meter panoramic sea-view deck",
            "Integrated solar-ready rooftop & smart building automation",
            "Custom imported Italian statuario marble flooring",
            "Rooftop infinity swimming pool with watertight membrane"
        ],
        clientQuote: "Sufi Construction delivered our dream home with zero compromises on structural strength. Their attention to finishes and daily transparency was extraordinary.",
        clientAuthor: "Farhan M. - Property Owner"
    },
    {
        id: 2,
        title: "Skyline Horizon Towers",
        category: "Apartments",
        location: "Andheri East, Mumbai",
        area: "145,000 Sq. Ft.",
        year: "2024",
        status: "Completed",
        scope: "Full Multi-Storey Construction",
        structure: "18-Storey High-Rise RCC",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Premium 18-storey twin tower residential development featuring 72 luxury 3BHK & 4BHK apartments with subterranean parking.",
        fullDesc: "Skyline Horizon Towers showcases Sufi Construction's high-rise construction capabilities. Built with high-grade M40/M50 ready-mix concrete and advanced aluminium shuttering technology (Mivan formwork), the towers were completed ahead of schedule with flawless vertical alignment, double-basement hydraulic parking, and advanced fire suppression infrastructure.",
        highlights: [
            "Speedy Mivan aluminium formwork construction cycle",
            "Double basement parking with diaphragm wall protection",
            "High-speed dual passenger & stretcher elevators",
            "Seismic Zone III certified structural foundation",
            "Rainwater harvesting & 100% wastewater STP recycling"
        ],
        clientQuote: "Partnering with Sufi Construction ensured our 18-storey development was handed over 2 months ahead of RERA deadline with impeccable construction quality.",
        clientAuthor: "K. R. Developers Group"
    },
    {
        id: 3,
        title: "Apex Corporate Center",
        category: "Commercial",
        location: "BKC, Mumbai",
        area: "48,000 Sq. Ft.",
        year: "2023",
        status: "Completed",
        scope: "Commercial Civil & Glass Facade",
        structure: "Steel-Concrete Composite",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "A futuristic Grade-A corporate office hub engineered with high-performance double-glazed acoustic curtain walls.",
        fullDesc: "Engineered for international corporate headquarters, Apex Corporate Center stands in the heart of BKC. The project features column-free floor plates with post-tensioned slabs, enabling flexible layout planning for corporate tenants. The exterior showcases low-E structural glazing that slashes cooling loads by 28%.",
        highlights: [
            "Post-tensioned (PT) beam-free structural slabs",
            "Unitized curtain wall double-glazed solar facade",
            "IGBC Gold certified sustainable building envelope",
            "Triple-height grand entrance lobby with architectural lighting",
            "Dedicated 100% DG power backup & multi-tier HVAC shafts"
        ],
        clientQuote: "The structural precision and modern facade engineering provided by Sufi Construction made Apex Center a signature landmark in the business district.",
        clientAuthor: "Nexus Commercial Properties"
    },
    {
        id: 4,
        title: "Emerald Palm Bungalow",
        category: "Residential",
        location: "Lonavala, Maharashtra",
        area: "5,400 Sq. Ft.",
        year: "2024",
        status: "Completed",
        scope: "Architectural & Civil Build",
        structure: "Stone Masonry & Reinforced RCC",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "A contemporary tropical holiday bungalow blending native basalt stone masonry with expansive wooden overhangs.",
        fullDesc: "Designed to blend seamlessly with the Western Ghats landscape, Emerald Palm Bungalow required specialized slope foundation engineering and rock-anchor civil works. Sufi Construction meticulously integrated exposed concrete finishes, natural basalt stone cladding, and wide weather-resistant wooden eaves.",
        highlights: [
            "Specialized slope foundation with deep micro-piling",
            "Handcrafted local basalt stone load-bearing feature walls",
            "Climate-responsive passive ventilation architecture",
            "Landscaped sunken patio & temperature-controlled plunge pool",
            "Weather-proof thermal exterior insulation for heavy rainfall"
        ],
        clientQuote: "Building on steep terrain is difficult, but Sufi Construction's engineering team handled the soil stabilization and foundation with extreme competence.",
        clientAuthor: "Dr. Sameer Joshi - Homeowner"
    },
    {
        id: 5,
        title: "Oasis Commercial Square",
        category: "Commercial",
        location: "Vashi, Navi Mumbai",
        area: "32,000 Sq. Ft.",
        year: "2024",
        status: "In Progress",
        scope: "Turnkey Commercial Development",
        structure: "RCC Heavy Commercial Frame",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "A bustling multi-level retail shopping galleria and dining destination planned for high footfall commercial visibility.",
        fullDesc: "Oasis Commercial Square features wide column spans for flexible showroom layouts, expansive escalators, and grand skylit central atrium. Constructed to withstand heavy commercial loads, this multi-tier shopping center meets international safety standards with advanced sprinkler networks and wide egress corridors.",
        highlights: [
            "12-meter wide column grids for maximum showroom visibility",
            "Central sky-lit atrium with high-tensile steel skylight",
            "Heavy commercial floor load capacity of 5.0 kN/m²",
            "Dedicated delivery bays and freight loading docks",
            "High-traffic anti-skid vitrified granite flooring"
        ],
        clientQuote: "Working with Sufi Construction gives us total peace of mind regarding structural safety, project milestones, and material honesty.",
        clientAuthor: "Oasis Retail Ventures"
    },
    {
        id: 6,
        title: "Regal Heritage Mansion",
        category: "Renovations",
        location: "Colaba, Mumbai",
        area: "4,600 Sq. Ft.",
        year: "2023",
        status: "Completed",
        scope: "Heritage Structural Retrofitting",
        structure: "Structural Retrofit & Modern Framing",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Complete structural restoration and interior modernization of a 70-year-old heritage residence while preserving historic architectural character.",
        fullDesc: "Restoring aged architectural marvels demands delicate engineering. Sufi Construction performed micro-concreting, carbon-fiber structural wrapping, foundational underpinning, and complete replumbing and rewiring, infusing 21st-century comfort and safety into timeless heritage elegance.",
        highlights: [
            "Carbon-fiber reinforced polymer (CFRP) beam strengthening",
            "Careful structural underpinning without disturbing adjacent walls",
            "Restoration of authentic Burma teak doors and ornate cornices",
            "Concealed central VRV air conditioning & smart electricals",
            "Damp-proofing and salt-leaching chemical barrier treatments"
        ],
        clientQuote: "They respected the soul of our vintage home while making it completely earthquake-safe and modern inside. Exceptional restoration team!",
        clientAuthor: "The Merchant Family"
    },
    {
        id: 7,
        title: "Zenith Heights Luxury Suites",
        category: "Apartments",
        location: "Powai, Mumbai",
        area: "98,000 Sq. Ft.",
        year: "2024",
        status: "In Progress",
        scope: "Turnkey High-Density Housing",
        structure: "14-Storey RCC Framed Structure",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Contemporary 14-storey residential community offering panoramic lake views, sky gardens, and sustainable living spaces.",
        fullDesc: "Strategically located in Powai, Zenith Heights combines modern lifestyle with green civil engineering. The project implements precast components for precision stairwells and parapets, water-conserving plumbing systems, and expansive wrap-around balconies with safety toughened glass railings.",
        highlights: [
            "14-storey framed structure with Grade-A tested raw materials",
            "Rooftop clubhouse, gymnasium, and landscaped jogging track",
            "Toughened glass balcony balustrades with aluminium core",
            "Integrated solar water heating & central garbage chutes",
            "Zero water stagnation drainage design"
        ],
        clientQuote: "Sufi Construction's site supervisors are disciplined, safety-conscious, and maintain stellar quality on every slab casting.",
        clientAuthor: "Greenfield Realty Partners"
    },
    {
        id: 8,
        title: "Apex Logistics & Industrial Park",
        category: "Industrial",
        location: "Bhiwandi, Maharashtra",
        area: "85,000 Sq. Ft.",
        year: "2023",
        status: "Completed",
        scope: "Industrial PEB & Concrete Flooring",
        structure: "Pre-Engineered Steel (PEB)",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "A state-of-the-art logistics fulfillment center and warehouse featuring high-bay pre-engineered steel frames and FM2 laser-screed flooring.",
        fullDesc: "Designed to support high-density logistics automation and multi-ton forklift operations, this industrial facility demanded laser-level FM2 concrete flooring with dry-shake metallic hardeners. Sufi Construction engineered a clear-span steel structure spanning 36 meters without intermediate columns for optimal warehouse racking.",
        highlights: [
            "36-meter clear-span Pre-Engineered Steel (PEB) superstructure",
            "FM2 super-flat industrial floor with steel fiber reinforced concrete (SFRC)",
            "Heavy-duty loading bays with automatic hydraulic dock levelers",
            "Full FM Global compliant automated fire sprinkler infrastructure",
            "Insulated sandwich puff panels for interior thermal stabilization"
        ],
        clientQuote: "Delivering an 85,000 sq. ft. laser-flat industrial facility in under 7 months was remarkable. Sufi Construction is our trusted civil contractor.",
        clientAuthor: "TransAsia Logistics Corp"
    },
    {
        id: 9,
        title: "Marina Bayfront Penthouse",
        category: "Residential",
        location: "Marine Lines, Mumbai",
        area: "4,200 Sq. Ft.",
        year: "2024",
        status: "Completed",
        scope: "Ultra-Luxury Residential Civil & Fitout",
        structure: "Reinforced Structural Retrofitting",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "An exclusive coastal penthouse renovation featuring open-plan layouts, structural modifications, and double-height oceanfront glass facade.",
        fullDesc: "Perched atop a premium residential tower overlooking the Arabian Sea, this project required removing non-load-bearing masonry and introducing concealed steel beams to achieve expansive, unhindered 180-degree ocean panoramas while complying with strict structural load guidelines.",
        highlights: [
            "Structural load-redistribution with concealed steel I-beams",
            "Double-glazed hurricane-rated sliding glass window systems",
            "Acoustic floor underlayment for complete sound dampening",
            "Smart ambient climate and curtain automation integration",
            "Private terrace garden with lightweight volcanic pumice soil"
        ],
        clientQuote: "The open spaces and solid finishes are breathtaking. Sufi Construction transformed the top floor into a true masterpiece.",
        clientAuthor: "Z. Bilakhia - Penthouse Owner"
    }
];

const categories = [
    { label: "All Projects", value: "All" },
    { label: "Residential", value: "Residential" },
    { label: "Apartments", value: "Apartments" },
    { label: "Commercial", value: "Commercial" },
    { label: "Renovations", value: "Renovations" },
    { label: "Industrial", value: "Industrial" }
];

const processSteps = [
    {
        number: "01",
        title: "Consultation & Site Feasibility",
        desc: "Comprehensive soil testing, topography assessment, structural zoning review, and tailored architectural blueprinting."
    },
    {
        number: "02",
        title: "Engineering & Regulatory Approvals",
        desc: "Certified 3D BIM models, seismic load analysis, municipal sanctioning, and transparent itemized bill of quantities (BOQ)."
    },
    {
        number: "03",
        title: "Precision Civil Construction",
        desc: "RCC foundation casting, certified TMT steel framing, multi-stage quality audits, and live photographic milestone reporting."
    },
    {
        number: "04",
        title: "Finishing & Certified Handover",
        desc: "Premium exterior cladding, interior MEP integration, rigorous waterproofing tests, and snag-free key handover on time."
    }
];

const Project = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProject(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filter projects based on category and search query
    const filteredProjects = projectsData.filter((project) => {
        const matchesCategory =
            selectedCategory === "All" || project.category === selectedCategory;

        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
            !query ||
            project.title.toLowerCase().includes(query) ||
            project.location.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query) ||
            project.shortDesc.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    // Helper count for tabs
    const getCategoryCount = (catValue) => {
        if (catValue === "All") return projectsData.length;
        return projectsData.filter((p) => p.category === catValue).length;
    };

    return (
        <div className="project-page-wrapper">
            {/* Hero Section */}
            <section className="project-hero-section">
                <div className="project-hero-content">
                    <span className="project-badge">
                        Portfolio &amp; Landmarks
                    </span>

                    <h1 className="project-hero-title">
                        Crafting Architectural Excellence <span>Across India</span>
                    </h1>

                    <p className="project-hero-subtitle">
                        Explore our distinguished portfolio of residential villas, high-rise apartment towers,
                        commercial complexes, and industrial landmarks — engineered with uncompromising durability,
                        safety, and master craftsmanship.
                    </p>

                    {/* Metric Pills */}
                    <div className="project-metrics-row">
                        <div className="metric-pill">
                            <span className="metric-pill-number">250+</span>
                            <span className="metric-pill-label">Projects Delivered</span>
                        </div>
                        <div className="metric-pill">
                            <span className="metric-pill-number">1.8M+</span>
                            <span className="metric-pill-label">Sq. Ft. Constructed</span>
                        </div>
                        <div className="metric-pill">
                            <span className="metric-pill-number">100%</span>
                            <span className="metric-pill-label">On-Time Handover</span>
                        </div>
                        <div className="metric-pill">
                            <span className="metric-pill-number">15+</span>
                            <span className="metric-pill-label">Years of Civil Trust</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Search Toolbar */}
            <section className="project-controls-section">
                <div className="project-controls-container">
                    <div className="project-search-row">
                        {/* Search Box */}
                        <div className="project-search-box">
                            <RiSearchLine className="project-search-icon" />
                            <input
                                type="text"
                                placeholder="Search by project name, location (e.g. Worli, BKC, Mumbai)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="project-search-input"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="project-search-clear"
                                    aria-label="Clear search query"
                                >
                                    <RiCloseLine />
                                </button>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className="project-results-count">
                            Showing <strong>{filteredProjects.length}</strong> of {projectsData.length} Projects
                        </div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="project-filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`filter-tab-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                            >
                                <span>{cat.label}</span>
                                <span className="filter-tab-count">
                                    {getCategoryCount(cat.value)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="projects-grid-section">
                <div className="projects-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <article key={project.id} className="project-card">
                                {/* Card Image */}
                                <div
                                    className="project-card-image-wrapper"
                                    onClick={() => setSelectedProject(project)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                                    aria-label={`View details for ${project.title}`}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-card-img"
                                        loading="lazy"
                                    />
                                    <div className="project-image-gradient" />

                                    {/* Top Badges */}
                                    <div className="project-card-badges">
                                        <span className="badge-category">{project.category}</span>
                                        <span className={`badge-status ${project.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                                            <span className="status-dot" />
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Quick View Button on Hover */}
                                    <div className="project-quick-view-overlay">
                                        <span className="quick-view-btn">
                                            View Project Blueprint &amp; Specs
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="project-card-body">
                                    <div className="project-location">
                                        <RiMapPin2Line />
                                        <span>{project.location}</span>
                                    </div>

                                    <h3
                                        className="project-title"
                                        onClick={() => setSelectedProject(project)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="project-desc">{project.shortDesc}</p>

                                    {/* Key Specs Strip */}
                                    <div className="project-specs-strip">
                                        <div className="spec-item">
                                            <span className="spec-label">Area</span>
                                            <span className="spec-val">{project.area}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Year</span>
                                            <span className="spec-val">{project.year}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Scope</span>
                                            <span className="spec-val" title={project.scope}>
                                                {project.scope.split(' ')[0]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className="project-card-footer">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="project-details-btn"
                                        >
                                            <span>Explore Details</span>
                                            <RiArrowRightLine />
                                        </button>

                                        <Link to="/Contact" className="project-inquire-link">
                                            Inquire
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="projects-empty-state">
                            <h3>No Projects Found</h3>
                            <p>We couldn't find any projects matching "{searchQuery}" in {selectedCategory}.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchQuery("");
                                }}
                                className="reset-filter-btn"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Interactive Project Details Modal */}
            {selectedProject && (
                <div
                    className="project-modal-backdrop"
                    onClick={() => setSelectedProject(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="project-modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            className="project-modal-close"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close modal"
                        >
                            <RiCloseLine />
                        </button>

                        {/* Modal Header Image */}
                        <div className="project-modal-image-wrap">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="project-modal-img"
                            />
                            <div className="project-modal-image-overlay">
                                <span className="modal-category-badge">{selectedProject.category}</span>
                                <h2 id="modal-title" className="modal-title">{selectedProject.title}</h2>
                                <span className="modal-location">
                                    <RiMapPin2Line /> {selectedProject.location}
                                </span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="project-modal-content">
                            {/* Specs Table Grid */}
                            <div className="modal-specs-grid">
                                <div className="modal-spec-cell">
                                    <span className="modal-spec-title">Built-Up Area</span>
                                    <span className="modal-spec-value">{selectedProject.area}</span>
                                </div>
                                <div className="modal-spec-cell">
                                    <span className="modal-spec-title">Completion Year</span>
                                    <span className="modal-spec-value">{selectedProject.year}</span>
                                </div>
                                <div className="modal-spec-cell">
                                    <span className="modal-spec-title">Project Status</span>
                                    <span className="modal-spec-value">{selectedProject.status}</span>
                                </div>
                                <div className="modal-spec-cell">
                                    <span className="modal-spec-title">Structural Framework</span>
                                    <span className="modal-spec-value">{selectedProject.structure}</span>
                                </div>
                            </div>

                            {/* Architectural Brief */}
                            <div>
                                <h3 className="modal-section-title">Architectural &amp; Engineering Overview</h3>
                                <p className="modal-description-text">{selectedProject.fullDesc}</p>
                            </div>

                            {/* Technical Highlights */}
                            <div>
                                <h3 className="modal-section-title">Key Engineering Deliverables</h3>
                                <div className="modal-highlights-grid">
                                    {selectedProject.highlights.map((item, idx) => (
                                        <div key={idx} className="modal-highlight-item">
                                            <RiCheckboxCircleLine className="modal-check-icon" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Client Testimonial */}
                            <div className="modal-client-quote">
                                <p className="modal-quote-text">"{selectedProject.clientQuote}"</p>
                                <span className="modal-quote-author">— {selectedProject.clientAuthor}</span>
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-footer-actions">
                                <Link
                                    to="/Contact"
                                    onClick={() => setSelectedProject(null)}
                                    className="modal-inquire-btn"
                                >
                                    <span>Plan A Similar Project With Us</span>
                                    <RiArrowRightLine />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="modal-close-text-btn"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Execution Process Methodology */}
            <section className="project-process-section">
                <div className="process-container">
                    <div className="process-header">
                        <span className="process-tag">HOW WE BUILD</span>
                        <h2 className="process-title">From Concept to Concrete Reality</h2>
                        <p className="process-desc">
                            Our systematic, four-stage civil execution framework ensures zero structural surprises,
                            strict adherence to building codes, and complete budget adherence.
                        </p>
                    </div>

                    <div className="process-steps-grid">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="process-card">
                                <div className="process-step-number">{step.number}</div>
                                <h3 className="process-card-title">{step.title}</h3>
                                <p className="process-card-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action Section */}
            <section className="project-cta-section">
                <div className="project-cta-content">
                    <span className="project-cta-badge">LET'S BUILD TOGETHER</span>
                    <h2 className="project-cta-title">Ready to Construct Your Next Signature Landmark?</h2>
                    <p className="project-cta-desc">
                        Whether you are planning a luxury residential villa, high-density residential community,
                        or high-yield commercial property, our chartered civil engineers are ready to assist you.
                    </p>
                    <div className="project-cta-buttons">
                        <Link to="/Contact" className="btn-project-cta-gold">
                            <span>Get Free Site Consultation &amp; Estimate</span>
                            <RiArrowRightLine />
                        </Link>
                        <Link to="/Services" className="btn-project-cta-outline">
                            <span>Explore All Services</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Project;