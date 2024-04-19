import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Fetch the cart count when the component mounts
    fetchCartItemCount();
  }, []);

  
  const fetchCartItemCount = async () => {
    try {
      const response = await fetch('/api/cart/count', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      const data = await response.json();
      setCartItemCount(data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };


  return (
    <header>
        <div className="logo-div">
            <h2 id="logo">BBookstore</h2>
        </div>

        <menu>
            <Link to="/home" className="menu-link">Home</Link>
            <Link to="/books" className="menu-link">All Books</Link>
            <Link to="/how" className="menu-link">How it Works</Link>  
            <Link to="/cart" className="menu-link">
              <span id='cart-tag'>{cartItemCount}</span>
              <TiShoppingCart id='cartIcon'/>  
            </Link>
            <Link to="/profile" className="menu-link">
              <CgProfile id='profileIcon'/>
            </Link>
        </menu>
    </header>
  )
}

export default Header