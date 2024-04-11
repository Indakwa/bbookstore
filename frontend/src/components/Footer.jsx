import { BsTwitterX } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FiLinkedin } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="footer-top">
            <div className="left">
                <div className="logo">
                    <p id="logo">BBookstore</p>
                </div>
                <p className="tagline">Lorem ipsum dolor sit amet.</p>
                <p className="tagline">Bpsum dolor sit amet.</p>

                <div className="socials">
                    <BsTwitterX className="icon"/>
                    <FiLinkedin className="icon"/>
                    <GrInstagram className="icon"/>
                </div>
            </div>

            <div className="right">
                <div className="footer-links">
                    <h6>Quick Links</h6>
                    <div className="links">
                        <Link to="/home" className="footer-link">Home</Link>
                        <Link to="/about" className="footer-link">About</Link>
                        <Link to="/" className="footer-link">Upcoming</Link>
                        <Link to="/" className="footer-link">How it Works</Link>  
                        <Link to="/" className="footer-link">Profile</Link>
                    </div>
                </div>
                <div className="footer-links">
                    <h6>Quick Links</h6>
                    <div className="links">
                        <Link to="/home" className="footer-link">Home</Link>
                        <Link to="/about" className="footer-link">About</Link>
                        <Link to="/" className="footer-link">Upcoming</Link>
                        <Link to="/" className="footer-link">How it Works</Link>  
                        <Link to="/" className="footer-link">Profile</Link>
                    </div>
                </div>
                <div className="footer-links">
                    <h6>Quick Links</h6>
                    <div className="links">
                        <Link to="/home" className="footer-link">Home</Link>
                        <Link to="/about" className="footer-link">About</Link>
                        <Link to="/" className="footer-link">Upcoming</Link>
                        <Link to="/" className="footer-link">How it Works</Link>  
                        <Link to="/" className="footer-link">Profile</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p className="copy">Copyright &copy; 2024 BBookstore</p>
            <p className="policy">Privacy Policy</p>
        </div>
    </footer>
  )
}

export default Footer