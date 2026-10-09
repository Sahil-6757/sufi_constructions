import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper.css';

const Swiperslide = () => {
    return (
        <div className="swiper-container-wrapper">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="slide-content slide-1">
                        <div className="slide-overlay">
                            <h2>Building Dreams With Precision</h2>
                            <p>Premium construction & architectural engineering solutions.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-content slide-2">
                        <div className="slide-overlay">
                            <h2>Modern Architecture & Design</h2>
                            <p>Crafting sustainable and innovative residential & commercial spaces.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-content slide-3">
                        <div className="slide-overlay">
                            <h2>Quality & Trust In Every Brick</h2>
                            <p>Excellence in infrastructure, planning, and timely delivery.</p>
                            <button className="slide-btn">Contact Us</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Swiperslide;