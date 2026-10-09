import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../App.css';

const projects = [
    {
        id: 1,
        title: 'Luxury Residential Villa',
        description: 'Modern architectural design with eco-friendly materials, custom interiors, and smart home automation.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: 'Commercial Business Hub',
        description: 'Multi-story premium commercial complex built with advanced structural engineering and modern glass facade.',
        image: 'https://plus.unsplash.com/premium_photo-1684769161409-f6de69d3f274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1c2luZXNzJTIwaHVifGVufDB8fDB8fHww',
    },
    {
        id: 3,
        title: 'Urban Skyline Apartments',
        description: 'Contemporary high-rise apartments with earthquake-resistant foundations and panoramic city views.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        title: 'Industrial Logistics Center',
        description: 'High-capacity warehouse and logistics center designed for maximum durability and operational efficiency.',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    },
];

const Featureproject = () => {
    return (
        <section className="featured-section">
            <h2 className="text-center fw-bold">Our Featured Projects</h2>
            <p className="text-center text-primary my-2 fw-100">
                Explore our latest residential and commercial projects that showcase our commitment to quality and excellence.
            </p>
            <div className="projects-wrapper">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="projects-swiper"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <section className="card">
                                <img src={project.image} className="card-img-top" alt={project.title} />
                                <div className="card-body">
                                    <h4 className="card-title">{project.title}</h4>
                                    <p className="card-text">{project.description}</p>
                                    <a href="#contact" className="btn-solid theme-primary">
                                        View Details
                                    </a>
                                </div>
                            </section>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Featureproject;