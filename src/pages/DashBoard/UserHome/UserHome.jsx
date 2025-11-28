import React from "react";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className="w-full p-6 md:p-10">

            {/* TITLE */}
            <h2 className="text-4xl font-extrabold text-white tracking-wide mb-6">
                Welcome Back 👋
            </h2>

            {/* USER CARD */}
            <div className="max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 flex items-center gap-6">

                {/* USER AVATAR */}
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 shadow-lg">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt="User"
                        />
                    </div>
                </div>

                {/* USER INFO */}
                <div>
                    <h3 className="text-3xl font-bold text-white">
                        {user?.displayName || "User"}
                    </h3>

                    <p className="text-gray-300 text-lg mt-1">
                        {user?.email}
                    </p>

                    <p className="mt-3 text-blue-300 font-medium text-md tracking-wide">
                        We're glad to have you here!
                    </p>
                </div>
            </div>

            {/* OPTIONAL EXTRA SECTION */}
            <div className="mt-10">
                <p className="text-gray-300 text-lg">
                    Explore your dashboard to view orders, manage your account, check your cart, and more.
                </p>
            </div>
        </div>
    );
};

export default UserHome;
