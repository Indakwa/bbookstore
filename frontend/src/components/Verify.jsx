import { useState, useEffect } from 'react';
import axios from 'axios';

const Verify = ({ submissionId }) => {
    const API_URL = 'http://localhost:3000/api';
    const [submissionDetails, setSubmissionDetails] = useState(null);

    useEffect(() => {
      const fetchSubmissionDetails = async () => {
        try {
            console.log(submissionId)
          const response = await axios.get(`${API_URL}/requests/${submissionId}`);
          setSubmissionDetails(response.data);
        } catch (error) {
          console.error('Error fetching submission details:', error);
        }
      };
      fetchSubmissionDetails();
    }, [submissionId]);


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
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div className="title-div">
                        <p className="label">Book Title</p>
                        <p className='output title'>Toma The Tiny Boy</p>
                    </div>
                    <div className="author-div">
                        <p className="label">Author</p>
                        <p className='output author'>Schwartz Oneil</p>
                    </div>
                    <div className="synopsis-div">
                        <p className="label">Synopsis</p>
                        <p className='output synopsis'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam possimus modi voluptates adipisci fugiat sed saepe ducimus officia corporis, assumenda vel aspernatur, itaque unde suscipit, expedita ipsum accusantium veniam vitae.</p>
                    </div>
                    <div className="genre-div">
                        <p className="label">Genre</p>
                        <p className='output genre'>Fantasy, Comedy</p>
                    </div>
                    <div className="price-div">
                        <p className="label">Price</p>
                        <p className='output price'><span>KSh.</span>30.00</p>
                    </div>
                    <div className="user-div">
                        <p className="label">Publisher</p>
                        <p className='output user'>Adams</p>
                    </div>
                    <div className="book-div">
                        <p className="label">The Book</p>
                        <div className='output book'>The E-book</div>
                    </div>

                    <div className="contact-div">
                        <p className="label">Publisher Contact</p>
                        <div className='output contact'>The E-book</div>
                    </div>
                </div>
            </div>
            <div className="btns">
                <button className='btn approve'>Approve</button>
                <button className='btn decline'>Decline</button>
            </div>
        </div>
    </section>
  )
}

export default Verify