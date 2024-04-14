import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Request from '../pages/Request';

const Profile = () => {
    const [showRequest, setShowRequest] = useState(false)
    const [books, setBooks] = useState([]);

    const handleRequest = () => {
        setShowRequest(!showRequest); 
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
  return (
    <>
        { showRequest && <Request onCancel={handleRequest}/> }
        <Header />
        <section className='profile'>
            <div className="top">
                <div className="profilePic">
                    <img src="" alt="" />
                </div>
                <div className="profile-details">
                    <p className="username">Groova</p>
                    <p className="email">gro@gmail.com</p>
                    <p className="bio">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit esse excepturi harum autem sunt ea provident adipisci. Facere, impedit repellat.
                    </p>
                </div>
                <div className="ctas">
                    <button id='request-btn' onClick={handleRequest}>Publish Your Book</button>
                    <button id='edit-btn'>Edit Your Profile</button>
                </div>
            </div>

            <div className="my-books">
                <h4>My Library</h4>
                <div className="inner-container">
                    <div className="container">
                        {books.map((book) => (
                            <div key={book.BookID} className="book">
                                <Link to={`/book/${book.BookID}`} className="book-link"> {/* Link to BookReader */}
                                    <div className="coverImage">
                                        <img src={book.CoverImageURL} alt={book.Title} />
                                    </div>
                                    <div className="book-details">
                                        <p className="title">{book.Title}</p>
                                        <p className="author">{book.Author}</p>
                                    </div>
                                    <div className="progress">
                                        <p className="progress-title">Progress</p>
                                        <p className="percentage">20%</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="side">
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Profile