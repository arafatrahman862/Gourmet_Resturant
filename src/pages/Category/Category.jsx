import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className="px-4 md:px-8">
            <SectionTitle
                heading="Order Online"
                subHeading="From 11.00am to 10.00pm"
            />

            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                centeredSlides={false}

                /* ⭐ RESPONSIVE BREAKPOINTS ⭐ */
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 15,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}

                modules={[Autoplay, Pagination]}
                className="mySwiper mb-16"
            >
                {[
                    { img: slide1, label: "Salads" },
                    { img: slide2, label: "Pizzas" },
                    { img: slide3, label: "Soups" },
                    { img: slide4, label: "Salads" },
                    { img: slide5, label: "Desserts" },
                ].map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full">
                            <img
                                src={item.img}
                                alt={item.label}
                                className="rounded-xl w-full h-48 md:h-60 object-cover shadow-lg"
                            />
                            <h3 className="
                                text-xl md:text-3xl 
                                uppercase 
                                text-center 
                                mt-3 
                                text-white 
                                font-semibold
                            ">
                                {item.label}
                            </h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Category;
