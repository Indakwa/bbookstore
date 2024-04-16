import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookReader = () => {
  const { bookId } = useParams();
  const [bookContent, setBookContent] = useState('');
  const [bookError, setBookError] = useState(null); // State for book errors

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        // Fetch the book data from the backend
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        // Extract the book URL from the response data
        const bookURL = response.data.BookURL;
        // Fetch the book content from the Cloudinary URL
        const bookContentResponse = await fetch(bookURL);
        if (!bookContentResponse.ok) {
          throw new Error('Network response was not ok');
        }
        // Read the text content of the response
        const textContent = await bookContentResponse.text();
        setBookContent(textContent);
      } catch (error) {
        setBookError(error.message); // Store error message
        console.error('Error fetching book content:', error);
      }
    };
    fetchBookContent();
  }, [bookId]);

  return (
    <div>
      {bookError ? (
        <p>Error: {bookError}</p>
      ) : (
        <p>{bookContent}</p>
      )}
    </div>
  );
};

export default BookReader;
