import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import PostPaymentForm from "./PostPaymentForm";
const CheckoutForm = ({ scholarshipData }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const [transactionId, setTransactionId] = useState('');
    const [payingAmount, setPayingAmount] = useState('');
    const [loading, setLoading] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const { _id, applicationfee } = scholarshipData;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: applicationfee })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, applicationfee])


    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        if (!stripe | !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('In CheckOut form ::payment error', error)
            setError(error.message);
        } else {
            console.log('In CheckOut form ::payment error', paymentMethod);
            setError('');
        }


        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (confirmError) {
            console.log(confirmError)
            setError(confirmError.message)
            setTransactionId('');
            setPayingAmount('')
        } else {
            setError('');
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id: ', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                setPayingAmount(paymentIntent.amount)
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Payment is Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }



    }



    return (
        <div className="mb-[100px]">

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="border py-3 shadow-sm shadow-yellow-200 rounded-md mb-3 px-1"
                >
                </CardElement>

                <button className="border px-4 py-1 text-[18px] mb-2 font-medium tracking-wider rounded-md border-b-yellow-300 border-b-4 cursor-pointer" type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="tracking-wider text-red-700 font-medium">{error}</p>
                {
                    transactionId && <p className="tracking-wider text-green-800 font-normal mt-2 pl-1 mb-[50px]"><span className="font-bold">Transaction Id:</span> {transactionId}</p>
                }
            </form>

            {
                loading
                    ?
                    <span className="loading loading-spinner loading-md text-yellow-300"></span>
                    :
                    <div>
                        {
                            transactionId
                                ?
                                <PostPaymentForm scholarshipData={scholarshipData} transId={transactionId} payingAmount={payingAmount}></PostPaymentForm>
                                :
                                ''
                        }
                    </div>

            }
        </div>
    );
};

export default CheckoutForm;