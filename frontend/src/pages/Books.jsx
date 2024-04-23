import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Genres = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books`);
        if (response.status === 404) {
          setError(`No books found.`);
          toast(`No books found.`)
        } else {
          setAllBooks(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books', error);
        setError('Error fetching books.');
        setIsLoading(false); // Set isLoading to false in case of error
      }
    };

    fetchAllBooks();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Header />
      <section className="genre-page">
        <h2>Our Books Collection</h2>
        <div className="genre-container">
          {allBooks.map((book) => (
            <Link to={`/details/${book.BookID}`} key={book.BookID} className="book">
              <div>
                <div className="top">
                  <img src={book.CoverImageURL} alt={book.Title} />
                </div>
                <div className="bottom">
                  <p className="title">{book.Title}</p>
                  <p className="author">{book.Author}</p>
                  <p className="price"><span>KSh.</span>{book.Price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Genres;
