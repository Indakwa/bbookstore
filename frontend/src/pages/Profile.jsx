import {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Request from '../pages/Request';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";

const Profile = () => {
    const navigate = useNavigate();
    const API_URL = 'http://localhost:3000/api';
    const [showRequest, setShowRequest] = useState(false)
    const [userBooks, setUserBooks] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [booksOnSale, setBooksOnSale] = useState([]);
    const [showBooksOnSale, setShowBooksOnSale] = useState(false);
    const [randomImage, setRandomImage] = useState("");
    const [latestBook, setLatestBook] = useState({});

    const handleRequest = () => {
        setShowRequest(!showRequest); 
    };

    const handleLogout = () => {
        localStorage.removeItem('bb_tkn');
        navigate('/login');
    };


    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const token = localStorage.getItem('bb_tkn'); // Retrieve JWT token from local storage
                const response = await axios.get(`http://localhost:3000/api/user-books`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in request headers
                    }
                });
                setUserBooks(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user books:', error);
                toast("Error fetching user books.")
            }
        };
    
        fetchUserBooks();
    }, []);

       
    useEffect(() => {
        const fetchBooksOnSale = async () => {
            try {
                // Fetch books on sale for the current publisher
                const response = await axios.get(`${API_URL}/publisher-sales`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bb_tkn')}`
                    }
                });
                setBooksOnSale(response.data);

                const book_count = Object.keys(response.data).length;
                if(book_count > 0){
                    setShowBooksOnSale(true);
                }
                
                
            } catch (error) {
                console.error('Error fetching publisher sales:', error);
                toast.error('Error fetching publisher sales');
            }
        };

        fetchBooksOnSale();
    }, []);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('bb_tkn');
                const response = await axios.get(`${API_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        const images = [
            "/assets/profiles/1.jpg",
            "/assets/profiles/2.jpg",
            "/assets/profiles/3.jpg",
            "/assets/profiles/4.jpg",
            "/assets/profiles/5.jpg",
            "/assets/profiles/6.jpg",
            "/assets/profiles/7.jpg",
            "/assets/profiles/8.jpg"
        ];
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

    useEffect(() => {
        const fetchLatestBook = async () => {
            try {
                const response = await axios.get(`${API_URL}/books`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bb_tkn')}`
                    }
                });
                // Sorting the books based on the ID to get the latest added book
                const latest = response.data.sort((a, b) => b.BookID - a.BookID)[0];
                setLatestBook(latest);
            } catch (error) {
                console.error('Error fetching latest book:', error);
            }
        };
        fetchLatestBook();
    }, []);



    
  return (
    <>
        { showRequest && <Request onCancel={handleRequest}/> }
        <Header />
        <section className='profile'>
            <div className="top">
                <div className="profilePic">
                    <img src={randomImage} alt="" />
                </div>
                <div className="profile-details">
                    <p className="username">{userDetails.Username}</p>
                    <p className="email">{userDetails.Email}</p>
                </div>
                <div className="ctas">
                    <button id='request-btn' onClick={handleRequest}>Publish Your Book</button>
                    <button id='logout-btn' onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="my-books">
                <h4>My Library</h4>
                <div className="inner-container">
                    <div className="container">
                        {userBooks.length > 0 ? (
                            userBooks.map((userBook) => (
                                <div key={userBook.UserBookID} className='book'>
                                    <Link to={`/book/${userBook.BookID}`} className='book-link'>
                                    <div className='coverImage'>
                                        <img src={userBook.book.CoverImageURL} alt={userBook.book.Title} />
                                    </div>
                                    <div className='book-details'>
                                        <p className='title'>{userBook.book.Title}</p>
                                        <p className='author'>{userBook.book.Author}</p>
                                    </div>
                                    <div className='progress'>
                                        <p className='progress-title'>Progress</p>
                                        <p className='percentage'>{userBook.ReadingProgress}%</p>
                                    </div>
                                    </Link>
                                </div>
                            ))
                            ) : (
                                <p className='yet'>You have not purchased a book yet.</p>
                        )}
                    </div>

                    <div className="latest-book-div">
                        <h4>Latest Added Book</h4>
                        <div key={latestBook.BookID} className='latest-book'>
                            <Link to={`/details/${latestBook.BookID}`} className='book-link'>
                                <div className='latest-book-top'>
                                    <img src={latestBook.CoverImageURL} alt={latestBook.Title} />
                                </div>
                                <div className='latest-book-bottom'>
                                    <p className='title'>{latestBook.Title}</p>
                                    <p className='author'>{latestBook.Author}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showBooksOnSale && (
                <section className="publisher-sales">
                    <h2>Books On Sale</h2>
                    <table className="books-on-sale-table">
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Price</th>
                                <th>Number Sold</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(booksOnSale).map(([title, details]) => (
                                <tr key={title}>
                                    <td>{title}</td>
                                    <td>{details.price}</td>
                                    <td>{details.numSold}</td>
                                    <td className='actions'>Edit Book Info <MdOutlineEdit className='edit-icon'/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

        </section>
        <Footer />
    </>
  )
}

export default Profile