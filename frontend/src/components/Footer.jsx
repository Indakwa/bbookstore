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
                <p className="tagline">Curated Collections, Seamless Purchases, Happy Endings:</p>
                <p className="tagline">It's All Here at BBookstore.</p>

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
                        <Link to="/books" className="footer-link">All Books</Link>
                        <Link to="/how" className="footer-link">How it Works</Link>  
                        <Link to="/cart" className="footer-link">My Cart</Link>
                        <Link to="/profile" className="footer-link">My Profile</Link>
                    </div>
                </div>
                <div className="footer-links">
                    <h6>Genres</h6>
                    <div className="links">
                        <Link to="/genres/Adventure" className="footer-link">Adventure</Link>
                        <Link to="/genres/Comedy" className="footer-link">Comedy</Link>
                        <Link to="/genres/Romance" className="footer-link">Romance</Link>
                        <Link to="/genres/Fantasy" className="footer-link">Fantasy</Link>  
                        <Link to="/genres/Fiction" className="footer-link">Fiction</Link>
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