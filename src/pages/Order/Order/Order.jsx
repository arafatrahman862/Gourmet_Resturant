import React, { useState } from 'react';
import orderCoverImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../../shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();

    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const desserts = menu.filter(item => item.category === 'dessert');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>

            <Helmet>
                <title>GOURMET | Order Food</title>
            </Helmet>

            {/* COVER SECTION */}
            <Cover img={orderCoverImg} title="Order Food" />

            {/* RESPONSIVE TABS */}
            <div className="px-4 md:px-10 my-10">

                <Tabs
                    defaultIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                    className="w-full"
                >
                    {/* TAB LIST */}
                    <TabList
                        className="
        flex 
        overflow-x-auto 
        whitespace-nowrap 
        scroll-smooth
        gap-3 
        p-2 
        mt-6 
        mb-8
        rounded-xl
    "
                        style={{ scrollbarWidth: "none" }}
                    >
                        <Tab className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 
        text-sm md:text-base text-white cursor-pointer 
        focus:outline-none 
        ui-selected:bg-red-500 ui-selected:text-white 
        hover:bg-red-400 transition">
                            Salad
                        </Tab>

                        <Tab className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 
        text-sm md:text-base text-white cursor-pointer 
        focus:outline-none 
        ui-selected:bg-red-500 ui-selected:text-white 
        hover:bg-red-400 transition">
                            Pizza
                        </Tab>

                        <Tab className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 
        text-sm md:text-base text-white cursor-pointer 
        focus:outline-none 
        ui-selected:bg-red-500 ui-selected:text-white 
        hover:bg-red-400 transition">
                            Soup
                        </Tab>

                        <Tab className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 
        text-sm md:text-base text-white cursor-pointer 
        focus:outline-none 
        ui-selected:bg-red-500 ui-selected:text-white 
        hover:bg-red-400 transition">
                            Dessert
                        </Tab>

                        <Tab className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 
        text-sm md:text-base text-white cursor-pointer 
        focus:outline-none 
        ui-selected:bg-red-500 ui-selected:text-white 
        hover:bg-red-400 transition">
                            Drinks
                        </Tab>
                    </TabList>


                    {/* TAB PANELS */}
                    <TabPanel>
                        <OrderTab items={salad} />
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={pizza} />
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={soup} />
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={desserts} />
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={drinks} />
                    </TabPanel>

                </Tabs>

            </div>

        </div>
    );
};

export default Order;
