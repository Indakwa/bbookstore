
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ onCancel, totalPrice }) => {
    const navigate = useNavigate();
    const handleClose = () => {
        // Call the passed-in onCancel function here
        onCancel();
    };

    const handlePaymentConfirmation = async () => {
        try {
            // Send request to confirm payment
            const token = localStorage.getItem('bb_tkn');
            await axios.post('http://localhost:3000/api/cart/payment-confirm', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Display success toast message if payment is confirmed
            toast.success('Success! Wait for your transaction to be confirmed by admin');
            navigate("/profile")
        } catch (error) {
            console.error('Error confirming payment:', error);
            // Handle error if payment confirmation fails
            toast.error('Error confirming payment. Please try again later.');
        }
    };
    

    return (
        <section className='checkout-overlay'>
            <div className="summary">
                <h5>Pay Using M-Pesa</h5>
                <div className="totals">
                    <p className="total-text">Number</p>
                    <p className="total-price">0796 161 1357</p>
                </div>

                <div className="totals">
                    <p className="total-text">Amount</p>
                    <p className="total-price"><span>KSh.</span>{totalPrice}</p>
                </div>

                <p className="instructions">
                    {`Send KSh.${totalPrice} to 0796 161 357 using M-Pesa and click the 'I have Paid' button`}
                </p>

                <button id='paid-btn' onClick={handlePaymentConfirmation}>I have Paid</button>
                <button id='cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
        </section>
    );
}

export default Checkout;
