import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentInitial = () => {
    const [scholarship, setScholarship] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    console.log('in payment initial', id);

    useEffect(() => {
        const fetchScholarship = async () => {
            const res = await axiosSecure.get(`/scholarship/payment/${id}`)
            setScholarship(res.data);
        }

        fetchScholarship();
    }, [axiosSecure, id])

    console.log('cart', scholarship);


    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    console.log(stripePromise);

    return (
        <div>
            {
                scholarship ?
                    <div>
                        <div>
                            <div className="mx-[5px] md:mx-[50px] mt-[20px] mb-[60px]">
                                <h1 className="text-3xl md:text-[43px] mb-[17px] font-medium tracking-wider">Payment <span className="border-b-[3px] border-yellow-300">portal</span></h1>
                                <h1 className="text-[22px] tracking-wider">Proceed your payment</h1>
                            </div>
                        </div>
                        <div className='mx-[5px] md:mx-[50px]'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm scholarshipData={scholarship}></CheckoutForm>
                            </Elements>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
            }
        </div>
    );
};

export default PaymentInitial;