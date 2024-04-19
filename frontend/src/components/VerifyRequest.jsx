import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";

const Verify = () => {
    const { submissionId } = useParams();
    const API_URL = 'http://localhost:3000/api';
    const [submissionDetails, setSubmissionDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookContent, setBookContent] = useState('');

    useEffect(() => {
      const fetchSubmissionDetails = async () => {
        try {
          const response = await axios.get(`${API_URL}/requests/${submissionId}`);
          setSubmissionDetails(response.data);


                // Extract the book URL from the response data
        const bookURL = response.data.BookURL;
        // Fetch the book content from the Cloudinary URL
        const bookContentResponse = await fetch(bookURL);
        if (!bookContentResponse.ok) {
            throw new Error('Error Fetching Book Content');
        }
        // Read the text content of the response
        const textContent = await bookContentResponse.text();
        setBookContent(textContent);
        } catch (error) {
          console.error('Error fetching submission details:', error);
        }
      };
      fetchSubmissionDetails();
    }, [submissionId]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const approveSubmission = async () => {
        try {
            // Get JWT token from localStorage (assuming it's stored there after login)
            const token = localStorage.getItem('bb_tkn');
            // Include JWT token in request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(`${API_URL}/approve-request/${submissionId}`, { requestStatus: 'approved' }, config);
            // Optionally, you can update the UI or redirect the user after approval
            // For example, you can show a success message or redirect to a different page
        } catch (error) {
            console.error('Error approving submission:', error);
            // Handle error
        }
    };

    const declineSubmission = async () => {
        try {
            // Get JWT token from localStorage (assuming it's stored there after login)
            const token = localStorage.getItem('bb_tkn');
            // Include JWT token in request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(`${API_URL}/decline-request/${submissionId}`, { requestStatus: 'declined' }, config);
            // Optionally, you can update the UI or redirect the user after decline
            // For example, you can show a success message or redirect to a different page
        } catch (error) {
            console.error('Error declining submission:', error);
            // Handle error
        }
    };

    if (!submissionDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section className='verify'>
            <div className="container">
                <h4>Verify Request To Publish</h4>
                <div className="request-container">
                    <div className="left">
                        <div className="cover-div">
                            <p className="label">Cover Image</p>
                            <div className='cover'>
                                <img src={submissionDetails.CoverImageURL} alt="Cover" />
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <div className="title-div">
                            <p className="label">Book Title</p>
                            <p className='output title'>{submissionDetails.Title}</p>
                        </div>
                        <div className="author-div">
                            <p className="label">Author</p>
                            <p className='output author'>{submissionDetails.Author}</p>
                        </div>
                        <div className="synopsis-div">
                            <p className="label">Synopsis</p>
                            <p className='output synopsis'>{submissionDetails.Synopsis}</p>
                        </div>
                        <div className="genre-div">
                            <p className="label">Genre</p>
                            <p className='output genre'>
                                {/* Map over the genres, capitalize each genre, and join with commas and spaces */}
                                {submissionDetails.Genre.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)).join(', ')}
                            </p>
                        </div>
                        <div className="price-div">
                            <p className="label">Price</p>
                            <p className='output price'><span>KSh.</span>{parseFloat(submissionDetails.Price).toFixed(2)}</p>
                        </div>
                        <div className="user-div">
                            <p className="label">Publisher</p>
                            <p className='output user'>{submissionDetails.user.Username}</p>
                        </div>
                        <div className="book-div">
                            <p className="label">The Book</p>
                            <div className='output book'>
                                <p to="#" onClick={toggleModal}>View The Book</p>
                            </div>
                        </div>
                        <div className="copyright-div">
                            <p className="label">Copyright Info</p>
                            <div className='output copy'>
                                <Link to={submissionDetails.CopyrightURL} target="_blank">View the PDF</Link>
                            </div>
                        </div>

                        <div className="contact-div">
                            <p className="label">Publisher Contact</p>
                            <div className='output contact'>{submissionDetails.PublisherContact}</div>
                        </div>
                    </div>
                </div>
                <div className="btns">
                    <button className='btn approve' onClick={approveSubmission}>Approve</button>
                    <button className='btn decline' onClick={declineSubmission}>Decline</button>
                </div>
            </div>

            {isModalOpen && (
              <div className="modal">
                <div className="modal-container">
                    <p className="closeIcon">
                        <IoIosClose id='icon' onClick={toggleModal}/>
                    </p>

                    <p className="book-title">
                        Review The Book
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: bookContent }} />
                </div>
              </div>
            )}
        </section>
    );
}

export default Verify;
