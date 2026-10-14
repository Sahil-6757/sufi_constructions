import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './package.css';

const packagesData = [
    {
        id: 'basic',
        name: 'Basic Construction',
        tagline: 'Ideal for standard residential builds with solid core engineering.',
        price: '₹1,650',
        unit: 'per sq. ft.',
        isFeatured: false,
        features: [
            'Architectural 2D floor plans & approvals',
            'Fe550 Grade Steel & UltraTech Cement',
            'Solid red-brick / AAC block masonry',
            'Premium vitrified floor tiles (up to ₹60/sq.ft)',
            'Standard concealed copper wiring (Havells/Polycab)',
            'Branded CPVC plumbing & sanitary ware',
            'Tractor Emulsion interior wall paint',
            '1-Year structural guarantee'
        ],
        buttonText: 'Choose Basic Plan',
        buttonClass: 'outline'
    },
    {
        id: 'premium',
        name: 'Premium Turnkey',
        tagline: 'Our most popular comprehensive end-to-end turnkey package.',
        price: '₹2,150',
        unit: 'per sq. ft.',
        isFeatured: true,
        ribbon: 'Most Popular',
        features: [
            'Comprehensive 3D elevation & architectural layout',
            'High-grade TMT Bars & premium RMC concrete',
            'Granite kitchen counter with stainless steel sink',
            'Large format glazed vitrified tiles (up to ₹95/sq.ft)',
            'Modular switches with inverter wiring provision',
            'Kohler / Jaquar designer sanitary fittings',
            'Teak wood main entrance door with brass fixtures',
            'Asian Paints Royale Luxury Emulsion interior',
            'Waterproofing warranty on terrace & bathrooms',
            '5-Year structural guarantee & milestone tracker'
        ],
        buttonText: 'Choose Premium Plan',
        buttonClass: 'solid'
    },
    {
        id: 'luxury',
        name: 'Luxury Architectural',
        tagline: 'Ultra-luxurious bespoke villa & mansion construction.',
        price: '₹2,850',
        unit: 'per sq. ft.',
        isFeatured: false,
        features: [
            'Bespoke architectural styling & interior 3D renders',
            'Earthquake-resistant structural design & certification',
            'Italian marble flooring in living & master suites',
            'Fully integrated smart home automation & lighting',
            'Premium UPVC soundproof acoustic sliding windows',
            'Grohe / Hansgrohe concealed diverters & fixtures',
            'False ceiling with warm LED architectural profile lighting',
            'Landscaped terrace garden & customized porch',
            'Dedicated Chief Project Architect & daily video updates',
            '10-Year comprehensive structural guarantee'
        ],
        buttonText: 'Choose Luxury Plan',
        buttonClass: 'outline'
    }
];

const Package = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="package-page-wrapper">
            {/* Hero Section */}
            <section className="package-hero-section">
                <div className="package-hero-badge">
                    <span>Transparent Pricing</span>
                </div>
                <h1 className="package-hero-title">Construction Packages & Plans</h1>
                <p className="package-hero-subtitle">
                    Clear, itemized, and honest pricing tailored to your dream project. From essential residential builds to luxury architectural masterpieces.
                </p>
            </section>

            {/* Packages Grid */}
            <section className="packages-grid-section">
                <div className="packages-container">
                    <div className="packages-cards-grid">
                        {packagesData.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`package-card ${pkg.isFeatured ? 'featured' : ''}`}
                            >
                                {pkg.ribbon && (
                                    <div className="package-ribbon">{pkg.ribbon}</div>
                                )}
                                <div className="package-header">
                                    <h3 className="package-tier-name">{pkg.name}</h3>
                                    <p className="package-tier-desc">{pkg.tagline}</p>
                                    <div className="package-pricing">
                                        <span className="package-rate">{pkg.price}</span>
                                        <span className="package-unit">{pkg.unit}</span>
                                    </div>
                                </div>

                                <ul className="package-features-list">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="package-feature-item">
                                            <span className="package-check-icon">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/Contact"
                                    className={`package-cta-btn ${pkg.buttonClass}`}
                                >
                                    {pkg.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Custom Quote Banner */}
                    <div className="package-custom-banner">
                        <div className="package-custom-text">
                            <h3>Need a Custom Commercial or Residential Package?</h3>
                            <p>
                                Every piece of land has distinct soil, structural, and architectural requirements. Speak with our lead civil engineers for a free customized estimate.
                            </p>
                        </div>
                        <Link to="/Contact" className="package-custom-btn">
                            Get Custom Estimate
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Package;