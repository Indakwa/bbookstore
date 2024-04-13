import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoIosClose } from "react-icons/io";
import { useState } from 'react';
import Checkout from './Checkout';

const Cart = () => {
    const [showCheckout, setShowCheckout] = useState(false)

    const handleCheckout = () => {
        setShowCheckout(!showCheckout); 
    };

  return (
    <>
        { showCheckout && <Checkout onCancel={handleCheckout}/> }
        <Header />
        <section className='cart'>
            <h5>Books In Your Cart</h5>
            <div className="cart-container">
                <div className="cart-items">
                    <div className="cart-item">
                        <div className="imageDiv">
                            <img src="" alt="" />
                        </div>
                        <div className="text">
                            <p className="title">Adventures Of Bobo The Magician.</p>
                            <p className="author">Ivy Kay</p>
                        </div>

                        <p className="price"><span>KSh.</span>30.00</p>

                        <IoIosClose className='closeIcon'/>
                    </div>
                    <div className="cart-item">
                        <div className="imageDiv">
                            <img src="" alt="" />
                        </div>
                        <div className="text">
                            <p className="title">Adventures Of Bobo The Magician.</p>
                            <p className="author">Ivy Kay</p>
                        </div>

                        <p className="price"><span>KSh.</span>30.00</p>

                        <IoIosClose className='closeIcon'/>
                    </div>
                    <div className="cart-item">
                        <div className="imageDiv">
                            <img src="" alt="" />
                        </div>
                        <div className="text">
                            <p className="title">Adventures Of Bobo The Magician.</p>
                            <p className="author">Ivy Kay</p>
                        </div>

                        <p className="price"><span>KSh.</span>30.00</p>

                        <IoIosClose className='closeIcon'/>
                    </div>
                </div>

                <div className="summary">
                    <h5>Your Order Summary</h5>
                    <div className="totals">
                        <p className="total-text">Total</p>
                        <p className="total-price"><span>KSh.</span>30.00</p>
                    </div>
                    <button id='checkout' onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Cart