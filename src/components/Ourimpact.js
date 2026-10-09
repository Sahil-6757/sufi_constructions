import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../App.css';

const impactData = [
    {
        id: 1,
        title: 'Quality Materials',
        description: 'We use only the highest quality materials to ensure the durability and longevity of our projects.',
        icon: '💎',
        image: 'https://images.unsplash.com/photo-1581477131548-7e307dc62e1e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        title: 'Experienced Team',
        description: 'Our team of experienced professionals is dedicated to providing exceptional service and completing projects on time and within budget.',
        icon: '👨‍💼',
        image: 'https://images.unsplash.com/photo-1522202156221-b2a017e4650d?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        title: 'Eco-Friendly Practices',
        description: 'We are committed to sustainable construction practices that minimize environmental impact and promote responsible development.',
        icon: '🌍',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f55ecb31d?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 4,
        title: 'Client Satisfaction',
        description: 'Customer satisfaction is our top priority, and we strive to exceed expectations in every project we undertake.',
        icon: '🤝',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 5,
        title: 'Innovative Solutions',
        description: 'We provide innovative construction solutions that address the evolving needs of our clients and the industry.',
        icon: '💡',
        image: 'https://images.unsplash.com/photo-1506748786381-b731404c0a38?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 6,
        title: 'Timely Delivery',
        description: 'We are committed to delivering projects on time, adhering to strict timelines and project management standards.',
        icon: '⏰',
        image: 'https://images.unsplash.com/photo-1570971880810-72d549683a6e?auto=format&fit=crop&w=600&q=80',
    },
];

const Ourimpact = () => {
    return (
        <section className="impact-section py-5">
            <h2 className="text-center fw-bold">Our Impact</h2>
            <p className="text-center text-primary my-2 fw-100">
                We have made a significant impact on the construction industry through our innovative solutions and exceptional service.
            </p>

            <div className="impact-wrapper py-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="impact-swiper"
                >
                    {impactData.map((impact) => (
                        <SwiperSlide key={impact.id}>
                            <div className="impact-card card text-center">
                                <img
                                    src={impact.image}
                                    alt={impact.title}
                                    className="impact-card-img"
                                />
                                <div className="impact-card-body">
                                    <div className="impact-icon mb-2" style={{ fontSize: '1.5rem' }}>
                                        {impact.icon}
                                    </div>
                                    <h4 className="impact-card-title">{impact.title}</h4>
                                    <p className="impact-card-desc">{impact.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Ourimpact;