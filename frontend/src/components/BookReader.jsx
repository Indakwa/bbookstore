import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';

const BookReader = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [bookError, setBookError] = useState(null); // State for book errors


  const handleClose = () => {
    navigate("/profile");
  }

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        // Fetch the book data from the backend
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        // Extract the book URL from the response data
        const bookURL = response.data.BookURL;
        setBookTitle(response.data.Title)
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
        toast("Error fetching book content");
      }
    };
    fetchBookContent();
  }, [bookId]);

  return (
    <>
      <div className="reader-page">
        <p className="closeIcon">
          <IoIosClose id='icon' onClick={handleClose}/>
        </p>
        
        <p className="book-title">
          {bookTitle}
        </p>
        <section className='reader'>
          {bookError ? (
            <p>Error: {bookError}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: bookContent }} />
            
          )}
        </section>
      </div>
    </>
  );
};

export default BookReader;
