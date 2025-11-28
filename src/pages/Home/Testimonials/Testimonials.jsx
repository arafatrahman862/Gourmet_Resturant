import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { Autoplay, Pagination } from "swiper/modules";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <section className="my-20">
            <SectionTitle
                heading={"Testimonials"}
                subHeading={"What Our Clients Say"}
            ></SectionTitle>

            <div className="px-4 md:px-16">

                <Swiper
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2800,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center text-center px-6 md:px-24 py-14">

                                {/* CARD */}
                                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl 
                                    border border-white/20 shadow-2xl rounded-2xl p-10 
                                    hover:scale-[1.02] transition-all duration-300">

                                    {/* RATING */}
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                        className="mx-auto mb-6"
                                    />

                                    {/* QUOTE TEXT */}
                                    <p className="text-gray-200 text-lg md:text-xl italic leading-relaxed">
                                        "{review.details}"
                                    </p>

                                    {/* CLIENT NAME */}
                                    <h3 className="text-2xl mt-6 font-semibold text-orange-400">
                                        {review.name}
                                    </h3>

                                    {/* OPTIONAL AVATAR SUPPORT (if exists) */}
                                    {review.image && (
                                        <img
                                            src={review.image}
                                            alt="reviewer"
                                            className="w-20 h-20 object-cover rounded-full mx-auto mt-6 border-2 border-orange-400 shadow-lg"
                                        />
                                    )}
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
