import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import "./CheckoutForm.css";

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price }).then((res) => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Create payment method
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError("");
        }

        setProcessing(true);

        // Confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        setProcessing(false);

        if (confirmError) {
            console.log(confirmError);
            return;
        }

        // PAYMENT SUCCESSFUL
        if (paymentIntent?.status === "succeeded") {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map((i) => i._id),
                menuItems: cart.map((i) => i.menuItemId),
                itemNames: cart.map((i) => i.name),
                status: "service pending",
                name: user?.displayName,
            };

            axiosSecure.post("/payments", payment).then((res) => {
                console.log(res.data);
            });
        }
    };

    return (
        <div className="flex flex-col items-center w-full mt-10">

            {/* PAYMENT CARD CONTAINER */}
            <div className="w-full max-w-xl p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Complete Your Payment
                </h2>

                {/* PAYMENT FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Stripe Card Input */}
                    <div className="stripe-box">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "18px",
                                        color: "#ffffff",
                                        iconColor: "#ffffff",
                                        "::placeholder": {
                                            color: "#9CA3AF",
                                        },
                                    },
                                    invalid: {
                                        color: "#ff6b6b",
                                        iconColor: "#ff6b6b",
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Pay Button */}
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition-all shadow-lg 
                            ${processing
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1"
                            }`}
                    >
                        {processing ? "Processing..." : "Pay Now"}
                    </button>
                </form>

                {/* Error Message */}
                {cardError && (
                    <p className="mt-4 text-red-400 text-center font-medium">
                        {cardError}
                    </p>
                )}

                {/* Success Message */}
                {transactionId && (
                    <div className="mt-6 p-4 text-center text-green-300 font-semibold border border-green-500/30 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-all shadow-md">
                        Payment Successful!
                        <br />
                        <span className="text-green-400 text-sm">
                            Transaction ID: {transactionId}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
