import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        fetch(`https://gourmet-resturant-server-side.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You can't revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://gourmet-resturant-server-side.vercel.app/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'User has been removed.', 'success');
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full px-4 md:px-10">

            <Helmet>
                <title>GOURMET | All Users</title>
            </Helmet>

            <h3 className="text-2xl md:text-3xl font-semibold text-center my-6">
                Total Users: {users.length}
            </h3>


            {/* FIXED RESPONSIVE TABLE */}
            <div className="w-full overflow-x-auto rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">

                <table className="min-w-[800px] table-auto text-sm md:text-base text-white">

                    <thead className="bg-black/40">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-center">Role</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="border-b border-white/10 hover:bg-white/10 transition"
                            >
                                <td className="py-3 px-4">{index + 1}</td>

                                <td className="py-3 px-4 break-words max-w-[150px]">
                                    {user.name}
                                </td>

                                <td className="py-3 px-4 break-words max-w-[200px]">
                                    {user.email}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    {user.role === "admin" ? (
                                        <span className="text-green-400 font-bold">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-xs md:btn-sm bg-orange-600 hover:bg-orange-700 text-white"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-xs md:btn-sm bg-red-600 hover:bg-red-700 text-white"
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

export default AllUsers;
