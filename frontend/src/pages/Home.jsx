import { useState } from 'react';
import Header from '../components/Header';
import { IoSearchOutline } from "react-icons/io5";
import Footer from '../components/Footer';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Header />
      <section className='home'>
        
          <section className="home-container">
          
            <section className="hero">
                <div className="left">
                  <h3>Discover Your Next</h3>
                  <h3>Great Read From</h3>
                  <h3>Our Collection</h3>

                     <div className="search-input">
                      <input
                        type="text"
                        placeholder="Search for Book Title or Author"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      <button type="button" id='search-btn'><IoSearchOutline className='icon'/></button>
                    </div>
                </div>

                <div className="right">
                <img src="/assets/2.png" alt="" />
                </div>
            </section>

            <section className='all-genres'>
              <div className="genre-box">
                <p>Fiction</p>
              </div>
              <div className="genre-box">
                <p>Fantasy</p>
              </div>
              <div className="genre-box">
                <p>Romance</p>
              </div>
              <div className="genre-box">
                <p>Horror</p>
              </div>
              <div className="genre-box">
                <p>Adventure</p>
              </div>
              <div className="genre-box">
                <p>Comedy</p>
              </div>
            </section>

            <section className="genre">
              <p className="genre-title">Bestsellers</p>
              <div className="genre-container">
                <div className="book">
                  <div className="top">
                    <img src="/assets/book.jpg" alt="" />
                  </div>
                  <div className="bottom">
                    <p className="title">The Bigfoot Chronicles</p>
                    <p className="author">Indakwa Benedict</p>
                    <p className='price'><span>KSh.</span>50</p>
                  </div>
                </div>
                <div className="book">
                  <div className="top">
                    <img src="/assets/book.jpg" alt="" />
                  </div>
                  <div className="bottom">
                    <p className="title">The Bigfoot Chronicles</p>
                    <p className="author">Indakwa Benedict</p>
                    <p className='price'><span>KSh.</span>50</p>
                  </div>
                </div>
                <div className="book">
                  <div className="top">
                    <img src="/assets/book.jpg" alt="" />
                  </div>
                  <div className="bottom">
                    <p className="title">The Bigfoot Chronicles</p>
                    <p className="author">Indakwa Benedict</p>
                    <p className='price'><span>KSh.</span>50</p>
                  </div>
                </div>
                <div className="book">
                  <div className="top">
                    <img src="/assets/book.jpg" alt="" />
                  </div>
                  <div className="bottom">
                    <p className="title">The Bigfoot Chronicles</p>
                    <p className="author">Indakwa Benedict</p>
                    <p className='price'><span>KSh.</span>50</p>
                  </div>
                </div>
                <div className="book">
                  <div className="top">
                    <img src="/assets/book.jpg" alt="" />
                  </div>
                  <div className="bottom">
                    <p className="title">The Bigfoot Chronicles</p>
                    <p className="author">Indakwa Benedict</p>
                    <p className='price'><span>KSh.</span>50</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
      </section>

      <Footer />

      <div className="space"></div>
    </>

  )
}

export default Home