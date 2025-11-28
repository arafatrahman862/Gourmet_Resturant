import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="w-full max-w-xl mx-auto text-center my-10 px-4">

            {/* Subheading */}
            <p className="text-red-500 text-sm md:text-base font-medium tracking-wide">
                --- {subHeading} ---
            </p>

            {/* Heading */}
            <h2 className="
                text-2xl 
                md:text-3xl 
                lg:text-4xl 
                font-extrabold 
                uppercase 
                mt-3 
                pb-3
                border-y-4 
                border-green-300
            ">
                {heading}
            </h2>

        </div>
    );
};

export default SectionTitle;
