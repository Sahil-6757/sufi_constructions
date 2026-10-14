import React, { useState, useEffect } from 'react';
import './contact.css';

import {
    RiMapPinFill,
    RiMailFill,
    RiWhatsappFill,
    RiPhoneFill,
    RiTimeFill,
    RiFacebookFill,
    RiInstagramFill,
    RiLinkedinFill,
    RiYoutubeFill
} from 'react-icons/ri';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const initialForm = {
        name: '',
        email: '',
        phone: '',
        service: 'General',
        message: ''
    };

    const [formData, setFormData] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

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

        const whatsappNumber = '919130630632';

        const messageLines = [
            '🏗️ *New Project Inquiry - Sufi Construction*',
            '━━━━━━━━━━━━━━━━━━━━━',
            `👤 *Full Name:* ${formData.name}`,
            `📧 *Email:* ${formData.email}`,
            `📱 *Phone:* ${formData.phone || 'Not provided'}`,
            `🏢 *Interested Service:* ${formData.service}`,
            `💬 *Message:*`,
            `${formData.message}`,
            '━━━━━━━━━━━━━━━━━━━━━',
            `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}`,
            '_Sent via Sufi Construction Website_'
        ];

        const encodedMessage = encodeURIComponent(messageLines.join('\n'));
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        setWhatsappRedirectUrl(whatsappUrl);
        setSubmitted(true);
        setFormData(initialForm);

        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="contact-page-wrapper">
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">Contact Us</h1>
                    <p className="contact-hero-subtitle">
                        Ready to transform your vision into reality? Whether you have a specific construction project in mind or need expert guidance, our team is here to help you every step of the way.
                    </p>
                </div>
            </section>



            {/* Contact Form and Information Grid */}
            <section className="contact-container">
                {/* Form Card */}
                <div className="contact-form-card">
                    <div className="contact-form-header">
                        <h3>Get In Touch</h3>
                        <p>
                            We'd love to hear from you! Please fill out the form below to send us a message.
                        </p>
                    </div>

                    {submitted && (
                        <div className="submit-success" role="status">
                            <div className="submit-success-icon">✓</div>
                            <div>
                                <strong>Redirecting to WhatsApp!</strong>
                                <p>
                                    Your project details have been formulated into WhatsApp for <strong>+91 91306 30632</strong>.
                                </p>
                                {whatsappRedirectUrl && (
                                    <a
                                        href={whatsappRedirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            marginTop: '8px',
                                            color: '#2B1703',
                                            background: 'linear-gradient(135deg, #DF9B4E 0%, #C88A42 100%)',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 12px rgba(200, 138, 66, 0.3)'
                                        }}
                                    >
                                        Click here if WhatsApp didn't open automatically →
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Your Email"
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
                                placeholder="Enter your phone number (e.g. +91 91306 30632)"
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
                                <option value="Residential">Residential Construction</option>
                                <option value="Commercial">Commercial Construction</option>
                                <option value="Renovation">Renovation &amp; Remodeling</option>
                                <option value="Consultation">Consultation &amp; Architectural Planning</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Describe your project or how we can assist you..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn">
                            <span>Send Message via WhatsApp</span>
                            <RiWhatsappFill style={{ fontSize: '1.3rem' }} />
                        </button>
                    </form>
                </div>

                {/* Sidebar Info Card */}
                <div className="contact-sidebar">
                    <div className="contact-info-card">
                        <h3>Our Office</h3>
                        <p className="info-description">
                            Reach out to us through any of the channels below. Our team is ready to assist you with your construction needs.
                        </p>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiMapPinFill />
                            </div>
                            <div className="info-content">
                                <h4>Head Office</h4>
                                <p>Plot No. 4, Shahu Nagar,</p>
                                <p>PO Jalgaon, Maharashtra, 425001, India</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiPhoneFill />
                            </div>
                            <div className="info-content">
                                <h4>Direct Phone</h4>
                                <a href="tel:+919130630632">+91 91306 30632</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiWhatsappFill />
                            </div>
                            <div className="info-content">
                                <h4>WhatsApp Support</h4>
                                <a href="https://wa.me/919130630632" target="_blank" rel="noopener noreferrer">
                                    +91 91306 30632 (Instant Chat)
                                </a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <RiMailFill />
                            </div>
                            <div className="info-content">
                                <h4>Email</h4>
                                <a href="mailto:suficonstructionpvtltd@gmail.com">
                                    suficonstructionpvtltd@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="info-divider" />

                        <div className="info-item">
                            <div className="info-icon">
                                <RiTimeFill />
                            </div>
                            <div className="info-content">
                                <h4>Working Hours</h4>
                                <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                                <p>Sunday: By Appointment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us / Map Section */}
            <section id="location" className="location-section">
                <h2>Visit Us</h2>
                <p className="location-intro">
                    Our office is conveniently located in Jalgaon. Feel free to stop by!
                </p>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6402.102914458713!2d75.55709603264332!3d21.013719919913473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90f8b370332bf%3A0x142a63191c819529!2sSufi%20Construction!5e1!3m2!1sen!2sin!4v1746283694723!5m2!1sen!2sin"
                        title="Sufi Construction Office Location Jalgaon"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen=""
                    />
                </div>
            </section>
        </div>
    );
};

export default Contact;
