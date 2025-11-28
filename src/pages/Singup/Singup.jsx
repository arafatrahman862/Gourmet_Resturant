import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import Lottie from "lottie-react";
import singup from "../../../public/singup.json";

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email };

                        fetch("https://gourmet-resturant-server-side.vercel.app/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Signup Successful!",
                                    timer: 1500,
                                    showConfirmButton: false,
                                });
                                navigate("/");
                            });
                    });
            })
            .catch(error => {
                console.error("Signup Error:", error);

                if (error.code === "auth/email-already-in-use") {
                    Swal.fire({
                        icon: "error",
                        title: "Email Already Registered",
                        text: "Please login instead or use another email.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Signup Failed",
                        text: error.message,
                    });
                }
            });
    };


    return (
        <>
            <Helmet>
                <title>GOURMET | Sign Up</title>
            </Helmet>

            {/* MAIN BACKGROUND */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1c23] via-[#252932] to-[#1a1c23] px-4 py-14">

                {/* MAIN CONTAINER */}
                <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full">

                    {/* LEFT SIDE */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
                            Create Account ✨
                        </h1>
                        <p className="text-gray-300 text-lg mb-4">
                            Join <span className="font-bold text-blue-400">Gourmet</span> and explore exclusive culinary experiences.
                        </p>

                        <div className="max-w-md mx-auto">
                            <Lottie animationData={singup} loop={true} />
                        </div>
                    </div>

                    {/* SIGNUP CARD */}
                    <div className="lg:w-1/2 w-full max-w-md">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">

                            <h2 className="text-3xl font-bold text-center text-white mb-6">
                                Sign Up
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="text-white font-medium">Name</label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        placeholder="Your Name"
                                        className="input input-bordered w-full bg-white/20 text-white border-white/30 placeholder-gray-300"
                                    />
                                    {errors.name && <p className="text-red-400 mt-1">Name is required</p>}
                                </div>

                                {/* Photo URL */}
                                <div className="mb-4">
                                    <label className="text-white font-medium">Photo URL</label>
                                    <input
                                        type="text"
                                        {...register("photoURL", { required: true })}
                                        placeholder="Enter Photo URL"
                                        className="input input-bordered w-full bg-white/20 text-white border-white/30 placeholder-gray-300"
                                    />
                                    {errors.photoURL && <p className="text-red-400 mt-1">Photo URL is required</p>}
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="text-white font-medium">Email</label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        placeholder="Email"
                                        className="input input-bordered w-full bg-white/20 text-white border-white/30 placeholder-gray-300"
                                    />
                                    {errors.email && <p className="text-red-400 mt-1">Email is required</p>}
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label className="text-white font-medium">Password</label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        })}
                                        placeholder="Password"
                                        className="input input-bordered w-full bg-white/20 text-white border-white/30 placeholder-gray-300"
                                    />

                                    {/* Validation Messages */}
                                    {errors.password?.type === "required" && (
                                        <p className="text-red-400 mt-1">Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className="text-red-400 mt-1">Password must be at least 6 characters</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <p className="text-red-400 mt-1">Password cannot exceed 20 characters</p>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <p className="text-red-400 mt-1">
                                            Password must include uppercase, lowercase, number, and special character.
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 transition-all"
                                >
                                    Sign Up
                                </button>
                            </form>

                            {/* Already have account? */}
                            <p className="text-center text-gray-300 mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-400 hover:underline">
                                    Login
                                </Link>
                            </p>

                            <div className="mt-6">
                                <SocialLogin />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Signup;
