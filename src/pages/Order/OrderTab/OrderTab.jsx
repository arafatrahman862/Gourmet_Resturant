import React from 'react';
import FoodCart from '../../../components/FoodCart/FoodCart';

const OrderTab = ({ items }) => {
    return (
        <div className="px-4 md:px-0 my-6">

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-6
                    md:gap-10
                "
            >
                {items.map(item => (
                    <FoodCart
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>

        </div>
    );
};

export default OrderTab;
