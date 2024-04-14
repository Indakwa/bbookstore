import { useState } from 'react';
import { IoIosClose } from "react-icons/io";

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
        CoverImage: '',
        Copyright: '',
        PublisherContact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



  return (
    <section className='request'>
        <div className="request-container">
            <h4>Fill in The Book Details</h4>
            <IoIosClose id='closeIcon' onClick={handleClose}/>
            <form className="inner-container">
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
                        placeholder='Fantasy, Comedy'
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
                        name='PublisherContact'
                        value={formData.PublisherContact}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder='0712345678'
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="epub" class="custom-file-upload">Upload Book (.epub)</label>
                    <input 
                        type="file" 
                        name='epub' 
                        accept="application/epub+zip"
                        value={formData.epub}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="CoverImage" class="custom-file-upload">Upload Cover Image</label>
                    <input 
                        type="file" 
                        name='CoverImage' 
                        accept="image/*"
                        value={formData.CoverImage}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="Copyright" class="custom-file-upload">Upload Copyright Information (.pdf)</label>
                    <input 
                        type="file" 
                        name='Copyright' 
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