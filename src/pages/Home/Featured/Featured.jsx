import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item text-white pt-8 my-20'>
            <SectionTitle
                heading={"Featured Item"}
                subHeading={"check it out"}
            ></SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro culpa, ad consequuntur similique eius blanditiis ipsum deleniti dignissimos pariatur perferendis fugit minus excepturi eos sunt omnis itaque! Fuga architecto illo praesentium quos culpa dignissimos pariatur quo amet, numquam, autem quidem iusto doloremque! Consequuntur, voluptatibus fugit esse perspiciatis aliquid veritatis libero.</p>
                    <button className='btn btn-outline transition-all duration-300 border-0 border-b-4 mt-4'>Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;