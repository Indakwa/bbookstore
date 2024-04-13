import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <>
        <Header />
        <section className='profile'>
            <div className="top">
                <div className="profilePic">
                    <img src="" alt="" />
                </div>
                <div className="profile-details">
                    <p className="username">Groova</p>
                    <p className="email">gro@gmail.com</p>
                    <p className="bio">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit esse excepturi harum autem sunt ea provident adipisci. Facere, impedit repellat.
                    </p>
                </div>
                <div className="ctas">
                    <button id='request-btn'>Publish Your Book</button>
                    <button id='edit-btn'>Edit Your Profile</button>
                </div>
            </div>

            <div className="my-books">
                <h4>My Library</h4>
                <div className="inner-container">
                    <div className="container">
                        <div className="book">
                            <div className="coverImage">
                                <img src="" alt="" />
                            </div>

                            <div className="book-details">
                                <p className="title">Adventures Of Bobo The Magician.</p>
                                <p className="author">Ivy Kay</p>
                            </div>

                            <div className="progress">
                                <p className="progress-title">Progress</p>
                                <p className='percentage'>20%</p>
                            </div>
                        </div>

                        <div className="book">
                            <div className="coverImage">
                                <img src="" alt="" />
                            </div>

                            <div className="book-details">
                                <p className="title">Adventures Of Bobo The Magician.</p>
                                <p className="author">Ivy Kay</p>
                            </div>

                            <div className="progress">
                                <p className="progress-title">Progress</p>
                                <p className='percentage'>20%</p>
                            </div>
                        </div>
                    </div>

                    <div className="side">
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Profile