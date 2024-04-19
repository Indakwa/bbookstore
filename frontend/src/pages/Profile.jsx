import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Request from '../pages/Request';
import { toast } from 'react-toastify'

const Profile = () => {
    const API_URL = 'http://localhost:3000/api';
    const [showRequest, setShowRequest] = useState(false)
    const [userBooks, setUserBooks] = useState([]);
    const [booksOnSale, setBooksOnSale] = useState([]);

    const handleRequest = () => {
        setShowRequest(!showRequest); 
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
            } catch (error) {
                console.error('Error fetching publisher sales:', error);
                toast.error('Error fetching publisher sales');
            }
        };

        fetchBooksOnSale();
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
                        {userBooks.map((userBook) => (
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
                        ))}
                    </div>

                    <div className="side">
                    </div>
                </div>
            </div>

            <section className="publisher-sales">
                <h2>Books on Sale</h2>
                <table className="publisher-sales-table">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Price</th>
                            <th>Number Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksOnSale.map(book => (
                            <tr key={book.BookTitle}>
                                <td>{book.BookTitle}</td>
                                <td>{book.Price}</td>
                                <td>{book.NumberSold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
        <Footer />
    </>
  )
}

export default Profile