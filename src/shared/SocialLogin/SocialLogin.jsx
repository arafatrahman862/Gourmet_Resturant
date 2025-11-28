import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect user back to previous page OR home
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {

        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log("Google User:", loggedInUser);

                Swal.fire({
                    title: "Login Successful!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

                const saveUser = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email
                };

                // 🚀 Redirect first (so UI is fast)
                navigate(from, { replace: true });

                // 🟢 Save user to database (non-blocking)
                fetch("https://gourmet-resturant-server-side.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("User saved to DB:", data);
                    })
                    .catch(err => console.log("DB save error:", err));
            })
            .catch(error => {
                console.log("Google Login Error:", error);
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-4">
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-circle btn-outline hover:bg-blue-600 hover:text-white transition-all"
                >
                    <FaGoogle size={20} />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
