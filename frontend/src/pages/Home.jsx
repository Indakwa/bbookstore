import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { IoSearchOutline } from "react-icons/io5";
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Header />
      <section className='home'>
        
          <section className="home-container">
          
            <section className="hero">
                <div className="left">
                  <h3>Discover Your Next</h3>
                  <h3>Great Read From</h3>
                  <h3>Our Collection</h3>

                     <div className="search-input">
                      <input
                        type="text"
                        placeholder="Search for Book Title or Author"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      <button type="button" id='search-btn'><IoSearchOutline className='icon'/></button>
                    </div>
                </div>

                <div className="right">
                <img src="/assets/2.png" alt="" />
                </div>
            </section>

            <section className='all-genres'>
              <div className="genre-box">
                <p>Fiction</p>
              </div>
              <div className="genre-box">
                <p>Fantasy</p>
              </div>
              <div className="genre-box">
                <p>Romance</p>
              </div>
              <div className="genre-box">
                <p>Horror</p>
              </div>
              <div className="genre-box">
                <p>Adventure</p>
              </div>
              <div className="genre-box">
                <p>Comedy</p>
              </div>
            </section>

            <section className="genre">
              <p className="genre-title">Bestsellers</p>
              <div className="genre-container">
                {books.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div >
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
                  </Link>
                ))}
              </div>
            </section>
          </section>
      </section>

      <Footer />

      <div className="space"></div>
    </>

  )
}

export default Home