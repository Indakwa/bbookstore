
import Header from '../components/Header';
import Footer from '../components/Footer';

const How = () => {
  return (
    <>
        <Header />
        <section className='how'>
            <div className="how-container">
                <h2>How BBookstore Works</h2>
                <div className="inner-container">
                    <h3>How to Purchase and Access Your Books</h3>
                    <p>
                        Create account in the Sign Up page. Log in if you already have an account. <br />
                        Browse books in the homepage. Use the search input to look for specific books or authors. <br />
                        Select a book to see all details related to that book. <br />
                        Add to cart books that you want. <br />
                        Go to Cart page and manage your cart (Add and remove books) <br />
                        Hit the Checkout Button to generate your totals and display the payment options. <br />
                        Follow instructions to make payments and hit the 'I have paid' button after you have successfully paid the required amount. <br />
                        Wait for Admin to verify payment on his side. If approved, you will now be able to access the books you have purchased in the 'My Library' section in the Profile page. <br />
                    </p>
                    <p className="reminder">
                        If you need any clarification get in touch with us using the Live Chat widget (bottom right side of your screen).
                    </p>
                </div>

                <div className="inner-container">
                    <h3>How to Publish Your Book</h3>
                    <p>
                        Go to Profle page. <br />
                        Select the 'Publish Your Book' button. This will open a form for you to fill in the details of your book.<br />
                        Fill in the Details as requested and hit the submit button. <br />
                        The Admin will cross-check the submitted details. If they follow the required guidelines, the book will be approved and published in the platform. <br />
                        You will now be promoted to a publisher. This will give you access to a dashboard in your profile to track your books on sale.
                    </p>
                    <p className="reminder">
                        If you need any clarification get in touch with us using the Live Chat widget (bottom right side of your screen).
                    </p>
                </div>

                <div className="inner-container">
                    <h3>Requirements for you to Publish</h3>
                    <p>
                        Upload your book in the format .txt (we are working on to support more formats, if you need help converting your book to .txt, reach out to us. We are here to help).<br />
                        Upload the copyright information of your book in the format .pdf
                    </p>
                    <p className="reminder">
                        If you need any clarification get in touch with us using the Live Chat widget (bottom right side of your screen).
                    </p>
                </div>

                <p className="wishes">
                    Happy Reading and Publishing!
                </p>

            </div>
        </section>
        <Footer />
    </>
  )
}

export default How