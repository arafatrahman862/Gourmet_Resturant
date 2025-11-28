import React from "react";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyCart = () => {
    const [cart, refetch] = useCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This item will be removed from your cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://gourmet-resturant-server-side.vercel.app/carts/${item._id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Item removed from your cart.",
                                "success"
                            );
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full p-6">

            <Helmet>
                <title>GOURMET | My Cart</title>
            </Helmet>

            {/* TOP SUMMARY */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">

                <h3 className="text-3xl font-bold tracking-wide">
                    Cart Items: <span className="text-blue-400">{cart.length}</span>
                </h3>

                <h3 className="text-3xl font-bold">
                    Total: <span className="text-green-400">${total.toFixed(2)}</span>
                </h3>

                <Link to="/dashboard/payment">
                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl shadow-lg">
                        PROCEED TO PAY
                    </button>
                </Link>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                <table className="table table-zebra text-white">
                    <thead className="bg-white/20 text-lg">
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-white/20 transition-all text-lg"
                            >
                                <td>{index + 1}</td>

                                <td>
                                    <div className="avatar">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-white/30">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </td>

                                <td className="font-semibold">{item.name}</td>

                                <td className="text-green-300 font-bold">
                                    ${item.price}
                                </td>

                                <td className="text-center">
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-all"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyCart;
