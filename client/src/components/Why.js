import React from 'react';
import './why.css';

const whyUsItems = [
    {
        id: 1,
        title: 'Commitment to Quality',
        description: 'A "no compromise" approach to quality has won us many contracts as it has cascaded down from top management.',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Cost Consciousness',
        description: 'With our standardised packages, we place the greatest emphasis on project cost.',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5H7V5h10v2zm-8 4H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Delivery on Schedule',
        description: 'Time is a core value in the construction industry.',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="currentColor" />
                <path d="M12 6v6.2l4.2 2.5-.7 1.2L10.5 13V6h1.5z" fill="#ffffff" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Modern Construction',
        description: 'We use modern techniques and stay current with technology.',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 2H5c-1.1 0-2 .9-2 2v18h18V4c0-1.1-.9-2-2-2zm-9 17H8v-3h2v3zm0-5H8v-2h2v2zm0-4H8V8h2v2zm0-4H8V4h2v2zm6 13h-2v-3h2v3zm0-5h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z" />
            </svg>
        ),
    },
    {
        id: 5,
        title: 'Convenience',
        description: 'We are entirely responsible from plan approval to handover.',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="currentColor" />
                <path d="M10 15.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z" fill="#ffffff" />
            </svg>
        ),
    },
    {
        id: 6,
        title: 'Transparency',
        description: 'Transparent on all levels (progress, payment, materials).',
        icon: (
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10.5" cy="10.5" r="7" />
                <line x1="16" y1="16" x2="22" y2="22" />
            </svg>
        ),
    },
];

const Why = () => {
    return (
        <section className="why-us-section" id="why-us">
            <div className="why-us-container">
                <div className="why-us-header">
                    <h2 className="why-us-title">WHY US?</h2>
                    <p className="why-us-subtitle">
                        We are in charge of your home project. We will manage and execute your entire project from plan to handover
                    </p>
                </div>

                <div className="why-us-grid">
                    {whyUsItems.map((item) => (
                        <div key={item.id} className="why-us-card">
                            <div className="why-us-icon-wrapper">
                                {item.icon}
                            </div>
                            <h3 className="why-us-card-title">{item.title}</h3>
                            <p className="why-us-card-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Why;