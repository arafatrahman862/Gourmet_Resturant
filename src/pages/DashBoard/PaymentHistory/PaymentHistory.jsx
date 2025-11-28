import React from "react";
import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
    const [payment] = usePayment();

    return (
        <div className="w-full p-6 md:p-10">

            {/* TITLE */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide mb-6">
                Payment History
            </h2>

            {/* TABLE WRAPPER */}
            <div className="overflow-x-auto rounded-xl shadow-2xl bg-[#1f2937]/60 backdrop-blur-xl border border-white/10">

                <table className="table w-full text-white">
                    <thead className="bg-gray-800/80 text-gray-200 text-base">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payment.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-white/10 transition-all border-b border-white/5"
                            >
                                <td className="py-4 text-gray-300">{index + 1}</td>

                                <td className="uppercase font-semibold">{item.name}</td>

                                <td className="break-all text-gray-300">{item.email}</td>

                                <td className="font-bold text-blue-400">{item.quantity}</td>

                                <td className="font-bold text-green-400">${item.price}</td>

                                <td>
                                    <span
                                        className="px-3 py-1 rounded-full bg-yellow-500/90 text-black text-sm font-semibold whitespace-nowrap shadow-md"
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="break-all text-sm text-blue-300">
                                    {item.transactionId}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* MOBILE VIEW CARDS */}
            <div className="md:hidden mt-8 space-y-6">
                {payment.map((item, index) => (
                    <div
                        key={item._id}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-lg text-white"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-300">#{index + 1}</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold 
                                    ${item.status === "paid"
                                        ? "bg-green-600/80 text-white"
                                        : "bg-yellow-500/80 text-black"
                                    } `}
                            >
                                {item.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold uppercase">{item.name}</h3>
                        <p className="text-gray-300 text-sm break-all">{item.email}</p>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="bg-white/10 p-3 rounded-lg text-center">
                                <p className="text-xs text-gray-300">Quantity</p>
                                <p className="text-blue-300 font-bold">{item.quantity}</p>
                            </div>

                            <div className="bg-white/10 p-3 rounded-lg text-center">
                                <p className="text-xs text-gray-300">Price</p>
                                <p className="text-green-300 font-bold">${item.price}</p>
                            </div>
                        </div>

                        <p className="text-xs text-blue-300 mt-3 break-all">
                            Transaction ID: {item.transactionId}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistory;
