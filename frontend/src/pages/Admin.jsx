import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Verify from '../components/Verify';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
    const API_URL = 'http://localhost:3000/api';
    const [showVerify, setShowVerify] = useState(true)
    const [requests, setRequests] = useState([]);
    const [verifySubmissionId, setVerifySubmissionId] = useState("");

    const handleVerify = (submissionId) => {
        setShowVerify(true);
        setVerifySubmissionId(submissionId);
        console.log("Clicked") // Set the ID of the submission to verify
        console.log(`verifySubmissionId ${verifySubmissionId}`)
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/all-requests`);
                setRequests(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

  return (
    <>
        {/* { showVerify && <Verify submissionId={verifySubmissionId}/> } */}
        <Header />
        <section className="admin">
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
                    <button id='request-btn'>Publish Your Book</button>
                    <button id='edit-btn'>Edit Your Profile</button>
                </div>
            </div>

            <div className="requests">
                <h4>Pending Requests</h4>
                <table className="transaction-history-table">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>User</th>
                            <th>Status</th> 
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.SubmissionID}>
                                <td>{request.BookTitle}</td>
                                <td>{request.Author}</td>
                                <td><span>KSh.</span>{parseFloat(request.Price).toFixed(2)}</td>
                                <td>{request.user ? request.user.Username : 'Unknown'}</td>
                                <td>{request.requestStatus}</td>
                                <td>
                                    <Link to={`/verify/${request.SubmissionID}`}>
                                        Verify Request <FaAngleRight className='icon'/>
                                    </Link>
                                </td>   
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Admin