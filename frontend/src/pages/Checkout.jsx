

const Checkout = ({ onCancel }) => {
    const handleClose = () => {
        // Call the passed-in onCancel function here
        onCancel();
      };

  return (
    <section className='checkout-overlay'>
        <div className="summary">
            <h5>Pay Using M-Pesa</h5>
            <div className="totals">
                <p className="total-text">Number</p>
                <p className="total-price">0796 161 1357</p>
            </div>

            <div className="totals">
                <p className="total-text">Amount</p>
                <p className="total-price"><span>KSh.</span>30.00</p>
            </div>

            <p className="instructions">
                {`Send KSh.${30.00} to 0796 161 357 using M-Pesa and click the 'I have Paid' button`}
            </p>

            <button id='paid-btn'>I have Paid</button>
            <button id='cancel-btn' onClick={handleClose}>Cancel</button>
        </div>
    </section>
  )
}

export default Checkout