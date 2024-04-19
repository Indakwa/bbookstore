import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom'; 
import { toast } from 'react-toastify'
import axios from 'axios';
import Footer from '../components/Footer';

const Details = () => {
    const { bookId } = useParams(); 
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState(null);


    useEffect(() => {
      const fetchBookDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
          setBook(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };
  
      fetchBookDetails();
    }, [bookId]);

    const handleWishlist = () => {
        setAddedToWishlist(!addedToWishlist); // Toggle using logical NOT operator
    };

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/books');
            setBooks(response.data);
          } catch (error) {
            console.error('Error fetching books:', error);
          }
        };
    
        fetchBooks();
    }, []);

    const addToCart = async (bookId) => {
      try {
        const token = localStorage.getItem('bb_tkn'); // Assuming the token is stored in localStorage
        await axios.post(
          'http://localhost:3000/api/cart/add',
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Book added to cart successfully!');
      } catch (error) {
          if (error.response && error.response.status === 400) {
            // Item already exists in the cart
            toast('Item already exists in the cart');
        } else {
            console.error('Error when adding book to cart', error);
        }
      }
    };

    function truncateTitle(title, limit) {
        if (title.length <= limit) {
          return title; // Title already fits, return it as is
        }
      
        // Truncate the title and add ellipsis (...)
        return title.substring(0, limit) + "...";
    }

  return (
    <>
        <Header />

        {book ? (

          <section className="details">
            <div className="main">
                <div className="left">
                    <div className="imageDiv">
                        <img src={book.CoverImageURL} alt="" />
                    </div>
                </div>

                <div className="right">
                    <p className="title">{book.Title}</p>
                    <p className="author">{book.Author}</p>
                    <p className="price"><span>KSh</span>{book.Price}</p>
                    <button 
                      id='addToCart'
                      onClick={() => addToCart(book.BookID)}
                    >
                      Add To Cart
                    </button>
                    <p className="synopsis">
                      {book.Synopsis}
                    </p>
                    <button className='addToWishlist' onClick={handleWishlist}>
                    Add To Wishlist &nbsp;
                        { addedToWishlist ? <FaHeart className='icon'/> : <FaRegHeart className='icon'/> }
                        
                    </button>
                    <div className="book-genres">
                      <h6>Genre: </h6>
                      <ul>
                        {/* Parse the string containing genres from the database into an array,
                            then map over the array to create <li> elements */}
                        {JSON.parse(book.Genre).map(genre => (
                          <li key={genre}>
                            {genre.charAt(0).toUpperCase() + genre.slice(1)} {/* Capitalize the genre */}
                          </li>
                        ))}
                      </ul>
                    </div>

                </div>
            </div>

            {books && books.length > 0 && (
              <section className="genre">
                <p className="genre-title">Related Books</p>
                <div className="genre-container">
                  {books.map((book) => (
                    <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                      <div>
                        <div className="top">
                          <img src={book.CoverImageURL} alt={book.Title} />
                        </div>
                        <div className="bottom">
                          <p className="title">{truncateTitle(book.Title, 40)}</p>
                          <p className="author">{book.Author}</p>
                          <p className='price'><span>KSh.</span>{book.Price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </section>

        ) : (
          <p>Loading...</p>
        )}

        <Footer />

        <div className="space"></div>
    </>

  )
}

export default Details