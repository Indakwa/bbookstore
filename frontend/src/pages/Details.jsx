import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import Footer from '../components/Footer';

const Details = () => {
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [books, setBooks] = useState([]);

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
        <section className="details">
            <div className="main">
                <div className="left">
                    <div className="imageDiv">
                        <img src="/assets/1.png" alt="" />
                    </div>
                </div>

                <div className="right">
                    <p className="title">Adventures Of Bobo The Magician.</p>
                    <p className="author">Ivy Kay</p>
                    <p className="price"><span>KSh.</span>30.00</p>
                    <button id='addToCart'>Add To Cart</button>
                    <p className="synopsis">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia hic sapiente veritatis ipsam laudantium? Reiciendis id magni molestiae? Unde asperiores mollitia laudantium consequatur. Dolores esse quaerat nemo ab ipsum est voluptatum ducimus omnis nesciunt eos nam adipisci numquam quam perspiciatis non quo autem architecto, aperiam exercitationem et quidem ratione officiis.
                    </p>
                    <button className='addToWishlist' onClick={handleWishlist}>
                    Add To Wishlist &nbsp;
                        { addedToWishlist ? <FaHeart className='icon'/> : <FaRegHeart className='icon'/> }
                        
                    </button>
                    <div className="book-genres">
                        <h6>Genre: </h6>
                        <ul>
                            <li>Fantasy</li>
                            <li>Comedy</li>
                            <li>Romance</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="genre">
              <p className="genre-title">Related Books</p>
              <div className="genre-container">
                {books.map((book) => (
                  <div key={book.BookID} className="book">
                    <div className="top">
                      <img src={book.CoverImageURL} alt={book.Title} />
                    </div>
                    <div className="bottom">
                      <p className="title">
                        {truncateTitle(book.Title, 40)}
                      </p>
                      <p className="author">{book.Author}</p>
                      <p className='price'><span>KSh.</span>{book.Price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
        </section>
        <Footer />

        <div className="space"></div>
    </>

  )
}

export default Details