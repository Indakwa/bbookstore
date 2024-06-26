import { useState, useEffect, useRef } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";
import { PDFDocument, rgb } from 'pdf-lib';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdLogout } from "react-icons/md";

const Admin = () => {
    const navigate = useNavigate();
    const pendingRequestsSection = useRef(null);
    const transactionHistorySection = useRef(null);
    const inventoryManagementSection = useRef(null);
    const usersManagementSection = useRef(null);
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



    const generateSalesReport = async () => {
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
            drawText('SALES REPORT', 200, y, rgb(0.9333333333333333, 0.7568627450980392, 0.43137254901960786), 32);
            y -= 30;
            drawText('Company Name: BBookstore Platform', 50, y);
            y -= 20;
            drawText(`Report Date: ${currentDate}`, 50, y);
            y -= 20;
            drawText('Reporting Period: March - April 2024', 50, y);
            y -= 40;

            // Executive Summary
            drawText('Executive Summary:', 50, y, rgb(0.9333333333333333, 0.7568627450980392, 0.43137254901960786), 18);
            y -= 20;
            drawText('This report provides an overview of the sales performance of BBookstore Platform,', 50, y);
            y -= 15;
            drawText('For the Period of March and April 2024', 50, y);
            y -= 40;

            // Key Metrics
            drawText('Key Metrics:', 50, y, rgb(0.9333333333333333, 0.7568627450980392, 0.43137254901960786), 18);
            y -= 20;
            drawText(`- Total Sales Revenue: KSh${totalSalesRevenue.toFixed(2)}`, 50, y);
            y -= 20;
            drawText(`- Total Number of Orders: ${totalOrders}`, 50, y);
            y -= 20;
            drawText(`- Total Customers: ${totalCustomers}`, 50, y);
            y -= 40;

            // Product Performance
            drawText('Product Performance (Top Selling Products):', 50, y, rgb(0.9333333333333333, 0.7568627450980392, 0.43137254901960786), 18);
            y -= 20;
            drawText('Product Name                    Total Sales', 55, y);
            y -= 20;
            drawText('-------------------------------------------------------------------------------------------------------------------', 55, y);
            y -= 20;

            topSellingProducts.forEach(product => {
                drawText(`${product.product}                             KSh${product.totalSales.toFixed(2)}`, 55, y);
                y -= 20;
            });

            const pdfBytes = await pdfDoc.save();

            // Download the PDF
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'sales_report_bbookstore.pdf';
            link.click();
        } catch (err) {
            console.error('Error generating sales report:', err);
            toast("Error generating sales report. Try again later.")
        }
    };

    const generateInventoryReport = async () => {
        try {
            // Get current date
            const currentDate = new Date().toLocaleDateString();



            // Create PDF
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            const { width, height } = page.getSize();
            const fontSize = 12;

            const drawText = (text, x, y, color, size) => {
                page.drawText(text, {
                    x,
                    y,
                    size: size || fontSize,
                    color: color || rgb(0, 0, 0),
                });
            };

            let y = height - 50;

            // Header Section
            drawText('INVENTORY REPORT', 200, y, rgb(0, 0, 0), 18);
            y -= 30;
            drawText(`Company Name: BBookstore Platform`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText(`Report Date: ${currentDate}`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText(`Reporting Period: March - April 2024`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText('-----------------------------------------', 50, y);
            y -= 30;

            // Executive Summary
            drawText('Executive Summary:', 50, y, rgb(0, 0, 0), 18);
            y -= 20;
            drawText('This report provides an overview of the inventory in BBookstore Platform,', 50, y);
            y -= 15;
            drawText('For the Period of March and April 2024', 50, y);
            y -= 40;

            // Executive Summary
            drawText(`All The Books (${Object.keys(booksInventory).length})`, 50, y, rgb(0, 0, 0), 18);
            y -= 20;

            drawText('-------------------------------------------------------------------------------------------------', 50, y);
            y -= 20;

            

            Object.values(booksInventory).forEach((book, index) => {
                drawText(`Title: ${book.Title}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Author: ${book.Author}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Publisher Contact: 0${book.Contact.toString()}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Price: KSh${book.price}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Number Sold: ${book.Number_Sold.toString()}`, 50, y, rgb(0, 0, 0), 10);
                y -= 30;

            });

            const pdfBytes = await pdfDoc.save();

            // Download the PDF
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'inventory_report_bbookstore.pdf';
            link.click();
        } catch (err) {
            console.error('Error generating inventory report:', err);
        }
    };


    const generateUsersReport = async () => {
        try {
            // Get current date
            const currentDate = new Date().toLocaleDateString();

            const readerUsers = allUsers.filter(user => user.Role === "reader");
            const publisherUsers = allUsers.filter(user => user.Role === "publisher");



            // Create PDF
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            const { width, height } = page.getSize();
            const fontSize = 12;

            const drawText = (text, x, y, color, size) => {
                page.drawText(text, {
                    x,
                    y,
                    size: size || fontSize,
                    color: color || rgb(0, 0, 0),
                });
            };

            let y = height - 50;

            // Header Section
            drawText('USERS REPORT', 200, y, rgb(0, 0, 0), 18);
            y -= 30;
            drawText(`Company Name: BBookstore Platform`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText(`Report Date: ${currentDate}`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText(`Reporting Period: March - April 2024`, 50, y, rgb(0, 0, 0), 12);
            y -= 20;
            drawText('-----------------------------------------', 50, y);
            y -= 30;

            // Executive Summary
            drawText('Executive Summary:', 50, y, rgb(0, 0, 0), 18);
            y -= 20;
            drawText('This report provides an overview of the Users in BBookstore Platform,', 50, y);
            y -= 15;
            drawText('For the Period of March and April 2024', 50, y);
            y -= 40;


            // Key Metrics
            drawText('Key Metrics:', 50, y, rgb(0, 0, 0), 18);
            y -= 20;
            drawText(`- Total Users: ${allUsers.length}`, 50, y);
            y -= 20;
            drawText(`- Total Readers: ${readerUsers.length}`, 50, y);
            y -= 20;
            drawText(`- Total Publishers: ${publisherUsers.length}`, 50, y);
            y -= 40;


            drawText(`All The Users (${allUsers.length})`, 50, y, rgb(0, 0, 0), 18);
            y -= 20;

            drawText('-------------------------------------------------------------------------------------------------', 50, y);
            y -= 20;

            

            Object.values(allUsers).forEach((user, index) => {
                drawText(`Username: ${user.Username}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Email: ${user.Email}`, 50, y, rgb(0, 0, 0), 10);
                y -= 15;
                drawText(`Role: ${user.Role}`, 50, y, rgb(0, 0, 0), 10);
                y -= 30;

            });

            const pdfBytes = await pdfDoc.save();

            // Download the PDF
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'users_report_bbookstore.pdf';
            link.click();
        } catch (err) {
            console.error('Error generating inventory report:', err);
        }
    };

    const scrollToPendingRequestsSection = () => {
        if (pendingRequestsSection.current) {
            pendingRequestsSection.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToInventoryManagementSection = () => {
        if (inventoryManagementSection.current) {
            inventoryManagementSection.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToTransactionHistorySection = () => {
        if (transactionHistorySection.current) {
            transactionHistorySection.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToUsersManagementSection = () => {
        if (usersManagementSection.current) {
            usersManagementSection.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


  return (
    <>
        <section className="admin">
            <h2>
                Admin Dashboard 
                <MdLogout id='logout-icon' onClick={handleLogout}/>
            </h2>
            

            <div className="top">
                <div className="profilePic">
                    <img src="/assets/admin.jpg" alt="" />
                </div>
                <div className="profile-details">
                    <p className="username">{userDetails.Username}</p>
                    <p className="email">{userDetails.Email}</p>
                </div>
                <div className="ctas">
                    <button className='goto-btn' onClick={scrollToPendingRequestsSection}>
                        Go To Pending Requests
                    </button>
                    <button className='goto-btn' onClick={scrollToTransactionHistorySection}>
                        Go To Transaction History
                    </button>
                    <button className='goto-btn' onClick={scrollToInventoryManagementSection}>
                        Go To Books Management
                    </button>
                    <button className='goto-btn' onClick={scrollToUsersManagementSection}>
                        Go To Users Management
                    </button>
                </div>
            </div>

            <div className="admin-overview">
                <div className="overview-container">
                    <div className="inner-div">
                        <h6>Sales Overview</h6>
                        <div className="top-part">
                            <p className="big"><span>KSh.</span>
                                {transactions.reduce((acc, transaction) => acc + transaction.TotalPrice, 0)}
                            </p>
                            <p className="small">TOTAL SALES</p>
                            <p className="small">REVENUE</p>
                        </div>

                        <div className="bottom-part">
                            <p className="txt">
                                Total Orders: &nbsp;
                                <span>
                                    {transactions.length}
                                </span>
                            </p>
                            <p className="txt">
                                Total Customers: &nbsp;
                                <span>
                                    {[...new Set(transactions.map(transaction => transaction.user.Username))].length}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="inner-div">
                        <h6>Inventory Overview</h6>
                        <div className="top-part">
                            <p className="big">
                                {Object.keys(booksInventory).length}
                            </p>
                            <p className="small">TOTAL BOOKS</p>
                        </div>

                        <div className="bottom-part">
                            <p className="txt">
                                Total Number Sold: &nbsp;
                                <span>
                                    {Object.values(booksInventory).reduce(
                                        (sum, book) => sum + book.Number_Sold,
                                        0
                                    )}
                                </span>
                            </p>
                            <p className="txt">Total Genres: <span>6</span></p>
                        </div>
                    </div>
                    <div className="inner-div">
                        <h6>Users Overview</h6>
                        <div className="top-part">
                            <p className="big">
                                {allUsers.length}
                            </p>
                            <p className="small">TOTAL USERS</p>
                        </div>

                        <div className="bottom-part">
                            <p className="txt">
                                Total Readers: &nbsp;
                                <span>
                                    {allUsers.filter(user => user.Role === "reader").length}
                                </span>
                            </p>
                            <p className="txt">
                                Total Publishers: &nbsp;
                                <span>
                                    {allUsers.filter(user => user.Role === "publisher").length}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="reports">
                    <button className='generate' onClick={generateSalesReport}>
                        Generate Sales Report
                        <HiOutlineDocumentReport className='icon'/>
                    </button>
                    <button className='generate' onClick={generateInventoryReport}>
                        Generate Inventory Report
                        <HiOutlineDocumentReport className='icon'/>
                    </button>
                    <button className='generate' onClick={generateUsersReport}>
                        Generate Users Report
                        <HiOutlineDocumentReport className='icon'/>
                    </button>
                </div>
            </div>

            <div className="requests" ref={pendingRequestsSection}>
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

            <div className="transactions" ref={transactionHistorySection}>
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

            <section className="books-management" ref={inventoryManagementSection}>
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

            <section className="users-management" ref={usersManagementSection}>
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