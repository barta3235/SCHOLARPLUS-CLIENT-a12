import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe | !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const {error,paymentMethod}= await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            console.log('In CheckOut form ::payment error',error)
        }else{
            console.log('In CheckOut form ::payment error',paymentMethod);
        }

    }

    return (
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

            <button className="border px-3 font-medium tracking-wider rounded-md mb-[100px] bg-yellow-200 hover:bg-yellow-300" type="submit" disabled={!stripe}>
                Pay
            </button>

        </form>
    );
};

export default CheckoutForm;