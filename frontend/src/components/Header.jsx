import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <div className="logo-div">
            <h2 id="logo">BBookstore</h2>
        </div>

        <menu>
            <Link to="/home" className="menu-link">Home</Link>
            <Link to="/about" className="menu-link">About</Link>
            <Link to="/" className="menu-link">Upcoming</Link>
            <Link to="/" className="menu-link">How it Works</Link>  
            <Link to="/" className="menu-link">Profile</Link>
        </menu>
    </header>
  )
}

export default Header