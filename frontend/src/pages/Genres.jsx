import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Genres = () => {
  const [genreBooks, setGenreBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState('');
  const { genre } = useParams(); // Extracting genre parameter

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/genre/${genre}`);
        if (response.status === 404) {
          setError(`No books found for genre ${genre}`);
          toast(`No books found for genre ${genre}`)
        } else {
          setGenreBooks(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books by genre:', error);
        setError('Error fetching books by genre');
        setIsLoading(false); // Set isLoading to false in case of error
      }
    };

    fetchBooksByGenre();
  }, [genre]);

  if (isLoading) {
    return <p>Loading...</p>;
  }


  // Check if genreBooks array is empty
  if (genreBooks.length === 0) {
    return (
      <>
        <Header />
        <section className="genre-page">
          <h2 className='error-color'>No books found in {genre}</h2>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="genre-page">
        <h2>Books in {genre}</h2>
        <div className="genre-container">
          {genreBooks.map((book) => (
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
