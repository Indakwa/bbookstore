import { useState, useEffect } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";
import { PDFDocument, rgb } from 'pdf-lib';

const Admin = () => {
    const navigate = useNavigate();
    const API_URL = 'http://localhost:3000/api';
    const [requests, setRequests] = useState([]);
    const [booksInventory, setBooksInventory] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [payPublishers, setPayPublishers] = useState([]);
    const [jwt, setJwt] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        // Retrieve JWT from local storage
        const storedJwt = localStorage.getItem('bb_tkn');
        setJwt(storedJwt);
    }, []);

 
    const handleLogout = () => {
        localStorage.removeItem('bb_tkn');
        navigate('/admin-login');
    };

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
                console.log(`TRANSACTIONS \n ${response.data}`)
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

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('bb_tkn');
                const response = await axios.get(`${API_URL}/admin`, {
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
        const fetchAllUsers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/users');
            setAllUsers(response.data);
          } catch (error) {
            console.error('Error fetching all Users', error);
          }
        };
    
        fetchAllUsers();
      }, []);

           
    useEffect(() => {
        const fetchBooksInventory = async () => {
            try {
                // Fetch books on sale for the current publisher
                const response = await axios.get(`${API_URL}/books-inventory`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bb_tkn')}`
                    }
                });
                setBooksInventory(response.data);
                
            } catch (error) {
                console.error('Error fetching publisher sales:', error);
                toast.error('Error fetching publisher sales');
            }
        };

        fetchBooksInventory();
    }, []);



    const generateReport = async () => {
        try {
            // Get current date
            const currentDate = new Date().toLocaleDateString();

            // Calculate totals
            const totalSalesRevenue = transactions.reduce((acc, transaction) => acc + transaction.TotalPrice, 0);
            const totalOrders = transactions.length;
            const totalCustomers = [...new Set(transactions.map(transaction => transaction.user.Username))].length;

            // Group transactions by product and calculate total sales for each product
            const productSales = transactions.reduce((acc, transaction) => {
                transaction.CartItems.forEach(item => {
                    if (!acc[item.Name]) {
                        acc[item.Name] = {
                            product: item.Name,
                            totalSales: 0
                        };
                    }
                    acc[item.Name].totalSales += parseFloat(item.Price);
                });
                return acc;
            }, {});

            // Sort products by total sales
            const topSellingProducts = Object.values(productSales).sort((a, b) => b.totalSales - a.totalSales).slice(0, 3);

            // Create PDF
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            const { width, height } = page.getSize();
            const fontSize = 12;

            const drawText = (text, x, y) => {
                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
            };

            let y = height - 50;

            // Header Section
            drawText('Sales Report', 200, y);
            y -= 20;
            drawText('Company Name: XYZ Corporation', 50, y);
            y -= 20;
            drawText(`Report Date: ${currentDate}`, 50, y);
            y -= 20;
            drawText('Reporting Period: March 2024', 50, y);
            y -= 30;

            // Executive Summary
            drawText('Executive Summary:', 50, y);
            y -= 20;
            drawText('This report provides an overview of the sales performance of XYZ Corporation for the month of March 2024.', 50, y);
            y -= 30;

            // Key Metrics
            drawText('Key Metrics:', 50, y);
            y -= 20;
            drawText(`- Total Sales Revenue: $${totalSalesRevenue.toFixed(2)}`, 70, y);
            y -= 20;
            drawText(`- Total Number of Orders: ${totalOrders}`, 70, y);
            y -= 20;
            drawText(`- Total Customers: ${totalCustomers}`, 70, y);
            y -= 30;

            // Product Performance
            drawText('Product Performance (Top Selling Products):', 50, y);
            y -= 20;
            drawText('Product Name        Total Sales', 70, y);
            y -= 20;
            drawText('---------------------------------', 70, y);
            y -= 20;

            topSellingProducts.forEach(product => {
                drawText(`${product.product}           $${product.totalSales.toFixed(2)}`, 70, y);
                y -= 20;
            });

            const pdfBytes = await pdfDoc.save();

            // Download the PDF
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'sales_report.pdf';
            link.click();
        } catch (err) {
            console.error('Error generating sales report:', err);
        }
    };



  return (
    <>
        <section className="admin">
            <h2>Admin Dashboard</h2>

            <div className="top">
                <div className="profilePic">
                    <img src="/assets/admin.jpg" alt="" />
                </div>
                <div className="profile-details">
                    <p className="username">{userDetails.Username}</p>
                    <p className="email">{userDetails.Email}</p>
                </div>
                <div className="ctas">
                    <button id='request-btn' onClick={generateReport}>Generate Sales Report</button>
                    <button id='logout-btn' onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="requests">
                <h4 className='green'>Pending Requests</h4>
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
                                <td className='actions'>
                                    {request.requestStatus === 'pending' && (
                                    <Link to={`/verify/${request.SubmissionID}`}>
                                        Verify Request <FaAngleRight className='icon'/>
                                    </Link>
                                    )}
                                </td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="transactions">
                <h4 className='yellow'>Transaction History</h4>
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
                <h4 className='green'>Pay Publishers</h4>
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

            <section className="books-management">
                <h4 className='yellow'>All Books Management</h4>
                <table className="books-management-table">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Publisher Contact</th>
                            <th>Price</th>
                            <th>Number Sold</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(booksInventory).map(([title, details]) => (
                            <tr key={title}>
                                <td>{title}</td>
                                <td>{details.Author}</td>
                                <td>{details.Contact}</td>
                                <td>{details.price}</td>
                                <td>{details.Number_Sold}</td>
                                <td className='edit-actions'>Edit Book Info <MdOutlineEdit className='edit-icon'/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="users-management">
                <h4 className='green'>All Users Management</h4>
                <table className="users-management-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(user => (
                            <tr key={user.UserID}>
                                <td>{user.Username}</td>
                                <td>{user.Email}</td>
                                <td>{user.Role}</td>
                                <td className='edit-actions'>Edit User Info <MdOutlineEdit className='edit-icon'/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    </>
  )
}

export default Admin