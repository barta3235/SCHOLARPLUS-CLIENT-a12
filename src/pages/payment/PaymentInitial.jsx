import { useParams } from 'react-router-dom';

const PaymentInitial = () => {
    const id= useParams();
    console.log(id);

    return (
        <div>
            <h1>Payment Portal</h1>
        </div>
    );
};

export default PaymentInitial;