import React from 'react';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';

const ManageItem = () => {
    const [menu, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Item removed successfully.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full px-4 md:px-10">

            {/* FIXED RESPONSIVE SECTION TITLE */}
            <SectionTitle
                heading="Manage All Items"
                subHeading="Hurry up"
            />

            {/* RESPONSIVE TABLE WRAPPER */}
            <div className="w-full overflow-x-auto rounded-xl shadow-lg bg-white/5 backdrop-blur-xl border border-white/10 py-4">

                <table className="table min-w-[650px] md:min-w-full table-zebra">

                    {/* HEAD */}
                    <thead className="bg-black/30 text-white text-sm md:text-base">
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className="text-center">Update</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {menu.map((item, index) => (
                            <tr key={item._id} className="hover:bg-white/10 transition">

                                {/* INDEX */}
                                <td className="font-semibold">{index + 1}</td>

                                {/* FIXED ITEM NAME + IMAGE COLUMN */}
                                <td className="max-w-[160px]">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar shrink-0">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="food" />
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm leading-tight break-words">
                                            {item.name}
                                        </p>
                                    </div>
                                </td>

                                {/* CATEGORY */}
                                <td className="capitalize">{item.category}</td>

                                {/* PRICE */}
                                <td>${item.price}</td>

                                {/* UPDATE BUTTON */}
                                <td className="text-center">
                                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                                        Update
                                    </button>
                                </td>

                                {/* DELETE BUTTON */}
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
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

export default ManageItem;
