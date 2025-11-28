import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20">

            {/* Responsive Section Title */}
            <SectionTitle
                heading="Featured Item"
                subHeading="check it out"
            />

            {/* Main Layout */}
            <div
                className="
                    bg-slate-500 bg-opacity-40 
                    backdrop-blur-md 
                    py-10 
                    px-4 
                    md:px-10 
                    lg:px-20 
                    flex 
                    flex-col 
                    md:flex-row 
                    justify-center 
                    items-center 
                    gap-8 
                    rounded-xl
                "
            >
                {/* Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={featuredImg}
                        alt="Featured Item"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                    <p className="text-sm opacity-80">Aug 20, 2023</p>

                    <p className="uppercase text-xl font-semibold">
                        Where can I get some?
                    </p>

                    <p className="text-gray-200 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro culpa, ad consequuntur similique eius blanditiis ipsum
                        deleniti dignissimos pariatur perferendis fugit minus excepturi
                        eos sunt omnis itaque!
                    </p>

                    <button
                        className="
                            btn 
                            btn-outline 
                            border-0 
                            border-b-4 
                            mt-4 
                            hover:border-orange-400 
                            transition
                        "
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
