import { useState } from 'react';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminLogin = () => {
    const API_URL = 'http://localhost:3000/api';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginSuccess = (token) => {
        // Save token to localStorage
        localStorage.setItem('bb_tkn', token);
        // Redirect user to home page
        navigate('/admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/login-admin`, formData);

            if (response.status !== 200) {
                toast('Login failed')
                throw new Error('Login failed');
            }

             // Handle successful login
            toast.success('Login successful');
            // Optionally redirect user to another page upon successful login
            const { token } = response.data;
            // Call function to save token to localStorage
            console.log(token)
            handleLoginSuccess(token);
        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                if (error.response.status === 404) {
                    toast('User Email not found')
                } else if (error.response.status === 401) {
                    toast('Invalid Password')
                } else {
                    toast('An error occurred while logging in. Please try again later')
                    
                }
            } else {
                toast('An error occurred while logging in. Please try again later')
            }
        }
    };

    
  return (
    <main className="login">
        <div className="login-container">
        <div className="logo-div">
            <h2 id="logo">BBookstore</h2>
        </div>

        <h2>Log into your Admin Account</h2>
        <div className="inner-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Email">Enter Email:</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                        placeholder='example@gmail.com'
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="Password">Enter Password:</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <div className="right-div">
            <img src="/assets/1.png" alt="" />
            </div>
        </div>
        </div>
    </main>
  )
}

export default AdminLogin