import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCart = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (item) => {
        if (user && user.email) {
            const cartItem = {
                menuItemId: _id,
                name,
                image,
                price,
                email: user.email,
            };

            fetch("https://gourmet-resturant-server-side.vercel.app/carts", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(cartItem),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Food added to your cart!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        } else {
            Swal.fire({
                title: "Please login to order food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div
            className="
                bg-white/10 
                backdrop-blur-xl 
                border border-white/20 
                rounded-xl 
                shadow-xl 
                p-4 
                flex 
                flex-col 
                justify-between
                transition-all
                hover:scale-[1.02]
            "
        >
            {/* IMAGE */}
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="
                        w-full 
                        h-48 
                        object-cover 
                        rounded-lg 
                        shadow-md
                        mb-4
                    "
                />

                {/* PRICE BADGE */}
                <p
                    className="
                        absolute 
                        top-3 
                        right-3 
                        bg-red-500 
                        text-white 
                        py-1 
                        px-3 
                        rounded-full 
                        text-sm 
                        shadow-lg
                    "
                >
                    ${price}
                </p>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center text-center px-2">
                <h3 className="text-lg font-semibold text-white">{name}</h3>

                <p className="text-gray-300 text-sm mt-2 mb-4">
                    {recipe}
                </p>

                {/* ADD TO CART BUTTON */}
                <button
                    onClick={() => handleAddToCart(item)}
                    className="
                        w-full
                        py-2 
                        bg-orange-500 
                        text-white 
                        rounded-lg 
                        font-semibold 
                        hover:bg-orange-600 
                        hover:-translate-y-1
                        transition-all
                    "
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default FoodCart;
