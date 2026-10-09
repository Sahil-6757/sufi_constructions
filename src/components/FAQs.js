import React, { useState } from 'react';
import './faqs.css';

const faqsData = [
    {
        id: 1,
        question: 'What types of construction projects does Sufi Construction handle?',
        answer: 'We specialize in comprehensive end-to-end construction services including custom luxury residential villas, multi-story apartment complexes, commercial corporate hubs, retail centers, and industrial warehouse facilities. We also manage complete architectural renovations and structural remodeling.',
        highlight: 'From blueprint design to final handover, we manage every phase under one roof.',
    },
    {
        id: 2,
        question: 'How do you guarantee transparent pricing and project cost control?',
        answer: 'Before beginning any construction work, we provide a transparent, itemized Bill of Quantities (BOQ) detailing material specifications, labor costs, and milestone deliverables. Our standardized packages eliminate hidden charges, and payments are strictly tied to verified completion stages.',
        highlight: 'Zero hidden fees. All costs are approved by you before breaking ground.',
    },
    {
        id: 3,
        question: 'Do you manage government permits, municipal approvals, and legal sanctions?',
        answer: 'Yes, our in-house architectural and legal liaising team handles all municipal zoning approvals, structural drawing sanctioning, environmental permissions, utility connections (water, electricity), and occupancy certificates so you never have to navigate tedious bureaucracy.',
        highlight: '100% compliant documentation handled by our regulatory experts.',
    },
    {
        id: 4,
        question: 'What quality standards and building materials do you use?',
        answer: 'We maintain an uncompromising quality standard. We exclusively procure certified high-grade steel (TMT 550D/Fe 550), premium grade concrete, first-class red clay or AAC blocks, and top-tier plumbing and electrical components. Every batch undergoes on-site cube testing and quality inspections.',
        highlight: 'Certified materials backed by rigorous structural and durability testing.',
    },
    {
        id: 5,
        question: 'How long does a typical residential villa or commercial building take?',
        answer: 'Timelines vary by architectural complexity and square footage. A standard 3,000–5,000 sq.ft residential villa is typically completed in 9 to 12 months. Commercial projects generally range from 12 to 18 months. We follow Gantt-chart scheduling with weekly progress reports to ensure on-time delivery.',
        highlight: 'Backed by our Delivery on Schedule commitment and live milestone tracking.',
    },
    {
        id: 6,
        question: 'Can I customize floor plans, materials, or finishes during the build?',
        answer: 'Absolutely. We offer complete architectural flexibility. Our 3D modeling and engineering team collaborates with you during each milestone review, allowing you to customize interior layouts, electrical fixtures, premium flooring, and exterior finishes before installation.',
        highlight: 'Interactive 3D walkthroughs and flexibility at milestone review checkpoints.',
    },
];

const FAQs = () => {
    const [openId, setOpenId] = useState(1);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="faqs-section" id="faqs">
            <div className="faqs-container">
                <div className="faqs-header">
                    <span className="faqs-badge">Help & Insights</span>
                    <h2 className="faqs-title">Frequently Asked Questions</h2>
                    <p className="faqs-subtitle">
                        Clear answers to everything you need to know about our construction process, materials, architectural planning, and timelines.
                    </p>
                </div>

                <div className="faqs-accordion">
                    {faqsData.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className={`faq-item ${isOpen ? 'active' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="faq-question-btn"
                                    onClick={() => toggleAccordion(faq.id)}
                                    aria-expanded={isOpen}
                                >
                                    <div className="faq-question-left">
                                        <span className="faq-index">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="faq-question-text">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <span className="faq-toggle-icon">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>
                                </button>

                                <div
                                    className="faq-answer-wrapper"
                                    style={{
                                        maxHeight: isOpen ? '400px' : '0px',
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                >
                                    <div className="faq-answer-content">
                                        <p>{faq.answer}</p>
                                        {faq.highlight && (
                                            <div className="faq-highlight-box">
                                                {faq.highlight}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Banner */}
                <div className="faqs-cta-banner">
                    <div className="faqs-cta-text">
                        <h3>Still have questions about your construction project?</h3>
                        <p>Our senior civil engineers and architects are here to guide you with a free consultation.</p>
                    </div>
                    <a href="#contact" className="faqs-cta-btn">
                        <span>Speak with an Engineer</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQs;