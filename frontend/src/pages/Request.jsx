import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import axios from 'axios'
import { toast } from 'react-toastify'

const Request = ({ onCancel }) => {
    const handleClose = () => {
        // Call the passed-in onCancel function here
        onCancel();
    };

    const [formData, setFormData] = useState({
        BookTitle: '',
        Author: '',
        Synopsis: '',
        Genre: '',
        Price: '',
        epub: '',
        coverImage: '',
        copyright: '',
        PublisherContact: ''
    });

    const handleChange = (e) => {
        if (e.target.name === 'epub' || e.target.name === 'coverImage' || e.target.name === 'copyright') {
            // If the input is a file input, update the state with the selected file
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            // If the input is not a file input, update the state with the input value
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();    
        toast('Uploading Your Files. Please Wait...'); 
        try {
            // Create FormData object to send files along with other form data
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            // Get JWT token from localStorage (assuming it's stored there after login)
            const token = localStorage.getItem('bb_tkn');
            // Include JWT token in request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            console.log('formDataToSend', formDataToSend)
            // Send the form data to the backend with JWT token in headers
            await axios.post('http://localhost:3000/api/submit-request', formDataToSend, config);
            // Handle success (e.g., show a success message, redirect user, etc.)
            toast('Publish request submitted successfully!');
            handleClose()
        } catch (error) {
            // Handle error (e.g., show error message to user)
            console.error('Error submitting publish request:', error);
            toast('Error submitting publish request. Please try again.');
        }
    };



  return (
    <section className='request'>
        <div className="request-container">
            <h4>Fill in The Book Details</h4>
            <IoIosClose id='closeIcon' onClick={handleClose}/>
            <form 
                className="inner-container" 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
            >
                <div className="input-div">
                    <label htmlFor="BookTitle">Enter Book Title</label>
                    <input 
                        type="text" 
                        name='BookTitle' 
                        placeholder='The Mystery of Bigfoot'
                        value={formData.BookTitle}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Author">Enter Author's Name</label>
                    <input 
                        type="text" 
                        name='Author' 
                        placeholder='Jacky Scott'
                        value={formData.Author}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Genre">Enter Book Genre</label>
                    <input 
                        type="text" 
                        name='Genre' 
                        placeholder='Fantasy, Comedy, Horror'
                        value={formData.Genre}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Price">Enter Book Price (KSh.)</label>
                    <input 
                        type="number" 
                        name='Price' 
                        placeholder='30'
                        value={formData.Price}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Synopsis">Enter Synopsis</label>
                    <textarea 
                        name="Synopsis" 
                        id="Synopsis" 
                        cols="30" 
                        rows="4"
                        value={formData.Synopsis}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    ></textarea>
                </div>
                <div className="input-div">
                    <label htmlFor="PublisherContact">Enter your Phone Number</label>
                    <input 
                        type="tel" 
                        maxLength={10}
                        name='PublisherContact'
                        value={formData.PublisherContact}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder='0712345678'
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="epub">Upload Book (.txt)</label>
                    <input 
                        type="file" 
                        name='epub' 
                        accept=".txt"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="CoverImage">Upload Cover Image</label>
                    <input 
                        type="file" 
                        name='coverImage' 
                        accept="image/*"
                        value={formData.CoverImage}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Copyright" >Upload Copyright Information (.pdf)</label>
                    <input 
                        type="file" 
                        name='copyright' 
                        accept="application/pdf"
                        value={formData.Copyright}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="input-div">
                    <button type="submit" className='submit'>Submit Your Publish Request</button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Request