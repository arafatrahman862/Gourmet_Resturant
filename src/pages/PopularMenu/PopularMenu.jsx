import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12 px-4 md:px-8">

            {/* Responsive Section Title */}
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            />

            {/* Responsive Grid */}
            <div
                className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    gap-6 
                    md:gap-10
                "
            >
                {popular.map(item => (
                    <MenuItem
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>

            {/* View Menu Button */}
            <div className="flex justify-center mt-8">
                <button
                    className="
                        btn 
                        btn-outline 
                        border-0 
                        border-b-4 
                        hover:border-orange-400 
                        transition 
                        text-sm md:text-base
                    "
                >
                    View Full Menu
                </button>
            </div>

        </section>
    );
};

export default PopularMenu;
