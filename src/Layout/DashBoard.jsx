import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FaShoppingCart,
    FaWallet,
    FaCalendarAlt,
    FaHome,
    FaUtensils,
    FaBook,
    FaUsers
} from 'react-icons/fa';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827] text-white">

            <div className="drawer lg:drawer-open">

                {/* Drawer Toggle (Mobile Only) */}
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* MAIN CONTENT */}
                <div className="drawer-content flex flex-col p-4 sm:p-6 md:p-10">

                    {/* Render dynamic dashboard pages */}
                    <Outlet />

                    {/* Mobile open button */}
                    <label
                        htmlFor="my-drawer-2"
                        className="btn bg-blue-600 text-white shadow-md mt-5 lg:hidden fixed bottom-5 right-5 z-50"
                    >
                        Menu
                    </label>
                </div>

                {/* SIDEBAR */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul
                        className="
                            menu 
                            p-4 
                            w-64 
                            sm:w-72 
                            min-h-full 
                            bg-black/40 
                            backdrop-blur-xl 
                            border-r border-white/10 
                            shadow-xl 
                            space-y-2 
                            overflow-y-auto
                        "
                    >

                        {/* BRAND */}
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 text-blue-300">
                            GOURMET PANEL
                        </h1>

                        {/* ADMIN MENU */}
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/adminhome"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaHome /> Admin Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/additem"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaUtensils /> Add Item
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manageitems"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaWallet /> Manage Items
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20"
                                    >
                                        <FaBook /> Manage Bookings (N/A)
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/allusers"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaUsers /> All Users
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* USER MENU */}
                                <li>
                                    <NavLink
                                        to="/dashboard/userhome"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaHome /> User Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20"
                                    >
                                        <FaCalendarAlt /> Reservations
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/paymenthistory"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaWallet /> Payment History
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/mycart"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg relative
                                            ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                        }
                                    >
                                        <FaShoppingCart /> My Cart
                                        <span className="badge badge-secondary absolute right-4">
                                            +{cart?.length || 0}
                                        </span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <div className="divider opacity-30"></div>

                        {/* PUBLIC LINKS */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg
                                    ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                }
                            >
                                <FaHome /> Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/menu"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg
                                    ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                }
                            >
                                Our Menu
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/order/salad"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg
                                    ${isActive ? "bg-blue-600 text-white" : "hover:bg-white/20"}`
                                }
                            >
                                Order Food
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
