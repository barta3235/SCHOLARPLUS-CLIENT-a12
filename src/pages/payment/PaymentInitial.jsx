import { useParams } from 'react-router-dom';
import HeadSubHead from '../../components/HeadSubHead'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const PaymentInitial = () => {
    const id = useParams();
    console.log(id);

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    console.log(stripePromise);

    return (
        <div>
            <div>
                <HeadSubHead heading1="Payment" heading2="Portal" subHeading="Proceed your payment"></HeadSubHead>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                     <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentInitial;