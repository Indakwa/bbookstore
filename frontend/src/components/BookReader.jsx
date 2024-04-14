import { ReactReader } from 'react-reader'; // Import ReactReader
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookReader = () => {
  const { bookId } = useParams();
  const [bookUrl, setBookUrl] = useState(null);
  const [bookError, setBookError] = useState(null); // State for book errors

  useEffect(() => {
    const fetchBookUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        setBookUrl(response.data.BookURL);
        console.log(response.data.BookURL)
      } catch (error) {
        setBookError(error.message); // Store error message
        console.error('Error fetching book URL:', error);
      }
    };
    fetchBookUrl();
  }, [bookId]);

  return (
    <div>
      {bookUrl && <ReactReader url={bookUrl} />} {/* Render ReactReader for ePub */}
      {!bookUrl && !bookError && <p>Loading...</p>} {/* Loading state */}
      {bookError && <p>Error: {bookError}</p>}  {/* Display error message */}
    </div>
  );
};

export default BookReader;
