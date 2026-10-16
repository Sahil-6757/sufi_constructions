import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './testimonials.css';

const testimonialsData = [
    {
        id: 1,
        name: 'Ahmed Al-Mansoor',
        role: 'Villa Owner, Green Valley',
        project: 'Luxury 5BHK Villa',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'Sufi Construction turned our dream villa into a masterpiece. From the seismic structural foundation to premium interior finishes, their craftsmanship and weekly transparent updates exceeded all our expectations.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        role: 'Managing Director, Apex Ventures',
        project: 'Commercial Business Hub',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        text: 'They delivered our 6-story commercial complex two weeks ahead of schedule. Their cost-conscious approach, professional project management, and structural precision saved us significant time and budget.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Rajesh Patel',
        role: 'Real Estate Developer',
        project: 'Modern Duplex Enclave',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        text: 'We have partnered on three multi-unit residential developments with Sufi Construction. Their engineering excellence, high-grade materials, and on-time project handover make them our most trusted builder.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Elena Rostova',
        role: 'Architect & Interior Designer',
        project: 'Urban Residence Renovation',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        text: 'As an architect, I hold contractors to high standards. Sufi Construction’s site engineers and craftsmen executed our intricate architectural designs with pinpoint accuracy and exceptional care.',
        rating: 5,
    },
    {
        id: 5,
        name: 'David Miller',
        role: 'Operations Head, LogiCorp',
        project: 'Industrial Logistics Facility',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        text: 'Outstanding infrastructure execution on our 45,000 sq.ft industrial warehouse. Strict safety protocol compliance, robust heavy engineering, and complete transparency from plan approval to final handover.',
        rating: 3,
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-badge">Client Reviews</span>
                    <h2 className="testimonials-title">What Our Clients Say</h2>
                    <p className="testimonials-subtitle">
                        Hear firsthand from homeowners, developers, and architects who trusted Sufi Construction to bring their vision to life.
                    </p>
                </div>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="testimonials-swiper"
                >
                    {testimonialsData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="testimonial-card">
                                <div className="testimonial-quote-icon">“</div>
                                <div className="testimonial-stars">
                                    {'★'.repeat(item.rating)}
                                </div>
                                <p className="testimonial-text">"{item.text}"</p>
                                <div className="testimonial-user">
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-user-info">
                                        <h4 className="testimonial-name">{item.name}</h4>
                                        <span className="testimonial-role">{item.role}</span>
                                        <span className="testimonial-project">{item.project}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;