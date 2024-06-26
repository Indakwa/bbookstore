import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { IoSearchOutline } from "react-icons/io5";
import Footer from '../components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFeedback, setSearchFeedback] = useState('');
  
  const [adventureBooks, setAdventureBooks] = useState([]);
  const [comedyBooks, setComedyBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [fantasyBooks, setFantasyBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [horrorBooks, setHorrorBooks] = useState([]);


  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Adventure"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setAdventureBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Comedy"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setComedyBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Fiction"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setFictionBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Fantasy"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setFantasyBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Romance"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setRomanceBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      const genre = "Horror"
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          toast(`No books found for genre: ${genre}`)
        } else {
          setHorrorBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    };

    fetchBooksByGenre();
  }, []);


  //Fetch All Books
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

    // Function to handle genre box click
    const handleGenreClick = (genre) => {
      // Redirect to page showing books of the clicked genre
      navigate(`/genres/${genre}`);
    };
  
  useEffect(() => {
    // Filter books based on searchTerm
    const filteredBooks = books.filter(book =>
      book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
    setSearchFeedback(filteredBooks.length === 0 ? 'No Matching Results Found.' : '');
  }, [searchTerm, books]);

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
              <div className="genre-box" onClick={() => handleGenreClick('Fiction')}>
                <p>Fiction</p>
              </div>
              <div className="genre-box" onClick={() => handleGenreClick('Fantasy')}>
                <p>Fantasy</p>
              </div>
              <div className="genre-box" onClick={() => handleGenreClick('Romance')}>
                <p>Romance</p>
              </div>
              <div className="genre-box" onClick={() => handleGenreClick('Horror')}>
                <p>Horror</p>
              </div>
              <div className="genre-box" onClick={() => handleGenreClick('Adventure')}>
                <p>Adventure</p>
              </div>
              <div className="genre-box" onClick={() => handleGenreClick('Comedy')}>
                <p>Comedy</p>
              </div>
            </section>

             {/* Conditional rendering for search results section */}
            {searchTerm && (
              <section className="genre search">
                <p className="genre-title">Search Results</p>
                {searchFeedback ? (
                  <p className="search-feedback">{searchFeedback}</p>
                ) : (
                  <div className="genre-container">
                    {searchResults.map((book) => (
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
                )}
              </section>
            )}

            <section className="genre">
              <p className="genre-title">Adventure</p>
              <div className="genre-container">
                {adventureBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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

            <section className="genre">
              <p className="genre-title">Comedy</p>
              <div className="genre-container">
                {comedyBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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

            <section className="genre">
              <p className="genre-title">Fiction</p>
              <div className="genre-container">
                {fictionBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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
            
            <section className="genre">
              <p className="genre-title">Fantasy</p>
              <div className="genre-container">
                {fantasyBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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

            <section className="genre">
              <p className="genre-title">Romance</p>
              <div className="genre-container">
                {romanceBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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
            
            <section className="genre">
              <p className="genre-title">Horror</p>
              <div className="genre-container">
                {horrorBooks.map((book) => (
                  <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
                    <div>
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
    </>

  )
}

export default Home