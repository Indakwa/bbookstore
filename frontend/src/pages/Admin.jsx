import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const Admin = () => {
    const API_URL = 'http://localhost:3000/api';
    const [requests, setRequests] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [payPublishers, setPayPublishers] = useState([]);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        // Retrieve JWT from local storage
        const storedJwt = localStorage.getItem('bb_tkn');
        setJwt(storedJwt);
    }, []);

 
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

    useEffect(() => {
        const fetchPayPublishers = async () => {
            try {
                const response = await axios.get(`${API_URL}/pay-publishers`);
                setPayPublishers(response.data);
            } catch (error) {
                console.error('Error fetching pay publishers:', error);
            }
        };
        fetchPayPublishers();
    }, []);

    const handleReceived = async (transactionId) => {
        try {
            await axios.put(`${API_URL}/transactions/${transactionId}`, {
                transactionStatus: 'completed'
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}` // Include JWT in request headers
                }
            });
            // Refresh transactions after status update
            const updatedTransactions = transactions.map(transaction =>
                transaction.TransactionID === transactionId
                    ? { ...transaction, TransactionStatus: 'completed' }
                    : transaction
            );
            setTransactions(updatedTransactions);
            toast("Transaction Status Updated Succesfully")
        } catch (error) {
            console.error('Error updating transaction status:', error);
            toast("Error updating transaction status");
        }
    };

    const handleNotReceived = async (transactionId) => {
        try {
            await axios.put(`${API_URL}/transactions/${transactionId}`, {
                transactionStatus: 'incomplete'
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}` // Include JWT in request headers
                }
            });
            // Refresh transactions after status update
            const updatedTransactions = transactions.map(transaction =>
                transaction.TransactionID === transactionId
                    ? { ...transaction, TransactionStatus: 'incomplete' }
                    : transaction
            );
            setTransactions(updatedTransactions);
            toast("Transaction Status Updated Succesfully")
        } catch (error) {
            console.error('Error updating transaction status:', error);
            toast("Error updating transaction status");
        }
    };

    const handlePaid = async (payPublisherId) => {
        try {
            await axios.put(`${API_URL}/pay-publisher/${payPublisherId}`, {
                status: 'paid'
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            const updatedPayPublishers = payPublishers.map(payPublisher =>
                payPublisher.PayPublisherID === payPublisherId
                    ? { ...payPublisher, Status: 'paid' }
                    : payPublisher
            );
            setPayPublishers(updatedPayPublishers);
            toast("Pay Publisher Status Updated Successfully");
        } catch (error) {
            console.error('Error updating pay publisher status:', error);
            toast("Error updating pay publisher status");
        }
    };


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
                            <th>Actions</th>
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
                                <td className='actions'>
                                    {transaction.TransactionStatus === 'pending' && (
                                        <>
                                            <button className='btn-1' onClick={() => handleReceived(transaction.TransactionID)}>Received</button>
                                            <button className='btn-2' onClick={() => handleNotReceived(transaction.TransactionID)}>Not Received</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="pay-publishers">
                <h4>Pay Publishers</h4>
                <table className="pay-publishers-table">
                    <thead>
                        <tr>
                            <th>Publisher Contact</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payPublishers.map(payPublisher => (
                            <tr key={payPublisher.PayPublisherID}>
                                <td>{payPublisher.PublisherContact}</td>
                                <td>{payPublisher.Amount}</td>
                                <td>{payPublisher.Status}</td>
                                <td className='actions'>
                                    {payPublisher.Status === 'pending' && (
                                        <button className='btn-1' onClick={() => handlePaid(payPublisher.PayPublisherID)}>I Have Paid</button>
                                    )}
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