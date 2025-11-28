import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-20">

            {/* TOP SECTION */}
            <div className="w-full bg-gradient-to-br from-[#1f1f1f] via-[#2b2b2b] to-[#1a1a1a] text-gray-300 px-6 md:px-20 py-14">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">

                    {/* LOGO & DESCRIPTION */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://templates.framework-y.com/gourmet/images/logo.png"
                                alt="logo"
                                className="h-12"
                            />
                           
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Bringing authentic flavors and delicious meals right to your table.
                            Your satisfaction is our top priority.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-4 mt-6 text-xl">
                            <a className="hover:text-blue-500 transition">
                                <FaFacebookF />
                            </a>
                            <a className="hover:text-pink-500 transition">
                                <FaInstagram />
                            </a>
                            <a className="hover:text-red-500 transition">
                                <FaYoutube />
                            </a>
                            <a className="hover:text-blue-400 transition">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white cursor-pointer">Food Delivery</li>
                            <li className="hover:text-white cursor-pointer">Menu Design</li>
                            <li className="hover:text-white cursor-pointer">Catering</li>
                            <li className="hover:text-white cursor-pointer">Reservations</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white cursor-pointer">About Us</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Press</li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe for delicious updates & offers.
                        </p>

                        <div className="flex items-center bg-white rounded-md overflow-hidden">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-black outline-none"
                            />
                            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-semibold">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="w-full bg-black py-4">
                <p className="text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} GOURMET — All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
