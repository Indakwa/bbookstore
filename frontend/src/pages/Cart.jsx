import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import Checkout from './Checkout';
import axios from 'axios';
import { toast } from 'react-toastify';


const Cart = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checkoutDetails, setCheckoutDetails] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('bb_tkn'); // Assuming the token is stored in localStorage
                const response = await axios.get('http://localhost:3000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Function to calculate the total price of items in the cart
    const calculateTotalPrice = () => { // Added function to calculate total price
        return cartItems.reduce((total, item) => total + parseFloat(item.book.Price), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        if(cartItems.length > 0){
            try {
                const token = localStorage.getItem('bb_tkn');
                const response = await axios.post('http://localhost:3000/api/cart/checkout', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCheckoutDetails(response.data);
                setShowCheckout(true);
            } catch (error) {
                console.error('Error during checkout:', error);
                toast("Error during checkout. Try again later.")
            }
        }else{
            toast("Your Cart is Empty")
        }
    };

    const handleCloseCheckout = () => {
        setShowCheckout(false);
    }

    const removeFromCart = async (userId, bookId) => {
        try {
            const token = localStorage.getItem('bb_tkn'); // Assuming the token is stored in localStorage
            await axios.delete('http://localhost:3000/api/cart/remove', {
                headers: { Authorization: `Bearer ${token}` },
                data: { userId, bookId }
            });
            // Remove the item from the cartItems state
            setCartItems(prevCartItems => prevCartItems.filter(item => item.BookID !== bookId));
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast("Error removing from cart. Try Again Later.")
        }
    };

    return (
        <>
            <Header />
            <section className='cart'>
                <h5>Books In Your Cart</h5>
                <div className="cart-container">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : cartItems.length === 0 ? (
                        <p className='empty'>Cart is empty</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.CartID}>
                                    <div className="imageDiv">
                                        <img src={item.book.CoverImageURL} alt="" />
                                    </div>
                                    <div className="text">
                                        <p className="title">{item.book.Title}</p>
                                        <p className="author">{item.book.Author}</p>
                                    </div>
                                    <p className="price"><span>KSh.</span>{item.book.Price}</p>
                                    <IoIosClose className='closeIcon' onClick={() => removeFromCart(item.UserID, item.BookID)} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="summary">
                        <h5>Your Order Summary</h5>
                        <div className="totals">
                            <p className="total-text">Total</p>
                            <p className="total-price">
                                <span>KSh.</span>
                                {calculateTotalPrice()}
                            </p>
                        </div>
                        <button id='checkout' onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </section>
            {showCheckout && checkoutDetails && (
                <Checkout
                    onCancel={handleCloseCheckout}
                    totalPrice={checkoutDetails.totalPrice}
                />
            )}
            <Footer />
        </>
    );
}

export default Cart;
