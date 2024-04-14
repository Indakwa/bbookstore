import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Verify from '../components/Verify';
import { FaAngleRight } from "react-icons/fa6";


const Admin = () => {
    const [showVerify, setShowVerify] = useState(false)

    const handleVerify = () => {
        setShowVerify(!showVerify); 
    };

  return (
    <>
        { showVerify && <Verify onCancel={handleVerify}/> }
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
                        <tr>
                            <td>Toma The Tiny Boy</td>
                            <td>Xhaka Buoy</td>
                            <td><span>KSh.</span>30.00</td>
                            <td>Adams Smith</td>
                            <td>pending</td>
                            <td onClick={handleVerify}>Verify Request <FaAngleRight className='icon'/></td>
                        </tr>
                        <tr>
                            <td>Toma The Tiny Boy</td>
                            <td>Xhaka Buoy</td>
                            <td><span>KSh.</span>30.00</td>
                            <td>Adams Smith</td>
                            <td>pending</td>
                            <td onClick={handleVerify}>Verify Request <FaAngleRight className='icon'/></td>
                        </tr>
                        <tr>
                            <td>Toma The Tiny Boy</td>
                            <td>Xhaka Buoy</td>
                            <td><span>KSh.</span>30.00</td>
                            <td>Adams Smith</td>
                            <td>pending</td>
                            <td onClick={handleVerify}>Verify Request <FaAngleRight className='icon'/></td>
                        </tr>
                        <tr>
                            <td>Toma The Tiny Boy</td>
                            <td>Xhaka Buoy</td>
                            <td><span>KSh.</span>30.00</td>
                            <td>Adams Smith</td>
                            <td>pending</td>
                            <td onClick={handleVerify}>Verify Request <FaAngleRight className='icon'/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Admin