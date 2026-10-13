
import React, { useState } from 'react';
import './contact.css';

import {
    RiTeamFill,
    RiBuilding2Fill,
    RiToolsFill,
    RiCustomerService2Fill,
    RiMapPinFill,
    RiMailFill,
    RiWhatsappFill,
    RiPhoneFill,
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterFill,
    RiLinkedinFill
} from 'react-icons/ri';

const Contact = () => {
    const initialForm = {
        name: '',
        email: '',
        phone: '',
        service: 'General',
        message: ''
    };

    const [formData, setFormData] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace this with your API request to send the message.
        console.log('Contact Form Data:', formData);

        setSubmitted(true);
        setFormData(initialForm);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="contact-hero-content">
                    <span>Contact Us</span>

                    <h2>Let's Start Your Next Project</h2>

                    <p>
                        Ready to transform your vision into reality? Whether you have
                        a specific construction project in mind or need expert guidance,
                        our team is here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Contact Form and Information */}
            <section className="contact-container">

                <div className="contact-form-card">
                    <div className="contact-form-header">
                        <h3>Get In Touch</h3>
                        <p>
                            Send us a message and we'll get back to you shortly.
                        </p>
                    </div>

                    {submitted && (
                        <div className="submit-success" role="status">
                            ✓ Your form has been submitted successfully.
                            Please connect an email service or backend to deliver messages.
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="contact-form"
                    >
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="service">Interested Service</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="General">General Inquiry</option>
                                <option value="Residential">
                                    Residential Construction
                                </option>
                                <option value="Commercial">
                                    Commercial Construction
                                </option>
                                <option value="Renovation">
                                    Renovation &amp; Remodeling
                                </option>
                                <option value="Consultation">
                                    Consultation
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                How can we help you? *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Describe your project or how we can assist you..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="contact-submit-btn"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information Sidebar */}
                <div className="contact-sidebar">
                    <div className="contact-info-card">
                        <h3>Our Contact Information</h3>

                        <p className="info-description">
                            Reach out to us through any of the channels below.
                            Our team is ready to assist you with your construction needs.
                        </p>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiMailFill />
                            </div>

                            <div className="info-content">
                                <h4>Email Address</h4>
                                <a href="mailto:your-email@example.com">
                                    your-email@example.com
                                </a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiPhoneFill />
                            </div>

                            <div className="info-content">
                                <h4>Phone Number</h4>
                                <a href="tel:+911234567890">
                                    +91 12345 67890
                                </a>
                                <a href="tel:+911234567891">
                                    +91 12345 67891
                                </a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiMapPinFill />
                            </div>

                            <div className="info-content">
                                <h4>Office Address</h4>
                                <p>123 Construction Street</p>
                                <p>Mumbai, Maharashtra 400001</p>
                                <p>India</p>
                            </div>
                        </div>

                        <div className="info-divider" />

                        <div className="info-item">
                            <div className="info-icon">
                                <RiWhatsappFill />
                            </div>

                            <div className="info-content">
                                <h4>WhatsApp</h4>
                                <a
                                    href="https://wa.me/911234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Chat with us
                                </a>
                            </div>
                        </div>

                        <div className="info-divider" />

                        <div className="info-social">
                            <h4>Follow Us</h4>

                            <div className="social-icons">
                                <a
                                    href="https://facebook.com/"
                                    aria-label="Facebook"
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RiFacebookFill />
                                </a>

                                <a
                                    href="https://instagram.com/"
                                    aria-label="Instagram"
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RiInstagramFill />
                                </a>

                                <a
                                    href="https://twitter.com/"
                                    aria-label="Twitter"
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RiTwitterFill />
                                </a>

                                <a
                                    href="https://linkedin.com/"
                                    aria-label="LinkedIn"
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <RiLinkedinFill />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-choose-us">
                <div className="why-choose-header">
                    <span className="why-choose-badge">
                        Why Choose Sufi Construction
                    </span>

                    <h3>Reasons to Partner With Us</h3>

                    <p>
                        We combine experience, quality workmanship, and reliable
                        service to bring your construction vision to life.
                    </p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <RiTeamFill />
                        </div>

                        <div className="stat-content">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Happy Clients</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <RiBuilding2Fill />
                        </div>

                        <div className="stat-content">
                            <div className="stat-number">200+</div>
                            <div className="stat-label">Projects Completed</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <RiToolsFill />
                        </div>

                        <div className="stat-content">
                            <div className="stat-number">10+</div>
                            <div className="stat-label">Years of Experience</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <RiCustomerService2Fill />
                        </div>

                        <div className="stat-content">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Customer Support</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
