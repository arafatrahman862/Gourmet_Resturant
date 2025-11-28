import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Logged Out!",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
        });
    };

    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/menu">Our Menu</NavLink></li>
            <li><NavLink to="/order/salad">Order Food</NavLink></li>
            <li>
                <NavLink to={isAdmin ? "/dashboard/adminhome" : "/dashboard/userhome"}>
                    Dashboard
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 shadow-lg">
            <div className="navbar max-w-screen-xl mx-auto text-white">

                {/* LEFT + MOBILE MENU */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        {/* MOBILE MENU */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-white text-black rounded-xl w-56"
                        >
                            {navItems}
                        </ul>
                    </div>

                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://templates.framework-y.com/gourmet/images/logo.png"
                            className="h-10"
                            alt="Logo"
                        />
                    </div>
                </div>

                {/* CENTER (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg gap-4">
                        {navItems}
                    </ul>
                </div>

                {/* RIGHT (Cart + User Profile) */}
                <div className="navbar-end gap-6">

                    {/* Cart Button */}
                    <Link to="/dashboard/mycart" className="hidden sm:block">
                        <button className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                            <FaShoppingCart className="text-lg" />
                            <span>+{cart?.length || 0}</span>
                        </button>
                    </Link>

                    {/* USER LOGGED IN */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-105 transition">
                                    <img
                                        src={
                                            user?.photoURL ||
                                            "https://i.ibb.co/4pDNDk1/avatar.png"
                                        }
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </label>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[10] p-4 shadow-xl bg-white rounded-xl w-64 text-black right-0"
                            >
                                {/* NAME */}
                                <li className="text-center font-semibold text-lg capitalize">
                                    {user?.displayName}
                                </li>

                                {/* EMAIL */}
                                <li className="text-center text-sm text-gray-600 mb-2">
                                    {user?.email}
                                </li>

                                <div className="divider my-1"></div>

                                {/* DASHBOARD */}
                                <li>
                                    <NavLink
                                        to={isAdmin ? "/dashboard/adminhome" : "/dashboard/userhome"}
                                        className="hover:bg-gray-100 rounded-md"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>

                                {/* LOGOUT */}
                                <li className="pt-2">
                                    <button
                                        onClick={handleLogOut}
                                        className="btn bg-red-500 text-white hover:bg-red-600 w-full"
                                    >
                                        LOGOUT
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn bg-blue-500 border-none text-white rounded-lg px-5 hover:bg-blue-600"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
