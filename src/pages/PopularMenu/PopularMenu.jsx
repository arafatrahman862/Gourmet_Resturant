import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
 
    return (
        <section className='mb-12'>
            <SectionTitle
            heading={"From Our Menu"}
            subHeading={"Popular Items"}
            ></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item =><MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
          <div className=''>
          <button className='btn btn-outline transition-all duration-300 border-0 block mx-auto  border-b-4 mt-6  text-center'>View Full Menu</button>
          </div>
        </section>
    );
};

export default PopularMenu;