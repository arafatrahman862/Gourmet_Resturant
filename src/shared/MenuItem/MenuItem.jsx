import React from 'react';

const MenuItem = ({ item }) => {
    const { image, price, name, recipe } = item;

    return (
        <div
            className="
                flex 
                flex-col 
                sm:flex-row 
                items-start 
                sm:items-center 
                gap-4 
                p-3 
                rounded-xl 
                bg-white/5 
                backdrop-blur 
                hover:scale-[1.02]
                transition-all 
                duration-300
                shadow-sm
                
            "
        >
            {/* IMAGE */}
            <img
                src={image}
                alt={name}
                className="
                    w-28 
                    h-28
                    object-cover 
                    rounded-br-[150px] 
                    rounded-tl-[150px]
                    rounded-tr-[150px]
                    shadow-md
                "
            />

            {/* TEXT CONTENT */}
            <div className="flex-1">
                <h3 className="uppercase font-semibold text-lg text-white">
                    {name}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                    {recipe}
                </p>
            </div>

            {/* PRICE */}
            <p className="text-yellow-400 text-lg font-bold sm:text-right">
                ${price}
            </p>
        </div>
    );
};

export default MenuItem;
