import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
    const API_URL = 'http://localhost:3000/api';
    const [requests, setRequests] = useState([]);
    const [transactions, setTransactions] = useState([]);

 
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${API_URL}/all-requests`);
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${API_URL}/transactions`);
                setTransactions(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const formatKenyanDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString('en-KE', {
            timeZone: 'Africa/Nairobi',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };



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
                <table className="request-history-table">
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

            <div className="transactions">
                    <h4>Transaction History</h4>
                    <table className="transaction-history-table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.TransactionID}>
                                    <td>{transaction.user.Username}</td>
                                    <td><span>KSh.</span>{transaction.TotalPrice}</td>
                                    <td>
                                        {formatKenyanDateTime(transaction.TransactionDate)}
                                    </td>
                                    <td>{transaction.TransactionStatus}</td>
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