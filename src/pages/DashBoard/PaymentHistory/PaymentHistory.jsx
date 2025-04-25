import React from 'react';
import usePayment from '../../../hooks/usePayment';

const PaymentHistory = () => {
    const [payment] = usePayment();
    console.log(payment)
    return (
        <div className='w-full px-10'>
            <div className="overflow-x-auto w-full ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((item, index) => (
                                <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td className='uppercase'>{item.name}</td>
                                <td>{item.email}</td>
                                <th>{item.quantity}</th>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>{item.transactionId}</td>
                            </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;