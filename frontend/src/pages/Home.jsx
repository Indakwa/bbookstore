import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <main className="home">
        <div className="home-container">
        <header>
            <div className="logo-div">
            <h2 id="logo">BBookstore</h2>
            </div>

            <menu>
            <Link href="/home" className="menu-link">Home</Link>
            <Link href="/home" className="menu-link">About</Link>
            <Link href="/home" className="menu-link">Upcoming</Link>
            <Link href="/home" className="menu-link">How it Works</Link>  
            <Link href="/home" className="menu-link">Profile</Link>
            </menu>
        </header>

        <section className="hero">
            <div className="left">
            <h3>Get Your</h3>
            <h3><span id="span1"></span>New Book</h3>
            <h3><span id="span2"></span>Collection</h3>

            <div className="links-div">
                <p className="links link1">Search Book</p>
                <p className="links link2">How it Works?</p>
            </div>
            </div>

            <div className="right">
            <img src="/2.png" alt="" />
            </div>
        </section>
        </div>
    </main>
  )
}

export default Home