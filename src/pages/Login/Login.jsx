import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import Lottie from 'lottie-react';
import login from '../../../public/login.json';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(from, { replace: true });
            });
    };

    const handleValidateCaptcha = e => {
        const value = e.target.value;
        setDisabled(!validateCaptcha(value));
    };

    return (
        <>
            <Helmet>
                <title>GOURMET | Login</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1c23] via-[#2c2f36] to-[#1a1c23] px-4 py-10">

                {/* MAIN CONTAINER */}
                <div className="flex flex-col lg:flex-row max-w-5xl w-full items-center gap-10">

                    {/* LEFT SIDE */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                            Welcome Back 👋
                        </h1>
                        <p className="text-gray-300 text-lg mb-4">
                            Log in to continue your culinary adventure with <span className="font-bold text-blue-400">Gourmet</span>.
                        </p>

                        <div className="w-full max-w-md mx-auto">
                            <Lottie animationData={login} loop={true} />
                        </div>
                    </div>

                    {/* RIGHT SIDE - LOGIN CARD */}
                    <div className="lg:w-1/2 w-[90%] max-w-md">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">

                            <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                            <form onSubmit={handleLogin}>

                                {/* Email */}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="text-white font-medium">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered bg-white/20 text-white border-white/30 placeholder-gray-300"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="text-white font-medium">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered bg-white/20 text-white border-white/30 placeholder-gray-300"
                                        required
                                    />
                                </div>

                                {/* Captcha */}
                                <div className="form-control mb-4">
                                    <label className="label text-white">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Type the captcha above"
                                        onBlur={handleValidateCaptcha}
                                        className="input input-bordered bg-white/20 text-white border-white/30 placeholder-gray-300"
                                        required
                                    />
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={disabled}
                                    className={`btn w-full text-white font-semibold mt-4 transition-all duration-200 ${disabled
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Login
                                </button>
                            </form>

                            <p className="mt-4 text-center text-gray-300">
                                New here?{" "}
                                <Link to="/signup" className="text-blue-400 hover:underline">
                                    Create an account
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

export default Login;
