import { useState } from 'react';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
    const API_URL = 'http://localhost:3000/api';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        confirmPassword: ''
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }

        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }

        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }

        if (!/\d/.test(password)) {
            return 'Password must contain at least one digit';
        }

        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            return 'Password must contain at least one special character';
        }

        return null; // Password is valid
    };

    const handleSignUpSuccess = (token) => {
        // Save token to localStorage
        localStorage.setItem('bb_tkn', token);
        // Redirect user to home page
        navigate('/home');
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Password, ConfirmPassword } = formData;

        if (Password !== ConfirmPassword) {
            toast('Passwords do not match')
            return;
        }

        const passwordError = validatePassword(Password);
        if (passwordError) {
            toast(passwordError)
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/signup`, formData);

            if (response.status !== 201) {
            throw new Error('Signup failed');
            }

            // Handle successful signup (e.g., redirect user)
            // For now, let's just log a success message
            toast('Signup successful');
            // Optionally redirect user to another page upon successful login
            const { token } = response.data;
            // Call function to save token to localStorage
            console.log(token)
            handleSignUpSuccess(token);
        } catch (error) {
            toast('Signup error:', error.message);
            // Handle signup error (e.g., display error message to user)
        }
    };

  return (
    <main className="sign-up">
        <div className="sign-up-container">
        <div className="logo-div">
            <h2 id="logo">BBookstore</h2>
        </div>

        <h2>Create your Account</h2>
        <div className="inner-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Username">Enter Username:</label>
                    <input
                        type="text"
                        id="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        required
                        placeholder='Indakwa'
                        autoComplete="off"
                    />
                </div>
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
                <div>
                    <label htmlFor="ConfirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login" id="toLogin">Login</Link></p>
            </form>
            <div className="right-div">
                <img src="/assets/1.png" alt="" />
            </div>
        </div>
        </div>
    </main>
  )
}

export default SignUp