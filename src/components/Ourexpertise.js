import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../App.css';

const expertiseData = [
    {
        id: 1,
        title: 'Residential Construction',
        description: 'Building high-quality homes with modern amenities and thoughtful designs for comfortable living.',
        icon: '🏠',
        image: 'https://images.unsplash.com/photo-1563166423-482a8c14b2d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbW1lcmNpYWwlMjBwcm9wZXJ0aWVzJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww',
    },
    {
        id: 2,
        title: 'Commercial Properties',
        description: 'Developing premium commercial spaces including offices, retail outlets, and mixed-use complexes.',
        icon: '🏢',
        image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbWVyY2lhbCUyMHByb3BlcnRpZXMlMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8fDA%3D',
    },
    {
        id: 3,
        title: 'Industrial Construction',
        description: 'Engineering durable and functional industrial facilities such as warehouses, factories, and workshops.',
        icon: '🏭',
        image: 'https://images.unsplash.com/photo-1527335988388-b40ee248d80c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW1lcmNpYWwlMjBwcm9wZXJ0aWVzJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww',
    },
    {
        id: 4,
        title: 'Infrastructure Projects',
        description: 'Contributing to community development through construction of roads, bridges, and public utilities.',
        icon: '🏗️',
        image: 'https://images.unsplash.com/photo-1576577610667-c9ea0ac983fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbW1lcmNpYWwlMjBwcm9wZXJ0aWVzJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww',
    },
    {
        id: 5,
        title: 'Interior Design & Remodeling',
        description: 'Transforming spaces with creative interior designs, renovations, and modern fit-outs.',
        icon: '🎨',
        image: 'https://images.unsplash.com/photo-1610459716431-e07abcf74230?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbW1lcmNpYWwlMjBwcm9wZXJ0aWVzJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww',
    },
    {
        id: 6,
        title: 'Architectural Planning',
        description: 'Comprehensive architectural design services from conceptualization to final blueprints and approvals.',
        icon: '📐',
        image: 'https://media.istockphoto.com/id/2185596937/photo/new-house-construction-concrete-frame.webp?a=1&b=1&s=612x612&w=0&k=20&c=MzZ36XLC62S9_XjG29J_RJw8crAhlpvk7sisVmpdugA=',
    },
];

const Ourexpertise = () => {
    return (
        <section className="expertise-section py-5">
            <h2 className="text-center fw-bold">Our Areas of Expertise</h2>
            <p className="text-center text-primary my-2 fw-100">
                We specialize in a diverse range of construction services tailored to meet the evolving needs of our clients.
            </p>

            <div className="expertise-wrapper py-4">
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
                    className="expertise-swiper"
                >
                    {expertiseData.map((expertise) => (
                        <SwiperSlide key={expertise.id}>
                            <div className="expertise-card card text-center">
                                <img
                                    src={expertise.image}
                                    alt={expertise.title}
                                    className="expertise-card-img"
                                />
                                <div className="expertise-card-body">
                                    <h4 className="expertise-card-title">{expertise.title}</h4>
                                    <p className="expertise-card-desc">{expertise.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Ourexpertise;